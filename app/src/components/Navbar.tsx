"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // ESC to close
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      {/* NAVBAR */}
      <header className="fixed top-0 inset-x-0 z-50 mx-4
        bg-bg/70 backdrop-blur-md
        border-ink/10
      ">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between relative">

          {/* LEFT – desktop menu */}
          <div className="hidden md:flex font-bold items-center gap-6 text-xs uppercase tracking-[0.18em]">
            <Link href="/approach">Manifesto</Link>
            <Link href="/projects">Progetti</Link>
          </div>

          {/* MOBILE LOGO */}
          <Link
            href="/"
            className="md:hidden text-xs uppercase tracking-[0.18em]"
          >
            <img src="logotext.png" style={{width: '30vw'}}/>

          </Link>

          {/* CENTER LOGO (desktop) */}
          <Link
            href="/"
            className="hidden md:block absolute left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.18em]"
          >
            <img src="logotext.png" style={{width: '15vw'}}/>
          </Link>

          {/* RIGHT – desktop menu */}
          <div className="hidden md:flex font-bold items-center gap-6 text-xs uppercase tracking-[0.18em]">
            <Link href="/collaborations">Collaborazioni</Link>
            <Link href="/contact">Contatti</Link>
          </div>

          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="md:hidden relative z-[60] flex flex-col justify-center gap-2"
          >
            <span
              className={`block w-6 h-[2px] bg-black transition-all duration-300 origin-center ${
                open ? "rotate-90" : "rotate-0"
              }`}
            />
            <span
              className={`block w-6 h-[2px] bg-black transition-all duration-300 origin-center ${
                open ? "rotate-90" : "rotate-0"
              }`}
            />
          </button>

        </div>
      </header>

      {/* MOBILE MENU */}
      <div
  className={`fixed inset-0 z-40 flex flex-col justify-center items-center gap-10
    text-xl uppercase tracking-[0.18em]
    bg-bg/80 backdrop-blur-xl
    transition-all duration-300 ease-out
    ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none backdrop-blur-0"}
  `}
>

        <Link href="/approach" onClick={() => setOpen(false)}>
          Approach
        </Link>
        <Link href="/projects" onClick={() => setOpen(false)}>
          Projects
        </Link>
        <Link href="/collaborations" onClick={() => setOpen(false)}>
          Collaborations
        </Link>
        <Link href="/contact" onClick={() => setOpen(false)}>
          Contact
        </Link>
      </div>
    </>
  );
}
