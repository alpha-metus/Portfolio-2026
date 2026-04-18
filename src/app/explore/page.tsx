import ExploreHub from "@/components/ExploreHub";

const BASE = "https://www.kwinbee.com";

export const metadata = {
  title: "Free Chess Tools — Daily Puzzle, Live TV, Opening Explorer | KwinBee",
  description:
    "Free online chess tools from KwinBee: solve the daily chess puzzle, watch grandmasters play live, explore chess openings, and check the world chess leaderboard. Perfect for chess students of all levels.",
  keywords: [
    "free chess tools",
    "chess puzzle online",
    "daily chess puzzle",
    "chess opening explorer",
    "chess live TV",
    "watch chess grandmaster live",
    "chess leaderboard",
    "free chess practice",
    "chess tactics online free",
    "chess tools for students",
    "online chess practice",
    "chess learning tools free",
  ],
  alternates: { canonical: `${BASE}/explore` },
  openGraph: {
    title: "Free Chess Tools — Daily Puzzle, Live TV, Opening Explorer | KwinBee",
    description:
      "Practice chess for free: daily puzzles, live grandmaster games, opening explorer, and world leaderboard.",
    url: `${BASE}/explore`,
    type: "website",
    images: [{ url: `${BASE}/images/og-image.png`, width: 1200, height: 630, alt: "KwinBee Chess Hub" }],
  },
};

export default function ExplorePage() {
  return <ExploreHub />;
}
