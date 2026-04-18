import Home from "@/container/Home";
import React from "react";

const BASE_URL = "https://kwinbee.com";

export const metadata = {
  title:
    "KwinBee | Online Chess Coaching by National & International Champions",
  description:
    "Master chess with world-class 1-on-1 coaching, weekly tournaments, and puzzle-based assignments. Personalised lessons for kids and adults of all levels. Book your free demo class today.",
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title:
      "KwinBee | Online Chess Coaching by National & International Champions",
    description:
      "Personalised 1-on-1 chess lessons, weekly tournaments, and assignments — taught by champions. Start with a free demo class.",
    url: BASE_URL,
    type: "website",
    images: [
      {
        url: `${BASE_URL}/images/og-image.png`,
        width: 1200,
        height: 630,
        alt: "KwinBee Online Chess Coaching",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "KwinBee | Online Chess Coaching by National & International Champions",
    description:
      "Personalised 1-on-1 chess lessons, weekly tournaments, and assignments — taught by champions. Start with a free demo class.",
    images: [`${BASE_URL}/images/og-image.png`],
  },
};

const HomePage = () => {
  return <Home />;
};

export default HomePage;
