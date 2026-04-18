import type { Metadata } from "next";
import "./globals.css";
import "@/styles/tailwind.css";
import "@/styles/font.css";
import Script from "next/script";
import { Suspense } from "react";
import FacebookPixel from "@/components/FacebookPixel";
import CookieConsent from "@/components/CookieConsent";

/* ─────────────────────────────────────────
   REPLACE these two values once you have them
   from your Google accounts:

   GA_ID  → your GA4 Measurement ID, e.g. "G-XXXXXXXXXX"
            Get it: analytics.google.com → Admin → Data Streams

   GSC_ID → your Google Search Console verification code
            Get it: search.google.com/search-console
                    → Add property → HTML tag method
                    → copy only the content="..." value
───────────────────────────────────────── */
const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";
const GSC_VERIFICATION = process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? "";

const BASE_URL = "https://kwinbee.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  /* ── Title ── */
  title: {
    default:
      "KwinBee | Online Chess Coaching by National & International Champions",
    template: "%s | KwinBee Chess",
  },

  /* ── Description ── */
  description:
    "Master chess with world-class 1-on-1 coaching, weekly tournaments, and puzzle-based assignments. Personalised lessons for kids and adults of all levels. Book your free demo class today.",

  /* ── Keywords ── */
  keywords: [
    "online chess coaching",
    "chess lessons for kids",
    "chess tutor",
    "learn chess online",
    "chess classes",
    "grandmaster coaching",
    "chess academy",
    "KwinBee chess",
    "chess for beginners",
    "1-on-1 chess lessons",
  ],

  /* ── Canonical & alternates ── */
  alternates: {
    canonical: BASE_URL,
  },

  /* ── Open Graph (WhatsApp, Facebook, LinkedIn previews) ── */
  openGraph: {
    type: "website",
    url: BASE_URL,
    siteName: "KwinBee Chess",
    title:
      "KwinBee | Online Chess Coaching by National & International Champions",
    description:
      "Personalised 1-on-1 chess lessons, weekly tournaments, and assignments — taught by champions. Start with a free demo class.",
    images: [
      {
        url: "/images/og-image.png", // ← upload a 1200×630 branded image to public/images/
        width: 1200,
        height: 630,
        alt: "KwinBee Online Chess Coaching",
      },
    ],
  },

  /* ── Twitter / X card ── */
  twitter: {
    card: "summary_large_image",
    title:
      "KwinBee | Online Chess Coaching by National & International Champions",
    description:
      "Personalised 1-on-1 chess lessons, weekly tournaments, and assignments — taught by champions. Start with a free demo class.",
    images: ["/images/og-image.png"],
  },

  /* ── Icons ── */
  icons: {
    icon: "/images/logo_kwinbee.png",
    apple: "/images/logo_kwinbee.png",
  },

  /* ── Robots ── */
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

  /* ── Google Search Console verification ── */
  ...(GSC_VERIFICATION && {
    verification: {
      google: GSC_VERIFICATION,
    },
  }),
};

/* ── JSON-LD structured data ── */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "EducationalOrganization",
      "@id": `${BASE_URL}/#organization`,
      name: "KwinBee",
      alternateName: "KwinBee Chess Academy",
      description:
        "Online chess coaching for all ages and levels by national and international champions. Personalised 1-on-1 sessions, group classes, weekly tournaments, and puzzle-based assignments.",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/images/logo_kwinbee.png`,
      },
      email: "chess@kwinbee.com",
      sameAs: [
        "https://www.facebook.com/profile.php?id=61555420220545",
        "https://www.instagram.com/kwinbee64",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Chess Coaching Plans",
        itemListElement: [
          {
            "@type": "Offer",
            name: "1 Month Chess Coaching",
            description: "8 sessions, 4 tournaments, 8 assignments",
          },
          {
            "@type": "Offer",
            name: "4 Month Chess Coaching",
            description: "32 sessions, 16 tournaments, 40 assignments",
          },
          {
            "@type": "Offer",
            name: "8 Month Chess Coaching",
            description: "64 sessions, 32 tournaments, 40 assignments",
          },
          {
            "@type": "Offer",
            name: "12 Month Chess Coaching",
            description: "98 sessions, 48 tournaments, 200 assignments",
          },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "KwinBee Chess",
      publisher: { "@id": `${BASE_URL}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${BASE_URL}/?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* ── JSON-LD structured data ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* ── Meta Pixel (consent revoked until cookie banner accepted) ── */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;
              n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];
              t=b.createElement(e);t.async=!0;
              t.src=v;
              s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)
              }(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('consent', 'revoke');
              fbq('init', '1762547577601215');
            `,
          }}
        />

        {/* ── Google Analytics 4 ── */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script
              id="ga4-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_ID}', {
                    page_path: window.location.pathname,
                    anonymize_ip: true
                  });
                `,
              }}
            />
          </>
        )}
      </head>

      <body>
        {/* FacebookPixel tracks PageView on every route change */}
        <Suspense fallback={null}>
          <FacebookPixel />
        </Suspense>

        {/* NoScript fallback for Meta Pixel */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1762547577601215&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>

        <main className="min-h-screen">{children}</main>
        <CookieConsent />
      </body>
    </html>
  );
}
