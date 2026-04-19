"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import ExploreLayout from "@/components/ExploreLayout";

interface ChessDBMove {
  uci: string;
  san: string;
  score: number | string;
  rank: number | string;
  note: string;
  winrate: number | string;
}

interface ChessDBData {
  status: string;
  moves: ChessDBMove[];
}

const STARTER_OPENINGS = [
  { name: "Start Position",    moves: [] as string[] },
  { name: "Italian Game",      moves: ["e2e4","e7e5","g1f3","b8c6","f1c4"] },
  { name: "Ruy López",         moves: ["e2e4","e7e5","g1f3","b8c6","f1b5"] },
  { name: "Sicilian Defence",  moves: ["e2e4","c7c5"] },
  { name: "Queen's Gambit",    moves: ["d2d4","d7d5","c2c4"] },
  { name: "French Defence",    moves: ["e2e4","e7e6"] },
  { name: "Caro-Kann",         moves: ["e2e4","c7c6"] },
  { name: "London System",     moves: ["d2d4","d7d5","g1f3","g8f6","c1f4"] },
  { name: "King's Indian",     moves: ["d2d4","g8f6","c2c4","g7g6","b1c3","f8g7"] },
];

/** Build a Chess instance by replaying UCI moves from start. */
function buildGame(uciMoves: string[]): { chess: Chess; sans: string[] } {
  const chess = new Chess();
  const sans: string[] = [];
  for (const uci of uciMoves) {
    const m = chess.move({
      from: uci.slice(0, 2) as "a1",
      to:   uci.slice(2, 4) as "a1",
      promotion: uci.length > 4 ? (uci[4] as "q" | "r" | "b" | "n") : undefined,
    });
    if (m) sans.push(m.san);
  }
  return { chess, sans };
}

function rankLabel(rank: number): string {
  if (rank === 1) return "⭐";
  if (rank === 2) return "✅";
  if (rank === 3) return "👍";
  return "➡️";
}

function winrateColor(wr: number): string {
  if (wr >= 55) return "#4ade80";
  if (wr >= 45) return "#fbbf24";
  return "#f87171";
}

export default function ExploreOpenings() {
  const [uciMoves, setUciMoves]   = useState<string[]>([]);
  const [fen, setFen]             = useState(() => new Chess().fen());
  const [history, setHistory]     = useState<string[]>([]);
  const [boardFlipped, setBoardFlipped] = useState(false);

  const [explorerData, setExplorerData]   = useState<ChessDBData | null>(null);
  const [loadingExplorer, setLoadingExplorer] = useState(true);
  const [explorerError, setExplorerError] = useState(false);

  const abortRef = useRef<AbortController | null>(null);

  /** Apply a new UCI move list as the authoritative position. */
  const setPosition = useCallback((moves: string[]) => {
    const { chess, sans } = buildGame(moves);
    setUciMoves(moves);
    setFen(chess.fen());
    setHistory(sans);
  }, []);

  const fetchExplorer = useCallback((currentFen: string) => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoadingExplorer(true);
    setExplorerError(false);

    fetch(
      `https://www.chessdb.cn/cdb.php?action=queryall&board=${encodeURIComponent(currentFen)}&json=1`,
      { signal: controller.signal }
    )
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data: ChessDBData) => {
        // "ok" = has moves, "unknown"/"nobestmove" = valid but no data for position
        setExplorerData(data);
        setLoadingExplorer(false);
      })
      .catch((err: unknown) => {
        if (err instanceof Error && err.name === "AbortError") return;
        setExplorerData(null);
        setExplorerError(true);
        setLoadingExplorer(false);
      });
  }, []);

  useEffect(() => {
    fetchExplorer(fen);
    return () => abortRef.current?.abort();
  }, [fen, fetchExplorer]);

  const playMove = (uci: string) => setPosition([...uciMoves, uci]);

  const onDrop = (from: string, to: string): boolean => {
    const { chess } = buildGame(uciMoves);
    const move = chess.move({ from: from as "a1", to: to as "a1", promotion: "q" });
    if (!move) return false;
    setPosition([...uciMoves, move.from + move.to + (move.promotion ?? "")]);
    return true;
  };

  const undoMove  = () => { if (uciMoves.length) setPosition(uciMoves.slice(0, -1)); };
  const loadOpening = (moves: string[]) => setPosition(moves);

  // Detect active starter opening name
  const activeOpening = STARTER_OPENINGS.find(
    (op) => op.moves.length > 0 && op.moves.every((m, i) => uciMoves[i] === m) && uciMoves.length >= op.moves.length
  );

  return (
    <ExploreLayout title="Opening Explorer">
      <div style={{ maxWidth: "1060px", margin: "0 auto", padding: "32px 20px 80px" }}>

        {/* Header */}
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "clamp(22px, 4vw, 30px)", fontWeight: 800, marginBottom: "4px" }}>
            📖 Opening Explorer
          </h1>
          <p style={{ color: "#9ca3af", fontSize: "13px" }}>
            Click moves or drag pieces to explore. Engine-scored moves from ChessDB.
          </p>
        </div>

        {/* Starter openings */}
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

        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "24px", alignItems: "start" }} className="opening-grid">

          {/* Board column */}
          <div>
            {/* Opening name + flip row */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", minHeight: "32px", marginBottom: "10px" }}>
              <div>
                {activeOpening && (
                  <span style={{
                    backgroundColor: "rgba(96,165,250,0.12)", border: "1px solid rgba(96,165,250,0.25)",
                    color: "#93c5fd", fontSize: "12px", fontWeight: 700,
                    padding: "4px 12px", borderRadius: "999px",
                  }}>
                    {activeOpening.name}
                  </span>
                )}
              </div>
              <button
                onClick={() => setBoardFlipped((f) => !f)}
                title="Flip board"
                style={{
                  padding: "5px 10px", borderRadius: "8px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  backgroundColor: "rgba(255,255,255,0.05)",
                  color: "#9ca3af", fontSize: "13px", cursor: "pointer",
                }}
              >
                🔄 Flip
              </button>
            </div>

            {/* Board */}
            <div style={{ borderRadius: "14px", overflow: "hidden", border: "2px solid rgba(96,165,250,0.2)" }}>
              <Chessboard
                position={fen}
                onPieceDrop={onDrop}
                boardOrientation={boardFlipped ? "black" : "white"}
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
              <button onClick={undoMove} disabled={uciMoves.length === 0}
                style={{
                  padding: "8px 16px", borderRadius: "9px",
                  border: "1px solid rgba(255,255,255,0.12)",
                  backgroundColor: "rgba(255,255,255,0.05)",
                  color: uciMoves.length ? "#e5e7eb" : "#4b5563",
                  fontSize: "13px", fontWeight: 600, cursor: uciMoves.length ? "pointer" : "default",
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
            <div style={{ marginBottom: "10px", color: "#6b7280", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px" }}>
              Top moves
            </div>

            {loadingExplorer && (
              <div style={{ color: "#4b5563", fontSize: "13px", padding: "20px 0" }}>
                Analysing position…
              </div>
            )}

            {!loadingExplorer && explorerError && (
              <div style={{
                backgroundColor: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)",
                borderRadius: "10px", padding: "16px", textAlign: "center",
              }}>
                <div style={{ fontSize: "24px", marginBottom: "8px" }}>⚠️</div>
                <p style={{ color: "#fca5a5", fontSize: "13px", margin: "0 0 12px" }}>
                  Couldn&apos;t load move data. Check your connection.
                </p>
                <button
                  onClick={() => fetchExplorer(fen)}
                  style={{
                    padding: "7px 16px", borderRadius: "8px",
                    border: "1px solid rgba(239,68,68,0.3)", backgroundColor: "rgba(239,68,68,0.1)",
                    color: "#fca5a5", fontSize: "12px", fontWeight: 600, cursor: "pointer",
                  }}
                >
                  Retry
                </button>
              </div>
            )}

            {!loadingExplorer && !explorerError && explorerData && (
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {(explorerData.moves ?? []).length === 0 ? (
                  <div style={{ color: "#4b5563", fontSize: "13px", padding: "16px 0", lineHeight: 1.6 }}>
                    No data for this position.<br/>
                    <span style={{ fontSize: "11px" }}>Try a more common opening line.</span>
                  </div>
                ) : (
                  (explorerData.moves ?? []).slice(0, 8).map((move) => {
                    const wr    = Number(move.winrate) || 0;
                    const score = Number(move.score)   || 0;
                    const rank  = Number(move.rank)    || 4;
                    return (
                    <button
                      key={move.uci}
                      onClick={() => playMove(move.uci)}
                      style={{
                        display: "flex", flexDirection: "column", gap: "5px",
                        backgroundColor: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: "10px", padding: "10px 12px",
                        cursor: "pointer", textAlign: "left",
                        transition: "background-color 0.15s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(96,165,250,0.1)")}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.04)")}
                    >
                      {/* Top row: rank + SAN + win% */}
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <span style={{ fontSize: "11px" }}>{rankLabel(rank)}</span>
                          <span style={{ color: "#93c5fd", fontWeight: 800, fontSize: "15px", fontFamily: "monospace" }}>
                            {move.san}
                          </span>
                          {move.note && (
                            <span style={{ color: "#fbbf24", fontSize: "11px", fontWeight: 700 }}>
                              {String(move.note).split(" ")[0]}
                            </span>
                          )}
                        </div>
                        <span style={{ color: winrateColor(wr), fontSize: "12px", fontWeight: 700 }}>
                          {wr.toFixed(1)}%
                        </span>
                      </div>

                      {/* Win rate bar */}
                      <div style={{ height: "4px", borderRadius: "999px", backgroundColor: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
                        <div style={{
                          width: `${wr}%`,
                          height: "100%",
                          backgroundColor: winrateColor(wr),
                          transition: "width 0.3s",
                        }} />
                      </div>

                      {/* Score */}
                      <div style={{ fontSize: "10px", color: "#6b7280" }}>
                        Score: {score > 0 ? `+${score}` : score} cp
                      </div>
                    </button>
                    );
                  })
                )}

                {/* Legend */}
                <div style={{
                  marginTop: "8px", padding: "10px 12px",
                  backgroundColor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)",
                  borderRadius: "8px", fontSize: "10px", color: "#4b5563", lineHeight: 1.7,
                }}>
                  <div style={{ color: "#6b7280", fontWeight: 700, marginBottom: "4px" }}>LEGEND</div>
                  <div>⭐ Best  ✅ Good  👍 OK  ➡️ Playable</div>
                  <div>% = estimated win rate · cp = centipawns</div>
                </div>
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
