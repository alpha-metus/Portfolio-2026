import React from "react";
import { Heading } from "@/components/Heading";

const testimonials = [
  {
    quote:
      "My son went from barely knowing the rules to winning his school tournament in 4 months. The coaches are patient, structured, and genuinely care about progress.",
    name: "Priya Nair",
    role: "Parent · India",
    rating: 5,
  },
  {
    quote:
      "KwinBee's 1-on-1 sessions are the best investment we made for our daughter. She now competes in national-level tournaments and her confidence has skyrocketed.",
    name: "James Thornton",
    role: "Parent · United Kingdom",
    rating: 5,
  },
  {
    quote:
      "I tried other platforms but nothing compared to the personalised attention here. Weekly tournaments keep me sharp and the assignments are exactly what I needed.",
    name: "Aryan Kapoor",
    role: "Student, Age 14 · UAE",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="bg-black-900 py-20 px-5 md:py-12">
      <div className="max-w-[1200px] mx-auto">
        {/* heading */}
        <div className="flex flex-col items-center mb-14 md:mb-10 gap-3">
          <Heading
            as="h2"
            className="text-[48px] font-semibold text-center md:text-[38px] sm:text-[30px]"
          >
            What Parents &amp; Students Say
          </Heading>
          <p className="text-[16px] text-white-a700_bf text-center max-w-[560px]">
            Don&apos;t take our word for it — hear directly from the families we&apos;ve coached
          </p>
          {/* aggregate rating */}
          <div className="flex items-center gap-2 mt-2">
            <span className="text-amber-400 text-[22px] tracking-wider">★★★★★</span>
            <span className="text-white-a700 font-semibold text-[16px]">4.9 / 5</span>
            <span className="text-white-a700_bf text-[14px]">· 500+ reviews</span>
          </div>
        </div>

        {/* cards */}
        <div className="grid grid-cols-3 gap-6 md:grid-cols-1 sm:grid-cols-1">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="flex flex-col justify-between rounded-[24px] border border-amber-400 border-opacity-30 bg-white-a700_0a p-8 sm:p-6 gap-6"
              style={{ background: "rgba(255,255,255,0.04)" }}
            >
              {/* stars */}
              <div className="text-amber-400 text-[18px] tracking-wider">
                {"★".repeat(t.rating)}
              </div>
              {/* quote */}
              <p className="text-white-a700_bf text-[15px] leading-[1.75] flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>
              {/* author */}
              <div className="flex items-center gap-3 mt-2">
                <div className="w-10 h-10 rounded-full bg-amber-a400_01 flex items-center justify-center font-bold text-black-900_02 text-[16px] shrink-0">
                  {t.name[0]}
                </div>
                <div>
                  <p className="text-white-a700 font-semibold text-[14px]">{t.name}</p>
                  <p className="text-white-a700_bf text-[12px]">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
