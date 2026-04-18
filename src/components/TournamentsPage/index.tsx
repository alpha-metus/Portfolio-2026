"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

// ── Types ────────────────────────────────────────────────────────────────────

interface LichessTournament {
  id: string;
  fullName: string;
  clock: { limit: number; increment: number };
  minutes: number;
  nbPlayers: number;
  startsAt: number;
  status: number; // 10=upcoming 20=started 30=finished
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

// ── Helpers ──────────────────────────────────────────────────────────────────

function getTC(limit: number, inc: number) {
  const est = limit + 40 * inc;
  if (est < 30)   return { name: "UltraBullet", color: "#a855f7" };
  if (est < 180)  return { name: "Bullet",      color: "#ef4444" };
  if (est < 480)  return { name: "Blitz",        color: "#f9cb00" };
  if (est < 1500) return { name: "Rapid",        color: "#22c55e" };
  return              { name: "Classical",    color: "#3b82f6" };
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

// ── Static OTB tournament data (major 2026 events) ──────────────────────────

const OTB_TOURNAMENTS: OTBTournament[] = [
  { name: "FIDE Candidates Tournament 2026",            dates: "Apr 2026",       location: "TBD",                    category: "FIDE",    level: "World",       url: "https://www.fide.com",            color: "#f9cb00" },
  { name: "US Chess Championship 2026",                 dates: "Apr–May 2026",   location: "Saint Louis, USA",        category: "National",level: "National",    url: "https://new.uschess.org",         color: "#3b82f6" },
  { name: "US Amateur North Championship 2026",         dates: "Apr 24–26",      location: "Brookfield, WI, USA",     category: "USCF",    level: "National",    url: "https://new.uschess.org",         color: "#3b82f6" },
  { name: "National Elementary Championship K-6 2026",  dates: "May 1–3",        location: "Baltimore, MD, USA",      category: "Scholastic",level:"Youth",       url: "https://new.uschess.org",         color: "#22c55e" },
  { name: "Norway Chess 2026",                          dates: "May 26–Jun 6",   location: "Stavanger, Norway",       category: "FIDE",    level: "World",       url: "https://norwaychess.no",          color: "#f9cb00" },
  { name: "National Middle School Championship K-8",    dates: "May 15–17",      location: "Round Rock, TX, USA",     category: "Scholastic",level:"Youth",       url: "https://new.uschess.org",         color: "#22c55e" },
  { name: "Superbet Classic 2026",                      dates: "May–Jun 2026",   location: "Bucharest, Romania",      category: "FIDE",    level: "World",       url: "https://superbet.com",            color: "#f9cb00" },
  { name: "FIDE Grand Swiss 2026",                      dates: "Oct 2026",       location: "TBD",                    category: "FIDE",    level: "World",       url: "https://www.fide.com",            color: "#f9cb00" },
  { name: "Chess Olympiad 2026",                        dates: "Sep 2026",       location: "Tashkent, Uzbekistan",    category: "FIDE",    level: "World",       url: "https://www.fide.com",            color: "#f9cb00" },
  { name: "World Youth Chess Championship 2026",        dates: "Aug 2026",       location: "TBD",                    category: "FIDE",    level: "Youth",       url: "https://www.fide.com",            color: "#22c55e" },
  { name: "World Chess Championship 2026",              dates: "Nov 2026",       location: "TBD",                    category: "FIDE",    level: "World",       url: "https://www.fide.com",            color: "#ef4444" },
  { name: "FIDE World Rapid & Blitz 2026",              dates: "Dec 2026",       location: "TBD",                    category: "FIDE",    level: "World",       url: "https://www.fide.com",            color: "#f97316" },
];

const LEVEL_COLORS: Record<OTBTournament["level"], string> = {
  World:       "#f9cb00",
  Continental: "#f97316",
  National:    "#3b82f6",
  Youth:       "#22c55e",
  Open:        "#a855f7",
};

// ── Main Component ────────────────────────────────────────────────────────────

export default function TournamentsPage() {
  const [tab, setTab]                           = useState<"online" | "otb">("online");
  const [lichessTourneys, setLichessTourneys]   = useState<LichessTournament[]>([]);
  const [loading, setLoading]                   = useState(true);
  const [error, setError]                       = useState(false);
  const [lastUpdated, setLastUpdated]           = useState<Date | null>(null);
  const [tcFilter, setTcFilter]                 = useState<string>("All");
  const [levelFilter, setLevelFilter]           = useState<string>("All");
  const [tick, setTick]                         = useState(0);

  // Live countdown ticker
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  // Fetch Lichess tournaments
  const fetchLichess = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("https://lichess.org/api/tournament", {
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      const all: LichessTournament[] = [
        ...(data.created  ?? []),
        ...(data.started  ?? []),
      ];
      setLichessTourneys(all);
      setLastUpdated(new Date());
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch + auto-refresh every 90 seconds
  useEffect(() => {
    fetchLichess();
    const id = setInterval(fetchLichess, 90_000);
    return () => clearInterval(id);
  }, [fetchLichess]);

  // Filtered online tournaments
  const tcOptions = ["All", "Bullet", "Blitz", "Rapid", "Classical"];
  const filteredOnline = lichessTourneys.filter(t => {
    const tc = getTC(t.clock.limit, t.clock.increment).name;
    return tcFilter === "All" || tc === tcFilter;
  });

  // Filtered OTB tournaments
  const levelOptions = ["All", "World", "Youth", "National", "Continental", "Open"];
  const filteredOTB = OTB_TOURNAMENTS.filter(t =>
    levelFilter === "All" || t.level === levelFilter
  );

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div style={{ backgroundColor: "#0d0404", minHeight: "100vh", color: "#ffffff" }}>

      {/* ── Top nav bar ── */}
      <div style={{ backgroundColor: "#0d0404", borderBottom: "1px solid rgba(249,203,0,0.15)", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100, backdropFilter: "blur(10px)" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <Image src="/images/img_header_logo.png" width={100} height={28} alt="KwinBee" style={{ objectFit: "contain" }} />
        </Link>
        <Link href="/" style={{ color: "#f9cb00", fontSize: "13px", fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: "4px" }}>
          ← Back to Home
        </Link>
      </div>

      {/* ── Hero header ── */}
      <div style={{ textAlign: "center", padding: "48px 24px 32px", background: "radial-gradient(ellipse at 50% 0%, rgba(249,203,0,0.12) 0%, transparent 65%)" }}>
        <div style={{ fontSize: "13px", color: "#f9cb00", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "12px" }}>
          ♟ Live &amp; Updated Automatically
        </div>
        <h1 style={{ fontSize: "clamp(28px, 5vw, 52px)", fontWeight: 900, color: "#ffffff", lineHeight: 1.1, margin: 0 }}>
          Upcoming Chess{" "}
          <span style={{ color: "#f9cb00" }}>Tournaments</span>
        </h1>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "16px", marginTop: "12px", maxWidth: "540px", margin: "12px auto 0" }}>
          Online tournaments from Lichess · Major OTB events from FIDE &amp; national federations
        </p>
      </div>

      {/* ── Tabs ── */}
      <div style={{ display: "flex", justifyContent: "center", gap: "8px", padding: "0 24px 24px" }}>
        {(["online", "otb"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: "10px 28px",
              borderRadius: "999px",
              border: "none",
              cursor: "pointer",
              fontWeight: 700,
              fontSize: "14px",
              transition: "all 0.2s",
              backgroundColor: tab === t ? "#f9cb00" : "rgba(255,255,255,0.07)",
              color: tab === t ? "#000" : "#fff",
            }}
          >
            {t === "online" ? "🌐 Online (Live)" : "🏆 Over the Board"}
          </button>
        ))}
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 16px 80px" }}>

        {/* ════════════════ ONLINE TAB ════════════════ */}
        {tab === "online" && (
          <>
            {/* Controls row */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", marginBottom: "20px" }}>
              {/* TC filter chips */}
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {tcOptions.map(opt => (
                  <button
                    key={opt}
                    onClick={() => setTcFilter(opt)}
                    style={{
                      padding: "6px 16px", borderRadius: "999px", fontSize: "12px", fontWeight: 600, cursor: "pointer", border: "1px solid",
                      borderColor: tcFilter === opt ? "#f9cb00" : "rgba(255,255,255,0.2)",
                      backgroundColor: tcFilter === opt ? "rgba(249,203,0,0.15)" : "transparent",
                      color: tcFilter === opt ? "#f9cb00" : "rgba(255,255,255,0.6)",
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {/* Refresh / last updated */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                {lastUpdated && (
                  <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px" }}>
                    Updated {lastUpdated.toLocaleTimeString()}
                  </span>
                )}
                <button
                  onClick={fetchLichess}
                  style={{ padding: "6px 16px", borderRadius: "999px", fontSize: "12px", fontWeight: 600, cursor: "pointer", border: "1px solid rgba(249,203,0,0.4)", backgroundColor: "rgba(249,203,0,0.1)", color: "#f9cb00" }}
                >
                  ↻ Refresh
                </button>
              </div>
            </div>

            {/* States */}
            {loading && (
              <div style={{ textAlign: "center", padding: "60px", color: "rgba(255,255,255,0.4)", fontSize: "16px" }}>
                <div style={{ fontSize: "32px", marginBottom: "12px" }}>♟</div>
                Loading live tournaments…
              </div>
            )}
            {!loading && error && (
              <div style={{ textAlign: "center", padding: "60px", color: "rgba(255,255,255,0.4)" }}>
                <div style={{ fontSize: "32px", marginBottom: "12px" }}>⚠️</div>
                <p>Could not reach Lichess API. <button onClick={fetchLichess} style={{ color: "#f9cb00", background: "none", border: "none", cursor: "pointer", fontWeight: 700 }}>Try again</button></p>
              </div>
            )}
            {!loading && !error && filteredOnline.length === 0 && (
              <div style={{ textAlign: "center", padding: "60px", color: "rgba(255,255,255,0.4)" }}>No {tcFilter !== "All" ? tcFilter : ""} tournaments right now.</div>
            )}

            {/* Tournament cards grid */}
            {!loading && !error && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
                {filteredOnline.map(t => {
                  const tc = getTC(t.clock.limit, t.clock.increment);
                  const isLive = t.status === 20;
                  const cd = countdown(t.startsAt);
                  return (
                    <div
                      key={t.id}
                      style={{ background: "rgba(255,255,255,0.04)", border: `1px solid rgba(255,255,255,0.08)`, borderRadius: "16px", padding: "20px", display: "flex", flexDirection: "column", gap: "12px", transition: "border-color 0.2s" }}
                      onMouseEnter={e => (e.currentTarget.style.borderColor = tc.color + "60")}
                      onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
                    >
                      {/* Status badge + TC badge */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: "11px", fontWeight: 700, padding: "3px 10px", borderRadius: "999px", backgroundColor: isLive ? "#22c55e20" : "rgba(249,203,0,0.15)", color: isLive ? "#22c55e" : "#f9cb00", border: `1px solid ${isLive ? "#22c55e40" : "rgba(249,203,0,0.3)"}` }}>
                          {isLive ? "🔴 LIVE" : "⏳ UPCOMING"}
                        </span>
                        <span style={{ fontSize: "11px", fontWeight: 700, padding: "3px 10px", borderRadius: "999px", backgroundColor: tc.color + "20", color: tc.color, border: `1px solid ${tc.color}40` }}>
                          {tc.name}
                        </span>
                      </div>

                      {/* Name */}
                      <div style={{ fontWeight: 700, fontSize: "15px", color: "#ffffff", lineHeight: 1.3 }}>{t.fullName}</div>

                      {/* Details */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                          <span style={{ color: "rgba(255,255,255,0.5)" }}>Time Control</span>
                          <span style={{ color: "#ffffff", fontWeight: 600 }}>{formatClock(t.clock.limit, t.clock.increment)} · {t.minutes}min</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                          <span style={{ color: "rgba(255,255,255,0.5)" }}>Players</span>
                          <span style={{ color: "#ffffff", fontWeight: 600 }}>{t.nbPlayers.toLocaleString()}</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                          <span style={{ color: "rgba(255,255,255,0.5)" }}>{isLive ? "Started" : "Starts in"}</span>
                          <span style={{ color: isLive ? "#22c55e" : "#f9cb00", fontWeight: 700 }}>
                            {isLive ? timeAgo(t.startsAt) : (cd ?? "Soon")}
                          </span>
                        </div>
                        {t.variant.key !== "standard" && (
                          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                            <span style={{ color: "rgba(255,255,255,0.5)" }}>Variant</span>
                            <span style={{ color: "#a855f7", fontWeight: 600 }}>{t.variant.name}</span>
                          </div>
                        )}
                      </div>

                      {/* CTA */}
                      <a
                        href={`https://lichess.org/tournament/${t.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ marginTop: "4px", display: "block", textAlign: "center", padding: "10px", borderRadius: "10px", backgroundColor: isLive ? "#22c55e" : "#f9cb00", color: "#000", fontWeight: 700, fontSize: "13px", textDecoration: "none", transition: "opacity 0.2s" }}
                        onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                        onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                      >
                        {isLive ? "▶ Join Now on Lichess" : "View on Lichess →"}
                      </a>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Powered by */}
            <p style={{ textAlign: "center", marginTop: "32px", color: "rgba(255,255,255,0.3)", fontSize: "12px" }}>
              Online tournament data powered by{" "}
              <a href="https://lichess.org" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "underline" }}>
                Lichess Open API
              </a>{" "}
              · Auto-refreshes every 90s
            </p>
          </>
        )}

        {/* ════════════════ OTB TAB ════════════════ */}
        {tab === "otb" && (
          <>
            {/* Level filter chips */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "20px" }}>
              {levelOptions.map(opt => (
                <button
                  key={opt}
                  onClick={() => setLevelFilter(opt)}
                  style={{
                    padding: "6px 16px", borderRadius: "999px", fontSize: "12px", fontWeight: 600, cursor: "pointer", border: "1px solid",
                    borderColor: levelFilter === opt ? "#f9cb00" : "rgba(255,255,255,0.2)",
                    backgroundColor: levelFilter === opt ? "rgba(249,203,0,0.15)" : "transparent",
                    color: levelFilter === opt ? "#f9cb00" : "rgba(255,255,255,0.6)",
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>

            {/* OTB cards */}
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
                      {/* Level badge */}
                      <div style={{ width: "44px", height: "44px", borderRadius: "12px", backgroundColor: lc + "20", border: `1px solid ${lc}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", flexShrink: 0 }}>
                        {t.level === "World" ? "🌍" : t.level === "Youth" ? "🌱" : t.level === "National" ? "🏛️" : "♟"}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: "15px", color: "#ffffff", marginBottom: "4px" }}>{t.name}</div>
                        <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)" }}>📅 {t.dates} &nbsp;·&nbsp; 📍 {t.location}</div>
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
                      <span style={{ fontSize: "11px", fontWeight: 700, padding: "4px 12px", borderRadius: "999px", backgroundColor: lc + "20", color: lc, border: `1px solid ${lc}40` }}>
                        {t.level}
                      </span>
                      <a
                        href={t.url}
                        target="_blank"
                        rel="noopener noreferrer"
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

            <p style={{ textAlign: "center", marginTop: "32px", color: "rgba(255,255,255,0.3)", fontSize: "12px", whiteSpace: "nowrap" }}>
              OTB data sourced from <a href="https://www.fide.com" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "underline" }}>FIDE</a>, <a href="https://new.uschess.org" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "underline" }}>US Chess</a> and other national federations.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
