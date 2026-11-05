import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pb-16 pt-12 md:pb-24 md:pt-20">
      {/* Soft color glows behind the hero */}
      <div aria-hidden="true" className="absolute -left-24 top-10 -z-10 h-80 w-80 animate-pulse-glow rounded-full bg-brand/25 blur-3xl" />
      <div aria-hidden="true" className="absolute -right-20 bottom-0 -z-10 h-80 w-80 animate-pulse-glow rounded-full bg-accent/25 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          {/* Left: headline and calls to action */}
          <div className="animate-rise space-y-7">
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-1.5 text-sm font-semibold">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
              </span>
              Admissions open for the next full-stack batch
            </p>

            <h1 className="text-balance text-5xl font-extrabold leading-[1.02] sm:text-6xl xl:text-7xl">
              Learn to build software that <span className="text-shimmer">actually ships.</span>
            </h1>

            <p className="max-w-xl text-lg leading-relaxed text-muted">
              Study React, Next.js, TypeScript and Node.js by building real
              products with working engineers. Join in our Banani lab or live
              online, and keep mentor support for life.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href="/enroll"
                className="rounded-xl bg-brand px-8 py-4 text-sm font-bold text-brand-fg shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-strong active:scale-95"
              >
                Enroll in the next batch
              </Link>
              <Link
                href="/#courses"
                className="rounded-xl border border-line bg-surface px-8 py-4 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 hover:border-brand active:scale-95"
              >
                See the courses
              </Link>
            </div>

            <dl className="grid max-w-md grid-cols-3 gap-4 border-t border-line pt-6">
              <div>
                <dt className="text-xs text-muted">Class format</dt>
                <dd className="mt-1 text-sm font-bold">Lab and online</dd>
              </div>
              <div>
                <dt className="text-xs text-muted">Mentor support</dt>
                <dd className="mt-1 text-sm font-bold">For life</dd>
              </div>
              <div>
                <dt className="text-xs text-muted">Projects built</dt>
                <dd className="mt-1 text-sm font-bold">8 or more</dd>
              </div>
            </dl>
          </div>

          {/* Right: student photo with floating info cards */}
          <div className="relative mx-auto w-full max-w-lg">
            <div className="animate-float">
              <Image
                src="/images/hero-students.png"
                alt="Four CodeNest students learning with laptops and phones"
                width={900}
                height={886}
                priority
                sizes="(max-width: 1024px) 90vw, 520px"
                className="h-auto w-full drop-shadow-2xl"
              />
            </div>

            <div className="animate-float-alt absolute -left-2 top-10 flex items-center gap-3 rounded-2xl border border-line bg-surface/95 px-4 py-3 shadow-card backdrop-blur sm:-left-8">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent/15 text-accent">
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[2.5]" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m5 12 5 5 9-10" />
                </svg>
              </span>
              <div>
                <p className="text-sm font-bold">15,000+ placed</p>
                <p className="text-xs text-muted">in tech teams</p>
              </div>
            </div>

            <div className="animate-float absolute -right-2 bottom-12 flex items-center gap-3 rounded-2xl border border-line bg-surface/95 px-4 py-3 shadow-card backdrop-blur sm:-right-6">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand/15 text-brand">
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m8 8-5 4 5 4M16 8l5 4-5 4M14 5l-4 14" />
                </svg>
              </span>
              <div>
                <p className="text-sm font-bold">Live mentor reviews</p>
                <p className="text-xs text-muted">after every project</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
