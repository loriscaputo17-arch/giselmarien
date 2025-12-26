import Link from "next/link";

export default function Manifesto() {
  return (
    <main className="pt-16">

      {/* HERO MANIFESTO */}
      <section
        className="min-h-screen relative flex items-center justify-center rounded-xl text-white"
        style={{
          backgroundImage: "url('/bg9.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-sand-50/75 backdrop-blur-sm rounded-lg" />

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center space-y-10">
          <p className="text-xs uppercase tracking-[0.22em] text-ink-500">
            Manifesto
          </p>

          <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-[0.95]">
            Non decoriamo eventi.
            <br />
            Costruiamo rituali.
          </h1>

          <p className="text-ink-700 leading-relaxed">
            Crediamo negli eventi come momenti di presenza,
            non come semplici scenografie.
            Ogni progetto è un gesto intenzionale,
            costruito per durare nella memoria.
          </p>
        </div>
      </section>

      {/* STATEMENT SCURO */}
      <section className="py-40 bg-[#343026] rounded-xl mt-8">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-light tracking-tight leading-tight text-[#e4e2dd]">
            La forma non è un dettaglio.
            <br />
            È un linguaggio.
          </h2>
        </div>
      </section>

      {/* MANIFESTO TESTO */}
      <section className="py-40 bg-sand-50">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-12 gap-16 items-start">

          {/* LEFT */}
          <div className="md:col-span-4 space-y-6">
            <p className="text-xs uppercase tracking-[0.22em] text-ink-500">
              Visione
            </p>
            <h3 className="text-3xl font-light tracking-tight">
              Eventi come rituali contemporanei
            </h3>
          </div>

          {/* RIGHT */}
          <div className="md:col-span-8 space-y-8 text-ink-700 leading-relaxed">
            <p>
              Gisel Marién nasce dal desiderio di restituire
              significato agli eventi contemporanei.
              Non come elementi decorativi,
              ma come sistemi di gesti, forme e materiali
              pensati per un tempo preciso.
            </p>

            <p>
              Ogni progetto è costruito a partire da un’intenzione.
              Il contesto, le persone e il momento
              diventano parte integrante della forma finale.
              Nulla è casuale, nulla è standard.
            </p>
          </div>

        </div>
      </section>

      {/* IMMAGINI EDITORIALI */}
      <section className="py-40 bg-sand-50">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">
          <img src="/bg3.jpg" className="w-full h-full object-cover rounded-xl" />
          <img src="/bg5.jpg" className="w-full h-full object-cover rounded-xl" />
          <img src="/bg6.jpg" className="w-full h-full object-cover rounded-xl" />
        </div>
      </section>

      {/* PRINCIPI */}
      <section className="py-40 bg-[#343026] rounded-xl">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-16 text-[#e4e2dd] text-center">

          {[
            ["Intenzione", "Ogni progetto nasce da una scelta consapevole."],
            ["Materia", "La materia è parte del racconto, non un mezzo neutro."],
            ["Tempo", "Progetti pensati per il momento giusto, non per l’effetto."],
          ].map(([title, text]) => (
            <div key={title} className="space-y-4">
              <p className="text-xs uppercase tracking-[0.22em] opacity-80">
                Principio
              </p>
              <h3 className="text-2xl font-light">{title}</h3>
              <p className="text-sm opacity-80 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CHIUSURA */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden rounded-xl mt-8 mb-8"
        style={{
          backgroundImage: "url('/bg11.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-sand-50/70 backdrop-blur-sm rounded-lg" />

        <div className="relative z-10 max-w-4xl px-6 text-center space-y-10">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight">
            Produciamo forme
            <br />
            che restano nel tempo.
          </h2>

          <p className="text-ink-700 leading-relaxed max-w-2xl mx-auto">
            Non per stupire.
            Ma per dare valore a un momento condiviso.
          </p>

          <Link
            href="/contact"
            className="inline-block rounded-full border border-sand-300 px-8 py-4 text-xs uppercase tracking-[0.18em] hover:bg-sand-200 transition"
          >
            Parliamone
          </Link>
        </div>
      </section>

    </main>
  );
}
