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
              className="w-[94%] text-[12px] font-normal leading-[33px] md:w-full sm:text-center text-start"
            >
              At Kwinbee, we provide a well-rounded chess learning journey with
              1-on-1 sessions, group classes, weekly online tournaments, and
              puzzle-based assignments that help students improve through
              practice and play.
            </Text>
            <div className="flex items-center gap-[7px] mt-4 sm:justify-center justify-start w-full">
              <a href="#contact">
                <Heading
                  size="texts"
                  as="h3"
                  className="text-[20px] font-medium"
                >
                  Book your free class
                </Heading>
              </a>
              <Img
                src="img_arrow_left.svg"
                width={24}
                height={24}
                alt="Arrowleft"
                className="h-[24px] self-end"
              />
            </div>
          </div>
          {/* box section */}
          <div className="flex items-center min-h-[500px] md:h-auto px-6 py-6 sm:px-4 sm:py-5 rounded-xl w-full bg-amber-400 md:w-full">
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
