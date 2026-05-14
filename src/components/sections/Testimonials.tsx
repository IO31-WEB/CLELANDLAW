export default function Testimonials() {
  const reviews = [
    { quote: "Ryan walked me through the entire trust process. Documents in hand within a week.", name: "Margaret T.", location: "Naples, FL" },
    { quote: "Far better than LegalZoom. Real attorney, real service.", name: "David K.", location: "Fort Myers, FL" },
    { quote: "Having a real Florida Bar attorney sign off gave me confidence.", name: "Patricia W.", location: "Sarasota, FL" },
  ];

  return (
    <section className="py-20 px-6 bg-[#0F0F18]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Florida Families Protected</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <div key={i} className="glass p-8 rounded-3xl">
              <div className="text-5xl text-[#00C896] mb-6">“</div>
              <p className="text-white/80 italic mb-8">"{r.quote}"</p>
              <div>
                <div className="font-semibold">{r.name}</div>
                <div className="text-white/50 text-sm">{r.location}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
