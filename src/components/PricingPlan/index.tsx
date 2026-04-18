"use client";
import React from "react";
import { trackEvent } from "@/lib/fbPixel";

interface PricingPlanProps {
  duration: string;
  sessions: string;
  tournaments: string;
  assignments: string;
  dashboard: string;
  isBestseller?: boolean;
  badge?: string | null;
  bestFor?: string;
  spotsLeft?: number | null;
  className?: string;
  onEnroll?: (plan: string) => void;
}

function GoldCheck({ dark }: { dark?: boolean }) {
  return (
    <div
      className="flex-shrink-0 flex items-center justify-center rounded-full"
      style={{
        width: 22,
        height: 22,
        background: dark ? "rgba(13,4,4,0.14)" : "rgba(249,203,0,0.12)",
      }}
    >
      <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
        <path
          d="M1 4.5L4 7.5L10 1"
          stroke={dark ? "#0d0404" : "#f9cb00"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export default function PricingPlan({
  duration,
  sessions,
  tournaments,
  assignments,
  dashboard,
  isBestseller = false,
  badge,
  bestFor,
  spotsLeft,
  className = "",
  onEnroll,
}: PricingPlanProps) {
  const handleClick = () => {
    trackEvent("Enroll_Event", {
      content_name: "Book Free Demo Button",
      content_category: "Pricing Plan",
      source: "pricing_section",
      plan_name: duration,
    });
    if (onEnroll) onEnroll(duration);
  };

  const features = [sessions, tournaments, assignments, dashboard];

  return (
    <div
      className={`${className} relative flex flex-col w-full rounded-[28px] transition-transform duration-200 ${
        isBestseller ? "sm:scale-100 scale-[1.04]" : "hover:scale-[1.02]"
      }`}
      style={{
        padding: "28px 22px 22px",
        border: isBestseller
          ? "2px solid #f9cb00"
          : badge === "BEST VALUE"
          ? "2px solid rgba(249,203,0,0.4)"
          : "2px solid rgba(255,255,255,0.12)",
        background: isBestseller
          ? "linear-gradient(150deg, #f9cb00 0%, #f1c502 100%)"
          : "rgba(255,255,255,0.04)",
        boxShadow: isBestseller
          ? "0 0 48px rgba(249,203,0,0.28), 0 8px 32px rgba(0,0,0,0.4)"
          : "0 4px 24px rgba(0,0,0,0.3)",
      }}
    >
      {/* ── Badge pill ── */}
      {badge && (
        <div
          className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap px-4 py-1.5 rounded-full text-[11px] font-extrabold tracking-[1.5px] uppercase z-10"
          style={{
            background: isBestseller ? "#0d0404" : "#f9cb00",
            color: isBestseller ? "#f9cb00" : "#0d0404",
          }}
        >
          {badge === "MOST POPULAR" ? "🔥 " : "⭐ "}
          {badge}
        </div>
      )}

      {/* ── Duration ── */}
      <h3
        className="text-[26px] font-extrabold tracking-tight text-center mt-1"
        style={{ color: isBestseller ? "#0d0404" : "#ffffff" }}
      >
        {duration}
      </h3>

      {/* ── Best for tagline ── */}
      {bestFor && (
        <p
          className="text-[12px] font-semibold text-center mt-1"
          style={{ color: isBestseller ? "rgba(13,4,4,0.6)" : "rgba(255,255,255,0.45)" }}
        >
          Best for: {bestFor}
        </p>
      )}

      {/* ── Divider ── */}
      <div
        className="w-full h-px my-4"
        style={{
          background: isBestseller
            ? "rgba(13,4,4,0.18)"
            : "rgba(255,255,255,0.08)",
        }}
      />

      {/* ── Features list ── */}
      <div className="flex flex-col gap-3 flex-1">
        {features.map((feat, i) => (
          <div key={i} className="flex items-center gap-3">
            <GoldCheck dark={isBestseller} />
            <span
              className="text-[13px] sm:text-[12px] font-semibold leading-tight"
              style={{ color: isBestseller ? "#0d0404" : "rgba(255,255,255,0.88)" }}
            >
              {feat}
            </span>
          </div>
        ))}
      </div>

      {/* ── CTA Button ── */}
      <button
        type="button"
        onClick={handleClick}
        className="w-full mt-6 py-3.5 rounded-[26px] font-bold text-[15px] cursor-pointer transition-opacity duration-150 hover:opacity-85 active:opacity-75"
        style={{
          background: isBestseller ? "#0d0404" : "#f9cb00",
          color: isBestseller ? "#f9cb00" : "#0d0404",
          border: "none",
        }}
      >
        Book Free Demo
      </button>

      {/* ── Urgency text ── */}
      {spotsLeft != null && (
        <p
          className="text-center text-[11px] font-bold mt-2.5"
          style={{ color: isBestseller ? "rgba(13,4,4,0.7)" : "#f9cb00" }}
        >
          🔥 Only {spotsLeft} spots left this month
        </p>
      )}
    </div>
  );
}
