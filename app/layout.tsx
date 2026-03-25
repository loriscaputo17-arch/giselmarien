// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Script from "next/script";

const BASE_URL = "https://giselmarien.com";

// ── Metadata ─────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: "Gisel Marién — Bomboniere e Allestimenti su Misura | Campania",
    template: "%s | Gisel Marién Atelier",
  },
  description:
    "Atelier artigianale in Campania specializzato in bomboniere personalizzate, centri tavola e allestimenti su misura per matrimoni, cerimonie, comunioni, lauree, hotel e ristoranti. Spedizioni in tutta Italia e nel mondo.",
  keywords: [
    "bomboniere personalizzate Campania",
    "bomboniere matrimonio Napoli",
    "bomboniere su misura",
    "bomboniere artigianali Italia",
    "bomboniere comunione battesimo",
    "bomboniere laurea compleanno",
    "centri tavola matrimonio Campania",
    "allestimenti matrimonio Napoli",
    "allestimenti eventi su misura",
    "allestimenti floreali cerimonie",
    "welcome kit hotel artigianale",
    "decorazioni ristoranti su misura",
    "wedding favors handmade Italy",
    "atelier artigianale Campania",
    "Gisel Marién",
    "giselmarienstudio",
  ],

  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: "/",
    languages: { "it-IT": "/", "en-US": "/en" },
  },

  authors: [{ name: "Gisel Marién Studio", url: BASE_URL }],
  creator: "Gisel Marién Studio",
  publisher: "Gisel Marién Studio",

  openGraph: {
    type: "website",
    locale: "it_IT",
    url: BASE_URL,
    siteName: "Gisel Marién",
    title: "Gisel Marién — Bomboniere e Allestimenti su Misura | Campania",
    description:
      "Atelier artigianale per bomboniere personalizzate, centri tavola e allestimenti su misura. Matrimoni, cerimonie, hotel e ristoranti. Campania e tutta Italia.",
    images: [
      {
        url: `${BASE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Gisel Marién — Atelier Artigianale Campania",
        type: "image/jpeg",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Gisel Marién — Bomboniere e Allestimenti su Misura",
    description:
      "Atelier artigianale per bomboniere personalizzate e allestimenti su misura. Campania e tutta Italia.",
    images: [`${BASE_URL}/og-image.jpg`],
    creator: "@giselmarienstudio",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    other: [{ rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#A07832" }],
  },

  manifest: "/site.webmanifest",
  category: "arts & crafts",
};

// ── Viewport ─────────────────────────────────────────────────
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAF8F3" },
    { media: "(prefers-color-scheme: dark)", color: "#1E1A12" },
  ],
  width: "device-width",
  initialScale: 1,
};

// ── JSON-LD ───────────────────────────────────────────────────
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    // LocalBusiness — il più importante per SEO locale
    {
      "@type": ["LocalBusiness", "ProfessionalService"],
      "@id": `${BASE_URL}/#business`,
      name: "Gisel Marién Studio",
      alternateName: ["Gisel Marien", "Gisel Marién Atelier"],
      description:
        "Atelier artigianale specializzato in bomboniere personalizzate, centri tavola e allestimenti su misura per matrimoni, cerimonie, hotel e ristoranti. Campania e spedizioni internazionali.",
      url: BASE_URL,
      telephone: "+393478655415",
      email: "giselmarienstudio@gmail.com",
      foundingDate: "2020",
      address: {
        "@type": "PostalAddress",
        addressRegion: "Campania",
        addressCountry: "IT",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 40.8518,
        longitude: 14.2681,
      },
      areaServed: [
        { "@type": "Country", name: "Italy" },
        { "@type": "Country", name: "United Kingdom" },
        { "@type": "Country", name: "United States" },
        { "@type": "Country", name: "Thailand" },
        { "@type": "City", name: "Napoli" },
        { "@type": "City", name: "Londra" },
        { "@type": "City", name: "New York" },
        { "@type": "City", name: "Los Angeles" },
        { "@type": "City", name: "Bangkok" },
        { "@type": "City", name: "Monte Carlo" },
      ],
      priceRange: "€€€",
      currenciesAccepted: "EUR",
      paymentAccepted: "Cash, Credit Card, Bank Transfer",
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        description: "Solo su appuntamento",
      },
      sameAs: [
        "https://www.instagram.com/giselmarienstudio/",
        "https://www.tiktok.com/@gisel.marien",
      ],
      // Aggregated rating — aggiorna con dati reali quando disponibili
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5",
        reviewCount: "3",
        bestRating: "5",
        worstRating: "1",
      },
      // Recensioni reali dal sito
      review: [
        {
          "@type": "Review",
          reviewRating: { "@type": "Rating", ratingValue: "5" },
          author: { "@type": "Person", name: "Claudia R." },
          reviewBody:
            "Gisel Marién ha capito tutto al primo incontro. Ogni bomboniera era un piccolo capolavoro.",
        },
        {
          "@type": "Review",
          reviewRating: { "@type": "Rating", ratingValue: "5" },
          author: { "@type": "Person", name: "Marco V." },
          reviewBody:
            "I centri tavola sono parte integrante dell'esperienza degli ospiti. Professionalità e gusto davvero rari.",
        },
        {
          "@type": "Review",
          reviewRating: { "@type": "Rating", ratingValue: "5" },
          author: { "@type": "Person", name: "Sophie M." },
          reviewBody:
            "Tutto gestito da remoto, in modo impeccabile. Risultato molto al di sopra delle aspettative.",
        },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Servizi Gisel Marién",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Bomboniere Personalizzate",
              description:
                "Bomboniere artigianali su misura per matrimoni, comunioni, battesimi, lauree e compleanni. Materiali, forma, packaging e messaggio scelti insieme al cliente.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Centri Tavola e Allestimenti",
              description:
                "Composizioni floreali, centri tavola scultorei, archi d'ingresso e allestimenti tematici per cerimonie ed eventi.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Hospitality & Contract",
              description:
                "Welcome kit, decorazioni stagionali e oggetti d'accoglienza personalizzati per hotel, ristoranti e venue di lusso.",
            },
          },
        ],
      },
      image: `${BASE_URL}/og-image.jpg`,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logotext.png`,
        width: 400,
        height: 80,
      },
    },

    // WebSite
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "Gisel Marién",
      description:
        "Atelier artigianale di bomboniere personalizzate e allestimenti su misura — Campania, Italia",
      publisher: { "@id": `${BASE_URL}/#business` },
      inLanguage: "it-IT",
    },

    // WebPage homepage
    {
      "@type": "WebPage",
      "@id": `${BASE_URL}/#webpage`,
      url: BASE_URL,
      name: "Gisel Marién — Bomboniere e Allestimenti su Misura | Campania",
      description:
        "Atelier artigianale in Campania per bomboniere, centri tavola e allestimenti su misura.",
      isPartOf: { "@id": `${BASE_URL}/#website` },
      about: { "@id": `${BASE_URL}/#business` },
      inLanguage: "it-IT",
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        ],
      },
    },

    // FAQ — ottimo per i rich snippet su Google
    {
      "@type": "FAQPage",
      "@id": `${BASE_URL}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "Dove si trova l'atelier Gisel Marién?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "L'atelier è situato in Campania, ma lavoriamo in tutta Italia e gestiamo progetti internazionali da remoto con videocall e moodboard condivisi.",
          },
        },
        {
          "@type": "Question",
          name: "Quanto tempo ci vuole per realizzare le bomboniere?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "I tempi variano in base alla complessità del progetto. Lavoriamo con clienti che hanno sei mesi o sei settimane di preavviso, costruendo un percorso su misura per ogni situazione.",
          },
        },
        {
          "@type": "Question",
          name: "Fate spedizioni all'estero?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sì, spediamo in tutto il mondo con packaging su misura e tracciamento completo. Abbiamo già seguito clienti a Londra, New York, Los Angeles, Bangkok e Montecarlo.",
          },
        },
        {
          "@type": "Question",
          name: "Realizzate bomboniere per matrimoni?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sì, le bomboniere personalizzate per matrimoni sono il nostro servizio principale. Ogni pezzo nasce da un progetto dedicato: materiali, forma, packaging e messaggio scelti insieme a voi.",
          },
        },
        {
          "@type": "Question",
          name: "Collaborate con hotel e ristoranti?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sì, offriamo un servizio Hospitality & Contract per hotel, ristoranti e venue di lusso: welcome kit, decorazioni stagionali e oggetti d'accoglienza personalizzati.",
          },
        },
      ],
    },
  ],
};

// ── Root Layout ───────────────────────────────────────────────
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" dir="ltr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />

        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                  page_path: window.location.pathname,
                  anonymize_ip: true,
                  cookie_flags: 'SameSite=None;Secure',
                });
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}