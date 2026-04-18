import type { Metadata } from "next";
import "./globals.css";
import "@/styles/tailwind.css";
import "@/styles/font.css";
import Script from "next/script";
import { Suspense } from "react";
import FacebookPixel from "@/components/FacebookPixel";
import CookieConsent from "@/components/CookieConsent";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-420X4DTDFY";
const GSC_VERIFICATION = process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? "";

export const BASE_URL = "https://www.kwinbee.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "KwinBee | #1 Online Chess Coaching — Learn from National & International Champions",
    template: "%s | KwinBee Chess Academy",
  },

  description:
    "KwinBee is a world-class online chess academy offering 1-on-1 chess coaching, group classes, and weekly tournaments for kids, beginners, and advanced players. Learn chess from national and international champions. Book your free demo class today.",

  keywords: [
    // Core service keywords
    "online chess coaching",
    "chess lessons online",
    "chess classes online",
    "chess tutor",
    "chess tutor online",
    "chess teacher",
    "chess instructor",
    "chess coaching",
    "chess academy",
    "chess school online",
    "learn chess online",
    "chess training online",
    "private chess lessons",
    "1-on-1 chess lessons",
    "personal chess coach",
    "chess lessons",

    // Audience-specific
    "chess lessons for kids",
    "chess for children",
    "kids chess lessons",
    "chess coaching for kids",
    "chess classes for kids",
    "chess for beginners",
    "chess lessons for beginners",
    "chess coaching for beginners",
    "chess for adults",
    "chess lessons for adults",
    "chess for intermediate players",
    "chess for advanced players",
    "youth chess coaching",
    "junior chess coaching",

    // Quality/expertise keywords
    "grandmaster chess coaching",
    "chess coaching by champions",
    "professional chess coach",
    "certified chess coach",
    "FIDE chess coach",
    "national chess champion coach",
    "international chess coach",
    "best online chess coach",
    "top chess tutor",
    "expert chess lessons",

    // Skill/improvement keywords
    "improve chess rating",
    "chess rating improvement",
    "chess tactics training",
    "chess strategy lessons",
    "chess opening theory",
    "chess endgame training",
    "chess puzzle training",
    "chess combination training",
    "chess game analysis",
    "chess competition training",
    "chess tournament preparation",

    // Chess openings
    "chess openings lessons",
    "Sicilian Defense coaching",
    "King's Indian Defense",
    "French Defense chess",
    "Ruy Lopez chess",
    "Queen's Gambit chess",

    // Format keywords
    "virtual chess lessons",
    "remote chess coaching",
    "online chess classes",
    "weekly chess tournaments",
    "chess assignments",
    "chess curriculum",
    "chess program for kids",

    // Brand + location
    "KwinBee chess",
    "KwinBee chess academy",
    "chess coaching worldwide",
    "chess lessons USA",
    "chess lessons UK",
    "chess lessons India",
    "chess lessons UAE",
    "chess coaching anywhere in the world",
    "global chess academy",
    "chess lessons for all levels",
  ],

  alternates: {
    canonical: BASE_URL,
  },

  openGraph: {
    type: "website",
    url: BASE_URL,
    siteName: "KwinBee Chess Academy",
    title: "KwinBee | #1 Online Chess Coaching — Learn from National & International Champions",
    description:
      "World-class 1-on-1 chess coaching, weekly tournaments, and puzzle-based assignments for kids and adults of all levels. Trained by national and international champions. Start with a free demo class.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "KwinBee Online Chess Coaching Academy",
      },
    ],
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "KwinBee | #1 Online Chess Coaching — Learn from Champions",
    description:
      "1-on-1 chess lessons, weekly tournaments & puzzle assignments taught by national and international champions. Free demo class available.",
    images: ["/images/og-image.png"],
  },

  icons: {
    icon: "/images/logo_kwinbee.png",
    apple: "/images/logo_kwinbee.png",
    shortcut: "/images/logo_kwinbee.png",
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

  category: "education",

  ...(GSC_VERIFICATION && {
    verification: { google: GSC_VERIFICATION },
  }),
};

/* ────────────────────────────────────────────────────────────
   JSON-LD: EducationalOrganization + WebSite + FAQ + Course
──────────────────────────────────────────────────────────── */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    /* 1. Organisation */
    {
      "@type": ["EducationalOrganization", "Organization"],
      "@id": `${BASE_URL}/#organization`,
      name: "KwinBee Chess Academy",
      alternateName: ["KwinBee", "Kwinbee Chess", "KwinBee Online Chess"],
      description:
        "KwinBee is a global online chess academy providing personalised 1-on-1 chess coaching, group classes, weekly online tournaments, and puzzle-based assignments for students of all ages and skill levels. Coached by national and international chess champions.",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/images/logo_kwinbee.png`,
        width: 228,
        height: 64,
      },
      email: "chess@kwinbee.com",
      sameAs: [
        "https://www.facebook.com/profile.php?id=61555420220545",
        "https://www.instagram.com/kwinbee64",
      ],
      numberOfEmployees: { "@type": "QuantitativeValue", minValue: 10, maxValue: 50 },
      areaServed: "Worldwide",
      knowsAbout: [
        "Chess coaching",
        "Chess tactics",
        "Chess strategy",
        "Chess openings",
        "Chess endgame",
        "Chess tournaments",
        "Online chess education",
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        bestRating: "5",
        worstRating: "1",
        ratingCount: "25",
        reviewCount: "25",
      },
    },

    /* 2. WebSite with SearchAction */
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "KwinBee Chess Academy",
      description: "Online chess coaching for all ages and levels by national and international champions.",
      publisher: { "@id": `${BASE_URL}/#organization` },
      inLanguage: "en-US",
    },

    /* 3. Course catalogue */
    {
      "@type": "Course",
      "@id": `${BASE_URL}/#course-1month`,
      name: "1-Month Chess Coaching Programme",
      description: "8 live sessions, 4 online tournaments, 8 puzzle assignments. Perfect for beginners trying chess coaching for the first time.",
      provider: { "@id": `${BASE_URL}/#organization` },
      courseMode: "online",
      educationalLevel: "Beginner",
      teaches: ["Chess fundamentals", "Basic tactics", "Opening principles"],
      hasCourseInstance: {
        "@type": "CourseInstance",
        courseMode: "online",
        instructor: { "@type": "Person", name: "KwinBee Coach" },
      },
    },
    {
      "@type": "Course",
      "@id": `${BASE_URL}/#course-4month`,
      name: "4-Month Chess Coaching Programme",
      description: "32 live sessions, 16 online tournaments, 40 puzzle assignments. Ideal for building a solid chess foundation.",
      provider: { "@id": `${BASE_URL}/#organization` },
      courseMode: "online",
      educationalLevel: "Beginner to Intermediate",
      teaches: ["Chess tactics", "Opening repertoire", "Middlegame strategy"],
    },
    {
      "@type": "Course",
      "@id": `${BASE_URL}/#course-8month`,
      name: "8-Month Chess Coaching Programme — Most Popular",
      description: "64 live sessions, 32 online tournaments, 40 puzzle assignments. The most popular plan for serious skill improvement.",
      provider: { "@id": `${BASE_URL}/#organization` },
      courseMode: "online",
      educationalLevel: "Intermediate",
      teaches: ["Advanced tactics", "Strategic planning", "Tournament preparation", "Chess endgames"],
    },
    {
      "@type": "Course",
      "@id": `${BASE_URL}/#course-12month`,
      name: "12-Month Chess Coaching Programme — Best Value",
      description: "98 live sessions, 48 online tournaments, 200 puzzle assignments. Complete competitive mastery programme for serious players.",
      provider: { "@id": `${BASE_URL}/#organization` },
      courseMode: "online",
      educationalLevel: "Intermediate to Advanced",
      teaches: ["Full competitive preparation", "Advanced openings", "Endgame mastery", "Tournament strategy"],
    },

    /* 4. FAQ — targets voice search and Google featured snippets */
    {
      "@type": "FAQPage",
      "@id": `${BASE_URL}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "How do I start learning chess online?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Book a free demo class with KwinBee. Our coaches assess your current level and create a personalised training plan. No experience needed — we teach complete beginners to advanced players.",
          },
        },
        {
          "@type": "Question",
          name: "Is KwinBee suitable for kids?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes! KwinBee specialises in chess coaching for children. Our coaches are patient, engaging, and experienced in teaching kids from age 5 and above. Parents report significant improvement in focus, problem-solving, and academic performance.",
          },
        },
        {
          "@type": "Question",
          name: "How much does online chess coaching cost?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "KwinBee offers flexible plans starting from a 1-month trial. All plans include live 1-on-1 sessions, online tournaments, and puzzle assignments. Book a free demo class to discuss pricing tailored to your needs.",
          },
        },
        {
          "@type": "Question",
          name: "Can I improve my chess rating with online coaching?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Absolutely. Our students consistently improve their ratings through personalised coaching, targeted tactics training, and weekly tournament practice. Many students see rating improvements within the first few months.",
          },
        },
        {
          "@type": "Question",
          name: "Who are KwinBee's chess coaches?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "KwinBee's coaches are national and international chess champions with proven teaching experience. They specialise in identifying your weaknesses and creating a focused improvement plan.",
          },
        },
        {
          "@type": "Question",
          name: "Do you offer chess lessons for complete beginners?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. KwinBee welcomes complete beginners. We start from the basics — piece movement, board control, and tactics — and build up to advanced strategy at your own pace.",
          },
        },
        {
          "@type": "Question",
          name: "Is online chess coaching as effective as in-person lessons?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Online chess coaching with KwinBee uses interactive boards, screen sharing, and real-time game analysis, making it just as effective as in-person lessons — with the added flexibility of learning from anywhere in the world.",
          },
        },
        {
          "@type": "Question",
          name: "What age group does KwinBee cater to?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "KwinBee coaches students of all ages — from young children (age 5+) to adults. We have specific programmes for juniors, teenagers, and adult learners at all skill levels.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Meta Pixel — consent revoked until cookie banner accepted */}
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

        {/* Google Analytics 4 */}
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
        <Suspense fallback={null}>
          <FacebookPixel />
        </Suspense>

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
