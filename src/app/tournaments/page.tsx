import TournamentsPage from "@/components/TournamentsPage";

const BASE = "https://www.kwinbee.com";

export const metadata = {
  title: "Live Chess Tournaments Online — KwinBee Chess Academy",
  description:
    "Watch and participate in live online chess tournaments. Browse upcoming chess events, over-the-board competitions, and real-time results. KwinBee students compete weekly in rated online chess tournaments.",
  keywords: [
    "online chess tournaments",
    "live chess tournament",
    "chess competition online",
    "weekly chess tournament",
    "chess tournament for kids",
    "rated chess tournament online",
    "chess event calendar",
    "over the board chess tournament",
    "youth chess competition",
    "chess tournament results",
    "online chess match",
    "chess league online",
    "KwinBee chess tournament",
  ],
  alternates: { canonical: `${BASE}/tournaments` },
  openGraph: {
    title: "Live Chess Tournaments Online — KwinBee Chess Academy",
    description:
      "Real-time live chess tournaments, upcoming events, and over-the-board competitions. Join KwinBee students competing weekly.",
    url: `${BASE}/tournaments`,
    type: "website",
    images: [{ url: `${BASE}/images/og-image.png`, width: 1200, height: 630, alt: "KwinBee Chess Tournaments" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Live Chess Tournaments — KwinBee",
    description: "Watch live chess tournaments, upcoming events, and OTB competitions from KwinBee.",
    images: [`${BASE}/images/og-image.png`],
  },
};

export default function Tournaments() {
  return <TournamentsPage />;
}
