# Cleland Law — Estate Planning SaaS

Attorney-drafted wills and trusts for Florida families. Flat-fee, fully online, personally reviewed by Ryan Cleland, Esq.

## Tech Stack

| Layer | Service |
|-------|---------|
| Framework | Next.js 14 (App Router) + TypeScript |
| Auth | Clerk |
| Payments | Stripe |
| Database | Neon (Postgres) + Drizzle ORM |
| Email | Resend |
| Storage | Cloudflare R2 |
| Hosting | Vercel |

---

## Local Development

### 1. Clone & Install
```bash
git clone https://github.com/yourusername/cleland-law.git
cd cleland-law
npm install
```

### 2. Environment Variables
```bash
cp .env.example .env.local
# Fill in all values (see API Keys section below)
```

### 3. Database Setup
```bash
npm run db:push
# This pushes the schema to your Neon database
```

### 4. Run Dev Server
```bash
npm run dev
# http://localhost:3000
```

---

## API Keys — Complete Setup Guide

### 1. CLERK (Authentication)
1. Go to https://dashboard.clerk.com
2. Create a new application → "Cleland Law"
3. Enable Email + Google sign-in
4. Copy **Publishable Key** → `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
5. Copy **Secret Key** → `CLERK_SECRET_KEY`
6. After first login: Users → copy your User ID → `ADMIN_USER_ID`
7. Production: Configure custom domain in Clerk → DNS records

### 2. STRIPE (Payments)
1. Go to https://dashboard.stripe.com
2. **API Keys** → copy Publishable + Secret → env vars
3. **Products** → Create 3 products:
   - "Last Will & Testament" → $299 → one-time → copy Price ID → `STRIPE_PRICE_WILL`
   - "Revocable Living Trust" → $899 → one-time → `STRIPE_PRICE_TRUST`
   - "Complete Estate Plan" → $1,499 → one-time → `STRIPE_PRICE_COMPLETE`
4. **Webhooks** → Add endpoint:
   - URL: `https://clelandlaw.com/api/webhook/stripe`
   - Events: `checkout.session.completed`, `payment_intent.payment_failed`, `charge.refunded`
   - Copy **Signing Secret** → `STRIPE_WEBHOOK_SECRET`

### 3. NEON (Database)
1. Go to https://console.neon.tech
2. Create project "cleland-law"
3. Copy **Connection String** → `DATABASE_URL`
4. Run `npm run db:push` to create tables

### 4. RESEND (Email)
1. Go to https://resend.com
2. Create API Key → `RESEND_API_KEY`
3. Add & verify your domain (clelandlaw.com)
4. Set `RESEND_FROM_EMAIL=noreply@clelandlaw.com`
5. Set `RESEND_REPLY_TO=ryan@clelandlaw.com`

### 5. CLOUDFLARE R2 (Document Storage)
1. Go to https://dash.cloudflare.com → R2
2. Create bucket: `cleland-documents`
3. **Manage R2 API Tokens** → Create token with Object Read & Write
4. Copy Account ID, Access Key ID, Secret → env vars
5. Set bucket name → `CLOUDFLARE_R2_BUCKET_NAME=cleland-documents`
6. IMPORTANT: Do NOT enable public access. Documents are served via signed URLs only.

---

## Deployment (Vercel + GitHub)

### First Deploy
1. Push code to GitHub
2. Go to https://vercel.com → Import repository
3. Add all environment variables from `.env.example`
4. Deploy

### Subsequent Deploys
Push to `main` branch → Vercel auto-deploys.

### DNS (Cloudflare)
- Add CNAME: `@` → your Vercel deployment URL
- Add Clerk DNS records from Clerk Dashboard

---

## Admin Dashboard

Ryan's admin panel is at `/admin`. It is:
- Protected by Clerk auth
- Additionally restricted to `ADMIN_USER_ID` only
- Shows all orders, status, revenue
- Allows PDF upload + automated client delivery email

**To deliver documents:**
1. Log in as Ryan at `/admin`
2. Click "Upload Docs" on a paid order
3. Upload the completed PDF
4. Client receives an email with a 72-hour signed download link automatically

---

## Florida Bar Compliance Notes

- No outcome guarantees anywhere on the site ✓
- Clear "attorney advertising" disclaimers on all pages ✓
- Engagement/consent language collected and timestamped at checkout ✓
- Documents explicitly scoped to Florida law ✓
- Attorney-client relationship disclosure at intake ✓
- Flat-fee structure complies with FL Bar Rule 4-1.5 ✓

**Recommended:** Have Ryan review the intake consent language (Step 2 of checkout) with a colleague before launch to ensure FL Bar Rule 4-7 compliance for online advertising.

---

## Security Architecture

- All intake data protected under attorney-client privilege
- Stripe handles all card data (PCI-DSS Level 1) — no card data touches our servers
- R2 documents served via signed URLs only (never public)
- OWASP headers set in `next.config.js`
- Clerk handles auth with MFA support
- Zod validation on all API inputs
- Audit log on all order state changes
- Rate limiting: Add Upstash Redis for production rate limiting on `/api/orders/create`

---

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── orders/create/     # Create order + Stripe session
│   │   ├── webhook/stripe/    # Stripe webhook handler
│   │   └── admin/deliver/     # Admin: upload doc + email client
│   ├── admin/                 # Ryan's dashboard (server component)
│   ├── checkout/success/      # Post-payment confirmation
│   └── page.tsx               # Homepage
├── components/
│   ├── layout/                # Nav, Footer
│   └── sections/              # Hero, Why, HowItWorks, Packages, etc.
├── lib/
│   ├── db.ts                  # Drizzle + Neon connection
│   ├── schema.ts              # Database schema
│   ├── stripe.ts              # Stripe singleton + package config
│   ├── r2.ts                  # Cloudflare R2 document storage
│   ├── email.ts               # Resend email templates
│   └── validators.ts          # Zod schemas
└── middleware.ts               # Clerk auth + security headers
```
