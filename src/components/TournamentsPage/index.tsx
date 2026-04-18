"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

// ── Types ─────────────────────────────────────────────────────────────────────

interface LichessTournament {
  id: string;
  fullName: string;
  clock: { limit: number; increment: number };
  minutes: number;
  nbPlayers: number;
  startsAt: number;
  status: number;
  perf: { name: string };
  variant: { key: string; name: string };
  rated: boolean;
}

interface OTBTournament {
  name: string;
  dates: string;
  location: string;
  category: string;
  level: "World" | "Continental" | "National" | "Youth" | "Open";
  url: string;
  color: string;
}

type Tab = "live" | "upcoming" | "otb";

// ── Helpers ───────────────────────────────────────────────────────────────────

function getTC(limit: number, inc: number) {
  const est = limit + 40 * inc;
  if (est < 30)   return { name: "UltraBullet", color: "#a855f7" };
  if (est < 180)  return { name: "Bullet",      color: "#ef4444" };
  if (est < 480)  return { name: "Blitz",        color: "#f9cb00" };
  if (est < 1500) return { name: "Rapid",        color: "#22c55e" };
  return               { name: "Classical",   color: "#3b82f6" };
}

function formatClock(limit: number, inc: number) {
  const m = Math.floor(limit / 60);
  const s = limit % 60;
  return s > 0 ? `${m}:${String(s).padStart(2, "0")}+${inc}` : `${m}+${inc}`;
}

function countdown(ts: number) {
  const diff = ts - Date.now();
  if (diff <= 0) return null;
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  if (h > 48) return `${Math.floor(h / 24)}d ${h % 24}h`;
  if (h > 0)  return `${h}h ${m}m`;
  if (m > 0)  return `${m}m ${s}s`;
  return `${s}s`;
}

function timeAgo(ts: number) {
  const diff = Date.now() - ts;
  const m = Math.floor(diff / 60000);
  if (m < 60) return `${m}m ago`;
  return `${Math.floor(m / 60)}h ago`;
}

// ── Static OTB data ───────────────────────────────────────────────────────────

const OTB_TOURNAMENTS: OTBTournament[] = [
  { name: "FIDE Candidates Tournament 2026",           dates: "Apr 2026",     location: "TBD",                   category: "FIDE",      level: "World",       url: "https://www.fide.com",   color: "#f9cb00" },
  { name: "US Chess Championship 2026",                dates: "Apr–May 2026", location: "Saint Louis, USA",       category: "National",  level: "National",    url: "https://new.uschess.org",color: "#3b82f6" },
  { name: "US Amateur North Championship 2026",        dates: "Apr 24–26",    location: "Brookfield, WI, USA",    category: "USCF",      level: "National",    url: "https://new.uschess.org",color: "#3b82f6" },
  { name: "National Elementary Championship K-6 2026", dates: "May 1–3",      location: "Baltimore, MD, USA",     category: "Scholastic",level: "Youth",       url: "https://new.uschess.org",color: "#22c55e" },
  { name: "Norway Chess 2026",                         dates: "May 26–Jun 6", location: "Stavanger, Norway",      category: "FIDE",      level: "World",       url: "https://norwaychess.no", color: "#f9cb00" },
  { name: "National Middle School Championship K-8",   dates: "May 15–17",    location: "Round Rock, TX, USA",    category: "Scholastic",level: "Youth",       url: "https://new.uschess.org",color: "#22c55e" },
  { name: "Superbet Classic 2026",                     dates: "May–Jun 2026", location: "Bucharest, Romania",     category: "FIDE",      level: "World",       url: "https://superbet.com",   color: "#f9cb00" },
  { name: "FIDE Grand Swiss 2026",                     dates: "Oct 2026",     location: "TBD",                   category: "FIDE",      level: "World",       url: "https://www.fide.com",   color: "#f9cb00" },
  { name: "Chess Olympiad 2026",                       dates: "Sep 2026",     location: "Tashkent, Uzbekistan",   category: "FIDE",      level: "World",       url: "https://www.fide.com",   color: "#f9cb00" },
  { name: "World Youth Chess Championship 2026",       dates: "Aug 2026",     location: "TBD",                   category: "FIDE",      level: "Youth",       url: "https://www.fide.com",   color: "#22c55e" },
  { name: "World Chess Championship 2026",             dates: "Nov 2026",     location: "TBD",                   category: "FIDE",      level: "World",       url: "https://www.fide.com",   color: "#ef4444" },
  { name: "FIDE World Rapid & Blitz 2026",             dates: "Dec 2026",     location: "TBD",                   category: "FIDE",      level: "World",       url: "https://www.fide.com",   color: "#f97316" },
];

const LEVEL_COLORS: Record<OTBTournament["level"], string> = {
  World: "#f9cb00", Continental: "#f97316", National: "#3b82f6", Youth: "#22c55e", Open: "#a855f7",
};

// ── Tournament Card ───────────────────────────────────────────────────────────

function TournamentCard({ t, isLive, tick }: { t: LichessTournament; isLive: boolean; tick: number }) {
  const tc = getTC(t.clock.limit, t.clock.increment);
  const cd = countdown(t.startsAt);
  void tick; // just to re-render for live countdown

  return (
    <div
      style={{
        background: isLive ? "rgba(34,197,94,0.04)" : "rgba(255,255,255,0.04)",
        border: `1px solid ${isLive ? "rgba(34,197,94,0.2)" : "rgba(255,255,255,0.08)"}`,
        borderRadius: "16px",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        transition: "border-color 0.2s",
      }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = tc.color + "60")}
      onMouseLeave={e => (e.currentTarget.style.borderColor = isLive ? "rgba(34,197,94,0.2)" : "rgba(255,255,255,0.08)")}
    >
      {/* Status badge + TC badge */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{
          fontSize: "11px", fontWeight: 700, padding: "3px 10px", borderRadius: "999px",
          backgroundColor: isLive ? "#22c55e20" : "rgba(249,203,0,0.15)",
          color: isLive ? "#22c55e" : "#f9cb00",
          border: `1px solid ${isLive ? "#22c55e40" : "rgba(249,203,0,0.3)"}`,
          display: "flex", alignItems: "center", gap: "5px",
        }}>
          {isLive ? (
            <>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#22c55e", display: "inline-block", animation: "livePulse 1.2s infinite" }} />
              LIVE NOW
            </>
          ) : "⏳ UPCOMING"}
        </span>
        <span style={{ fontSize: "11px", fontWeight: 700, padding: "3px 10px", borderRadius: "999px", backgroundColor: tc.color + "20", color: tc.color, border: `1px solid ${tc.color}40` }}>
          {tc.name}
        </span>
      </div>

      {/* Name */}
      <div style={{ fontWeight: 700, fontSize: "15px", color: "#ffffff", lineHeight: 1.3 }}>{t.fullName}</div>

      {/* Details */}
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <Row label="Time Control" value={`${formatClock(t.clock.limit, t.clock.increment)} · ${t.minutes}min`} />
        <Row label="Players" value={t.nbPlayers.toLocaleString()} />
        <Row
          label={isLive ? "Started" : "Starts in"}
          value={isLive ? timeAgo(t.startsAt) : (cd ?? "Soon")}
          valueColor={isLive ? "#22c55e" : "#f9cb00"}
        />
        {t.variant.key !== "standard" && <Row label="Variant" value={t.variant.name} valueColor="#a855f7" />}
      </div>

      {/* CTA */}
      <a
        href={`https://lichess.org/tournament/${t.id}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          marginTop: "4px", display: "block", textAlign: "center",
          padding: "10px", borderRadius: "10px",
          backgroundColor: isLive ? "#22c55e" : "#f9cb00",
          color: "#000", fontWeight: 700, fontSize: "13px", textDecoration: "none",
          transition: "opacity 0.2s",
        }}
        onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
        onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
      >
        {isLive ? "▶ Join Now on Lichess" : "View on Lichess →"}
      </a>
    </div>
  );
}

function Row({ label, value, valueColor = "#ffffff" }: { label: string; value: string; valueColor?: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
      <span style={{ color: "rgba(255,255,255,0.5)" }}>{label}</span>
      <span style={{ color: valueColor, fontWeight: 600 }}>{value}</span>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function TournamentsPage() {
  const [tab, setTab]                         = useState<Tab>("live");
  const [liveTourneys, setLiveTourneys]       = useState<LichessTournament[]>([]);
  const [upcomingTourneys, setUpcomingTourneys] = useState<LichessTournament[]>([]);
  const [loading, setLoading]                 = useState(true);
  const [error, setError]                     = useState(false);
  const [lastUpdated, setLastUpdated]         = useState<Date | null>(null);
  const [tcFilter, setTcFilter]               = useState("All");
  const [levelFilter, setLevelFilter]         = useState("All");
  const [tick, setTick]                       = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const fetchLichess = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("https://lichess.org/api/tournament", {
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setLiveTourneys(data.started   ?? []);
      setUpcomingTourneys(data.created ?? []);
      setLastUpdated(new Date());
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLichess();
    const id = setInterval(fetchLichess, 90_000);
    return () => clearInterval(id);
  }, [fetchLichess]);

  const tcOptions = ["All", "Bullet", "Blitz", "Rapid", "Classical"];
  const levelOptions = ["All", "World", "Youth", "National", "Continental", "Open"];

  const filterTC = (list: LichessTournament[]) =>
    list.filter(t => tcFilter === "All" || getTC(t.clock.limit, t.clock.increment).name === tcFilter);

  const filteredLive     = filterTC(liveTourneys);
  const filteredUpcoming = filterTC(upcomingTourneys);
  const filteredOTB      = OTB_TOURNAMENTS.filter(t => levelFilter === "All" || t.level === levelFilter);

  const TABS: { id: Tab; label: string; count?: number }[] = [
    { id: "live",     label: "🔴 Online (Live)",     count: liveTourneys.length },
    { id: "upcoming", label: "⏳ Online (Upcoming)",  count: upcomingTourneys.length },
    { id: "otb",      label: "🏆 Over the Board" },
  ];

  const TAB_COLORS: Record<Tab, string> = {
    live:     "#22c55e",
    upcoming: "#f9cb00",
    otb:      "#f97316",
  };

  return (
    <div style={{ backgroundColor: "#0d0404", minHeight: "100vh", color: "#ffffff" }}>

      {/* Nav */}
      <div style={{ backgroundColor: "rgba(13,4,4,0.95)", borderBottom: "1px solid rgba(249,203,0,0.15)", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100, backdropFilter: "blur(10px)" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <Image src="/images/img_header_logo.png" width={100} height={28} alt="KwinBee" style={{ objectFit: "contain" }} />
        </Link>
        <Link href="/" style={{ color: "#f9cb00", fontSize: "13px", fontWeight: 600, textDecoration: "none" }}>
          ← Back to Home
        </Link>
      </div>

      {/* Hero */}
      <div style={{ textAlign: "center", padding: "48px 24px 32px", background: "radial-gradient(ellipse at 50% 0%, rgba(249,203,0,0.12) 0%, transparent 65%)" }}>
        <div style={{ fontSize: "13px", color: "#f9cb00", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "12px" }}>
          ♟ Live &amp; Updated Automatically
        </div>
        <h1 style={{ fontSize: "clamp(28px, 5vw, 52px)", fontWeight: 900, color: "#ffffff", lineHeight: 1.1, margin: 0 }}>
          Upcoming Chess <span style={{ color: "#f9cb00" }}>Tournaments</span>
        </h1>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "16px", marginTop: "12px", maxWidth: "540px", margin: "12px auto 0" }}>
          Online tournaments from Lichess · Major OTB events from FIDE &amp; national federations
        </p>
      </div>

      {/* Tabs — 3 distinct sections */}
      <div style={{ display: "flex", justifyContent: "center", gap: "8px", padding: "0 24px 28px", flexWrap: "wrap" }}>
        {TABS.map(t => {
          const active = tab === t.id;
          const color  = TAB_COLORS[t.id];
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                padding: "10px 24px",
                borderRadius: "999px",
                border: `2px solid ${active ? color : "rgba(255,255,255,0.12)"}`,
                cursor: "pointer",
                fontWeight: 700,
                fontSize: "14px",
                transition: "all 0.2s",
                backgroundColor: active ? color + "22" : "transparent",
                color: active ? color : "rgba(255,255,255,0.6)",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              {t.label}
              {t.count !== undefined && !loading && (
                <span style={{
                  backgroundColor: active ? color : "rgba(255,255,255,0.1)",
                  color: active ? "#000" : "rgba(255,255,255,0.5)",
                  fontSize: "11px", fontWeight: 800,
                  padding: "1px 7px", borderRadius: "999px",
                  minWidth: "20px", textAlign: "center",
                }}>
                  {t.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 16px 80px" }}>

        {/* ═══ LIVE TAB ═══ */}
        {tab === "live" && (
          <>
            {/* Header strip */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", marginBottom: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#22c55e", display: "inline-block", boxShadow: "0 0 8px #22c55e", animation: "livePulse 1.2s infinite" }} />
                  <span style={{ color: "#22c55e", fontWeight: 700, fontSize: "14px" }}>
                    {filteredLive.length} games live right now
                  </span>
                </div>
                {/* TC filter */}
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {tcOptions.map(opt => (
                    <button key={opt} onClick={() => setTcFilter(opt)} style={tcChip(tcFilter === opt, "#22c55e")}>{opt}</button>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                {lastUpdated && <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "12px" }}>Updated {lastUpdated.toLocaleTimeString()}</span>}
                <button onClick={fetchLichess} style={refreshBtn}>↻ Refresh</button>
              </div>
            </div>

            {loading && <LoadingState label="Loading live games…" />}
            {!loading && error && <ErrorState onRetry={fetchLichess} />}
            {!loading && !error && filteredLive.length === 0 && (
              <EmptyState label={`No ${tcFilter !== "All" ? tcFilter : ""} games live right now — check Upcoming!`} />
            )}
            {!loading && !error && filteredLive.length > 0 && (
              <div style={cardGrid}>
                {filteredLive.map(t => <TournamentCard key={t.id} t={t} isLive tick={tick} />)}
              </div>
            )}
            <PoweredBy />
          </>
        )}

        {/* ═══ UPCOMING TAB ═══ */}
        {tab === "upcoming" && (
          <>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", marginBottom: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                <span style={{ color: "#f9cb00", fontWeight: 700, fontSize: "14px" }}>
                  ⏳ {filteredUpcoming.length} tournaments starting soon
                </span>
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {tcOptions.map(opt => (
                    <button key={opt} onClick={() => setTcFilter(opt)} style={tcChip(tcFilter === opt, "#f9cb00")}>{opt}</button>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                {lastUpdated && <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "12px" }}>Updated {lastUpdated.toLocaleTimeString()}</span>}
                <button onClick={fetchLichess} style={refreshBtn}>↻ Refresh</button>
              </div>
            </div>

            {loading && <LoadingState label="Loading upcoming tournaments…" />}
            {!loading && error && <ErrorState onRetry={fetchLichess} />}
            {!loading && !error && filteredUpcoming.length === 0 && (
              <EmptyState label={`No ${tcFilter !== "All" ? tcFilter : ""} upcoming tournaments right now.`} />
            )}
            {!loading && !error && filteredUpcoming.length > 0 && (
              <div style={cardGrid}>
                {filteredUpcoming.map(t => <TournamentCard key={t.id} t={t} isLive={false} tick={tick} />)}
              </div>
            )}
            <PoweredBy />
          </>
        )}

        {/* ═══ OTB TAB ═══ */}
        {tab === "otb" && (
          <>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "20px" }}>
              {levelOptions.map(opt => (
                <button key={opt} onClick={() => setLevelFilter(opt)} style={tcChip(levelFilter === opt, "#f97316")}>{opt}</button>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {filteredOTB.map((t, i) => {
                const lc = LEVEL_COLORS[t.level];
                return (
                  <div
                    key={i}
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", flexWrap: "wrap", transition: "border-color 0.2s" }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = lc + "50")}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "16px", flex: 1, minWidth: "220px" }}>
                      <div style={{ width: "44px", height: "44px", borderRadius: "12px", backgroundColor: lc + "20", border: `1px solid ${lc}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", flexShrink: 0 }}>
                        {t.level === "World" ? "🌍" : t.level === "Youth" ? "🌱" : t.level === "National" ? "🏛️" : "♟"}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: "15px", color: "#ffffff", marginBottom: "4px" }}>{t.name}</div>
                        <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)" }}>📅 {t.dates} &nbsp;·&nbsp; 📍 {t.location}</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
                      <span style={{ fontSize: "11px", fontWeight: 700, padding: "4px 12px", borderRadius: "999px", backgroundColor: lc + "20", color: lc, border: `1px solid ${lc}40` }}>{t.level}</span>
                      <a
                        href={t.url} target="_blank" rel="noopener noreferrer"
                        style={{ padding: "8px 18px", borderRadius: "10px", backgroundColor: "rgba(249,203,0,0.12)", border: "1px solid rgba(249,203,0,0.3)", color: "#f9cb00", fontWeight: 700, fontSize: "12px", textDecoration: "none", whiteSpace: "nowrap", transition: "all 0.2s" }}
                        onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#f9cb00"; e.currentTarget.style.color = "#000"; }}
                        onMouseLeave={e => { e.currentTarget.style.backgroundColor = "rgba(249,203,0,0.12)"; e.currentTarget.style.color = "#f9cb00"; }}
                      >
                        Details →
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            <p style={{ textAlign: "center", marginTop: "32px", color: "rgba(255,255,255,0.3)", fontSize: "12px" }}>
              OTB data sourced from{" "}
              <a href="https://www.fide.com" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "underline" }}>FIDE</a>,{" "}
              <a href="https://new.uschess.org" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "underline" }}>US Chess</a> and national federations.
            </p>
          </>
        )}
      </div>

      <style>{`
        @keyframes livePulse { 0%, 100% { opacity: 1; box-shadow: 0 0 6px #22c55e; } 50% { opacity: 0.4; box-shadow: none; } }
      `}</style>
    </div>
  );
}

// ── Shared UI helpers ─────────────────────────────────────────────────────────

const cardGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
  gap: "16px",
};

const refreshBtn: React.CSSProperties = {
  padding: "6px 16px", borderRadius: "999px", fontSize: "12px", fontWeight: 600, cursor: "pointer",
  border: "1px solid rgba(249,203,0,0.4)", backgroundColor: "rgba(249,203,0,0.1)", color: "#f9cb00",
};

const tcChip = (active: boolean, color: string): React.CSSProperties => ({
  padding: "5px 14px", borderRadius: "999px", fontSize: "12px", fontWeight: 600, cursor: "pointer", border: "1px solid",
  borderColor: active ? color : "rgba(255,255,255,0.2)",
  backgroundColor: active ? color + "22" : "transparent",
  color: active ? color : "rgba(255,255,255,0.6)",
});

function LoadingState({ label }: { label: string }) {
  return (
    <div style={{ textAlign: "center", padding: "60px", color: "rgba(255,255,255,0.4)", fontSize: "16px" }}>
      <div style={{ fontSize: "32px", marginBottom: "12px" }}>♟</div>
      {label}
    </div>
  );
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div style={{ textAlign: "center", padding: "60px", color: "rgba(255,255,255,0.4)" }}>
      <div style={{ fontSize: "32px", marginBottom: "12px" }}>⚠️</div>
      <p>Could not reach Lichess API.{" "}
        <button onClick={onRetry} style={{ color: "#f9cb00", background: "none", border: "none", cursor: "pointer", fontWeight: 700 }}>Try again</button>
      </p>
    </div>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <div style={{ textAlign: "center", padding: "60px", color: "rgba(255,255,255,0.4)" }}>{label}</div>
  );
}

function PoweredBy() {
  return (
    <p style={{ textAlign: "center", marginTop: "32px", color: "rgba(255,255,255,0.3)", fontSize: "12px" }}>
      Powered by{" "}
      <a href="https://lichess.org" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "underline" }}>
        Lichess Open API
      </a>{" "}
      · Auto-refreshes every 90s
    </p>
  );
}
