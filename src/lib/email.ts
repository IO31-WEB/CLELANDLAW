import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

const FROM   = process.env.RESEND_FROM_EMAIL!;
const REPLY  = process.env.RESEND_REPLY_TO!;
const APP    = process.env.NEXT_PUBLIC_APP_URL!;

// ─── CLIENT: Order Confirmation ───────────────────────────────────────────────
export async function sendOrderConfirmation(opts: {
  to: string;
  firstName: string;
  packageName: string;
  orderId: string;
  amountDollars: number;
}) {
  return resend.emails.send({
    from:     FROM,
    replyTo:  REPLY,
    to:       opts.to,
    subject:  `Order Confirmed — ${opts.packageName} | Cleland Law`,
    html: `
<!DOCTYPE html><html><body style="font-family:'Outfit',Arial,sans-serif;background:#0A0A0F;color:#F0EEE9;padding:40px 20px;margin:0;">
<div style="max-width:560px;margin:0 auto;">
  <div style="margin-bottom:32px;">
    <span style="font-size:22px;font-weight:700;color:#00C896;">Cleland</span>
    <span style="font-size:22px;font-weight:700;color:#F0EEE9;"> Law</span>
  </div>
  <h1 style="font-size:32px;font-weight:700;color:#F0EEE9;margin-bottom:8px;">Order Confirmed.</h1>
  <p style="color:#00C896;font-size:18px;margin-bottom:28px;font-style:italic;">Your estate plan is in good hands.</p>
  <p style="color:rgba(240,238,233,0.6);line-height:1.8;margin-bottom:24px;">
    Hi ${opts.firstName},<br/><br/>
    Thank you for your order. Ryan Cleland, Esq. will personally review your intake and prepare your 
    <strong style="color:#F0EEE9;">${opts.packageName}</strong> within <strong style="color:#F0EEE9;">3–5 business days</strong>.
  </p>
  <div style="background:rgba(0,200,150,0.06);border:1px solid rgba(0,200,150,0.2);border-radius:12px;padding:24px;margin-bottom:28px;">
    <div style="color:rgba(240,238,233,0.4);font-size:11px;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:12px;">Order Details</div>
    <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
      <span style="color:rgba(240,238,233,0.6);">Package</span>
      <span style="color:#F0EEE9;font-weight:600;">${opts.packageName}</span>
    </div>
    <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
      <span style="color:rgba(240,238,233,0.6);">Amount Paid</span>
      <span style="color:#00C896;font-weight:700;font-size:18px;">$${opts.amountDollars.toLocaleString()}</span>
    </div>
    <div style="display:flex;justify-content:space-between;">
      <span style="color:rgba(240,238,233,0.6);">Order ID</span>
      <span style="color:rgba(240,238,233,0.4);font-size:12px;">${opts.orderId}</span>
    </div>
  </div>
  <div style="background:rgba(20,20,34,0.8);border:1px solid rgba(240,238,233,0.08);border-radius:12px;padding:24px;margin-bottom:28px;">
    <div style="color:rgba(240,238,233,0.4);font-size:11px;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:14px;">What Happens Next</div>
    ${["Ryan reviews your intake (1 business day)","Documents drafted to your specifications","Attorney review and final preparation","Secure download link delivered to this email","Sign and notarize to complete your plan"].map((s,i)=>`
    <div style="display:flex;gap:10px;padding:8px 0;border-bottom:1px solid rgba(240,238,233,0.04);">
      <span style="color:#00C896;font-weight:700;font-size:12px;min-width:16px;">${i+1}</span>
      <span style="color:rgba(240,238,233,0.55);font-size:13px;">${s}</span>
    </div>`).join("")}
  </div>
  <p style="color:rgba(240,238,233,0.35);font-size:12px;line-height:1.7;border-top:1px solid rgba(240,238,233,0.06);padding-top:20px;">
    Questions? Reply to this email or contact Ryan at ${REPLY}<br/>
    Ryan Cleland, Esq. · Florida Bar · Estate Planning · ${APP}<br/><br/>
    <em>Attorney advertising. This engagement is for Florida residents only. Documents governed by Florida law.</em>
  </p>
</div>
</body></html>`,
  });
}

// ─── ADMIN: New Order Notification (to Ryan) ─────────────────────────────────
export async function sendAdminNewOrderAlert(opts: {
  orderId: string;
  clientName: string;
  clientEmail: string;
  packageName: string;
  amountDollars: number;
}) {
  return resend.emails.send({
    from:    FROM,
    to:      REPLY,
    subject: `🆕 New Order: ${opts.packageName} — ${opts.clientName}`,
    html: `
<div style="font-family:Arial,sans-serif;padding:24px;">
  <h2 style="color:#00C896;">New Order Received</h2>
  <table style="border-collapse:collapse;width:100%;max-width:500px;">
    ${[
      ["Client",  opts.clientName],
      ["Email",   opts.clientEmail],
      ["Package", opts.packageName],
      ["Amount",  `$${opts.amountDollars.toLocaleString()}`],
      ["Order ID",opts.orderId],
    ].map(([k,v])=>`<tr><td style="padding:8px;color:#666;border-bottom:1px solid #eee;">${k}</td><td style="padding:8px;font-weight:600;border-bottom:1px solid #eee;">${v}</td></tr>`).join("")}
  </table>
  <a href="${APP}/admin/orders/${opts.orderId}" style="display:inline-block;margin-top:20px;background:#00C896;color:#0A0A0F;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;">
    View in Admin Dashboard →
  </a>
</div>`,
  });
}

// ─── CLIENT: Document Ready Delivery ─────────────────────────────────────────
export async function sendDocumentDelivery(opts: {
  to: string;
  firstName: string;
  packageName: string;
  downloadUrl: string;
  expiresHours?: number;
}) {
  const expires = opts.expiresHours ?? 72;
  return resend.emails.send({
    from:    FROM,
    replyTo: REPLY,
    to:      opts.to,
    subject: `Your ${opts.packageName} is Ready — Cleland Law`,
    html: `
<!DOCTYPE html><html><body style="font-family:'Outfit',Arial,sans-serif;background:#0A0A0F;color:#F0EEE9;padding:40px 20px;margin:0;">
<div style="max-width:560px;margin:0 auto;">
  <div style="margin-bottom:32px;">
    <span style="font-size:22px;font-weight:700;color:#00C896;">Cleland</span>
    <span style="font-size:22px;font-weight:700;color:#F0EEE9;"> Law</span>
  </div>
  <h1 style="font-size:32px;font-weight:700;color:#F0EEE9;margin-bottom:8px;">Your documents are ready.</h1>
  <p style="color:rgba(240,238,233,0.6);line-height:1.8;margin-bottom:32px;">
    Hi ${opts.firstName},<br/><br/>
    Your <strong style="color:#F0EEE9;">${opts.packageName}</strong> has been personally prepared and reviewed by 
    Ryan Cleland, Esq. and is ready for download.
  </p>
  <a href="${opts.downloadUrl}" style="display:block;text-align:center;background:linear-gradient(135deg,#00C896,#00E5A8);color:#0A0A0F;padding:18px 40px;border-radius:12px;text-decoration:none;font-weight:700;font-size:17px;margin-bottom:24px;">
    🔒 Download Your Documents
  </a>
  <p style="color:rgba(240,238,233,0.35);font-size:12px;text-align:center;margin-bottom:32px;">
    This link expires in ${expires} hours. Download and save your documents immediately.
  </p>
  <div style="background:rgba(232,117,74,0.06);border:1px solid rgba(232,117,74,0.2);border-radius:12px;padding:20px;margin-bottom:28px;">
    <div style="color:#E8754A;font-size:13px;font-weight:700;margin-bottom:10px;">⚠ Next Steps — Important</div>
    ${["Print your documents","Sign in front of two witnesses","Have a notary public notarize where required","Store originals in a secure location","Provide copies to your personal representative/trustee"].map(s=>`<div style="color:rgba(240,238,233,0.55);font-size:13px;padding:5px 0;">• ${s}</div>`).join("")}
  </div>
  <p style="color:rgba(240,238,233,0.25);font-size:11px;line-height:1.7;border-top:1px solid rgba(240,238,233,0.06);padding-top:20px;">
    Ryan Cleland, Esq. · Florida Bar · ${APP} · Reply with any questions.
  </p>
</div>
</body></html>`,
  });
}
