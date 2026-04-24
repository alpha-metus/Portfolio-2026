"use client";
import React, { useEffect, useRef, useCallback } from "react";

interface ClickSparkProps {
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
  easing?: string;
  extraScale?: number;
  children?: React.ReactNode;
}

// Attaches to a wrapper div and bursts sparks at every click point.
// Rendered sparks are absolutely-positioned inside the wrapper, so the
// wrapper must have position: relative (or any non-static position).
export default function ClickSpark({
  sparkColor = "#fff100",
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 400,
  easing = "ease-out",
  extraScale = 1,
  children,
}: ClickSparkProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const createSparks = useCallback(
    (x: number, y: number) => {
      const container = containerRef.current;
      if (!container) return;

      for (let i = 0; i < sparkCount; i++) {
        const angle = (i / sparkCount) * 360;
        const radians = (angle * Math.PI) / 180;
        const tx = Math.cos(radians) * sparkRadius * extraScale;
        const ty = Math.sin(radians) * sparkRadius * extraScale;

        const spark = document.createElement("div");
        spark.style.cssText = `
          position: absolute;
          width: ${sparkSize}px;
          height: ${sparkSize}px;
          background: ${sparkColor};
          border-radius: 50%;
          left: ${x}px;
          top: ${y}px;
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 9999;
          will-change: transform, opacity;
        `;
        container.appendChild(spark);

        const animation = spark.animate(
          [
            {
              transform: "translate(-50%, -50%) translate(0px, 0px)",
              opacity: 1,
            },
            {
              transform: `translate(-50%, -50%) translate(${tx}px, ${ty}px)`,
              opacity: 0,
            },
          ],
          { duration, easing, fill: "forwards" }
        );

        animation.onfinish = () => spark.remove();
      }
    },
    [sparkColor, sparkSize, sparkRadius, sparkCount, duration, easing, extraScale]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      createSparks(e.clientX - rect.left, e.clientY - rect.top);
    };

    container.addEventListener("click", handleClick);
    return () => container.removeEventListener("click", handleClick);
  }, [createSparks]);

  return (
    <div
      ref={containerRef}
      style={{ position: "relative", width: "100%", minHeight: "100%" }}
    >
      {children}
    </div>
  );
}
