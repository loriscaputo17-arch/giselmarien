import Link from "next/link";
import Warmform from "@/app/components/Warmform";
import PhoneGate from "@/app/components/PhoneGate";

export default function Home() {
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

        .orn-row { display: flex; align-items: center; justify-content: center; gap: 12px; }
        .orn-line { flex: 1; max-width: 60px; height: 1px; background: var(--gold-lt); }
        .orn-diamond { width: 5px; height: 5px; background: rgba(160,130,70,0.5); transform: rotate(45deg); flex-shrink: 0; }
        .eyebrow { font-family: 'Jost', sans-serif; font-size: 9px; font-weight: 400; letter-spacing: 0.4em; text-transform: uppercase; color: var(--gold); display: block; }

        /* HERO */
        .hero { min-height: 100vh; position: relative; display: flex; align-items: center; justify-content: center; background-image: url('/bg4.jpg'); background-size: cover; background-position: center; overflow: hidden; }
        .hero-overlay { position: absolute; inset: 0; background: rgba(245,242,236,0.78); backdrop-filter: blur(6px) saturate(1.2); -webkit-backdrop-filter: blur(6px) saturate(1.2); }
        .hero-content { position: relative; z-index: 10; max-width: 680px; margin: 0 auto; padding: 120px 32px; text-align: center; display: flex; flex-direction: column; align-items: center; }
        .hero-eyebrow { margin-bottom: 28px; }
        .hero-orn { margin-bottom: 32px; }
        .hero-h1 { font-family: 'Cormorant Garamond', serif; font-weight: 300; font-size: clamp(44px, 9vw, 80px); line-height: 1.05; letter-spacing: -0.01em; color: var(--ink); margin-bottom: 24px; }
        .hero-h1 em { font-style: italic; color: var(--gold); }
        .hero-sub { font-family: 'Cormorant Garamond', serif; font-weight: 300; font-style: italic; font-size: clamp(16px, 3vw, 20px); line-height: 1.65; color: var(--ink-mid); max-width: 460px; margin-bottom: 40px; }
        .hero-pills { display: flex; flex-wrap: wrap; justify-content: center; gap: 7px; margin-bottom: 44px; }
        .hero-pill { font-family: 'Jost', sans-serif; font-size: 9px; font-weight: 400; letter-spacing: 0.22em; text-transform: uppercase; color: var(--ink-mid); border: 1px solid var(--gold-lt); padding: 5px 14px; background: rgba(255,255,255,0.5); transition: background .25s, border-color .25s; }
        .hero-pill:hover { background: rgba(255,255,255,0.85); border-color: rgba(160,130,70,0.6); }
        .hero-cta { display: inline-flex; align-items: center; gap: 12px; font-family: 'Jost', sans-serif; font-size: 10px; font-weight: 500; letter-spacing: 0.32em; text-transform: uppercase; color: var(--sand); background: var(--ink); padding: 16px 36px; text-decoration: none; position: relative; overflow: hidden; transition: background .3s ease; margin-bottom: 28px; }
        .hero-cta::before { content: ''; position: absolute; inset: 0; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent); transform: translateX(-100%); transition: transform .6s ease; }
        .hero-cta:hover::before { transform: translateX(100%); }
        .hero-cta:hover { background: #3D3220; }
        .hero-footer { font-family: 'Jost', sans-serif; font-size: 9px; font-weight: 300; letter-spacing: 0.3em; text-transform: uppercase; color: var(--ink-soft); }

        /* NUMBERS */
        .numbers { background: var(--sand-2); padding: 72px 32px; border-top: 1px solid rgba(160,130,70,0.1); border-bottom: 1px solid rgba(160,130,70,0.1); }
        .numbers-inner { max-width: 960px; margin: 0 auto; display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; }
        .numbers-item { text-align: center; padding: 24px 16px; border-right: 1px solid rgba(160,130,70,0.12); }
        .numbers-item:last-child { border-right: none; }
        .numbers-val { font-family: 'Cormorant Garamond', serif; font-weight: 300; font-size: clamp(36px, 6vw, 60px); line-height: 1; color: var(--ink); letter-spacing: -0.02em; }
        .numbers-val em { font-style: italic; color: var(--gold); }
        .numbers-lbl { font-family: 'Jost', sans-serif; font-size: 9px; font-weight: 300; letter-spacing: 0.28em; text-transform: uppercase; color: var(--ink-soft); margin-top: 8px; display: block; }
        @media (max-width: 640px) { .numbers-inner { grid-template-columns: 1fr 1fr; } .numbers-item { border-bottom: 1px solid rgba(160,130,70,0.1); } .numbers-item:nth-child(even) { border-right: none; } }

        /* STATEMENT */
        .statement { background: var(--dark); padding: 120px 32px; position: relative; overflow: hidden; }
        .statement::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 70% 50% at 50% 100%, rgba(160,120,50,0.1) 0%, transparent 70%); pointer-events: none; }
        .statement-inner { max-width: 800px; margin: 0 auto; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 32px; }
        .statement-h2 { font-family: 'Cormorant Garamond', serif; font-weight: 300; font-size: clamp(32px, 6vw, 60px); line-height: 1.2; letter-spacing: 0.01em; color: var(--cream); }
        .statement-h2 em { font-style: italic; color: rgba(220,185,120,0.9); }

        /* WHAT WE DO */
        .what { background: var(--sand); padding: 120px 32px; }
        .what-inner { max-width: 1200px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; gap: 72px; }
        .what-header { text-align: center; display: flex; flex-direction: column; align-items: center; gap: 20px; max-width: 600px; }
        .what-h2 { font-family: 'Cormorant Garamond', serif; font-weight: 300; font-size: clamp(30px, 5vw, 52px); line-height: 1.15; color: var(--ink); }
        .what-h2 em { font-style: italic; color: var(--gold); }
        .what-sub { font-family: 'Cormorant Garamond', serif; font-weight: 300; font-style: italic; font-size: clamp(15px, 2.5vw, 18px); line-height: 1.75; color: var(--ink-mid); }
        .what-grid { width: 100%; display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; }
        .what-card { background: var(--sand-2); padding: 40px 32px; display: flex; flex-direction: column; gap: 16px; position: relative; transition: background .3s ease; }
        .what-card:hover { background: #EDE8DC; }
        .what-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, rgba(160,130,70,0.4), transparent); opacity: 0; transition: opacity .3s; }
        .what-card:hover::before { opacity: 1; }
        .what-card-num { font-family: 'Cormorant Garamond', serif; font-weight: 300; font-style: italic; font-size: 42px; color: rgba(160,130,70,0.2); line-height: 1; }
        .what-card-title { font-family: 'Jost', sans-serif; font-size: 11px; font-weight: 400; letter-spacing: 0.28em; text-transform: uppercase; color: var(--ink); }
        .what-card-body { font-family: 'Cormorant Garamond', serif; font-weight: 300; font-style: italic; font-size: clamp(14px, 2vw, 16px); line-height: 1.75; color: var(--ink-mid); }
        @media (max-width: 768px) { .what-grid { grid-template-columns: 1fr; } }

        /* FULL BLEED */
        .fullbleed { width: 100%; aspect-ratio: 21/9; overflow: hidden; position: relative; }
        .fullbleed img { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.9) saturate(0.88); transition: transform 8s ease; }
        .fullbleed:hover img { transform: scale(1.03); }
        .fullbleed-caption { position: absolute; bottom: 24px; right: 32px; font-family: 'Cormorant Garamond', serif; font-weight: 300; font-style: italic; font-size: 13px; letter-spacing: 0.12em; color: rgba(255,255,255,0.55); }
        @media (max-width: 768px) { .fullbleed { aspect-ratio: 4/3; } }

        /* ABOUT */
        .about { background: var(--sand-2); padding: 120px 32px; }
        .about-inner { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
        .about-text { display: flex; flex-direction: column; gap: 24px; }
        .about-h2 { font-family: 'Cormorant Garamond', serif; font-weight: 300; font-size: clamp(30px, 5vw, 48px); line-height: 1.1; color: var(--ink); }
        .about-h2 em { font-style: italic; color: var(--gold); }
        .about-body { font-family: 'Cormorant Garamond', serif; font-weight: 300; font-style: italic; font-size: clamp(16px, 2.5vw, 19px); line-height: 1.75; color: var(--ink-mid); }
        .about-services { display: flex; flex-direction: column; gap: 0; border-top: 1px solid rgba(160,130,70,0.15); }
        .about-service-row { display: flex; align-items: center; justify-content: space-between; padding: 14px 0; border-bottom: 1px solid rgba(160,130,70,0.1); font-family: 'Jost', sans-serif; font-size: 11px; font-weight: 300; letter-spacing: 0.18em; text-transform: uppercase; color: var(--ink-mid); }
        .about-service-row span:last-child { color: var(--gold); font-size: 9px; letter-spacing: 0.3em; }
        .about-link { font-family: 'Jost', sans-serif; font-size: 9px; font-weight: 500; letter-spacing: 0.3em; text-transform: uppercase; color: var(--ink); text-decoration: none; border-bottom: 1px solid rgba(44,36,24,0.3); padding-bottom: 3px; transition: border-color .25s, color .25s; align-self: flex-start; }
        .about-link:hover { color: var(--gold); border-color: var(--gold); }
        .about-images { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .about-img { width: 100%; aspect-ratio: 3/4; object-fit: cover; filter: brightness(0.97) saturate(0.92); transition: filter .4s ease; }
        .about-img:hover { filter: brightness(1) saturate(1); }
        .about-img:nth-child(2) { margin-top: 32px; }
        .about-img:nth-child(4) { margin-top: -32px; }
        @media (max-width: 900px) { .about-inner { grid-template-columns: 1fr; gap: 48px; } .about-images { order: -1; } .about-img:nth-child(2) { margin-top: 16px; } .about-img:nth-child(4) { margin-top: -16px; } }

        /* GALLERY */
        .gallery {
          background: var(--sand);
          padding: 60px 32px;
        }

        .gallery-track {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 6px;
        }

        .gallery-img {
          width: 100%;
          aspect-ratio: 1 / 1;
          object-fit: cover;
          filter: brightness(0.94) saturate(0.9);
          transition: transform .6s ease, filter .4s ease;
        }

        .gallery-img:hover {
          transform: scale(1.05);
          filter: brightness(1) saturate(1);
        }

        @media (max-width: 768px) {
          .gallery-track {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        /* PROCESS */
        .process { background: var(--sand-2); padding: 120px 32px; }
        .process-inner { max-width: 1100px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; gap: 72px; }
        .process-header { text-align: center; display: flex; flex-direction: column; align-items: center; gap: 20px; }
        .process-h2 { font-family: 'Cormorant Garamond', serif; font-weight: 300; font-size: clamp(28px, 5vw, 48px); line-height: 1.2; color: var(--ink); }
        .process-h2 em { font-style: italic; color: var(--gold); }
        .process-steps { width: 100%; display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; }
        .process-step { padding: 32px 28px; border-right: 1px solid rgba(160,130,70,0.12); display: flex; flex-direction: column; gap: 16px; position: relative; }
        .process-step:last-child { border-right: none; }
        .process-step::after { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, rgba(160,130,70,0.6), transparent); opacity: 0; transition: opacity .35s ease; }
        .process-step:hover::after { opacity: 1; }
        .process-n { font-family: 'Cormorant Garamond', serif; font-weight: 300; font-style: italic; font-size: 48px; color: rgba(160,130,70,0.18); line-height: 1; }
        .process-title { font-family: 'Jost', sans-serif; font-size: 10px; font-weight: 500; letter-spacing: 0.28em; text-transform: uppercase; color: var(--ink); }
        .process-body { font-family: 'Cormorant Garamond', serif; font-weight: 300; font-style: italic; font-size: clamp(14px, 2vw, 16px); line-height: 1.7; color: var(--ink-mid); }
        @media (max-width: 768px) { .process-steps { grid-template-columns: 1fr 1fr; } .process-step { border-bottom: 1px solid rgba(160,130,70,0.1); } }
        @media (max-width: 480px) { .process-steps { grid-template-columns: 1fr; } .process-step { border-right: none; } }

        /* QUOTE */
        .quote-section { background: var(--sand); padding: 100px 32px; }
        .quote-inner { max-width: 720px; margin: 0 auto; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 24px; }
        .quote-mark { font-family: 'Cormorant Garamond', serif; font-size: 80px; line-height: 0.6; color: rgba(160,130,70,0.18); font-style: italic; }
        .quote-text { font-family: 'Cormorant Garamond', serif; font-weight: 300; font-style: italic; font-size: clamp(20px, 4vw, 30px); line-height: 1.55; color: var(--ink); }
        .quote-author { font-family: 'Jost', sans-serif; font-size: 9px; font-weight: 300; letter-spacing: 0.35em; text-transform: uppercase; color: var(--ink-soft); }

        /* METHOD */
        .method { background: var(--dark-2); padding: 120px 32px; position: relative; overflow: hidden; }
        .method::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 50% 40% at 10% 50%, rgba(160,120,50,0.07) 0%, transparent 60%), radial-gradient(ellipse 40% 30% at 90% 30%, rgba(160,120,50,0.05) 0%, transparent 60%); pointer-events: none; }
        .method-inner { max-width: 1000px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; }
        .method-header { text-align: center; margin-bottom: 80px; display: flex; flex-direction: column; align-items: center; gap: 20px; }
        .method-h2 { font-family: 'Cormorant Garamond', serif; font-weight: 300; font-size: clamp(28px, 5vw, 46px); line-height: 1.2; color: var(--cream); }
        .method-h2 em { font-style: italic; color: rgba(220,185,120,0.85); }
        .method-steps { width: 100%; display: flex; flex-direction: column; gap: 0; }
        .method-step { display: grid; grid-template-columns: 48px 1fr; gap: 32px; align-items: flex-start; padding: 28px 0; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .method-step:first-child { border-top: 1px solid rgba(255,255,255,0.06); }
        .method-step-num { font-family: 'Cormorant Garamond', serif; font-weight: 300; font-style: italic; font-size: 32px; color: rgba(160,130,70,0.35); line-height: 1; padding-top: 2px; }
        .method-step-body { display: flex; flex-direction: column; gap: 6px; }
        .method-step-title { font-family: 'Jost', sans-serif; font-size: 11px; font-weight: 400; letter-spacing: 0.28em; text-transform: uppercase; color: var(--cream); }
        .method-step-desc { font-family: 'Cormorant Garamond', serif; font-weight: 300; font-style: italic; font-size: clamp(15px, 2.5vw, 17px); line-height: 1.6; color: rgba(220,210,195,0.55); }
        @media (max-width: 600px) { .method-step { grid-template-columns: 36px 1fr; gap: 20px; } }

        /* INTERNATIONAL */
        .intl { background: var(--dark); padding: 120px 32px; position: relative; overflow: hidden; }
        .intl::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 80% 50% at 50% 50%, rgba(160,120,50,0.06) 0%, transparent 70%); pointer-events: none; }
        .intl-inner { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
        .intl-text { display: flex; flex-direction: column; gap: 28px; }
        .intl-h2 { font-family: 'Cormorant Garamond', serif; font-weight: 300; font-size: clamp(30px, 5vw, 52px); line-height: 1.1; color: var(--cream); }
        .intl-h2 em { font-style: italic; color: rgba(220,185,120,0.9); }
        .intl-body { font-family: 'Cormorant Garamond', serif; font-weight: 300; font-style: italic; font-size: clamp(15px, 2.5vw, 18px); line-height: 1.8; color: rgba(220,210,195,0.58); }
        .intl-cities { display: flex; flex-direction: column; gap: 0; border-top: 1px solid rgba(160,130,70,0.15); }
        .intl-city { display: flex; align-items: center; justify-content: space-between; padding: 13px 0; border-bottom: 1px solid rgba(160,130,70,0.08); font-family: 'Jost', sans-serif; font-size: 11px; font-weight: 300; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(228,226,221,0.5); transition: color .25s; }
        .intl-city:hover { color: rgba(228,226,221,0.9); }
        .intl-city-country { font-size: 9px; letter-spacing: 0.25em; color: rgba(160,130,70,0.45); }
        .intl-image { position: relative; }
        .intl-img { width: 100%; aspect-ratio: 3/4; object-fit: cover; filter: brightness(0.78) saturate(0.72); }
        .intl-image-caption { position: absolute; bottom: 0; left: 0; right: 0; padding: 48px 24px 24px; background: linear-gradient(transparent, rgba(10,8,4,0.65)); font-family: 'Cormorant Garamond', serif; font-weight: 300; font-style: italic; font-size: 15px; color: rgba(228,226,221,0.55); letter-spacing: 0.05em; }
        @media (max-width: 900px) { .intl-inner { grid-template-columns: 1fr; gap: 56px; } }

        /* TESTIMONIALS */
        .testi { background: var(--sand-2); padding: 120px 32px; }
        .testi-inner { max-width: 1100px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; gap: 56px; }
        .testi-header { text-align: center; display: flex; flex-direction: column; align-items: center; gap: 16px; }
        .testi-h2 { font-family: 'Cormorant Garamond', serif; font-weight: 300; font-size: clamp(26px, 4vw, 42px); color: var(--ink); }
        .testi-h2 em { font-style: italic; color: var(--gold); }
        .testi-grid { width: 100%; display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; }
        .testi-card { background: var(--sand); padding: 36px 28px; display: flex; flex-direction: column; gap: 20px; border-top: 2px solid transparent; transition: border-color .35s, background .3s; }
        .testi-card:hover { border-top-color: rgba(160,130,70,0.5); background: #F5F1E7; }
        .testi-stars { display: flex; gap: 3px; }
        .testi-star { color: rgba(160,130,70,0.55); font-size: 11px; }
        .testi-text { font-family: 'Cormorant Garamond', serif; font-weight: 300; font-style: italic; font-size: clamp(15px, 2vw, 17px); line-height: 1.75; color: var(--ink-mid); flex: 1; }
        .testi-author { display: flex; flex-direction: column; gap: 3px; margin-top: auto; padding-top: 16px; border-top: 1px solid rgba(160,130,70,0.1); }
        .testi-name { font-family: 'Jost', sans-serif; font-size: 10px; font-weight: 400; letter-spacing: 0.2em; text-transform: uppercase; color: var(--ink); }
        .testi-event { font-family: 'Jost', sans-serif; font-size: 9px; font-weight: 300; letter-spacing: 0.15em; color: var(--gold); }
        @media (max-width: 768px) { .testi-grid { grid-template-columns: 1fr; } }

        /* CLOSING */
        .closing { background: var(--sand); padding: 120px 32px; text-align: center; }
        .closing-inner { max-width: 600px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; gap: 24px; }
        .closing-h2 { font-family: 'Cormorant Garamond', serif; font-weight: 300; font-size: clamp(30px, 6vw, 52px); line-height: 1.15; color: var(--ink); }
        .closing-h2 em { font-style: italic; color: var(--gold); }
        .closing-body { font-family: 'Cormorant Garamond', serif; font-weight: 300; font-style: italic; font-size: clamp(16px, 2.5vw, 18px); line-height: 1.7; color: var(--ink-mid); max-width: 420px; }
        .closing-cta { display: inline-flex; align-items: center; gap: 12px; font-family: 'Jost', sans-serif; font-size: 10px; font-weight: 500; letter-spacing: 0.32em; text-transform: uppercase; color: var(--sand); background: var(--ink); padding: 16px 40px; text-decoration: none; position: relative; overflow: hidden; transition: background .3s ease; }
        .closing-cta::before { content: ''; position: absolute; inset: 0; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent); transform: translateX(-100%); transition: transform .6s ease; }
        .closing-cta:hover::before { transform: translateX(100%); }
        .closing-cta:hover { background: #3D3220; }

        @media (max-width: 600px) { .hero-content { padding: 100px 24px; } }
      `}</style>

      <PhoneGate />

      <main>

        {/* ── HERO ── */}
        <section className="hero">
          <div className="hero-overlay" />
          <div className="hero-content">
            <span className="eyebrow hero-eyebrow">Atelier di produzione artistica</span>
            <div className="orn-row hero-orn" style={{ width:"100%", maxWidth:200 }}>
              <span className="orn-line" /><span className="orn-diamond" /><span className="orn-line" />
            </div>
            <h1 className="hero-h1">Progettiamo<br /><em>gesti che restano</em></h1>
            <p className="hero-sub">
              Bomboniere, centri tavola e allestimenti su misura per ogni evento —
              dalla cerimonia al matrimonio, dal compleanno all'occasione speciale.
            </p>
            <div className="hero-pills">
              {["Matrimoni","Cerimonie","Comunioni","Battesimi","Lauree","Compleanni","Hotel & Ristoranti","Su misura"].map(s => (
                <span key={s} className="hero-pill">{s}</span>
              ))}
            </div>
            <Link href="#form" className="hero-cta">
              Prenota una consulenza
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M1 5h12M8 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
            <p className="hero-footer">Italia & Internazionale · Su misura · Solo su appuntamento</p>
          </div>
        </section>

        {/* ── NUMBERS ── */}
        <div className="numbers">
          <div className="numbers-inner">
            {[
              ["50<em>+</em>", "Progetti esclusivi realizzati"],
              ["4<em>+</em>",  "Anni di esperienza"],
              ["8",             "Paesi nel mondo"],
              ["100<em>%</em>", "Su misura"],
            ].map(([val, lbl]) => (
              <div key={lbl} className="numbers-item">
                <div className="numbers-val" dangerouslySetInnerHTML={{ __html: val }} />
                <span className="numbers-lbl">{lbl}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── FORM ── */}
        <div id="form"><Warmform /></div>

        <div className="gallery">
          <div className="gallery-track">
            {["/images/img1.jpeg",
            "/images/img2.jpeg",
            "/images/img3.jpeg",
            "/images/img4.jpeg",
            "/images/img5.jpeg",
            "/images/img6.jpeg",
            "/images/img26.jpeg",
            "/images/img8.jpeg",
            "/images/img9.jpeg",
            "/images/img12.jpeg",
            "/images/img16.jpeg",
            "/images/img21.jpeg"].map((src, i) => (
              <img key={i} src={src} className="gallery-img" alt="" />
            ))}
          </div>
        </div>

        {/* ── STATEMENT ── */}
        <section className="statement">
          <div className="statement-inner">
            <div className="orn-row" style={{ width:"100%", maxWidth:160 }}>
              <span className="orn-line" /><span className="orn-diamond" /><span className="orn-line" />
            </div>
            <h2 className="statement-h2">Non decoriamo eventi.<br /><em>Costruiamo significati.</em></h2>
            <div className="orn-row" style={{ width:"100%", maxWidth:160 }}>
              <span className="orn-line" style={{ background:"rgba(160,130,70,0.2)" }} />
              <span className="orn-diamond" style={{ background:"rgba(160,130,70,0.3)" }} />
              <span className="orn-line" style={{ background:"rgba(160,130,70,0.2)" }} />
            </div>
          </div>
        </section>

        {/* ── WHAT WE DO ── */}
        <section className="what">
          <div className="what-inner">
            <div className="what-header">
              <span className="eyebrow">Cosa realizziamo</span>
              <h2 className="what-h2">Ogni produzione nasce<br /><em>da un'intenzione precisa</em></h2>
              <p className="what-sub">
                Non lavoriamo per catalogo. Ogni bomboniera, ogni centro tavola,
                ogni allestimento è pensato intorno all'evento, alle persone
                e al momento che si vuole celebrare.
              </p>
            </div>
            <div className="what-grid">
              {[
                ["01", "Bomboniere su misura",
                  "Realizziamo bomboniere personalizzate per matrimoni, comunioni, battesimi, lauree e compleanni. Ogni pezzo nasce da un progetto dedicato: materiali, forma, packaging e messaggio scelti insieme a te."],
                ["02", "Centri tavola & allestimenti",
                  "Dalle composizioni floreali ai centri tavola scultorei, dagli archi d'ingresso agli allestimenti tematici: progettiamo gli spazi del tuo evento con gusto contemporaneo e cura artigianale."],
                ["03", "Hospitality & contract",
                  "Collaboriamo con hotel, ristoranti e venue di lusso per oggetti d'accoglienza, decorazioni stagionali e kit personalizzati per gli ospiti. Un servizio continuativo e su misura per ogni struttura."],
              ].map(([num, title, body]) => (
                <div key={num} className="what-card">
                  <div className="what-card-num">{num}</div>
                  <div className="what-card-title">{title}</div>
                  <div className="what-card-body">{body}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FULL BLEED ── */}
        <div className="fullbleed">
          <img src="/bg11.jpg" alt="Atelier Gisel Marién" />
          <span className="fullbleed-caption">Atelier Gisel Marién — ogni dettaglio conta</span>
        </div>

        {/* ── ABOUT ── */}
        <section className="about">
          <div className="about-inner">
            <div className="about-text">
              <span className="eyebrow">Chi siamo</span>
              <h2 className="about-h2"><em>Gisel Marién</em><br />Atelier artigianale</h2>
              <p className="about-body">
                Nata in Campania, cresciuta nel mondo della produzione artigianale
                e dell'arte applicata, Gisel Marién è oggi uno studio di riferimento
                per chi cerca qualcosa di più di una semplice decorazione.
              </p>
              <p className="about-body">
                Ogni cerimonia porta con sé un'emozione unica. Noi la traduciamo in oggetti:
                bomboniere pensate, centri tavola che fermano il respiro, allestimenti
                che trasformano uno spazio in un ricordo destinato a durare.
              </p>
              <div className="about-services">
                {[
                  ["Bomboniere personalizzate", "su misura"],
                  ["Centri tavola",             "cerimonie"],
                  ["Allestimenti floreali",     "eventi"],
                  ["Hotel & Ristoranti",        "hospitality"],
                  ["Packaging & Confezioni",    "cura del dettaglio"],
                ].map(([label, tag]) => (
                  <div key={label} className="about-service-row">
                    <span>{label}</span><span>{tag}</span>
                  </div>
                ))}
              </div>
              <Link href="/approach" className="about-link">Scopri il nostro approccio →</Link>
            </div>
            <div className="about-images">
              <img src="/bg12.jpg" className="about-img" alt="" />
              <img src="/bg5.jpg" className="about-img" alt="" />
              <img src="/bg6.jpg" className="about-img" alt="" />
              <img src="/bg8.jpg" className="about-img" alt="" />
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="process">
          <div className="process-inner">
            <div className="process-header">
              <span className="eyebrow">Come lavoriamo</span>
              <h2 className="process-h2">Dal <em>primo incontro</em><br />alla consegna finale</h2>
              <div className="orn-row" style={{ width:"100%", maxWidth:120 }}>
                <span className="orn-line" /><span className="orn-diamond" /><span className="orn-line" />
              </div>
            </div>
            <div className="process-steps">
              {[
                ["Ascolto",       "Partiamo da te: l'evento, il tono, le persone, le aspettative. Nessun template, solo attenzione."],
                ["Progettazione", "Sviluppiamo una proposta su misura con moodboard, materiali e bozzetti. Ogni scelta è motivata."],
                ["Produzione",    "Realizziamo ogni pezzo nel nostro atelier con cura artigianale, controllando ogni fase del processo."],
                ["Consegna",      "Consegniamo in tutta Italia e all'estero, con packaging dedicato e cura nella presentazione finale."],
              ].map(([title, body], i) => (
                <div key={title} className="process-step">
                  <div className="process-n">0{i + 1}</div>
                  <div className="process-title">{title}</div>
                  <div className="process-body">{body}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── QUOTE ── */}
        <section className="quote-section">
          <div className="quote-inner">
            <div className="orn-row" style={{ width:"100%", maxWidth:120 }}>
              <span className="orn-line" /><span className="orn-diamond" /><span className="orn-line" />
            </div>
            <span className="quote-mark">"</span>
            <p className="quote-text">
              Ogni evento ha una sola prima volta. Noi esistiamo per renderla
              indimenticabile — con oggetti che parlano, spazi che emozionano,
              gesti che restano.
            </p>
            <span className="quote-author">Gisel Marién — Fondatrice</span>
          </div>
        </section>

        {/* ── METHOD ── */}
        <section className="method">
          <div className="method-inner">
            <div className="method-header">
              <span className="eyebrow" style={{ color:"rgba(220,185,120,0.6)" }}>Il nostro metodo</span>
              <h2 className="method-h2">Un percorso pensato<br /><em>intorno a te</em></h2>
              <div className="orn-row" style={{ width:"100%", maxWidth:140 }}>
                <span className="orn-line" style={{ background:"rgba(160,130,70,0.2)" }} />
                <span className="orn-diamond" style={{ background:"rgba(160,130,70,0.25)" }} />
                <span className="orn-line" style={{ background:"rgba(160,130,70,0.2)" }} />
              </div>
            </div>
            <div className="method-steps">
              {[
                ["Sistema modulare",     "Ogni progetto nasce da moduli flessibili, adattabili al tipo di evento e al tuo stile personale."],
                ["Infinite varianti",    "Dalla soluzione semplice a quella più elaborata: lavoriamo su ogni livello di complessità e budget."],
                ["Tempi su misura",      "Che tu abbia sei mesi o sei settimane: costruiamo un percorso che rispetta i tuoi tempi."],
                ["Cura del dettaglio",   "Dal packaging alla presentazione finale, ogni elemento è curato come parte di un'unica visione."],
                ["Elementi che restano", "Ciò che creiamo per il tuo evento continua a vivere — come ricordo, come oggetto, come gesto."],
              ].map(([title, desc], i) => (
                <div key={title} className="method-step">
                  <span className="method-step-num">0{i + 1}</span>
                  <div className="method-step-body">
                    <span className="method-step-title">{title}</span>
                    <span className="method-step-desc">{desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── INTERNATIONAL ── */}
        <section className="intl">
          <div className="intl-inner">
            <div className="intl-text">
              <span className="eyebrow" style={{ color:"rgba(220,185,120,0.55)" }}>Presenza internazionale</span>
              <h2 className="intl-h2">Progettiamo per<br /><em>il mondo intero</em></h2>
              <p className="intl-body">
                Nati in Campania, oggi lavoriamo in tutta Italia e seguiamo clienti
                che ci portano ovunque nel mondo. Dalla villa sul lago di Como
                all'appartamento a Londra, dal resort di Bangkok
                alla cerimonia esclusiva a Montecarlo.
              </p>
              <p className="intl-body">
                La distanza non è un limite: gestiamo ogni progetto da remoto
                con videocall, moodboard condivisi e coordinamento logistico dedicato.
                Spediamo in tutto il mondo con packaging su misura e tracciamento completo.
              </p>
              <div className="intl-cities">
                {[
                  ["Italia",       "sede principale"],
                  ["Londra",       "Regno Unito"],
                  ["New York",     "Stati Uniti"],
                  ["Los Angeles",  "California"],
                  ["Montecarlo",   "Principato di Monaco"],
                  ["Bangkok",      "Thailandia"],
                ].map(([city, country]) => (
                  <div key={city} className="intl-city">
                    <span>{city}</span>
                    <span className="intl-city-country">{country}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="intl-image">
              <img src="/bg8.jpg" className="intl-img" alt="" />
              <div className="intl-image-caption">
                Ogni luogo ha la sua cerimonia — noi la rendiamo unica.
              </div>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="testi">
          <div className="testi-inner">
            <div className="testi-header">
              <span className="eyebrow">Cosa dicono di noi</span>
              <h2 className="testi-h2">Le parole dei<br /><em>nostri clienti</em></h2>
              <div className="orn-row" style={{ width:"100%", maxWidth:120 }}>
                <span className="orn-line" /><span className="orn-diamond" /><span className="orn-line" />
              </div>
            </div>
            <div className="testi-grid">
              {[
                {
                  text: "Avevo un'idea vaga — un matrimonio intimo, molto personale. Gisel Marién ha capito tutto al primo incontro. Ogni bomboniera era un piccolo capolavoro.",
                  name: "Claudia R.",
                  event: "Matrimonio · Napoli",
                },
                {
                  text: "Lavoro con loro da tre anni per il nostro hotel. I centri tavola sono parte integrante dell'esperienza degli ospiti. Professionalità e gusto davvero rari.",
                  name: "Marco V.",
                  event: "Hotel · Costiera Amalfitana",
                },
                {
                  text: "Ho contattato lo studio dall'estero per una cerimonia a Londra. Tutto gestito da remoto, in modo impeccabile. Risultato molto al di sopra delle aspettative.",
                  name: "Sophie M.",
                  event: "Cerimonia privata · Londra",
                },
              ].map(({ text, name, event }) => (
                <div key={name} className="testi-card">
                  <div className="testi-stars">
                    {[...Array(5)].map((_, i) => <span key={i} className="testi-star">★</span>)}
                  </div>
                  <p className="testi-text">"{text}"</p>
                  <div className="testi-author">
                    <span className="testi-name">{name}</span>
                    <span className="testi-event">{event}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CLOSING CTA ── */}
        <section className="closing">
          <div className="closing-inner">
            <div className="orn-row" style={{ width:"100%", maxWidth:120 }}>
              <span className="orn-line" /><span className="orn-diamond" /><span className="orn-line" />
            </div>
            <h2 className="closing-h2">Hai un evento<br /><em>in mente?</em></h2>
            <p className="closing-body">
              Non serve avere tutto chiaro.
              Basta un'intenzione — ci pensiamo noi
              a trasformarla in qualcosa di indimenticabile.
            </p>
            <Link href="#form" className="closing-cta">
              Inizia da qui
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M1 5h12M8 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
            <p style={{ fontFamily:"'Jost', sans-serif", fontSize:9, letterSpacing:"0.3em", textTransform:"uppercase", color:"rgba(90,74,53,0.35)", marginTop:8 }}>
              Italia & Internazionale · Produzione artigianale · Su misura
            </p>
          </div>
        </section>

      </main>
    </>
  );
}