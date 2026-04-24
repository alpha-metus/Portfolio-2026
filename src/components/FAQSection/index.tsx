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
      <div className="max-w-[860px] mx-auto">

        {/* ── Heading ── */}
        <div className="text-center mb-12 md:mb-10">
          <span
            className="inline-block uppercase tracking-[3px] text-[11px] font-bold mb-4 px-4 py-1.5 rounded-full"
            style={{ color: "#f9cb00", background: "rgba(249,203,0,0.1)", border: "1px solid rgba(249,203,0,0.25)" }}
          >
            Got questions?
          </span>
          <h2
            className="font-bold leading-tight"
            style={{ color: "#ffffff", fontSize: "clamp(26px, 4vw, 44px)" }}
          >
            Frequently Asked Questions
          </h2>
          <p
            className="mt-3"
            style={{ color: "rgba(255,255,255,0.5)", fontSize: "15px", maxWidth: "460px", margin: "10px auto 0" }}
          >
            Everything you need to know before booking your first class
          </p>
        </div>

        {/* ── Accordion ── */}
        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                style={{
                  borderRadius: "18px",
                  overflow: "hidden",
                  border: isOpen
                    ? "1.5px solid rgba(249,203,0,0.45)"
                    : "1.5px solid rgba(255,255,255,0.08)",
                  background: isOpen
                    ? "linear-gradient(135deg, rgba(249,203,0,0.07) 0%, rgba(249,203,0,0.02) 100%)"
                    : "rgba(255,255,255,0.025)",
                  boxShadow: isOpen ? "0 4px 28px rgba(249,203,0,0.08)" : "none",
                  transition: "border-color 0.25s, background 0.25s, box-shadow 0.25s",
                }}
              >
                {/* Question button */}
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between gap-5 text-left cursor-pointer sm:gap-3"
                  style={{
                    background: "transparent",
                    border: "none",
                    padding: "20px 24px",
                    minHeight: "60px", // min touch target
                  }}
                  aria-expanded={isOpen}
                >
                  {/* Number + Question */}
                  <div className="flex items-center gap-4 sm:gap-3">
                    <span
                      className="flex-shrink-0 font-bold text-[12px] tabular-nums"
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        background: isOpen ? "#f9cb00" : "rgba(249,203,0,0.12)",
                        color: isOpen ? "#0d0404" : "#f9cb00",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="font-semibold leading-snug sm:text-[14px]"
                      style={{
                        color: isOpen ? "#f9cb00" : "#ffffff",
                        fontSize: "15.5px",
                        transition: "color 0.2s",
                      }}
                    >
                      {faq.q}
                    </span>
                  </div>

                  {/* Chevron icon */}
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    className="flex-shrink-0 transition-transform duration-300"
                    style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                  >
                    <path
                      d="M4 6.5L9 11.5L14 6.5"
                      stroke={isOpen ? "#f9cb00" : "rgba(255,255,255,0.4)"}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {/* Answer — divider + text */}
                {isOpen && (
                  <>
                    <div style={{ height: 1, background: "rgba(249,203,0,0.15)", margin: "0 24px" }} />
                    <div
                      style={{
                        padding: "16px 24px 22px",
                        paddingLeft: "64px",
                        color: "rgba(255,255,255,0.78)",
                        fontSize: "14.5px",
                        lineHeight: "1.8",
                      }}
                      className="sm:pl-6"
                    >
                      {faq.a}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* ── Bottom CTA ── */}
        <div
          className="mt-10 flex items-center justify-center gap-3 py-4 px-6 rounded-2xl sm:flex-col sm:text-center"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px" }}>
            Still have questions?
          </span>
          <a
            href="mailto:chess@kwinbee.com"
            className="inline-flex items-center gap-1.5 font-semibold text-[14px] transition-opacity hover:opacity-80"
            style={{ color: "#f9cb00" }}
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M1 3.5h13M1 3.5v9h13v-9M1 3.5l6.5 5 6.5-5" stroke="#f9cb00" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            chess@kwinbee.com
          </a>
        </div>

      </div>
    </section>
  );
}
