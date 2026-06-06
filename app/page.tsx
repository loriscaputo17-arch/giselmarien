"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Warmform from "@/app/components/Warmform";
import ContactForm from "@/app/components/ContactForm";

/* ───────────────────────────────────────────────
   ⚠️  SOSTITUISCI QUESTI CONTATTI CON I TUOI REALI
─────────────────────────────────────────────── */
const PHONE_TEL = "+393331234567"; // formato per tel:

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduce(reduceMotion);

    /* ── Reveal allo scroll ── */
    const revealEls = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
    );
    if (reduceMotion) revealEls.forEach((el) => el.classList.add("in"));
    else revealEls.forEach((el) => io.observe(el));

    /* ── Count-up numeri ── */
    const counters = Array.from(document.querySelectorAll<HTMLElement>("[data-count]"));
    const cio = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          const target = Number(el.dataset.count || "0");
          const dur = 1500;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = String(Math.round(eased * target));
            if (p < 1) requestAnimationFrame(tick);
          };
          if (reduceMotion) el.textContent = String(target);
          else requestAnimationFrame(tick);
          cio.unobserve(el);
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach((el) => cio.observe(el));

    const cleanups: Array<() => void> = [];

    /* ── Tilt 3D + glare che segue il cursore ── */
    if (finePointer && !reduceMotion) {
      const tiltEls = Array.from(document.querySelectorAll<HTMLElement>("[data-tilt]"));
      tiltEls.forEach((el) => {
        const strength = Number(el.dataset.tilt) || 12;
        const move = (ev: MouseEvent) => {
          const r = el.getBoundingClientRect();
          const px = (ev.clientX - r.left) / r.width;
          const py = (ev.clientY - r.top) / r.height;
          el.style.setProperty("--rx", `${((0.5 - py) * strength).toFixed(2)}deg`);
          el.style.setProperty("--ry", `${((px - 0.5) * strength).toFixed(2)}deg`);
          el.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
          el.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
          el.classList.add("tilting");
        };
        const leave = () => {
          el.classList.remove("tilting");
          el.style.setProperty("--rx", "0deg");
          el.style.setProperty("--ry", "0deg");
        };
        el.addEventListener("mousemove", move);
        el.addEventListener("mouseleave", leave);
        cleanups.push(() => {
          el.removeEventListener("mousemove", move);
          el.removeEventListener("mouseleave", leave);
        });
      });

      /* ── Parallax mouse sull'hero (multi-livello) ── */
      const hero = heroRef.current;
      if (hero) {
        const onMouse = (ev: MouseEvent) => {
          const w = window.innerWidth;
          const h = window.innerHeight;
          const x = (ev.clientX / w - 0.5);
          const y = (ev.clientY / h - 0.5);
          hero.style.setProperty("--hx", x.toFixed(3));
          hero.style.setProperty("--hy", y.toFixed(3));
        };
        hero.addEventListener("mousemove", onMouse);
        cleanups.push(() => hero.removeEventListener("mousemove", onMouse));
      }
    }

    /* ── Parallax scroll (hero bg + elementi [data-parallax]) ── */
    const parallaxEls = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (heroBgRef.current && !reduceMotion) {
          heroBgRef.current.style.transform = `translate3d(0, ${y * 0.22}px, 0) scale(1.12)`;
        }
        if (!reduceMotion) {
          const vh = window.innerHeight;
          parallaxEls.forEach((el) => {
            const speed = Number(el.dataset.parallax) || 0.12;
            const rect = el.getBoundingClientRect();
            const offset = (rect.top + rect.height / 2 - vh / 2) * -speed;
            el.style.setProperty("--py", `${offset.toFixed(1)}px`);
          });
        }
        raf = 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    cleanups.push(() => window.removeEventListener("scroll", onScroll));

    return () => {
      io.disconnect();
      cio.disconnect();
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Jost:wght@300;400;500;600&display=swap');

        :root {
          --ink:      #2C2418;
          --ink-mid:  #5A4A35;
          --ink-soft: rgba(90,74,53,0.5);
          --gold:     #A07832;
          --gold-br:  #C89A4A;
          --gold-lt:  rgba(160,130,70,0.35);
          --sand:     #FAF8F3;
          --sand-2:   #F2EDE2;
          --dark:     #1E1A12;
          --dark-2:   #2C2418;
          --cream:    #E4E2DD;
          --ease:     cubic-bezier(.16,1,.3,1);
        }

        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; -webkit-text-size-adjust: 100%; }
        body { font-family: 'Jost', sans-serif; background: var(--sand); color: var(--ink); margin: 0; overflow-x: hidden; }

        /* ── Reveal ── */
        [data-reveal] { opacity: 0; transform: translateY(34px); transition: opacity 1s var(--ease), transform 1s var(--ease); will-change: opacity, transform; }
        [data-reveal].in { opacity: 1; transform: none; }
        @media (prefers-reduced-motion: reduce) {
          [data-reveal] { opacity: 1 !important; transform: none !important; transition: none; }
        }

        /* ── Ornaments ── */
        .orn-row { display: flex; align-items: center; justify-content: center; gap: 12px; }
        .orn-line { flex: 1; max-width: 60px; height: 1px; background: var(--gold-lt); }
        .orn-diamond { width: 5px; height: 5px; background: rgba(160,130,70,0.5); transform: rotate(45deg); flex-shrink: 0; }
        .eyebrow { font-family: 'Jost', sans-serif; font-size: 9px; font-weight: 500; letter-spacing: 0.4em; text-transform: uppercase; color: var(--gold); display: block; }

        /* ── floating orbs (depth) ── */
        .orb { position: absolute; border-radius: 50%; pointer-events: none; filter: blur(40px); }
        @keyframes drift1 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(28px,-34px); } }
        @keyframes drift2 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-30px,26px); } }
        @keyframes floatY { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }

        /* ── HERO ── */
        .hero { min-height: 100svh; position: relative; display: flex; align-items: center; justify-content: center; overflow: hidden; perspective: 1400px; --hx: 0; --hy: 0; }
        .hero-bg { position: absolute; inset: -10%; background-image: url('/bg4.jpg'); background-size: cover; background-position: center; will-change: transform; z-index: 0; }
        .hero-bg-tilt { position: absolute; inset: -10%; z-index: 0; transition: transform .5s var(--ease); transform: translate3d(calc(var(--hx) * -22px), calc(var(--hy) * -22px), 0); }
        .hero-overlay { position: absolute; inset: 0; z-index: 2; background:
            radial-gradient(ellipse 90% 70% at 50% 40%, rgba(250,248,243,0.58) 0%, rgba(250,248,243,0.8) 60%, rgba(250,248,243,0.92) 100%);
          backdrop-filter: blur(5px) saturate(1.15); -webkit-backdrop-filter: blur(5px) saturate(1.15); }
        .hero-orb-a { width: 460px; height: 460px; top: -120px; left: -80px; background: radial-gradient(circle, rgba(200,154,74,0.28), transparent 70%); z-index: 1; animation: drift1 14s ease-in-out infinite; }
        .hero-orb-b { width: 380px; height: 380px; bottom: -120px; right: -60px; background: radial-gradient(circle, rgba(160,130,70,0.22), transparent 70%); z-index: 1; animation: drift2 17s ease-in-out infinite; }
        .hero-grain { position: absolute; inset: 0; z-index: 3; pointer-events: none; opacity: .5;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E"); }
        .hero-content { position: relative; z-index: 10; max-width: 720px; margin: 0 auto; padding: 130px 28px 110px; text-align: center; display: flex; flex-direction: column; align-items: center; transform-style: preserve-3d; transform: translate3d(calc(var(--hx) * 14px), calc(var(--hy) * 14px), 0); transition: transform .5s var(--ease); }
        .hero-eyebrow { margin-bottom: 26px; animation: floatIn 1s var(--ease) both; transform: translateZ(40px); }
        .hero-orn { margin-bottom: 30px; animation: floatIn 1s var(--ease) .1s both; }
        .hero-h1 { font-family: 'Cormorant Garamond', serif; font-weight: 400; font-size: clamp(46px, 9vw, 88px); line-height: 1.02; letter-spacing: -0.01em; color: var(--ink); margin: 0 0 22px; transform: translateZ(60px); }
        .hero-h1 .l1 { display: block; animation: floatIn 1s var(--ease) .18s both; }
        .hero-h1 .l2 { display: block; color: var(--gold); font-style: italic; font-weight: 400; animation: floatIn 1s var(--ease) .3s both; }
        .hero-sub { font-family: 'Jost', sans-serif; font-weight: 300; font-size: clamp(15px, 2.4vw, 18px); line-height: 1.7; color: var(--ink-mid); max-width: 480px; margin: 0 0 38px; animation: floatIn 1s var(--ease) .42s both; transform: translateZ(30px); }
        .hero-pills { display: flex; flex-wrap: wrap; justify-content: center; gap: 7px; margin-bottom: 42px; animation: floatIn 1s var(--ease) .54s both; transform: translateZ(20px); }
        .hero-pill { font-family: 'Jost', sans-serif; font-size: 9px; font-weight: 400; letter-spacing: 0.2em; text-transform: uppercase; color: var(--ink-mid); border: 1px solid var(--gold-lt); padding: 6px 14px; background: rgba(255,255,255,0.45); border-radius: 40px; transition: background .25s, border-color .25s, transform .25s var(--ease), color .25s; }
        .hero-pill:hover { background: #fff; border-color: var(--gold); color: var(--gold); transform: translateY(-2px); }
        .hero-ctas { display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; margin-bottom: 26px; animation: floatIn 1s var(--ease) .66s both; transform: translateZ(50px); }
        .btn-primary { display: inline-flex; align-items: center; gap: 12px; font-family: 'Jost', sans-serif; font-size: 10px; font-weight: 600; letter-spacing: 0.3em; text-transform: uppercase; color: var(--sand); background: var(--ink); padding: 17px 36px; text-decoration: none; position: relative; overflow: hidden; border: none; cursor: pointer; border-radius: 2px; transition: background .3s, transform .35s var(--ease), box-shadow .35s; }
        .btn-primary::before { content: ''; position: absolute; inset: 0; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.16), transparent); transform: translateX(-120%); transition: transform .7s var(--ease); }
        .btn-primary:hover::before { transform: translateX(120%); }
        .btn-primary:hover { background: #3D3220; transform: translateY(-3px); box-shadow: 0 18px 40px rgba(44,36,24,0.22); }
        .btn-outline { display: inline-flex; align-items: center; gap: 10px; font-family: 'Jost', sans-serif; font-size: 10px; font-weight: 600; letter-spacing: 0.3em; text-transform: uppercase; color: var(--ink); background: transparent; padding: 17px 32px; text-decoration: none; border: 1px solid var(--gold-lt); border-radius: 2px; transition: border-color .3s, color .3s, transform .35s var(--ease), background .3s; }
        .btn-outline:hover { border-color: var(--gold); color: var(--gold); transform: translateY(-3px); background: rgba(255,255,255,0.5); }
        .hero-footer { font-family: 'Jost', sans-serif; font-size: 9px; font-weight: 400; letter-spacing: 0.3em; text-transform: uppercase; color: var(--ink-soft); animation: floatIn 1s var(--ease) .78s both; }
        .scroll-cue { position: absolute; bottom: 26px; left: 50%; transform: translateX(-50%); z-index: 10; width: 1px; height: 44px; background: linear-gradient(var(--gold), transparent); animation: floatIn 1s var(--ease) 1s both; }
        .scroll-cue::after { content: ''; position: absolute; top: 0; left: 0; width: 1px; height: 14px; background: var(--gold); animation: cue 1.8s var(--ease) infinite; }
        @keyframes cue { 0% { transform: translateY(0); opacity: 1; } 70% { transform: translateY(30px); opacity: 0; } 100% { opacity: 0; } }
        @keyframes floatIn { from { opacity: 0; transform: translateY(26px); } to { opacity: 1; transform: none; } }

        /* ── NUMBERS ── */
        .numbers { background: var(--dark); padding: 76px 28px; position: relative; overflow: hidden; }
        .numbers .orb { width: 500px; height: 500px; top: -200px; left: 50%; transform: translateX(-50%); background: radial-gradient(circle, rgba(200,154,74,0.12), transparent 70%); }
        .numbers-inner { max-width: 980px; margin: 0 auto; display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; position: relative; z-index: 2; perspective: 800px; }
        .numbers-item { text-align: center; padding: 22px 16px; border-right: 1px solid rgba(255,255,255,0.07); transition: transform .4s var(--ease); }
        .numbers-item:hover { transform: translateZ(24px) scale(1.04); }
        .numbers-item:last-child { border-right: none; }
        .numbers-val { font-family: 'Cormorant Garamond', serif; font-weight: 400; font-size: clamp(40px, 6.5vw, 64px); line-height: 1; color: var(--cream); letter-spacing: -0.02em; display: flex; align-items: baseline; justify-content: center; gap: 1px; }
        .numbers-val sup { color: var(--gold-br); font-size: 0.5em; font-weight: 400; }
        .numbers-lbl { font-family: 'Jost', sans-serif; font-size: 9px; font-weight: 300; letter-spacing: 0.26em; text-transform: uppercase; color: rgba(228,226,221,0.5); margin-top: 12px; display: block; }
        @media (max-width: 640px) {
          .numbers-inner { grid-template-columns: 1fr 1fr; }
          .numbers-item { border-bottom: 1px solid rgba(255,255,255,0.07); }
          .numbers-item:nth-child(even) { border-right: none; }
          .numbers-item:nth-child(3), .numbers-item:nth-child(4) { border-bottom: none; }
        }

        /* ── GALLERY 3D ── */
        .gallery { background: var(--sand); padding: 64px 28px; }
        .gallery-track { max-width: 1120px; margin: 0 auto; display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; perspective: 1400px; }
        .gallery-cell { perspective: 1000px; }
        .gallery-img { width: 100%; aspect-ratio: 1/1; object-fit: cover; display: block; filter: brightness(0.94) saturate(0.9); transition: transform .6s var(--ease), filter .4s ease, box-shadow .5s var(--ease); border-radius: 3px; transform-style: preserve-3d; }
        .gallery-img:hover { transform: translateZ(50px) rotateX(6deg) rotateY(-6deg) scale(1.05); filter: brightness(1.03) saturate(1.06); box-shadow: 0 34px 60px rgba(44,36,24,0.28); }
        @media (max-width: 768px) { .gallery-track { grid-template-columns: repeat(2, 1fr); } }

        /* ── STATEMENT ── */
        .statement { background: var(--dark); padding: 130px 28px; position: relative; overflow: hidden; }
        .statement .orb-a { width: 420px; height: 420px; bottom: -160px; left: -80px; background: radial-gradient(circle, rgba(200,154,74,0.16), transparent 70%); animation: drift1 16s ease-in-out infinite; }
        .statement .orb-b { width: 320px; height: 320px; top: -120px; right: -60px; background: radial-gradient(circle, rgba(160,130,70,0.12), transparent 70%); animation: drift2 19s ease-in-out infinite; }
        .statement-inner { max-width: 820px; margin: 0 auto; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 30px; position: relative; z-index: 2; }
        .statement-h2 { font-family: 'Cormorant Garamond', serif; font-weight: 400; font-size: clamp(34px, 6vw, 64px); line-height: 1.16; color: var(--cream); margin: 0; }
        .statement-h2 em { font-style: italic; color: var(--gold-br); }

        /* ── WHAT WE DO ── */
        .what { background: var(--sand); padding: 130px 28px; }
        .what-inner { max-width: 1200px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; gap: 72px; }
        .what-header { text-align: center; display: flex; flex-direction: column; align-items: center; gap: 18px; max-width: 620px; }
        .what-h2 { font-family: 'Cormorant Garamond', serif; font-weight: 400; font-size: clamp(32px, 5vw, 56px); line-height: 1.12; color: var(--ink); margin: 0; }
        .what-h2 em { font-style: italic; color: var(--gold); }
        .what-sub { font-family: 'Jost', sans-serif; font-weight: 300; font-size: clamp(15px, 2.3vw, 17px); line-height: 1.75; color: var(--ink-mid); margin: 0; }
        .what-grid { width: 100%; display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; perspective: 1200px; }
        .what-card { background: var(--sand-2); padding: 44px 34px; display: flex; flex-direction: column; gap: 16px; position: relative; border-radius: 6px;
          transform: perspective(900px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg));
          transform-style: preserve-3d; overflow: hidden;
          transition: transform .5s var(--ease), background .4s var(--ease), box-shadow .45s var(--ease); }
        .what-card.tilting { transition: transform .08s linear, box-shadow .3s; }
        .what-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, var(--gold), transparent); opacity: 0; transition: opacity .35s; z-index: 3; }
        .what-card:hover { background: #fff; box-shadow: 0 40px 70px rgba(44,36,24,0.16); }
        .what-card:hover::before { opacity: 1; }
        .glare { position: absolute; inset: 0; border-radius: inherit; pointer-events: none; opacity: 0; transition: opacity .3s; z-index: 2;
          background: radial-gradient(circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.5), transparent 45%); }
        .tilting .glare { opacity: .7; }
        .what-card-num { font-family: 'Cormorant Garamond', serif; font-weight: 400; font-style: italic; font-size: 46px; color: rgba(160,130,70,0.3); line-height: 1; transform: translateZ(45px); }
        .what-card-title { font-family: 'Jost', sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 0.22em; text-transform: uppercase; color: var(--ink); transform: translateZ(30px); }
        .what-card-body { font-family: 'Jost', sans-serif; font-weight: 300; font-size: clamp(14px, 2vw, 15px); line-height: 1.8; color: var(--ink-mid); transform: translateZ(18px); }
        @media (max-width: 768px) { .what-grid { grid-template-columns: 1fr; } }

        /* ── FULL BLEED parallax ── */
        .fullbleed { width: 100%; aspect-ratio: 21/9; overflow: hidden; position: relative; }
        .fullbleed img { width: 100%; height: 118%; object-fit: cover; filter: brightness(0.88) saturate(0.9); transform: translateY(var(--py,0)); transition: filter .5s ease; will-change: transform; }
        .fullbleed:hover img { filter: brightness(0.96) saturate(1); }
        .fullbleed-caption { position: absolute; bottom: 22px; right: 28px; font-family: 'Cormorant Garamond', serif; font-weight: 400; font-style: italic; font-size: 14px; letter-spacing: 0.1em; color: rgba(255,255,255,0.7); z-index: 2; }
        @media (max-width: 768px) { .fullbleed { aspect-ratio: 4/3; } }

        /* ── ABOUT ── */
        .about { background: var(--sand-2); padding: 130px 28px; }
        .about-inner { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
        .about-text { display: flex; flex-direction: column; gap: 22px; }
        .about-h2 { font-family: 'Cormorant Garamond', serif; font-weight: 400; font-size: clamp(32px, 5vw, 52px); line-height: 1.08; color: var(--ink); margin: 0; }
        .about-h2 em { font-style: italic; color: var(--gold); }
        .about-body { font-family: 'Jost', sans-serif; font-weight: 300; font-size: clamp(15px, 2.3vw, 17px); line-height: 1.8; color: var(--ink-mid); margin: 0; }
        .about-services { display: flex; flex-direction: column; gap: 0; border-top: 1px solid rgba(160,130,70,0.18); margin-top: 6px; }
        .about-service-row { display: flex; align-items: center; justify-content: space-between; padding: 15px 0; border-bottom: 1px solid rgba(160,130,70,0.1); font-family: 'Jost', sans-serif; font-size: 11px; font-weight: 400; letter-spacing: 0.16em; text-transform: uppercase; color: var(--ink-mid); transition: padding-left .3s var(--ease), color .3s; }
        .about-service-row:hover { padding-left: 8px; color: var(--ink); }
        .about-service-row span:last-child { color: var(--gold); font-size: 9px; letter-spacing: 0.28em; }
        .about-link { font-family: 'Jost', sans-serif; font-size: 9px; font-weight: 600; letter-spacing: 0.3em; text-transform: uppercase; color: var(--ink); text-decoration: none; border-bottom: 1px solid rgba(44,36,24,0.3); padding-bottom: 4px; transition: border-color .25s, color .25s; align-self: flex-start; margin-top: 6px; }
        .about-link:hover { color: var(--gold); border-color: var(--gold); }
        .about-images { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; perspective: 1100px; transform-style: preserve-3d; }
        .about-img { width: 100%; aspect-ratio: 3/4; object-fit: cover; filter: brightness(0.97) saturate(0.92); border-radius: 4px; transition: filter .4s ease, transform .55s var(--ease), box-shadow .5s var(--ease); }
        .about-img:hover { filter: brightness(1) saturate(1.05); transform: translateZ(40px) rotateY(-7deg) scale(1.03); box-shadow: 0 30px 55px rgba(44,36,24,0.2); z-index: 2; }
        .about-img:nth-child(2) { margin-top: 32px; }
        .about-img:nth-child(4) { margin-top: -32px; }
        @media (max-width: 900px) { .about-inner { grid-template-columns: 1fr; gap: 48px; } .about-images { order: -1; } .about-img:nth-child(2) { margin-top: 16px; } .about-img:nth-child(4) { margin-top: -16px; } }

        /* ── PROCESS ── */
        .process { background: var(--sand); padding: 130px 28px; }
        .process-inner { max-width: 1100px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; gap: 68px; }
        .process-header { text-align: center; display: flex; flex-direction: column; align-items: center; gap: 18px; }
        .process-h2 { font-family: 'Cormorant Garamond', serif; font-weight: 400; font-size: clamp(30px, 5vw, 50px); line-height: 1.18; color: var(--ink); margin: 0; }
        .process-h2 em { font-style: italic; color: var(--gold); }
        .process-steps { width: 100%; display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; perspective: 1000px; }
        .process-step { padding: 32px 28px; border-right: 1px solid rgba(160,130,70,0.14); display: flex; flex-direction: column; gap: 14px; position: relative; transition: background .35s, transform .4s var(--ease); transform-style: preserve-3d; }
        .process-step:last-child { border-right: none; }
        .process-step::after { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, var(--gold), transparent); transform: scaleX(0); transform-origin: left; transition: transform .45s var(--ease); }
        .process-step:hover::after { transform: scaleX(1); }
        .process-step:hover { background: var(--sand-2); transform: translateZ(20px); }
        .process-n { font-family: 'Cormorant Garamond', serif; font-weight: 400; font-style: italic; font-size: 50px; color: rgba(160,130,70,0.2); line-height: 1; }
        .process-title { font-family: 'Jost', sans-serif; font-size: 10px; font-weight: 600; letter-spacing: 0.24em; text-transform: uppercase; color: var(--ink); }
        .process-body { font-family: 'Jost', sans-serif; font-weight: 300; font-size: clamp(13px, 2vw, 15px); line-height: 1.75; color: var(--ink-mid); }
        @media (max-width: 768px) { .process-steps { grid-template-columns: 1fr 1fr; } .process-step { border-bottom: 1px solid rgba(160,130,70,0.1); } }
        @media (max-width: 480px) { .process-steps { grid-template-columns: 1fr; } .process-step { border-right: none; } }

        /* ── QUOTE ── */
        .quote-section { background: var(--sand-2); padding: 110px 28px; }
        .quote-inner { max-width: 740px; margin: 0 auto; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 22px; }
        .quote-mark { font-family: 'Cormorant Garamond', serif; font-size: 90px; line-height: 0.5; color: rgba(160,130,70,0.22); font-style: italic; animation: floatY 5s ease-in-out infinite; }
        .quote-text { font-family: 'Cormorant Garamond', serif; font-weight: 400; font-style: italic; font-size: clamp(22px, 4vw, 32px); line-height: 1.5; color: var(--ink); margin: 0; }
        .quote-author { font-family: 'Jost', sans-serif; font-size: 9px; font-weight: 400; letter-spacing: 0.34em; text-transform: uppercase; color: var(--ink-soft); }

        /* ── METHOD ── */
        .method { background: var(--dark-2); padding: 130px 28px; position: relative; overflow: hidden; }
        .method .orb-a { width: 380px; height: 380px; top: 10%; left: -120px; background: radial-gradient(circle, rgba(200,154,74,0.1), transparent 70%); animation: drift1 18s ease-in-out infinite; }
        .method .orb-b { width: 300px; height: 300px; bottom: 5%; right: -100px; background: radial-gradient(circle, rgba(160,130,70,0.08), transparent 70%); animation: drift2 21s ease-in-out infinite; }
        .method-inner { max-width: 1000px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; position: relative; z-index: 2; }
        .method-header { text-align: center; margin-bottom: 72px; display: flex; flex-direction: column; align-items: center; gap: 18px; }
        .method-h2 { font-family: 'Cormorant Garamond', serif; font-weight: 400; font-size: clamp(30px, 5vw, 48px); line-height: 1.18; color: var(--cream); margin: 0; }
        .method-h2 em { font-style: italic; color: var(--gold-br); }
        .method-steps { width: 100%; display: flex; flex-direction: column; gap: 0; }
        .method-step { display: grid; grid-template-columns: 48px 1fr; gap: 32px; align-items: flex-start; padding: 30px 8px; border-bottom: 1px solid rgba(255,255,255,0.06); transition: padding-left .35s var(--ease), background .35s; }
        .method-step:first-child { border-top: 1px solid rgba(255,255,255,0.06); }
        .method-step:hover { padding-left: 20px; background: rgba(255,255,255,0.02); }
        .method-step-num { font-family: 'Cormorant Garamond', serif; font-weight: 400; font-style: italic; font-size: 34px; color: rgba(200,154,74,0.45); line-height: 1; padding-top: 2px; }
        .method-step-body { display: flex; flex-direction: column; gap: 7px; }
        .method-step-title { font-family: 'Jost', sans-serif; font-size: 11px; font-weight: 500; letter-spacing: 0.26em; text-transform: uppercase; color: var(--cream); }
        .method-step-desc { font-family: 'Jost', sans-serif; font-weight: 300; font-size: clamp(14px, 2.3vw, 16px); line-height: 1.65; color: rgba(220,210,195,0.6); }
        @media (max-width: 600px) { .method-step { grid-template-columns: 36px 1fr; gap: 20px; } }

        /* ── INTERNATIONAL ── */
        .intl { background: var(--dark); padding: 130px 28px; position: relative; overflow: hidden; }
        .intl .orb { width: 460px; height: 460px; top: 50%; left: 50%; transform: translate(-50%,-50%); background: radial-gradient(circle, rgba(200,154,74,0.09), transparent 70%); }
        .intl-inner { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; position: relative; z-index: 2; }
        .intl-text { display: flex; flex-direction: column; gap: 26px; }
        .intl-h2 { font-family: 'Cormorant Garamond', serif; font-weight: 400; font-size: clamp(32px, 5vw, 54px); line-height: 1.08; color: var(--cream); margin: 0; }
        .intl-h2 em { font-style: italic; color: var(--gold-br); }
        .intl-body { font-family: 'Jost', sans-serif; font-weight: 300; font-size: clamp(15px, 2.3vw, 17px); line-height: 1.85; color: rgba(220,210,195,0.62); margin: 0; }
        .intl-cities { display: flex; flex-direction: column; gap: 0; border-top: 1px solid rgba(160,130,70,0.18); }
        .intl-city { display: flex; align-items: center; justify-content: space-between; padding: 14px 0; border-bottom: 1px solid rgba(160,130,70,0.08); font-family: 'Jost', sans-serif; font-size: 11px; font-weight: 300; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(228,226,221,0.55); transition: color .25s, padding-left .3s var(--ease); }
        .intl-city:hover { color: rgba(228,226,221,0.95); padding-left: 8px; }
        .intl-city-country { font-size: 9px; letter-spacing: 0.24em; color: rgba(200,154,74,0.5); }
        .intl-image { position: relative; perspective: 1000px; }
        .intl-img { width: 100%; aspect-ratio: 3/4; object-fit: cover; filter: brightness(0.76) saturate(0.74); border-radius: 4px; transition: transform .55s var(--ease), filter .5s; }
        .intl-image:hover .intl-img { transform: rotateY(-6deg) rotateX(3deg) scale(1.02); filter: brightness(0.85) saturate(0.85); }
        .intl-image-caption { position: absolute; bottom: 0; left: 0; right: 0; padding: 48px 24px 24px; background: linear-gradient(transparent, rgba(10,8,4,0.7)); font-family: 'Cormorant Garamond', serif; font-weight: 400; font-style: italic; font-size: 16px; color: rgba(228,226,221,0.7); letter-spacing: 0.04em; border-radius: 0 0 4px 4px; }
        @media (max-width: 900px) { .intl-inner { grid-template-columns: 1fr; gap: 56px; } }

        /* ── TESTIMONIALS ── */
        .testi { background: var(--sand-2); padding: 130px 28px; }
        .testi-inner { max-width: 1100px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; gap: 56px; }
        .testi-header { text-align: center; display: flex; flex-direction: column; align-items: center; gap: 16px; }
        .testi-h2 { font-family: 'Cormorant Garamond', serif; font-weight: 400; font-size: clamp(28px, 4.5vw, 46px); color: var(--ink); margin: 0; }
        .testi-h2 em { font-style: italic; color: var(--gold); }
        .testi-grid { width: 100%; display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; perspective: 1300px; }
        .testi-card { background: var(--sand); padding: 38px 30px; display: flex; flex-direction: column; gap: 18px; border-radius: 6px; border-top: 2px solid transparent; position: relative; overflow: hidden;
          transform: perspective(900px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg)); transform-style: preserve-3d;
          transition: transform .5s var(--ease), border-color .35s, background .3s, box-shadow .45s var(--ease); }
        .testi-card.tilting { transition: transform .08s linear, box-shadow .3s; }
        .testi-card:hover { border-top-color: var(--gold); background: #fff; box-shadow: 0 40px 70px rgba(44,36,24,0.16); }
        .testi-stars { display: flex; gap: 3px; transform: translateZ(35px); }
        .testi-star { color: var(--gold); font-size: 12px; }
        .testi-text { font-family: 'Cormorant Garamond', serif; font-weight: 400; font-style: italic; font-size: clamp(16px, 2vw, 18px); line-height: 1.7; color: var(--ink-mid); flex: 1; transform: translateZ(22px); }
        .testi-author { display: flex; flex-direction: column; gap: 3px; margin-top: auto; padding-top: 16px; border-top: 1px solid rgba(160,130,70,0.12); transform: translateZ(14px); }
        .testi-name { font-family: 'Jost', sans-serif; font-size: 10px; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase; color: var(--ink); }
        .testi-event { font-family: 'Jost', sans-serif; font-size: 9px; font-weight: 300; letter-spacing: 0.14em; color: var(--gold); }
        @media (max-width: 768px) { .testi-grid { grid-template-columns: 1fr; } }

        /* ── CLOSING ── */
        .closing { background: var(--ink); padding: 140px 28px; text-align: center; position: relative; overflow: hidden; }
        .closing::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(200,154,74,0.18) 0%, transparent 65%); pointer-events: none; }
        .closing .orb-a { width: 360px; height: 360px; bottom: -140px; left: 8%; background: radial-gradient(circle, rgba(200,154,74,0.14), transparent 70%); animation: drift1 15s ease-in-out infinite; }
        .closing .orb-b { width: 300px; height: 300px; top: -120px; right: 8%; background: radial-gradient(circle, rgba(160,130,70,0.1), transparent 70%); animation: drift2 18s ease-in-out infinite; }
        .closing-inner { position: relative; z-index: 2; max-width: 620px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; gap: 22px; }
        .closing-h2 { font-family: 'Cormorant Garamond', serif; font-weight: 400; font-size: clamp(34px, 6vw, 58px); line-height: 1.12; color: var(--cream); margin: 0; }
        .closing-h2 em { font-style: italic; color: var(--gold-br); }
        .closing-body { font-family: 'Jost', sans-serif; font-weight: 300; font-size: clamp(15px, 2.3vw, 17px); line-height: 1.75; color: rgba(228,226,221,0.66); max-width: 440px; margin: 0; }
        .closing-ctas { display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; margin-top: 12px; }
        .btn-gold { display: inline-flex; align-items: center; gap: 12px; font-family: 'Jost', sans-serif; font-size: 10px; font-weight: 600; letter-spacing: 0.3em; text-transform: uppercase; color: var(--ink); background: var(--gold-br); padding: 17px 38px; text-decoration: none; border-radius: 2px; position: relative; overflow: hidden; transition: transform .35s var(--ease), box-shadow .35s, background .3s; }
        .btn-gold:hover { transform: translateY(-3px); box-shadow: 0 18px 40px rgba(200,154,74,0.3); background: #d6a955; }
        .btn-ghost-light { display: inline-flex; align-items: center; gap: 10px; font-family: 'Jost', sans-serif; font-size: 10px; font-weight: 600; letter-spacing: 0.3em; text-transform: uppercase; color: var(--cream); background: transparent; padding: 17px 32px; text-decoration: none; border: 1px solid rgba(228,226,221,0.25); border-radius: 2px; transition: border-color .3s, transform .35s var(--ease), background .3s; }
        .btn-ghost-light:hover { border-color: var(--cream); transform: translateY(-3px); background: rgba(255,255,255,0.04); }

        @media (max-width: 600px) { .hero-content { padding: 120px 22px 90px; } }
      `}</style>

      <main>
        {/* ── HERO ── */}
        <section className="hero" ref={heroRef}>
          <div className="hero-bg-tilt">
            <div className="hero-bg" ref={heroBgRef} />
          </div>
          <span className="orb hero-orb-a" />
          <span className="orb hero-orb-b" />
          <div className="hero-overlay" />
          <div className="hero-grain" />
          <div className="hero-content">
            <span className="eyebrow hero-eyebrow">Atelier di produzione artistica</span>
            <div className="orn-row hero-orn" style={{ width: "100%", maxWidth: 200 }}>
              <span className="orn-line" /><span className="orn-diamond" /><span className="orn-line" />
            </div>
            <h1 className="hero-h1">
              <span className="l1">Progettiamo</span>
              <span className="l2">gesti che restano</span>
            </h1>
            <p className="hero-sub">
              Bomboniere, centri tavola e allestimenti su misura per ogni evento —
              dalla cerimonia al matrimonio, dal compleanno all&apos;occasione speciale.
            </p>
            <div className="hero-pills">
              {["Matrimoni", "Cerimonie", "Comunioni", "Battesimi", "Lauree", "Compleanni", "Hotel & Ristoranti", "Su misura"].map((s) => (
                <span key={s} className="hero-pill">{s}</span>
              ))}
            </div>
            <div className="hero-ctas">
              <Link href="#contactform" className="btn-primary">
                Prenota una consulenza
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M1 5h12M8 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
              <a href={`tel:${PHONE_TEL}`} className="btn-outline">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
                Chiama ora
              </a>
            </div>
            <p className="hero-footer">Italia &amp; Internazionale · Su misura · Solo su appuntamento</p>
          </div>
          <div className="scroll-cue" />
        </section>

        <div id="contactform"><ContactForm /></div>

        {/* ── NUMBERS ── */}
        <section className="numbers">
          <span className="orb" />
          <div className="numbers-inner">
            {[
              { n: 50, suf: "+", lbl: "Progetti esclusivi realizzati" },
              { n: 4, suf: "+", lbl: "Anni di esperienza" },
              { n: 8, suf: "", lbl: "Paesi nel mondo" },
              { n: 100, suf: "%", lbl: "Su misura" },
            ].map(({ n, suf, lbl }) => (
              <div key={lbl} className="numbers-item" data-reveal>
                <div className="numbers-val">
                  <span data-count={n}>0</span>{suf && <sup>{suf}</sup>}
                </div>
                <span className="numbers-lbl">{lbl}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── GALLERY ── */}
        <section className="gallery">
          <div className="gallery-track" data-reveal>
            {["/images/img1.jpeg", "/images/img2.jpeg", "/images/img3.jpeg", "/images/img4.jpeg",
              "/images/img5.jpeg", "/images/img6.jpeg", "/images/img26.jpeg", "/images/img8.jpeg",
              "/images/img9.jpeg", "/images/img12.jpeg", "/images/img16.jpeg", "/images/img21.jpeg",
            ].map((src, i) => (
              <div key={i} className="gallery-cell">
                <img src={src} className="gallery-img" alt="" loading="lazy" />
              </div>
            ))}
          </div>
        </section>

        {/* ── STATEMENT ── */}
        <section className="statement">
          <span className="orb orb-a" />
          <span className="orb orb-b" />
          <div className="statement-inner" data-reveal>
            <div className="orn-row" style={{ width: "100%", maxWidth: 160 }}>
              <span className="orn-line" /><span className="orn-diamond" /><span className="orn-line" />
            </div>
            <h2 className="statement-h2">Non decoriamo eventi.<br /><em>Costruiamo significati.</em></h2>
            <div className="orn-row" style={{ width: "100%", maxWidth: 160 }}>
              <span className="orn-line" style={{ background: "rgba(160,130,70,0.2)" }} />
              <span className="orn-diamond" style={{ background: "rgba(160,130,70,0.3)" }} />
              <span className="orn-line" style={{ background: "rgba(160,130,70,0.2)" }} />
            </div>
          </div>
        </section>

        <div id="form"><Warmform /></div>

        {/* ── WHAT WE DO ── */}
        <section className="what">
          <div className="what-inner">
            <div className="what-header" data-reveal>
              <span className="eyebrow">Cosa realizziamo</span>
              <h2 className="what-h2">Ogni produzione nasce<br /><em>da un&apos;intenzione precisa</em></h2>
              <p className="what-sub">
                Non lavoriamo per catalogo. Ogni bomboniera, ogni centro tavola,
                ogni allestimento è pensato intorno all&apos;evento, alle persone
                e al momento che si vuole celebrare.
              </p>
            </div>
            <div className="what-grid">
              {[
                ["01", "Bomboniere su misura", "Realizziamo bomboniere personalizzate per matrimoni, comunioni, battesimi, lauree e compleanni. Ogni pezzo nasce da un progetto dedicato: materiali, forma, packaging e messaggio scelti insieme a te."],
                ["02", "Centri tavola & allestimenti", "Dalle composizioni floreali ai centri tavola scultorei, dagli archi d'ingresso agli allestimenti tematici: progettiamo gli spazi del tuo evento con gusto contemporaneo e cura artigianale."],
                ["03", "Hospitality & contract", "Collaboriamo con hotel, ristoranti e venue di lusso per oggetti d'accoglienza, decorazioni stagionali e kit personalizzati per gli ospiti. Un servizio continuativo e su misura per ogni struttura."],
              ].map(([num, title, body], i) => (
                <div key={num} className="what-card" data-tilt="13" data-reveal style={{ transitionDelay: `${i * 90}ms` }}>
                  <span className="glare" />
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
          <img src="/bg11.jpg" alt="Atelier Gisel Marién" loading="lazy" data-parallax="0.12" />
          <span className="fullbleed-caption">Atelier Gisel Marién — ogni dettaglio conta</span>
        </div>

        {/* ── ABOUT ── */}
        <section className="about">
          <div className="about-inner">
            <div className="about-text" data-reveal>
              <span className="eyebrow">Chi siamo</span>
              <h2 className="about-h2"><em>Gisel Marién</em><br />Atelier artigianale</h2>
              <p className="about-body">
                Nata in Campania, cresciuta nel mondo della produzione artigianale
                e dell&apos;arte applicata, Gisel Marién è oggi uno studio di riferimento
                per chi cerca qualcosa di più di una semplice decorazione.
              </p>
              <p className="about-body">
                Ogni cerimonia porta con sé un&apos;emozione unica. Noi la traduciamo in oggetti:
                bomboniere pensate, centri tavola che fermano il respiro, allestimenti
                che trasformano uno spazio in un ricordo destinato a durare.
              </p>
              <div className="about-services">
                {[
                  ["Bomboniere personalizzate", "su misura"],
                  ["Centri tavola", "cerimonie"],
                  ["Allestimenti floreali", "eventi"],
                  ["Hotel & Ristoranti", "hospitality"],
                  ["Packaging & Confezioni", "cura del dettaglio"],
                ].map(([label, tag]) => (
                  <div key={label} className="about-service-row">
                    <span>{label}</span><span>{tag}</span>
                  </div>
                ))}
              </div>
              <Link href="/approach" className="about-link">Scopri il nostro approccio →</Link>
            </div>
            <div className="about-images" data-reveal>
              <img src="/bg12.jpg" className="about-img" alt="" loading="lazy" />
              <img src="/bg5.jpg" className="about-img" alt="" loading="lazy" />
              <img src="/bg6.jpg" className="about-img" alt="" loading="lazy" />
              <img src="/bg8.jpg" className="about-img" alt="" loading="lazy" />
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="process">
          <div className="process-inner">
            <div className="process-header" data-reveal>
              <span className="eyebrow">Come lavoriamo</span>
              <h2 className="process-h2">Dal <em>primo incontro</em><br />alla consegna finale</h2>
              <div className="orn-row" style={{ width: "100%", maxWidth: 120 }}>
                <span className="orn-line" /><span className="orn-diamond" /><span className="orn-line" />
              </div>
            </div>
            <div className="process-steps">
              {[
                ["Ascolto", "Partiamo da te: l'evento, il tono, le persone, le aspettative. Nessun template, solo attenzione."],
                ["Progettazione", "Sviluppiamo una proposta su misura con moodboard, materiali e bozzetti. Ogni scelta è motivata."],
                ["Produzione", "Realizziamo ogni pezzo nel nostro atelier con cura artigianale, controllando ogni fase del processo."],
                ["Consegna", "Consegniamo in tutta Italia e all'estero, con packaging dedicato e cura nella presentazione finale."],
              ].map(([title, body], i) => (
                <div key={title} className="process-step" data-reveal style={{ transitionDelay: `${i * 80}ms` }}>
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
          <div className="quote-inner" data-reveal>
            <div className="orn-row" style={{ width: "100%", maxWidth: 120 }}>
              <span className="orn-line" /><span className="orn-diamond" /><span className="orn-line" />
            </div>
            <span className="quote-mark">&ldquo;</span>
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
          <span className="orb orb-a" />
          <span className="orb orb-b" />
          <div className="method-inner">
            <div className="method-header" data-reveal>
              <span className="eyebrow" style={{ color: "rgba(200,154,74,0.7)" }}>Il nostro metodo</span>
              <h2 className="method-h2">Un percorso pensato<br /><em>intorno a te</em></h2>
              <div className="orn-row" style={{ width: "100%", maxWidth: 140 }}>
                <span className="orn-line" style={{ background: "rgba(160,130,70,0.2)" }} />
                <span className="orn-diamond" style={{ background: "rgba(160,130,70,0.25)" }} />
                <span className="orn-line" style={{ background: "rgba(160,130,70,0.2)" }} />
              </div>
            </div>
            <div className="method-steps">
              {[
                ["Sistema modulare", "Ogni progetto nasce da moduli flessibili, adattabili al tipo di evento e al tuo stile personale."],
                ["Infinite varianti", "Dalla soluzione semplice a quella più elaborata: lavoriamo su ogni livello di complessità e budget."],
                ["Tempi su misura", "Che tu abbia sei mesi o sei settimane: costruiamo un percorso che rispetta i tuoi tempi."],
                ["Cura del dettaglio", "Dal packaging alla presentazione finale, ogni elemento è curato come parte di un'unica visione."],
                ["Elementi che restano", "Ciò che creiamo per il tuo evento continua a vivere — come ricordo, come oggetto, come gesto."],
              ].map(([title, desc], i) => (
                <div key={title} className="method-step" data-reveal style={{ transitionDelay: `${i * 70}ms` }}>
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
          <span className="orb" />
          <div className="intl-inner">
            <div className="intl-text" data-reveal>
              <span className="eyebrow" style={{ color: "rgba(200,154,74,0.65)" }}>Presenza internazionale</span>
              <h2 className="intl-h2">Progettiamo per<br /><em>il mondo intero</em></h2>
              <p className="intl-body">
                Nati in Campania, oggi lavoriamo in tutta Italia e seguiamo clienti
                che ci portano ovunque nel mondo. Dalla villa sul lago di Como
                all&apos;appartamento a Londra, dal resort di Bangkok
                alla cerimonia esclusiva a Montecarlo.
              </p>
              <p className="intl-body">
                La distanza non è un limite: gestiamo ogni progetto da remoto
                con videocall, moodboard condivisi e coordinamento logistico dedicato.
                Spediamo in tutto il mondo con packaging su misura e tracciamento completo.
              </p>
              <div className="intl-cities">
                {[
                  ["Italia", "sede principale"],
                  ["Londra", "Regno Unito"],
                  ["New York", "Stati Uniti"],
                  ["Los Angeles", "California"],
                  ["Montecarlo", "Principato di Monaco"],
                  ["Bangkok", "Thailandia"],
                ].map(([city, country]) => (
                  <div key={city} className="intl-city">
                    <span>{city}</span>
                    <span className="intl-city-country">{country}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="intl-image" data-reveal>
              <img src="/bg8.jpg" className="intl-img" alt="" loading="lazy" />
              <div className="intl-image-caption">
                Ogni luogo ha la sua cerimonia — noi la rendiamo unica.
              </div>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="testi">
          <div className="testi-inner">
            <div className="testi-header" data-reveal>
              <span className="eyebrow">Cosa dicono di noi</span>
              <h2 className="testi-h2">Le parole dei<br /><em>nostri clienti</em></h2>
              <div className="orn-row" style={{ width: "100%", maxWidth: 120 }}>
                <span className="orn-line" /><span className="orn-diamond" /><span className="orn-line" />
              </div>
            </div>
            <div className="testi-grid">
              {[
                { text: "Avevo un'idea vaga — un matrimonio intimo, molto personale. Gisel Marién ha capito tutto al primo incontro. Ogni bomboniera era un piccolo capolavoro.", name: "Claudia R.", event: "Matrimonio · Napoli" },
                { text: "Lavoro con loro da tre anni per il nostro hotel. I centri tavola sono parte integrante dell'esperienza degli ospiti. Professionalità e gusto davvero rari.", name: "Marco V.", event: "Hotel · Costiera Amalfitana" },
                { text: "Ho contattato lo studio dall'estero per una cerimonia a Londra. Tutto gestito da remoto, in modo impeccabile. Risultato molto al di sopra delle aspettative.", name: "Sophie M.", event: "Cerimonia privata · Londra" },
              ].map(({ text, name, event }, i) => (
                <div key={name} className="testi-card" data-tilt="10" data-reveal style={{ transitionDelay: `${i * 90}ms` }}>
                  <span className="glare" />
                  <div className="testi-stars">
                    {[...Array(5)].map((_, j) => <span key={j} className="testi-star">★</span>)}
                  </div>
                  <p className="testi-text">&ldquo;{text}&rdquo;</p>
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
          <span className="orb orb-a" />
          <span className="orb orb-b" />
          <div className="closing-inner" data-reveal>
            <div className="orn-row" style={{ width: "100%", maxWidth: 120 }}>
              <span className="orn-line" style={{ background: "rgba(200,154,74,0.3)" }} />
              <span className="orn-diamond" style={{ background: "rgba(200,154,74,0.4)" }} />
              <span className="orn-line" style={{ background: "rgba(200,154,74,0.3)" }} />
            </div>
            <h2 className="closing-h2">Hai un evento<br /><em>in mente?</em></h2>
            <p className="closing-body">
              Non serve avere tutto chiaro.
              Basta un&apos;intenzione — ci pensiamo noi
              a trasformarla in qualcosa di indimenticabile.
            </p>
            <div className="closing-ctas">
              <Link href="#form" className="btn-gold">
                Inizia da qui
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M1 5h12M8 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
              <a href={`tel:${PHONE_TEL}`} className="btn-ghost-light">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
                Chiama ora
              </a>
            </div>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(228,226,221,0.35)", marginTop: 14 }}>
              Italia &amp; Internazionale · Produzione artigianale · Su misura
            </p>
          </div>
        </section>
      </main>
    </>
  );
}