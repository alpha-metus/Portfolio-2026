"use client";

import PricingPlan from "@/components/PricingPlan";
import EnrollModal from "@/components/EnrollModal";
import React, { useState } from "react";
import { pricingPlans } from "../config";

export default function PricingSection() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  return (
    <div
      id="pricing"
      className="relative h-auto sm:pb-[40px] bg-[radial-gradient(ellipse_at_center,rgba(250,204,0,0.8)_0%,rgba(150,120,0,0.6)_30%,rgba(80,50,0,0.4)_55%,rgba(13,4,4,1)_80%)] py-12 scroll-mt-20"
    >
      {/* Chess piece decorations */}
      <div className="absolute top-8 left-8 text-[40px] opacity-30 pointer-events-none">♕</div>
      <div className="absolute top-8 right-8 text-[40px] opacity-30 pointer-events-none">♕</div>

      <div className="w-full mx-auto flex flex-col items-center bg-blue_gray-700_7f rounded-[50px] py-7 relative z-10">
        <h2
          style={{
            fontFamily: "var(--font-quicksand, sans-serif)",
            fontSize: "clamp(22px, 5vw, 48px)",
            fontWeight: 700,
            letterSpacing: "-0.48px",
            color: "#ffffff",
            textAlign: "center",
            padding: "0 12px",
          }}
        >
          ♔ Simple, Flexible Plans ♔
        </h2>
        <p
          style={{
            marginTop: "14px",
            textAlign: "center",
            fontWeight: 700,
            fontSize: "clamp(14px, 3vw, 20px)",
            color: "#ffffff",
            padding: "0 16px",
            lineHeight: 1.45,
          }}
        >
          Pick a plan and book your free demo — no payment needed to start
        </p>
        <p
          style={{
            marginTop: "8px",
            fontSize: "clamp(11px, 2.5vw, 14px)",
            color: "#f9cb00",
            fontWeight: 500,
            textAlign: "center",
            padding: "0 12px",
          }}
        >
          ✓ No hidden fees &nbsp;·&nbsp; ✓ Cancel anytime &nbsp;·&nbsp; ✓ Start with a free class
        </p>

        {/* Urgency banner */}
        <div
          className="mt-6 flex items-center gap-2 px-5 py-2.5 rounded-full"
          style={{
            background: "rgba(249,203,0,0.1)",
            border: "1px solid rgba(249,203,0,0.3)",
          }}
        >
          <span
            style={{
              fontSize: "clamp(11px, 2.5vw, 13px)",
              fontWeight: 700,
              color: "#f9cb00",
            }}
          >
            📅 Next cohort starts May 2026 —{" "}
            <span style={{ color: "#ffffff", fontWeight: 500 }}>
              Secure your spot before it fills up
            </span>
          </span>
        </div>

        <div className="w-full mt-10 px-5 md:px-4 sm:px-3">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:grid-cols-1 sm:gap-4">
            {pricingPlans.map((plan, index) => (
              <PricingPlan
                key={`plan-${index}`}
                {...plan}
                className="border-white-a700"
                onEnroll={(planName) => setSelectedPlan(planName)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Enroll modal */}
      {selectedPlan && (
        <EnrollModal
          plan={selectedPlan}
          onClose={() => setSelectedPlan(null)}
        />
      )}
    </div>
  );
}
