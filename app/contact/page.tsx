// src/app/contact/page.tsx

"use client";

import { useState } from "react";
import { supabase } from "@/app/lib/supabase";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const submitForm = async () => {
    if (!form.name || !form.email || !form.message) return;

    setLoading(true);

    const { error } = await supabase
      .from("contacts")
      .insert([
        {
          name: form.name,
          email: form.email,
          message: form.message,
        },
      ]);

    setLoading(false);

    if (error) {
      console.error(error);
      alert("Errore durante l'invio. Riprova.");
      return;
    }

    setSent(true);
  };

  return (
    <main className="bg-sand-100 min-h-screen">

      {/* INTRO */}
      <section className="pt-32 pb-20 px-6 text-center">
        <p className="text-xs uppercase tracking-[0.22em] text-ink-500 mb-6">
          Contatto
        </p>

        <h1 className="text-4xl md:text-5xl font-light leading-tight mb-6">
          Parliamone.
        </h1>

        <p className="max-w-xl mx-auto text-ink-700 leading-relaxed text-sm">
          Se hai già un’idea chiara o desideri avviare
          una collaborazione, scrivici.
        </p>
      </section>

      {/* FORM */}
      <section className="px-6 pb-32">
        <div className="max-w-xl mx-auto bg-sand-50 rounded-[32px] p-10 shadow-[0_10px_40px_rgba(0,0,0,0.05)]">

          {!sent ? (
            <div className="space-y-8">

              <input
                type="text"
                placeholder="Nome e cognome"
                className="w-full rounded-full px-6 py-4 bg-white focus:outline-none focus:ring-1 focus:ring-sand-400"
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />

              <input
                type="email"
                placeholder="Email"
                className="w-full rounded-full px-6 py-4 bg-white focus:outline-none focus:ring-1 focus:ring-sand-400"
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />

              <textarea
                placeholder="Raccontaci il progetto o la collaborazione"
                rows={5}
                className="w-full rounded-[24px] px-6 py-4 bg-white focus:outline-none focus:ring-1 focus:ring-sand-400 resize-none"
                onChange={(e) =>
                  setForm({ ...form, message: e.target.value })
                }
              />

              <button
                onClick={submitForm}
                disabled={loading}
                className="w-full rounded-full bg-[#343026] text-[#e4e2dd] px-6 py-4 text-xs uppercase tracking-[0.18em] hover:opacity-90 transition disabled:opacity-50 cursor-pointer"
              >
                {loading ? "Invio..." : "Invia messaggio"}
              </button>

            </div>
          ) : (
            <div className="text-center space-y-6">
              <h2 className="text-2xl font-light">
                Messaggio inviato
              </h2>
              <p className="text-xs text-ink-500 leading-relaxed max-w-sm mx-auto">
                Grazie per averci scritto.
                Ti risponderemo se il progetto è in linea
                con il nostro approccio.
              </p>
            </div>
          )}

        </div>
      </section>

    </main>
  );
}
