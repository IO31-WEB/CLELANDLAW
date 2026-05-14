export default function Footer() {
  return (
    <footer className="bg-[#0A0A0F] border-t border-white/10 py-16 px-6">
      <div className="max-w-6xl mx-auto text-center md:text-left">
        <div className="text-2xl font-bold mb-2">
          <span className="text-[#00C896]">Cleland</span> Law
        </div>
        <p className="text-white/50 mb-8">Florida Estate Planning Attorney</p>

        <div className="grid md:grid-cols-3 gap-8 text-sm text-white/60">
          <div>
            <strong className="text-white block mb-4">Services</strong>
            <p>Last Will & Testament</p>
            <p>Revocable Living Trust</p>
            <p>Complete Estate Plan</p>
          </div>
          <div>
            <strong className="text-white block mb-4">Company</strong>
            <p>About Ryan</p>
            <p>Contact</p>
          </div>
          <div>
            <p className="text-xs leading-relaxed">
              © {new Date().getFullYear()} Cleland Law · Ryan Cleland, Esq.<br />
              Florida Bar Licensed • Attorney Advertising
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
