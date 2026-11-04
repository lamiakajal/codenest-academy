"use client";

import { useEffect, useState } from "react";

type Token = [text: string, className: string];

// The code that "types itself" in the hero editor, split into colored tokens per line
const LINES: Token[][] = [
  [["import", "text-pink-400"], [" { enroll } ", "text-sky-300"], ["from", "text-pink-400"], [" \"codenest\"", "text-emerald-300"], [";", "text-slate-400"]],
  [],
  [["export default function", "text-pink-400"], [" Future", "text-amber-300"], ["() {", "text-slate-400"]],
  [["  const", "text-pink-400"], [" skills ", "text-sky-300"], ["= [", "text-slate-400"], ["\"React\"", "text-emerald-300"], [", ", "text-slate-400"], ["\"Next.js\"", "text-emerald-300"], [", ", "text-slate-400"], ["\"Node\"", "text-emerald-300"], ["];", "text-slate-400"]],
  [["  return", "text-pink-400"], [" enroll", "text-amber-300"], ["({ skills, goal: ", "text-slate-400"], ["\"first dev job\"", "text-emerald-300"], [" });", "text-slate-400"]],
  [["}", "text-slate-400"]],
];

const TOTAL_CHARS = LINES.reduce((sum, line) => sum + line.reduce((s, [t]) => s + t.length, 0) + 1, 0);

// Animated code window shown in the hero. It types, pauses, then starts over.
export default function HeroEditor() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      // Show the finished code immediately instead of animating
      const id = window.setTimeout(() => setCount(TOTAL_CHARS), 0);
      return () => window.clearTimeout(id);
    }

    const id = window.setInterval(() => {
      // Hold on the finished code for about 3 seconds before looping
      setCount((c) => (c >= TOTAL_CHARS + 60 ? 0 : c + 1));
    }, 48);
    return () => window.clearInterval(id);
  }, []);

  // Render only the characters typed so far
  let remaining = count;
  const rendered = LINES.map((line, lineIndex) => {
    const spans = line.map(([text, cls], tokenIndex) => {
      const visible = Math.max(0, Math.min(text.length, remaining));
      remaining -= text.length;
      return (
        <span key={tokenIndex} className={cls}>
          {text.slice(0, visible)}
        </span>
      );
    });
    remaining -= 1; // account for the line break
    return (
      <div key={lineIndex} className="min-h-[1.6em] whitespace-pre">
        {spans}
      </div>
    );
  });

  const done = count >= TOTAL_CHARS;

  return (
    <div className="relative">
      <div className="absolute -inset-6 -z-10 animate-pulse-glow rounded-[2rem] bg-linear-to-br from-brand/40 via-accent/20 to-warm/30 blur-3xl" />

      {/* Editor window */}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d1030] shadow-2xl">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 text-xs text-slate-400">future.tsx</span>
        </div>
        <div className="min-h-[190px] p-5 font-mono text-[12.5px] leading-relaxed text-slate-200 sm:text-sm" aria-label="Animated code sample">
          {rendered}
          <span className="animate-caret ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 bg-white" />
        </div>
      </div>

      {/* Live preview card */}
      <div
        className={`mt-4 flex items-center gap-4 rounded-2xl border border-line bg-surface p-4 shadow-card transition-all duration-500 sm:ml-12 ${
          done ? "translate-y-0 opacity-100" : "translate-y-2 opacity-60"
        }`}
      >
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent">
          <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current stroke-[2.5]" strokeLinecap="round" strokeLinejoin="round">
            <path d="m5 12 5 5 9-10" />
          </svg>
        </span>
        <div className="min-w-0">
          <p className="text-sm font-bold">{done ? "Compiled successfully" : "Compiling..."}</p>
          <p className="truncate text-xs text-muted">
            {done ? "Your first developer job is now building." : "Writing your first component"}
          </p>
        </div>
      </div>
    </div>
  );
}
