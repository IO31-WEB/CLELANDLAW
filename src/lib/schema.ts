import { pgTable, text, integer, timestamp, boolean, jsonb, uuid } from "drizzle-orm/pg-core";

// ─── ORDERS ──────────────────────────────────────────────────────────────────
export const orders = pgTable("orders", {
  id:                uuid("id").primaryKey().defaultRandom(),
  clerkUserId:       text("clerk_user_id"),                          // set after auth (optional — guest checkout supported)
  
  // Package
  packageId:         text("package_id").notNull(),                   // "will" | "trust" | "complete"
  packageName:       text("package_name").notNull(),
  amountCents:       integer("amount_cents").notNull(),

  // Status
  status:            text("status").notNull().default("pending"),    // pending | paid | in_review | completed | refunded
  
  // Stripe
  stripeSessionId:   text("stripe_session_id").unique(),
  stripePaymentIntent: text("stripe_payment_intent"),

  // Client info (encrypted at app layer before insert)
  clientFirstName:   text("client_first_name"),
  clientLastName:    text("client_last_name"),
  clientEmail:       text("client_email").notNull(),
  clientPhone:       text("client_phone"),

  // Document intake (full JSON — encrypted at app layer)
  intakeData:        jsonb("intake_data"),

  // Document delivery
  documentR2Key:     text("document_r2_key"),                        // R2 object key once Ryan uploads
  documentDeliveredAt: timestamp("document_delivered_at"),

  // Consent & compliance
  consentAcceptedAt: timestamp("consent_accepted_at"),
  consentIpAddress:  text("consent_ip_address"),
  consentUserAgent:  text("consent_user_agent"),

  // Timestamps
  createdAt:         timestamp("created_at").defaultNow().notNull(),
  updatedAt:         timestamp("updated_at").defaultNow().notNull(),
  paidAt:            timestamp("paid_at"),
});

// ─── ORDER NOTES (Ryan's internal notes per order) ───────────────────────────
export const orderNotes = pgTable("order_notes", {
  id:        uuid("id").primaryKey().defaultRandom(),
  orderId:   uuid("order_id").notNull().references(() => orders.id, { onDelete: "cascade" }),
  note:      text("note").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ─── AUDIT LOG ───────────────────────────────────────────────────────────────
export const auditLog = pgTable("audit_log", {
  id:        uuid("id").primaryKey().defaultRandom(),
  orderId:   uuid("order_id").references(() => orders.id),
  action:    text("action").notNull(),   // e.g. "order.created" "order.paid" "document.uploaded"
  actor:     text("actor"),              // "system" | clerk user id
  metadata:  jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ─── TYPES ───────────────────────────────────────────────────────────────────
export type Order     = typeof orders.$inferSelect;
export type NewOrder  = typeof orders.$inferInsert;
export type AuditLog  = typeof auditLog.$inferSelect;
