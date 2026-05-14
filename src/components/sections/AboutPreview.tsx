export default function AboutPreview() {
  return (
    <section id="about" className="py-20 px-6 bg-[#0A0A0F]">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="glass p-8 rounded-3xl">
          <div className="aspect-[4/3] bg-gradient-to-br from-[#1A1A2E] to-[#0F0F18] rounded-2xl flex items-center justify-center mb-8">
            <span className="text-8xl">👨‍⚖️</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {["Florida Bar 2023", "Barry University Law", "Estate Planning Specialist"].map((b) => (
              <span key={b} className="text-xs bg-white/5 px-4 py-2 rounded-full border border-white/10">{b}</span>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ryan Cleland, Esq.</h2>
          <p className="text-[#00C896] font-medium mb-6">Florida Bar Licensed Estate Planning Attorney</p>
          <p className="text-white/70 leading-relaxed mb-8">
            Ryan Cleland is a Florida-licensed attorney practicing exclusively in estate planning and probate. 
            He believes quality legal services should be accessible, transparent, and stress-free.
          </p>
          <a href="#" className="text-[#00C896] underline">Learn more about Ryan →</a>
        </div>
      </div>
    </section>
  );
}
