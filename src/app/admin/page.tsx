import { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { orders } from "@/lib/schema";
import { desc } from "drizzle-orm";

export const metadata: Metadata = { title: "Admin Dashboard — Cleland Law" };

const STATUS_COLORS: Record<string, string> = {
  pending:   "#E8754A",
  paid:      "#00C896",
  in_review: "#00A87A",
  completed: "rgba(240,238,233,0.3)",
  refunded:  "#FF6B6B",
};

export default async function AdminPage() {
  const { userId } = await auth();
  if (!userId || userId !== process.env.ADMIN_USER_ID) redirect("/");

  const allOrders = await db
    .select()
    .from(orders)
    .orderBy(desc(orders.createdAt))
    .limit(100);

  const stats = {
    total:     allOrders.length,
    paid:      allOrders.filter(o => o.status === "paid").length,
    completed: allOrders.filter(o => o.status === "completed").length,
    revenue:   allOrders.filter(o => ["paid","completed"].includes(o.status))
                        .reduce((s, o) => s + (o.amountCents ?? 0), 0) / 100,
  };

  return (
    <main style={{ minHeight: "100vh", background: "#0A0A0F", padding: "32px", fontFamily: "var(--font-outfit)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: 38, fontWeight: 700, color: "#F0EEE9", marginBottom: 4 }}>
            Admin Dashboard
          </h1>
          <p style={{ color: "rgba(240,238,233,0.35)", fontSize: 14 }}>Ryan Cleland, Esq. — Cleland Law</p>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 40 }}>
          {[
            ["Total Orders", stats.total, ""],
            ["Awaiting Docs", stats.paid, "⚡"],
            ["Completed", stats.completed, "✓"],
            ["Revenue", `$${stats.revenue.toLocaleString()}`, "💰"],
          ].map(([label, val, icon]) => (
            <div key={String(label)} style={{
              background: "rgba(20,20,34,0.6)", border: "1px solid rgba(240,238,233,0.08)",
              borderRadius: 14, padding: "24px 20px",
            }}>
              <div style={{ fontSize: 28, fontFamily: "var(--font-playfair)", fontWeight: 700, color: "#00C896", marginBottom: 4 }}>
                {icon} {val}
              </div>
              <div style={{ fontSize: 12, color: "rgba(240,238,233,0.35)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* Orders table */}
        <div style={{
          background: "rgba(20,20,34,0.6)", border: "1px solid rgba(240,238,233,0.08)",
          borderRadius: 16, overflow: "hidden",
        }}>
          <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(240,238,233,0.06)" }}>
            <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: 20, fontWeight: 600, color: "#F0EEE9" }}>
              All Orders
            </h2>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(240,238,233,0.06)" }}>
                  {["Date","Client","Package","Amount","Status","Action"].map(h => (
                    <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, color: "rgba(240,238,233,0.3)", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {allOrders.map((order) => (
                  <tr key={order.id} style={{ borderBottom: "1px solid rgba(240,238,233,0.04)" }}>
                    <td style={{ padding: "14px 16px", fontSize: 13, color: "rgba(240,238,233,0.4)" }}>
                      {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "—"}
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ fontSize: 14, color: "#F0EEE9" }}>{order.clientFirstName} {order.clientLastName}</div>
                      <div style={{ fontSize: 12, color: "rgba(240,238,233,0.3)" }}>{order.clientEmail}</div>
                    </td>
                    <td style={{ padding: "14px 16px", fontSize: 13, color: "rgba(240,238,233,0.6)" }}>{order.packageName}</td>
                    <td style={{ padding: "14px 16px", fontSize: 14, fontWeight: 600, color: "#00C896" }}>
                      ${((order.amountCents ?? 0) / 100).toLocaleString()}
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <span style={{
                        fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 20,
                        background: `${STATUS_COLORS[order.status] ?? "#888"}22`,
                        color: STATUS_COLORS[order.status] ?? "#888",
                        border: `1px solid ${STATUS_COLORS[order.status] ?? "#888"}44`,
                        textTransform: "uppercase", letterSpacing: "0.06em",
                      }}>
                        {order.status}
                      </span>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      {order.status === "paid" && (
                        <a href={`/admin/orders/${order.id}`} style={{
                          fontSize: 12, fontWeight: 600, color: "#00C896",
                          textDecoration: "none", padding: "6px 14px",
                          border: "1px solid rgba(0,200,150,0.3)", borderRadius: 6,
                        }}>
                          Upload Docs →
                        </a>
                      )}
                      {order.status === "completed" && (
                        <span style={{ fontSize: 12, color: "rgba(240,238,233,0.25)" }}>Delivered ✓</span>
                      )}
                    </td>
                  </tr>
                ))}
                {allOrders.length === 0 && (
                  <tr><td colSpan={6} style={{ padding: "40px", textAlign: "center", color: "rgba(240,238,233,0.25)", fontSize: 14 }}>No orders yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
