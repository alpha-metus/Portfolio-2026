"use client";
import Image from "next/image";
import { useState } from "react";

const students = [
  { country: "India",         flag: "🇮🇳", name: "Aryan Sharma",      age: 11, x: 64, y: 50, color: "#f97316" },
  { country: "United States", flag: "🇺🇸", name: "Emma Johnson",       age: 9,  x: 20, y: 43, color: "#3b82f6" },
  { country: "United Kingdom",flag: "🇬🇧", name: "Oliver Smith",       age: 13, x: 46, y: 28, color: "#8b5cf6" },
  { country: "UAE",           flag: "🇦🇪", name: "Zaid Al-Hassan",     age: 10, x: 60, y: 47, color: "#ef4444" },
  { country: "Australia",     flag: "🇦🇺", name: "Liam Thompson",      age: 12, x: 80, y: 68, color: "#f97316" },
  { country: "Canada",        flag: "🇨🇦", name: "Noah Williams",      age: 8,  x: 18, y: 29, color: "#3b82f6" },
  { country: "Saudi Arabia",  flag: "🇸🇦", name: "Fatima Al-Rashid",   age: 11, x: 58, y: 50, color: "#8b5cf6" },
  { country: "Singapore",     flag: "🇸🇬", name: "Mei Lin Tan",        age: 10, x: 76, y: 57, color: "#3b82f6" },
  { country: "China",         flag: "🇨🇳", name: "Wei Chen",           age: 13, x: 74, y: 40, color: "#ef4444" },
  { country: "Germany",       flag: "🇩🇪", name: "Felix Müller",       age: 9,  x: 49, y: 31, color: "#f97316" },
  { country: "Brazil",        flag: "🇧🇷", name: "Lucas Santos",       age: 12, x: 27, y: 64, color: "#ef4444" },
  { country: "South Africa",  flag: "🇿🇦", name: "Thabo Nkosi",        age: 11, x: 52, y: 71, color: "#8b5cf6" },
  { country: "Japan",         flag: "🇯🇵", name: "Haruto Tanaka",      age: 10, x: 80, y: 38, color: "#f97316" },
  { country: "France",        flag: "🇫🇷", name: "Camille Dupont",     age: 12, x: 47, y: 32, color: "#3b82f6" },
];

export default function InteractiveMap() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="relative w-full mt-14" style={{ userSelect: "none" }}>
      {/* Base map image */}
      <Image
        src="/map2.svg"
        width={994}
        height={566}
        alt="World Map"
        className="w-full h-auto"
        draggable={false}
      />

      {/* Interactive pins — positioned as % over the map */}
      {students.map((s, i) => {
        const isHovered = hovered === i;
        // Tooltip above or below depending on vertical position
        const tooltipAbove = s.y > 55;

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
            {/* Hexagon pin */}
            <div
              style={{
                width: isHovered ? "28px" : "16px",
                height: isHovered ? "28px" : "16px",
                backgroundColor: s.color,
                clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                transition: "all 0.2s ease",
                boxShadow: isHovered ? `0 0 16px ${s.color}` : "none",
              }}
            />

            {/* Tooltip card */}
            {isHovered && (
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  ...(tooltipAbove
                    ? { bottom: "calc(100% + 10px)" }
                    : { top: "calc(100% + 10px)" }),
                  transform: "translateX(-50%)",
                  backgroundColor: "#1a1a1a",
                  border: `1px solid ${s.color}`,
                  borderRadius: "12px",
                  padding: "10px 14px",
                  whiteSpace: "nowrap",
                  boxShadow: `0 8px 24px rgba(0,0,0,0.5), 0 0 12px ${s.color}40`,
                  pointerEvents: "none",
                  minWidth: "160px",
                }}
              >
                {/* Arrow */}
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    transform: "translateX(-50%)",
                    ...(tooltipAbove
                      ? { bottom: "-6px", borderTop: `6px solid ${s.color}`, borderLeft: "6px solid transparent", borderRight: "6px solid transparent" }
                      : { top: "-6px", borderBottom: `6px solid ${s.color}`, borderLeft: "6px solid transparent", borderRight: "6px solid transparent" }),
                    width: 0,
                    height: 0,
                  }}
                />
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                  <span style={{ fontSize: "16px" }}>{s.flag}</span>
                  <span style={{ color: s.color, fontWeight: 700, fontSize: "13px" }}>{s.country}</span>
                </div>
                <div style={{ color: "#ffffff", fontWeight: 600, fontSize: "13px" }}>{s.name}</div>
                <div style={{ color: "#9ca3af", fontSize: "11px", marginTop: "2px" }}>
                  Age {s.age} · KwinBee Student ♟
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
