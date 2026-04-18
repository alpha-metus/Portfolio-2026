"use client";
import { useState } from "react";
import ExploreLayout from "@/components/ExploreLayout";

type SpeedFilter = "all" | "bullet" | "blitz" | "rapid" | "classical" | "correspondence";

const OPENINGS = [
  { name: "Italian Game",          moves: "e4 e5 Nf3 Nc6 Bc4",       eco: "C50", level: "Beginner" },
  { name: "Ruy López",             moves: "e4 e5 Nf3 Nc6 Bb5",       eco: "C60", level: "Intermediate" },
  { name: "Sicilian Defence",      moves: "e4 c5",                    eco: "B20", level: "Intermediate" },
  { name: "Queen's Gambit",        moves: "d4 d5 c4",                 eco: "D06", level: "Intermediate" },
  { name: "King's Indian Defence", moves: "d4 Nf6 c4 g6 Nc3 Bg7",    eco: "E60", level: "Advanced" },
  { name: "French Defence",        moves: "e4 e6",                    eco: "C00", level: "Beginner" },
  { name: "Caro-Kann Defence",     moves: "e4 c6",                    eco: "B10", level: "Intermediate" },
  { name: "London System",         moves: "d4 d5 Nf3 Nf6 Bf4",       eco: "D02", level: "Beginner" },
];

const SPEEDS: { id: SpeedFilter; label: string }[] = [
  { id: "all",            label: "All" },
  { id: "blitz",          label: "⚡ Blitz" },
  { id: "rapid",          label: "⏱ Rapid" },
  { id: "classical",      label: "🎓 Classical" },
  { id: "bullet",         label: "🔴 Bullet" },
  { id: "correspondence", label: "✉ Correspondence" },
];

export default function ExploreOpenings() {
  const [selected, setSelected] = useState(OPENINGS[0]);
  const [speed, setSpeed] = useState<SpeedFilter>("blitz");

  // Build iframe src — Lichess opening explorer
  const encodedMoves = encodeURIComponent(selected.moves);
  const iframeSrc = `https://lichess.org/analysis#${encodedMoves}?db=lichess&speed=${speed}&bg=dark&theme=brown`;

  return (
    <ExploreLayout title="Opening Explorer">
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 24px 80px" }}>
        {/* Header */}
        <div style={{ marginBottom: "28px" }}>
          <h1 style={{ fontSize: "clamp(22px, 4vw, 32px)", fontWeight: 800, marginBottom: "6px" }}>
            📖 Opening Explorer
          </h1>
          <p style={{ color: "#9ca3af", fontSize: "13px" }}>
            Study how top players handle chess openings. Click an opening, adjust speed, and explore!
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "260px 1fr",
            gap: "24px",
            alignItems: "start",
          }}
          className="opening-grid"
        >
          {/* Sidebar — opening list */}
          <div>
            <div
              style={{
                fontSize: "11px",
                fontWeight: 700,
                color: "#6b7280",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                marginBottom: "10px",
              }}
            >
              Select Opening
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {OPENINGS.map((op) => (
                <button
                  key={op.eco}
                  onClick={() => setSelected(op)}
                  style={{
                    textAlign: "left",
                    padding: "12px 14px",
                    borderRadius: "12px",
                    border: `1px solid ${selected.eco === op.eco ? "rgba(96,165,250,0.4)" : "rgba(255,255,255,0.07)"}`,
                    backgroundColor: selected.eco === op.eco ? "rgba(96,165,250,0.12)" : "rgba(255,255,255,0.03)",
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                >
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: selected.eco === op.eco ? "#93c5fd" : "#e5e7eb",
                      marginBottom: "3px",
                    }}
                  >
                    {op.name}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "10px",
                        color: "#6b7280",
                        fontFamily: "monospace",
                      }}
                    >
                      {op.eco}
                    </span>
                    <span
                      style={{
                        fontSize: "10px",
                        color:
                          op.level === "Beginner"
                            ? "#4ade80"
                            : op.level === "Intermediate"
                            ? "#f9cb00"
                            : "#f97316",
                        backgroundColor:
                          op.level === "Beginner"
                            ? "rgba(74,222,128,0.1)"
                            : op.level === "Intermediate"
                            ? "rgba(249,203,0,0.1)"
                            : "rgba(249,115,22,0.1)",
                        padding: "1px 6px",
                        borderRadius: "999px",
                        fontWeight: 600,
                      }}
                    >
                      {op.level}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Main panel */}
          <div>
            {/* Speed filter */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "16px" }}>
              {SPEEDS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSpeed(s.id)}
                  style={{
                    padding: "6px 14px",
                    borderRadius: "8px",
                    border: `1px solid ${speed === s.id ? "rgba(96,165,250,0.4)" : "rgba(255,255,255,0.1)"}`,
                    backgroundColor: speed === s.id ? "rgba(96,165,250,0.15)" : "rgba(255,255,255,0.04)",
                    color: speed === s.id ? "#93c5fd" : "#9ca3af",
                    fontSize: "12px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* Opening info */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "16px",
                flexWrap: "wrap",
              }}
            >
              <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#fff" }}>
                {selected.name}
              </h2>
              <code
                style={{
                  fontSize: "12px",
                  backgroundColor: "rgba(255,255,255,0.06)",
                  color: "#9ca3af",
                  padding: "3px 10px",
                  borderRadius: "6px",
                }}
              >
                {selected.moves}
              </code>
            </div>

            {/* Iframe — Lichess analysis board */}
            <div
              style={{
                borderRadius: "16px",
                overflow: "hidden",
                border: "1px solid rgba(96,165,250,0.2)",
                position: "relative",
                paddingBottom: "66%",
                marginBottom: "16px",
              }}
            >
              <iframe
                key={`${selected.eco}-${speed}`}
                src={iframeSrc}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  border: "none",
                }}
                title={`Opening Explorer — ${selected.name}`}
                allow="fullscreen"
              />
            </div>

            {/* Open on Lichess */}
            <a
              href={`https://lichess.org/analysis?fen=startpos&moves=${encodeURIComponent(selected.moves.replace(/ /g, "_"))}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                color: "#60a5fa",
                fontSize: "13px",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Open in Lichess Analysis Board ↗
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .opening-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </ExploreLayout>
  );
}
