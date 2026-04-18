import React from "react";

const testimonials = [
  {
    name: "Elizaveta",
    review:
      "Aman is incredibly patient and explains complex strategies in a simple, relatable way. His sessions are engaging and interactive — I genuinely look forward to every class.",
  },
  {
    name: "Ryan",
    review: "Great teacher, very patient and good at explaining things.",
  },
  {
    name: "Joel",
    review:
      "Aman is a knowledgeable and patient tutor. He is calm, reassuring, and identifies specific actionable areas to improve my game. I would strongly recommend him.",
  },
  {
    name: "Christopher",
    review:
      "Very knowledgeable and patient when I struggled with concepts. He's great at picking out your individual weaknesses and what you need to work on.",
  },
  {
    name: "Sheeba",
    review:
      "My daughter had plateaued in her rating for months. Aman identified her weaknesses, taught new tactics, and reviewed her games. Very professional — her rating is going up. Aman is the best!",
  },
  {
    name: "Tarek",
    review:
      "Aman customizes lessons to each student — he takes time to know you before teaching, which dramatically increases success. A professional who loves chess. Highly recommend.",
  },
  {
    name: "Jack",
    review:
      "Aman had me play games and explain my moves, then discussed my strategy and why it worked or didn't. A great way to learn instead of just talking theory. Highly recommend.",
  },
  {
    name: "Josh",
    review:
      "Aman spotted deficiencies in my play quickly and built a training course that has had a positive impact. Great understanding of the game with very flexible hours.",
  },
  {
    name: "Archna",
    review:
      "Very kind and patient with both my kids. He gave them tools to think through and recognize their mistakes, creating a truly conducive learning environment.",
  },
  {
    name: "Alan",
    review:
      "My first lesson was exceptional! Really thoughtful assessment of my needs and a great approach to improvement. Can't wait for the next lesson!",
  },
  {
    name: "Raja",
    review:
      "Aman had me solve puzzles, play from set positions, then reviewed where I could improve and explained opening themes. I liked his approach and look forward to more sessions.",
  },
  {
    name: "Harjinder",
    review: "Very patient with my kid, teaches him very well.",
  },
  {
    name: "Max",
    review: "Aman is an excellent teacher.",
  },
  {
    name: "Jeremiah",
    review: "Aman was very kind and super helpful. It was fun to learn from him!",
  },
  {
    name: "Dunia",
    review:
      "A very good chess instructor — humble, knowledgeable and fun to work with. Great foundation for teaching chess.",
  },
  {
    name: "Thomas",
    review:
      "He stayed patient with me and took the time to explain things since I hadn't played chess in a while.",
  },
  {
    name: "Amal",
    review: "Very fun and interactive classes!",
  },
  {
    name: "Mason",
    review:
      "Very friendly, smart, and knowledgeable about chess. Would recommend to anyone.",
  },
  {
    name: "John",
    review:
      "Two lessons in and I've already strengthened my game. Aman targets areas to improve quickly — excited to continue.",
  },
  {
    name: "Elie",
    review:
      "Excellent chess player and teacher who will develop your knowledge in a short time. I absolutely recommend Aman.",
  },
  {
    name: "Alexis",
    review: "Amazing. My 7-year-old really enjoyed his lessons!",
  },
  {
    name: "Greg",
    review: "Very knowledgeable, patient, and encouraging.",
  },
  {
    name: "Christian",
    review:
      "Very good at finding my strengths and weaknesses and showing me how I can improve.",
  },
  {
    name: "Sammy",
    review: "Very knowledgeable.",
  },
  {
    name: "Jeremy",
    review: "Great first session!",
  },
];

const chessPieces = ["♘", "♗", "♕", "♖", "♙", "♞"];

export default function TestimonialsSection() {
  return (
    <section
      className="py-20 px-8 md:py-12 md:px-6 sm:py-10 sm:px-4 relative"
      style={{ backgroundColor: "#0d0404" }}
    >
      {/* Decorative corner pieces */}
      <div className="absolute top-10 left-5 text-[40px] opacity-20 pointer-events-none">♕</div>
      <div className="absolute top-10 right-5 text-[40px] opacity-20 pointer-events-none">♔</div>

      <div className="max-w-[1200px] mx-auto">
        {/* Heading */}
        <div className="flex flex-col items-center mb-14 md:mb-10 sm:mb-8 gap-3 text-center">
          <h2
            className="font-semibold"
            style={{ color: "#ffffff", fontSize: "clamp(30px, 4vw, 48px)" }}
          >
            ♞ What Students &amp; Parents Say ♞
          </h2>
          <p style={{ color: "#ffffffbf", fontSize: "16px", maxWidth: "520px" }}>
            Real reviews from real students — every rating is a genuine 5 stars
          </p>
          {/* Aggregate rating */}
          <div className="flex items-center gap-2 mt-1">
            <span style={{ color: "#f9cb00", fontSize: "20px" }}>★★★★★</span>
            <span style={{ color: "#ffffff", fontWeight: 600, fontSize: "15px" }}>
              5.0 / 5
            </span>
            <span style={{ color: "#ffffffbf", fontSize: "14px" }}>
              · {testimonials.length} verified reviews
            </span>
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-3 gap-5 md:grid-cols-2 sm:grid-cols-1">
          {testimonials.map((t, i) => (
            <div
              key={i}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(249,203,0,0.2)",
                borderRadius: "20px",
                padding: "22px 20px 18px",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
                position: "relative",
              }}
            >
              {/* Chess piece watermark */}
              <div
                style={{
                  position: "absolute",
                  top: "12px",
                  right: "14px",
                  fontSize: "16px",
                  opacity: 0.3,
                }}
              >
                {chessPieces[i % chessPieces.length]}
              </div>

              {/* Stars */}
              <div style={{ color: "#f9cb00", fontSize: "15px", letterSpacing: "1px" }}>
                ★★★★★
              </div>

              {/* Review text */}
              <p
                style={{
                  color: "#ffffffbf",
                  fontSize: "14px",
                  lineHeight: "1.7",
                  flex: 1,
                  margin: 0,
                }}
              >
                &ldquo;{t.review}&rdquo;
              </p>

              {/* Author */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    backgroundColor: "#f9cb00",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: "14px",
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
    </section>
  );
}
