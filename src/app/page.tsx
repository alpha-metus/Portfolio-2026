import Home from "@/container/Home";
import React from "react";

const BASE = "https://www.kwinbee.com";

export const metadata = {
  title: "KwinBee | #1 Online Chess Coaching for Kids & Adults — Learn from Champions",
  description:
    "Join 2,000+ students learning chess with KwinBee — the world's top online chess academy. Get personalised 1-on-1 chess lessons, weekly tournaments, and puzzle assignments from national and international champions. Book your free demo class today. No card required.",
  keywords: [
    "online chess coaching",
    "chess lessons online",
    "chess tutor",
    "chess coach",
    "chess classes for kids",
    "chess lessons for beginners",
    "chess academy online",
    "learn chess online",
    "private chess lessons",
    "chess coaching for children",
    "best online chess tutor",
    "chess grandmaster coaching",
    "chess improvement online",
    "chess lessons worldwide",
    "1-on-1 chess coaching",
  ],
  alternates: { canonical: BASE },
  openGraph: {
    title: "KwinBee | #1 Online Chess Coaching for Kids & Adults — Learn from Champions",
    description:
      "Personalised 1-on-1 chess lessons, weekly tournaments, and assignments taught by national and international champions. 2,000+ students worldwide. Free demo class — no card required.",
    url: BASE,
    type: "website",
    images: [{ url: `${BASE}/images/og-image.png`, width: 1200, height: 630, alt: "KwinBee Online Chess Coaching" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "KwinBee | #1 Online Chess Coaching — Learn from Champions",
    description: "2,000+ students. 1-on-1 coaching by national & international champions. Free demo class.",
    images: [`${BASE}/images/og-image.png`],
  },
};

export default function HomePage() {
  return <Home />;
}
