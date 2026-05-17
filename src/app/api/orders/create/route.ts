import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { stripe, PACKAGES } from "@/lib/stripe";
import { db } from "@/lib/db";
import { orders, auditLog } from "@/lib/schema";
import { CreateOrderSchema } from "@/lib/validators";
import { headers } from "next/headers";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    // 1. Parse & validate
    const body = await req.json();
    const parsed = CreateOrderSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", issues: parsed.error.issues },
        { status: 400 }
      );
    }
    const { packageId, intake } = parsed.data;

    // 2. Get package
    const pkg = PACKAGES[packageId];
    if (!pkg) {
      return NextResponse.json({ error: "Invalid package" }, { status: 400 });
    }

    // 3. Optional Clerk user (guest checkout supported)
    const { userId } = await auth();

    // 4. Client IP
    const headersList = await headers();
    const ip =
      headersList.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";

    // 5. Insert pending order
    const [order] = await db
      .insert(orders)
      .values({
        clerkUserId:     userId ?? null,
        packageId,
        packageName:     pkg.name,
        amountCents:     pkg.price,
        status:          "pending",
        clientFirstName: intake.firstName,
        clientLastName:  intake.lastName,
        clientEmail:     intake.email,
        clientPhone:     intake.phone,
        intakeData:      intake as Record<string, unknown>,
        consentAcceptedAt: new Date(intake.consentAcceptedAt),
        consentIpAddress:  ip,
        consentUserAgent:  headersList.get("user-agent") ?? "",
      })
      .returning();

    // 6. Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode:                 "payment",
      payment_method_types: ["card"],
      line_items: [{ price: pkg.stripePriceId, quantity: 1 }],
      customer_email:       intake.email,
      client_reference_id:  order.id,
      metadata: {
        orderId:    order.id,
        packageId,
        clientName: `${intake.firstName} ${intake.lastName}`,
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?order_id=${order.id}`,
      cancel_url:  `${process.env.NEXT_PUBLIC_APP_URL}/checkout?package=${packageId}&cancelled=true`,
      expires_at:  Math.floor(Date.now() / 1000) + 30 * 60,
    });

    // 7. Store session ID — use eq() for proper Drizzle where clause
    await db
      .update(orders)
      .set({ stripeSessionId: session.id, updatedAt: new Date() })
      .where(eq(orders.id, order.id));

    // 8. Audit log
    await db.insert(auditLog).values({
      orderId:  order.id,
      action:   "order.created",
      actor:    "system",
      metadata: { packageId, stripeSessionId: session.id },
    });

    return NextResponse.json({ sessionUrl: session.url, orderId: order.id });
  } catch (err) {
    console.error("[orders/create]", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
