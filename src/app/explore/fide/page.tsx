import ExploreFide from "@/components/ExploreFide";

const BASE = "https://www.kwinbee.com";

export const metadata = {
  title: "FIDE Tournament Calendar — Upcoming Chess Events | KwinBee",
  description:
    "Browse the official FIDE chess tournament calendar. Find upcoming World Championships, Grand Prix, Candidates, and international chess events worldwide.",
  keywords: [
    "FIDE chess calendar",
    "chess tournament schedule",
    "upcoming chess tournaments",
    "FIDE world championship",
    "chess events 2025",
    "international chess tournaments",
    "FIDE grand prix",
    "candidates tournament chess",
    "chess olympiad",
    "FIDE official calendar",
  ],
  alternates: { canonical: `${BASE}/explore/fide` },
  openGraph: {
    title: "FIDE Tournament Calendar — Upcoming Chess Events | KwinBee",
    description: "Official FIDE calendar with upcoming chess tournaments, World Championships, Grand Prix and more.",
    url: `${BASE}/explore/fide`,
    type: "website",
    images: [{ url: `${BASE}/images/og-image.png`, width: 1200, height: 630, alt: "KwinBee FIDE Calendar" }],
  },
};

export default function FidePage() {
  return <ExploreFide />;
}
