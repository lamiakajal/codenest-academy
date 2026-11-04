import Link from "next/link";
import HeroEditor from "./HeroEditor";

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pb-16 pt-12 md:pb-24 md:pt-20">
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

          {/* Right: self-typing code editor */}
          <div className="animate-float">
            <HeroEditor />
          </div>
        </div>
      </div>
    </section>
  );
}
