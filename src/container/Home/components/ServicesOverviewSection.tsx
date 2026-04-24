import { Heading, Img, Text } from "@/components";
import MarketingSession from "@/components/MarketingSession";
import React from "react";
import { marketingSectionData } from "../config";

export default function ServicesOverviewSection() {
  return (
    <section id="features" className="scroll-mt-20">
      <div className="w-full mt-12 lg:mt-0 ">
        <div className="px-12 md:px-6 sm:px-4 flex flex-row md:flex-col justify-between w-full gap-12 md:gap-8 sm:gap-6">
          {/* text section  */}
          <div className="mt-28 md:mt-16 sm:mt-10 w-full flex-col gap-3.5">
            <Heading
              size="heading"
              as="h2"
              className="w-full sm:text-center text-start lg:w-[94%] text-[55px] font-semibold leading-[81px] md:w-full md:text-[44px] md:leading-[65px] sm:text-[28px] sm:leading-[41px]"
            >
              What do we provide at{" "}
              <span className="text-amber-400">Kwinbee</span>
            </Heading>
            <Text
              as="p"
              className="w-full text-[12px] font-normal leading-[33px] sm:text-center text-start"
            >
              At Kwinbee, we provide a well-rounded chess learning journey with
              1-on-1 sessions, group classes, weekly online tournaments, and
              puzzle-based assignments that help students improve through
              practice and play.
            </Text>
            <div className="flex items-center mt-6 sm:justify-center justify-start w-full">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-[16px] transition-opacity hover:opacity-85"
                style={{ background: "#f9cb00", color: "#0d0404" }}
              >
                Book Free Demo
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="#0d0404" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
          {/* box section */}
          <div
            className="flex items-center md:min-h-0 sm:min-h-0 min-h-[500px] px-6 py-6 sm:px-4 sm:py-5 rounded-xl w-full"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(249,203,0,0.18)",
            }}
          >
            <div className="grid grid-cols-2 gap-6 sm:gap-4 w-full sm:grid-cols-2">
              {marketingSectionData.map((d, index) => (
                <MarketingSession {...d} key={"listshoppingbag" + index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
