"use client";
import { useEffect, useState, useRef } from "react";
import { Chessboard } from "react-chessboard";
import ExploreLayout from "@/components/ExploreLayout";

interface TVPlayer {
  color: string;
  user?: { name: string; title?: string };
  rating?: number;
}

interface TVState {
  fen: string;
  orientation: "white" | "black";
  players: TVPlayer[];
  gameId: string;
  lastMove: string | null;
}

const CHANNELS = [
  { id: "best",       label: "⭐ Best",        feedPath: "" },
  { id: "blitz",      label: "🔥 Blitz",       feedPath: "blitz/" },
  { id: "bullet",     label: "⚡ Bullet",      feedPath: "bullet/" },
  { id: "rapid",      label: "⏱ Rapid",        feedPath: "rapid/" },
  { id: "classical",  label: "🎓 Classical",   feedPath: "classical/" },
  { id: "chess960",   label: "♻ Chess960",     feedPath: "chess960/" },
  { id: "computer",   label: "🤖 vs Computer", feedPath: "bot/" },
];

function playerLabel(p?: TVPlayer) {
  if (!p?.user) return "?";
  return (p.user.title ? `${p.user.title} ` : "") + p.user.name + (p.rating ? ` (${p.rating})` : "");
}

export default function ExploreLive() {
  const [channel, setChannel] = useState("blitz");
  const [tvState, setTvState] = useState<TVState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    // Abort previous stream
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(false);
    setTvState(null);

    const ch = CHANNELS.find((c) => c.id === channel)!;
    const url = `https://lichess.org/api/tv/${ch.feedPath}feed`;

    (async () => {
      try {
        const resp = await fetch(url, {
          signal: controller.signal,
          headers: { Accept: "application/x-ndjson" },
        });

        if (!resp.ok || !resp.body) {
          setError(true);
          setLoading(false);
          return;
        }

        const reader = resp.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            if (!line.trim()) continue;
            try {
              const event = JSON.parse(line);

              if (event.t === "featured") {
                setTvState({
                  fen: event.d.fen,
                  orientation: event.d.orientation ?? "white",
                  players: event.d.players ?? [],
                  gameId: event.d.id,
                  lastMove: null,
                });
                setLoading(false);
              } else if (event.t === "fen") {
                setTvState((prev) =>
                  prev
                    ? { ...prev, fen: event.d.fen, lastMove: event.d.lm ?? null }
                    : prev
                );
              }
            } catch {
              // skip bad JSON
            }
          }
        }
      } catch (err: unknown) {
        if (err instanceof Error && err.name === "AbortError") return;
        setError(true);
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, [channel]);

  const whitePlayer = tvState?.players.find((p) => p.color === "white");
  const blackPlayer = tvState?.players.find((p) => p.color === "black");

  // Highlight last move squares
  const customSquareStyles: Record<string, React.CSSProperties> = {};
  if (tvState?.lastMove && tvState.lastMove.length >= 4) {
    const from = tvState.lastMove.slice(0, 2);
    const to   = tvState.lastMove.slice(2, 4);
    customSquareStyles[from] = { backgroundColor: "rgba(249,203,0,0.35)" };
    customSquareStyles[to]   = { backgroundColor: "rgba(249,203,0,0.5)" };
  }

  return (
    <ExploreLayout title="Live Chess TV">
      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "32px 20px 80px" }}>

        {/* Header */}
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "clamp(22px, 4vw, 30px)", fontWeight: 800, marginBottom: "4px" }}>
            📺 Live Chess TV
          </h1>
          <p style={{ color: "#9ca3af", fontSize: "13px" }}>
            Real-time grandmaster games — streamed live, move by move.
          </p>
        </div>

        {/* Channel tabs */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "24px" }}>
          {CHANNELS.map((ch) => (
            <button
              key={ch.id}
              onClick={() => setChannel(ch.id)}
              style={{
                padding: "8px 16px", borderRadius: "10px",
                border: `1px solid ${channel === ch.id ? "#4ade80" : "rgba(255,255,255,0.1)"}`,
                backgroundColor: channel === ch.id ? "rgba(74,222,128,0.15)" : "rgba(255,255,255,0.04)",
                color: channel === ch.id ? "#4ade80" : "#9ca3af",
                fontSize: "13px", fontWeight: 600, cursor: "pointer",
              }}
            >
              {ch.label}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && !error && (
          <div style={{ textAlign: "center", color: "#9ca3af", padding: "80px 0" }}>
            <div style={{ fontSize: "36px", marginBottom: "12px" }}>⏳</div>
            Connecting to live game…
          </div>
        )}

        {/* Error */}
        {error && (
          <div style={{
            backgroundColor: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)",
            borderRadius: "16px", padding: "32px", textAlign: "center",
          }}>
            <div style={{ fontSize: "32px", marginBottom: "12px" }}>⚠️</div>
            <p style={{ color: "#fca5a5", marginBottom: "16px" }}>
              Couldn&apos;t connect to the live stream.
            </p>
            <a
              href="https://lichess.org/tv"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                backgroundColor: "#4ade80", color: "#000",
                fontWeight: 800, fontSize: "13px",
                padding: "10px 22px", borderRadius: "10px", textDecoration: "none",
              }}
            >
              Watch on Lichess.org ↗
            </a>
          </div>
        )}

        {/* Live board */}
        {!loading && !error && tvState && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 260px", gap: "24px", alignItems: "start" }} className="tv-grid">

            {/* Board */}
            <div>
              {/* Black player (top) */}
              <div style={{
                display: "flex", alignItems: "center", gap: "10px",
                backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "10px", padding: "10px 14px", marginBottom: "8px",
              }}>
                <span style={{ fontSize: "16px" }}>⬛</span>
                <span style={{ color: "#e5e7eb", fontWeight: 600, fontSize: "14px" }}>
                  {tvState.orientation === "white"
                    ? playerLabel(blackPlayer)
                    : playerLabel(whitePlayer)}
                </span>
              </div>

              {/* Board */}
              <div style={{ borderRadius: "14px", overflow: "hidden", border: "2px solid rgba(74,222,128,0.2)" }}>
                <Chessboard
                  position={tvState.fen}
                  boardOrientation={tvState.orientation}
                  arePiecesDraggable={false}
                  customDarkSquareStyle={{ backgroundColor: "#b58863" }}
                  customLightSquareStyle={{ backgroundColor: "#f0d9b5" }}
                  customSquareStyles={customSquareStyles}
                  animationDuration={200}
                />
              </div>

              {/* White player (bottom) */}
              <div style={{
                display: "flex", alignItems: "center", gap: "10px",
                backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "10px", padding: "10px 14px", marginTop: "8px",
              }}>
                <span style={{ fontSize: "16px" }}>⬜</span>
                <span style={{ color: "#e5e7eb", fontWeight: 600, fontSize: "14px" }}>
                  {tvState.orientation === "white"
                    ? playerLabel(whitePlayer)
                    : playerLabel(blackPlayer)}
                </span>
              </div>
            </div>

            {/* Side panel */}
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>

              {/* Live badge */}
              <div style={{
                display: "flex", alignItems: "center", gap: "8px",
                backgroundColor: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.2)",
                borderRadius: "12px", padding: "12px 16px",
              }}>
                <span style={{
                  display: "inline-block", width: "8px", height: "8px",
                  borderRadius: "50%", backgroundColor: "#4ade80",
                  boxShadow: "0 0 8px #4ade80", animation: "pulse 1.5s infinite", flexShrink: 0,
                }} />
                <div>
                  <div style={{ color: "#4ade80", fontWeight: 700, fontSize: "13px" }}>Live Now</div>
                  <div style={{ color: "#6b7280", fontSize: "11px", marginTop: "2px" }}>
                    Updates with every move
                  </div>
                </div>
              </div>

              {/* Open on Lichess */}
              {tvState.gameId && (
                <a
                  href={`https://lichess.org/${tvState.gameId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
                    backgroundColor: "#4ade80", color: "#000",
                    fontWeight: 800, fontSize: "13px",
                    padding: "11px 16px", borderRadius: "10px", textDecoration: "none",
                    textAlign: "center",
                  }}
                >
                  Open on Lichess ↗
                </a>
              )}

              {/* Tips */}
              {[
                { icon: "👁", tip: "Watch how strong players handle the opening" },
                { icon: "⚔️", tip: "Spot tactics before they play them" },
                { icon: "🏁", tip: "Study endgame technique live" },
                { icon: "📝", tip: "Guess the next move before it happens" },
              ].map((item, i) => (
                <div key={i} style={{
                  backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "10px", padding: "12px",
                  fontSize: "12px", color: "#6b7280",
                  display: "flex", gap: "8px", alignItems: "flex-start",
                }}>
                  <span style={{ fontSize: "14px", flexShrink: 0 }}>{item.icon}</span>
                  {item.tip}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        @media (max-width: 640px) { .tv-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </ExploreLayout>
  );
}
