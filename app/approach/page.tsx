import Link from "next/link";
// src/app/approach/page.tsx — aggiungere in cima al file esistente
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Il Nostro Approccio",
  description:
    "Scopri il metodo di Gisel Marién: ascolto, progettazione, produzione artigianale e consegna. Ogni bomboniera e allestimento nasce da un'intenzione precisa.",
  alternates: {
    canonical: "/approach",
  },
  openGraph: {
    title: "Il Nostro Approccio — Gisel Marién Atelier",
    description:
      "Dal primo incontro alla consegna finale: scopri come lavoriamo e perché ogni progetto è unico.",
    url: "https://giselmarien.com/approach",
  },
};

export default function Manifesto() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Jost:wght@300;400;500&display=swap');

        :root {
          --ink:      #2C2418;
          --ink-mid:  #5A4A35;
          --ink-soft: rgba(90,74,53,0.5);
          --gold:     #A07832;
          --gold-lt:  rgba(160,130,70,0.35);
          --sand:     #FAF8F3;
          --sand-2:   #F2EDE2;
          --dark:     #1E1A12;
          --dark-2:   #2C2418;
          --cream:    #E4E2DD;
        }

        html { scroll-behavior: smooth; }
        body { font-family: 'Jost', sans-serif; background: var(--sand); color: var(--ink); }

        /* ── Shared ── */
        .orn-row { display: flex; align-items: center; justify-content: center; gap: 12px; }
        .orn-line { flex: 1; max-width: 60px; height: 1px; background: var(--gold-lt); }
        .orn-diamond { width: 5px; height: 5px; background: rgba(160,130,70,0.5); transform: rotate(45deg); flex-shrink: 0; }
        .eyebrow { font-family: 'Jost', sans-serif; font-size: 9px; font-weight: 400; letter-spacing: 0.4em; text-transform: uppercase; color: var(--gold); display: block; }

        /* ════════════════════════
           HERO
        ════════════════════════ */
        .mf-hero {
          min-height: 100vh;
          position: relative;
          display: flex; align-items: center; justify-content: center;
          background-image: url('/bg9.jpg');
          background-size: cover; background-position: center;
          overflow: hidden;
        }
        .mf-hero-overlay {
          position: absolute; inset: 0;
          background: rgba(245,242,236,0.80);
          backdrop-filter: blur(5px) saturate(1.2);
          -webkit-backdrop-filter: blur(5px) saturate(1.2);
        }
        .mf-hero-content {
          position: relative; z-index: 10;
          max-width: 800px; margin: 0 auto;
          padding: 140px 32px 120px;
          text-align: center;
          display: flex; flex-direction: column; align-items: center; gap: 0;
        }
        .mf-hero-eyebrow { margin-bottom: 28px; }
        .mf-hero-orn { margin-bottom: 40px; }
        .mf-hero-h1 {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(42px, 8.5vw, 88px);
          line-height: 1.03; letter-spacing: -0.01em;
          color: var(--ink); margin-bottom: 28px;
        }
        .mf-hero-h1 em { font-style: italic; color: var(--gold); }
        .mf-hero-sub {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300; font-style: italic;
          font-size: clamp(16px, 3vw, 21px); line-height: 1.7;
          color: var(--ink-mid); max-width: 520px; margin-bottom: 48px;
        }
        .mf-hero-scroll {
          display: flex; flex-direction: column; align-items: center; gap: 8px;
          font-family: 'Jost', sans-serif; font-size: 8px; font-weight: 300;
          letter-spacing: 0.35em; text-transform: uppercase;
          color: var(--ink-soft);
        }
        .mf-scroll-line {
          width: 1px; height: 40px;
          background: linear-gradient(var(--gold-lt), transparent);
          animation: scrolldrop 2s ease-in-out infinite;
        }
        @keyframes scrolldrop {
          0%,100% { transform: scaleY(1); opacity:.5; }
          50%      { transform: scaleY(0.5); opacity:1; }
        }

        /* ════════════════════════
           PULL QUOTE
        ════════════════════════ */
        .mf-pullquote {
          background: var(--dark);
          padding: 100px 32px;
          position: relative; overflow: hidden;
        }
        .mf-pullquote::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 70% 50% at 50% 50%, rgba(160,120,50,0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        .mf-pullquote-inner {
          max-width: 800px; margin: 0 auto;
          text-align: center; display: flex; flex-direction: column; align-items: center; gap: 28px;
        }
        .mf-pq-text {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(30px, 6vw, 58px);
          line-height: 1.15; letter-spacing: 0.01em;
          color: var(--cream);
        }
        .mf-pq-text em { font-style: italic; color: rgba(220,185,120,0.9); }

        /* ════════════════════════
           VISION SPLIT
        ════════════════════════ */
        .mf-vision {
          background: var(--sand); padding: 120px 32px;
        }
        .mf-vision-inner {
          max-width: 1100px; margin: 0 auto;
          display: grid; grid-template-columns: 5fr 7fr;
          gap: 80px; align-items: start;
        }
        .mf-vision-left { display: flex; flex-direction: column; gap: 24px; position: sticky; top: 120px; }
        .mf-vision-h3 {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300; font-size: clamp(28px, 4vw, 42px);
          line-height: 1.15; color: var(--ink);
        }
        .mf-vision-h3 em { font-style: italic; color: var(--gold); }
        .mf-vision-img {
          width: 100%; aspect-ratio: 3/4; object-fit: cover;
          filter: brightness(0.95) saturate(0.9);
          margin-top: 8px;
        }
        .mf-vision-right { display: flex; flex-direction: column; gap: 36px; padding-top: 8px; }
        .mf-vision-para {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300; font-style: italic;
          font-size: clamp(17px, 2.5vw, 21px); line-height: 1.8;
          color: var(--ink-mid);
        }
        .mf-vision-para strong {
          font-style: normal; font-weight: 400; color: var(--ink);
        }
        .mf-vision-divider {
          width: 100%; height: 1px;
          background: linear-gradient(90deg, rgba(160,130,70,0.2), transparent);
        }
        @media (max-width: 900px) {
          .mf-vision-inner { grid-template-columns: 1fr; gap: 48px; }
          .mf-vision-left { position: static; }
        }

        /* ════════════════════════
           EDITORIAL IMAGES
        ════════════════════════ */
        .mf-editorial {
          background: var(--sand-2); padding: 0 32px;
        }
        .mf-editorial-inner {
          max-width: 1200px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr 1.3fr 1fr;
          gap: 12px; align-items: end;
        }
        .mf-ed-img {
          width: 100%; object-fit: cover;
          filter: brightness(0.94) saturate(0.88);
          transition: filter .4s ease;
        }
        .mf-ed-img:hover { filter: brightness(1) saturate(1); }
        .mf-ed-img:nth-child(1) { aspect-ratio: 2/3; }
        .mf-ed-img:nth-child(2) { aspect-ratio: 3/4; margin-bottom: 40px; }
        .mf-ed-img:nth-child(3) { aspect-ratio: 2/3; }
        @media (max-width: 640px) { .mf-editorial-inner { grid-template-columns: 1fr; } .mf-ed-img:nth-child(2) { margin-bottom: 0; } }

        /* ════════════════════════
           PRINCIPLES
        ════════════════════════ */
        .mf-principles {
          background: var(--dark-2); padding: 120px 32px;
          position: relative; overflow: hidden;
        }
        .mf-principles::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 60% 40% at 50% 0%, rgba(160,120,50,0.08) 0%, transparent 65%);
          pointer-events: none;
        }
        .mf-principles-inner {
          max-width: 1100px; margin: 0 auto;
          display: flex; flex-direction: column; align-items: center; gap: 72px;
        }
        .mf-principles-header {
          text-align: center; display: flex; flex-direction: column; align-items: center; gap: 20px;
        }
        .mf-principles-h2 {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300; font-size: clamp(28px, 5vw, 48px);
          line-height: 1.15; color: var(--cream);
        }
        .mf-principles-h2 em { font-style: italic; color: rgba(220,185,120,0.9); }
        .mf-principles-grid {
          width: 100%; display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px;
        }
        .mf-principle {
          background: rgba(255,255,255,0.03);
          padding: 44px 32px; display: flex; flex-direction: column; gap: 18px;
          border-top: 1px solid rgba(160,130,70,0.12);
          transition: background .3s ease;
          position: relative;
        }
        .mf-principle::after {
          content: '';
          position: absolute; top: -1px; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, rgba(160,130,70,0.6), transparent);
          opacity: 0; transition: opacity .35s;
        }
        .mf-principle:hover { background: rgba(255,255,255,0.05); }
        .mf-principle:hover::after { opacity: 1; }
        .mf-principle-num {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300; font-style: italic;
          font-size: 40px; color: rgba(160,130,70,0.2); line-height: 1;
        }
        .mf-principle-title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300; font-size: clamp(22px, 3vw, 30px);
          color: var(--cream); line-height: 1;
        }
        .mf-principle-title em { font-style: italic; color: rgba(220,185,120,0.8); }
        .mf-principle-body {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300; font-style: italic;
          font-size: clamp(14px, 2vw, 16px); line-height: 1.8;
          color: rgba(220,210,195,0.5);
        }
        @media (max-width: 768px) { .mf-principles-grid { grid-template-columns: 1fr; } }

        /* ════════════════════════
           FULL BLEED + QUOTE
        ════════════════════════ */
        .mf-fullbleed {
          width: 100%; aspect-ratio: 16/7; overflow: hidden;
          position: relative;
        }
        .mf-fullbleed img {
          width: 100%; height: 100%; object-fit: cover;
          filter: brightness(0.55) saturate(0.7);
          transition: transform 8s ease;
        }
        .mf-fullbleed:hover img { transform: scale(1.03); }
        .mf-fullbleed-overlay {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
          flex-direction: column; gap: 24px; padding: 32px;
          text-align: center;
        }
        .mf-fb-quote {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300; font-style: italic;
          font-size: clamp(22px, 4.5vw, 44px); line-height: 1.3;
          color: rgba(250,248,243,0.92); max-width: 800px;
        }
        .mf-fb-attr {
          font-family: 'Jost', sans-serif;
          font-size: 9px; font-weight: 300;
          letter-spacing: 0.38em; text-transform: uppercase;
          color: rgba(220,185,120,0.6);
        }
        @media (max-width: 768px) { .mf-fullbleed { aspect-ratio: 4/3; } }

        /* ════════════════════════
           MANIFESTO TEXT BLOCKS
        ════════════════════════ */
        .mf-texts {
          background: var(--sand-2); padding: 120px 32px;
        }
        .mf-texts-inner {
          max-width: 900px; margin: 0 auto;
          display: flex; flex-direction: column; gap: 0;
        }
        .mf-text-block {
          display: grid; grid-template-columns: 1fr 2fr;
          gap: 56px; align-items: start;
          padding: 56px 0;
          border-bottom: 1px solid rgba(160,130,70,0.1);
        }
        .mf-text-block:first-child { border-top: 1px solid rgba(160,130,70,0.1); }
        .mf-text-label {
          display: flex; flex-direction: column; gap: 10px; padding-top: 4px;
        }
        .mf-text-title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300; font-size: clamp(20px, 3vw, 28px);
          line-height: 1.15; color: var(--ink);
        }
        .mf-text-title em { font-style: italic; color: var(--gold); }
        .mf-text-body {
          display: flex; flex-direction: column; gap: 20px;
        }
        .mf-text-para {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300; font-style: italic;
          font-size: clamp(16px, 2.5vw, 19px); line-height: 1.8;
          color: var(--ink-mid);
        }
        .mf-text-para strong { font-style: normal; font-weight: 400; color: var(--ink); }
        @media (max-width: 700px) { .mf-text-block { grid-template-columns: 1fr; gap: 24px; } }

        /* ════════════════════════
           CLOSING
        ════════════════════════ */
        .mf-closing {
          background: var(--dark);
          position: relative; overflow: hidden;
          padding: 0;
        }
        .mf-closing-bg {
          position: absolute; inset: 0;
          background-image: url('/bg11.jpg');
          background-size: cover; background-position: center;
          filter: brightness(0.25) saturate(0.5);
        }
        .mf-closing-glow {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 70% 60% at 50% 60%, rgba(160,120,50,0.15) 0%, transparent 70%);
          pointer-events: none;
        }
        .mf-closing-inner {
          position: relative; z-index: 10;
          max-width: 700px; margin: 0 auto;
          padding: 140px 32px;
          text-align: center;
          display: flex; flex-direction: column; align-items: center; gap: 28px;
        }
        .mf-closing-h2 {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300; font-size: clamp(32px, 6vw, 60px);
          line-height: 1.1; color: var(--cream);
        }
        .mf-closing-h2 em { font-style: italic; color: rgba(220,185,120,0.9); }
        .mf-closing-body {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300; font-style: italic;
          font-size: clamp(15px, 2.5vw, 18px); line-height: 1.75;
          color: rgba(220,210,195,0.55); max-width: 420px;
        }
        .mf-closing-cta {
          display: inline-flex; align-items: center; gap: 12px;
          font-family: 'Jost', sans-serif;
          font-size: 10px; font-weight: 500;
          letter-spacing: 0.32em; text-transform: uppercase;
          color: var(--dark); background: rgba(220,200,155,0.9);
          padding: 16px 40px; text-decoration: none;
          position: relative; overflow: hidden;
          transition: background .3s ease;
        }
        .mf-closing-cta::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          transform: translateX(-100%); transition: transform .6s ease;
        }
        .mf-closing-cta:hover::before { transform: translateX(100%); }
        .mf-closing-cta:hover { background: rgba(220,200,155,1); }
        .mf-closing-footer {
          font-family: 'Jost', sans-serif;
          font-size: 9px; font-weight: 300;
          letter-spacing: 0.3em; text-transform: uppercase;
          color: rgba(220,210,195,0.25);
        }

        @media (max-width: 600px) { .mf-hero-content { padding: 120px 24px 80px; } }
      `}</style>

      <main>

        {/* ── HERO ── */}
        <section className="mf-hero">
          <div className="mf-hero-overlay" />
          <div className="mf-hero-content">

            <span className="eyebrow mf-hero-eyebrow">Manifesto</span>

            <div className="orn-row mf-hero-orn" style={{ width:"100%", maxWidth:200 }}>
              <span className="orn-line" /><span className="orn-diamond" /><span className="orn-line" />
            </div>

            <h1 className="mf-hero-h1">
              Non decoriamo eventi.<br />
              <em>Costruiamo rituali.</em>
            </h1>

            <p className="mf-hero-sub">
              Crediamo negli eventi come momenti di presenza autentica,
              non come semplici scenografie. Ogni progetto è un gesto intenzionale,
              costruito per durare nella memoria di chi lo vive.
            </p>

            <div className="mf-hero-scroll">
              <span className="mf-scroll-line" />
              <span>Scopri</span>
            </div>

          </div>
        </section>

        {/* ── PULL QUOTE ── */}
        <section className="mf-pullquote">
          <div className="mf-pullquote-inner">
            <div className="orn-row" style={{ width:"100%", maxWidth:160 }}>
              <span className="orn-line" style={{ background:"rgba(160,130,70,0.2)" }} />
              <span className="orn-diamond" style={{ background:"rgba(160,130,70,0.3)" }} />
              <span className="orn-line" style={{ background:"rgba(160,130,70,0.2)" }} />
            </div>
            <h2 className="mf-pq-text">
              La forma non è un dettaglio.<br />
              <em>È un linguaggio.</em>
            </h2>
            <div className="orn-row" style={{ width:"100%", maxWidth:160 }}>
              <span className="orn-line" style={{ background:"rgba(160,130,70,0.2)" }} />
              <span className="orn-diamond" style={{ background:"rgba(160,130,70,0.3)" }} />
              <span className="orn-line" style={{ background:"rgba(160,130,70,0.2)" }} />
            </div>
          </div>
        </section>

        {/* ── VISION SPLIT ── */}
        <section className="mf-vision">
          <div className="mf-vision-inner">

            <div className="mf-vision-left">
              <span className="eyebrow">Visione</span>
              <h3 className="mf-vision-h3">
                Eventi come<br /><em>rituali contemporanei</em>
              </h3>
              <img src="/bg12.jpg" className="mf-vision-img" alt="" />
            </div>

            <div className="mf-vision-right">
              <p className="mf-vision-para">
                Gisel Marién nasce dal desiderio di restituire <strong>significato agli eventi contemporanei.</strong> Non come elementi decorativi, ma come sistemi di gesti, forme e materiali pensati per un tempo preciso.
              </p>
              <div className="mf-vision-divider" />
              <p className="mf-vision-para">
                Ogni progetto è costruito a partire da un'intenzione. Il contesto, le persone e il momento diventano parte integrante della forma finale. <strong>Nulla è casuale, nulla è standard.</strong>
              </p>
              <div className="mf-vision-divider" />
              <p className="mf-vision-para">
                Lavoriamo in tutta Italia e per clienti internazionali — da Londra a New York, da Bangkok a Montecarlo. La nostra produzione artigianale viaggia ovunque <strong>senza perdere identità.</strong>
              </p>
              <div className="mf-vision-divider" />
              <p className="mf-vision-para">
                Quello che realizziamo non è mai pensato per stupire nell'immediato. È pensato per <strong>restare — come ricordo, come gesto, come oggetto che continua a raccontare.</strong>
              </p>
            </div>

          </div>
        </section>

        {/* ── EDITORIAL IMAGES ── */}
        <section className="mf-editorial">
          <div className="mf-editorial-inner">
            <img src="/bg13.jpg" className="mf-ed-img" alt="" />
            <img src="/bg14.jpg" className="mf-ed-img" alt="" />
            <img src="/bg8.jpg" className="mf-ed-img" alt="" />
          </div>
        </section>

        {/* ── PRINCIPLES ── */}
        <section className="mf-principles">
          <div className="mf-principles-inner">
            <div className="mf-principles-header">
              <span className="eyebrow" style={{ color:"rgba(220,185,120,0.55)" }}>I nostri principi</span>
              <h2 className="mf-principles-h2">
                Tre parole che guidano<br /><em>ogni progetto</em>
              </h2>
              <div className="orn-row" style={{ width:"100%", maxWidth:140 }}>
                <span className="orn-line" style={{ background:"rgba(160,130,70,0.2)" }} />
                <span className="orn-diamond" style={{ background:"rgba(160,130,70,0.25)" }} />
                <span className="orn-line" style={{ background:"rgba(160,130,70,0.2)" }} />
              </div>
            </div>
            <div className="mf-principles-grid">
              {[
                ["01", "Intenzione",  "intenzione",
                  "Ogni progetto nasce da una scelta consapevole. Prima di pensare alla forma, esploriamo il perché — il momento, le persone, l'emozione che si vuole evocare. Solo da lì può nascere qualcosa di autentico."],
                ["02", "Materia",     "materia",
                  "La materia è parte del racconto, non un mezzo neutro. Ogni materiale ha una temperatura, un peso, un'intenzione. Scegliamo con cura quello che parla nel modo giusto al contesto in cui vivrà."],
                ["03", "Tempo",       "tempo",
                  "Progettiamo per il momento giusto, non per l'effetto immediato. Un oggetto pensato bene continua a vivere dopo l'evento, portando con sé il ricordo di ciò che è stato. Questo è ciò che chiamiamo durata."],
              ].map(([num, title, em, body]) => (
                <div key={num} className="mf-principle">
                  <div className="mf-principle-num">{num}</div>
                  <div className="mf-principle-title"><em>{em}</em></div>
                  <p className="mf-principle-body">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FULL BLEED QUOTE ── */}
        <div className="mf-fullbleed">
          <img src="/bg4.jpg" alt="" />
          <div className="mf-fullbleed-overlay">
            <div className="orn-row" style={{ width:"100%", maxWidth:140, margin:"0 auto 8px" }}>
              <span className="orn-line" style={{ background:"rgba(220,185,120,0.25)" }} />
              <span className="orn-diamond" style={{ background:"rgba(220,185,120,0.3)" }} />
              <span className="orn-line" style={{ background:"rgba(220,185,120,0.25)" }} />
            </div>
            <p className="mf-fb-quote">
              "Ogni evento ha una sola prima volta.<br />
              Noi esistiamo per renderla indimenticabile."
            </p>
            <span className="mf-fb-attr">Gisel Marién — Fondatrice</span>
          </div>
        </div>

        {/* ── MANIFESTO TEXT BLOCKS ── */}
        <section className="mf-texts">
          <div className="mf-texts-inner">
            {[
              {
                title: <><em>Contro</em><br />l'effimero</>,
                paras: [
                  <>Viviamo in un'epoca di <strong>sovrapproduzione di immagini.</strong> Ogni evento viene documentato, filtrato, pubblicato e dimenticato nel giro di ore. Noi lavoriamo in direzione opposta.</>,
                  <>Quello che realizziamo è pensato per resistere allo scroll, per occupare spazio fisico, per <strong>essere tenuto in mano.</strong> Una bomboniera non è un ricordo digitale. È un oggetto vivo.</>,
                ],
              },
              {
                title: <><em>Artigianato</em><br />come posizione</>,
                paras: [
                  <>Scegliamo di produrre artigianalmente non per nostalgia, ma per <strong>scelta etica ed estetica.</strong> Ogni pezzo prodotto a mano porta con sé l'impronta di chi lo ha fatto. Quella traccia è parte del valore.</>,
                  <>La produzione industriale produce oggetti. <strong>L'artigianato produce storie.</strong> Ed è delle storie che le persone hanno bisogno, anche — e soprattutto — nei momenti celebrativi.</>,
                ],
              },
              {
                title: <><em>Su misura</em><br />come metodo</>,
                paras: [
                  <><strong>Non lavoriamo per catalogo.</strong> Ogni progetto parte da zero: un incontro, un ascolto, una proposta. La personalizzazione non è un plus — è il fondamento del nostro metodo.</>,
                  <>Che si tratti di cento bomboniere per un matrimonio o di un allestimento per una venue di lusso a Londra, <strong>ogni lavoro riceve la stessa attenzione.</strong> La scala cambia, la cura no.</>,
                ],
              },
            ].map(({ title, paras }, i) => (
              <div key={i} className="mf-text-block">
                <div className="mf-text-label">
                  <span className="eyebrow" style={{ marginBottom:4 }}>Principio {String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mf-text-title">{title}</h3>
                </div>
                <div className="mf-text-body">
                  {paras.map((p, j) => <p key={j} className="mf-text-para">{p}</p>)}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CLOSING ── */}
        <section className="mf-closing">
          <div className="mf-closing-bg" />
          <div className="mf-closing-glow" />
          <div className="mf-closing-inner">

            <div className="orn-row" style={{ width:"100%", maxWidth:160 }}>
              <span className="orn-line" style={{ background:"rgba(160,130,70,0.2)" }} />
              <span className="orn-diamond" style={{ background:"rgba(160,130,70,0.3)" }} />
              <span className="orn-line" style={{ background:"rgba(160,130,70,0.2)" }} />
            </div>

            <h2 className="mf-closing-h2">
              Produciamo forme<br />
              <em>che restano nel tempo.</em>
            </h2>

            <p className="mf-closing-body">
              Non per stupire. Ma per dare valore durevole
              a un momento condiviso — ovunque nel mondo.
            </p>

            <Link href="/contact" className="mf-closing-cta">
              Parliamone
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M1 5h12M8 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>

            <p className="mf-closing-footer">
              Italia & Internazionale · Produzione artigianale · Su misura
            </p>

          </div>
        </section>

      </main>
    </>
  );
}