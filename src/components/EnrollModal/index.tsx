"use client";
import React, { useEffect } from "react";
import MainContentSection from "@/container/Home/components/MainContentSection";

interface EnrollModalProps {
  plan: string;
  onClose: () => void;
}

export default function EnrollModal({ plan, onClose }: EnrollModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center px-4"
      style={{ backgroundColor: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[480px] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Selected plan badge */}
        <div
          className="flex items-center justify-between mb-3 px-1"
        >
          <span
            style={{
              background: "#f9cb00",
              color: "#000",
              fontWeight: 700,
              fontSize: "12px",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              borderRadius: "999px",
              padding: "4px 14px",
            }}
          >
            {plan} Plan Selected
          </span>
          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "none",
              color: "#fff",
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              fontSize: "16px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ✕
          </button>
        </div>

        <MainContentSection />
      </div>
    </div>
  );
}
