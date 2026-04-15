import React from "react";

const testimonials = [
  {
    quote:
      "My son went from barely knowing the rules to winning his school tournament in 4 months. The coaches are patient, structured, and genuinely care about progress.",
    name: "Priya Nair",
    role: "Parent · India",
    initials: "P",
  },
  {
    quote:
      "KwinBee's 1-on-1 sessions are the best investment we made for our daughter. She now competes in national-level tournaments and her confidence has skyrocketed.",
    name: "James Thornton",
    role: "Parent · United Kingdom",
    initials: "J",
  },
  {
    quote:
      "I tried other platforms but nothing compared to the personalised attention here. Weekly tournaments keep me sharp and the assignments are exactly what I needed.",
    name: "Aryan Kapoor",
    role: "Student, Age 14 · UAE",
    initials: "A",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="bg-black-900 py-20 px-5 md:py-12 relative">
      {/* Decorative chess pieces - top corners */}
      <div className="absolute top-10 left-5 text-[40px] opacity-20 pointer-events-none">♕</div>
      <div className="absolute top-10 right-5 text-[40px] opacity-20 pointer-events-none">♔</div>

      <div className="max-w-[1200px] mx-auto">

        {/* heading */}
        <div className="flex flex-col items-center mb-14 md:mb-10 gap-3 text-center">
          <h2
            className="font-semibold text-center"
            style={{ color: "#ffffff", fontSize: "clamp(30px, 4vw, 48px)" }}
          >
            ♞ What Parents &amp; Students Say ♞
          </h2>
          <p style={{ color: "#ffffffbf", fontSize: "16px", maxWidth: "520px" }}>
            Don&apos;t take our word for it — hear from the families we&apos;ve coached
          </p>
          {/* aggregate rating */}
          <div className="flex items-center gap-2 mt-1">
            <span style={{ color: "#f9cb00", fontSize: "20px" }}>★★★★★</span>
            <span style={{ color: "#ffffff", fontWeight: 600, fontSize: "15px" }}>4.9 / 5</span>
            <span style={{ color: "#ffffffbf", fontSize: "14px" }}>· 500+ reviews</span>
          </div>
        </div>

        {/* cards */}
        <div className="grid grid-cols-3 gap-6 md:grid-cols-1 relative">
          {/* Decorative chess piece between cards */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[60px] opacity-10 pointer-events-none hidden lg:hidden xl:block">♟</div>

          {testimonials.map((t, i) => {
            const chessPieces = ["♘", "♗", "♕"];
            return (
            <div
              key={i}
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(249,203,0,0.25)",
                borderRadius: "24px",
                padding: "32px",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                position: "relative",
              }}
            >
              {/* Small chess piece icon top-right corner */}
              <div style={{ position: "absolute", top: "12px", right: "16px", fontSize: "18px", opacity: 0.4 }}>
                {chessPieces[i % chessPieces.length]}
              </div>
              {/* stars */}
              <div style={{ color: "#f9cb00", fontSize: "18px", letterSpacing: "2px" }}>
                ★★★★★
              </div>

              {/* quote */}
              <p
                style={{
                  color: "#ffffffbf",
                  fontSize: "15px",
                  lineHeight: "1.75",
                  flex: 1,
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* author */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    backgroundColor: "#f9cb00",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: "16px",
                    color: "#000",
                    flexShrink: 0,
                  }}
                >
                  {t.initials}
                </div>
                <div>
                  <p style={{ color: "#ffffff", fontWeight: 600, fontSize: "14px" }}>{t.name}</p>
                  <p style={{ color: "#ffffffbf", fontSize: "12px" }}>{t.role}</p>
                </div>
              </div>
            </div>
          );
          })}
        </div>
      </div>
    </section>
  );
}
