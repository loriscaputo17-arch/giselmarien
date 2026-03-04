"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/app/lib/supabase";

export default function Footer() {
  const [phone, setPhone]       = useState("");
  const [sent, setSent]         = useState(false);
  const [loading, setLoading]   = useState(false);

  const submitPhone = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim() || loading) return;
    setLoading(true);
    const { error } = await supabase.from("phone_gate").insert([{ phone }]);
    setLoading(false);
    if (error) { console.error(error); alert("Errore durante l'invio. Riprova."); return; }
    setSent(true);
    setPhone("");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300;1,400&family=Jost:wght@300;400;500&display=swap');

        .ft-root {
          background: #1E1A12;
          color: #E4E2DD;
          position: relative; overflow: hidden;
        }
        /* warm glow */
        .ft-root::before {
          content: '';
          position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 70% 40% at 50% 0%,   rgba(160,120,50,0.09) 0%, transparent 65%),
            radial-gradient(ellipse 40% 30% at 10% 100%, rgba(160,120,50,0.05) 0%, transparent 60%);
        }

        .ft-inner {
          max-width: 1280px; margin: 0 auto;
          padding: 96px 32px 56px;
          position: relative; z-index: 1;
        }

        /* ── Logo block ── */
        .ft-logo-wrap {
          display: flex; flex-direction: column; align-items: center;
          gap: 24px; margin-bottom: 72px;
        }
        .ft-logo { width: clamp(140px, 18vw, 220px); height: auto; display: block; }
        .ft-logo-orn {
          display: flex; align-items: center; gap: 12px; width: 100%; max-width: 280px;
        }
        .ft-orn-line { flex: 1; height: 1px; background: rgba(160,130,70,0.2); }
        .ft-orn-diam { width: 5px; height: 5px; background: rgba(160,130,70,0.35); transform: rotate(45deg); flex-shrink: 0; }

        /* ── Main grid ── */
        .ft-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr;
          gap: 48px 40px;
          margin-bottom: 72px;
        }
        @media (max-width: 960px) { .ft-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 560px) { .ft-grid { grid-template-columns: 1fr; gap: 40px; } }

        /* ── Column ── */
        .ft-col { display: flex; flex-direction: column; gap: 20px; }

        .ft-col-label {
          font-family: 'Jost', sans-serif;
          font-size: 8px; font-weight: 400;
          letter-spacing: 0.42em; text-transform: uppercase;
          color: rgba(160,130,70,0.6);
          padding-bottom: 10px;
          border-bottom: 1px solid rgba(160,130,70,0.15);
        }

        .ft-col-links { display: flex; flex-direction: column; gap: 10px; }

        .ft-link {
          font-family: 'Jost', sans-serif;
          font-size: 11px; font-weight: 300;
          letter-spacing: 0.12em;
          color: rgba(228,226,221,0.65);
          text-decoration: none;
          transition: color .25s ease;
          position: relative; align-self: flex-start;
        }
        .ft-link::after {
          content: '';
          position: absolute; bottom: -1px; left: 0; right: 0;
          height: 1px; background: rgba(160,130,70,0.5);
          transform: scaleX(0); transform-origin: left;
          transition: transform .3s ease;
        }
        .ft-link:hover { color: rgba(228,226,221,1); }
        .ft-link:hover::after { transform: scaleX(1); }

        .ft-text {
          font-family: 'Jost', sans-serif;
          font-size: 11px; font-weight: 300;
          letter-spacing: 0.05em; line-height: 1.8;
          color: rgba(228,226,221,0.45);
        }
        .ft-text a { color: inherit; text-decoration: none; transition: color .2s; }
        .ft-text a:hover { color: rgba(228,226,221,0.8); }

        /* ── Newsletter col ── */
        .ft-nl-body {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300; font-style: italic;
          font-size: clamp(14px, 2vw, 16px); line-height: 1.75;
          color: rgba(228,226,221,0.5);
        }

        .ft-nl-form { display: flex; flex-direction: column; gap: 6px; }

        .ft-nl-input {
          width: 100%;
          font-family: 'Jost', sans-serif;
          font-size: 12px; font-weight: 300; letter-spacing: 0.06em;
          color: #E4E2DD;
          background: rgba(255,255,255,0.05);
          border: none; border-bottom: 1px solid rgba(160,130,70,0.3);
          padding: 12px 4px;
          outline: none;
          transition: border-color .25s ease;
          -webkit-appearance: none;
        }
        .ft-nl-input::placeholder { color: rgba(228,226,221,0.25); }
        .ft-nl-input:focus { border-bottom-color: rgba(160,130,70,0.7); }

        .ft-nl-btn {
          align-self: flex-start;
          font-family: 'Jost', sans-serif;
          font-size: 9px; font-weight: 500;
          letter-spacing: 0.32em; text-transform: uppercase;
          color: #1E1A12;
          background: rgba(220,200,155,0.9);
          border: none; padding: 11px 24px;
          cursor: pointer; margin-top: 4px;
          position: relative; overflow: hidden;
          transition: background .3s ease;
        }
        .ft-nl-btn::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          transform: translateX(-100%); transition: transform .55s ease;
        }
        .ft-nl-btn:hover::before { transform: translateX(100%); }
        .ft-nl-btn:hover { background: rgba(220,200,155,1); }
        .ft-nl-btn:disabled { opacity: .5; cursor: not-allowed; }

        .ft-nl-sent {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300; font-style: italic;
          font-size: 14px; color: rgba(160,130,70,0.8);
          animation: ftfade .4s ease both;
        }
        @keyframes ftfade { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:none; } }

        /* ── Bottom bar ── */
        .ft-bottom {
          display: flex; flex-wrap: wrap;
          justify-content: space-between; align-items: center;
          gap: 12px;
          padding-top: 32px;
          border-top: 1px solid rgba(160,130,70,0.12);
        }
        .ft-bottom-left, .ft-bottom-right {
          font-family: 'Jost', sans-serif;
          font-size: 9px; font-weight: 300;
          letter-spacing: 0.28em; text-transform: uppercase;
          color: rgba(228,226,221,0.22);
        }
        .ft-bottom-center {
          display: flex; align-items: center; gap: 8px;
        }
        .ft-bottom-dot {
          width: 3px; height: 3px;
          background: rgba(160,130,70,0.25); border-radius: 50%;
        }
        .ft-bottom-item {
          font-family: 'Jost', sans-serif;
          font-size: 9px; font-weight: 300;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: rgba(228,226,221,0.22);
          text-decoration: none;
          transition: color .2s;
        }
        .ft-bottom-item:hover { color: rgba(228,226,221,0.5); }
      `}</style>

      <footer className="ft-root">
        <div className="ft-inner">

          {/* Logo */}
          <div className="ft-logo-wrap">
            <img src="/logoreverse.png" alt="Gisel Marién" className="ft-logo" />
            <div className="ft-logo-orn">
              <span className="ft-orn-line" />
              <span className="ft-orn-diam" />
              <span className="ft-orn-line" />
            </div>
          </div>

          {/* Grid */}
          <div className="ft-grid">

            {/* Newsletter */}
            <div className="ft-col">
              <span className="ft-col-label">Resta in contatto</span>
              <p className="ft-nl-body">
                Aggiornamenti su progetti e produzioni in corso.
                Nessuna comunicazione superflua.
              </p>
              {sent ? (
                <p className="ft-nl-sent">Grazie — ti ricontatteremo presto.</p>
              ) : (
                <form className="ft-nl-form" onSubmit={submitPhone}>
                  <input
                    type="tel"
                    placeholder="Numero WhatsApp"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="ft-nl-input"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="ft-nl-btn"
                  >
                    {loading ? "Invio…" : "Iscriviti"}
                  </button>
                </form>
              )}
            </div>

            {/* Navigate */}
            <div className="ft-col">
              <span className="ft-col-label">Navigazione</span>
              <div className="ft-col-links">
                <Link href="/approach" className="ft-link">Manifesto</Link>
                <Link href="/#form"    className="ft-link">Prenota</Link>
                <Link href="/contact"  className="ft-link">Contatti</Link>
              </div>
            </div>

            {/* Social */}
            <div className="ft-col">
              <span className="ft-col-label">Social</span>
              <div className="ft-col-links">
                <a href="https://www.instagram.com/giselmarienstudio/" target="_blank" rel="noopener noreferrer" className="ft-link">Instagram</a>
                <a href="https://www.tiktok.com/@gisel.marien"          target="_blank" rel="noopener noreferrer" className="ft-link">TikTok</a>
                <a href="https://www.facebook.com/"                     target="_blank" rel="noopener noreferrer" className="ft-link">Facebook</a>
                <a href="mailto:giselmarienstudio@gmail.com"             className="ft-link">Email</a>
                <a href="https://wa.me/393478655415"                    target="_blank" rel="noopener noreferrer" className="ft-link">WhatsApp</a>
              </div>
            </div>

            {/* Contatti */}
            <div className="ft-col">
              <span className="ft-col-label">Contatti diretti</span>
              <div className="ft-col-links" style={{ gap: 14 }}>
                <p className="ft-text">
                  <a href="mailto:giselmarienstudio@gmail.com">
                    giselmarienstudio@gmail.com
                  </a>
                </p>
                <p className="ft-text">
                  <a href="https://wa.me/393478655415" target="_blank" rel="noopener noreferrer">
                    WhatsApp<br />+39 347 86 55 415
                  </a>
                </p>
                <p className="ft-text">
                  Campania · Italia
                </p>
              </div>
            </div>

          </div>

          {/* Bottom bar */}
          <div className="ft-bottom">
            <span className="ft-bottom-left">
              © {new Date().getFullYear()} Gisel Marién
            </span>

            <div className="ft-bottom-center">
              <Link href="/privacy" className="ft-bottom-item">Privacy</Link>
              <span className="ft-bottom-dot" />
              <Link href="/cookies" className="ft-bottom-item">Cookie</Link>
              <span className="ft-bottom-dot" />
              <Link href="/terms"   className="ft-bottom-item">Termini</Link>
            </div>

            <span className="ft-bottom-right">
              Artistic Production Studio · Made in Italy
            </span>
          </div>

        </div>
      </footer>
    </>
  );
}