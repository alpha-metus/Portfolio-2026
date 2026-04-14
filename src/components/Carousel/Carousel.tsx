"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { StudentImage } from "./config";

interface StudentCarouselProps {
  students: StudentImage[];
  direction: "left" | "right";
  speed?: number;
}

const Carousel = ({
  students,
  direction,
  speed = 30,
}: StudentCarouselProps) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(
    direction === "right" ? -1000 : 0
  );

  const doubledStudents = [...students, ...students, ...students, ...students];

  const pixelsPerFrame = speed / 60;
  const moveDirection = direction === "left" ? -1 : 1;

  useEffect(() => {
    const containerWidth = containerRef.current?.scrollWidth
      ? containerRef.current.scrollWidth / 2
      : 0;

    let animationFrameId: number;
    let lastTimestamp: number;

    const animate = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const elapsed = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      setScrollPosition((prevPos) => {
        let newPos =
          prevPos + (pixelsPerFrame * moveDirection * elapsed) / 16.67;

        if (direction === "left" && Math.abs(newPos) >= containerWidth) {
          newPos = 0;
        } else if (direction === "right" && newPos >= 0) {
          newPos = -containerWidth;
        }

        return newPos;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [direction, moveDirection, pixelsPerFrame]);

  return (
    <div className="overflow-hidden bg-amber-400 py-2 relative w-full">
      <div
        ref={containerRef}
        className="flex"
        style={{
          transform: `translateX(${scrollPosition}px)`,
        }}
      >
        {doubledStudents.map((student, index) => (
          <div
            key={`${student.id}-${index}`}
            className="relative min-w-[200px] h-[320px] mx-2 rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105"
            onMouseEnter={() => setHoveredId(student.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <Image
              src={student.src}
              alt={student.alt}
              width={200}
              height={250}
              className="object-cover w-full h-full rounded-lg"
            />

            {/* {hoveredId === student.id && (
              <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-end p-4 text-white rounded-lg">
                <h3 className="font-bold text-lg">{student.name}</h3>
                <p className="text-sm">Age: {student.age}</p>
                <p className="text-sm mt-1">{student.achievements}</p>
              </div>
            )} */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
