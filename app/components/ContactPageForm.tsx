// src/app/components/ContactPageForm.tsx
"use client";

import { useState } from "react";
import { supabase } from "@/app/lib/supabase";

type Status = "idle" | "sending" | "done";

export default function ContactPageForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(p => ({ ...p, [k]: e.target.value }));

  const isValid =
    form.name.trim().length > 1 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) &&
    form.message.trim().length > 2;

  async function handleSubmit() {
    if (!isValid) return;
    setStatus("sending");

    const { error } = await supabase
      .from("contacts")
      .insert([{ name: form.name, email: form.email, message: form.message }]);

    if (error) {
      console.error(error);
      alert("Errore durante l'invio. Riprova.");
      setStatus("idle");
      return;
    }

    setStatus("done");
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@300;400;500&display=swap');

        .cpf-section {
          background: #F2EDE2;
          min-height: 100vh;
          padding: 140px 32px 100px;
          position: relative;
          overflow: hidden;
        }
        .cpf-section::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 60% 40% at 50% 0%, rgba(160,130,70,0.07) 0%, transparent 65%);
          pointer-events: none;
        }

        .cpf-inner {
          position: relative; z-index: 1;
          max-width: 680px;
          margin: 0 auto;
          display: flex; flex-direction: column; gap: 64px;
        }

        /* ─── Header ─── */
        .cpf-header {
          display: flex; flex-direction: column;
          align-items: center; gap: 16px;
          text-align: center;
        }
        .cpf-eyebrow {
          font-family: 'Jost', sans-serif;
          font-size: 10px; font-weight: 400;
          letter-spacing: 0.4em; text-transform: uppercase;
          color: #A07832;
        }
        .cpf-orn { display: flex; align-items: center; gap: 10px; }
        .cpf-orn-line { width: 40px; height: 1px; background: rgba(160,130,70,0.3); }
        .cpf-orn-diam {
          width: 5px; height: 5px;
          background: rgba(160,130,70,0.45);
          transform: rotate(45deg); flex-shrink: 0;
        }
        .cpf-h1 {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(36px, 6vw, 56px);
          line-height: 1.05; color: #2C2418; margin: 0;
        }
        .cpf-h1 em { font-style: italic; color: #A07832; }
        .cpf-sub {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300; font-style: italic;
          font-size: clamp(16px, 2vw, 19px);
          line-height: 1.7; color: rgba(90,74,53,0.6);
          max-width: 420px;
        }

        /* ─── Form ─── */
        .cpf-form {
          display: flex; flex-direction: column; gap: 0;
          border-top: 1px solid rgba(160,130,70,0.18);
        }

        .cpf-field {
          display: flex; flex-direction: column; gap: 10px;
          padding: 28px 0;
          border-bottom: 1px solid rgba(160,130,70,0.12);
        }

        .cpf-label {
          font-family: 'Jost', sans-serif;
          font-size: 10px; font-weight: 400;
          letter-spacing: 0.3em; text-transform: uppercase;
          color: rgba(90,74,53,0.5);
        }
        .cpf-label span { color: rgba(160,130,70,0.75); margin-left: 2px; }

        .cpf-input {
          font-family: 'Jost', sans-serif;
          font-size: 16px; font-weight: 300; letter-spacing: 0.02em;
          color: #2C2418;
          background: transparent; border: none; outline: none;
          border-bottom: 1px solid rgba(160,130,70,0.25);
          padding: 10px 0; width: 100%;
          transition: border-color .2s ease;
          -webkit-appearance: none;
        }
        .cpf-input::placeholder { color: rgba(90,74,53,0.3); }
        .cpf-input:focus { border-bottom-color: #A07832; }

        .cpf-textarea {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300; font-style: italic;
          font-size: 18px; line-height: 1.75;
          color: #2C2418;
          background: transparent; border: none; outline: none;
          border-bottom: 1px solid rgba(160,130,70,0.25);
          padding: 10px 0; resize: none; min-height: 120px; width: 100%;
          transition: border-color .2s ease;
        }
        .cpf-textarea::placeholder { color: rgba(90,74,53,0.3); font-style: italic; }
        .cpf-textarea:focus { border-bottom-color: #A07832; }

        /* ─── Footer ─── */
        .cpf-footer {
          display: flex; align-items: center;
          justify-content: space-between; gap: 24px;
          padding-top: 16px;
        }
        @media (max-width: 480px) {
          .cpf-footer { flex-direction: column; align-items: flex-start; }
        }
        .cpf-note {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300; font-style: italic;
          font-size: 15px; line-height: 1.7;
          color: rgba(90,74,53,0.5);
        }
        .cpf-btn {
          flex-shrink: 0;
          display: inline-flex; align-items: center; gap: 10px;
          font-family: 'Jost', sans-serif;
          font-size: 10px; font-weight: 500;
          letter-spacing: 0.32em; text-transform: uppercase;
          color: #FAF8F3; background: #2C2418;
          border: none; padding: 16px 36px;
          cursor: pointer; position: relative; overflow: hidden;
          transition: background .3s ease;
        }
        .cpf-btn::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent);
          transform: translateX(-100%);
          transition: transform .55s ease;
        }
        .cpf-btn:hover::before { transform: translateX(100%); }
        .cpf-btn:hover { background: #3D3220; }
        .cpf-btn:disabled { opacity: .45; cursor: not-allowed; }

        /* ─── Success ─── */
        .cpf-success {
          display: flex; flex-direction: column;
          align-items: center; gap: 20px;
          padding: 48px 0;
          animation: cpfFade .5s ease both;
        }
        @keyframes cpfFade {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: none; }
        }
        .cpf-success-diamond {
          width: 48px; height: 48px;
          border: 1px solid rgba(160,130,70,0.4);
          transform: rotate(45deg);
          display: flex; align-items: center; justify-content: center;
        }
        .cpf-success-diamond svg { transform: rotate(-45deg); }
        .cpf-success-h {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300; font-size: 32px; color: #2C2418;
        }
        .cpf-success-h em { font-style: italic; color: #A07832; }
        .cpf-success-sub {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300; font-style: italic;
          font-size: 17px; line-height: 1.75;
          color: rgba(90,74,53,0.55);
          text-align: center; max-width: 360px;
        }
      `}</style>

      <section className="cpf-section">
        <div className="cpf-inner">

          {/* Header */}
          <div className="cpf-header">
            <span className="cpf-eyebrow">Contatto</span>
            <div className="cpf-orn">
              <span className="cpf-orn-line" />
              <span className="cpf-orn-diam" />
              <span className="cpf-orn-line" />
            </div>
            <h1 className="cpf-h1">Parliamoci,<br /><em>siamo qui</em></h1>
            <p className="cpf-sub">
              Se hai già un'idea o desideri avviare una collaborazione —
              scrivici. Ti risponderemo entro poche ore.
            </p>
          </div>

          {/* Form / Success */}
          {status === "done" ? (
            <div className="cpf-success">
              <div className="cpf-success-diamond">
                <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                  <path d="M1 7L6.5 12.5L17 1" stroke="#A07832" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h2 className="cpf-success-h">Messaggio <em>ricevuto.</em></h2>
              <p className="cpf-success-sub">
                Grazie per averci scritto. Ti risponderemo a breve
                se il progetto è in linea con il nostro approccio.
              </p>
              <div className="cpf-orn" style={{ marginTop: 8 }}>
                <span className="cpf-orn-line" />
                <span className="cpf-orn-diam" />
                <span className="cpf-orn-line" />
              </div>
            </div>
          ) : (
            <div className="cpf-form">

              <div className="cpf-field">
                <label className="cpf-label">Nome<span>*</span></label>
                <input
                  className="cpf-input"
                  type="text"
                  placeholder="Nome e cognome"
                  value={form.name}
                  onChange={set("name")}
                />
              </div>

              <div className="cpf-field">
                <label className="cpf-label">Email<span>*</span></label>
                <input
                  className="cpf-input"
                  type="email"
                  placeholder="La tua email"
                  value={form.email}
                  onChange={set("email")}
                />
              </div>

              <div className="cpf-field" style={{ borderBottom: "none" }}>
                <label className="cpf-label">Messaggio<span>*</span></label>
                <textarea
                  className="cpf-textarea"
                  placeholder="Raccontaci il progetto o la collaborazione…"
                  value={form.message}
                  onChange={set("message")}
                />
              </div>

              <div className="cpf-footer">
                <p className="cpf-note">
                  Rispondiamo entro poche ore,<br />
                  spesso via WhatsApp.
                </p>
                <button
                  className="cpf-btn"
                  onClick={handleSubmit}
                  disabled={status === "sending" || !isValid}
                >
                  {status === "sending" ? "Invio…" : (
                    <>
                      Invia
                      <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                        <path d="M1 5h12M8 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </>
                  )}
                </button>
              </div>

            </div>
          )}

        </div>
      </section>
    </>
  );
}