import ExploreLive from "@/components/ExploreLive";

const BASE = "https://www.kwinbee.com";

export const metadata = {
  title: "Watch Chess Grandmasters Play Live — Chess TV | KwinBee",
  description:
    "Watch grandmasters and top-rated players play chess live. Real-time board updates across Blitz, Bullet, Rapid, Classical, and Chess960. Free live chess streaming for students and fans worldwide.",
  keywords: [
    "watch chess live",
    "chess live stream",
    "chess grandmaster live",
    "live chess games online",
    "chess TV online",
    "blitz chess live",
    "bullet chess live",
    "rapid chess stream",
    "classical chess live",
    "chess960 live",
    "watch top chess players",
    "chess live broadcast",
    "lichess TV",
    "free chess stream",
  ],
  alternates: { canonical: `${BASE}/explore/live` },
  openGraph: {
    title: "Watch Chess Grandmasters Play Live — Chess TV | KwinBee",
    description: "Real-time chess games from the world's top players. Watch live Blitz, Bullet, Rapid and Classical chess for free.",
    url: `${BASE}/explore/live`,
    type: "website",
    images: [{ url: `${BASE}/images/og-image.png`, width: 1200, height: 630, alt: "KwinBee Live Chess TV" }],
  },
};

export default function LivePage() {
  return <ExploreLive />;
}
