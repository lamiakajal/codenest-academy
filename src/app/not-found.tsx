import Link from "next/link";
import type { Metadata } from "next";
import { LogoMark } from "@/components/ui/Logo";

export const metadata: Metadata = { title: "Page not found" };

// Custom 404 page with an animated broken-code illustration
export default function NotFound() {
  return (
    <section className="relative mx-auto flex min-h-[78vh] max-w-3xl flex-col items-center justify-center px-6 py-20 text-center">
      <div className="animate-float relative mb-8">
        <div className="absolute -inset-10 -z-10 animate-pulse-glow rounded-full bg-brand/25 blur-3xl" />
        <p className="font-display text-[8rem] font-extrabold leading-none tracking-tighter sm:text-[11rem]">
          <span className="text-shimmer">4</span>
          <span className="relative inline-block align-middle">
            <LogoMark size={128} className="inline-block h-24 w-24 animate-spin-slow sm:h-36 sm:w-36" />
          </span>
          <span className="text-shimmer">4</span>
        </p>
      </div>

      <h1 className="text-3xl font-extrabold sm:text-4xl">This page could not be found</h1>
      <p className="mt-4 max-w-lg text-lg text-muted">
        The link may be broken or the page may have moved. Head back to the
        homepage or look through our courses.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="rounded-xl bg-brand px-7 py-3.5 text-sm font-bold text-brand-fg shadow-card transition hover:-translate-y-0.5 hover:bg-brand-strong active:scale-95"
        >
          Go to homepage
        </Link>
        <Link
          href="/#courses"
          className="rounded-xl border border-line bg-surface px-7 py-3.5 text-sm font-bold transition hover:-translate-y-0.5 hover:border-brand active:scale-95"
        >
          Browse courses
        </Link>
      </div>
    </section>
  );
}
