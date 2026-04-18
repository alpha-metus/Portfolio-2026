"use client";
import { useState } from "react";
import ExploreLayout from "@/components/ExploreLayout";

const CHANNELS = [
  { id: "best",        label: "⭐ Best",        desc: "Best game right now" },
  { id: "bullet",      label: "⚡ Bullet",      desc: "Blitz games < 1 min" },
  { id: "blitz",       label: "🔥 Blitz",       desc: "3–5 min games" },
  { id: "rapid",       label: "⏱ Rapid",        desc: "10–30 min games" },
  { id: "classical",   label: "🎓 Classical",   desc: "Slow, deep games" },
  { id: "chess960",    label: "♻ Chess960",     desc: "Random start positions" },
  { id: "computer",    label: "🤖 vs Computer", desc: "Human vs engine" },
  { id: "titled",      label: "👑 Titled",      desc: "GM/IM/FM players" },
];

export default function ExploreLive() {
  const [channel, setChannel] = useState("best");

  return (
    <ExploreLayout title="Live Chess TV">
      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "40px 24px 80px" }}>
        {/* Header */}
        <div style={{ marginBottom: "28px" }}>
          <h1 style={{ fontSize: "clamp(22px, 4vw, 32px)", fontWeight: 800, marginBottom: "6px" }}>
            📺 Live Chess TV
          </h1>
          <p style={{ color: "#9ca3af", fontSize: "13px" }}>
            Watch top players battle live. Pick a channel below and learn from the best.
          </p>
        </div>

        {/* Channel selector */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
            marginBottom: "24px",
          }}
        >
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

        {/* Active channel info */}
        <div style={{ color: "#6b7280", fontSize: "12px", marginBottom: "16px" }}>
          {CHANNELS.find((c) => c.id === channel)?.desc}
        </div>

        {/* Embed — uses Lichess official embed endpoint */}
        <div
          style={{
            borderRadius: "20px",
            overflow: "hidden",
            border: "1px solid rgba(74,222,128,0.2)",
            position: "relative",
            paddingBottom: "56.25%", // 16:9
            marginBottom: "28px",
          }}
        >
          <iframe
            key={channel}
            src={`https://lichess.org/tv/embed/${channel}?theme=brown&bg=dark`}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              border: "none",
            }}
            title={`Lichess TV — ${channel}`}
            allow="fullscreen"
          />
        </div>

        {/* Live indicator */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "32px",
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: "#4ade80",
              boxShadow: "0 0 8px #4ade80",
              animation: "pulse 1.5s infinite",
            }}
          />
          <span style={{ color: "#4ade80", fontSize: "13px", fontWeight: 600 }}>Live now</span>
          <span style={{ color: "#6b7280", fontSize: "12px" }}>
            · Auto-refreshes when a new game starts
          </span>
        </div>

        {/* Tips */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "16px",
          }}
        >
          {[
            { icon: "👁", tip: "Watch how strong players handle the opening" },
            { icon: "⚔️", tip: "Study middlegame tactics from real games" },
            { icon: "🏁", tip: "See endgame technique from the grandmasters" },
            { icon: "📝", tip: "Take notes and try to guess the next move" },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                backgroundColor: "rgba(74,222,128,0.06)",
                border: "1px solid rgba(74,222,128,0.15)",
                borderRadius: "14px",
                padding: "16px",
                fontSize: "13px",
                color: "#9ca3af",
                display: "flex",
                gap: "10px",
                alignItems: "flex-start",
              }}
            >
              <span style={{ fontSize: "18px", flexShrink: 0 }}>{item.icon}</span>
              {item.tip}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </ExploreLayout>
  );
}
