"use client";
import Image from "next/image";
import { useState } from "react";

// Coordinates derived exactly from the SVG colored hexagon paths (viewBox 1215×694)
const pins = [
  // ── North America ──
  { country: "Canada",        flag: "🇨🇦", name: "Noah Williams",    age: 8,  x: 8.5,  y: 21.5, color: "#392DCA" },
  { country: "Canada",        flag: "🇨🇦", name: "Sophie Tremblay",  age: 11, x: 16.9, y: 20.5, color: "#E23A45" },
  { country: "United States", flag: "🇺🇸", name: "Emma Johnson",     age: 9,  x: 17.8, y: 29.0, color: "#FF881B" },
  { country: "United States", flag: "🇺🇸", name: "Ethan Carter",     age: 12, x: 13.2, y: 39.4, color: "#FF881B" },
  { country: "United States", flag: "🇺🇸", name: "Ava Martinez",     age: 10, x: 19.7, y: 40.3, color: "#FF881B" },
  { country: "United States", flag: "🇺🇸", name: "Liam Brown",       age: 8,  x: 16.0, y: 36.5, color: "#392DCA" },
  // ── South America ──
  { country: "Brazil",        flag: "🇧🇷", name: "Lucas Santos",     age: 12, x: 28.1, y: 65.7, color: "#392DCA" },
  { country: "Argentina",     flag: "🇦🇷", name: "Santiago Vega",    age: 13, x: 29.0, y: 83.7, color: "#E23A45" },
  // ── Europe ──
  { country: "United Kingdom",flag: "🇬🇧", name: "Oliver Smith",     age: 13, x: 47.6, y: 32.8, color: "#ACA7E9" },
  { country: "France",        flag: "🇫🇷", name: "Camille Dupont",   age: 12, x: 49.5, y: 32.8, color: "#FF881B" },
  { country: "Germany",       flag: "🇩🇪", name: "Felix Müller",     age: 9,  x: 51.4, y: 30.9, color: "#ACA7E9" },
  { country: "Scandinavia",   flag: "🇸🇪", name: "Erik Lindgren",    age: 11, x: 52.3, y: 18.6, color: "#ACA7E9" },
  // ── Africa ──
  { country: "Nigeria",       flag: "🇳🇬", name: "Chidi Okonkwo",    age: 10, x: 52.3, y: 48.8, color: "#392DCA" },
  { country: "Kenya",         flag: "🇰🇪", name: "Amara Osei",       age: 11, x: 55.1, y: 61.0, color: "#FF881B" },
  { country: "South Africa",  flag: "🇿🇦", name: "Thabo Nkosi",      age: 11, x: 52.3, y: 84.6, color: "#392DCA" },
  // ── Middle East ──
  { country: "Turkey",        flag: "🇹🇷", name: "Kemal Yilmaz",     age: 12, x: 59.8, y: 26.2, color: "#392DCA" },
  { country: "Saudi Arabia",  flag: "🇸🇦", name: "Fatima Al-Rashid", age: 11, x: 61.6, y: 31.8, color: "#FF881B" },
  { country: "UAE",           flag: "🇦🇪", name: "Zaid Al-Hassan",   age: 10, x: 60.7, y: 40.3, color: "#392DCA" },
  // ── Asia ──
  { country: "India",         flag: "🇮🇳", name: "Aryan Sharma",     age: 11, x: 63.5, y: 29.9, color: "#392DCA" },
  { country: "China",         flag: "🇨🇳", name: "Wei Chen",         age: 13, x: 70.0, y: 25.2, color: "#E23A45" },
  { country: "China",         flag: "🇨🇳", name: "Xiao Ming",        age: 9,  x: 71.9, y: 30.9, color: "#392DCA" },
  { country: "Japan",         flag: "🇯🇵", name: "Haruto Tanaka",    age: 10, x: 77.5, y: 29.0, color: "#F10001" },
  { country: "Japan",         flag: "🇯🇵", name: "Yuki Sato",        age: 8,  x: 81.2, y: 25.2, color: "#392DCA" },
  { country: "Singapore",     flag: "🇸🇬", name: "Mei Lin Tan",      age: 10, x: 70.9, y: 48.8, color: "#392DCA" },
  // ── Australia ──
  { country: "Australia",     flag: "🇦🇺", name: "Liam Thompson",    age: 12, x: 88.7, y: 79.9, color: "#E23A45" },
  { country: "Australia",     flag: "🇦🇺", name: "Isla Murray",      age: 9,  x: 92.4, y: 81.8, color: "#E23A45" },
];

export default function InteractiveMap() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="relative w-full mt-14" style={{ userSelect: "none" }}>

      {/* Original map SVG */}
      <Image
        src="/images/map2.svg"
        width={994}
        height={566}
        alt="World Map"
        className="w-full h-auto"
        draggable={false}
        priority
      />

      {/* Invisible hotspots exactly over each colored SVG hexagon */}
      {pins.map((s, i) => {
        const isHovered = hovered === i;
        const tooltipAbove = s.y > 60;
        const tooltipLeft  = s.x > 75; // flip tooltip to left for far-right pins

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${s.x}%`,
              top: `${s.y}%`,
              transform: "translate(-50%, -50%)",
              zIndex: isHovered ? 50 : 10,
              cursor: "pointer",
            }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Transparent hitbox sized to match the SVG hex */}
            <div style={{ width: "22px", height: "22px", borderRadius: "50%" }} />

            {/* Tooltip on hover only */}
            {isHovered && (
              <div
                style={{
                  position: "absolute",
                  ...(tooltipLeft
                    ? { right: "calc(100% + 10px)", left: "auto", transform: "none" }
                    : { left: "50%", transform: "translateX(-50%)" }),
                  ...(tooltipAbove
                    ? { bottom: "calc(100% + 8px)" }
                    : { top: "calc(100% + 8px)" }),
                  backgroundColor: "#1a1a1a",
                  border: `1px solid ${s.color}`,
                  borderRadius: "12px",
                  padding: "10px 14px",
                  whiteSpace: "nowrap",
                  boxShadow: `0 8px 24px rgba(0,0,0,0.7), 0 0 14px ${s.color}60`,
                  pointerEvents: "none",
                  minWidth: "160px",
                  animation: "tipIn 0.15s ease forwards",
                }}
              >
                {/* Arrow — only for centered tooltip */}
                {!tooltipLeft && (
                  <div style={{
                    position: "absolute",
                    left: "50%", transform: "translateX(-50%)",
                    width: 0, height: 0,
                    ...(tooltipAbove
                      ? { bottom: "-6px", borderTop: `6px solid ${s.color}`, borderLeft: "6px solid transparent", borderRight: "6px solid transparent" }
                      : { top: "-6px", borderBottom: `6px solid ${s.color}`, borderLeft: "6px solid transparent", borderRight: "6px solid transparent" }),
                  }} />
                )}
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "5px" }}>
                  <span style={{ fontSize: "15px" }}>{s.flag}</span>
                  <span style={{ color: s.color, fontWeight: 700, fontSize: "12px", letterSpacing: "0.3px" }}>{s.country}</span>
                </div>
                <div style={{ color: "#ffffff", fontWeight: 600, fontSize: "13px" }}>{s.name}</div>
                <div style={{ color: "#9ca3af", fontSize: "11px", marginTop: "3px" }}>Age {s.age} · KwinBee Student ♟</div>
              </div>
            )}
          </div>
        );
      })}

      <style>{`
        @keyframes tipIn {
          from { opacity: 0; transform: translateX(-50%) translateY(6px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </div>
  );
}
