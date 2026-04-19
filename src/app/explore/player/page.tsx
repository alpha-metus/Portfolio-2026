import ExplorePlayer from "@/components/ExplorePlayer";

const BASE = "https://www.kwinbee.com";

export const metadata = {
  title: "Chess Player Lookup — Chess.com & Lichess Stats | KwinBee",
  description:
    "Look up any chess player's ratings and stats on Chess.com and Lichess simultaneously. See Rapid, Blitz, Bullet ratings, total games, win rates and more — free, no login required.",
  keywords: [
    "chess player lookup",
    "chess player stats",
    "chess.com player rating",
    "lichess player rating",
    "chess player search",
    "chess rating checker",
    "chess player profile",
    "chess.com stats",
    "lichess stats",
    "chess rating comparison",
  ],
  alternates: { canonical: `${BASE}/explore/player` },
  openGraph: {
    title: "Chess Player Lookup — Chess.com & Lichess Stats | KwinBee",
    description: "Search any chess player and see their live ratings and stats from Chess.com and Lichess side by side.",
    url: `${BASE}/explore/player`,
    type: "website",
    images: [{ url: `${BASE}/images/og-image.png`, width: 1200, height: 630, alt: "KwinBee Player Lookup" }],
  },
};

export default function PlayerPage() {
  return <ExplorePlayer />;
}
