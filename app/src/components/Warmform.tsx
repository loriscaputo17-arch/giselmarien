"use client";

import { useState } from "react";
import { supabase } from "@/app/src/lib/supabase";

export default function WarmForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    eventType: "",
    timing: "",
    name: "",
    phone: "",
    email: "",
  });

  const submitForm = async () => {
    const { error } = await supabase
      .from("leads")
      .insert([
        {
          event_type: form.eventType,
          timing: form.timing,
          name: form.name,
          phone: form.phone,
          email: form.email,
        },
      ]);

    if (error) {
      console.error(error);
      alert("Errore durante l'invio. Riprova.");
      return;
    }

    setStep(6); 
  };


  return (
    <section className="md:py-40 py-20 bg-sand-100 relative overflow-hidden md:flex items-center">

      <div className="md:max-w-xl mx-auto md:px-6 relative z-10">

        <p className="text-xs uppercase tracking-[0.22em] text-ink-500 mb-8 text-center">
          Raccontaci il tuo evento
        </p>

        <div className="bg-sand-50 rounded-[32px] p-10 shadow-[0_10px_40px_rgba(0,0,0,0.05)] space-y-10">

          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-10 text-center">
              <h2 className="text-2xl font-light">
                Che tipo di evento stai immaginando?
              </h2>

              <div className="space-y-4">
                {[
                  "Cerimonia privata",
                  "Evento aziendale",
                  "Compleanno / ricorrenza",
                  "Altro",
                ].map(v => (
                  <button
                    key={v}
                    onClick={() => {
                      setForm({ ...form, eventType: v });
                      setStep(2);
                    }}
                    className="w-full rounded-full border border-sand-300 px-6 py-4 text-sm hover:bg-sand-200 transition cursor-pointer"
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-10 text-center">
              <h2 className="text-2xl font-light">
                Quando si svolgerà?
              </h2>

              <input
                type="text"
                placeholder="Es. primavera 2025 / data da definire"
                className="w-[30vw] rounded-full px-6 py-4 bg-white focus:outline-none focus:ring-1 focus:ring-sand-400"
                onChange={e => setForm({ ...form, timing: e.target.value })}
              />

              <div className="flex justify-between text-xs uppercase tracking-[0.18em]">
                <button
                  onClick={() => setStep(1)}
                  className="opacity-60 hover:opacity-100 transition cursor-pointer"
                >
                  Indietro
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="cursor-pointer"
                >
                  Avanti
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="space-y-10 text-center">
              <h2 className="text-2xl font-light">
                Come ti chiami?
              </h2>

              <input
                type="text"
                placeholder="Nome e cognome"
                className="w-[30vw] rounded-full px-6 py-4 bg-white focus:outline-none focus:ring-1 focus:ring-sand-400"
                onChange={e => setForm({ ...form, name: e.target.value })}
              />

              <div className="flex justify-between text-xs uppercase tracking-[0.18em]">
                <button
                  onClick={() => setStep(2)}
                  className="opacity-60 hover:opacity-100 transition cursor-pointer"
                >
                  Indietro
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="cursor-pointer"
                >
                  Avanti
                </button>
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <div className="space-y-10 text-center">
              <h2 className="text-2xl font-light">
                Dove possiamo scriverti?
              </h2>

              <input
                type="tel"
                placeholder="Telefono (WhatsApp)"
                className="w-[30vw] rounded-full px-6 py-4 bg-white focus:outline-none focus:ring-1 focus:ring-sand-400"
                onChange={e => setForm({ ...form, phone: e.target.value })}
              />

              <div className="flex justify-between text-xs uppercase tracking-[0.18em]">
                <button
                  onClick={() => setStep(3)}
                  className="opacity-60 hover:opacity-100 transition cursor-pointer"
                >
                  Indietro
                </button>
                <button
                  onClick={() => setStep(5)}
                  className="cursor-pointer"
                >
                  Avanti
                </button>
              </div>
            </div>
          )}

          {/* STEP 5 */}
          {step === 5 && (
            <div className="space-y-10 text-center">
              <h2 className="text-2xl font-light">
                Ultimo passo
              </h2>

              <input
                type="email"
                placeholder="Email"
                className="w-full rounded-full px-6 py-4 bg-white focus:outline-none focus:ring-1 focus:ring-sand-400"
                onChange={e => setForm({ ...form, email: e.target.value })}
              />

              <button
                onClick={submitForm}
                className="w-full rounded-full bg-[#343026] text-[#e4e2dd] px-6 py-4 text-xs uppercase tracking-[0.18em] hover:opacity-90 transition cursor-pointer"
              >
                Invia richiesta
              </button>

              <p className="text-xs text-ink-500 leading-relaxed max-w-sm mx-auto">
                Ti ricontatteremo entro poche ore via WhatsApp
                per capire se e come lavorare insieme.
              </p>
            </div>
          )}

          {step === 6 && (
            <div className="space-y-6 text-center">
              <h2 className="text-2xl font-light">
                Richiesta inviata
              </h2>
              <p className="text-xs text-ink-500 max-w-sm mx-auto leading-relaxed">
                Grazie. Ti contatteremo a breve per approfondire il progetto.
              </p>
            </div>
          )}

        </div>
      </div>

    </section>
  );
}
