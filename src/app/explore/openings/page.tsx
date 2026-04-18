import ExploreOpenings from "@/components/ExploreOpenings";

const BASE = "https://www.kwinbee.com";

export const metadata = {
  title: "Chess Opening Explorer — Study All Chess Openings Free | KwinBee",
  description:
    "Explore and study chess openings interactively. Browse win/draw/loss statistics for every opening line including Sicilian Defense, King's Indian, French Defense, Ruy Lopez, Queen's Gambit, and hundreds more. Powered by the Lichess database.",
  keywords: [
    "chess opening explorer",
    "chess openings database",
    "study chess openings",
    "chess opening statistics",
    "Sicilian Defense",
    "King's Indian Defense",
    "French Defense chess",
    "Ruy Lopez opening",
    "Queen's Gambit",
    "Caro-Kann Defense",
    "English Opening chess",
    "chess opening theory",
    "best chess openings for beginners",
    "chess opening repertoire",
    "chess opening analysis",
    "interactive chess openings",
    "lichess opening explorer",
    "chess opening win rate",
  ],
  alternates: { canonical: `${BASE}/explore/openings` },
  openGraph: {
    title: "Chess Opening Explorer — Study All Chess Openings Free | KwinBee",
    description: "Interactive chess opening database with win/draw/loss stats. Study Sicilian, Queen's Gambit, Ruy Lopez and 500+ more openings.",
    url: `${BASE}/explore/openings`,
    type: "website",
    images: [{ url: `${BASE}/images/og-image.png`, width: 1200, height: 630, alt: "KwinBee Chess Opening Explorer" }],
  },
};

export default function OpeningsPage() {
  return <ExploreOpenings />;
}
