export default function CtaBanner() {
  return (
    <section className="py-20 px-6 bg-gradient-to-br from-[#0F0F18] to-[#1A1A2E]">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Don’t leave your family unprotected.</h2>
        <p className="text-xl text-white/70 mb-10">Wills from $299. Trusts from $899. Attorney-prepared.</p>
        <a href="#packages" className="inline-block bg-[#00C896] text-black font-semibold text-xl px-12 py-5 rounded-2xl hover:bg-[#00E5A8] transition-all">
          Start My Estate Plan →
        </a>
      </div>
    </section>
  );
}
