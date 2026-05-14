import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Order Confirmed — Cleland Law" };

export default function CheckoutSuccess({
  searchParams,
}: {
  searchParams: { order_id?: string };
}) {
  return (
    <main style={{
      minHeight: "100vh",
      background: "#0A0A0F",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 24px",
      fontFamily: "var(--font-outfit)",
    }}>
      <div style={{ maxWidth: 520, width: "100%", textAlign: "center" }}>
        {/* Success icon */}
        <div style={{
          width: 88, height: 88, borderRadius: "50%", margin: "0 auto 32px",
          background: "rgba(0,200,150,0.1)", border: "2px solid #00C896",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 36, animation: "glow 2s ease-in-out infinite",
        }}>✓</div>

        <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: 42, fontWeight: 700, color: "#F0EEE9", marginBottom: 12 }}>
          Order Confirmed.
        </h1>
        <p style={{ fontSize: 20, color: "#00C896", fontStyle: "italic", marginBottom: 24, fontFamily: "var(--font-playfair)" }}>
          Your estate plan is in good hands.
        </p>
        <p style={{ color: "rgba(240,238,233,0.5)", fontSize: 15, lineHeight: 1.8, marginBottom: 36 }}>
          A confirmation email is on its way. Ryan Cleland, Esq. will personally 
          review your intake and prepare your documents within{" "}
          <strong style={{ color: "#F0EEE9" }}>3–5 business days</strong>.
          You'll receive a secure download link when they're ready.
        </p>

        {/* Next steps */}
        <div style={{
          background: "rgba(0,200,150,0.04)", border: "1px solid rgba(0,200,150,0.2)",
          borderRadius: 14, padding: "24px 28px", textAlign: "left", marginBottom: 36,
        }}>
          <div style={{ fontSize: 11, color: "#00C896", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>
            What Happens Next
          </div>
          {[
            "Confirmation email sent to your inbox",
            "Ryan reviews intake within 1 business day",
            "Documents drafted & attorney-reviewed (3–5 days)",
            "Secure download link delivered via email",
            "Print, sign, notarize — you're protected",
          ].map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 12, padding: "8px 0", borderBottom: i < 4 ? "1px solid rgba(240,238,233,0.05)" : "none" }}>
              <span style={{ color: "#00C896", fontWeight: 700, flexShrink: 0, minWidth: 16, fontSize: 12 }}>{i + 1}</span>
              <span style={{ color: "rgba(240,238,233,0.55)", fontSize: 13 }}>{s}</span>
            </div>
          ))}
        </div>

        <Link href="/" style={{
          display: "inline-block",
          padding: "12px 28px",
          background: "rgba(240,238,233,0.06)",
          border: "1px solid rgba(240,238,233,0.1)",
          borderRadius: 10, color: "rgba(240,238,233,0.6)",
          textDecoration: "none", fontSize: 14,
        }}>
          ← Return Home
        </Link>
      </div>
    </main>
  );
}
