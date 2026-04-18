"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export const CONSENT_KEY = "kwinbee_cookie_consent";
export type ConsentLevel = "all" | "necessary";

export function getStoredConsent(): ConsentLevel | null {
  if (typeof window === "undefined") return null;
  return (localStorage.getItem(CONSENT_KEY) as ConsentLevel) ?? null;
}

export function grantTracking() {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("consent", "grant");
  }
}

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const stored = getStoredConsent();
    if (!stored) {
      // Small delay so it doesn't flash on first paint
      const t = setTimeout(() => setShow(true), 800);
      return () => clearTimeout(t);
    }
    // If previously accepted all, grant tracking immediately
    if (stored === "all") grantTracking();
  }, []);

  const accept = (level: ConsentLevel) => {
    localStorage.setItem(CONSENT_KEY, level);
    setShow(false);
    if (level === "all") grantTracking();
  };

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      style={{
        position: "fixed",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9000,
        width: "min(680px, calc(100vw - 32px))",
        backgroundColor: "#111",
        border: "1px solid rgba(249,203,0,0.25)",
        borderRadius: "18px",
        padding: "22px 28px",
        boxShadow: "0 20px 60px rgba(0,0,0,0.8)",
        animation: "slideUp 0.3s ease",
      }}
    >
      <div style={{ display: "flex", gap: "20px", alignItems: "flex-start", flexWrap: "wrap" }}>
        {/* Icon + text */}
        <div style={{ flex: 1, minWidth: "240px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
            <span style={{ fontSize: "20px" }}>🍪</span>
            <span style={{ color: "#fff", fontWeight: 700, fontSize: "15px" }}>
              We use cookies
            </span>
          </div>
          <p style={{ color: "#9ca3af", fontSize: "12px", lineHeight: 1.6, margin: 0 }}>
            We use cookies to improve your experience and for analytics (Meta Pixel).
            Tracking cookies are <strong style={{ color: "#fff" }}>only activated</strong> with
            your consent. Our site is used by children — we follow COPPA &amp; GDPR guidelines.{" "}
            <Link
              href="/privacy-policy"
              style={{ color: "#f9cb00", textDecoration: "underline", fontSize: "12px" }}
            >
              Privacy Policy
            </Link>
          </p>
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", flexShrink: 0 }}>
          <button
            onClick={() => accept("all")}
            style={{
              backgroundColor: "#f9cb00",
              color: "#000",
              border: "none",
              borderRadius: "10px",
              padding: "10px 22px",
              fontWeight: 800,
              fontSize: "13px",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            Accept All
          </button>
          <button
            onClick={() => accept("necessary")}
            style={{
              backgroundColor: "rgba(255,255,255,0.08)",
              color: "#9ca3af",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "10px",
              padding: "10px 22px",
              fontWeight: 600,
              fontSize: "13px",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            Necessary Only
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateX(-50%) translateY(20px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </div>
  );
}
