import Link from "next/link";
import Warmform from "@/app/src/components/Warmform";
import PhoneGate from "@/app/src/components/PhoneGate";

export default function Home() {
  return (
    <>
          <PhoneGate />

    <main className="pt-16">

      {/* HERO */}
      <section
        className="min-h-screen relative flex items-center justify-center rounded-xl"
        style={{
          backgroundImage: "url('/bg4.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-sand-50/75 backdrop-blur-sm rounded-lg" />

        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center space-y-10">

          <p className="text-xs uppercase tracking-[0.22em] text-ink-500">
            Artistic Production House
          </p>

          <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-[0.95]">
            Progettiamo
            <br />
            gesti che restano
          </h1>

          <p className="text-ink-700 leading-relaxed">
            Oggetti, allestimenti e rituali contemporanei
            progettati su misura per eventi che meritano attenzione.
          </p>

          <Link
            href="#form"
            className="inline-block rounded-full border border-sand-300 px-8 py-4 text-xs uppercase tracking-[0.18em] hover:bg-sand-200 transition"
          >
            Prenota un incontro
          </Link>

          <p className="text-[10px] uppercase tracking-[0.18em] text-ink-500">
            Italia · Produzione su misura · Solo su appuntamento
          </p>
        </div>
      </section>


      {/* FORM CALDO */}
      <div id="form">
        <Warmform />
      </div>

      {/* STATEMENT */}
      <section className="py-40 bg-[#343026] rounded-xl">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-light tracking-tight leading-tight text-[#e4e2dd]">
            Non decoriamo eventi.
            <br />
            Costruiamo significati.
          </h2>
        </div>
      </section>

      {/* ABOUT / IMMAGINI */}
      <section className="py-40 bg-sand-50">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-16 items-center">

          {/* TEXT */}
          <div className="md:col-span-4 space-y-8">
            <p className="text-xs uppercase tracking-[0.22em] text-ink-500">
              About
            </p>

            <h2 className="text-3xl md:text-4xl font-light tracking-tight">
              Gisel Marién
            </h2>

            <p className="text-ink-700 leading-relaxed">
              Casa di produzione artistica dedicata alla progettazione
              di oggetti, rituali e allestimenti per eventi contemporanei.
              Ogni progetto nasce da un’intenzione precisa.
            </p>

            <Link
              href="/approach"
              className="inline-block text-xs uppercase tracking-[0.18em] border-b border-ink pb-1"
            >
              Scopri il nostro approccio
            </Link>
          </div>

          {/* IMAGES */}
          <div className="md:col-span-8 grid grid-cols-2 gap-8">
            <img src="/bg3.jpg" className="w-full object-cover rounded-xl" />
            <img src="/bg5.jpg" className="w-full object-cover rounded-xl" />
            <img src="/bg6.jpg" className="w-full object-cover rounded-xl" />
            <img src="/bg8.jpg" className="w-full object-cover rounded-xl" />
          </div>

        </div>
      </section>

      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden rounded-xl"
        style={{
          backgroundImage: "url('/bg11.jpg')", // usa la tua img
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-sand-50/75 backdrop-blur-sm rounded-lg" />

        {/* Content */}
        <div className="relative z-10 max-w-5xl w-full px-6 py-32 text-white">

          {/* Header */}
          <div className="text-center mb-24 space-y-4">
            <p className="text-xs uppercase tracking-[0.22em] opacity-80">
              Metodo
            </p>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight">
              Costruiamo un sistema
              <br />
              ad alta variabilità
            </h2>
          </div>

          {/* SERPENTINE */}
          <div className="relative">

            {/* SVG LINE */}
            <svg
              viewBox="0 0 800 1200"
              className="w-full max-w-3xl mx-auto"
              fill="none"
            >
              <path
                d="
                  M400 0
                  C400 120, 200 120, 200 240
                  C200 360, 600 360, 600 480
                  C600 600, 200 600, 200 720
                  C200 840, 600 840, 600 960
                  C600 1080, 400 1080, 400 1200
                "
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />

              {/* DOTS */}
              {[
                [400, 0],
                [200, 240],
                [600, 480],
                [200, 720],
                [600, 960],
              ].map(([x, y], i) => (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r="10"
                  fill="white"
                />
              ))}
            </svg>

            {/* TEXT BLOCKS */}
            <div className="absolute inset-0 pointer-events-none">

              {/* 1 */}
              <div className="absolute left-1/2 -translate-x-1/2 top-0 text-center max-w-xs">
                <p className="text-sm uppercase tracking-[0.18em] mb-2">
                  Sistema modulare
                </p>
                <p className="text-xs opacity-80">
                  Ogni progetto nasce da moduli flessibili,
                  adattabili al contesto.
                </p>
              </div>

              {/* 2 */}
              <div className="absolute left-0 top-[20%] max-w-xs">
                <p className="text-sm uppercase tracking-[0.18em] mb-2">
                  Più possibilità
                </p>
                <p className="text-xs opacity-80">
                  Oggetti semplici e complessi,
                  massima variazione.
                </p>
              </div>

              {/* 3 */}
              <div className="absolute right-0 top-[40%] text-right max-w-xs">
                <p className="text-sm uppercase tracking-[0.18em] mb-2">
                  Ampio range
                </p>
                <p className="text-xs opacity-80">
                  Un sistema accessibile
                  a esigenze diverse.
                </p>
              </div>

              {/* 4 */}
              <div className="absolute left-0 top-[60%] max-w-xs">
                <p className="text-sm uppercase tracking-[0.18em] mb-2">
                  Tempi diversi
                </p>
                <p className="text-xs opacity-80">
                  Progetti rapidi o
                  percorsi più lunghi.
                </p>
              </div>

              {/* 5 */}
              <div className="absolute right-0 top-[80%] text-right max-w-xs">
                <p className="text-sm uppercase tracking-[0.18em] mb-2">
                  Continuità
                </p>
                <p className="text-xs opacity-80">
                  Elementi che vivono
                  oltre l’evento.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      <section className="py-28 bg-sand-50">
        <div className="max-w-4xl mx-auto px-6 text-center">

          <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-4">
            Raccontaci cosa stai immaginando
          </h2>

          <p className="text-ink-700 leading-relaxed max-w-xl mx-auto mb-8">
            Non serve avere tutto chiaro.
            Basta un’intenzione iniziale.
          </p>

          <div className="flex items-center justify-center gap-4">
            <span className="block w-8 h-px bg-ink/40" />
            <Link
              href="#form"
              className="text-xs uppercase tracking-[0.22em] hover:opacity-60 transition"
            >
              Inizia da qui
            </Link>
            <span className="block w-8 h-px bg-ink/40" />
          </div>

        </div>
      </section>

    </main>
    </>
  );
}
