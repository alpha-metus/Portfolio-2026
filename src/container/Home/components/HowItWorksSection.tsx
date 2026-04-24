"use client";
import React from "react";

const steps = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="18" rx="3" stroke="#0d0404" strokeWidth="2"/>
        <path d="M3 9h18" stroke="#0d0404" strokeWidth="2"/>
        <path d="M8 2v4M16 2v4" stroke="#0d0404" strokeWidth="2" strokeLinecap="round"/>
        <rect x="7" y="13" width="3" height="3" rx="0.5" fill="#0d0404"/>
        <rect x="11" y="13" width="3" height="3" rx="0.5" fill="#0d0404"/>
      </svg>
    ),
    title: "Book Free Demo",
    desc: "Schedule a free 30-minute session to experience KwinBee coaching first-hand — zero commitment.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L4 7v5c0 4.5 3.3 8.7 8 9.9 4.7-1.2 8-5.4 8-9.9V7L12 2z" stroke="#0d0404" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M9 12l2 2 4-4" stroke="#0d0404" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Choose Your Program",
    desc: "Pick the plan that fits your level — 1-on-1 sessions, group classes, or competitive tournament prep.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="7" width="20" height="14" rx="2" stroke="#0d0404" strokeWidth="2"/>
        <path d="M7 7V5a5 5 0 0110 0v2" stroke="#0d0404" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="12" cy="14" r="2" fill="#0d0404"/>
      </svg>
    ),
    title: "Secure Payment",
    desc: "Pay online securely with flexible monthly plans. No hidden fees, cancel anytime.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="4" stroke="#0d0404" strokeWidth="2"/>
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#0d0404" strokeWidth="2" strokeLinecap="round"/>
        <path d="M17 6l1.5-1.5M19 9h2" stroke="#0d0404" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: "Meet Your Coach",
    desc: "Get matched with a certified coach — national or international level — tailored to your skill and schedule.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="5" width="15" height="12" rx="2" stroke="#0d0404" strokeWidth="2"/>
        <path d="M17 9l5-3v10l-5-3V9z" stroke="#0d0404" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M6 11h6M6 14h4" stroke="#0d0404" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Live Classes Begin",
    desc: "Attend interactive live sessions on Zoom or Google Meet with real-time board analysis and personalised feedback.",
  },
];

export default function HowItWorksSection() {
  return (
    <section
      className="w-full py-24 px-6"
      style={{ backgroundColor: "#0d0404" }}
    >
      {/* heading */}
      <div className="text-center mb-16">
        <p
          style={{
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "#f9cb00",
            marginBottom: "12px",
          }}
        >
          The Process
        </p>
        <h2
          style={{
            fontSize: "clamp(28px, 4vw, 44px)",
            fontWeight: 800,
            color: "#ffffff",
            lineHeight: 1.15,
            margin: 0,
          }}
        >
          From first click to{" "}
          <span style={{ color: "#f9cb00" }}>grandmaster mindset.</span>
        </h2>
        <p
          style={{
            fontSize: "15px",
            color: "rgba(255,255,255,0.5)",
            marginTop: "12px",
          }}
        >
          Five simple steps — start learning chess the right way.
        </p>
      </div>

      {/* flow */}
      <div
        className="mx-auto flex flex-col items-center"
        style={{ maxWidth: "460px" }}
      >
        {steps.map((step, i) => (
          <React.Fragment key={step.title}>
            {/* card */}
            <div
              style={{
                width: "100%",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.09)",
                borderRadius: "20px",
                padding: "28px 28px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: "12px",
                transition: "border-color 0.2s, background 0.2s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = "rgba(249,203,0,0.35)";
                el.style.background = "rgba(249,203,0,0.04)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = "rgba(255,255,255,0.09)";
                el.style.background = "rgba(255,255,255,0.04)";
              }}
            >
              {/* step number + icon */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 800,
                    letterSpacing: "1.5px",
                    color: "#f9cb00",
                    opacity: 0.7,
                  }}
                >
                  STEP {i + 1}
                </span>
              </div>

              <div
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: "16px",
                  background: "#f9cb00",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {step.icon}
              </div>

              <div>
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "#ffffff",
                    margin: "0 0 6px",
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontSize: "14px",
                    lineHeight: 1.65,
                    color: "rgba(255,255,255,0.55)",
                    margin: 0,
                  }}
                >
                  {step.desc}
                </p>
              </div>
            </div>

            {/* connector arrow — not after last step */}
            {i < steps.length - 1 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "6px 0",
                  gap: "2px",
                }}
              >
                {/* dashed line */}
                <div
                  style={{
                    width: 1,
                    height: 28,
                    borderLeft: "2px dashed rgba(249,203,0,0.3)",
                  }}
                />
                {/* arrow head */}
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                  <path
                    d="M1 1l5 5 5-5"
                    stroke="#f9cb00"
                    strokeOpacity="0.55"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
