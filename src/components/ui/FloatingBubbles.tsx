"use client";

import { useEffect, useRef } from "react";

interface Bubble {
  x: number;
  y: number;
  radius: number;
  dx: number;
  dy: number;
  hue: number;
  alpha: number;
  pulseSpeed: number;
  pulseAngle: number;
}

// Hues for violet, mint, amber and sky bubbles that match the brand palette
const HUES = [255, 160, 40, 200];

// Soft glowing bubbles drifting upward behind the page content
export default function FloatingBubbles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frameId = 0;
    let width = 0;
    let height = 0;
    let bubbles: Bubble[] = [];

    // Create a bubble at a random position (or just below the screen when recycling)
    const spawn = (fromBottom: boolean): Bubble => ({
      x: Math.random() * width,
      y: fromBottom ? height + 20 : Math.random() * height,
      radius: Math.random() * 8 + 4,
      dx: (Math.random() - 0.5) * 0.4,
      dy: -(Math.random() * 0.35 + 0.15),
      hue: HUES[Math.floor(Math.random() * HUES.length)],
      alpha: Math.random() * 0.25 + 0.2,
      pulseSpeed: Math.random() * 0.02 + 0.008,
      pulseAngle: Math.random() * Math.PI * 2,
    });

    // Keep the canvas sharp on high-density screens and rebuild bubbles for the new size
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(8, Math.floor(Math.min(width, 1400) / 80));
      bubbles = Array.from({ length: count }, () => spawn(false));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const isDark = document.documentElement.dataset.theme === "dark";

      for (const b of bubbles) {
        if (!reduceMotion) {
          b.x += b.dx;
          b.y += b.dy;
          b.pulseAngle += b.pulseSpeed;
        }
        if (b.y + b.radius < 0) Object.assign(b, spawn(true));
        if (b.x - b.radius > width) b.x = -b.radius;
        if (b.x + b.radius < 0) b.x = width + b.radius;

        const r = b.radius + Math.sin(b.pulseAngle) * 1.2;
        const light = isDark ? 68 : 58;

        ctx.beginPath();
        ctx.arc(b.x, b.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${b.hue}, 85%, ${light}%, ${b.alpha * 0.35})`;
        ctx.fill();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = `hsla(${b.hue}, 85%, ${light}%, ${b.alpha})`;
        ctx.stroke();

        // Small highlight gives the bubble a glassy look
        ctx.beginPath();
        ctx.arc(b.x - r * 0.35, b.y - r * 0.35, r * 0.22, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${isDark ? 0.55 : 0.85})`;
        ctx.fill();
      }

      if (!reduceMotion) frameId = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  );
}
