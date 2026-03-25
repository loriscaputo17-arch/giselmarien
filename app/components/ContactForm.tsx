"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "done";

export default function ContactForm() {
  const [form, setForm] = useState({ nome: "", email: "", telefono: "", messaggio: "" });
  const [status, setStatus] = useState<Status>("idle");

  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(p => ({ ...p, [k]: e.target.value }));

  const isValid =
    form.nome.trim().length > 1 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;
    setStatus("sending");

    const wa = `https://wa.me/393478655415?text=${encodeURIComponent(
      `Ciao! Messaggio dal sito.\n\n*Nome:* ${form.nome}\n*Email:* ${form.email}\n` +
      (form.telefono ? `*Tel:* ${form.telefono}\n` : "") +
      (form.messaggio ? `\n${form.messaggio}` : "")
    )}`;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) { setStatus("done"); return; }
    } catch { /* fallback WA */ }

    window.open(wa, "_blank");
    setStatus("done");
  }

  return (
    <>
      <style>{`
        .cf-section {
          background: #F2EDE2;
          padding: 100px 32px;
          position: relative;
          overflow: hidden;
        }
        .cf-section::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 60% 40% at 50% 0%, rgba(160,130,70,0.06) 0%, transparent 70%);
          pointer-events: none;
        }

        .cf-inner {
          position: relative; z-index: 1;
          max-width: 680px;
          margin: 0 auto;
          display: flex; flex-direction: column; gap: 60px;
        }

        /* ─── Header ─── */
        .cf-header {
          display: flex; flex-direction: column;
          align-items: center; gap: 16px;
          text-align: center;
        }
        .cf-eyebrow {
          font-family: 'Jost', sans-serif;
          font-size: 10px; font-weight: 400;
          letter-spacing: 0.4em; text-transform: uppercase;
          color: #A07832;
        }
        .cf-orn { display: flex; align-items: center; gap: 10px; }
        .cf-orn-line { width: 40px; height: 1px; background: rgba(160,130,70,0.3); }
        .cf-orn-diam {
          width: 5px; height: 5px;
          background: rgba(160,130,70,0.45);
          transform: rotate(45deg); flex-shrink: 0;
        }
        .cf-h2 {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(32px, 5vw, 48px);
          line-height: 1.1; color: #2C2418; margin: 0;
        }
        .cf-h2 em { font-style: italic; color: #A07832; }
        .cf-sub {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300; font-style: italic;
          font-size: clamp(16px, 2vw, 19px);
          line-height: 1.7; color: rgba(90,74,53,0.6);
        }

        /* ─── Form ─── */
        .cf-form {
          display: flex; flex-direction: column; gap: 0;
          border-top: 1px solid rgba(160,130,70,0.18);
        }

        .cf-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
        @media (max-width: 580px) { .cf-row { grid-template-columns: 1fr; } }

        .cf-field {
          display: flex; flex-direction: column; gap: 10px;
          padding: 28px 0;
          border-bottom: 1px solid rgba(160,130,70,0.12);
        }
        .cf-row .cf-field:first-child {
          padding-right: 40px;
          border-right: 1px solid rgba(160,130,70,0.12);
        }
        .cf-row .cf-field:last-child {
          padding-left: 40px;
        }
        @media (max-width: 580px) {
          .cf-row .cf-field:first-child { padding-right: 0; border-right: none; }
          .cf-row .cf-field:last-child  { padding-left: 0; }
        }

        .cf-label {
          font-family: 'Jost', sans-serif;
          font-size: 10px; font-weight: 400;
          letter-spacing: 0.3em; text-transform: uppercase;
          color: rgba(90,74,53,0.5);
        }
        .cf-label span { color: rgba(160,130,70,0.75); margin-left: 2px; }

        .cf-input {
          font-family: 'Jost', sans-serif;
          font-size: 16px; font-weight: 300; letter-spacing: 0.02em;
          color: #2C2418;
          background: transparent; border: none; outline: none;
          border-bottom: 1px solid rgba(160,130,70,0.25);
          padding: 10px 0; width: 100%;
          transition: border-color .2s ease;
          -webkit-appearance: none;
        }
        .cf-input::placeholder { color: rgba(90,74,53,0.3); }
        .cf-input:focus { border-bottom-color: #A07832; }

        .cf-textarea {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300; font-style: italic;
          font-size: 18px; line-height: 1.75; letter-spacing: 0.01em;
          color: #2C2418;
          background: transparent; border: none; outline: none;
          border-bottom: 1px solid rgba(160,130,70,0.25);
          padding: 10px 0; resize: none; min-height: 110px; width: 100%;
          transition: border-color .2s ease;
        }
        .cf-textarea::placeholder { color: rgba(90,74,53,0.3); font-style: italic; }
        .cf-textarea:focus { border-bottom-color: #A07832; }

        /* ─── Footer ─── */
        .cf-footer {
          display: flex; align-items: center;
          justify-content: space-between; gap: 24px;
          padding-top: 16px;
        }
        @media (max-width: 480px) {
          .cf-footer { flex-direction: column; align-items: flex-start; }
        }

        .cf-note {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300; font-style: italic;
          font-size: 15px; line-height: 1.7;
          color: rgba(90,74,53,0.5);
        }

        .cf-btn {
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
        .cf-btn::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent);
          transform: translateX(-100%);
          transition: transform .55s ease;
        }
        .cf-btn:hover::before { transform: translateX(100%); }
        .cf-btn:hover { background: #3D3220; }
        .cf-btn:disabled { opacity: .45; cursor: not-allowed; }

        /* ─── Success ─── */
        .cf-success {
          display: flex; flex-direction: column;
          align-items: center; gap: 20px;
          padding: 48px 0;
          animation: cfFade .5s ease both;
        }
        @keyframes cfFade {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: none; }
        }
        .cf-success-diamond {
          width: 48px; height: 48px;
          border: 1px solid rgba(160,130,70,0.4);
          transform: rotate(45deg);
          display: flex; align-items: center; justify-content: center;
        }
        .cf-success-diamond svg { transform: rotate(-45deg); }
        .cf-success-h {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300; font-size: 32px; color: #2C2418;
        }
        .cf-success-h em { font-style: italic; color: #A07832; }
        .cf-success-sub {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300; font-style: italic;
          font-size: 17px; line-height: 1.75;
          color: rgba(90,74,53,0.55);
          text-align: center; max-width: 340px;
        }
      `}</style>

      <section className="cf-section">
        <div className="cf-inner">

          {/* Header */}
          <div className="cf-header">
            <span className="cf-eyebrow">Contatti</span>
            <div className="cf-orn">
              <span className="cf-orn-line" />
              <span className="cf-orn-diam" />
              <span className="cf-orn-line" />
            </div>
            <h2 className="cf-h2">Scrivici,<br /><em>ti rispondiamo presto</em></h2>
            <p className="cf-sub">
              Per domande, preventivi o semplicemente per presentarsi — siamo qui.
            </p>
          </div>

          {/* Form / Success */}
          {status === "done" ? (
            <div className="cf-success">
              <div className="cf-success-diamond">
                <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                  <path d="M1 7L6.5 12.5L17 1" stroke="#A07832" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h2 className="cf-success-h">Messaggio <em>ricevuto.</em></h2>
              <p className="cf-success-sub">
                Grazie per averci scritto. Ti risponderemo a breve.
              </p>
              <div className="cf-orn" style={{ marginTop: 8 }}>
                <span className="cf-orn-line" />
                <span className="cf-orn-diam" />
                <span className="cf-orn-line" />
              </div>
            </div>
          ) : (
            <form className="cf-form" onSubmit={handleSubmit} noValidate>

              {/* Nome + Email */}
              <div className="cf-row">
                <div className="cf-field">
                  <label className="cf-label">Nome<span>*</span></label>
                  <input
                    className="cf-input"
                    type="text"
                    placeholder="Nome e cognome"
                    value={form.nome}
                    onChange={set("nome")}
                    required
                  />
                </div>
                <div className="cf-field">
                  <label className="cf-label">Email<span>*</span></label>
                  <input
                    className="cf-input"
                    type="email"
                    placeholder="La tua email"
                    value={form.email}
                    onChange={set("email")}
                    required
                  />
                </div>
              </div>

              {/* Telefono */}
              <div className="cf-field">
                <label className="cf-label">Telefono / WhatsApp</label>
                <input
                  className="cf-input"
                  type="tel"
                  placeholder="+39 …"
                  value={form.telefono}
                  onChange={set("telefono")}
                />
              </div>

              {/* Messaggio */}
              <div className="cf-field" style={{ borderBottom: "none" }}>
                <label className="cf-label">Messaggio</label>
                <textarea
                  className="cf-textarea"
                  placeholder="Raccontaci qualcosa del tuo evento o della tua richiesta…"
                  value={form.messaggio}
                  onChange={set("messaggio")}
                />
              </div>

              {/* Footer */}
              <div className="cf-footer">
                <p className="cf-note">
                  Rispondiamo entro poche ore,<br />
                  spesso via WhatsApp.
                </p>
                <button className="cf-btn" type="submit" disabled={status === "sending"}>
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

            </form>
          )}

        </div>
      </section>
    </>
  );
}