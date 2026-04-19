"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
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

type MoveStatus = "waiting" | "correct" | "wrong" | "solved";

export default function ExplorePuzzle() {
  const [puzzle, setPuzzle] = useState<PuzzleData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [game, setGame] = useState(new Chess());
  const [fen, setFen] = useState("start");
  const [orientation, setOrientation] = useState<"white" | "black">("white");
  const [moveIndex, setMoveIndex] = useState(0);
  const [status, setStatus] = useState<MoveStatus>("waiting");
  const [revealed, setRevealed] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [solvingAuto, setSolvingAuto] = useState(false);
  const autoRef = useRef(false);

  const setupBoard = useCallback((data: PuzzleData) => {
    try {
      autoRef.current = false;
      const chess = new Chess();
      chess.loadPgn(data.game.pgn);

      // Undo back to puzzle starting position
      const totalPlies = chess.history().length;
      const toUndo = totalPlies - data.puzzle.initialPly;
      for (let i = 0; i < toUndo; i++) chess.undo();

      // Verify solution[0] belongs to the current player — fix off-by-one if needed
      if (data.puzzle.solution.length > 0) {
        const sol0 = data.puzzle.solution[0];
        const piece = chess.get(sol0.slice(0, 2) as any);
        if (!piece || piece.color !== chess.turn()) {
          chess.undo(); // one extra undo if position is one off
        }
      }

      const puzzleFen = chess.fen();
      setOrientation(chess.turn() === "w" ? "white" : "black");
      setGame(new Chess(puzzleFen));
      setFen(puzzleFen);
      setMoveIndex(0);
      setStatus("waiting");
      setRevealed(false);
      setShowHint(false);
      setSolvingAuto(false);
    } catch {
      setFen("start");
    }
  }, []);

  useEffect(() => {
    fetch("https://lichess.org/api/puzzle/daily", {
      headers: { Accept: "application/json" },
    })
      .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then((data: PuzzleData) => {
        setPuzzle(data);
        setupBoard(data);
        setLoading(false);
      })
      .catch(() => { setError(true); setLoading(false); });
  }, [setupBoard]);

  // ── Hint: from-square + green dots for all legal destinations ──
  const hintSquare =
    showHint && puzzle && moveIndex < puzzle.puzzle.solution.length
      ? puzzle.puzzle.solution[moveIndex].slice(0, 2)
      : null;

  const customSquareStyles: Record<string, React.CSSProperties> = {};
  if (hintSquare) {
    // Ring around the piece to move
    customSquareStyles[hintSquare] = {
      borderRadius: "50%",
      boxShadow: "inset 0 0 0 4px rgba(20,85,30,0.8)",
      backgroundColor: "rgba(20,85,30,0.15)",
    };
    // Green dots on every legal destination for that piece
    const legalMoves = game.moves({ square: hintSquare as any, verbose: true }) as Array<{ to: string; captured?: string }>;
    legalMoves.forEach(({ to, captured }) => {
      customSquareStyles[to] = captured
        // capture square: full ring
        ? {
            borderRadius: "50%",
            boxShadow: "inset 0 0 0 4px rgba(20,85,30,0.7)",
          }
        // empty square: centre dot via radial-gradient
        : {
            background: "radial-gradient(circle, rgba(20,85,30,0.55) 25%, transparent 25%)",
          };
    });
  }

  // ── View Solution: auto-play all remaining moves ──
  const viewSolution = useCallback(() => {
    if (!puzzle || status === "solved") return;
    setRevealed(true);
    setShowHint(false);
    setSolvingAuto(true);
    autoRef.current = true;

    let currentGame = new Chess(game.fen());
    let idx = moveIndex;

    const playNext = () => {
      if (!autoRef.current || idx >= puzzle.puzzle.solution.length) {
        setStatus("solved");
        setSolvingAuto(false);
        return;
      }
      const uci = puzzle.puzzle.solution[idx];
      const promo = uci.length > 4 ? (uci[4] as "q" | "r" | "b" | "n") : undefined;
      const move = currentGame.move({
        from: uci.slice(0, 2) as any,
        to: uci.slice(2, 4) as any,
        promotion: promo,
      });
      if (!move) { setSolvingAuto(false); return; }
      idx++;
      const newFen = currentGame.fen();
      setGame(new Chess(newFen));
      setFen(newFen);
      setMoveIndex(idx);
      if (idx >= puzzle.puzzle.solution.length) {
        setStatus("solved");
        setSolvingAuto(false);
      } else {
        setTimeout(playNext, 700);
      }
    };

    setTimeout(playNext, 200);
  }, [puzzle, game, moveIndex, status]);

  // ── Piece drop ──
  const onDrop = useCallback(
    (sourceSquare: string, targetSquare: string) => {
      if (!puzzle || status === "solved" || status === "correct" || solvingAuto) return false;

      const solution = puzzle.puzzle.solution;
      if (moveIndex >= solution.length) return false;

      const expectedUci = solution[moveIndex];
      const droppedUci = sourceSquare + targetSquare;
      const isCorrect = droppedUci === expectedUci.slice(0, 4) || droppedUci === expectedUci;

      setShowHint(false);

      if (isCorrect) {
        const newGame = new Chess(game.fen());
        const promotion = expectedUci.length > 4 ? (expectedUci[4] as "q" | "r" | "b" | "n") : undefined;
        const move = newGame.move({ from: sourceSquare as any, to: targetSquare as any, promotion });
        if (!move) return false;

        const nextIndex = moveIndex + 1;

        if (nextIndex >= solution.length) {
          setGame(new Chess(newGame.fen()));
          setFen(newGame.fen());
          setMoveIndex(nextIndex);
          setStatus("solved");
          return true;
        }

        // Auto-play opponent response
        const oppUci = solution[nextIndex];
        const oppPromo = oppUci.length > 4 ? (oppUci[4] as "q" | "r" | "b" | "n") : undefined;
        const oppMove = newGame.move({
          from: oppUci.slice(0, 2) as any,
          to: oppUci.slice(2, 4) as any,
          promotion: oppPromo,
        });

        setGame(new Chess(newGame.fen()));
        setFen(newGame.fen());
        setMoveIndex(oppMove ? nextIndex + 1 : nextIndex);
        setStatus("correct");
        if (!oppMove || nextIndex + 1 >= solution.length) {
          setTimeout(() => setStatus("solved"), 400);
        } else {
          setTimeout(() => setStatus("waiting"), 800);
        }
        return true;
      } else {
        setStatus("wrong");
        setTimeout(() => setStatus("waiting"), 900);
        return false;
      }
    },
    [puzzle, game, moveIndex, status, solvingAuto]
  );

  const resetPuzzle = () => { if (puzzle) setupBoard(puzzle); };

  const solution   = puzzle?.puzzle?.solution ?? [];
  const themes     = puzzle?.puzzle?.themes ?? [];
  const rating     = puzzle?.puzzle?.rating;
  const players    = puzzle?.game?.players ?? [];
  const puzzleId   = puzzle?.puzzle?.id;
  const toMove     = orientation === "white" ? "White" : "Black";

  const statusColors: Record<MoveStatus, string> = {
    waiting: "#e5e7eb",
    correct: "#4ade80",
    wrong: "#f87171",
    solved: "#f9cb00",
  };
  const statusBg: Record<MoveStatus, string> = {
    waiting: "rgba(255,255,255,0.04)",
    correct: "rgba(74,222,128,0.12)",
    wrong: "rgba(239,68,68,0.12)",
    solved: "rgba(249,203,0,0.12)",
  };
  const statusMsg: Record<MoveStatus, string> = {
    waiting: `${orientation === "white" ? "⬜" : "⬛"} ${toMove} to move — find the best move!`,
    correct: "✓ Correct! Keep going…",
    wrong: "✗ Not quite — try again!",
    solved: "🎉 Puzzle solved! Well done!",
  };

  return (
    <ExploreLayout title="Daily Puzzle">
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 20px 80px" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", marginBottom: "28px" }}>
          <div>
            <h1 style={{ fontSize: "clamp(22px, 4vw, 30px)", fontWeight: 800, marginBottom: "4px" }}>🧩 Daily Puzzle</h1>
            <p style={{ color: "#9ca3af", fontSize: "13px" }}>Find the best move — a new Lichess puzzle every day.</p>
          </div>
          {rating && (
            <div style={{ backgroundColor: "rgba(249,203,0,0.12)", border: "1px solid rgba(249,203,0,0.3)", borderRadius: "12px", padding: "8px 18px", textAlign: "center" }}>
              <div style={{ color: "#f9cb00", fontWeight: 800, fontSize: "22px" }}>{rating}</div>
              <div style={{ color: "#9ca3af", fontSize: "11px" }}>Puzzle Rating</div>
            </div>
          )}
        </div>

        {loading && (
          <div style={{ textAlign: "center", color: "#9ca3af", padding: "80px 0" }}>
            <div style={{ fontSize: "36px", marginBottom: "12px" }}>⏳</div>Loading today&apos;s puzzle…
          </div>
        )}

        {error && (
          <div style={{ backgroundColor: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "16px", padding: "32px", textAlign: "center" }}>
            <div style={{ fontSize: "32px", marginBottom: "12px" }}>⚠️</div>
            <p style={{ color: "#fca5a5", marginBottom: "16px" }}>Couldn&apos;t load the puzzle. Check your connection and refresh.</p>
            <a href="https://lichess.org/training/daily" target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-block", backgroundColor: "#f9cb00", color: "#000", fontWeight: 800, fontSize: "13px", padding: "10px 22px", borderRadius: "10px", textDecoration: "none" }}>
              Solve on Lichess ↗
            </a>
          </div>
        )}

        {!loading && !error && puzzle && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "28px", alignItems: "start" }} className="puzzle-grid">

            {/* Board column */}
            <div>
              {/* Status banner */}
              <div style={{ backgroundColor: statusBg[status], border: `1px solid rgba(255,255,255,0.1)`, borderRadius: "12px", padding: "10px 16px", marginBottom: "14px", fontSize: "14px", fontWeight: 600, textAlign: "center", color: statusColors[status], transition: "all 0.2s" }}>
                {statusMsg[status]}
              </div>

              {/* Board */}
              <div style={{ borderRadius: "14px", overflow: "hidden", border: "2px solid rgba(249,203,0,0.2)" }}>
                <Chessboard
                  position={fen}
                  onPieceDrop={onDrop}
                  boardOrientation={orientation}
                  customBoardStyle={{ borderRadius: "0" }}
                  customDarkSquareStyle={{ backgroundColor: "#b58863" }}
                  customLightSquareStyle={{ backgroundColor: "#f0d9b5" }}
                  customSquareStyles={customSquareStyles}
                  animationDuration={150}
                  arePiecesDraggable={status !== "solved" && !solvingAuto}
                />
              </div>

              {/* Controls row */}
              <div style={{ display: "flex", gap: "8px", marginTop: "12px", flexWrap: "wrap" }}>
                <button onClick={resetPuzzle}
                  style={{ padding: "8px 16px", borderRadius: "9px", border: "1px solid rgba(255,255,255,0.15)", backgroundColor: "rgba(255,255,255,0.06)", color: "#e5e7eb", fontSize: "12px", fontWeight: 600, cursor: "pointer" }}>
                  ↺ Reset
                </button>
                {/* Hint button */}
                {status !== "solved" && !solvingAuto && (
                  <button
                    onClick={() => setShowHint((h) => !h)}
                    style={{ padding: "8px 16px", borderRadius: "9px", border: `1px solid ${showHint ? "rgba(249,203,0,0.5)" : "rgba(255,255,255,0.12)"}`, backgroundColor: showHint ? "rgba(249,203,0,0.15)" : "rgba(255,255,255,0.04)", color: showHint ? "#f9cb00" : "#9ca3af", fontSize: "12px", fontWeight: 600, cursor: "pointer" }}>
                    💡 {showHint ? "Hide Hint" : "Get Hint"}
                  </button>
                )}
                {/* View Solution button */}
                {status !== "solved" && !solvingAuto && (
                  <button
                    onClick={viewSolution}
                    style={{ padding: "8px 16px", borderRadius: "9px", border: "1px solid rgba(96,165,250,0.3)", backgroundColor: "rgba(96,165,250,0.1)", color: "#93c5fd", fontSize: "12px", fontWeight: 600, cursor: "pointer" }}>
                    👁 View Solution
                  </button>
                )}
                {solvingAuto && (
                  <div style={{ padding: "8px 16px", borderRadius: "9px", backgroundColor: "rgba(96,165,250,0.1)", color: "#93c5fd", fontSize: "12px", fontWeight: 600 }}>
                    Playing solution…
                  </div>
                )}
                {puzzleId && (
                  <a href={`https://lichess.org/training/${puzzleId}`} target="_blank" rel="noopener noreferrer"
                    style={{ padding: "8px 16px", borderRadius: "9px", border: "1px solid rgba(249,203,0,0.3)", backgroundColor: "rgba(249,203,0,0.1)", color: "#f9cb00", fontSize: "12px", fontWeight: 600, textDecoration: "none" }}>
                    Open on Lichess ↗
                  </a>
                )}
              </div>
            </div>

            {/* Side panel */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

              {/* Who to move */}
              <div style={{ backgroundColor: status === "solved" ? "rgba(249,203,0,0.08)" : "rgba(255,255,255,0.04)", border: `1px solid ${status === "solved" ? "rgba(249,203,0,0.3)" : "rgba(255,255,255,0.08)"}`, borderRadius: "14px", padding: "14px 16px" }}>
                <div style={{ color: "#6b7280", fontSize: "10px", fontWeight: 700, textTransform: "uppercase", marginBottom: "6px" }}>Your turn</div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "20px" }}>{orientation === "white" ? "⬜" : "⬛"}</span>
                  <div>
                    <div style={{ color: "#ffffff", fontWeight: 800, fontSize: "15px" }}>{toMove} to move</div>
                    <div style={{ color: "#6b7280", fontSize: "11px" }}>
                      Step {Math.min(moveIndex + 1, solution.length)} of {solution.length}
                    </div>
                  </div>
                </div>
              </div>

              {/* Move progress */}
              {solution.length > 0 && (
                <div style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "14px", padding: "14px 16px" }}>
                  <div style={{ color: "#6b7280", fontSize: "10px", fontWeight: 700, textTransform: "uppercase", marginBottom: "10px" }}>Progress</div>
                  <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                    {solution.map((_, i) => {
                      const isPlayerMove = i % 2 === 0;
                      const done = i < moveIndex;
                      return (
                        <div key={i} title={isPlayerMove ? "Your move" : "Opponent response"} style={{
                          width: 11, height: 11, borderRadius: "50%", flexShrink: 0,
                          backgroundColor: done ? (isPlayerMove ? "#4ade80" : "#6b7280") : "rgba(255,255,255,0.08)",
                          border: `1px solid ${done ? (isPlayerMove ? "#4ade80" : "#6b7280") : "rgba(255,255,255,0.15)"}`,
                        }} />
                      );
                    })}
                  </div>
                  <div style={{ color: "#4b5563", fontSize: "10px", marginTop: "6px" }}>
                    🟢 your moves &nbsp;⚫ opponent
                  </div>
                </div>
              )}

              {/* Themes */}
              {themes.filter((t) => t !== "oneMove").length > 0 && (
                <div style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "14px", padding: "14px 16px" }}>
                  <div style={{ color: "#6b7280", fontSize: "10px", fontWeight: 700, textTransform: "uppercase", marginBottom: "10px" }}>Themes</div>
                  <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                    {themes.filter((t) => t !== "oneMove").slice(0, 6).map((t) => (
                      <span key={t} style={{ backgroundColor: "rgba(96,165,250,0.1)", border: "1px solid rgba(96,165,250,0.2)", color: "#93c5fd", fontSize: "11px", fontWeight: 600, padding: "3px 8px", borderRadius: "999px", textTransform: "capitalize" }}>
                        {t.replace(/([A-Z])/g, " $1").trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Players */}
              {players.length === 2 && (
                <div style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "14px", padding: "14px 16px" }}>
                  <div style={{ color: "#6b7280", fontSize: "10px", fontWeight: 700, textTransform: "uppercase", marginBottom: "10px" }}>From the game</div>
                  {players.map((p) => (
                    <div key={p.color} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "7px" }}>
                      <span>{p.color === "white" ? "⬜" : "⬛"}</span>
                      <span style={{ color: "#e5e7eb", fontWeight: 600, fontSize: "13px" }}>{p.user?.name ?? p.color}</span>
                      <span style={{ color: "#6b7280", fontSize: "11px" }}>({p.rating})</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Solution reveal */}
              <div style={{ backgroundColor: "rgba(249,203,0,0.04)", border: "1px solid rgba(249,203,0,0.18)", borderRadius: "14px", padding: "14px 16px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: revealed ? "12px" : "0" }}>
                  <span style={{ color: "#f9cb00", fontSize: "11px", fontWeight: 700, textTransform: "uppercase" }}>💡 Solution</span>
                  <button onClick={() => setRevealed((r) => !r)}
                    style={{ backgroundColor: "rgba(249,203,0,0.12)", border: "1px solid rgba(249,203,0,0.25)", color: "#f9cb00", fontSize: "11px", fontWeight: 700, padding: "3px 10px", borderRadius: "6px", cursor: "pointer" }}>
                    {revealed ? "Hide" : "Reveal"}
                  </button>
                </div>
                {revealed && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                    {solution.map((move, i) => (
                      <span key={i} style={{
                        backgroundColor: i < moveIndex ? "rgba(74,222,128,0.18)" : "rgba(249,203,0,0.1)",
                        color: i < moveIndex ? "#4ade80" : "#fde68a",
                        fontFamily: "monospace", fontSize: "12px", fontWeight: 700,
                        padding: "3px 8px", borderRadius: "6px",
                        opacity: i < moveIndex ? 1 : 0.7,
                      }}>
                        {i % 2 === 0 ? "▶" : "↩"} {move.slice(0, 2)}→{move.slice(2, 4)}
                        {move.length > 4 ? `=${move[4].toUpperCase()}` : ""}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {status === "solved" && (
                <div style={{ backgroundColor: "rgba(249,203,0,0.1)", border: "1px solid rgba(249,203,0,0.35)", borderRadius: "14px", padding: "20px", textAlign: "center" }}>
                  <div style={{ fontSize: "30px", marginBottom: "8px" }}>🎉</div>
                  <div style={{ color: "#f9cb00", fontWeight: 800, fontSize: "15px" }}>Puzzle Complete!</div>
                  <div style={{ color: "#9ca3af", fontSize: "12px", marginTop: "4px" }}>Come back tomorrow for a new one</div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 640px) { .puzzle-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </ExploreLayout>
  );
}
