// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Script from "next/script";

// ── Base URL ────────────────────────────────────────────────
const BASE_URL = "https://www.giselmarienstudio.com"; // aggiorna con il tuo dominio

// ── Metadata ────────────────────────────────────────────────
export const metadata: Metadata = {
  // ── Title template ──────────────────────────────────────
  title: {
    default: "Gisel Marién — Bomboniere e Allestimenti su Misura",
    template: "%s | Gisel Marién",
  },

  // ── Description ─────────────────────────────────────────
  description:
    "Atelier artigianale specializzato in bomboniere personalizzate, centri tavola e allestimenti su misura per matrimoni, cerimonie, hotel e ristoranti. Campania e tutta Italia. Spedizioni internazionali.",

  // ── Keywords ────────────────────────────────────────────
  keywords: [
    "bomboniere personalizzate",
    "bomboniere matrimonio Campania",
    "bomboniere su misura Napoli",
    "centri tavola cerimonie",
    "allestimenti matrimonio Campania",
    "allestimenti eventi Napoli",
    "bomboniere comunione battesimo",
    "bomboniere laurea compleanno",
    "wedding favors Italy",
    "atelier artigianale Campania",
    "produzione artistica eventi",
    "welcome kit hotel",
    "decorazioni ristoranti",
    "Gisel Marién",
    "bomboniere artigianali Italia",
  ],

  // ── Canonical & alternates ──────────────────────────────
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: "/",
    languages: {
      "it-IT": "/",
      "en-US": "/en",
    },
  },

  // ── Authors & creator ───────────────────────────────────
  authors: [{ name: "Gisel Marién Studio", url: BASE_URL }],
  creator: "Gisel Marién Studio",
  publisher: "Gisel Marién Studio",

  // ── Open Graph ──────────────────────────────────────────
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: BASE_URL,
    siteName: "Gisel Marién",
    title: "Gisel Marién — Bomboniere e Allestimenti su Misura",
    description:
      "Atelier artigianale per bomboniere personalizzate, centri tavola e allestimenti su misura. Matrimoni, cerimonie, hotel e ristoranti. Campania e tutta Italia.",
    images: [
      {
        url: `${BASE_URL}/og-image.jpg`, // crea un'immagine 1200x630 con il logo su sfondo scuro
        width: 1200,
        height: 630,
        alt: "Gisel Marién — Atelier di Produzione Artistica",
        type: "image/jpeg",
      },
    ],
  },

  // ── Twitter / X Card ────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: "Gisel Marién — Bomboniere e Allestimenti su Misura",
    description:
      "Atelier artigianale per bomboniere personalizzate e allestimenti su misura. Campania e tutta Italia.",
    images: [`${BASE_URL}/og-image.jpg`],
    creator: "@giselmarienstudio",
  },

  // ── Robots ──────────────────────────────────────────────
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

  // ── Verification ────────────────────────────────────────
  // Aggiungi il tuo codice dopo aver verificato su Google Search Console
  // verification: {
  //   google: "xxxxxxxxxxxxxxxxxxxx",
  // },

  // ── Icons ───────────────────────────────────────────────
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" },
    ],
    other: [
      { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#A07832" },
    ],
  },

  // ── Manifest ────────────────────────────────────────────
  manifest: "/site.webmanifest",

  // ── Category ────────────────────────────────────────────
  category: "arts & crafts",
};

// ── Viewport ────────────────────────────────────────────────
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAF8F3" },
    { media: "(prefers-color-scheme: dark)",  color: "#1E1A12" },
  ],
  width: "device-width",
  initialScale: 1,
};

// ── Structured Data (JSON-LD) ────────────────────────────────
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    // Local Business
    {
      "@type": ["LocalBusiness", "Store"],
      "@id": `${BASE_URL}/#business`,
      name: "Gisel Marién Studio",
      alternateName: "Gisel Marien",
      description:
        "Atelier artigianale specializzato in bomboniere personalizzate, centri tavola e allestimenti su misura per matrimoni, cerimonie, hotel e ristoranti.",
      url: BASE_URL,
      telephone: "+393478655415",
      email: "giselmarienstudio@gmail.com",
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
        "https://www.facebook.com/",
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
                "Bomboniere su misura per matrimoni, comunioni, battesimi, lauree e compleanni.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Centri Tavola e Allestimenti",
              description:
                "Centri tavola e allestimenti floreali per cerimonie ed eventi.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Hospitality & Contract",
              description:
                "Welcome kit e decorazioni su misura per hotel e ristoranti.",
            },
          },
        ],
      },
      image: `${BASE_URL}/og-image.jpg`,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logotext.png`,
      },
    },
    // Website
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "Gisel Marién",
      description: "Atelier di Produzione Artistica per eventi contemporanei",
      publisher: { "@id": `${BASE_URL}/#business` },
      inLanguage: "it-IT",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${BASE_URL}/?s={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    // BreadcrumbList for homepage
    {
      "@type": "BreadcrumbList",
      "@id": `${BASE_URL}/#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: BASE_URL,
        },
      ],
    },
  ],
};


// ── Root Layout ──────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it" dir="ltr">
      <head>
        {/* Preconnect to Google Fonts for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="bg-neutral-950 text-neutral-100">
        <Navbar />
        <main>{children}</main>
        <Footer />

        {/* Google Analytics */}
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