"use client";
import { useState, useEffect, useCallback } from "react";
import ExploreLayout from "@/components/ExploreLayout";

/* ── Types ─────────────────────────────────────────────────────────────── */
interface LiTournament {
  id: string; fullName: string; minutes: number; nbPlayers: number;
  clock: { limit: number; increment: number };
  variant: { key: string; name: string };
  rated: boolean; startsAt: number;
}
interface TournamentData { started: LiTournament[]; created: LiTournament[] }

/* ── Helpers ────────────────────────────────────────────────────────────── */
const VARIANT_ICON: Record<string, string> = {
  standard: "♟", chess960: "♾", kingOfTheHill: "♛", atomic: "💥",
  horde: "⚔️", threeCheck: "3️⃣", antichess: "👻", crazyhouse: "🎭", racingKings: "🏁",
};

function fmtClock(limit: number, inc: number) {
  const m = limit / 60;
  return `${Number.isInteger(m) ? m : m.toFixed(1)}+${inc}`;
}
function timeUntil(ts: number) {
  const diff = ts - Date.now();
  if (diff <= 0) return "Starting…";
  const m = Math.floor(diff / 60000);
  const h = Math.floor(m / 60);
  return h > 0 ? `in ${h}h ${m % 60}m` : `in ${m}m`;
}

const FIDE_LINKS = [
  { label: "📅 All Tournaments",    href: "https://calendar.fide.com" },
  { label: "⭐ Major Events",        href: "https://calendar.fide.com/majorcalendar.php" },
  { label: "🏆 World Championship", href: "https://www.fide.com/championships" },
  { label: "♟ Grand Prix",          href: "https://www.fide.com/news/grandprix" },
  { label: "🎯 Candidates",         href: "https://www.fide.com/news/candidates" },
  { label: "📊 FIDE Ratings",       href: "https://ratings.fide.com" },
];

/* ── Sub-component ─────────────────────────────────────────────────────── */
function TCard({ t, live }: { t: LiTournament; live: boolean }) {
  return (
    <a href={`https://lichess.org/tournament/${t.id}`} target="_blank" rel="noopener noreferrer"
      style={{
        display: "flex", flexDirection: "column", gap: "6px",
        background: live ? "rgba(74,222,128,0.05)" : "rgba(255,255,255,0.03)",
        border: `1px solid ${live ? "rgba(74,222,128,0.2)" : "rgba(255,255,255,0.07)"}`,
        borderRadius: "12px", padding: "12px 14px", textDecoration: "none",
        transition: "background 0.15s",
      }}
      onMouseEnter={e => (e.currentTarget.style.background = live ? "rgba(74,222,128,0.1)" : "rgba(255,255,255,0.06)")}
      onMouseLeave={e => (e.currentTarget.style.background = live ? "rgba(74,222,128,0.05)" : "rgba(255,255,255,0.03)")}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
        <span style={{ color: "#e5e7eb", fontWeight: 700, fontSize: "13px", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {VARIANT_ICON[t.variant.key] ?? "♟"} {t.fullName}
        </span>
        {live ? (
          <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", color: "#4ade80", fontSize: "11px", fontWeight: 700, flexShrink: 0 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 6px #4ade80", display: "inline-block" }} />
            LIVE
          </span>
        ) : (
          <span style={{ color: "#6b7280", fontSize: "11px", flexShrink: 0 }}>{timeUntil(t.startsAt)}</span>
        )}
      </div>
      <div style={{ display: "flex", gap: "10px", fontSize: "11px", color: "#6b7280" }}>
        <span>⏱ {fmtClock(t.clock.limit, t.clock.increment)}</span>
        <span>⏳ {t.minutes}min</span>
        {t.nbPlayers > 0 && <span>👥 {t.nbPlayers.toLocaleString()}</span>}
        <span style={{ marginLeft: "auto", color: t.rated ? "#60a5fa" : "#4b5563" }}>{t.rated ? "Rated" : "Casual"}</span>
      </div>
    </a>
  );
}

/* ── Main component ────────────────────────────────────────────────────── */
export default function ExploreFide() {
  const [data,    setData]    = useState<TournamentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const fetchTournaments = useCallback(() => {
    setLoading(true); setError(false);
    fetch("https://lichess.org/api/tournament", { headers: { Accept: "application/json" } })
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(d => {
        setData({ started: d.started ?? [], created: d.created ?? [] });
        setLoading(false);
        setLastUpdate(new Date());
      })
      .catch(() => { setError(true); setLoading(false); });
  }, []);

  useEffect(() => {
    fetchTournaments();
    const id = setInterval(fetchTournaments, 60_000);
    return () => clearInterval(id);
  }, [fetchTournaments]);

  return (
    <ExploreLayout title="Chess Calendar">
      <div style={{ maxWidth: "1060px", margin: "0 auto", padding: "32px 20px 80px" }}>

        {/* Header */}
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ fontSize: "clamp(22px,4vw,30px)", fontWeight: 800, marginBottom: "4px" }}>📅 Chess Calendar</h1>
          <p style={{ color: "#9ca3af", fontSize: "13px" }}>Live Lichess arena tournaments + official FIDE event links.</p>
        </div>

        {/* FIDE official banner */}
        <div style={{ background: "rgba(249,203,0,0.06)", border: "1px solid rgba(249,203,0,0.2)", borderRadius: "14px", padding: "16px 18px", marginBottom: "28px" }}>
          <div style={{ color: "#f9cb00", fontWeight: 800, fontSize: "13px", marginBottom: "12px" }}>🏆 FIDE Official Links</div>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {FIDE_LINKS.map(l => (
              <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: "4px", background: "rgba(249,203,0,0.1)", border: "1px solid rgba(249,203,0,0.2)", color: "#f9cb00", fontSize: "12px", fontWeight: 600, padding: "6px 12px", borderRadius: "8px", textDecoration: "none" }}>
                {l.label} ↗
              </a>
            ))}
          </div>
        </div>

        {/* Lichess live tournaments */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px", flexWrap: "wrap", gap: "8px" }}>
          <div style={{ color: "#e5e7eb", fontWeight: 800, fontSize: "16px" }}>⚡ Lichess Tournaments</div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {lastUpdate && <span style={{ color: "#4b5563", fontSize: "11px" }}>Updated {lastUpdate.toLocaleTimeString()}</span>}
            <button onClick={fetchTournaments}
              style={{ padding: "5px 12px", borderRadius: "7px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)", color: "#9ca3af", fontSize: "12px", cursor: "pointer" }}>
              ↻ Refresh
            </button>
          </div>
        </div>

        {loading && !data && (
          <div style={{ textAlign: "center", padding: "40px 0", color: "#4b5563" }}>⏳ Loading tournaments…</div>
        )}
        {error && !data && (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <p style={{ color: "#6b7280", marginBottom: "12px" }}>Couldn't load tournament data.</p>
            <button onClick={fetchTournaments}
              style={{ padding: "8px 18px", borderRadius: "8px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#e5e7eb", cursor: "pointer", fontSize: "13px" }}>
              Retry
            </button>
          </div>
        )}

        {data && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }} className="cal-grid">

            {/* Live now */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 8px #4ade80", display: "inline-block" }} />
                <span style={{ color: "#4ade80", fontWeight: 700, fontSize: "13px" }}>Live Now</span>
                <span style={{ color: "#4b5563", fontSize: "11px", fontWeight: 600 }}>({data.started.length})</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {data.started.length === 0
                  ? <p style={{ color: "#4b5563", fontSize: "13px" }}>No tournaments running right now</p>
                  : data.started.slice(0, 12).map(t => <TCard key={t.id} t={t} live />)
                }
              </div>
            </div>

            {/* Starting soon */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                <span style={{ color: "#fbbf24", fontWeight: 700, fontSize: "13px" }}>⏰ Starting Soon</span>
                <span style={{ color: "#4b5563", fontSize: "11px", fontWeight: 600 }}>({data.created.length})</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {data.created.length === 0
                  ? <p style={{ color: "#4b5563", fontSize: "13px" }}>No upcoming tournaments scheduled</p>
                  : data.created.slice(0, 12).map(t => <TCard key={t.id} t={t} live={false} />)
                }
              </div>
            </div>
          </div>
        )}

        <p style={{ color: "#374151", fontSize: "11px", marginTop: "20px", textAlign: "right" }}>
          Lichess arena data · auto-refreshes every 60s
        </p>
      </div>

      <style>{`
        @media (max-width: 640px) { .cal-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </ExploreLayout>
  );
}
