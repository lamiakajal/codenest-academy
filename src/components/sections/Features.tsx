import Image from "next/image";
import Link from "next/link";
import { features } from "@/data/site";

// Three alternating feature blocks with illustrations
export default function Features() {
  return (
    <section id="features" className="relative border-y border-line bg-surface/80 py-20 backdrop-blur-sm md:py-28">
      <div className="mx-auto flex max-w-7xl flex-col gap-24 px-4 sm:px-6 md:gap-32 lg:px-8">
        {features.map((feature, index) => (
          <div
            key={feature.title}
            className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-20 ${
              index % 2 === 1 ? "lg:[&>div:first-child]:order-2" : ""
            }`}
          >
            <div className="space-y-5">
              <p className="text-sm font-bold text-brand">{feature.tag}</p>
              <h2 className="text-balance text-3xl font-extrabold sm:text-4xl">{feature.title}</h2>
              <p className="max-w-xl text-base leading-relaxed text-muted sm:text-lg">{feature.description}</p>
              <ul className="space-y-2.5 pt-1">
                {feature.points.map((point) => (
                  <li key={point} className="flex items-center gap-3 text-sm font-semibold">
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-accent/15 text-accent">
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-none stroke-current stroke-[3]" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="m5 12 5 5 9-10" />
                      </svg>
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
              <div className="pt-3">
                <Link
                  href="/enroll"
                  className="inline-flex rounded-xl bg-brand px-6 py-3 text-sm font-bold text-brand-fg transition hover:-translate-y-0.5 hover:bg-brand-strong active:scale-95"
                >
                  Start learning
                </Link>
              </div>
            </div>

            <div>
              <div className="group relative aspect-4/3 w-full overflow-hidden rounded-3xl border border-line bg-surface-2 shadow-card">
                <Image
                  src={feature.image}
                  alt={feature.alt}
                  fill
                  unoptimized
                  sizes="(max-width: 1024px) 100vw, 560px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
