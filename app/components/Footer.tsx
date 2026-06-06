"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { supabase } from "@/app/lib/supabase";

const WHATSAPP = "393478655415";
const PHONE_DISPLAY = "+39 347 86 55 415";
const PHONE_TEL = "+393478655415";
const EMAIL = "giselmarienstudio@gmail.com";

export default function Footer() {
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const rootRef = useRef<HTMLElement>(null);

  // reveal on scroll
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = rootRef.current?.querySelectorAll<HTMLElement>("[data-rv]");
    if (!els) return;
    if (reduce) { els.forEach((el) => el.classList.add("in")); return; }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

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
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,400&family=Jost:wght@300;400;500;600&display=swap');

        :root { --ft-ease: cubic-bezier(.16,1,.3,1); }

        .ft-root { background: #1E1A12; color: #E4E2DD; position: relative; overflow: hidden; }
        .ft-root::before {
          content: ''; position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 70% 40% at 50% 0%, rgba(200,154,74,0.1) 0%, transparent 65%),
            radial-gradient(ellipse 40% 30% at 10% 100%, rgba(160,120,50,0.06) 0%, transparent 60%);
        }
        .ft-orb { position: absolute; border-radius: 50%; filter: blur(60px); pointer-events: none; }
        .ft-orb-a { width: 420px; height: 420px; top: -160px; right: -80px; background: radial-gradient(circle, rgba(200,154,74,0.12), transparent 70%); animation: ftDrift 18s ease-in-out infinite; }
        .ft-orb-b { width: 320px; height: 320px; bottom: -120px; left: -60px; background: radial-gradient(circle, rgba(160,130,70,0.08), transparent 70%); animation: ftDrift 22s ease-in-out infinite reverse; }
        @keyframes ftDrift { 0%,100% { transform: translate(0,0); } 50% { transform: translate(26px,-28px); } }

        [data-rv] { opacity: 0; transform: translateY(26px); transition: opacity .9s var(--ft-ease), transform .9s var(--ft-ease); }
        [data-rv].in { opacity: 1; transform: none; }

        .ft-inner { max-width: 1280px; margin: 0 auto; padding: 96px 32px 56px; position: relative; z-index: 1; }

        /* ── CTA strip ── */
        .ft-cta {
          display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between;
          gap: 28px; padding: 0 0 64px; margin-bottom: 64px;
          border-bottom: 1px solid rgba(160,130,70,0.15);
        }
        .ft-cta-text { display: flex; flex-direction: column; gap: 10px; max-width: 480px; }
        .ft-cta-h { font-family: 'Cormorant Garamond', serif; font-weight: 400; font-size: clamp(28px, 4vw, 42px); line-height: 1.1; color: #E4E2DD; margin: 0; }
        .ft-cta-h em { font-style: italic; color: #C89A4A; }
        .ft-cta-sub { font-family: 'Jost', sans-serif; font-weight: 300; font-size: 13px; letter-spacing: 0.04em; line-height: 1.7; color: rgba(228,226,221,0.5); margin: 0; }
        .ft-cta-btns { display: flex; flex-wrap: wrap; gap: 10px; }
        .ft-btn {
          display: inline-flex; align-items: center; gap: 9px;
          font-family: 'Jost', sans-serif; font-size: 10px; font-weight: 600;
          letter-spacing: 0.22em; text-transform: uppercase; text-decoration: none;
          padding: 15px 26px; border-radius: 44px;
          transition: transform .35s var(--ft-ease), box-shadow .35s, background .3s, border-color .3s, color .3s;
        }
        .ft-btn svg { width: 16px; height: 16px; }
        .ft-btn-wa { background: #1faf54; color: #fff; }
        .ft-btn-wa:hover { transform: translateY(-3px); box-shadow: 0 16px 34px rgba(31,175,84,0.3); }
        .ft-btn-mail { background: rgba(220,200,155,0.92); color: #1E1A12; }
        .ft-btn-mail:hover { transform: translateY(-3px); box-shadow: 0 16px 34px rgba(200,154,74,0.25); background: rgba(220,200,155,1); }
        .ft-btn-call { background: transparent; color: #E4E2DD; border: 1px solid rgba(228,226,221,0.22); }
        .ft-btn-call:hover { transform: translateY(-3px); border-color: #E4E2DD; }
        @media (max-width: 720px) { .ft-cta { flex-direction: column; align-items: flex-start; padding-bottom: 48px; margin-bottom: 48px; } }

        /* ── Logo ── */
        .ft-logo-wrap { display: flex; flex-direction: column; align-items: center; gap: 24px; margin-bottom: 72px; }
        .ft-logo { width: clamp(140px, 18vw, 220px); height: auto; display: block; }
        .ft-logo-orn { display: flex; align-items: center; gap: 12px; width: 100%; max-width: 280px; }
        .ft-orn-line { flex: 1; height: 1px; background: rgba(160,130,70,0.2); }
        .ft-orn-diam { width: 5px; height: 5px; background: rgba(160,130,70,0.35); transform: rotate(45deg); flex-shrink: 0; }

        /* ── Grid ── */
        .ft-grid { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 48px 40px; margin-bottom: 72px; }
        @media (max-width: 960px) { .ft-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 560px) { .ft-grid { grid-template-columns: 1fr; gap: 40px; } }

        .ft-col { display: flex; flex-direction: column; gap: 20px; }
        .ft-col-label {
          font-family: 'Jost', sans-serif; font-size: 8px; font-weight: 500;
          letter-spacing: 0.42em; text-transform: uppercase; color: rgba(200,154,74,0.65);
          padding-bottom: 10px; border-bottom: 1px solid rgba(160,130,70,0.15);
        }
        .ft-col-links { display: flex; flex-direction: column; gap: 10px; }
        .ft-link {
          font-family: 'Jost', sans-serif; font-size: 11px; font-weight: 300; letter-spacing: 0.12em;
          color: rgba(228,226,221,0.65); text-decoration: none; transition: color .25s ease;
          position: relative; align-self: flex-start;
        }
        .ft-link::after {
          content: ''; position: absolute; bottom: -1px; left: 0; right: 0; height: 1px;
          background: rgba(200,154,74,0.6); transform: scaleX(0); transform-origin: left; transition: transform .3s var(--ft-ease);
        }
        .ft-link:hover { color: #fff; }
        .ft-link:hover::after { transform: scaleX(1); }

        .ft-text { font-family: 'Jost', sans-serif; font-size: 11px; font-weight: 300; letter-spacing: 0.05em; line-height: 1.8; color: rgba(228,226,221,0.45); }
        .ft-text a { color: inherit; text-decoration: none; transition: color .2s; }
        .ft-text a:hover { color: rgba(228,226,221,0.85); }

        /* ── Newsletter ── */
        .ft-nl-body { font-family: 'Jost', sans-serif; font-weight: 300; font-size: 12px; line-height: 1.75; letter-spacing: 0.03em; color: rgba(228,226,221,0.5); }
        .ft-nl-form { display: flex; flex-direction: column; gap: 6px; }
        .ft-nl-input {
          width: 100%; font-family: 'Jost', sans-serif; font-size: 12px; font-weight: 300; letter-spacing: 0.06em;
          color: #E4E2DD; background: rgba(255,255,255,0.05); border: none; border-bottom: 1px solid rgba(160,130,70,0.3);
          padding: 12px 4px; outline: none; transition: border-color .25s ease, background .25s; -webkit-appearance: none;
        }
        .ft-nl-input::placeholder { color: rgba(228,226,221,0.25); }
        .ft-nl-input:focus { border-bottom-color: rgba(200,154,74,0.8); background: rgba(255,255,255,0.07); }
        .ft-nl-btn {
          align-self: flex-start; font-family: 'Jost', sans-serif; font-size: 9px; font-weight: 600;
          letter-spacing: 0.32em; text-transform: uppercase; color: #1E1A12; background: rgba(220,200,155,0.9);
          border: none; padding: 12px 26px; cursor: pointer; margin-top: 6px; border-radius: 2px;
          position: relative; overflow: hidden; transition: background .3s ease, transform .3s var(--ft-ease);
        }
        .ft-nl-btn::before { content: ''; position: absolute; inset: 0; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent); transform: translateX(-120%); transition: transform .6s var(--ft-ease); }
        .ft-nl-btn:hover::before { transform: translateX(120%); }
        .ft-nl-btn:hover { background: rgba(220,200,155,1); transform: translateY(-2px); }
        .ft-nl-btn:disabled { opacity: .5; cursor: not-allowed; transform: none; }
        .ft-nl-sent { font-family: 'Cormorant Garamond', serif; font-weight: 400; font-style: italic; font-size: 15px; color: rgba(200,154,74,0.85); animation: ftfade .4s ease both; }
        @keyframes ftfade { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:none; } }

        /* ── Bottom ── */
        .ft-bottom { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 12px; padding-top: 32px; border-top: 1px solid rgba(160,130,70,0.12); }
        .ft-bottom-left, .ft-bottom-right { font-family: 'Jost', sans-serif; font-size: 9px; font-weight: 300; letter-spacing: 0.28em; text-transform: uppercase; color: rgba(228,226,221,0.22); }
        .ft-bottom-center { display: flex; align-items: center; gap: 8px; }
        .ft-bottom-dot { width: 3px; height: 3px; background: rgba(160,130,70,0.25); border-radius: 50%; }
        .ft-bottom-item { font-family: 'Jost', sans-serif; font-size: 9px; font-weight: 300; letter-spacing: 0.22em; text-transform: uppercase; color: rgba(228,226,221,0.22); text-decoration: none; transition: color .2s; }
        .ft-bottom-item:hover { color: rgba(228,226,221,0.5); }

        @media (prefers-reduced-motion: reduce) { [data-rv] { opacity: 1 !important; transform: none !important; } .ft-orb { animation: none !important; } }
      `}</style>

      <footer className="ft-root" ref={rootRef}>
        <span className="ft-orb ft-orb-a" />
        <span className="ft-orb ft-orb-b" />
        <div className="ft-inner">

          {/* CTA strip */}
          <div className="ft-cta" data-rv>
            <div className="ft-cta-text">
              <h2 className="ft-cta-h">Parliamo del <em>tuo evento</em></h2>
              <p className="ft-cta-sub">Una consulenza, nessun impegno. Scrivici su WhatsApp o chiamaci: ti rispondiamo personalmente.</p>
            </div>
            <div className="ft-cta-btns">
              <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" className="ft-btn ft-btn-wa">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.8 4.9-1.3A10 10 0 1 0 12 2Zm5.5 14.2c-.2.6-1.2 1.2-1.7 1.2-.4 0-1 .1-3.4-1s-3.8-3.6-3.9-3.8-1-1.3-1-2.5.6-1.8.8-2 .5-.3.6-.3h.5c.2 0 .4 0 .6.5l.7 1.7c0 .2.1.4 0 .6l-.4.5-.3.3c-.1.2-.3.3-.1.6s.6 1 1.3 1.6c.9.8 1.6 1 1.9 1.2s.4.1.6-.1l.7-.9c.2-.2.4-.2.6-.1l1.7.8c.2.1.4.2.5.3s.1.7-.1 1.3Z" /></svg>
                WhatsApp
              </a>
              <a href={`mailto:${EMAIL}`} className="ft-btn ft-btn-mail">
                <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="m4 7 8 5 8-5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>
                Email
              </a>
              <a href={`tel:${PHONE_TEL}`} className="ft-btn ft-btn-call">
                <svg viewBox="0 0 24 24" fill="none"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>
                Chiama
              </a>
            </div>
          </div>

          {/* Logo */}
          <div className="ft-logo-wrap" data-rv>
            <img src="/logoreverse.png" alt="Gisel Marién" className="ft-logo" />
            <div className="ft-logo-orn">
              <span className="ft-orn-line" />
              <span className="ft-orn-diam" />
              <span className="ft-orn-line" />
            </div>
          </div>

          {/* Grid */}
          <div className="ft-grid" data-rv>

            <div className="ft-col">
              <span className="ft-col-label">Resta in contatto</span>
              <p className="ft-nl-body">Aggiornamenti su progetti e produzioni in corso. Nessuna comunicazione superflua.</p>
              {sent ? (
                <p className="ft-nl-sent">Grazie — ti ricontatteremo presto.</p>
              ) : (
                <form className="ft-nl-form" onSubmit={submitPhone}>
                  <input
                    type="tel"
                    placeholder="Numero WhatsApp"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="ft-nl-input"
                  />
                  <button type="submit" disabled={loading} className="ft-nl-btn">
                    {loading ? "Invio…" : "Iscriviti"}
                  </button>
                </form>
              )}
            </div>

            <div className="ft-col">
              <span className="ft-col-label">Navigazione</span>
              <div className="ft-col-links">
                <Link href="/approach" className="ft-link">Manifesto</Link>
                <Link href="/#form" className="ft-link">Prenota</Link>
                <Link href="/contact" className="ft-link">Contatti</Link>
              </div>
            </div>

            <div className="ft-col">
              <span className="ft-col-label">Social</span>
              <div className="ft-col-links">
                <a href="https://www.instagram.com/giselmarienstudio/" target="_blank" rel="noopener noreferrer" className="ft-link">Instagram</a>
                <a href="https://www.tiktok.com/@gisel.marien" target="_blank" rel="noopener noreferrer" className="ft-link">TikTok</a>
                <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="ft-link">Facebook</a>
                <a href={`mailto:${EMAIL}`} className="ft-link">Email</a>
                <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" className="ft-link">WhatsApp</a>
              </div>
            </div>

            <div className="ft-col">
              <span className="ft-col-label">Contatti diretti</span>
              <div className="ft-col-links" style={{ gap: 14 }}>
                <p className="ft-text"><a href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
                <p className="ft-text">
                  <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer">
                    WhatsApp<br />{PHONE_DISPLAY}
                  </a>
                </p>
                <p className="ft-text">Campania · Italia</p>
              </div>
            </div>

          </div>

          {/* Bottom bar */}
          <div className="ft-bottom">
            <span className="ft-bottom-left">© {new Date().getFullYear()} Gisel Marién</span>
            <div className="ft-bottom-center">
              <Link href="/privacy" className="ft-bottom-item">Privacy</Link>
              <span className="ft-bottom-dot" />
              <Link href="/cookies" className="ft-bottom-item">Cookie</Link>
              <span className="ft-bottom-dot" />
              <Link href="/terms" className="ft-bottom-item">Termini</Link>
            </div>
            <span className="ft-bottom-right">Artistic Production Studio · Made in Italy</span>
          </div>

        </div>
      </footer>
    </>
  );
}