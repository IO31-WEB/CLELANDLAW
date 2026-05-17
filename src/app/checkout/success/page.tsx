"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

// ── Package data (mirrors lib/stripe.ts — no server import in client component)
const PACKAGES = {
  will: {
    id: "will", icon: "📜", name: "Last Will & Testament", price: 299,
    includes: [
      "Attorney-drafted Florida will", "Guardian nominations for minors",
      "Named executor", "30-day unlimited revisions",
      "Secure PDF delivery", "Ryan Cleland, Esq. review & signature",
    ],
  },
  trust: {
    id: "trust", icon: "🏛", name: "Revocable Living Trust", price: 899,
    includes: [
      "Revocable Living Trust Agreement", "Pour-Over Will included",
      "Certificate of Trust", "Asset transfer guidance",
      "30-min strategy call with Ryan", "60-day unlimited revisions",
      "Notarized delivery option",
    ],
  },
  complete: {
    id: "complete", icon: "⚖️", name: "Complete Estate Plan", price: 1499,
    includes: [
      "Revocable Living Trust", "Last Will & Testament",
      "Durable Power of Attorney", "Healthcare Surrogate",
      "Living Will / Advance Directive", "HIPAA Authorization",
      "45-min planning call with Ryan", "Priority 3-day delivery",
      "1-year amendment service",
    ],
  },
} as const;

type PackageId = keyof typeof PACKAGES;

const STEPS = ["Package", "Your Info", "Details", "Pay"];

const FAMILY_STATUS = [
  "Single, no children", "Single with children",
  "Married, no children", "Married with children",
  "Divorced with children", "Widowed",
];

// ── Step indicator
function StepBar({ step }: { step: number }) {
  return (
    <div className="flex items-center w-full max-w-md mx-auto mb-10">
      {STEPS.map((label, i) => (
        <div key={label} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
              step > i + 1 ? "bg-[#00C896] text-black" :
              step === i + 1 ? "border-2 border-[#00C896] text-[#00C896]" :
              "border border-white/15 text-white/25"
            }`}>
              {step > i + 1 ? "✓" : i + 1}
            </div>
            <span className={`text-[10px] hidden sm:block whitespace-nowrap font-medium ${
              step === i + 1 ? "text-white/70" :
              step > i + 1 ? "text-[#00C896]" : "text-white/20"
            }`}>{label}</span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={`flex-1 h-px mx-2 mb-4 transition-all ${
              step > i + 1 ? "bg-[#00C896]" : "bg-white/10"
            }`} />
          )}
        </div>
      ))}
    </div>
  );
}

// ── Field wrapper
function Field({
  label, error, hint, children,
}: {
  label: string; error?: string; hint?: string; children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5 mb-5">
      <label className="text-xs font-semibold uppercase tracking-widest text-white/40">
        {label}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-white/25">{hint}</p>}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

const inputCls = (err?: string) =>
  `w-full bg-white/5 border ${
    err ? "border-red-500/50 bg-red-500/5" : "border-white/10"
  } rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#00C896] focus:bg-[#00C896]/5 transition-all placeholder:text-white/25`;

// ── Main checkout inner component
function CheckoutInner() {
  const searchParams = useSearchParams();
  const pkgId = (searchParams.get("package") ?? "trust") as PackageId;
  const pkg = PACKAGES[pkgId] ?? PACKAGES.trust;

  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");

  const [fd, setFd] = useState({
    firstName: "", lastName: "", email: "", emailConfirm: "", phone: "",
    familyStatus: "", spouseName: "", children: "",
    primaryBeneficiary: "", contingentBeneficiary: "",
    personalRepresentative: "", successor: "",
    assets: "", specialInstructions: "",
    consentTerms: false,
  });
  const [errs, setErrs] = useState<Record<string, string>>({});

  const upd = (k: string, v: string | boolean) =>
    setFd((p) => ({ ...p, [k]: v }));

  const validate = (s: number): Record<string, string> => {
    const e: Record<string, string> = {};
    if (s === 2) {
      if (!fd.firstName.trim()) e.firstName = "Required";
      if (!fd.lastName.trim()) e.lastName = "Required";
      if (!/\S+@\S+\.\S+/.test(fd.email)) e.email = "Valid email required";
      if (fd.email !== fd.emailConfirm) e.emailConfirm = "Emails must match";
      if (fd.phone.trim().length < 7) e.phone = "Valid phone required";
      if (!fd.consentTerms) e.consentTerms = "You must agree to continue";
    }
    if (s === 3) {
      if (!fd.familyStatus) e.familyStatus = "Required";
      if (!fd.primaryBeneficiary.trim()) e.primaryBeneficiary = "Required";
      if (!fd.personalRepresentative.trim()) e.personalRepresentative = "Required";
    }
    return e;
  };

  const next = () => {
    const e = validate(step);
    setErrs(e);
    if (!Object.keys(e).length) {
      setStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const back = () => {
    setStep((s) => s - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePay = async () => {
    setSubmitting(true);
    setApiError("");
    try {
      const res = await fetch("/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packageId: pkg.id,
          intake: {
            firstName: fd.firstName,
            lastName: fd.lastName,
            email: fd.email,
            phone: fd.phone,
            state: "Florida",
            familyStatus: fd.familyStatus,
            spouseName: fd.spouseName || undefined,
            children: fd.children || undefined,
            primaryBeneficiary: fd.primaryBeneficiary,
            contingentBeneficiary: fd.contingentBeneficiary || undefined,
            personalRepresentative: fd.personalRepresentative,
            successor: fd.successor || undefined,
            assets: fd.assets || undefined,
            specialInstructions: fd.specialInstructions || undefined,
            consentAcceptedAt: new Date().toISOString(),
            consentIpAddress: "client",
          },
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setApiError(data.error ?? "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }

      if (data.sessionUrl) {
        window.location.href = data.sessionUrl;
      } else {
        setApiError("Could not create Stripe session. Please try again.");
        setSubmitting(false);
      }
    } catch {
      setApiError("Network error. Please check your connection and try again.");
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0A0A0F] pt-8 pb-20 px-4">
      <div className="max-w-xl mx-auto">

        {/* Logo */}
        <div className="text-center mb-8">
          <a href="/" className="text-xl font-bold">
            <span className="text-[#00C896]">Cleland</span>
            <span className="text-white"> Law</span>
          </a>
        </div>

        {/* Package pill */}
        <div className="flex items-center justify-between bg-[#141422] border border-[#00C896]/25 rounded-2xl px-5 py-4 mb-8">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{pkg.icon}</span>
            <div>
              <p className="text-[10px] text-[#00C896] font-semibold tracking-widest uppercase">
                Selected Package
              </p>
              <p className="font-semibold text-white text-sm">{pkg.name}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-[#00C896]">
              ${pkg.price.toLocaleString()}
            </p>
            <p className="text-[11px] text-white/30">flat fee</p>
          </div>
        </div>

        {/* Step bar */}
        <StepBar step={step} />

        {/* Card */}
        <div className="bg-[#0F0F18] border border-white/10 rounded-3xl p-8">

          {/* ── STEP 1: Confirm ── */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold mb-1">Package Confirmed</h2>
              <p className="text-white/45 text-sm mb-7">
                Everything included in your{" "}
                <span className="text-[#00C896]">{pkg.name}</span>:
              </p>
              <ul className="flex flex-col gap-2.5 mb-7">
                {pkg.includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm border-b border-white/5 pb-2.5"
                  >
                    <span className="text-[#00C896] flex-shrink-0 mt-0.5">✦</span>
                    <span className="text-white/65">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex items-start gap-3 bg-[#00C896]/5 border border-[#00C896]/15 rounded-2xl p-4 mb-7">
                <span className="text-base flex-shrink-0">🔒</span>
                <p className="text-xs text-white/50 leading-relaxed">
                  All information is{" "}
                  <strong className="text-white/70">encrypted end-to-end</strong> and
                  protected under attorney-client privilege once your engagement is
                  established.
                </p>
              </div>
              <button
                onClick={() => { setStep(2); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="w-full py-4 bg-[#00C896] hover:bg-[#00E5A8] text-black font-bold rounded-2xl transition-all"
              >
                Continue to Your Information →
              </button>
            </div>
          )}

          {/* ── STEP 2: Personal Info ── */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold mb-1">Your Information</h2>
              <p className="text-white/45 text-sm mb-7">
                Encrypted and protected under attorney-client privilege.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <Field label="First Name *" error={errs.firstName}>
                  <input
                    className={inputCls(errs.firstName)}
                    placeholder="First"
                    value={fd.firstName}
                    onChange={(e) => upd("firstName", e.target.value)}
                  />
                </Field>
                <Field label="Last Name *" error={errs.lastName}>
                  <input
                    className={inputCls(errs.lastName)}
                    placeholder="Last"
                    value={fd.lastName}
                    onChange={(e) => upd("lastName", e.target.value)}
                  />
                </Field>
              </div>

              <Field label="Email Address *" error={errs.email}>
                <input
                  type="email"
                  className={inputCls(errs.email)}
                  placeholder="your@email.com"
                  value={fd.email}
                  onChange={(e) => upd("email", e.target.value)}
                />
              </Field>

              <Field label="Confirm Email *" error={errs.emailConfirm}>
                <input
                  type="email"
                  className={inputCls(errs.emailConfirm)}
                  placeholder="Confirm email"
                  value={fd.emailConfirm}
                  onChange={(e) => upd("emailConfirm", e.target.value)}
                />
              </Field>

              <Field label="Phone Number *" error={errs.phone}>
                <input
                  type="tel"
                  className={inputCls(errs.phone)}
                  placeholder="(555) 000-0000"
                  value={fd.phone}
                  onChange={(e) => upd("phone", e.target.value)}
                />
              </Field>

              <Field label="State *" hint="Currently serving Florida residents only.">
                <select
                  className={inputCls()}
                  value="Florida"
                  disabled
                >
                  <option value="Florida">Florida</option>
                </select>
              </Field>

              {/* Consent */}
              <div
                className={`rounded-2xl p-4 mb-6 ${
                  errs.consentTerms
                    ? "bg-red-500/5 border border-red-500/30"
                    : "bg-white/3 border border-white/8"
                }`}
              >
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={fd.consentTerms}
                    onChange={(e) => upd("consentTerms", e.target.checked)}
                    className="w-4 h-4 mt-0.5 flex-shrink-0 accent-[#00C896]"
                  />
                  <span className="text-xs text-white/45 leading-relaxed">
                    I acknowledge that proceeding establishes an attorney-client
                    relationship with Ryan Cleland, Esq. for preparation of the
                    selected document(s). My information is protected under
                    attorney-client privilege. Documents are governed by Florida law.
                    I agree to the{" "}
                    <a href="/terms" className="text-[#00C896] underline">
                      Terms of Engagement
                    </a>{" "}
                    and{" "}
                    <a href="/privacy" className="text-[#00C896] underline">
                      Privacy Policy
                    </a>
                    . *
                  </span>
                </label>
                {errs.consentTerms && (
                  <p className="text-red-400 text-xs mt-2">{errs.consentTerms}</p>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={back}
                  className="flex-1 py-3.5 border border-white/10 text-white/45 rounded-2xl text-sm hover:border-white/20 transition-all"
                >
                  ← Back
                </button>
                <button
                  onClick={next}
                  className="flex-[2] py-3.5 bg-[#00C896] hover:bg-[#00E5A8] text-black font-bold rounded-2xl transition-all"
                >
                  Continue to Document Details →
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 3: Document Details ── */}
          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold mb-1">Document Details</h2>
              <p className="text-white/45 text-sm mb-7">
                Ryan will use this to prepare your {pkg.name}.
              </p>

              <Field label="Family / Marital Status *" error={errs.familyStatus}>
                <select
                  className={inputCls(errs.familyStatus)}
                  value={fd.familyStatus}
                  onChange={(e) => upd("familyStatus", e.target.value)}
                >
                  <option value="">Select your situation...</option>
                  {FAMILY_STATUS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </Field>

              {fd.familyStatus.includes("Married") && (
                <Field label="Spouse's Full Legal Name">
                  <input
                    className={inputCls()}
                    placeholder="As it appears on legal documents"
                    value={fd.spouseName}
                    onChange={(e) => upd("spouseName", e.target.value)}
                  />
                </Field>
              )}

              {fd.familyStatus.includes("children") && (
                <Field label="Children (Names & Ages)">
                  <textarea
                    className={inputCls()}
                    rows={3}
                    placeholder="e.g., John Smith Jr., age 12; Sarah Smith, age 8"
                    value={fd.children}
                    onChange={(e) => upd("children", e.target.value)}
                  />
                </Field>
              )}

              <Field
                label="Primary Beneficiary — Who inherits your estate? *"
                error={errs.primaryBeneficiary}
              >
                <input
                  className={inputCls(errs.primaryBeneficiary)}
                  placeholder="Full legal name and relationship"
                  value={fd.primaryBeneficiary}
                  onChange={(e) => upd("primaryBeneficiary", e.target.value)}
                />
              </Field>

              <Field label="Contingent (Backup) Beneficiary">
                <input
                  className={inputCls()}
                  placeholder="Full legal name and relationship"
                  value={fd.contingentBeneficiary}
                  onChange={(e) => upd("contingentBeneficiary", e.target.value)}
                />
              </Field>

              <Field
                label="Personal Representative / Trustee *"
                error={errs.personalRepresentative}
                hint="The person responsible for carrying out your wishes."
              >
                <input
                  className={inputCls(errs.personalRepresentative)}
                  placeholder="Who will administer your estate?"
                  value={fd.personalRepresentative}
                  onChange={(e) => upd("personalRepresentative", e.target.value)}
                />
              </Field>

              <Field label="Successor / Alternate Representative">
                <input
                  className={inputCls()}
                  placeholder="Backup personal representative / trustee"
                  value={fd.successor}
                  onChange={(e) => upd("successor", e.target.value)}
                />
              </Field>

              <Field label="Summary of Major Assets">
                <textarea
                  className={inputCls()}
                  rows={3}
                  placeholder="e.g., Primary residence, bank accounts, investment accounts, vehicles..."
                  value={fd.assets}
                  onChange={(e) => upd("assets", e.target.value)}
                />
              </Field>

              <Field label="Special Instructions or Wishes (Optional)">
                <textarea
                  className={inputCls()}
                  rows={3}
                  placeholder="Specific bequests, charitable gifts, special conditions..."
                  value={fd.specialInstructions}
                  onChange={(e) => upd("specialInstructions", e.target.value)}
                />
              </Field>

              <div className="flex gap-3">
                <button
                  onClick={back}
                  className="flex-1 py-3.5 border border-white/10 text-white/45 rounded-2xl text-sm hover:border-white/20 transition-all"
                >
                  ← Back
                </button>
                <button
                  onClick={next}
                  className="flex-[2] py-3.5 bg-[#00C896] hover:bg-[#00E5A8] text-black font-bold rounded-2xl transition-all"
                >
                  Review &amp; Pay →
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 4: Review & Pay ── */}
          {step === 4 && (
            <div>
              <h2 className="text-2xl font-bold mb-1">Review &amp; Pay</h2>
              <p className="text-white/45 text-sm mb-7">
                Confirm your details and complete secure payment via Stripe.
              </p>

              {/* Order summary */}
              <div className="bg-[#00C896]/5 border border-[#00C896]/15 rounded-2xl p-5 mb-4">
                <p className="text-xs text-[#00C896] font-semibold tracking-widest uppercase mb-3">
                  Order Summary
                </p>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white/60 text-sm">
                    {pkg.icon} {pkg.name}
                  </span>
                  <span className="font-semibold text-white">
                    ${pkg.price.toLocaleString()}
                  </span>
                </div>
                <div className="border-t border-white/8 pt-3 mt-3 flex justify-between items-baseline">
                  <span className="font-semibold text-white">Total Due</span>
                  <span className="text-3xl font-bold text-[#00C896]">
                    ${pkg.price.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Client summary */}
              <div className="bg-white/3 border border-white/8 rounded-2xl p-5 mb-4">
                <p className="text-xs text-white/30 font-semibold tracking-widest uppercase mb-3">
                  Client Details
                </p>
                {[
                  ["Name", `${fd.firstName} ${fd.lastName}`],
                  ["Email", fd.email],
                  ["Phone", fd.phone],
                  ["Status", fd.familyStatus],
                  ["Beneficiary", fd.primaryBeneficiary],
                ]
                  .filter(([, v]) => v)
                  .map(([k, v]) => (
                    <div
                      key={k}
                      className="flex gap-3 py-1.5 border-b border-white/5 last:border-0"
                    >
                      <span className="text-white/25 text-xs w-20 flex-shrink-0 mt-0.5">
                        {k}
                      </span>
                      <span className="text-white/60 text-xs">{v}</span>
                    </div>
                  ))}
              </div>

              {/* Security note */}
              <div className="flex items-center gap-2 mb-5 p-3 bg-white/2 border border-white/6 rounded-xl">
                <span>🔒</span>
                <span className="text-xs text-white/30">
                  You&apos;ll be redirected to Stripe&apos;s secure checkout.
                  256-bit SSL · PCI-DSS Level 1 · Card data never stored on our
                  servers.
                </span>
              </div>

              {/* API error */}
              {apiError && (
                <div className="mb-5 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                  <p className="text-red-400 text-sm">{apiError}</p>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={back}
                  disabled={submitting}
                  className="flex-1 py-3.5 border border-white/10 text-white/45 rounded-2xl text-sm hover:border-white/20 transition-all disabled:opacity-40"
                >
                  ← Back
                </button>
                <button
                  onClick={handlePay}
                  disabled={submitting}
                  className="flex-[2] py-4 bg-gradient-to-r from-[#00C896] to-[#00E5A8] text-black font-bold rounded-2xl transition-all disabled:opacity-60 text-sm"
                >
                  {submitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                      </svg>
                      Redirecting to Stripe...
                    </span>
                  ) : (
                    `🔒 Pay $${pkg.price.toLocaleString()} Securely →`
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Security strip */}
        <div className="flex flex-wrap justify-center gap-5 mt-6">
          {[
            "🔒 256-bit SSL",
            "⚖️ Attorney-Client Privilege",
            "🏛 Florida Bar Licensed",
            "🔐 Zero Data Resale",
          ].map((s) => (
            <span key={s} className="text-xs text-white/20">{s}</span>
          ))}
        </div>
      </div>
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
          <div className="text-white/40 text-sm">Loading...</div>
        </div>
      }
    >
      <CheckoutInner />
    </Suspense>
  );
}
