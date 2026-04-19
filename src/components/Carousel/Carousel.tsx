"use client";
import Image from "next/image";
import { StudentImage } from "./config";

interface StudentCarouselProps {
  students: StudentImage[];
  direction: "left" | "right";
  speed?: number;
}

/**
 * Pure-CSS infinite marquee — no requestAnimationFrame, no React state updates,
 * no forced reflow. GPU-composited via CSS animation.
 */
const Carousel = ({ students, direction, speed = 30 }: StudentCarouselProps) => {
  // Duplicate for seamless loop
  const items = [...students, ...students];
  // Duration: wider list → longer duration to keep pixel-speed constant
  const durationSec = (items.length * 180) / speed;
  const animName = direction === "left" ? "marqueeLeft" : "marqueeRight";

  return (
    <div className="overflow-hidden bg-[#0d0404] py-2 relative w-full">
      <style>{`
        @keyframes marqueeLeft {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes marqueeRight {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
      `}</style>

      <div
        style={{
          display: "flex",
          width: "max-content",
          animation: `${animName} ${durationSec}s linear infinite`,
          willChange: "transform",
        }}
      >
        {items.map((student, index) => (
          <div
            key={`${student.id}-${index}`}
            className="relative min-w-[160px] h-[240px] sm:min-w-[140px] sm:h-[200px] mx-2 rounded-lg overflow-hidden"
          >
            <Image
              src={student.src}
              alt={student.alt}
              width={200}
              height={250}
              loading="lazy"
              className="object-cover w-full h-full rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
