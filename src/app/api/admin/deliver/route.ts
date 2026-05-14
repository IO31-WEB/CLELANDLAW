import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { orders, auditLog, orderNotes } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { uploadDocument, getSignedDownloadUrl } from "@/lib/r2";
import { sendDocumentDelivery } from "@/lib/email";

/** POST /api/admin/deliver — Ryan uploads completed PDF and triggers delivery */
export async function POST(req: NextRequest) {
  // 1. Auth guard — must be Ryan
  const { userId } = await auth();
  if (!userId || userId !== process.env.ADMIN_USER_ID) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  // 2. Parse multipart form
  const form    = await req.formData();
  const orderId = form.get("orderId") as string;
  const file    = form.get("document") as File | null;
  const note    = form.get("note") as string | null;

  if (!orderId || !file) {
    return NextResponse.json({ error: "orderId and document are required" }, { status: 400 });
  }

  // 3. Load order
  const [order] = await db.select().from(orders).where(eq(orders.id, orderId));
  if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });
  if (order.status === "refunded") return NextResponse.json({ error: "Cannot deliver refunded order" }, { status: 400 });

  // 4. Upload to R2
  const buffer    = Buffer.from(await file.arrayBuffer());
  const r2Key     = `documents/${orderId}/${Date.now()}-${file.name}`;
  await uploadDocument(r2Key, buffer, "application/pdf");

  // 5. Generate signed URL (72h)
  const downloadUrl = await getSignedDownloadUrl(r2Key, 72 * 3600);

  // 6. Update order
  await db.update(orders).set({
    status:              "completed",
    documentR2Key:       r2Key,
    documentDeliveredAt: new Date(),
    updatedAt:           new Date(),
  }).where(eq(orders.id, orderId));

  // 7. Add note if provided
  if (note?.trim()) {
    await db.insert(orderNotes).values({ orderId, note: note.trim() });
  }

  // 8. Audit
  await db.insert(auditLog).values({
    orderId,
    action:   "document.delivered",
    actor:    userId,
    metadata: { r2Key, filename: file.name },
  });

  // 9. Email client
  await sendDocumentDelivery({
    to:          order.clientEmail,
    firstName:   order.clientFirstName ?? "there",
    packageName: order.packageName,
    downloadUrl,
    expiresHours: 72,
  });

  return NextResponse.json({ success: true, downloadUrl });
}

/** GET /api/admin/orders — list all orders for Ryan's dashboard */
export async function GET(req: NextRequest) {
  const { userId } = await auth();
  if (!userId || userId !== process.env.ADMIN_USER_ID) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const url    = new URL(req.url);
  const status = url.searchParams.get("status");
  
  const query = status
    ? await db.select().from(orders).where(eq(orders.status, status)).orderBy(orders.createdAt)
    : await db.select().from(orders).orderBy(orders.createdAt);

  // Strip full intake data from list view for performance
  const safe = query.map(({ intakeData: _, ...rest }) => rest);
  return NextResponse.json({ orders: safe });
}
