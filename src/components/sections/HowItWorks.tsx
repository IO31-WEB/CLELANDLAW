export default function HowItWorks() {
  const steps = [
    { n: "01", t: "Choose Your Package", b: "Select from Will, Trust, or Complete Estate Plan." },
    { n: "02", t: "Complete Secure Intake", b: "Guided questionnaire — encrypted and confidential (~15 minutes)." },
    { n: "03", t: "Secure Checkout", b: "Pay via Stripe. Flat fee with no surprises." },
    { n: "04", t: "Ryan Drafts Your Documents", b: "Personally prepared and reviewed within 3–5 business days." },
    { n: "05", t: "Receive & Sign", b: "Secure download link delivered via email." }
  ];

  return (
    <section id="process" className="py-20 px-6 bg-[#0F0F18]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
          <p className="text-white/70 text-lg">Five simple steps from start to protected.</p>
        </div>

        <div className="grid md:grid-cols-5 gap-8">
          {steps.map((s, i) => (
            <div key={i} className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-white/10 flex items-center justify-center text-2xl font-bold border border-white/20">
                {s.n}
              </div>
              <h3 className="font-semibold mb-3">{s.t}</h3>
              <p className="text-white/60 text-sm">{s.b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
