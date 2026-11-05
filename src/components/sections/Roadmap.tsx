import SectionHeading from "@/components/ui/SectionHeading";
import { roadmap } from "@/data/site";
import { stagger } from "@/lib/reveal";

// A real sequence, so numbered stages are meaningful here
export default function Roadmap() {
  return (
    <section id="roadmap" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Your 16-week path from beginner to hired"
          description="Four stages, each one ending with something you can show. You always know what you are building and why."
        />

        <ol className="relative mx-auto max-w-4xl">
          {/* Vertical line connecting the stages */}
          <span aria-hidden="true" className="absolute bottom-4 left-5 top-4 w-0.5 bg-linear-to-b from-brand via-accent to-warm md:left-1/2 md:-translate-x-1/2" />

          {roadmap.map((item, index) => (
            <li
              key={item.title}
              data-reveal
              style={stagger(index % 2)}
              className={`relative mb-12 flex gap-6 last:mb-0 md:gap-0 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Stage number badge sits on the line */}
              <span className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border-4 border-bg bg-brand font-display text-sm font-extrabold text-brand-fg md:absolute md:left-1/2 md:-translate-x-1/2">
                {index + 1}
              </span>

              <div className={`md:w-1/2 ${index % 2 === 0 ? "md:pr-14" : "md:pl-14"}`}>
                <div className="rounded-2xl border border-line bg-surface p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand/60">
                  <p className="text-sm font-semibold text-accent">{item.stage}</p>
                  <h3 className="mt-1 text-xl font-extrabold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
                  <p className="mt-4 rounded-lg bg-surface-2 px-3 py-2 text-sm">
                    <span className="font-semibold">You will have: </span>
                    {item.deliverable}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
