import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import { SITE, campusPillars } from "@/data/site";
import { stagger } from "@/lib/reveal";

export default function Campus() {
  return (
    <section id="campus" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="How CodeNest changes your career"
          description="CodeNest is more than a course. It is a structured path from your first line of code to a team that depends on you, with mentors beside you the whole way."
        />

        {/* Lab illustration */}
        <div data-reveal className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-line bg-surface-2 shadow-card">
          <div className="relative aspect-video w-full">
            <Image
              src="/images/campus-lab.svg"
              alt="Illustration of the CodeNest lab with rows of workstations and a mentor desk"
              fill
              unoptimized
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
            />
          </div>
        </div>

        {/* Four pillars */}
        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {campusPillars.map((item, index) => (
            <div
              key={item.title}
              data-reveal
              style={stagger(index)}
              className="rounded-2xl border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/60 hover:shadow-card"
            >
              <h3 className="text-base font-extrabold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Visit card */}
        <div data-reveal className="relative mx-auto mt-12 max-w-5xl overflow-hidden rounded-3xl bg-[#1b1360] p-8 text-white shadow-card sm:p-12">
          <div aria-hidden="true" className="absolute -right-16 -top-16 h-64 w-64 animate-pulse-glow rounded-full bg-brand/60 blur-3xl" />
          <div aria-hidden="true" className="absolute -bottom-20 left-10 h-56 w-56 animate-pulse-glow rounded-full bg-accent/40 blur-3xl" />
          <div className="relative z-10 grid items-center gap-8 md:grid-cols-[1.4fr_1fr]">
            <div>
              <h3 className="text-2xl font-extrabold sm:text-3xl">Visit our Banani lab before you decide</h3>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-white/80">
                Book a free campus tour, sit in on a live class and talk to a
                mentor about which track suits you.
              </p>
              <Link
                href="/enroll"
                className="mt-6 inline-flex rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-[#1b1360] transition hover:-translate-y-0.5 hover:bg-white/90 active:scale-95"
              >
                Book a campus tour
              </Link>
            </div>
            <ul className="space-y-3 text-sm text-white/90">
              <li className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur">{SITE.address}</li>
              <li className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur">{SITE.email}</li>
              <li className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur">Open Saturday to Thursday, 10 am to 8 pm</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
