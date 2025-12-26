"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/app/lib/supabase";

export default function PhoneGate() {
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  const submitPhone = async () => {
    if (!phone) return;

    setLoading(true);

    const { error } = await supabase
      .from("phone_gate")
      .insert([{ phone }]);

    setLoading(false);

    if (error) {
      console.error(error);
      alert("Errore durante l'invio. Riprova.");
      return;
    }

    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">

      {/* BLUR OVERLAY */}
      <div className="absolute inset-0 bg-sand-50/80 backdrop-blur-md" />

      {/* MODAL */}
      <div className="relative z-10 max-w-md w-full mx-6 bg-[#e4e2dd] rounded-[32px] p-10 text-center shadow-[0_20px_60px_rgba(0,0,0,0.08)] space-y-5">

        <img
          src="/logotext.png"
          alt="Gisel Marién"
          className="mx-auto w-[160px]"
        />

        <p className="text-[10px] uppercase tracking-[0.22em] text-ink-500">
          Contatto diretto
        </p>

        <h2 className="text-2xl font-light leading-tight">
          Preferisci essere
          <br />
          ricontattato/a?
        </h2>

        <p className="text-ink-700 leading-relaxed text-sm">
          Lascia il tuo numero di telefono.
          Ti scriveremo su WhatsApp per prendere in carico le tue richieste.
        </p>

        <input
          type="tel"
          placeholder="Numero di telefono"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full rounded-full px-6 py-4 bg-white focus:outline-none focus:ring-1 focus:ring-sand-400"
        />

        <button
          disabled={loading}
          onClick={submitPhone}
          className="w-full rounded-full bg-[#343026] text-[#e4e2dd] px-6 py-4 text-xs uppercase tracking-[0.18em] hover:opacity-90 transition cursor-pointer disabled:opacity-50"
        >
          {loading ? "Invio..." : "Lascia il numero"}
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
