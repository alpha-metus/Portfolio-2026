"use client";

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface Star {
  id: string;
  x: number;
  y: number;
}

const CustomCursor = () => {
  const [stars, setStars] = useState<Star[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.matchMedia("(max-width: 768px)").matches ||
          "ontouchstart" in window
      );
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      const newStar: Star = {
        id: uuidv4(),
        x: e.clientX,
        y: e.clientY,
      };

      setStars((prev) => [...prev, newStar]);

      // Remove stars after 400ms
      setTimeout(() => {
        setStars((prev) => prev.filter((star) => star.id !== newStar.id));
      }, 400);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      {stars.map((star) => (
        <div
          key={star.id}
          className="fixed w-3 h-3 text-yellow-400 z-50 pointer-events-none animate-fade"
          style={{
            top: star.y,
            left: star.x,
            transform: "translate(-50%, -50%)",
            fontSize: "24px",
          }}
        >
          ♞
        </div>
      ))}

      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes fade {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(0.3);
          }
        }
        .animate-fade {
          animation: fade 0.4s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default CustomCursor;
