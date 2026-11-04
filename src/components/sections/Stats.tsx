import { stats } from "@/data/site";

// Quiet proof strip right under the hero
export default function Stats() {
  return (
    <section aria-label="Academy results" className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <dl className="grid grid-cols-1 divide-y divide-line overflow-hidden rounded-3xl border border-line bg-surface shadow-card md:grid-cols-3 md:divide-x md:divide-y-0">
        {stats.map((stat) => (
          <div key={stat.label} className="p-7 transition-colors hover:bg-surface-2 sm:p-8">
            <dt className="text-sm font-semibold text-muted">{stat.label}</dt>
            <dd className="mt-2 font-display text-4xl font-extrabold tracking-tight text-brand sm:text-5xl">
              {stat.value}
            </dd>
            <p className="mt-3 text-sm leading-relaxed text-muted">{stat.detail}</p>
          </div>
        ))}
      </dl>
    </section>
  );
}
