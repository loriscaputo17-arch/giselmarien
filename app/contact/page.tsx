// src/app/contact/page.tsx
// ✅ Server Component — può esportare metadata
import type { Metadata } from "next";
import ContactPageForm from "@/app/components/ContactPageForm";

export const metadata: Metadata = {
  title: "Contatti",
  description:
    "Contatta Gisel Marién per bomboniere personalizzate, centri tavola e allestimenti su misura. Risposta entro poche ore via WhatsApp. Campania e spedizioni internazionali.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contatti — Gisel Marién Atelier",
    description:
      "Scrivici per un preventivo su misura. Risposta entro poche ore via WhatsApp.",
    url: "https://giselmarien.com/contact",
  },
};

export default function Contact() {
  return (
    <main>
      <ContactPageForm />
    </main>
  );
}