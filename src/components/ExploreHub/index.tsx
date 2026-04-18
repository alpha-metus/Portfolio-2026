"use client";
import Link from "next/link";
import Image from "next/image";

const cards = [
  {
    href: "/explore/puzzle",
    emoji: "🧩",
    title: "Daily Puzzle",
    description: "Solve today's chess puzzle from Lichess. A new challenge every day — sharpen your tactics!",
    color: "#f9cb00",
    bg: "rgba(249,203,0,0.08)",
    border: "rgba(249,203,0,0.25)",
    badge: "Daily · Free",
  },
  {
    href: "/explore/live",
    emoji: "📺",
    title: "Live Chess TV",
    description: "Watch top grandmasters play live right now. Learn from the best games happening in real time.",
    color: "#4ade80",
    bg: "rgba(74,222,128,0.08)",
    border: "rgba(74,222,128,0.25)",
    badge: "Live · Free",
  },
  {
    href: "/explore/openings",
    emoji: "📖",
    title: "Opening Explorer",
    description: "Study chess openings with the Lichess database. Explore moves, win rates, and top games.",
    color: "#60a5fa",
    bg: "rgba(96,165,250,0.08)",
    border: "rgba(96,165,250,0.25)",
    badge: "Education · Free",
  },
  {
    href: "/explore/leaderboard",
    emoji: "🏆",
    title: "Leaderboard",
    description: "See the top-rated players on Lichess. Get inspired by the world's best and track your ranking.",
    color: "#f97316",
    bg: "rgba(249,115,22,0.08)",
    border: "rgba(249,115,22,0.25)",
    badge: "Rankings · Free",
  },
];

export default function ExploreHub() {
  return (
    <div style={{ backgroundColor: "#0d0404", minHeight: "100vh", color: "#fff" }}>
      {/* Sticky nav */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          backgroundColor: "rgba(13,4,4,0.95)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(249,203,0,0.12)",
          padding: "14px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link href="/">
          <Image
            src="/images/img_header_logo.png"
            width={100}
            height={28}
            alt="KwinBee"
            style={{ objectFit: "contain" }}
          />
        </Link>
        <span style={{ color: "#fff", fontWeight: 700, fontSize: "15px" }}>Chess Hub</span>
        <Link
          href="/"
          style={{ color: "#f9cb00", fontSize: "13px", fontWeight: 600, textDecoration: "none" }}
        >
          ← Home
        </Link>
      </div>

      {/* Hero */}
      <div style={{ textAlign: "center", padding: "60px 24px 40px" }}>
        <div style={{ fontSize: "48px", marginBottom: "16px" }}>♟</div>
        <h1
          style={{
            fontSize: "clamp(28px, 5vw, 48px)",
            fontWeight: 800,
            marginBottom: "14px",
            background: "linear-gradient(90deg, #f9cb00, #fff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          KwinBee Chess Hub
        </h1>
        <p
          style={{
            fontSize: "clamp(14px, 2vw, 17px)",
            color: "#9ca3af",
            maxWidth: "520px",
            margin: "0 auto",
            lineHeight: 1.6,
          }}
        >
          Free interactive tools for young chess learners — puzzles, live games, openings &amp; rankings, all in one place.
        </p>
      </div>

      {/* Cards grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "24px",
          maxWidth: "960px",
          margin: "0 auto",
          padding: "0 24px 80px",
        }}
      >
        {cards.map((card) => (
          <Link key={card.href} href={card.href} style={{ textDecoration: "none" }}>
            <div
              style={{
                backgroundColor: card.bg,
                border: `1px solid ${card.border}`,
                borderRadius: "20px",
                padding: "32px 28px",
                cursor: "pointer",
                transition: "transform 0.2s, box-shadow 0.2s",
                height: "100%",
                boxSizing: "border-box",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 20px 40px rgba(0,0,0,0.5), 0 0 24px ${card.color}30`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
              }}
            >
              {/* Badge */}
              <span
                style={{
                  display: "inline-block",
                  backgroundColor: `${card.color}20`,
                  color: card.color,
                  fontSize: "11px",
                  fontWeight: 700,
                  padding: "3px 10px",
                  borderRadius: "999px",
                  marginBottom: "18px",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                }}
              >
                {card.badge}
              </span>

              {/* Emoji */}
              <div style={{ fontSize: "38px", marginBottom: "14px" }}>{card.emoji}</div>

              {/* Title */}
              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "#fff",
                  marginBottom: "10px",
                }}
              >
                {card.title}
              </h2>

              {/* Description */}
              <p
                style={{
                  fontSize: "13px",
                  color: "#9ca3af",
                  lineHeight: 1.65,
                  marginBottom: "22px",
                }}
              >
                {card.description}
              </p>

              {/* CTA */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  color: card.color,
                  fontSize: "13px",
                  fontWeight: 700,
                }}
              >
                Open {card.title} <span style={{ fontSize: "16px" }}>→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Powered by strip */}
      <div
        style={{
          textAlign: "center",
          paddingBottom: "40px",
          color: "#4b5563",
          fontSize: "12px",
        }}
      >
        Powered by{" "}
        <a
          href="https://lichess.org"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#6b7280", textDecoration: "underline" }}
        >
          Lichess.org
        </a>{" "}
        — 100% free &amp; open source chess platform
      </div>
    </div>
  );
}
