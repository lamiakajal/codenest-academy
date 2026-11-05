"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import { testimonials } from "@/data/site";

// Builds initials like "TI" for the avatar circle
function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);
}

const AVATAR_COLORS = ["bg-brand", "bg-accent", "bg-warm"];
const AUTOPLAY_MS = 3000; // time between slides
const SLIDE_MS = 700; // slide animation length
const TOTAL = testimonials.length;

// Number of cards visible at once: 1 on phones, 2 on tablets, 3 on desktops
function subscribeToWidth(callback: () => void) {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
}
function getPerView() {
  if (window.innerWidth >= 1024) return 3;
  if (window.innerWidth >= 640) return 2;
  return 1;
}

// Endless testimonial carousel. The first cards are cloned at the end so the
// loop continues smoothly in one direction instead of jumping back.
export default function Testimonials() {
  const perView = useSyncExternalStore(subscribeToWidth, getPerView, () => 3);
  const slides = [...testimonials, ...testimonials.slice(0, perView)];

  // index is the track position; instant disables the slide animation for silent jumps
  const [index, setIndex] = useState(0);
  const [instant, setInstant] = useState(false);
  const [paused, setPaused] = useState(false);
  const touchStart = useRef<number | null>(null);

  // Jump without animation, then re-enable animation on the next frames
  const jumpTo = (target: number, then?: () => void) => {
    setInstant(true);
    setIndex(target);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        setInstant(false);
        then?.();
      }),
    );
  };

  const next = () => setIndex((i) => Math.min(i + 1, TOTAL));
  const prev = () => {
    if (index === 0) jumpTo(TOTAL, () => setIndex(TOTAL - 1));
    else setIndex(index - 1);
  };

  // When the slide reaches the cloned cards, silently jump back to the real start
  const onTransitionEnd = (event: React.TransitionEvent<HTMLDivElement>) => {
    // Ignore hover transitions bubbling up from the cards inside the track
    if (event.target !== event.currentTarget) return;
    if (index >= TOTAL) jumpTo(0);
  };

  // Autoplay loop. It keeps running even after clicks and only pauses while a mouse is over it.
  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i >= TOTAL ? i : i + 1));
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused]);

  const onTouchEnd = (endX: number) => {
    if (touchStart.current === null) return;
    const distance = touchStart.current - endX;
    if (Math.abs(distance) > 50) {
      if (distance > 0) next();
      else prev();
    }
    touchStart.current = null;
  };

  const activeDot = index % TOTAL;

  return (
    <section id="reviews" className="relative overflow-hidden py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Graduates who made the switch"
          description="Hear from learners who started where you are and now work as developers."
        />

        <div
          data-reveal
          role="region"
          aria-roledescription="carousel"
          aria-label="Student testimonials"
          onPointerEnter={(e) => e.pointerType === "mouse" && setPaused(true)}
          onPointerLeave={() => setPaused(false)}
          onTouchStart={(e) => {
            touchStart.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => onTouchEnd(e.changedTouches[0].clientX)}
        >
          <div className="-mx-3 overflow-hidden px-0 py-4">
            <div
              className="flex"
              onTransitionEnd={onTransitionEnd}
              style={{
                transform: `translateX(-${index * (100 / perView)}%)`,
                transition: instant ? "none" : `transform ${SLIDE_MS}ms cubic-bezier(0.22, 0.8, 0.2, 1)`,
              }}
            >
              {slides.map((item, i) => (
                <div
                  key={`${item.name}-${i}`}
                  className="flex-none px-3"
                  style={{ width: `${100 / perView}%` }}
                  aria-hidden={i < index || i >= index + perView || i >= TOTAL}
                >
                  <figure className="flex h-full flex-col justify-between rounded-3xl border border-line bg-surface p-8 shadow-card transition-colors duration-300 hover:border-brand/60">
                    <div>
                      <div className="flex gap-1 text-warm" aria-label="Rated 5 out of 5">
                        {Array.from({ length: 5 }).map((_, star) => (
                          <svg key={star} viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                            <path d="m12 2 3 6.9 7.5.7-5.7 5 1.7 7.4L12 18l-6.5 4 1.7-7.4-5.7-5 7.5-.7L12 2Z" />
                          </svg>
                        ))}
                      </div>
                      <blockquote className="mt-5 text-base leading-relaxed">&ldquo;{item.quote}&rdquo;</blockquote>
                    </div>
                    <figcaption className="mt-8 flex items-center gap-4 border-t border-line pt-6">
                      <span
                        className={`grid h-12 w-12 place-items-center rounded-full font-display text-sm font-extrabold text-white ${
                          AVATAR_COLORS[i % TOTAL % AVATAR_COLORS.length]
                        }`}
                        aria-hidden="true"
                      >
                        {initials(item.name)}
                      </span>
                      <div>
                        <p className="text-sm font-bold">{item.name}</p>
                        <p className="text-xs text-muted">{item.role}</p>
                        <p className="text-xs text-muted">{item.batch}</p>
                      </div>
                    </figcaption>
                  </figure>
                </div>
              ))}
            </div>
          </div>

          {/* Arrows and dots */}
          <div className="mt-6 flex items-center justify-center gap-5">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous testimonials"
              className="grid h-11 w-11 place-items-center rounded-full border border-line bg-surface transition hover:border-brand hover:text-brand active:scale-95"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m15 6-6 6 6 6" />
              </svg>
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: TOTAL }).map((_, dot) => (
                <button
                  key={dot}
                  type="button"
                  onClick={() => setIndex(dot)}
                  aria-label={`Go to testimonials ${dot + 1}`}
                  aria-current={dot === activeDot}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    dot === activeDot ? "w-8 bg-brand" : "w-2.5 bg-line hover:bg-muted"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={next}
              aria-label="Next testimonials"
              className="grid h-11 w-11 place-items-center rounded-full border border-line bg-surface transition hover:border-brand hover:text-brand active:scale-95"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m9 6 6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
