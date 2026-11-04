"use client";

import { useEffect, useState } from "react";

// Floating button that appears after scrolling and returns to the top
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-full bg-brand text-brand-fg shadow-card transition-all duration-300 hover:-translate-y-1 active:scale-95 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[2.5]" strokeLinecap="round" strokeLinejoin="round">
        <path d="m6 14 6-6 6 6" />
      </svg>
    </button>
  );
}
