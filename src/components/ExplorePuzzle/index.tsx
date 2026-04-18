"use client";
import { useEffect, useState } from "react";
import ExploreLayout from "@/components/ExploreLayout";

interface PuzzleData {
  puzzle: {
    id: string;
    initialPly: number;
    solution: string[];
    themes: string[];
    rating: number;
  };
  game: {
    pgn: string;
    players: { color: string; user?: { name: string }; rating: number }[];
  };
}

export default function ExplorePuzzle() {
  const [puzzle, setPuzzle] = useState<PuzzleData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    fetch("https://lichess.org/api/puzzle/daily", {
      headers: { Accept: "application/json" },
    })
      .then((r) => r.json())
      .then((data) => {
        setPuzzle(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const puzzleId = puzzle?.puzzle?.id;
  const themes = puzzle?.puzzle?.themes ?? [];
  const rating = puzzle?.puzzle?.rating;
  const solution = puzzle?.puzzle?.solution ?? [];
  const players = puzzle?.game?.players ?? [];

  return (
    <ExploreLayout title="Daily Puzzle">
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "40px 24px 80px" }}>
        {/* Header strip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "28px",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div>
            <h1 style={{ fontSize: "clamp(22px, 4vw, 32px)", fontWeight: 800, marginBottom: "6px" }}>
              🧩 Daily Puzzle
            </h1>
            <p style={{ color: "#9ca3af", fontSize: "13px" }}>
              A new Lichess puzzle every day — solve it &amp; sharpen your tactics!
            </p>
          </div>
          {rating && (
            <div
              style={{
                backgroundColor: "rgba(249,203,0,0.12)",
                border: "1px solid rgba(249,203,0,0.3)",
                borderRadius: "12px",
                padding: "8px 16px",
                textAlign: "center",
              }}
            >
              <div style={{ color: "#f9cb00", fontWeight: 800, fontSize: "20px" }}>{rating}</div>
              <div style={{ color: "#9ca3af", fontSize: "11px" }}>Puzzle Rating</div>
            </div>
          )}
        </div>

        {loading && (
          <div style={{ textAlign: "center", color: "#9ca3af", padding: "60px 0" }}>
            <div style={{ fontSize: "32px", marginBottom: "12px" }}>⏳</div>
            Loading today&apos;s puzzle…
          </div>
        )}

        {error && (
          <div
            style={{
              backgroundColor: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.3)",
              borderRadius: "16px",
              padding: "32px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "32px", marginBottom: "12px" }}>⚠️</div>
            <p style={{ color: "#fca5a5" }}>
              Couldn&apos;t load the puzzle. Please check your connection and refresh.
            </p>
          </div>
        )}

        {!loading && !error && puzzle && puzzleId && (
          <>
            {/* Embedded interactive board */}
            <div
              style={{
                borderRadius: "20px",
                overflow: "hidden",
                border: "1px solid rgba(249,203,0,0.2)",
                marginBottom: "28px",
                position: "relative",
                paddingBottom: "100%", // square
              }}
            >
              <iframe
                src={`https://lichess.org/training/${puzzleId}?theme=brown&bg=dark`}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  border: "none",
                }}
                title="Daily Chess Puzzle"
                allow="fullscreen"
              />
            </div>

            {/* Meta row */}
            <div
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
                marginBottom: "24px",
              }}
            >
              {themes.slice(0, 5).map((t) => (
                <span
                  key={t}
                  style={{
                    backgroundColor: "rgba(96,165,250,0.12)",
                    border: "1px solid rgba(96,165,250,0.25)",
                    color: "#93c5fd",
                    fontSize: "11px",
                    fontWeight: 600,
                    padding: "4px 10px",
                    borderRadius: "999px",
                    textTransform: "capitalize",
                  }}
                >
                  {t.replace(/([A-Z])/g, " $1").trim()}
                </span>
              ))}
            </div>

            {/* Players from original game */}
            {players.length === 2 && (
              <div
                style={{
                  backgroundColor: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "14px",
                  padding: "16px 20px",
                  marginBottom: "24px",
                  display: "flex",
                  gap: "16px",
                  flexWrap: "wrap",
                }}
              >
                <span style={{ color: "#9ca3af", fontSize: "12px", width: "100%" }}>
                  From the game:
                </span>
                {players.map((p) => (
                  <div key={p.color} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontSize: "16px" }}>{p.color === "white" ? "⬜" : "⬛"}</span>
                    <span style={{ color: "#fff", fontWeight: 600, fontSize: "13px" }}>
                      {p.user?.name ?? p.color}
                    </span>
                    <span style={{ color: "#6b7280", fontSize: "12px" }}>({p.rating})</span>
                  </div>
                ))}
              </div>
            )}

            {/* Solution reveal */}
            <div
              style={{
                backgroundColor: "rgba(249,203,0,0.06)",
                border: "1px solid rgba(249,203,0,0.2)",
                borderRadius: "16px",
                padding: "20px 24px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: revealed ? "14px" : "0",
                }}
              >
                <span style={{ color: "#f9cb00", fontWeight: 700, fontSize: "14px" }}>
                  💡 Solution
                </span>
                <button
                  onClick={() => setRevealed((r) => !r)}
                  style={{
                    backgroundColor: "rgba(249,203,0,0.15)",
                    border: "1px solid rgba(249,203,0,0.35)",
                    color: "#f9cb00",
                    fontSize: "12px",
                    fontWeight: 700,
                    padding: "6px 14px",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  {revealed ? "Hide" : "Reveal"}
                </button>
              </div>
              {revealed && (
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {solution.map((move, i) => (
                    <span
                      key={i}
                      style={{
                        backgroundColor: "rgba(249,203,0,0.15)",
                        color: "#fde68a",
                        fontFamily: "monospace",
                        fontSize: "14px",
                        fontWeight: 700,
                        padding: "4px 10px",
                        borderRadius: "8px",
                      }}
                    >
                      {i + 1}. {move}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Open on Lichess */}
            <div style={{ textAlign: "center", marginTop: "32px" }}>
              <a
                href={`https://lichess.org/training/${puzzleId}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  backgroundColor: "#f9cb00",
                  color: "#000",
                  fontWeight: 800,
                  fontSize: "14px",
                  padding: "12px 28px",
                  borderRadius: "12px",
                  textDecoration: "none",
                }}
              >
                Open Full Puzzle on Lichess ↗
              </a>
            </div>
          </>
        )}
      </div>
    </ExploreLayout>
  );
}
