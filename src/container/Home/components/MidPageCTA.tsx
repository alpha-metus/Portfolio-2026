"use client";
import React from "react";
import { trackJoinClassClick } from "@/lib/fbPixel";

export default function MidPageCTA() {
  return (
    <section className="bg-amber-a400_01 py-14 px-5">
      <div className="max-w-[900px] mx-auto flex flex-col items-center text-center gap-5">
        <h2 className="text-black-900_02 text-[38px] font-bold leading-tight md:text-[30px] sm:text-[26px]">
          Ready to make your first move?
        </h2>
        <p className="text-black-900 text-[16px] max-w-[540px] font-medium opacity-80">
          Join 2,000+ students trained by national &amp; international champions.
          Your free demo class is one click away.
        </p>
        <div className="flex gap-4 flex-wrap justify-center mt-2">
          <a
            href="#contact"
            onClick={trackJoinClassClick}
            className="bg-black-900 text-white-a700 font-bold text-[16px] rounded-[32px] px-10 py-4 hover:opacity-90 transition-opacity"
          >
            Book Free Demo Class →
          </a>
        </div>
        <p className="text-[13px] text-black-900 font-medium opacity-70">
          ✓ No credit card &nbsp;·&nbsp; ✓ No commitment &nbsp;·&nbsp; ✓ Instant confirmation
        </p>
      </div>
    </section>
  );
}
