"use client";
import { useState } from "react";
import ExploreLayout from "@/components/ExploreLayout";

/* ── Types ─────────────────────────────────────────────────────────────── */
interface CCTimeClass {
  last?:   { rating: number };
  best?:   { rating: number };
  record?: { win: number; loss: number; draw: number };
}
interface CCStats {
  chess_rapid?:  CCTimeClass;
  chess_blitz?:  CCTimeClass;
  chess_bullet?: CCTimeClass;
  chess_daily?:  CCTimeClass;
  fide?:         number;
  tactics?:      { highest?: { rating: number } };
}
interface CCProfile {
  username: string; name?: string; avatar?: string;
  title?: string; followers?: number; joined?: number; fide?: number;
}
interface LiPerf { games: number; rating: number; prog: number; prov?: boolean }
interface LiUser {
  id: string; username: string; title?: string;
  online?: boolean; patron?: boolean;
  disabled?: boolean;  // closed/banned accounts return this
  perfs?: {
    bullet?: LiPerf; blitz?: LiPerf; rapid?: LiPerf; classical?: LiPerf;
  };
  createdAt?: number;
  playTime?: { total: number };
  count?: { all: number; win: number; loss: number; draw: number };
}

/* ── Helpers ────────────────────────────────────────────────────────────── */
function fmtDate(ts: number, ms = false) {
  return new Date(ms ? ts : ts * 1000).toLocaleDateString("en-US", { year: "numeric", month: "short" });
}
function fmtTime(s: number) {
  const d = Math.floor(s / 86400);
  if (d >= 365) return `${Math.floor(d / 365)}y`;
  if (d > 0)    return `${d}d`;
  return `${Math.floor(s / 3600)}h`;
}

function RatingRow({ label, cur, best, games }: { label: string; cur?: number; best?: number; games?: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255,255,255,0.03)", borderRadius: "8px", padding: "7px 10px" }}>
      <span style={{ color: "#6b7280", fontSize: "12px" }}>{label}</span>
      {cur ? (
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ color: "#e5e7eb", fontWeight: 700, fontSize: "15px", fontFamily: "monospace" }}>{cur}</span>
          {best && best > cur && <span style={{ color: "#fbbf24", fontSize: "10px" }}>⭐{best}</span>}
          {games != null && <span style={{ color: "#4b5563", fontSize: "10px" }}>{games.toLocaleString()}g</span>}
        </div>
      ) : <span style={{ color: "#374151" }}>—</span>}
    </div>
  );
}

const EXAMPLES = ["hikaru", "magnuscarlsen", "GMAnishGiri", "LevonAronian"];

const TC = [
  { label: "⏱ Rapid",  cc: "chess_rapid",  li: "rapid"  as const },
  { label: "🔥 Blitz",  cc: "chess_blitz",  li: "blitz"  as const },
  { label: "⚡ Bullet", cc: "chess_bullet", li: "bullet" as const },
];

/* ── Component ─────────────────────────────────────────────────────────── */
export default function ExplorePlayer() {
  const [query,    setQuery]    = useState("");
  const [searched, setSearched] = useState("");

  const [ccProfile,  setCcProfile]  = useState<CCProfile | null>(null);
  const [ccStats,    setCcStats]    = useState<CCStats | null>(null);
  const [ccLoading,  setCcLoading]  = useState(false);
  const [ccErr,      setCcErr]      = useState<string | null>(null);

  const [liUser,    setLiUser]    = useState<LiUser | null>(null);
  const [liLoading, setLiLoading] = useState(false);
  const [liErr,     setLiErr]     = useState<string | null>(null);

  const doSearch = async (uname: string) => {
    if (!uname.trim()) return;
    setSearched(uname.trim());

    setCcLoading(true); setCcErr(null); setCcProfile(null); setCcStats(null);
    setLiLoading(true); setLiErr(null); setLiUser(null);

    const lower = uname.trim().toLowerCase();

    const [profileRes, statsRes, liRes] = await Promise.allSettled([
      fetch(`https://api.chess.com/pub/player/${encodeURIComponent(lower)}`)
        .then(r => r.ok ? r.json() : Promise.reject(r.status)),
      fetch(`https://api.chess.com/pub/player/${encodeURIComponent(lower)}/stats`)
        .then(r => r.ok ? r.json() : Promise.reject(r.status)),
      fetch(`https://lichess.org/api/user/${encodeURIComponent(uname.trim())}`, {
        headers: { Accept: "application/json" },
      }).then(r => r.ok ? r.json() : Promise.reject(r.status)),
    ]);

    setCcProfile(profileRes.status === "fulfilled" ? profileRes.value : null);
    if (profileRes.status === "rejected") setCcErr("Player not found on Chess.com");
    setCcStats(statsRes.status === "fulfilled" ? statsRes.value : null);
    setCcLoading(false);

    setLiUser(liRes.status === "fulfilled" ? liRes.value : null);
    if (liRes.status === "rejected") setLiErr("Player not found on Lichess");
    setLiLoading(false);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    doSearch(query);
  };

  const ccTc = (key: string): CCTimeClass | undefined =>
    ccStats ? (ccStats as Record<string, CCTimeClass | undefined>)[key] : undefined;

  const cardWrap = (accent: string, title: string, children: React.ReactNode) => (
    <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", overflow: "hidden" }}>
      <div style={{ background: accent, borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "10px 16px" }}>
        <span style={{ fontWeight: 800, fontSize: "13px", color: "#e5e7eb" }}>{title}</span>
      </div>
      <div style={{ padding: "16px" }}>{children}</div>
    </div>
  );

  /* ── Lichess disabled account check ─────────────────────────────────── */
  const liDisabled = liUser?.disabled === true;

  return (
    <ExploreLayout title="Player Lookup">
      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "32px 20px 80px" }}>

        <div style={{ marginBottom: "28px" }}>
          <h1 style={{ fontSize: "clamp(22px,4vw,30px)", fontWeight: 800, marginBottom: "4px" }}>🔍 Player Lookup</h1>
          <p style={{ color: "#9ca3af", fontSize: "13px" }}>Enter exact username to see stats on Chess.com and Lichess.</p>
        </div>

        {/* Search */}
        <form onSubmit={onSubmit} style={{ display: "flex", gap: "10px", maxWidth: "480px", marginBottom: "16px" }}>
          <input
            value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Username (e.g. hikaru, DrNykterstein)"
            style={{ flex: 1, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "10px", padding: "12px 14px", color: "#fff", fontSize: "14px", outline: "none" }}
          />
          <button type="submit" disabled={!query.trim()}
            style={{ background: "#60a5fa", color: "#000", border: "none", borderRadius: "10px", padding: "12px 20px", fontWeight: 800, fontSize: "14px", cursor: "pointer", opacity: query.trim() ? 1 : 0.5 }}>
            Search
          </button>
        </form>

        {/* Quick examples */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "28px" }}>
          {EXAMPLES.map(u => (
            <button key={u} onClick={() => { setQuery(u); doSearch(u); }}
              style={{ padding: "5px 12px", borderRadius: "7px", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)", color: "#6b7280", fontSize: "11px", fontWeight: 600, cursor: "pointer" }}>
              {u}
            </button>
          ))}
        </div>

        {/* Results */}
        {searched && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }} className="player-grid">

            {/* ── Chess.com ── */}
            {cardWrap("rgba(129,211,119,0.1)", "♟ Chess.com", (
              <>
                {ccLoading && <p style={{ color: "#4b5563", textAlign: "center", padding: "20px 0" }}>Loading…</p>}
                {ccErr && !ccLoading && (
                  <div style={{ textAlign: "center", padding: "24px 0", color: "#6b7280" }}>
                    <div style={{ fontSize: "28px", marginBottom: "8px" }}>👤</div>
                    <p style={{ fontSize: "13px" }}>{ccErr}</p>
                  </div>
                )}
                {ccProfile && !ccLoading && (
                  <>
                    <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "16px" }}>
                      {ccProfile.avatar
                        ? <img src={ccProfile.avatar} alt={ccProfile.username} width={52} height={52}
                            style={{ borderRadius: "50%", objectFit: "cover", border: "2px solid rgba(129,211,119,0.4)" }} />
                        : <div style={{ width: 52, height: 52, borderRadius: "50%", background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px" }}>♟</div>
                      }
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          {ccProfile.title && <span style={{ background: "rgba(249,203,0,0.15)", color: "#f9cb00", fontSize: "10px", fontWeight: 700, padding: "2px 6px", borderRadius: "4px" }}>{ccProfile.title}</span>}
                          <span style={{ color: "#e5e7eb", fontWeight: 700, fontSize: "15px" }}>{ccProfile.username}</span>
                        </div>
                        {ccProfile.name && <div style={{ color: "#9ca3af", fontSize: "12px" }}>{ccProfile.name}</div>}
                        {ccProfile.followers != null && <div style={{ color: "#6b7280", fontSize: "11px" }}>👥 {ccProfile.followers.toLocaleString()}</div>}
                      </div>
                    </div>

                    {ccStats && (
                      <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "14px" }}>
                        {TC.map(tc => {
                          const d = ccTc(tc.cc);
                          const games = d?.record ? d.record.win + d.record.loss + d.record.draw : undefined;
                          return <RatingRow key={tc.cc} label={tc.label} cur={d?.last?.rating} best={d?.best?.rating} games={games} />;
                        })}
                        {ccStats.tactics?.highest?.rating && (
                          <RatingRow label="🧩 Tactics" cur={ccStats.tactics.highest.rating} />
                        )}
                      </div>
                    )}

                    <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "10px", display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
                      {(ccProfile.fide ?? ccStats?.fide) && <span style={{ color: "#9ca3af", fontSize: "11px" }}>FIDE: {ccProfile.fide ?? ccStats?.fide}</span>}
                      {ccProfile.joined && <span style={{ color: "#6b7280", fontSize: "11px" }}>📅 {fmtDate(ccProfile.joined)}</span>}
                      <a href={`https://www.chess.com/member/${ccProfile.username}`} target="_blank" rel="noopener noreferrer"
                        style={{ color: "#81d377", fontSize: "11px", textDecoration: "none", marginLeft: "auto" }}>View ↗</a>
                    </div>
                  </>
                )}
              </>
            ))}

            {/* ── Lichess ── */}
            {cardWrap("rgba(255,255,255,0.05)", "♞ Lichess", (
              <>
                {liLoading && <p style={{ color: "#4b5563", textAlign: "center", padding: "20px 0" }}>Loading…</p>}
                {liErr && !liLoading && (
                  <div style={{ textAlign: "center", padding: "24px 0", color: "#6b7280" }}>
                    <div style={{ fontSize: "28px", marginBottom: "8px" }}>👤</div>
                    <p style={{ fontSize: "13px" }}>{liErr}</p>
                  </div>
                )}
                {liUser && !liLoading && (
                  <>
                    <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "16px" }}>
                      <div style={{ width: 52, height: 52, borderRadius: "50%", background: "rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", position: "relative" }}>
                        ♞
                        {!liDisabled && liUser.online && <span style={{ position: "absolute", bottom: 2, right: 2, width: 10, height: 10, borderRadius: "50%", background: "#4ade80", border: "2px solid #0d0404" }} />}
                      </div>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          {liUser.title && <span style={{ background: "rgba(249,203,0,0.15)", color: "#f9cb00", fontSize: "10px", fontWeight: 700, padding: "2px 6px", borderRadius: "4px" }}>{liUser.title}</span>}
                          <span style={{ color: "#e5e7eb", fontWeight: 700, fontSize: "15px" }}>{liUser.username}</span>
                        </div>
                        {liDisabled
                          ? <div style={{ color: "#f87171", fontSize: "11px" }}>🔒 Account closed</div>
                          : <div style={{ color: liUser.online ? "#4ade80" : "#6b7280", fontSize: "11px" }}>{liUser.online ? "● Online now" : "● Offline"}</div>
                        }
                        {liUser.patron && <div style={{ color: "#a78bfa", fontSize: "10px" }}>♥ Patron</div>}
                      </div>
                    </div>

                    {/* Show ratings only if not disabled */}
                    {!liDisabled && (
                      <>
                        <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "14px" }}>
                          {TC.map(tc => {
                            const p = liUser.perfs?.[tc.li];
                            return <RatingRow key={tc.li} label={tc.label} cur={p?.rating} games={p?.games} />;
                          })}
                        </div>

                        {/* W/D/L bar — only if count exists and has games */}
                        {(liUser.count?.all ?? 0) > 0 && (
                          <>
                            <div style={{ display: "flex", gap: "4px", height: "6px", borderRadius: "999px", overflow: "hidden", marginBottom: "6px" }}>
                              <div style={{ width: `${Math.round((liUser.count!.win / liUser.count!.all) * 100)}%`,  background: "#4ade80" }} />
                              <div style={{ width: `${Math.round((liUser.count!.draw / liUser.count!.all) * 100)}%`, background: "#6b7280" }} />
                              <div style={{ width: `${Math.round((liUser.count!.loss / liUser.count!.all) * 100)}%`, background: "#f87171" }} />
                            </div>
                            <div style={{ display: "flex", gap: "10px", fontSize: "10px", marginBottom: "12px" }}>
                              <span style={{ color: "#4ade80" }}>W {liUser.count!.win.toLocaleString()}</span>
                              <span style={{ color: "#6b7280" }}>D {liUser.count!.draw.toLocaleString()}</span>
                              <span style={{ color: "#f87171" }}>L {liUser.count!.loss.toLocaleString()}</span>
                            </div>
                          </>
                        )}
                      </>
                    )}

                    <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "10px", display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
                      {!liDisabled && liUser.playTime?.total != null && (
                        <span style={{ color: "#9ca3af", fontSize: "11px" }}>🎮 {fmtTime(liUser.playTime.total)}</span>
                      )}
                      {liUser.createdAt != null && <span style={{ color: "#6b7280", fontSize: "11px" }}>📅 {fmtDate(liUser.createdAt, true)}</span>}
                      <a href={`https://lichess.org/@/${liUser.username}`} target="_blank" rel="noopener noreferrer"
                        style={{ color: "#e5e7eb", fontSize: "11px", textDecoration: "none", marginLeft: "auto" }}>View ↗</a>
                    </div>
                  </>
                )}
              </>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 600px) { .player-grid { grid-template-columns: 1fr !important; } }
        input::placeholder { color: #4b5563; }
      `}</style>
    </ExploreLayout>
  );
}
