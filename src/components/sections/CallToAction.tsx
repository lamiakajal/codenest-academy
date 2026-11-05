import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div data-reveal className="relative overflow-hidden rounded-[2rem] bg-[#1b1360] px-6 py-16 text-center text-white shadow-card sm:px-12 sm:py-20">
          <div aria-hidden="true" className="absolute -left-20 -top-20 h-72 w-72 animate-pulse-glow rounded-full bg-brand/70 blur-3xl" />
          <div aria-hidden="true" className="absolute -bottom-24 -right-10 h-72 w-72 animate-pulse-glow rounded-full bg-accent/45 blur-3xl" />

          <div className="relative z-10 mx-auto max-w-3xl space-y-6">
            <h2 className="text-balance text-3xl font-extrabold sm:text-4xl md:text-5xl">
              Your first developer job starts with one decision
            </h2>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
              Seats in each batch are limited so every student gets real
              mentor time. Reserve yours today and we will guide you to the
              right track.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
              <Link
                href="/enroll"
                className="rounded-xl bg-white px-8 py-4 text-sm font-extrabold text-[#1b1360] shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/90 active:scale-95"
              >
                Enroll in the next batch
              </Link>
              <Link
                href="/#faq"
                className="rounded-xl border border-white/40 bg-white/10 px-8 py-4 text-sm font-bold backdrop-blur transition-all duration-300 hover:bg-white/20 active:scale-95"
              >
                Read the FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
