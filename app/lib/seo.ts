// src/app/lib/seo.ts
// Usa questa funzione in ogni page.tsx per aggiungere metadata specifici per pagina.
// Esempio: export const metadata = pageMeta({ ... })

import type { Metadata } from "next";

const BASE_URL = "https://www.giselmarienstudio.com";
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.jpg`;

interface PageMetaOptions {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}

export function pageMeta({
  title,
  description,
  path = "/",
  image = DEFAULT_OG_IMAGE,
  noIndex = false,
}: PageMetaOptions): Metadata {
  const url = `${BASE_URL}${path}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      locale: "it_IT",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}


// ── Page-specific metadata ────────────────────────────────────
// Copia queste righe nelle rispettive page.tsx

export const homeMetadata = pageMeta({
  title: "Bomboniere e Allestimenti su Misura — Campania & Italia",
  description:
    "Atelier artigianale per bomboniere personalizzate, centri tavola e allestimenti per matrimoni, cerimonie, hotel e ristoranti. Campania e tutta Italia. Spedizioni internazionali.",
  path: "/",
});

export const approachMetadata = pageMeta({
  title: "Manifesto — Il nostro approccio alla produzione artistica",
  description:
    "Scopri la filosofia di Gisel Marién: come trasformiamo ogni evento in un gesto che resta, attraverso artigianato, intenzione e cura del dettaglio.",
  path: "/approach",
});

export const contactMetadata = pageMeta({
  title: "Contatti — Parliamone",
  description:
    "Scrivici per un preventivo su bomboniere, allestimenti o collaborazioni per hotel e ristoranti. Risponderemo entro 24 ore.",
  path: "/contact",
});