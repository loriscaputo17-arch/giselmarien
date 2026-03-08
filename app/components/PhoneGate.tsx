"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/app/lib/supabase";

export default function PhoneGate() {
  const [open, setOpen]       = useState(false);
  const [phone, setPhone]     = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone]       = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // slight delay so the entrance animation fires cleanly
    const t = setTimeout(() => { setOpen(true); setTimeout(() => setVisible(true), 30); }, 200);
    return () => clearTimeout(t);
  }, []);

  const submitPhone = async () => {
    if (!phone.trim()) return;
    setLoading(true);
    const { error } = await supabase.from("phone_gate").insert([{ phone }]);
    setLoading(false);
    if (error) { console.error(error); alert("Errore durante l'invio. Riprova."); return; }
    setDone(true);
    setTimeout(() => setOpen(false), 2200);
  };

  const dismiss = () => { setVisible(false); setTimeout(() => setOpen(false), 500); };

  if (!open) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500&display=swap');

        .pg-overlay {
          position: fixed; inset: 0; z-index: 100;
          display: flex; align-items: center; justify-content: center;
          padding: 20px;
          background: rgba(245,242,236,0.72);
          backdrop-filter: blur(18px) saturate(1.4);
          -webkit-backdrop-filter: blur(18px) saturate(1.4);
          transition: opacity .5s ease;
        }
        .pg-overlay.hidden { opacity: 0; pointer-events: none; }

        .pg-card {
          position: relative;
          width: 100%; max-width: 420px;
          background: #FAF8F3;
          padding: 52px 44px 44px;
          text-align: center;
          box-shadow: 0 32px 80px rgba(60,50,30,0.11), 0 2px 8px rgba(60,50,30,0.06);
          transition: opacity .5s ease, transform .5s ease;
          opacity: 0; transform: translateY(20px) scale(0.98);
        }
        .pg-card.in { opacity: 1; transform: none; }

        /* thin gold border */
        .pg-card::before {
          content: '';
          position: absolute; inset: 0;
          border: 1px solid rgba(180,150,90,0.22);
          pointer-events: none;
        }
        /* corner ornaments */
        .pg-corner {
          position: absolute; width: 20px; height: 20px; pointer-events: none;
        }
        .pg-corner::before, .pg-corner::after {
          content: ''; position: absolute; background: rgba(160,130,70,0.55);
        }
        .pg-corner::before { width: 100%; height: 1px; top: 0; left: 0; }
        .pg-corner::after  { width: 1px; height: 100%; top: 0; left: 0; }
        .pg-c-tl { top: 10px;    left: 10px; }
        .pg-c-tr { top: 10px;    right: 10px; transform: scaleX(-1); }
        .pg-c-bl { bottom: 10px; left: 10px;  transform: scaleY(-1); }
        .pg-c-br { bottom: 10px; right: 10px; transform: scale(-1); }

        /* logo */
        .pg-logo {
          width: 140px; margin: 0 auto 1rem;
          display: block;
        }

        /* ornamental divider */
        .pg-ornament {
          display: flex; align-items: center; justify-content: center;
          gap: 10px; margin-bottom: 28px;
        }
        .pg-ornament-line {
          flex: 1; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(160,130,70,0.4));
        }
        .pg-ornament-line.rev {
          background: linear-gradient(90deg, rgba(160,130,70,0.4), transparent);
        }
        .pg-ornament-diamond {
          width: 5px; height: 5px;
          background: rgba(160,130,70,0.6);
          transform: rotate(45deg);
          flex-shrink: 0;
        }

        /* eyebrow */
        .pg-eyebrow {
          font-family: 'Jost', sans-serif;
          font-size: 9px; font-weight: 400;
          letter-spacing: 0.38em; text-transform: uppercase;
          color: rgba(160,130,70,0.8);
          margin-bottom: 16px;
          display: block;
        }

        /* headline */
        .pg-headline {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300; font-size: clamp(26px, 7vw, 34px);
          line-height: 1.2; letter-spacing: 0.01em;
          color: #2C2418;
          margin-bottom: 10px;
        }
        .pg-headline em {
          font-style: italic; color: #7A5C28;
        }

        /* descriptor */
        .pg-descriptor {
          font-family: 'Jost', sans-serif;
          font-size: 11px; font-weight: 300;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: rgba(100,80,45,0.55);
          margin-bottom: 22px;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          flex-wrap: wrap;
        }
        .pg-dot { width: 3px; height: 3px; background: rgba(160,130,70,0.4); border-radius: 50%; flex-shrink: 0; }

        /* body text */
        .pg-body {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300; font-style: italic;
          font-size: clamp(15px, 4vw, 17px); line-height: 1.7;
          color: #5A4A35;
          margin-bottom: 28px;
        }

        /* services pills */
        .pg-services {
          display: flex; flex-wrap: wrap; justify-content: center; gap: 6px;
          margin-bottom: 30px;
        }
        .pg-pill {
          font-family: 'Jost', sans-serif;
          font-size: 9px; font-weight: 400;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: rgba(90,70,40,0.65);
          border: 1px solid rgba(160,130,70,0.25);
          padding: 4px 12px;
          background: transparent;
        }

        /* input */
        .pg-input {
          width: 100%;
          font-family: 'Jost', sans-serif;
          font-size: 14px; font-weight: 300; letter-spacing: 0.05em;
          color: #2C2418;
          background: #FFFFFF;
          border: 1px solid rgba(160,130,70,0.2);
          border-bottom: 1px solid rgba(160,130,70,0.55);
          padding: 14px 18px;
          outline: none;
          transition: border-color .25s ease, background .25s ease;
          margin-bottom: 12px;
          -webkit-appearance: none;
        }
        .pg-input::placeholder { color: rgba(100,80,45,0.35); }
        .pg-input:focus { border-color: rgba(160,130,70,0.7); background: #FFFCF6; }

        /* CTA button */
        .pg-btn-primary {
          width: 100%;
          font-family: 'Jost', sans-serif;
          font-size: 11px; font-weight: 500;
          letter-spacing: 0.3em; text-transform: uppercase;
          color: #FAF8F3;
          background: #2C2418;
          border: none;
          padding: 16px 24px;
          cursor: pointer;
          position: relative; overflow: hidden;
          transition: background .3s ease;
          margin-bottom: 16px;
        }
        .pg-btn-primary::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
          transform: translateX(-100%);
          transition: transform .6s ease;
        }
        .pg-btn-primary:hover::before { transform: translateX(100%); }
        .pg-btn-primary:hover { background: #3D3220; }
        .pg-btn-primary:disabled { opacity: .5; cursor: not-allowed; }
        .pg-btn-primary:disabled::before { display: none; }

        /* skip */
        .pg-skip {
          font-family: 'Jost', sans-serif;
          font-size: 14px; font-weight: 400;
          letter-spacing: 0.28em; text-transform: uppercase;
          color: rgba(90,70,40,0.4);
          background: none; border: none; cursor: pointer;
          transition: color .2s ease;
          padding: 0;
          margin-bottom: 2rem;
        }
        .pg-skip:hover { color: rgba(90,70,40,0.75); }

        /* success state */
        .pg-success {
          display: flex; flex-direction: column; align-items: center;
          gap: 12px; padding: 16px 0;
          animation: pgfadein .5s ease both;
        }
        @keyframes pgfadein { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:none; } }

        .pg-check {
          width: 44px; height: 44px;
          border: 1px solid rgba(160,130,70,0.4);
          display: flex; align-items: center; justify-content: center;
          transform: rotate(45deg);
        }
        .pg-check svg { transform: rotate(-45deg); }

        .pg-success-title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300; font-size: 26px;
          color: #2C2418; letter-spacing: 0.02em;
        }
        .pg-success-sub {
          font-family: 'Jost', sans-serif;
          font-size: 11px; font-weight: 300;
          letter-spacing: 0.1em; color: rgba(90,70,40,0.55);
        }

        @media (max-width: 480px) {
          .pg-card { padding: 40px 28px 36px; }
        }
      `}</style>

      <div className={`pg-overlay ${!visible ? "hidden" : ""}`}>
        <div className={`pg-card ${visible ? "in" : ""}`}>

          {/* Corner ornaments */}
          <span className="pg-corner pg-c-tl" />
          <span className="pg-corner pg-c-tr" />
          <span className="pg-corner pg-c-bl" />
          <span className="pg-corner pg-c-br" />

          {/* Logo */}
          <img src="/logotext.png" alt="Gisel Marién" className="pg-logo" />

          <button onClick={dismiss} className="pg-skip">
                ESPLORA IL SITO
           </button>

          {/* Ornamental divider */}
          <div className="pg-ornament">
            <span className="pg-ornament-line" />
            <span className="pg-ornament-diamond" />
            <span className="pg-ornament-line rev" />
          </div>

          {!done ? (
            <>
              {/* Eyebrow */}
              <span className="pg-eyebrow">Atelier di produzione artistica</span>

              {/* Headline */}
              <h2 className="pg-headline">
                Ogni evento merita<br />
                un <em>gesto che resta.</em>
              </h2>

              {/* What we do */}
              <p className="pg-descriptor">
                Bomboniere
                <span className="pg-dot" />
                Centri tavola
                <span className="pg-dot" />
                Allestimenti
              </p>

              {/* Services pills */}
              <div className="pg-services">
                {["Matrimoni","Cerimonie","Comunioni","Lauree","Compleanni","Hotel","Ristoranti"].map(s => (
                  <span key={s} className="pg-pill">{s}</span>
                ))}
              </div>

              {/* Body */}
              <p className="pg-body">
                Realizziamo su misura bomboniere, centri tavola
                e allestimenti personalizzati per ogni tipo di evento —
                con cura artigianale e gusto contemporaneo.
              </p>

              {/* Input */}
              <input
                type="tel"
                placeholder="Il tuo numero di telefono"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                onKeyDown={e => e.key === "Enter" && submitPhone()}
                className="pg-input"
              />

              {/* CTA */}
              <button
                disabled={loading}
                onClick={submitPhone}
                className="pg-btn-primary"
              >
                {loading ? "Invio in corso…" : "Voglio essere ricontattato/a"}
              </button>

              {/* Skip */}
              
            </>
          ) : (
            <div className="pg-success">
              <div className="pg-check">
                <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                  <path d="M1.5 7L6.5 12L16.5 2" stroke="#7A5C28" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="pg-success-title">Grazie mille.</p>
              <p className="pg-success-sub">Ti contatteremo su WhatsApp a breve.</p>
            </div>
          )}

        </div>
      </div>
    </>
  );
}