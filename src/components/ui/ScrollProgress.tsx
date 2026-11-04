"use client";

import { useEffect, useRef } from "react";

// Thin bar at the top of the page that fills as you scroll
export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const progress = max > 0 ? doc.scrollTop / max : 0;
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${progress})`;
      }
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-1">
      <div
        ref={barRef}
        className="h-full origin-left bg-linear-to-r from-brand via-accent to-warm"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
