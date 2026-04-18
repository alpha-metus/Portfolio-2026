"use client";
import React, { useState } from "react";

const faqs = [
  {
    q: "How do I start learning chess online?",
    a: "Book a free demo class with KwinBee. Our coaches assess your current level and create a personalised training plan. No experience needed — we teach complete beginners through to advanced players.",
  },
  {
    q: "Is KwinBee suitable for kids?",
    a: "Absolutely. KwinBee specialises in chess coaching for children. Our coaches are patient, engaging, and experienced in teaching kids from age 5 and above. Parents report significant improvement in focus, problem-solving, and academic performance.",
  },
  {
    q: "How much does online chess coaching cost?",
    a: "KwinBee offers flexible plans from 1 month to 12 months. All plans include live 1-on-1 sessions, online tournaments, and puzzle assignments. Book a free demo class first — no payment needed to start.",
  },
  {
    q: "Can I improve my chess rating with online coaching?",
    a: "Yes. Our students consistently improve their ratings through personalised coaching, targeted tactics training, and weekly tournament practice. Many students see rating gains within the first few months.",
  },
  {
    q: "Who are KwinBee's chess coaches?",
    a: "KwinBee's coaches are national and international chess champions with proven teaching experience. They specialise in identifying your weaknesses and building a focused improvement plan tailored to your playstyle.",
  },
  {
    q: "Do you offer chess lessons for complete beginners?",
    a: "Yes. KwinBee welcomes complete beginners. We start from the basics — piece movement, board control, and tactics — and build at your own pace all the way to advanced tournament strategy.",
  },
  {
    q: "Is online chess coaching as effective as in-person lessons?",
    a: "Yes. KwinBee uses interactive boards, screen sharing, and real-time game analysis, making online coaching just as effective as in-person — with the added flexibility of learning from anywhere in the world.",
  },
  {
    q: "What age group does KwinBee cater to?",
    a: "KwinBee coaches students of all ages — from young children (age 5+) to adults. We have tailored programmes for juniors, teenagers, and adult learners at every skill level.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section
      className="w-full py-20 px-8 md:py-14 md:px-6 sm:py-10 sm:px-4"
      style={{ backgroundColor: "#0d0404" }}
    >
      <div className="max-w-[820px] mx-auto">
        {/* Heading */}
        <div className="text-center mb-12 md:mb-8">
          <p
            className="uppercase tracking-[3px] text-[11px] font-bold mb-3"
            style={{ color: "#f9cb00" }}
          >
            Got questions?
          </p>
          <h2
            className="font-bold leading-tight"
            style={{ color: "#ffffff", fontSize: "clamp(26px, 4vw, 44px)" }}
          >
            Frequently Asked Questions
          </h2>
          <p
            className="mt-3 text-[15px]"
            style={{ color: "rgba(255,255,255,0.55)", maxWidth: "480px", margin: "12px auto 0" }}
          >
            Everything you need to know before booking your first class
          </p>
        </div>

        {/* Accordion */}
        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                style={{
                  border: isOpen
                    ? "1px solid rgba(249,203,0,0.5)"
                    : "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "16px",
                  background: isOpen
                    ? "rgba(249,203,0,0.06)"
                    : "rgba(255,255,255,0.03)",
                  transition: "border-color 0.2s, background 0.2s",
                  overflow: "hidden",
                }}
              >
                {/* Question row */}
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between gap-4 text-left px-6 py-5 sm:px-4 sm:py-4 cursor-pointer"
                  style={{ background: "transparent", border: "none" }}
                  aria-expanded={isOpen}
                >
                  <span
                    className="font-semibold text-[15px] sm:text-[14px] leading-snug"
                    style={{ color: isOpen ? "#f9cb00" : "#ffffff" }}
                  >
                    {faq.q}
                  </span>

                  {/* +/– icon */}
                  <span
                    className="flex-shrink-0 flex items-center justify-center rounded-full font-bold text-[18px] transition-transform duration-200"
                    style={{
                      width: 28,
                      height: 28,
                      background: isOpen ? "#f9cb00" : "rgba(255,255,255,0.1)",
                      color: isOpen ? "#0d0404" : "#ffffff",
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                  >
                    +
                  </span>
                </button>

                {/* Answer */}
                {isOpen && (
                  <div
                    className="px-6 pb-5 sm:px-4 sm:pb-4 text-[14px] leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.72)" }}
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-10">
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px" }}>
            Still have questions?{" "}
            <a
              href="mailto:chess@kwinbee.com"
              style={{ color: "#f9cb00", fontWeight: 600, textDecoration: "underline" }}
            >
              Email us at chess@kwinbee.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
