"use client";
import { useState, useEffect, useCallback } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import ExploreLayout from "@/components/ExploreLayout";

type Speed = "blitz" | "rapid" | "classical" | "bullet";

interface OpeningMove {
  uci: string;
  san: string;
  white: number;
  draws: number;
  black: number;
  averageRating: number;
}

interface ExplorerData {
  white: number;
  draws: number;
  black: number;
  moves: OpeningMove[];
  opening?: { eco: string; name: string };
}

const SPEEDS: { id: Speed; label: string }[] = [
  { id: "blitz",     label: "⚡ Blitz" },
  { id: "rapid",     label: "⏱ Rapid" },
  { id: "classical", label: "🎓 Classical" },
  { id: "bullet",    label: "🔴 Bullet" },
];

const STARTER_OPENINGS = [
  { name: "Start Position", moves: [] as string[] },
  { name: "Italian Game",         moves: ["e2e4","e7e5","g1f3","b8c6","f1c4"] },
  { name: "Ruy López",            moves: ["e2e4","e7e5","g1f3","b8c6","f1b5"] },
  { name: "Sicilian Defence",     moves: ["e2e4","c7c5"] },
  { name: "Queen's Gambit",       moves: ["d2d4","d7d5","c2c4"] },
  { name: "French Defence",       moves: ["e2e4","e7e6"] },
  { name: "Caro-Kann",            moves: ["e2e4","c7c6"] },
  { name: "London System",        moves: ["d2d4","d7d5","g1f3","g8f6","c1f4"] },
  { name: "King's Indian",        moves: ["d2d4","g8f6","c2c4","g7g6","b1c3","f8g7"] },
];

function pct(n: number, total: number) {
  return total === 0 ? 0 : Math.round((n / total) * 100);
}

export default function ExploreOpenings() {
  const [game, setGame] = useState(new Chess());
  const [fen, setFen] = useState(new Chess().fen());
  const [history, setHistory] = useState<string[]>([]); // SAN history
  const [speed, setSpeed] = useState<Speed>("blitz");
  const [explorerData, setExplorerData] = useState<ExplorerData | null>(null);
  const [loadingExplorer, setLoadingExplorer] = useState(false);
  const [orientation] = useState<"white" | "black">("white");

  // Fetch opening stats from Lichess explorer API
  const fetchExplorer = useCallback((currentFen: string, currentSpeed: Speed) => {
    setLoadingExplorer(true);
    const encodedFen = encodeURIComponent(currentFen);
    fetch(
      `https://explorer.lichess.ovh/lichess?fen=${encodedFen}&speeds[]=${currentSpeed}&topGames=0&recentGames=0&moves=10`,
      { headers: { Accept: "application/json" } }
    )
      .then((r) => r.json())
      .then((data) => {
        setExplorerData(data);
        setLoadingExplorer(false);
      })
      .catch(() => setLoadingExplorer(false));
  }, []);

  useEffect(() => {
    fetchExplorer(fen, speed);
  }, [fen, speed, fetchExplorer]);

  // Play a move from the explorer list
  const playMove = (uci: string) => {
    const newGame = new Chess(game.fen());
    const move = newGame.move({
      from: uci.slice(0, 2) as any,
      to: uci.slice(2, 4) as any,
      promotion: uci.length > 4 ? (uci[4] as any) : undefined,
    });
    if (!move) return;
    setGame(newGame);
    setFen(newGame.fen());
    setHistory((h) => [...h, move.san]);
  };

  // Board drag-and-drop
  const onDrop = (from: string, to: string) => {
    const newGame = new Chess(game.fen());
    const move = newGame.move({ from: from as any, to: to as any, promotion: "q" });
    if (!move) return false;
    setGame(newGame);
    setFen(newGame.fen());
    setHistory((h) => [...h, move.san]);
    return true;
  };

  // Undo last move
  const undoMove = () => {
    const newGame = new Chess(game.fen());
    newGame.undo();
    setGame(newGame);
    setFen(newGame.fen());
    setHistory((h) => h.slice(0, -1));
  };

  // Load a starter opening
  const loadOpening = (moves: string[]) => {
    const newGame = new Chess();
    const sans: string[] = [];
    for (const uci of moves) {
      const m = newGame.move({ from: uci.slice(0, 2) as any, to: uci.slice(2, 4) as any, promotion: uci.length > 4 ? (uci[4] as any) : undefined });
      if (m) sans.push(m.san);
    }
    setGame(newGame);
    setFen(newGame.fen());
    setHistory(sans);
  };

  const total = (explorerData?.white ?? 0) + (explorerData?.draws ?? 0) + (explorerData?.black ?? 0);
  const openingName = explorerData?.opening?.name;

  return (
    <ExploreLayout title="Opening Explorer">
      <div style={{ maxWidth: "1060px", margin: "0 auto", padding: "32px 20px 80px" }}>

        {/* Header */}
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "clamp(22px, 4vw, 30px)", fontWeight: 800, marginBottom: "4px" }}>
            📖 Opening Explorer
          </h1>
          <p style={{ color: "#9ca3af", fontSize: "13px" }}>
            Click moves or drag pieces to explore. Win rates from millions of Lichess games.
          </p>
        </div>

        {/* Speed + starter row */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "8px" }}>
          {SPEEDS.map((s) => (
            <button key={s.id} onClick={() => setSpeed(s.id)}
              style={{
                padding: "7px 14px", borderRadius: "9px",
                border: `1px solid ${speed === s.id ? "rgba(96,165,250,0.5)" : "rgba(255,255,255,0.1)"}`,
                backgroundColor: speed === s.id ? "rgba(96,165,250,0.15)" : "rgba(255,255,255,0.04)",
                color: speed === s.id ? "#93c5fd" : "#9ca3af",
                fontSize: "12px", fontWeight: 600, cursor: "pointer",
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "20px" }}>
          {STARTER_OPENINGS.map((op) => (
            <button key={op.name} onClick={() => loadOpening(op.moves)}
              style={{
                padding: "5px 12px", borderRadius: "7px",
                border: "1px solid rgba(255,255,255,0.08)",
                backgroundColor: "rgba(255,255,255,0.04)",
                color: "#6b7280", fontSize: "11px", fontWeight: 600, cursor: "pointer",
              }}
            >
              {op.name}
            </button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "24px", alignItems: "start" }} className="opening-grid">

          {/* Board column */}
          <div>
            {/* Opening name */}
            <div style={{ minHeight: "24px", marginBottom: "10px" }}>
              {openingName && (
                <span style={{
                  backgroundColor: "rgba(96,165,250,0.12)", border: "1px solid rgba(96,165,250,0.25)",
                  color: "#93c5fd", fontSize: "12px", fontWeight: 700,
                  padding: "4px 12px", borderRadius: "999px",
                }}>
                  {explorerData?.opening?.eco} · {openingName}
                </span>
              )}
            </div>

            {/* Board */}
            <div style={{ borderRadius: "14px", overflow: "hidden", border: "2px solid rgba(96,165,250,0.2)" }}>
              <Chessboard
                position={fen}
                onPieceDrop={onDrop}
                boardOrientation={orientation}
                customDarkSquareStyle={{ backgroundColor: "#b58863" }}
                customLightSquareStyle={{ backgroundColor: "#f0d9b5" }}
                animationDuration={150}
              />
            </div>

            {/* Move history + controls */}
            <div style={{ display: "flex", gap: "10px", alignItems: "center", marginTop: "12px", flexWrap: "wrap" }}>
              <div style={{
                flex: 1, backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "10px", padding: "8px 12px", fontSize: "13px",
                color: history.length ? "#e5e7eb" : "#4b5563", minHeight: "36px",
                fontFamily: "monospace",
              }}>
                {history.length
                  ? history.map((m, i) => (
                      <span key={i}>
                        {i % 2 === 0 && <span style={{ color: "#6b7280" }}>{Math.floor(i / 2) + 1}. </span>}
                        {m}{" "}
                      </span>
                    ))
                  : "Start position"}
              </div>
              <button onClick={undoMove} disabled={history.length === 0}
                style={{
                  padding: "8px 16px", borderRadius: "9px",
                  border: "1px solid rgba(255,255,255,0.12)",
                  backgroundColor: "rgba(255,255,255,0.05)",
                  color: history.length ? "#e5e7eb" : "#4b5563",
                  fontSize: "13px", fontWeight: 600, cursor: history.length ? "pointer" : "default",
                }}
              >
                ← Undo
              </button>
              <button onClick={() => loadOpening([])}
                style={{
                  padding: "8px 16px", borderRadius: "9px",
                  border: "1px solid rgba(255,255,255,0.12)",
                  backgroundColor: "rgba(255,255,255,0.05)",
                  color: "#9ca3af", fontSize: "13px", fontWeight: 600, cursor: "pointer",
                }}
              >
                Reset
              </button>
            </div>
          </div>

          {/* Explorer panel */}
          <div>
            {/* Global stats bar */}
            {total > 0 && (
              <div style={{ marginBottom: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#6b7280", marginBottom: "5px" }}>
                  <span>⬜ White {pct(explorerData!.white, total)}%</span>
                  <span>— Draw {pct(explorerData!.draws, total)}%</span>
                  <span>⬛ Black {pct(explorerData!.black, total)}%</span>
                </div>
                <div style={{ display: "flex", height: "8px", borderRadius: "999px", overflow: "hidden" }}>
                  <div style={{ width: `${pct(explorerData!.white, total)}%`, backgroundColor: "#e5e7eb" }} />
                  <div style={{ width: `${pct(explorerData!.draws, total)}%`, backgroundColor: "#6b7280" }} />
                  <div style={{ width: `${pct(explorerData!.black, total)}%`, backgroundColor: "#1f2937" }} />
                </div>
                <div style={{ color: "#4b5563", fontSize: "11px", marginTop: "4px" }}>
                  {total.toLocaleString()} games
                </div>
              </div>
            )}

            {/* Moves table */}
            <div style={{ marginBottom: "8px", color: "#6b7280", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px" }}>
              Top moves
            </div>

            {loadingExplorer && (
              <div style={{ color: "#4b5563", fontSize: "13px", padding: "20px 0" }}>Loading stats…</div>
            )}

            {!loadingExplorer && explorerData && (
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {explorerData.moves.slice(0, 8).map((move) => {
                  const moveTotal = move.white + move.draws + move.black;
                  const wPct = pct(move.white, moveTotal);
                  const dPct = pct(move.draws, moveTotal);
                  const bPct = pct(move.black, moveTotal);
                  return (
                    <button
                      key={move.uci}
                      onClick={() => playMove(move.uci)}
                      style={{
                        display: "flex", flexDirection: "column", gap: "6px",
                        backgroundColor: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: "10px", padding: "10px 12px",
                        cursor: "pointer", textAlign: "left",
                        transition: "background-color 0.15s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(96,165,250,0.1)")}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.04)")}
                    >
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span style={{ color: "#93c5fd", fontWeight: 800, fontSize: "14px", fontFamily: "monospace" }}>
                          {move.san}
                        </span>
                        <span style={{ color: "#6b7280", fontSize: "11px" }}>
                          {moveTotal.toLocaleString()} games · avg {move.averageRating}
                        </span>
                      </div>
                      {/* Win bar */}
                      <div style={{ display: "flex", height: "6px", borderRadius: "999px", overflow: "hidden" }}>
                        <div style={{ width: `${wPct}%`, backgroundColor: "#e5e7eb" }} />
                        <div style={{ width: `${dPct}%`, backgroundColor: "#6b7280" }} />
                        <div style={{ width: `${bPct}%`, backgroundColor: "#1f2937" }} />
                      </div>
                      <div style={{ display: "flex", gap: "10px", fontSize: "10px" }}>
                        <span style={{ color: "#d1d5db" }}>⬜ {wPct}%</span>
                        <span style={{ color: "#9ca3af" }}>— {dPct}%</span>
                        <span style={{ color: "#6b7280" }}>⬛ {bPct}%</span>
                      </div>
                    </button>
                  );
                })}
                {explorerData.moves.length === 0 && (
                  <div style={{ color: "#4b5563", fontSize: "13px", padding: "16px 0" }}>
                    No games found for this position at {speed} speed.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .opening-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </ExploreLayout>
  );
}
