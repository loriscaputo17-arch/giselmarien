"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
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
        @import url('https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500&family=Cormorant+Garamond:ital,wght@1,300&display=swap');

        .nb-header {
          position: fixed; top: 0; left: 0; right: 0;
          z-index: 50;
          transition: background .4s ease, box-shadow .4s ease, padding .4s ease;
          padding: 0 24px;
        }
        .nb-header.scrolled {
          background: rgba(250,248,243,0.88);
          backdrop-filter: blur(16px) saturate(1.3);
          -webkit-backdrop-filter: blur(16px) saturate(1.3);
          box-shadow: 0 1px 0 rgba(160,130,70,0.15);
        }
        .nb-header:not(.scrolled) {
          background: transparent;
        }

        .nb-inner {
          max-width: 1280px; margin: 0 auto;
          height: 72px;
          display: flex; align-items: center; justify-content: space-between;
          position: relative;
        }

        /* ── Nav links ── */
        .nb-links {
          display: flex; align-items: center; gap: 36px;
          list-style: none;
        }
        .nb-link {
          font-family: 'Jost', sans-serif;
          font-size: 9px; font-weight: 400;
          letter-spacing: 0.38em; text-transform: uppercase;
          color: #2C2418;
          text-decoration: none;
          position: relative;
          transition: color .25s ease;
        }
        .nb-link::after {
          content: '';
          position: absolute; bottom: -3px; left: 0; right: 0;
          height: 1px;
          background: rgba(160,130,70,0.6);
          transform: scaleX(0); transform-origin: left;
          transition: transform .3s ease;
        }
        .nb-link:hover { color: #A07832; }
        .nb-link:hover::after { transform: scaleX(1); }

        /* ── Center logo ── */
        .nb-logo {
          position: absolute; left: 50%; transform: translateX(-50%);
          display: flex; align-items: center;
          text-decoration: none;
        }
        .nb-logo img {
          width: clamp(120px, 14vw, 180px);
          height: auto;
          display: block;
          transition: opacity .25s ease;
        }
        .nb-logo:hover img { opacity: 0.7; }

        /* Desktop only / mobile only */
        .nb-desktop { display: flex; }
        .nb-mobile-logo { display: none; }
        .nb-hamburger { display: none; }

        @media (max-width: 768px) {
          .nb-desktop { display: none !important; }
          .nb-logo { display: none !important; }
          .nb-mobile-logo {
            display: flex; align-items: center;
            text-decoration: none;
          }
          .nb-mobile-logo img {
            width: clamp(110px, 36vw, 160px);
            height: auto; display: block;
          }
          .nb-hamburger { display: flex; }
        }

        /* ── Hamburger ── */
        .nb-hamburger {
          flex-direction: column; justify-content: center;
          gap: 5px; background: none; border: none;
          cursor: pointer; padding: 4px;
          position: relative; z-index: 60;
        }
        .nb-bar {
          display: block; width: 22px; height: 1px;
          background: #2C2418;
          transition: transform .35s cubic-bezier(.4,0,.2,1), opacity .25s ease;
          transform-origin: center;
        }
        .nb-hamburger.open .nb-bar:nth-child(1) { transform: translateY(6px) rotate(45deg); }
        .nb-hamburger.open .nb-bar:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .nb-hamburger.open .nb-bar:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }

        /* ── Mobile menu overlay ── */
        .nb-overlay {
          position: fixed; inset: 0; z-index: 40;
          background: rgba(250,248,243,0.97);
          backdrop-filter: blur(20px) saturate(1.4);
          -webkit-backdrop-filter: blur(20px) saturate(1.4);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 0;
          transition: opacity .4s ease, visibility .4s ease;
        }
        .nb-overlay.closed { opacity: 0; visibility: hidden; pointer-events: none; }
        .nb-overlay.open   { opacity: 1; visibility: visible; }

        /* ornamental divider */
        .nb-overlay-orn {
          display: flex; align-items: center; gap: 12px;
          margin-bottom: 48px;
        }
        .nb-orn-line { width: 48px; height: 1px; background: rgba(160,130,70,0.3); }
        .nb-orn-diam { width: 5px; height: 5px; background: rgba(160,130,70,0.45); transform: rotate(45deg); flex-shrink: 0; }

        /* mobile menu items */
        .nb-overlay-links {
          display: flex; flex-direction: column;
          align-items: center; gap: 0; width: 100%;
        }
        .nb-overlay-item {
          width: 100%; text-align: center;
          border-bottom: 1px solid rgba(160,130,70,0.1);
        }
        .nb-overlay-item:first-child { border-top: 1px solid rgba(160,130,70,0.1); }
        .nb-overlay-link {
          display: block; width: 100%;
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300; font-style: italic;
          font-size: clamp(26px, 8vw, 38px);
          letter-spacing: 0.02em;
          color: #2C2418;
          text-decoration: none;
          padding: 20px 32px;
          transition: color .25s ease, background .25s ease;
        }
        .nb-overlay-link:hover {
          color: #A07832;
          background: rgba(160,130,70,0.04);
        }

        /* mobile footer */
        .nb-overlay-footer {
          margin-top: 48px;
          font-family: 'Jost', sans-serif;
          font-size: 9px; font-weight: 300;
          letter-spacing: 0.35em; text-transform: uppercase;
          color: rgba(90,74,53,0.3);
          text-align: center;
        }
      `}</style>

      {/* ── Navbar ── */}
      <header className={`nb-header ${scrolled ? "scrolled" : ""}`}>
        <div className="nb-inner">

          {/* Left links — desktop */}
          <nav className="nb-desktop nb-links" aria-label="Left navigation">
            <li><Link href="/approach" className="nb-link">Manifesto</Link></li>
            <li><Link href="/#form"    className="nb-link">Prenota</Link></li>
          </nav>

          {/* Center logo — desktop */}
          <Link href="/" className="nb-logo" aria-label="Home">
            <img src="/logotext.png" alt="Gisel Marién" />
          </Link>

          {/* Mobile logo */}
          <Link href="/" className="nb-mobile-logo" aria-label="Home">
            <img src="/logotext.png" alt="Gisel Marién" />
          </Link>

          {/* Right links — desktop */}
          <nav className="nb-desktop nb-links" aria-label="Right navigation">
            <li><Link href="/contact"                              className="nb-link">Contatti</Link></li>
            <li><Link href="https://www.instagram.com/giselmarienstudio/" target="_blank" rel="noopener noreferrer" className="nb-link">Instagram</Link></li>
          </nav>

          {/* Hamburger — mobile */}
          <button
            onClick={() => setOpen(o => !o)}
            aria-label={open ? "Chiudi menu" : "Apri menu"}
            aria-expanded={open}
            className={`nb-hamburger ${open ? "open" : ""}`}
          >
            <span className="nb-bar" />
            <span className="nb-bar" />
            <span className="nb-bar" />
          </button>

        </div>
      </header>

      {/* ── Mobile menu ── */}
      <div className={`nb-overlay ${open ? "open" : "closed"}`} aria-hidden={!open}>

        <div className="nb-overlay-orn">
          <span className="nb-orn-line" />
          <span className="nb-orn-diam" />
          <span className="nb-orn-line" />
        </div>

        <nav className="nb-overlay-links" aria-label="Mobile navigation">
          {[
            { href: "/#form",    label: "Prenota" },
            { href: "/approach", label: "Manifesto" },
            { href: "/contact",  label: "Contatti" },
            { href: "https://www.instagram.com/giselmarienstudio/", label: "Instagram" },
          ].map(({ href, label }) => (
            <div key={label} className="nb-overlay-item">
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

        <p className="nb-overlay-footer">
          Gisel Marién · Atelier artigianale · Campania
        </p>

      </div>
    </>
  );
}