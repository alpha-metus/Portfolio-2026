"use client";
import React from "react";
import { trackJoinClassClick } from "@/lib/fbPixel";

export default function MidPageCTA() {
  return (
    <section
      style={{ backgroundColor: "#0d0404" }}
      className="w-full py-24 px-5 md:py-16 sm:py-12"
    >
      <div className="max-w-[780px] mx-auto flex flex-col items-center text-center gap-6">

        {/* Headline — white + amber split */}
        <h2
          className="font-bold leading-[1.1] md:text-[42px] sm:text-[34px]"
          style={{ fontSize: "clamp(36px, 6vw, 62px)", color: "#ffffff" }}
        >
          Ready to make your{" "}
          <span style={{ color: "#f9cb00" }}>first move?</span>
        </h2>

        {/* Subtext */}
        <p
          className="max-w-[520px] leading-relaxed"
          style={{ color: "#ffffffbf", fontSize: "16px" }}
        >
          Join 2,000+ students trained by national &amp; international champions.
          Your free demo class is one click away.
        </p>

        {/* Buttons */}
        <div className="flex items-center gap-4 flex-wrap justify-center mt-2">
          <a
            href="#contact"
            onClick={trackJoinClassClick}
            style={{
              backgroundColor: "#f9cb00",
              color: "#000000",
              fontWeight: 700,
              fontSize: "15px",
              borderRadius: "999px",
              padding: "14px 32px",
              display: "inline-block",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.88")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
          >
            Book Free Demo Class
          </a>

          <a
            href="#pricing"
            style={{
              backgroundColor: "#2a2a2a",
              color: "#ffffff",
              fontWeight: 600,
              fontSize: "15px",
              borderRadius: "999px",
              padding: "14px 32px",
              display: "inline-block",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.8")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
          >
            View Programs
          </a>
        </div>

      </div>
    </section>
  );
}
