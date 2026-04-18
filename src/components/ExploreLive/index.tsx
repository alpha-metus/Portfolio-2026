"use client";
import { useEffect, useState } from "react";
import ExploreLayout from "@/components/ExploreLayout";

type ChannelKey =
  | "best" | "bullet" | "blitz" | "rapid" | "classical"
  | "chess960" | "crazyhouse" | "antichess" | "computer";

const CHANNELS: { id: ChannelKey; label: string; desc: string; apiKey: string }[] = [
  { id: "best",       label: "⭐ Best",        desc: "Highest-rated game live",    apiKey: "Top Rated" },
  { id: "bullet",     label: "⚡ Bullet",      desc: "Games under 1 minute",       apiKey: "Bullet" },
  { id: "blitz",      label: "🔥 Blitz",       desc: "3–5 minute games",           apiKey: "Blitz" },
  { id: "rapid",      label: "⏱ Rapid",        desc: "10–30 minute games",         apiKey: "Rapid" },
  { id: "classical",  label: "🎓 Classical",   desc: "Slow, deep games",           apiKey: "Classical" },
  { id: "chess960",   label: "♻ Chess960",     desc: "Random starting positions",  apiKey: "Chess960" },
  { id: "computer",   label: "🤖 vs Computer", desc: "Human vs engine",            apiKey: "Bot" },
];

interface ChannelData {
  gameId: string;
  rating: number;
  user: { name: string; title?: string };
  color: string;
}

export default function ExploreLive() {
  const [channel, setChannel] = useState<ChannelKey>("blitz");
  const [gameId, setGameId] = useState<string | null>(null);
  const [players, setPlayers] = useState<{ white?: ChannelData; black?: ChannelData } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    setGameId(null);

    fetch("https://lichess.org/api/tv/channels", {
      headers: { Accept: "application/json" },
    })
      .then((r) => r.json())
      .then((data) => {
        // Map our channel key to the Lichess API key
        const ch = CHANNELS.find((c) => c.id === channel);
        const apiKey = ch?.apiKey ?? "Blitz";
        const found = data[apiKey];
        if (found?.gameId) {
          setGameId(found.gameId);
          // Fetch game details for player names
          return fetch(`https://lichess.org/api/game/${found.gameId}?players=1`, {
            headers: { Accept: "application/json" },
          })
            .then((r) => r.json())
            .then((game) => {
              setPlayers({
                white: game.players?.white,
                black: game.players?.black,
              });
            })
            .catch(() => {});
        }
        setLoading(false);
      })
      .then(() => setLoading(false))
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [channel]);

  const activeChannel = CHANNELS.find((c) => c.id === channel)!;

  return (
    <ExploreLayout title="Live Chess TV">
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 24px 80px" }}>

        {/* Header */}
        <div style={{ marginBottom: "28px" }}>
          <h1 style={{ fontSize: "clamp(22px, 4vw, 32px)", fontWeight: 800, marginBottom: "6px" }}>
            📺 Live Chess TV
          </h1>
          <p style={{ color: "#9ca3af", fontSize: "13px" }}>
            Watch top players battle live. Pick a channel and learn from the best.
          </p>
        </div>

        {/* Channel selector */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "8px" }}>
          {CHANNELS.map((ch) => (
            <button
              key={ch.id}
              onClick={() => setChannel(ch.id)}
              style={{
                padding: "8px 16px",
                borderRadius: "10px",
                border: `1px solid ${channel === ch.id ? "#4ade80" : "rgba(255,255,255,0.1)"}`,
                backgroundColor: channel === ch.id ? "rgba(74,222,128,0.15)" : "rgba(255,255,255,0.04)",
                color: channel === ch.id ? "#4ade80" : "#9ca3af",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              {ch.label}
            </button>
          ))}
        </div>
        <p style={{ color: "#6b7280", fontSize: "12px", marginBottom: "20px" }}>
          {activeChannel.desc}
        </p>

        {loading && (
          <div style={{ textAlign: "center", color: "#9ca3af", padding: "80px 0" }}>
            <div style={{ fontSize: "36px", marginBottom: "12px" }}>⏳</div>
            Finding live game…
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
            <p style={{ color: "#fca5a5" }}>Couldn&apos;t load the live game. Please try again.</p>
          </div>
        )}

        {!loading && !error && gameId && (
          <>
            {/* Live badge */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
              <span
                style={{
                  display: "inline-block",
                  width: "8px", height: "8px",
                  borderRadius: "50%",
                  backgroundColor: "#4ade80",
                  boxShadow: "0 0 8px #4ade80",
                  animation: "pulse 1.5s infinite",
                }}
              />
              <span style={{ color: "#4ade80", fontSize: "13px", fontWeight: 700 }}>Live now</span>
              {players?.white && players?.black && (
                <span style={{ color: "#6b7280", fontSize: "12px" }}>
                  · {players.white.user?.title ? `${players.white.user.title} ` : ""}
                  {players.white.user?.name} vs{" "}
                  {players.black.user?.title ? `${players.black.user.title} ` : ""}
                  {players.black.user?.name}
                </span>
              )}
            </div>

            {/* Embedded game — Lichess official game embed */}
            <div
              style={{
                borderRadius: "16px",
                overflow: "hidden",
                border: "1px solid rgba(74,222,128,0.2)",
                position: "relative",
                paddingBottom: "56.25%",
                marginBottom: "24px",
              }}
            >
              <iframe
                key={gameId}
                src={`https://lichess.org/embed/game/${gameId}?theme=brown&bg=dark`}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
                title="Live Chess Game"
                allow="fullscreen"
              />
            </div>

            {/* Open on Lichess */}
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
              <a
                href={`https://lichess.org/${gameId}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  backgroundColor: "#4ade80", color: "#000",
                  fontWeight: 800, fontSize: "13px",
                  padding: "10px 22px", borderRadius: "10px", textDecoration: "none",
                }}
              >
                Watch Full Game on Lichess ↗
              </a>
              <a
                href="https://lichess.org/tv"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#6b7280", fontSize: "13px", fontWeight: 600, textDecoration: "none",
                }}
              >
                Browse all TV channels →
              </a>
            </div>
          </>
        )}

        {/* Tips */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "14px",
            marginTop: "40px",
          }}
        >
          {[
            { icon: "👁", tip: "Watch how strong players handle the opening" },
            { icon: "⚔️", tip: "Study middlegame tactics from real games" },
            { icon: "🏁", tip: "See endgame technique from grandmasters" },
            { icon: "📝", tip: "Try to guess the next move before they play it" },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                backgroundColor: "rgba(74,222,128,0.05)",
                border: "1px solid rgba(74,222,128,0.12)",
                borderRadius: "12px",
                padding: "14px",
                fontSize: "12px",
                color: "#9ca3af",
                display: "flex", gap: "10px", alignItems: "flex-start",
              }}
            >
              <span style={{ fontSize: "16px", flexShrink: 0 }}>{item.icon}</span>
              {item.tip}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
      `}</style>
    </ExploreLayout>
  );
}
