"use client";

import { useState } from "react";
import { supabase } from "@/app/lib/supabase";

const STEPS = 5;

const EVENT_TYPES = [
  { label: "Matrimonio",          icon: "◇" },
  { label: "Cerimonia / Comunione", icon: "◇" },
  { label: "Compleanno / Laurea", icon: "◇" },
  { label: "Hotel / Ristorante",  icon: "◇" },
  { label: "Evento aziendale",    icon: "◇" },
  { label: "Altro",               icon: "◇" },
];

export default function WarmForm() {
  const [step, setStep]       = useState(1);
  const [loading, setLoading] = useState(false);
  const [form, setForm]       = useState({
    eventType: "",
    timing:    "",
    name:      "",
    phone:     "",
    email:     "",
  });

  const submitForm = async () => {
    setLoading(true);
    const { error } = await supabase.from("leads").insert([{
      event_type: form.eventType,
      timing:     form.timing,
      name:       form.name,
      phone:      form.phone,
      email:      form.email,
    }]);
    setLoading(false);
    if (error) { console.error(error); alert("Errore durante l'invio. Riprova."); return; }
    setStep(6);
  };

  const progress = ((step - 1) / STEPS) * 100;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@300;400;500&display=swap');

        .wf-section {
          background: #F2EDE2;
          padding: 120px 24px;
          position: relative; overflow: hidden;
        }
        .wf-section::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 60% 40% at 50% 100%, rgba(160,130,70,0.07) 0%, transparent 65%);
          pointer-events: none;
        }

        .wf-wrapper {
          position: relative; z-index: 10;
          max-width: 560px; margin: 0 auto;
          display: flex; flex-direction: column; align-items: center; gap: 32px;
        }

        /* ── Top label ── */
        .wf-eyebrow {
          font-family: 'Jost', sans-serif;
          font-size: 9px; font-weight: 400;
          letter-spacing: 0.4em; text-transform: uppercase;
          color: rgba(160,120,60,0.7);
          display: flex; align-items: center; gap: 12px;
        }
        .wf-orn-line  { width: 40px; height: 1px; background: rgba(160,130,70,0.3); }
        .wf-orn-diam  { width: 5px; height: 5px; background: rgba(160,130,70,0.45); transform: rotate(45deg); flex-shrink: 0; }

        /* ── Card ── */
        .wf-card {
          width: 100%;
          background: #FAF8F3;
          padding: 52px 48px;
          position: relative;
          box-shadow: 0 24px 64px rgba(44,36,24,0.08), 0 2px 6px rgba(44,36,24,0.04);
        }
        /* thin border */
        .wf-card::before {
          content: '';
          position: absolute; inset: 0;
          border: 1px solid rgba(160,130,70,0.18);
          pointer-events: none;
        }
        /* corner ticks */
        .wf-corner {
          position: absolute; width: 18px; height: 18px; pointer-events: none;
        }
        .wf-corner::before, .wf-corner::after {
          content: ''; position: absolute; background: rgba(160,130,70,0.5);
        }
        .wf-corner::before { width: 100%; height: 1px; top: 0; left: 0; }
        .wf-corner::after  { width: 1px; height: 100%; top: 0; left: 0; }
        .wf-c-tl { top: 10px;    left: 10px; }
        .wf-c-tr { top: 10px;    right: 10px; transform: scaleX(-1); }
        .wf-c-bl { bottom: 10px; left: 10px;  transform: scaleY(-1); }
        .wf-c-br { bottom: 10px; right: 10px; transform: scale(-1); }

        /* ── Progress bar ── */
        .wf-progress-wrap {
          width: 100%; height: 1px;
          background: rgba(160,130,70,0.12);
          margin-bottom: 44px; position: relative;
        }
        .wf-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, rgba(160,130,70,0.5), rgba(200,160,80,0.8));
          transition: width .5s cubic-bezier(.4,0,.2,1);
        }
        .wf-progress-label {
          position: absolute; right: 0; top: 6px;
          font-family: 'Jost', sans-serif;
          font-size: 8px; font-weight: 300;
          letter-spacing: 0.3em; color: rgba(160,130,70,0.5);
        }

        /* ── Step content ── */
        .wf-step {
          display: flex; flex-direction: column;
          align-items: center; gap: 32px;
          text-align: center;
          animation: wffade .35s ease both;
        }
        @keyframes wffade {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: none; }
        }

        .wf-step-q {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300; font-size: clamp(22px, 5vw, 30px);
          line-height: 1.25; letter-spacing: 0.01em;
          color: #2C2418;
        }
        .wf-step-q em { font-style: italic; color: #A07832; }

        /* ── Event type buttons ── */
        .wf-choices {
          width: 100%;
          display: flex; flex-direction: column; gap: 6px;
        }
        .wf-choice {
          width: 100%; background: transparent;
          font-family: 'Jost', sans-serif;
          font-size: 11px; font-weight: 300;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: #5A4A35;
          border: 1px solid rgba(160,130,70,0.2);
          padding: 14px 20px;
          cursor: pointer; text-align: left;
          display: flex; align-items: center; justify-content: space-between;
          transition: all .22s ease;
        }
        .wf-choice:hover {
          background: rgba(160,130,70,0.06);
          border-color: rgba(160,130,70,0.5);
          color: #2C2418;
        }
        .wf-choice:hover .wf-choice-arrow { opacity: 1; transform: translateX(0); }
        .wf-choice-arrow {
          font-size: 13px; color: rgba(160,130,70,0.6);
          opacity: 0; transform: translateX(-6px);
          transition: all .22s ease;
        }

        /* ── Text inputs ── */
        .wf-input {
          width: 100%;
          font-family: 'Jost', sans-serif;
          font-size: 14px; font-weight: 300; letter-spacing: 0.05em;
          color: #2C2418;
          background: #FFFFFF;
          border: none; border-bottom: 1px solid rgba(160,130,70,0.35);
          padding: 14px 4px;
          outline: none;
          transition: border-color .25s ease;
          -webkit-appearance: none;
        }
        .wf-input::placeholder { color: rgba(90,74,53,0.3); }
        .wf-input:focus { border-bottom-color: #A07832; }

        .wf-input-hint {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic; font-size: 13px;
          color: rgba(90,74,53,0.45);
          margin-top: -20px;
          align-self: flex-start;
        }

        /* ── Nav ── */
        .wf-nav {
          width: 100%; display: flex;
          justify-content: space-between; align-items: center;
        }
        .wf-back {
          font-family: 'Jost', sans-serif;
          font-size: 9px; font-weight: 300;
          letter-spacing: 0.3em; text-transform: uppercase;
          color: rgba(90,74,53,0.4);
          background: none; border: none; cursor: pointer;
          transition: color .2s ease; padding: 0;
        }
        .wf-back:hover { color: rgba(90,74,53,0.75); }

        .wf-next {
          font-family: 'Jost', sans-serif;
          font-size: 9px; font-weight: 500;
          letter-spacing: 0.3em; text-transform: uppercase;
          color: #FAF8F3;
          background: #2C2418;
          border: none; padding: 12px 28px;
          cursor: pointer; position: relative; overflow: hidden;
          transition: background .3s ease;
          display: flex; align-items: center; gap: 10px;
        }
        .wf-next::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent);
          transform: translateX(-100%); transition: transform .5s ease;
        }
        .wf-next:hover::before { transform: translateX(100%); }
        .wf-next:hover { background: #3D3220; }
        .wf-next:disabled { opacity: .45; cursor: not-allowed; }

        /* ── Submit button ── */
        .wf-submit {
          width: 100%;
          font-family: 'Jost', sans-serif;
          font-size: 10px; font-weight: 500;
          letter-spacing: 0.32em; text-transform: uppercase;
          color: #FAF8F3; background: #2C2418;
          border: none; padding: 18px 24px;
          cursor: pointer; position: relative; overflow: hidden;
          transition: background .3s ease;
        }
        .wf-submit::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent);
          transform: translateX(-100%); transition: transform .6s ease;
        }
        .wf-submit:hover::before { transform: translateX(100%); }
        .wf-submit:hover { background: #3D3220; }
        .wf-submit:disabled { opacity: .5; cursor: not-allowed; }

        .wf-submit-note {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300; font-style: italic;
          font-size: 14px; line-height: 1.65;
          color: rgba(90,74,53,0.5);
          text-align: center;
        }

        /* ── Success ── */
        .wf-success {
          display: flex; flex-direction: column;
          align-items: center; gap: 20px;
          padding: 20px 0;
          animation: wffade .5s ease both;
        }
        .wf-success-icon {
          width: 48px; height: 48px;
          border: 1px solid rgba(160,130,70,0.4);
          display: flex; align-items: center; justify-content: center;
          transform: rotate(45deg);
        }
        .wf-success-icon svg { transform: rotate(-45deg); }
        .wf-success-h {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300; font-size: 30px;
          color: #2C2418; letter-spacing: 0.02em;
        }
        .wf-success-h em { font-style: italic; color: #A07832; }
        .wf-success-sub {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300; font-style: italic;
          font-size: 16px; line-height: 1.7;
          color: rgba(90,74,53,0.55); text-align: center;
          max-width: 300px;
        }

        /* ── Responsive ── */
        @media (max-width: 600px) {
          .wf-card { padding: 36px 24px; }
          .wf-step-q { font-size: 22px; }
        }
      `}</style>

      <section className="wf-section">
        <div className="wf-wrapper">

          {/* Eyebrow */}
          <div className="wf-eyebrow">
            <span className="wf-orn-line" />
            <span className="wf-orn-diam" />
            <span>Raccontaci la tua richiesta</span>
            <span className="wf-orn-diam" />
            <span className="wf-orn-line" />
          </div>

          {/* Card */}
          <div className="wf-card">
            <span className="wf-corner wf-c-tl" />
            <span className="wf-corner wf-c-tr" />
            <span className="wf-corner wf-c-bl" />
            <span className="wf-corner wf-c-br" />

            {/* Progress */}
            {step < 6 && (
              <div className="wf-progress-wrap">
                <div className="wf-progress-fill" style={{ width: `${progress}%` }} />
                {step > 1 && (
                  <span className="wf-progress-label">{step - 1} / {STEPS}</span>
                )}
              </div>
            )}

            {/* ── STEP 1: event type ── */}
            {step === 1 && (
              <div className="wf-step" key="s1">
                <h2 className="wf-step-q">
                  Che tipo di evento<br /><em>stai immaginando?</em>
                </h2>
                <div className="wf-choices">
                  {EVENT_TYPES.map(({ label }) => (
                    <button
                      key={label}
                      className="wf-choice"
                      onClick={() => { setForm({ ...form, eventType: label }); setStep(2); }}
                    >
                      {label}
                      <span className="wf-choice-arrow">→</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ── STEP 2: timing ── */}
            {step === 2 && (
              <div className="wf-step" key="s2">
                <h2 className="wf-step-q">
                  Quando si svolgerà<br /><em>l'evento?</em>
                </h2>
                <input
                  type="text"
                  placeholder="Es. giugno 2025 · data da definire"
                  className="wf-input"
                  defaultValue={form.timing}
                  onChange={e => setForm({ ...form, timing: e.target.value })}
                  onKeyDown={e => e.key === "Enter" && setStep(3)}
                />
                <p className="wf-input-hint">Anche una stima approssimativa va bene.</p>
                <div className="wf-nav">
                  <button className="wf-back" onClick={() => setStep(1)}>← Indietro</button>
                  <button className="wf-next" onClick={() => setStep(3)}>Avanti →</button>
                </div>
              </div>
            )}

            {/* ── STEP 3: name ── */}
            {step === 3 && (
              <div className="wf-step" key="s3">
                <h2 className="wf-step-q">
                  <em>Come ti chiami?</em>
                </h2>
                <input
                  type="text"
                  placeholder="Nome e cognome"
                  className="wf-input"
                  defaultValue={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  onKeyDown={e => e.key === "Enter" && setStep(4)}
                />
                <div className="wf-nav">
                  <button className="wf-back" onClick={() => setStep(2)}>← Indietro</button>
                  <button className="wf-next" onClick={() => setStep(4)}>Avanti →</button>
                </div>
              </div>
            )}

            {/* ── STEP 4: phone ── */}
            {step === 4 && (
              <div className="wf-step" key="s4">
                <h2 className="wf-step-q">
                  Dove possiamo<br /><em>scriverti?</em>
                </h2>
                <input
                  type="tel"
                  placeholder="Numero WhatsApp"
                  className="wf-input"
                  defaultValue={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  onKeyDown={e => e.key === "Enter" && setStep(5)}
                />
                <p className="wf-input-hint">Ti risponderemo su WhatsApp entro poche ore.</p>
                <div className="wf-nav">
                  <button className="wf-back" onClick={() => setStep(3)}>← Indietro</button>
                  <button className="wf-next" onClick={() => setStep(5)}>Avanti →</button>
                </div>
              </div>
            )}

            {/* ── STEP 5: email + submit ── */}
            {step === 5 && (
              <div className="wf-step" key="s5">
                <h2 className="wf-step-q">
                  Ultimo passo —<br /><em>la tua email</em>
                </h2>
                <input
                  type="email"
                  placeholder="Indirizzo email"
                  className="wf-input"
                  defaultValue={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  onKeyDown={e => e.key === "Enter" && !loading && submitForm()}
                />
                <button
                  onClick={submitForm}
                  disabled={loading}
                  className="wf-submit"
                >
                  {loading ? "Invio in corso…" : "Invia la richiesta"}
                </button>
                <p className="wf-submit-note">
                  Ti ricontatteremo entro poche ore via WhatsApp
                  per prendere in carico il tuo progetto.
                </p>
                <div className="wf-nav">
                  <button className="wf-back" onClick={() => setStep(4)}>← Indietro</button>
                  <span />
                </div>
              </div>
            )}

            {/* ── SUCCESS ── */}
            {step === 6 && (
              <div className="wf-success" key="s6">
                <div className="wf-success-icon">
                  <svg width="20" height="15" viewBox="0 0 20 15" fill="none">
                    <path d="M1.5 7.5L7.5 13.5L18.5 1.5" stroke="#A07832" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h2 className="wf-success-h">
                  Richiesta <em>inviata.</em>
                </h2>
                <p className="wf-success-sub">
                  Grazie. Ti contatteremo a breve via WhatsApp
                  per approfondire insieme il tuo progetto.
                </p>
                <div style={{ display:"flex", alignItems:"center", gap:12, marginTop:8 }}>
                  <span style={{ width:40, height:1, background:"rgba(160,130,70,0.25)" }} />
                  <span style={{ width:5, height:5, background:"rgba(160,130,70,0.4)", transform:"rotate(45deg)" }} />
                  <span style={{ width:40, height:1, background:"rgba(160,130,70,0.25)" }} />
                </div>
              </div>
            )}

          </div>

          {/* Bottom note */}
          {step < 6 && (
            <p style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: 9, fontWeight: 300,
              letterSpacing: "0.3em", textTransform: "uppercase",
              color: "rgba(90,74,53,0.3)", textAlign: "center"
            }}>
              Campania · Produzione artigianale · Su misura
            </p>
          )}

        </div>
      </section>
    </>
  );
}