import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

const FROM = process.env.RESEND_FROM_EMAIL!;
const REPLY = process.env.RESEND_REPLY_TO!;
const APP = process.env.NEXT_PUBLIC_APP_URL!;

export async function sendOrderConfirmation(opts: {
  to: string;
  firstName: string;
  packageName: string;
  orderId: string;
  amountDollars: number;
}) {
  return resend.emails.send({
    from: FROM,
    reply_to: REPLY,           // ← Fixed
    to: opts.to,
    subject: `Order Confirmed — ${opts.packageName} | Cleland Law`,
    html: `...`, // (keep your existing HTML)
  });
}

export async function sendAdminNewOrderAlert(opts: {
  orderId: string;
  clientName: string;
  clientEmail: string;
  packageName: string;
  amountDollars: number;
}) {
  return resend.emails.send({
    from: FROM,
    reply_to: REPLY,           // ← Fixed
    to: REPLY,
    subject: `🆕 New Order: ${opts.packageName} — ${opts.clientName}`,
    html: `...`, // (keep your existing HTML)
  });
}

export async function sendDocumentDelivery(opts: {
  to: string;
  firstName: string;
  packageName: string;
  downloadUrl: string;
  expiresHours?: number;
}) {
  const expires = opts.expiresHours ?? 72;
  return resend.emails.send({
    from: FROM,
    reply_to: REPLY,           // ← Fixed
    to: opts.to,
    subject: `Your ${opts.packageName} is Ready — Cleland Law`,
    html: `...`, // (keep your existing HTML)
  });
}
