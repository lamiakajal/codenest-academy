"use client";

import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { SITE } from "@/data/site";

// Full-screen launch screen shown while the site opens.
// Returning visitors in the same session only see it for a moment.
export default function Splash() {
  const [phase, setPhase] = useState<"show" | "hide" | "gone">("show");

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("codenest-splash") === "1";
      sessionStorage.setItem("codenest-splash", "1");
    } catch {
      // Ignore storage errors and treat this as a first visit
    }

    const hideTimer = window.setTimeout(() => setPhase("hide"), seen ? 250 : 1700);
    const removeTimer = window.setTimeout(() => setPhase("gone"), seen ? 700 : 2300);
    return () => {
      window.clearTimeout(hideTimer);
      window.clearTimeout(removeTimer);
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div
      aria-hidden={phase !== "show"}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-8 bg-bg"
      style={phase === "hide" ? { animation: "splashOut 0.6s ease forwards" } : undefined}
    >
      <Spinner size={132} label="Opening website" />
      <div className="text-center">
        <p className="font-display text-3xl font-extrabold tracking-tight">
          Code<span className="text-brand">Nest</span> Academy
        </p>
        <p className="mt-2 text-sm text-muted">{SITE.tagline}</p>
      </div>
    </div>
  );
}
