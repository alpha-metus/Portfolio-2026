"use client";

import React from "react";

interface MarqueeTextProps {
  items: string[];
}

const ScrollingBanner: React.FC<MarqueeTextProps> = ({ items }) => {
  const repeatedItems = [...items, ...items, ...items, ...items, ...items];

  return (
    <div className="w-full sm:object-none overflow-hidden bg-white-a700 mb-5 group transform -rotate-[1.2deg]">
      <div className="w-full  bg-yellow-400 py-2 mb-1.5">
        <div className="flex whitespace-nowrap animate-marquee group-hover:[animation-play-state:paused]">
          {repeatedItems.map((item, index) => {
            return (
              <span
                key={index}
                className="flex items-center px-5 text-base font-medium"
              >
                <span className="text-black-900 animate-pulse mr-2 relative -bottom-[2px]">
                  •
                </span>
                <span className="text-black-900">{item}</span>
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ScrollingBanner;
