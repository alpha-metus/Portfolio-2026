"use client";

import { Heading } from "@/components";
import PricingPlan from "@/components/PricingPlan";
import React from "react";
import { pricingPlans } from "../config";

export default function PricingSection() {
  return (
    <div
      id="pricing"
      className="relative h-auto sm:pb-[40px] bg-[radial-gradient(ellipse_at_center,rgba(250,204,0,0.8)_0%,rgba(150,120,0,0.6)_30%,rgba(80,50,0,0.4)_55%,rgba(13,4,4,1)_80%)] py-12"
    >
      <div className="w-full mx-auto flex flex-col items-center bg-blue_gray-700_7f rounded-[50px] py-7">
        <Heading
          size="h2"
          as="h2"
          className="!font-quicksand text-[48px] font-bold tracking-[-0.48px] md:text-[44px] sm:text-[38px]"
        >
          Simple, Flexible Plans
        </Heading>
        <Heading
          size="body_test"
          as="h3"
          className="mt-3.5 text-center !font-nunitosans text-[20px] font-bold tracking-[-0.20px]"
        >
          Pick a plan and book your free demo — no payment needed to start
        </Heading>
        <p className="mt-2 text-[14px] text-amber-400 font-medium">
          ✓ No hidden fees &nbsp;·&nbsp; ✓ Cancel anytime &nbsp;·&nbsp; ✓ Start with a free class
        </p>

        <div className="w-full mt-10 px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingPlans.map((plan, index) => (
              <PricingPlan
                key={`plan-${index}`}
                {...plan}
                className="border-white-a700"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
