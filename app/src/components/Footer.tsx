import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#343026] text-[#e4e2dd] rounded-xl">
      <div className="max-w-7xl mx-auto px-6 py-32">

        {/* LOGO GRANDE */}
        <div className="mb-24">
          <img
            src="/logoreverse.png"
            alt="Gisel Marién"
            className="w-64 ml-auto mr-auto"
          />
        </div>

        {/* CONTENT */}
        <div className="grid md:grid-cols-12 gap-16">

          {/* NEWSLETTER */}
          <div className="md:col-span-4 space-y-6">
            <p className="text-xs uppercase tracking-[0.18em]">
              Newsletter
            </p>

            <p className="text-sm leading-relaxed max-w-sm opacity-90">
              Aggiornamenti su progetti, rituali contemporanei
              e produzioni in corso.  
              Nessuna comunicazione superflua.
            </p>

            <form className="flex gap-2">
              <input
                type="email"
                placeholder="La tua email"
                className="flex-1 rounded-full px-5 py-3 text-sm text-[#343026] bg-[#e4e2dd] focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-full px-6 py-3 text-xs uppercase tracking-[0.18em] bg-[#e4e2dd] text-[#343026] hover:opacity-90 transition"
              >
                Iscriviti
              </button>
            </form>
          </div>

          {/* LINKS */}
          <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-12">

            {/* Navigate */}
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.18em]">
                Navigate
              </p>
              <ul className="space-y-2 text-sm opacity-90">
                <li><Link href="/approach">Manifesto</Link></li>
                <li><Link href="/projects">Progetti</Link></li>
                <li><Link href="/collaborations">Collaborazioni</Link></li>
                <li><Link href="/contact">Contatti</Link></li>
              </ul>
            </div>

            {/* Social */}
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.18em]">
                Social
              </p>
              <ul className="space-y-2 text-sm opacity-90">
                <li>Instagram</li>
                <li>TikTok</li>
                <li>Email</li>
                <li>WhatsApp</li>
                <li>Facebook</li>
              </ul>
            </div>

            {/* Official */}
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.18em]">
                Official
              </p>
              <ul className="space-y-2 text-sm opacity-90">
                <li><Link href="/privacy">Privacy Policy</Link></li>
                <li><Link href="/cookies">Cookie Policy</Link></li>
                <li><Link href="/terms">Terms & Conditions</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.18em]">
                Support
              </p>
              <ul className="space-y-2 text-sm opacity-90">
                <li>hello@giselmarien.com</li>
                <li>WhatsApp · +39 347 477 4701</li>
                <li>Italy — Worldwide</li>
              </ul>
            </div>

          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-32 pt-8 border-t border-[#e4e2dd]/20 flex flex-col md:flex-row justify-between gap-6 text-xs opacity-70">
          <p>© {new Date().getFullYear()} Gisel Marién</p>
          <p>Artistic Production House · Made in Italy</p>
        </div>

      </div>
    </footer>
  );
}
