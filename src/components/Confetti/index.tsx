"use client";
import { useEffect, useRef } from "react";

const COLORS = ["#f9cb00", "#ffffff", "#ff6b6b", "#4ade80", "#60a5fa", "#f472b6", "#fbbf24"];

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  color: string;
  w: number; h: number;
  rotation: number;
  rotSpeed: number;
  opacity: number;
}

export default function Confetti({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Particle[] = Array.from({ length: 180 }, (_, i) => ({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * 300,
      vx: (Math.random() - 0.5) * 5,
      vy: 1.5 + Math.random() * 4.5,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      w: 7 + Math.random() * 9,
      h: 4 + Math.random() * 5,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 9,
      opacity: 1,
    }));

    const startTime = Date.now();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const elapsed = (Date.now() - startTime) / 1000;

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.07;
        p.rotation += p.rotSpeed;
        if (elapsed > 2.2) p.opacity = Math.max(0, 1 - (elapsed - 2.2) / 1.5);

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });

      if (elapsed < 3.8) {
        rafRef.current = requestAnimationFrame(draw);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 99999 }}
    />
  );
}
