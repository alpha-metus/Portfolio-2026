"use client";
import { useEffect, useState, useRef } from "react";
import { Chessboard } from "react-chessboard";
import ExploreLayout from "@/components/ExploreLayout";

interface TVPlayer {
  color: string;
  user?: { name: string; title?: string };
  rating?: number;
  seconds?: number;
}

interface TVState {
  fen: string;
  orientation: "white" | "black";
  players: TVPlayer[];
  gameId: string;
  lastMove: string | null;
  whiteSecs: number | null;
  blackSecs: number | null;
}

// Lichess TV API channel names are case-sensitive
const CHANNELS = [
  { id: "best",        label: "⭐ Best",          path: "" },
  { id: "ultraBullet", label: "🚀 UltraBullet",   path: "UltraBullet" },
  { id: "bullet",      label: "⚡ Bullet",        path: "Bullet" },
  { id: "blitz",       label: "🔥 Blitz",         path: "Blitz" },
  { id: "rapid",       label: "⏱ Rapid",          path: "Rapid" },
  { id: "classical",   label: "🎓 Classical",     path: "Classical" },
  { id: "chess960",    label: "♾ Chess960",       path: "Chess960" },
  { id: "koth",        label: "♛ King of Hill",   path: "King Of The Hill" },
  { id: "antichess",   label: "👻 Antichess",     path: "Antichess" },
  { id: "atomic",      label: "💥 Atomic",        path: "Atomic" },
  { id: "horde",       label: "⚔️ Horde",         path: "Horde" },
  { id: "computer",    label: "🤖 vs Computer",   path: "Computer" },
];

function playerLabel(p?: TVPlayer) {
  if (!p?.user) return "?";
  return (p.user.title ? `${p.user.title} ` : "") + p.user.name;
}

function fmtClock(secs: number | null): string {
  if (secs === null || secs < 0) return "--:--";
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function clockColor(secs: number | null): string {
  if (secs === null) return "#9ca3af";
  if (secs <= 10) return "#f87171";
  if (secs <= 30) return "#fbbf24";
  return "#e5e7eb";
}

export default function ExploreLive() {
  const [channel, setChannel] = useState("blitz");
  const [tvState, setTvState] = useState<TVState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(false);
    setTvState(null);

    const ch = CHANNELS.find((c) => c.id === channel)!;
    const url = ch.path
      ? `https://lichess.org/api/tv/${encodeURIComponent(ch.path)}/feed`
      : `https://lichess.org/api/tv/feed`;

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
                const wP = (event.d.players ?? []).find((p: TVPlayer) => p.color === "white");
                const bP = (event.d.players ?? []).find((p: TVPlayer) => p.color === "black");
                setTvState({
                  fen: event.d.fen,
                  orientation: event.d.orientation ?? "white",
                  players: event.d.players ?? [],
                  gameId: event.d.id,
                  lastMove: null,
                  whiteSecs: wP?.seconds ?? null,
                  blackSecs: bP?.seconds ?? null,
                });
                setLoading(false);
              } else if (event.t === "fen") {
                setTvState((prev) =>
                  prev ? {
                    ...prev,
                    fen: event.d.fen,
                    lastMove: event.d.lm ?? null,
                    // wc/bc are in centiseconds → convert to seconds
                    whiteSecs: event.d.wc != null ? Math.floor(event.d.wc / 100) : prev.whiteSecs,
                    blackSecs: event.d.bc != null ? Math.floor(event.d.bc / 100) : prev.blackSecs,
                  } : prev
                );
              }
            } catch {
              // skip malformed JSON
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

  // Top of board = opposite of orientation
  const topPlayer  = tvState?.orientation === "white" ? blackPlayer : whitePlayer;
  const topSecs    = tvState?.orientation === "white" ? tvState?.blackSecs : tvState?.whiteSecs;
  const bottomPlayer = tvState?.orientation === "white" ? whitePlayer : blackPlayer;
  const bottomSecs   = tvState?.orientation === "white" ? tvState?.whiteSecs : tvState?.blackSecs;

  const customSquareStyles: Record<string, React.CSSProperties> = {};
  if (tvState?.lastMove && tvState.lastMove.length >= 4) {
    customSquareStyles[tvState.lastMove.slice(0, 2)] = { backgroundColor: "rgba(249,203,0,0.35)" };
    customSquareStyles[tvState.lastMove.slice(2, 4)] = { backgroundColor: "rgba(249,203,0,0.55)" };
  }

  return (
    <ExploreLayout title="Live Chess TV">
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 20px 80px" }}>

        {/* Header */}
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ fontSize: "clamp(22px, 4vw, 30px)", fontWeight: 800, marginBottom: "4px" }}>
            📺 Live Chess TV
          </h1>
          <p style={{ color: "#9ca3af", fontSize: "13px" }}>
            Real-time grandmaster games — streamed live, move by move.
          </p>
        </div>

        {/* Channel tabs */}
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "24px" }}>
          {CHANNELS.map((ch) => (
            <button key={ch.id} onClick={() => setChannel(ch.id)}
              style={{
                padding: "7px 13px", borderRadius: "9px", fontSize: "12px", fontWeight: 600, cursor: "pointer",
                border: `1px solid ${channel === ch.id ? "#4ade80" : "rgba(255,255,255,0.1)"}`,
                backgroundColor: channel === ch.id ? "rgba(74,222,128,0.15)" : "rgba(255,255,255,0.04)",
                color: channel === ch.id ? "#4ade80" : "#9ca3af",
                transition: "all 0.15s",
              }}
            >
              {ch.label}
            </button>
          ))}
        </div>

        {loading && !error && (
          <div style={{ textAlign: "center", color: "#9ca3af", padding: "80px 0" }}>
            <div style={{ fontSize: "36px", marginBottom: "12px" }}>⏳</div>
            Connecting to live game…
          </div>
        )}

        {error && (
          <div style={{ backgroundColor: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "16px", padding: "32px", textAlign: "center" }}>
            <div style={{ fontSize: "32px", marginBottom: "12px" }}>⚠️</div>
            <p style={{ color: "#fca5a5", marginBottom: "16px" }}>
              Couldn&apos;t connect to the live stream. Try a different channel.
            </p>
            <a href="https://lichess.org/tv" target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "6px", backgroundColor: "#4ade80", color: "#000", fontWeight: 800, fontSize: "13px", padding: "10px 22px", borderRadius: "10px", textDecoration: "none" }}>
              Watch on Lichess.org ↗
            </a>
          </div>
        )}

        {!loading && !error && tvState && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 260px", gap: "24px", alignItems: "start" }} className="tv-grid">

            {/* Board */}
            <div>
              {/* Top player + clock */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", padding: "10px 14px", marginBottom: "8px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "15px" }}>{tvState.orientation === "white" ? "⬛" : "⬜"}</span>
                  <div>
                    <div style={{ color: "#e5e7eb", fontWeight: 700, fontSize: "14px" }}>{playerLabel(topPlayer)}</div>
                    {topPlayer?.rating && <div style={{ color: "#6b7280", fontSize: "11px" }}>Rating: {topPlayer.rating}</div>}
                  </div>
                </div>
                <div style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", padding: "6px 12px", fontFamily: "monospace", fontSize: "18px", fontWeight: 900, color: clockColor(topSecs ?? null) }}>
                  {fmtClock(topSecs ?? null)}
                </div>
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

              {/* Bottom player + clock */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", padding: "10px 14px", marginTop: "8px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "15px" }}>{tvState.orientation === "white" ? "⬜" : "⬛"}</span>
                  <div>
                    <div style={{ color: "#e5e7eb", fontWeight: 700, fontSize: "14px" }}>{playerLabel(bottomPlayer)}</div>
                    {bottomPlayer?.rating && <div style={{ color: "#6b7280", fontSize: "11px" }}>Rating: {bottomPlayer.rating}</div>}
                  </div>
                </div>
                <div style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", padding: "6px 12px", fontFamily: "monospace", fontSize: "18px", fontWeight: 900, color: clockColor(bottomSecs ?? null) }}>
                  {fmtClock(bottomSecs ?? null)}
                </div>
              </div>
            </div>

            {/* Side panel */}
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>

              {/* Live badge */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px", backgroundColor: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.2)", borderRadius: "12px", padding: "12px 16px" }}>
                <span style={{ display: "inline-block", width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#4ade80", boxShadow: "0 0 8px #4ade80", animation: "pulse 1.5s infinite", flexShrink: 0 }} />
                <div>
                  <div style={{ color: "#4ade80", fontWeight: 700, fontSize: "13px" }}>Live Now</div>
                  <div style={{ color: "#6b7280", fontSize: "11px", marginTop: "2px" }}>Updates with every move</div>
                </div>
              </div>

              {/* Channel info */}
              <div style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", padding: "12px 14px" }}>
                <div style={{ color: "#6b7280", fontSize: "10px", fontWeight: 700, textTransform: "uppercase", marginBottom: "6px" }}>Watching</div>
                <div style={{ color: "#4ade80", fontWeight: 700, fontSize: "14px" }}>
                  {CHANNELS.find((c) => c.id === channel)?.label}
                </div>
              </div>

              {/* Open on Lichess */}
              {tvState.gameId && (
                <a href={`https://lichess.org/${tvState.gameId}`} target="_blank" rel="noopener noreferrer"
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", backgroundColor: "#4ade80", color: "#000", fontWeight: 800, fontSize: "13px", padding: "11px 16px", borderRadius: "10px", textDecoration: "none", textAlign: "center" }}>
                  Open on Lichess ↗
                </a>
              )}

              {/* Watch tips */}
              <div style={{ backgroundColor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", padding: "14px" }}>
                <div style={{ color: "#6b7280", fontSize: "10px", fontWeight: 700, textTransform: "uppercase", marginBottom: "10px" }}>Learning Tips</div>
                {[
                  { icon: "👁", tip: "Watch how strong players handle the opening" },
                  { icon: "⚔️", tip: "Spot tactics before they play them" },
                  { icon: "⏱", tip: "Notice how they manage their clock" },
                  { icon: "📝", tip: "Guess the next move before it happens" },
                ].map((item, i) => (
                  <div key={i} style={{ fontSize: "12px", color: "#6b7280", display: "flex", gap: "8px", alignItems: "flex-start", marginBottom: i < 3 ? "8px" : "0" }}>
                    <span style={{ fontSize: "13px", flexShrink: 0 }}>{item.icon}</span>
                    {item.tip}
                  </div>
                ))}
              </div>
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
