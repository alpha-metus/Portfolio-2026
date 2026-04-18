import ExplorePuzzle from "@/components/ExplorePuzzle";

const BASE = "https://www.kwinbee.com";

export const metadata = {
  title: "Daily Chess Puzzle — Solve Today's Puzzle Free | KwinBee",
  description:
    "Solve today's free daily chess puzzle from Lichess. Practice chess tactics, combinations, and pattern recognition every day. Great for beginners and advanced players improving their chess skills.",
  keywords: [
    "daily chess puzzle",
    "chess puzzle of the day",
    "chess tactics puzzle",
    "free chess puzzle online",
    "chess puzzle for beginners",
    "solve chess puzzle",
    "chess combination puzzle",
    "chess pattern recognition",
    "interactive chess puzzle",
    "chess training puzzle",
    "lichess daily puzzle",
    "chess tactics trainer",
  ],
  alternates: { canonical: `${BASE}/explore/puzzle` },
  openGraph: {
    title: "Daily Chess Puzzle — Solve Today's Puzzle Free | KwinBee",
    description: "Sharpen your chess skills by solving today's free daily puzzle. New puzzle every day for all skill levels.",
    url: `${BASE}/explore/puzzle`,
    type: "website",
    images: [{ url: `${BASE}/images/og-image.png`, width: 1200, height: 630, alt: "KwinBee Daily Chess Puzzle" }],
  },
};

export default function PuzzlePage() {
  return <ExplorePuzzle />;
}
