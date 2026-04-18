"use client";
import React, { useEffect, useRef, useState } from "react";

const allTestimonials = [
  { name: "Elizaveta", review: "Aman is incredibly patient and explains complex strategies in a simple, relatable way. His sessions are engaging and interactive — I genuinely look forward to every class." },
  { name: "Ryan",      review: "Great teacher, very patient and good at explaining things." },
  { name: "Joel",      review: "Aman is a knowledgeable and patient tutor. He is calm, reassuring, and identifies specific actionable areas to improve my game. I would strongly recommend him." },
  { name: "Christopher", review: "Very knowledgeable and patient when I struggled with concepts. He's great at picking out your individual weaknesses and what you need to work on." },
  { name: "Sheeba",    review: "My daughter had plateaued in her rating for months. Aman identified her weaknesses, taught new tactics, and reviewed her games. Her rating is going up — Aman is the best!" },
  { name: "Tarek",     review: "Aman customizes lessons to each student — he takes time to know you before teaching, which dramatically increases success. A professional who loves chess. Highly recommend." },
  { name: "Jack",      review: "Aman had me play games and explain my moves, then discussed my strategy and why it worked or didn't. A great way to learn instead of just talking theory. Highly recommend." },
  { name: "Josh",      review: "Aman spotted deficiencies in my play quickly and built a training course that has had a positive impact. Great understanding of the game with very flexible hours." },
  { name: "Archna",    review: "Very kind and patient with both my kids. He gave them tools to think through and recognize their mistakes, creating a truly conducive learning environment." },
  { name: "Alan",      review: "My first lesson was exceptional! Really thoughtful assessment of my needs and a great approach to improvement. Can't wait for the next lesson!" },
  { name: "Raja",      review: "Aman had me solve puzzles, play from set positions, then reviewed where I could improve and explained opening themes. Looking forward to more sessions." },
  { name: "Harjinder", review: "Very patient with my kid, teaches him very well." },
  { name: "Max",       review: "Aman is an excellent teacher." },
  { name: "Jeremiah",  review: "Aman was very kind and super helpful. It was fun to learn from him!" },
  { name: "Dunia",     review: "A very good chess instructor — humble, knowledgeable and fun to work with. Great foundation for teaching chess." },
  { name: "Thomas",    review: "He stayed patient with me and took the time to explain things since I hadn't played chess in a while." },
  { name: "Amal",      review: "Very fun and interactive classes!" },
  { name: "Mason",     review: "Very friendly, smart, and knowledgeable about chess. Would recommend to anyone." },
  { name: "John",      review: "Two lessons in and I've already strengthened my game. Aman targets areas to improve quickly — excited to continue." },
  { name: "Elie",      review: "Excellent chess player and teacher who will develop your knowledge in a short time. I absolutely recommend Aman." },
  { name: "Alexis",    review: "Amazing. My 7-year-old really enjoyed his lessons!" },
  { name: "Greg",      review: "Very knowledgeable, patient, and encouraging." },
  { name: "Christian", review: "Very good at finding my strengths and weaknesses and showing me how I can improve." },
  { name: "Sammy",     review: "Very knowledgeable." },
  { name: "Jeremy",    review: "Great first session!" },
];

const row1 = allTestimonials.slice(0, 13);
const row2 = allTestimonials.slice(13);

interface ReviewRowProps {
  reviews: typeof allTestimonials;
  direction: "left" | "right";
  speed?: number;
}

function ReviewRow({ reviews, direction, speed = 22 }: ReviewRowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(direction === "right" ? -800 : 0);
  const pixelsPerFrame = speed / 60;
  const moveDir = direction === "left" ? -1 : 1;
  // quadruple so the loop is seamless
  const doubled = [...reviews, ...reviews, ...reviews, ...reviews];

  useEffect(() => {
    let rafId: number;
    let last: number;

    const animate = (ts: number) => {
      if (!last) last = ts;
      const elapsed = ts - last;
      last = ts;

      setPos((prev) => {
        const containerWidth = containerRef.current
          ? containerRef.current.scrollWidth / 4
          : 2000;
        let next = prev + (pixelsPerFrame * moveDir * elapsed) / 16.67;
        if (direction === "left" && Math.abs(next) >= containerWidth) next = 0;
        if (direction === "right" && next >= 0) next = -containerWidth;
        return next;
      });

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [direction, moveDir, pixelsPerFrame]);

  return (
    <div className="overflow-hidden py-3 relative w-full">
      <div
        ref={containerRef}
        className="flex gap-4"
        style={{ transform: `translateX(${pos}px)` }}
      >
        {doubled.map((t, i) => (
          <div
            key={i}
            style={{
              minWidth: "300px",
              maxWidth: "300px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(249,203,0,0.2)",
              borderRadius: "18px",
              padding: "18px 18px 14px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            {/* Stars */}
            <div style={{ color: "#f9cb00", fontSize: "14px", letterSpacing: "1px" }}>
              ★★★★★
            </div>

            {/* Review */}
            <p
              style={{
                color: "#ffffffbf",
                fontSize: "13px",
                lineHeight: "1.65",
                flex: 1,
                margin: 0,
                display: "-webkit-box",
                WebkitLineClamp: 4,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              &ldquo;{t.review}&rdquo;
            </p>

            {/* Author */}
            <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  backgroundColor: "#f9cb00",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: "13px",
                  color: "#000",
                  flexShrink: 0,
                }}
              >
                {t.name[0].toUpperCase()}
              </div>
              <p style={{ color: "#ffffff", fontWeight: 600, fontSize: "13px", margin: 0 }}>
                {t.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section
      className="py-20 md:py-12 sm:py-10 relative overflow-hidden"
      style={{ backgroundColor: "#0d0404" }}
    >
      {/* Fade edges */}
      <div className="absolute top-0 left-0 bottom-0 w-[12%] z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #0d0404, transparent)" }} />
      <div className="absolute top-0 right-0 bottom-0 w-[12%] z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #0d0404, transparent)" }} />

      {/* Heading */}
      <div className="flex flex-col items-center mb-12 md:mb-8 gap-3 text-center px-5">
        <h2
          className="font-semibold"
          style={{ color: "#ffffff", fontSize: "clamp(28px, 4vw, 48px)" }}
        >
          ♞ What Students &amp; Parents Say ♞
        </h2>
        <p style={{ color: "#ffffffbf", fontSize: "16px", maxWidth: "520px" }}>
          Real reviews from real students — every rating is a genuine 5 stars
        </p>
        <div className="flex items-center gap-2 mt-1">
          <span style={{ color: "#f9cb00", fontSize: "20px" }}>★★★★★</span>
          <span style={{ color: "#ffffff", fontWeight: 600, fontSize: "15px" }}>5.0 / 5</span>
          <span style={{ color: "#ffffffbf", fontSize: "14px" }}>· {allTestimonials.length} verified reviews</span>
        </div>
      </div>

      {/* Row 1 — scrolls left */}
      <ReviewRow reviews={row1} direction="left" speed={22} />

      {/* Row 2 — scrolls right */}
      <ReviewRow reviews={row2} direction="right" speed={20} />
    </section>
  );
}
