"use client";
import { useEffect, useState } from "react";
import ExploreLayout from "@/components/ExploreLayout";

type SpeedKey = "bullet" | "blitz" | "rapid" | "classical" | "puzzle";

interface LichessUser {
  id: string;
  username: string;
  perfs: Record<SpeedKey, { rating: number; progress: number }>;
  title?: string;
  online?: boolean;
  patron?: boolean;
}

const SPEEDS: { key: SpeedKey; label: string; emoji: string; color: string }[] = [
  { key: "blitz",     label: "Blitz",     emoji: "⚡", color: "#f9cb00" },
  { key: "bullet",    label: "Bullet",    emoji: "🔴", color: "#ef4444" },
  { key: "rapid",     label: "Rapid",     emoji: "⏱", color: "#4ade80" },
  { key: "classical", label: "Classical", emoji: "🎓", color: "#60a5fa" },
  { key: "puzzle",    label: "Puzzles",   emoji: "🧩", color: "#a78bfa" },
];

const MEDALS = ["🥇", "🥈", "🥉"];

export default function ExploreLeaderboard() {
  const [speed, setSpeed] = useState<SpeedKey>("blitz");
  const [players, setPlayers] = useState<LichessUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    fetch(`https://lichess.org/api/player/top/10/${speed}`, {
      headers: { Accept: "application/json" },
    })
      .then((r) => r.json())
      .then((data) => {
        setPlayers(data.users ?? []);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [speed]);

  const activeSpeed = SPEEDS.find((s) => s.key === speed)!;

  return (
    <ExploreLayout title="Leaderboard">
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "40px 24px 80px" }}>
        {/* Header */}
        <div style={{ marginBottom: "28px" }}>
          <h1 style={{ fontSize: "clamp(22px, 4vw, 32px)", fontWeight: 800, marginBottom: "6px" }}>
            🏆 Leaderboard
          </h1>
          <p style={{ color: "#9ca3af", fontSize: "13px" }}>
            Top 10 players on Lichess by time control. Updated live from Lichess.
          </p>
        </div>

        {/* Speed tabs */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "28px" }}>
          {SPEEDS.map((s) => (
            <button
              key={s.key}
              onClick={() => setSpeed(s.key)}
              style={{
                padding: "8px 18px",
                borderRadius: "10px",
                border: `1px solid ${speed === s.key ? s.color : "rgba(255,255,255,0.1)"}`,
                backgroundColor: speed === s.key ? `${s.color}20` : "rgba(255,255,255,0.04)",
                color: speed === s.key ? s.color : "#9ca3af",
                fontSize: "13px",
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              {s.emoji} {s.label}
            </button>
          ))}
        </div>

        {loading && (
          <div style={{ textAlign: "center", color: "#9ca3af", padding: "60px 0" }}>
            <div style={{ fontSize: "32px", marginBottom: "12px" }}>⏳</div>
            Loading top players…
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
              Couldn&apos;t load leaderboard. Please check your connection.
            </p>
          </div>
        )}

        {!loading && !error && (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {players.map((player, i) => {
              const rating = player.perfs?.[speed]?.rating ?? "—";
              const progress = player.perfs?.[speed]?.progress ?? 0;

              return (
                <a
                  key={player.id}
                  href={`https://lichess.org/@/${player.username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none" }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                      backgroundColor: i < 3 ? `${activeSpeed.color}0d` : "rgba(255,255,255,0.03)",
                      border: `1px solid ${i < 3 ? `${activeSpeed.color}30` : "rgba(255,255,255,0.07)"}`,
                      borderRadius: "14px",
                      padding: "14px 18px",
                      transition: "background-color 0.15s",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLDivElement).style.backgroundColor =
                        `${activeSpeed.color}18`)
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLDivElement).style.backgroundColor =
                        i < 3 ? `${activeSpeed.color}0d` : "rgba(255,255,255,0.03)")
                    }
                  >
                    {/* Rank */}
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        backgroundColor: i < 3 ? `${activeSpeed.color}25` : "rgba(255,255,255,0.06)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: i < 3 ? "18px" : "14px",
                        fontWeight: 800,
                        color: i < 3 ? activeSpeed.color : "#6b7280",
                        flexShrink: 0,
                      }}
                    >
                      {i < 3 ? MEDALS[i] : i + 1}
                    </div>

                    {/* Player info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          marginBottom: "2px",
                        }}
                      >
                        {player.title && (
                          <span
                            style={{
                              fontSize: "10px",
                              fontWeight: 800,
                              color: "#f9cb00",
                              backgroundColor: "rgba(249,203,0,0.12)",
                              padding: "1px 5px",
                              borderRadius: "4px",
                            }}
                          >
                            {player.title}
                          </span>
                        )}
                        <span
                          style={{
                            fontSize: "15px",
                            fontWeight: 700,
                            color: "#fff",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {player.username}
                        </span>
                        {player.online && (
                          <span
                            style={{
                              display: "inline-block",
                              width: "7px",
                              height: "7px",
                              borderRadius: "50%",
                              backgroundColor: "#4ade80",
                              flexShrink: 0,
                            }}
                          />
                        )}
                        {player.patron && (
                          <span style={{ fontSize: "12px", flexShrink: 0 }}>🍵</span>
                        )}
                      </div>
                      <div style={{ color: "#6b7280", fontSize: "11px" }}>
                        View profile on Lichess ↗
                      </div>
                    </div>

                    {/* Rating */}
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div
                        style={{
                          fontSize: "20px",
                          fontWeight: 800,
                          color: activeSpeed.color,
                        }}
                      >
                        {rating}
                      </div>
                      {progress !== 0 && (
                        <div
                          style={{
                            fontSize: "11px",
                            fontWeight: 600,
                            color: progress > 0 ? "#4ade80" : "#ef4444",
                          }}
                        >
                          {progress > 0 ? "▲" : "▼"} {Math.abs(progress)}
                        </div>
                      )}
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        )}

        {/* Footer note */}
        <div
          style={{
            textAlign: "center",
            marginTop: "36px",
            color: "#4b5563",
            fontSize: "12px",
          }}
        >
          Data from{" "}
          <a
            href="https://lichess.org/player"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#6b7280", textDecoration: "underline" }}
          >
            lichess.org/player
          </a>{" "}
          · Refreshes on tab change
        </div>
      </div>
    </ExploreLayout>
  );
}
