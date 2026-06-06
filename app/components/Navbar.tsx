"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const WHATSAPP = "393478655415";
const PHONE_TEL = "+393478655415";

const NAV_ITEMS = [
  { href: "/#form", label: "Prenota" },
  { href: "/approach", label: "Manifesto" },
  { href: "/contact", label: "Contatti" },
  { href: "https://www.instagram.com/giselmarienstudio/", label: "Instagram" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 24);
        const h = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(h > 0 ? Math.min(y / h, 1) : 0);
        raf = 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&display=swap');

        :root { --nb-ease: cubic-bezier(.16,1,.3,1); }

        .nb-header {
          position: fixed; top: 0; left: 0; right: 0; z-index: 50;
          transition: background .4s var(--nb-ease), box-shadow .4s var(--nb-ease), padding .4s var(--nb-ease), border-color .4s;
          padding: 0 24px;
          border-bottom: 1px solid transparent;
          animation: nbDrop .8s var(--nb-ease) both;
        }
        @keyframes nbDrop { from { transform: translateY(-100%); opacity: 0; } to { transform: none; opacity: 1; } }
        .nb-header.scrolled {
          background: rgba(250,248,243,0.86);
          backdrop-filter: blur(16px) saturate(1.4);
          -webkit-backdrop-filter: blur(16px) saturate(1.4);
          box-shadow: 0 8px 40px rgba(44,36,24,0.06);
          border-bottom-color: rgba(160,130,70,0.14);
        }
        .nb-header:not(.scrolled) { background: transparent; }

        /* scroll progress */
        .nb-progress {
          position: absolute; left: 0; bottom: -1px; height: 2px;
          background: linear-gradient(90deg, #A07832, #C89A4A);
          transform-origin: left; transform: scaleX(var(--p,0));
          transition: transform .1s linear; opacity: 0;
        }
        .nb-header.scrolled .nb-progress { opacity: 1; }

        .nb-inner {
          max-width: 1280px; margin: 0 auto; height: 72px;
          display: flex; align-items: center; justify-content: space-between;
          position: relative;
          transition: height .4s var(--nb-ease);
        }
        .nb-header.scrolled .nb-inner { height: 62px; }

        /* ── Nav links ── */
        .nb-links { display: flex; align-items: center; gap: 36px; list-style: none; margin: 0; padding: 0; }
        .nb-link {
          font-family: 'Jost', sans-serif; font-size: 12px; font-weight: 400;
          letter-spacing: 0.38em; text-transform: uppercase;
          color: #2C2418; text-decoration: none; position: relative;
          transition: color .25s ease;
        }
        .nb-link::after {
          content: ''; position: absolute; bottom: -3px; left: 0; right: 0; height: 1px;
          background: rgba(160,130,70,0.6);
          transform: scaleX(0); transform-origin: left; transition: transform .3s var(--nb-ease);
        }
        .nb-link:hover { color: #A07832; }
        .nb-link:hover::after { transform: scaleX(1); }

        /* ── Prenota CTA (desktop) ── */
        .nb-cta {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'Jost', sans-serif; font-size: 9px; font-weight: 600;
          letter-spacing: 0.26em; text-transform: uppercase;
          color: #2C2418; text-decoration: none;
          padding: 10px 20px; border: 1px solid rgba(160,130,70,0.4); border-radius: 40px;
          transition: background .3s, color .3s, border-color .3s, transform .35s var(--nb-ease);
        }
        .nb-cta svg { width: 13px; height: 13px; }
        .nb-cta:hover { background: #2C2418; color: #FAF8F3; border-color: #2C2418; transform: translateY(-2px); }

        /* ── Center logo ── */
        .nb-logo { position: absolute; left: 50%; transform: translateX(-50%); display: flex; align-items: center; text-decoration: none; }
        .nb-logo img { width: clamp(120px, 14vw, 180px); height: auto; display: block; transition: opacity .25s ease, transform .4s var(--nb-ease); }
        .nb-logo:hover img { opacity: 0.72; transform: scale(1.03); }

        .nb-desktop { display: flex; }
        .nb-mobile-logo { display: none; }
        .nb-hamburger { display: none; }

        @media (max-width: 768px) {
          .nb-desktop { display: none !important; }
          .nb-logo { display: none !important; }
          .nb-mobile-logo { display: flex; align-items: center; text-decoration: none; }
          .nb-mobile-logo img { width: clamp(110px, 36vw, 160px); height: auto; display: block; }
          .nb-hamburger { display: flex; }
        }

        /* ── Hamburger ── */
        .nb-hamburger {
          flex-direction: column; justify-content: center; gap: 5px;
          background: none; border: none; cursor: pointer; padding: 6px;
          position: relative; z-index: 60;
        }
        .nb-bar {
          display: block; width: 22px; height: 1.5px; background: #2C2418;
          transition: transform .4s cubic-bezier(.4,0,.2,1), opacity .25s ease, background .3s;
          transform-origin: center;
        }
        .nb-hamburger.open .nb-bar { background: #2C2418; }
        .nb-hamburger.open .nb-bar:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
        .nb-hamburger.open .nb-bar:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .nb-hamburger.open .nb-bar:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

        /* ── Mobile menu overlay ── */
        .nb-overlay {
          position: fixed; inset: 0; z-index: 40;
          background: rgba(250,248,243,0.98);
          backdrop-filter: blur(22px) saturate(1.4);
          -webkit-backdrop-filter: blur(22px) saturate(1.4);
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          transition: opacity .45s var(--nb-ease), visibility .45s var(--nb-ease);
          overflow: hidden;
        }
        .nb-overlay::before {
          content: ''; position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(ellipse 60% 40% at 50% 10%, rgba(200,154,74,0.1), transparent 70%);
        }
        .nb-overlay.closed { opacity: 0; visibility: hidden; pointer-events: none; }
        .nb-overlay.open { opacity: 1; visibility: visible; }

        .nb-overlay-orn { display: flex; align-items: center; gap: 12px; margin-bottom: 40px; position: relative; z-index: 2; }
        .nb-orn-line { width: 48px; height: 1px; background: rgba(160,130,70,0.3); }
        .nb-orn-diam { width: 5px; height: 5px; background: rgba(160,130,70,0.45); transform: rotate(45deg); flex-shrink: 0; }

        .nb-overlay-links { display: flex; flex-direction: column; align-items: center; gap: 0; width: 100%; position: relative; z-index: 2; }
        .nb-overlay-item {
          width: 100%; text-align: center; border-bottom: 1px solid rgba(160,130,70,0.1);
          opacity: 0; transform: translateY(22px);
          transition: opacity .5s var(--nb-ease), transform .5s var(--nb-ease);
        }
        .nb-overlay-item:first-child { border-top: 1px solid rgba(160,130,70,0.1); }
        .nb-overlay.open .nb-overlay-item { opacity: 1; transform: none; }
        .nb-overlay-link {
          display: block; width: 100%;
          font-family: 'Cormorant Garamond', serif; font-weight: 300; font-style: normal;
          font-size: clamp(28px, 8vw, 40px); letter-spacing: 0.01em;
          color: #2C2418; text-decoration: none; padding: 20px 32px;
          transition: color .25s ease, background .25s ease, letter-spacing .3s var(--nb-ease);
        }
        .nb-overlay-link:hover { color: #A07832; background: rgba(160,130,70,0.04); letter-spacing: 0.04em; }

        /* mobile contact CTAs */
        .nb-overlay-cta {
          display: flex; gap: 10px; margin-top: 40px; position: relative; z-index: 2;
          opacity: 0; transform: translateY(22px);
          transition: opacity .5s var(--nb-ease) .3s, transform .5s var(--nb-ease) .3s;
        }
        .nb-overlay.open .nb-overlay-cta { opacity: 1; transform: none; }
        .nb-ov-btn {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'Jost', sans-serif; font-size: 10px; font-weight: 600;
          letter-spacing: 0.18em; text-transform: uppercase; text-decoration: none;
          padding: 14px 22px; border-radius: 40px; transition: transform .25s var(--nb-ease), box-shadow .3s;
        }
        .nb-ov-btn svg { width: 15px; height: 15px; }
        .nb-ov-call { background: #2C2418; color: #FAF8F3; }
        .nb-ov-wa { background: #1faf54; color: #fff; }
        .nb-ov-btn:active { transform: scale(.96); }

        .nb-overlay-footer {
          margin-top: 36px; position: relative; z-index: 2;
          font-family: 'Jost', sans-serif; font-size: 9px; font-weight: 300;
          letter-spacing: 0.35em; text-transform: uppercase; color: rgba(90,74,53,0.32); text-align: center;
        }

        @media (prefers-reduced-motion: reduce) {
          .nb-header, .nb-overlay-item, .nb-overlay-cta { animation: none !important; transition: opacity .2s; transform: none !important; }
        }
      `}</style>

      {/* ── Navbar ── */}
      <header className={`nb-header ${scrolled ? "scrolled" : ""}`}>
        <div className="nb-inner">
          {/* Left links — desktop */}
          <ul className="nb-desktop nb-links" aria-label="Navigazione sinistra">
            <li><Link href="/approach" className="nb-link">Manifesto</Link></li>
            <li><Link href="/contact" className="nb-link">Contatti</Link></li>
          </ul>

          {/* Center logo — desktop */}
          <Link href="/" className="nb-logo" aria-label="Home">
            <img src="/logotext.png" alt="Gisel Marién" />
          </Link>

          {/* Mobile logo */}
          <Link href="/" className="nb-mobile-logo" aria-label="Home">
            <img src="/logotext.png" alt="Gisel Marién" />
          </Link>

          {/* Right links + CTA — desktop */}
          <ul className="nb-desktop nb-links" aria-label="Navigazione destra">
            <li>
              <Link href="https://www.instagram.com/giselmarienstudio/" target="_blank" rel="noopener noreferrer" className="nb-link">Instagram</Link>
            </li>
            <li>
              <Link href="/#form" className="nb-cta">
                Prenota
                <svg viewBox="0 0 14 10" fill="none"><path d="M1 5h12M8 1l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
            </li>
          </ul>

          {/* Hamburger — mobile */}
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Chiudi menu" : "Apri menu"}
            aria-expanded={open}
            className={`nb-hamburger ${open ? "open" : ""}`}
          >
            <span className="nb-bar" />
            <span className="nb-bar" />
            <span className="nb-bar" />
          </button>
        </div>

        <span className="nb-progress" style={{ ["--p" as string]: progress }} />
      </header>

      {/* ── Mobile menu ── */}
      <div className={`nb-overlay ${open ? "open" : "closed"}`} aria-hidden={!open}>
        <div className="nb-overlay-orn">
          <span className="nb-orn-line" />
          <span className="nb-orn-diam" />
          <span className="nb-orn-line" />
        </div>

        <nav className="nb-overlay-links" aria-label="Navigazione mobile">
          {NAV_ITEMS.map(({ href, label }, i) => (
            <div
              key={label}
              className="nb-overlay-item"
              style={{ transitionDelay: open ? `${0.12 + i * 0.07}s` : "0s" }}
            >
              <Link
                href={href}
                className="nb-overlay-link"
                onClick={() => setOpen(false)}
                {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {label}
              </Link>
            </div>
          ))}
        </nav>

        <div className="nb-overlay-cta">
          <a href={`tel:${PHONE_TEL}`} className="nb-ov-btn nb-ov-call" onClick={() => setOpen(false)}>
            <svg viewBox="0 0 24 24" fill="none"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>
            Chiama
          </a>
          <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" className="nb-ov-btn nb-ov-wa" onClick={() => setOpen(false)}>
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.8 4.9-1.3A10 10 0 1 0 12 2Zm5.5 14.2c-.2.6-1.2 1.2-1.7 1.2-.4 0-1 .1-3.4-1s-3.8-3.6-3.9-3.8-1-1.3-1-2.5.6-1.8.8-2 .5-.3.6-.3h.5c.2 0 .4 0 .6.5l.7 1.7c0 .2.1.4 0 .6l-.4.5-.3.3c-.1.2-.3.3-.1.6s.6 1 1.3 1.6c.9.8 1.6 1 1.9 1.2s.4.1.6-.1l.7-.9c.2-.2.4-.2.6-.1l1.7.8c.2.1.4.2.5.3s.1.7-.1 1.3Z" /></svg>
            WhatsApp
          </a>
        </div>

        <p className="nb-overlay-footer">Gisel Marién · Atelier artigianale · Campania</p>
      </div>
    </>
  );
}