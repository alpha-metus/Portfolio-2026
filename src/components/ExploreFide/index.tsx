"use client";
import { useState } from "react";
import ExploreLayout from "@/components/ExploreLayout";

const FIDE_CALENDAR_URL = "https://calendar.fide.com/calendar.php";

const MAJOR_LINKS = [
  { label: "All Tournaments",  href: "https://calendar.fide.com/calendar.php" },
  { label: "Major Events",     href: "https://calendar.fide.com/majorcalendar.php" },
  { label: "World Championship", href: "https://www.fide.com/championships" },
  { label: "Grand Prix",       href: "https://www.fide.com/news/grandprix" },
  { label: "Candidates",       href: "https://www.fide.com/news/candidates" },
  { label: "FIDE Ratings",     href: "https://ratings.fide.com" },
];

export default function ExploreFide() {
  const [loaded, setLoaded] = useState(false);
  const [view,   setView]   = useState<"all" | "major">("all");

  const src = view === "major"
    ? "https://calendar.fide.com/majorcalendar.php"
    : FIDE_CALENDAR_URL;

  return (
    <ExploreLayout title="FIDE Calendar">
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "32px 20px 80px" }}>

        {/* Header */}
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ fontSize: "clamp(22px,4vw,30px)", fontWeight: 800, marginBottom: "4px" }}>
            📅 FIDE Tournament Calendar
          </h1>
          <p style={{ color: "#9ca3af", fontSize: "13px" }}>
            Official FIDE calendar of upcoming chess tournaments worldwide.
          </p>
        </div>

        {/* View toggle + quick links */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "16px", alignItems: "center" }}>
          {(["all","major"] as const).map(v => (
            <button key={v} onClick={() => { setLoaded(false); setView(v); }}
              style={{
                padding: "7px 16px", borderRadius: "9px", fontSize: "12px", fontWeight: 700, cursor: "pointer",
                border: `1px solid ${view === v ? "rgba(249,203,0,0.5)" : "rgba(255,255,255,0.1)"}`,
                background: view === v ? "rgba(249,203,0,0.12)" : "rgba(255,255,255,0.04)",
                color: view === v ? "#f9cb00" : "#9ca3af",
              }}>
              {v === "all" ? "🌍 All Tournaments" : "⭐ Major Events"}
            </button>
          ))}

          <a href={src} target="_blank" rel="noopener noreferrer"
            style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: "5px", background: "rgba(249,203,0,0.1)", border: "1px solid rgba(249,203,0,0.25)", color: "#f9cb00", fontSize: "12px", fontWeight: 700, padding: "7px 14px", borderRadius: "9px", textDecoration: "none" }}>
            Open on FIDE ↗
          </a>
        </div>

        {/* Iframe */}
        <div style={{ borderRadius: "16px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)", background: "#fff", position: "relative", minHeight: "700px" }}>

          {/* Spinner while loading */}
          {!loaded && (
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "12px", background: "rgba(13,4,4,0.9)", zIndex: 1 }}>
              <div style={{ fontSize: "36px" }}>⏳</div>
              <p style={{ color: "#9ca3af", fontSize: "13px" }}>Loading FIDE calendar…</p>
            </div>
          )}

          <iframe
            key={src}
            src={src}
            width="100%"
            height="780"
            title="FIDE Tournament Calendar"
            style={{ border: "none", display: "block" }}
            onLoad={() => setLoaded(true)}
          />
        </div>

        {/* Quick links grid */}
        <div style={{ marginTop: "24px" }}>
          <div style={{ color: "#6b7280", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "10px" }}>
            Quick Links
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "8px" }}>
            {MAJOR_LINKS.map(l => (
              <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "10px", padding: "10px 12px", textDecoration: "none", color: "#e5e7eb", fontSize: "12px", fontWeight: 600 }}>
                {l.label}
                <span style={{ color: "#6b7280" }}>↗</span>
              </a>
            ))}
          </div>
        </div>

      </div>
    </ExploreLayout>
  );
}
