export default function Why() {
  const cards = [
    {
      icon: "👨‍⚖️",
      title: "Real Attorney Review",
      body: "Every document is personally reviewed and signed by Ryan Cleland, Esq. — a licensed Florida Bar attorney focused exclusively on estate planning."
    },
    {
      icon: "🔐",
      title: "Bank-Level Security",
      body: "Your intake data is encrypted end-to-end and protected under attorney-client privilege. We never share or sell your information."
    },
    {
      icon: "⚡",
      title: "Lightning Fast Turnaround",
      body: "From form submission to completed documents in 3–5 business days. Priority packages delivered in 24–48 hours."
    },
    {
      icon: "💎",
      title: "No Hourly Surprises",
      body: "One flat fee. No consultation charges. No 'per-document' billing. No invoice at the end wondering what you paid for."
    }
  ];

  return (
    <section id="why" className="py-20 px-6 bg-[#0A0A0F]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose Cleland Law?</h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            The best of both worlds: Attorney quality + modern convenience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, i) => (
            <div key={i} className="glass p-8 rounded-3xl hover:-translate-y-1 transition-all">
              <div className="text-4xl mb-6">{card.icon}</div>
              <h3 className="text-xl font-semibold mb-4">{card.title}</h3>
              <p className="text-white/70 leading-relaxed">{card.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
