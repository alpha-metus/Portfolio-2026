"use client";
import React from "react";

const steps = [
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="18" rx="3" stroke="#0d0404" strokeWidth="2"/>
        <path d="M3 9h18" stroke="#0d0404" strokeWidth="2"/>
        <path d="M8 2v4M16 2v4" stroke="#0d0404" strokeWidth="2" strokeLinecap="round"/>
        <rect x="7" y="13" width="3" height="3" rx="0.5" fill="#0d0404"/>
        <rect x="11" y="13" width="3" height="3" rx="0.5" fill="#0d0404"/>
      </svg>
    ),
    title: "Book Free Demo",
    desc: "Schedule a free 30-min session — zero commitment.",
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L4 7v5c0 4.5 3.3 8.7 8 9.9 4.7-1.2 8-5.4 8-9.9V7L12 2z" stroke="#0d0404" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M9 12l2 2 4-4" stroke="#0d0404" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Choose Program",
    desc: "Pick 1-on-1, group, or tournament prep.",
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="7" width="20" height="14" rx="2" stroke="#0d0404" strokeWidth="2"/>
        <path d="M7 7V5a5 5 0 0110 0v2" stroke="#0d0404" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="12" cy="14" r="2" fill="#0d0404"/>
      </svg>
    ),
    title: "Secure Payment",
    desc: "Flexible monthly plans, no hidden fees.",
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="4" stroke="#0d0404" strokeWidth="2"/>
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#0d0404" strokeWidth="2" strokeLinecap="round"/>
        <path d="M17 6l1.5-1.5M19 9h2" stroke="#0d0404" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: "Meet Your Coach",
    desc: "Matched to your skill level and schedule.",
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="5" width="15" height="12" rx="2" stroke="#0d0404" strokeWidth="2"/>
        <path d="M17 9l5-3v10l-5-3V9z" stroke="#0d0404" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M6 11h6M6 14h4" stroke="#0d0404" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Live Classes",
    desc: "Interactive sessions on Zoom or Google Meet.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="w-full py-24 px-6 md:py-16 sm:py-12 sm:px-4" style={{ backgroundColor: "#0d0404" }}>

      {/* heading */}
      <div className="text-center mb-14">
        <p style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", color: "#f9cb00", marginBottom: "12px" }}>
          The Process
        </p>
        <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, color: "#ffffff", lineHeight: 1.15, margin: 0 }}>
          From first click to{" "}
          <span style={{ color: "#f9cb00" }}>grandmaster mindset.</span>
        </h2>
        <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.5)", marginTop: "12px" }}>
          Five simple steps — start learning chess the right way.
        </p>
      </div>

      {/* ── Desktop: horizontal row ── Mobile: vertical stack ── */}
      <div className="max-w-6xl mx-auto">

        {/* Horizontal flow — hidden on mobile */}
        <div className="sm:hidden flex flex-row items-center justify-between gap-0">
          {steps.map((step, i) => (
            <React.Fragment key={step.title}>
              {/* card */}
              <div
                className="flex flex-col items-center text-center"
                style={{
                  flex: "1 1 0",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  borderRadius: "20px",
                  padding: "24px 16px",
                  gap: "10px",
                  transition: "border-color 0.2s, background 0.2s",
                  cursor: "default",
                  minWidth: 0,
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = "rgba(249,203,0,0.4)";
                  el.style.background = "rgba(249,203,0,0.05)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = "rgba(255,255,255,0.09)";
                  el.style.background = "rgba(255,255,255,0.04)";
                }}
              >
                {/* step badge */}
                <span style={{ fontSize: "10px", fontWeight: 800, letterSpacing: "1.5px", color: "#f9cb00", opacity: 0.7 }}>
                  STEP {i + 1}
                </span>

                {/* icon circle */}
                <div style={{ width: 52, height: 52, borderRadius: "14px", background: "#f9cb00", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {step.icon}
                </div>

                <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#ffffff", margin: "4px 0 0" }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: "12px", lineHeight: 1.6, color: "rgba(255,255,255,0.5)", margin: 0 }}>
                  {step.desc}
                </p>
              </div>

              {/* horizontal arrow connector */}
              {i < steps.length - 1 && (
                <div style={{ display: "flex", alignItems: "center", flexShrink: 0, padding: "0 6px" }}>
                  <div style={{ height: 1, width: 24, borderTop: "2px dashed rgba(249,203,0,0.3)" }} />
                  <svg width="8" height="12" viewBox="0 0 8 12" fill="none" style={{ marginLeft: "-1px" }}>
                    <path d="M1 1l5 5-5 5" stroke="#f9cb00" strokeOpacity="0.55" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Vertical flow — mobile only (app-like horizontal cards) */}
        <div className="hidden sm:flex flex-col w-full gap-3">
          {steps.map((step, i) => (
            <React.Fragment key={step.title}>
              {/* App-style row card: icon left, text right */}
              <div
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "18px",
                  padding: "16px 18px",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "16px",
                }}
              >
                {/* Step number + icon stacked */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", flexShrink: 0 }}>
                  <span style={{ fontSize: "9px", fontWeight: 800, letterSpacing: "1px", color: "#f9cb00", opacity: 0.7 }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div style={{ width: 48, height: 48, borderRadius: "14px", background: "#f9cb00", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {step.icon}
                  </div>
                </div>

                {/* Text */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#ffffff", margin: "0 0 4px" }}>
                    {step.title}
                  </h3>
                  <p style={{ fontSize: "13px", lineHeight: 1.6, color: "rgba(255,255,255,0.5)", margin: 0 }}>
                    {step.desc}
                  </p>
                </div>

                {/* Right chevron */}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, opacity: 0.25 }}>
                  <path d="M6 3l5 5-5 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              {/* Connector between cards */}
              {i < steps.length - 1 && (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", padding: "0 0 0 34px" }}>
                  <div style={{ width: 1, height: 16, borderLeft: "2px dashed rgba(249,203,0,0.25)" }} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
