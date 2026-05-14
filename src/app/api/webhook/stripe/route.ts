import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import { orders, auditLog } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { sendOrderConfirmation, sendAdminNewOrderAlert } from "@/lib/email";
import Stripe from "stripe";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const body      = await req.text();
  const signature = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error("[webhook] signature verification failed", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // ── checkout.session.completed ──────────────────────────────────────────
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.orderId ?? session.client_reference_id;
    if (!orderId) {
      console.error("[webhook] no orderId in session metadata");
      return NextResponse.json({ received: true });
    }

    // Mark paid
    const [updated] = await db.update(orders)
      .set({
        status:              "paid",
        stripePaymentIntent: session.payment_intent as string,
        paidAt:              new Date(),
        updatedAt:           new Date(),
      })
      .where(eq(orders.id, orderId))
      .returning();

    if (!updated) {
      console.error("[webhook] order not found", orderId);
      return NextResponse.json({ received: true });
    }

    await db.insert(auditLog).values({
      orderId,
      action:   "order.paid",
      actor:    "stripe",
      metadata: { sessionId: session.id, amountTotal: session.amount_total },
    });

    // Send emails in parallel
    await Promise.all([
      sendOrderConfirmation({
        to:            updated.clientEmail,
        firstName:     updated.clientFirstName ?? "there",
        packageName:   updated.packageName,
        orderId:       updated.id,
        amountDollars: (updated.amountCents ?? 0) / 100,
      }),
      sendAdminNewOrderAlert({
        orderId:       updated.id,
        clientName:    `${updated.clientFirstName} ${updated.clientLastName}`,
        clientEmail:   updated.clientEmail,
        packageName:   updated.packageName,
        amountDollars: (updated.amountCents ?? 0) / 100,
      }),
    ]);
  }

  // ── payment_intent.payment_failed ───────────────────────────────────────
  if (event.type === "payment_intent.payment_failed") {
    const pi = event.data.object as Stripe.PaymentIntent;
    console.warn("[webhook] payment failed", pi.id);
    // Optionally: update order status to "payment_failed"
  }

  // ── charge.refunded ─────────────────────────────────────────────────────
  if (event.type === "charge.refunded") {
    const charge = event.data.object as Stripe.Charge;
    const pi = charge.payment_intent as string;
    if (pi) {
      await db.update(orders)
        .set({ status: "refunded", updatedAt: new Date() })
        .where(eq(orders.stripePaymentIntent, pi));
    }
  }

  return NextResponse.json({ received: true });
}
