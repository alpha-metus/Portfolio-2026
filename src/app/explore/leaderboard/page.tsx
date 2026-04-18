import ExploreLeaderboard from "@/components/ExploreLeaderboard";

const BASE = "https://www.kwinbee.com";

export const metadata = {
  title: "World Chess Leaderboard — Top Rated Players by Time Control | KwinBee",
  description:
    "View the world's top-rated chess players ranked by time control — Blitz, Bullet, Rapid, Classical, and Ultra Bullet. Live rankings updated from Lichess. See who the world's best chess players are right now.",
  keywords: [
    "chess world leaderboard",
    "top chess players world",
    "chess player rankings",
    "best chess players 2025",
    "chess rating leaderboard",
    "blitz chess top players",
    "bullet chess rankings",
    "rapid chess leaderboard",
    "classical chess top rated",
    "world chess rankings",
    "chess grandmaster ranking",
    "lichess leaderboard",
    "chess elo ranking",
    "highest rated chess players",
  ],
  alternates: { canonical: `${BASE}/explore/leaderboard` },
  openGraph: {
    title: "World Chess Leaderboard — Top Players by Time Control | KwinBee",
    description: "Live world chess rankings by Blitz, Bullet, Rapid, Classical. See the top chess players on earth right now.",
    url: `${BASE}/explore/leaderboard`,
    type: "website",
    images: [{ url: `${BASE}/images/og-image.png`, width: 1200, height: 630, alt: "KwinBee Chess Leaderboard" }],
  },
};

export default function LeaderboardPage() {
  return <ExploreLeaderboard />;
}
