"use client";
import { useEffect, useState, useCallback } from "react";
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

  // More reliable: load full PGN then undo back to puzzle start position
  const setupBoard = useCallback((data: PuzzleData) => {
    try {
      const chess = new Chess();
      chess.loadPgn(data.game.pgn);
      const totalPlies = chess.history().length;
      const pliesAfterPuzzle = totalPlies - data.puzzle.initialPly;
      for (let i = 0; i < pliesAfterPuzzle; i++) chess.undo();
      setOrientation(chess.turn() === "w" ? "white" : "black");
      setGame(new Chess(chess.fen()));
      setFen(chess.fen());
      setMoveIndex(0);
      setStatus("waiting");
      setRevealed(false);
    } catch {
      setFen("start");
    }
  }, []);

  useEffect(() => {
    fetch("https://lichess.org/api/puzzle/daily", {
      headers: { Accept: "application/json" },
    })
      .then((r) => {
        if (!r.ok) throw new Error("bad response");
        return r.json();
      })
      .then((data: PuzzleData) => {
        setPuzzle(data);
        setupBoard(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [setupBoard]);

  const onDrop = useCallback(
    (sourceSquare: string, targetSquare: string) => {
      if (!puzzle || status === "solved" || status === "correct") return false;

      const solution = puzzle.puzzle.solution;
      if (moveIndex >= solution.length) return false;

      const expectedUci = solution[moveIndex];
      const droppedUci = sourceSquare + targetSquare;
      const isCorrect =
        droppedUci === expectedUci.slice(0, 4) || droppedUci === expectedUci;

      if (isCorrect) {
        const newGame = new Chess(game.fen());
        const promotion =
          expectedUci.length > 4 ? (expectedUci[4] as "q" | "r" | "b" | "n") : undefined;
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

        if (!oppMove) {
          // Opponent move invalid — treat as solved
          setGame(new Chess(newGame.fen()));
          setFen(newGame.fen());
          setMoveIndex(nextIndex);
          setStatus("solved");
          return true;
        }

        setGame(new Chess(newGame.fen()));
        setFen(newGame.fen());
        setMoveIndex(nextIndex + 1);
        setStatus("correct");
        setTimeout(() => setStatus("waiting"), 800);
        return true;
      } else {
        setStatus("wrong");
        setTimeout(() => setStatus("waiting"), 900);
        return false;
      }
    },
    [puzzle, game, moveIndex, status]
  );

  const resetPuzzle = () => { if (puzzle) setupBoard(puzzle); };

  const themes = puzzle?.puzzle?.themes ?? [];
  const rating = puzzle?.puzzle?.rating;
  const solution = puzzle?.puzzle?.solution ?? [];
  const players = puzzle?.game?.players ?? [];
  const puzzleId = puzzle?.puzzle?.id;

  const statusBg: Record<MoveStatus, string> = {
    waiting: "rgba(255,255,255,0.04)",
    correct: "rgba(74,222,128,0.15)",
    wrong: "rgba(239,68,68,0.15)",
    solved: "rgba(249,203,0,0.15)",
  };
  const statusBorder: Record<MoveStatus, string> = {
    waiting: "rgba(255,255,255,0.08)",
    correct: "rgba(74,222,128,0.4)",
    wrong: "rgba(239,68,68,0.4)",
    solved: "rgba(249,203,0,0.5)",
  };
  const statusMsg: Record<MoveStatus, string> = {
    waiting: orientation === "white" ? "⬜ White to move — find the best move!" : "⬛ Black to move — find the best move!",
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
            <h1 style={{ fontSize: "clamp(22px, 4vw, 30px)", fontWeight: 800, marginBottom: "4px" }}>
              🧩 Daily Puzzle
            </h1>
            <p style={{ color: "#9ca3af", fontSize: "13px" }}>
              Find the best move! A new Lichess puzzle every day.
            </p>
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
            <div style={{ fontSize: "36px", marginBottom: "12px" }}>⏳</div>
            Loading today&apos;s puzzle…
          </div>
        )}

        {error && (
          <div style={{ backgroundColor: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "16px", padding: "32px", textAlign: "center" }}>
            <div style={{ fontSize: "32px", marginBottom: "12px" }}>⚠️</div>
            <p style={{ color: "#fca5a5", marginBottom: "16px" }}>
              Couldn&apos;t load the puzzle. Check your connection and refresh.
            </p>
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
              <div style={{
                backgroundColor: statusBg[status],
                border: `1px solid ${statusBorder[status]}`,
                borderRadius: "12px", padding: "10px 16px", marginBottom: "14px",
                fontSize: "14px", fontWeight: 600, textAlign: "center", transition: "all 0.2s",
                color: status === "solved" ? "#f9cb00" : status === "correct" ? "#4ade80" : status === "wrong" ? "#f87171" : "#e5e7eb",
              }}>
                {statusMsg[status]}
              </div>

              <div style={{ borderRadius: "14px", overflow: "hidden", border: "2px solid rgba(249,203,0,0.2)" }}>
                <Chessboard
                  position={fen}
                  onPieceDrop={onDrop}
                  boardOrientation={orientation}
                  customBoardStyle={{ borderRadius: "0" }}
                  customDarkSquareStyle={{ backgroundColor: "#b58863" }}
                  customLightSquareStyle={{ backgroundColor: "#f0d9b5" }}
                  animationDuration={150}
                  arePiecesDraggable={status !== "solved"}
                />
              </div>

              <div style={{ display: "flex", gap: "10px", marginTop: "14px", flexWrap: "wrap" }}>
                <button onClick={resetPuzzle}
                  style={{ padding: "9px 20px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.15)", backgroundColor: "rgba(255,255,255,0.06)", color: "#e5e7eb", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>
                  ↺ Reset
                </button>
                {puzzleId && (
                  <a href={`https://lichess.org/training/${puzzleId}`} target="_blank" rel="noopener noreferrer"
                    style={{ padding: "9px 20px", borderRadius: "10px", border: "1px solid rgba(249,203,0,0.3)", backgroundColor: "rgba(249,203,0,0.1)", color: "#f9cb00", fontSize: "13px", fontWeight: 600, textDecoration: "none" }}>
                    Open on Lichess ↗
                  </a>
                )}
              </div>
            </div>

            {/* Side panel */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

              {/* Move progress */}
              <div style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "14px", padding: "16px" }}>
                <div style={{ color: "#6b7280", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", marginBottom: "8px" }}>
                  Progress
                </div>
                <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                  {solution.map((_, i) => {
                    const isPlayerMove = i % 2 === 0;
                    const done = i < moveIndex;
                    return (
                      <div key={i} style={{
                        width: 12, height: 12, borderRadius: "50%",
                        backgroundColor: done ? (isPlayerMove ? "#4ade80" : "#6b7280") : "rgba(255,255,255,0.1)",
                        border: `1px solid ${done ? (isPlayerMove ? "#4ade80" : "#6b7280") : "rgba(255,255,255,0.2)"}`,
                        flexShrink: 0,
                      }} />
                    );
                  })}
                  <span style={{ color: "#6b7280", fontSize: "11px", marginLeft: "4px" }}>
                    {moveIndex}/{solution.length}
                  </span>
                </div>
              </div>

              {/* Themes */}
              {themes.length > 0 && (
                <div style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "14px", padding: "16px" }}>
                  <div style={{ color: "#6b7280", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", marginBottom: "10px" }}>Themes</div>
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {themes.filter((t) => t !== "oneMove").slice(0, 6).map((t) => (
                      <span key={t} style={{ backgroundColor: "rgba(96,165,250,0.12)", border: "1px solid rgba(96,165,250,0.2)", color: "#93c5fd", fontSize: "11px", fontWeight: 600, padding: "3px 9px", borderRadius: "999px", textTransform: "capitalize" }}>
                        {t.replace(/([A-Z])/g, " $1").trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Players */}
              {players.length === 2 && (
                <div style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "14px", padding: "16px" }}>
                  <div style={{ color: "#6b7280", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", marginBottom: "10px" }}>From the game</div>
                  {players.map((p) => (
                    <div key={p.color} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                      <span style={{ fontSize: "14px" }}>{p.color === "white" ? "⬜" : "⬛"}</span>
                      <span style={{ color: "#e5e7eb", fontWeight: 600, fontSize: "13px" }}>{p.user?.name ?? p.color}</span>
                      <span style={{ color: "#6b7280", fontSize: "12px" }}>({p.rating})</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Solution */}
              <div style={{ backgroundColor: "rgba(249,203,0,0.05)", border: "1px solid rgba(249,203,0,0.2)", borderRadius: "14px", padding: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: revealed ? "12px" : "0" }}>
                  <span style={{ color: "#f9cb00", fontSize: "12px", fontWeight: 700, textTransform: "uppercase" }}>💡 Solution</span>
                  <button onClick={() => setRevealed((r) => !r)}
                    style={{ backgroundColor: "rgba(249,203,0,0.15)", border: "1px solid rgba(249,203,0,0.3)", color: "#f9cb00", fontSize: "11px", fontWeight: 700, padding: "4px 12px", borderRadius: "7px", cursor: "pointer" }}>
                    {revealed ? "Hide" : "Reveal"}
                  </button>
                </div>
                {revealed && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {solution.map((move, i) => (
                      <span key={i} style={{
                        backgroundColor: i < moveIndex ? "rgba(74,222,128,0.2)" : "rgba(249,203,0,0.12)",
                        color: i < moveIndex ? "#4ade80" : "#fde68a",
                        fontFamily: "monospace", fontSize: "12px", fontWeight: 700,
                        padding: "3px 9px", borderRadius: "7px",
                      }}>
                        {i % 2 === 0 ? "▶" : "↩"} {move.slice(0, 2)}→{move.slice(2, 4)}
                        {move.length > 4 ? `=${move[4].toUpperCase()}` : ""}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {status === "solved" && (
                <div style={{ backgroundColor: "rgba(249,203,0,0.12)", border: "1px solid rgba(249,203,0,0.4)", borderRadius: "14px", padding: "20px", textAlign: "center" }}>
                  <div style={{ fontSize: "32px", marginBottom: "8px" }}>🎉</div>
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
