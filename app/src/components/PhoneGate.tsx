"use client";

import { useState, useEffect } from "react";

export default function PhoneGate() {
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState("");

  useEffect(() => {
    // mostra il popup all'ingresso
    setOpen(true);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">

      {/* BLUR OVERLAY */}
      <div className="absolute inset-0 bg-sand-50/80 backdrop-blur-md" />

      {/* MODAL */}
      <div className="relative z-10 max-w-md w-full mx-6 bg-[#e4e2dd] rounded-[32px] p-10 text-center shadow-[0_20px_60px_rgba(0,0,0,0.08)] space-y-4">

        <img src="logotext.png" style={{width: '15vw'}} className="ml-auto mr-auto"/>

        <p className="text-[10px] uppercase tracking-[0.22em] text-ink-500">
          Contatto diretto
        </p>

        <h2 className="text-2xl font-light leading-tight">
          Preferisci essere
          <br />
          ricontattata?
        </h2>

        <p className="text-ink-700 leading-relaxed text-sm">
          Lasciaci il tuo numero.
          Ti scriveremo su WhatsApp entro poche ore
          per capire se e come lavorare insieme.
        </p>

        <input
          type="tel"
          placeholder="Numero di telefono"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full rounded-full  px-6 py-4 bg-white focus:outline-none focus:ring-1 focus:ring-sand-400"
        />

        <button
          className="w-full rounded-full bg-[#343026] text-[#e4e2dd] px-6 py-4 text-xs uppercase tracking-[0.18em] hover:opacity-90 transition cursor-pointer"
          onClick={() => {
            // qui in futuro mandi il numero al backend / WhatsApp
            setOpen(false);
          }}
        >
          Lascia il numero
        </button>

        {/* PROSEGUI COMUNQUE */}
        <button
          onClick={() => setOpen(false)}
          className="block mx-auto text-[11px] uppercase tracking-[0.18em] text-ink-500 opacity-70 hover:opacity-100 transition cursor-pointer"
        >
          Prosegui comunque
        </button>

      </div>
    </div>
  );
}
