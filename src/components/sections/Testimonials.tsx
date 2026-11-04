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

export default function Testimonials() {
  return (
    <section id="reviews" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Graduates who made the switch"
          description="Hear from learners who started where you are and now work as developers."
        />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <figure
              key={item.name}
              className="flex flex-col justify-between rounded-3xl border border-line bg-surface p-8 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/60"
            >
              <div>
                <div className="flex gap-1 text-warm" aria-label="Rated 5 out of 5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                      <path d="m12 2 3 6.9 7.5.7-5.7 5 1.7 7.4L12 18l-6.5 4 1.7-7.4-5.7-5 7.5-.7L12 2Z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="mt-5 text-base leading-relaxed">&ldquo;{item.quote}&rdquo;</blockquote>
              </div>
              <figcaption className="mt-8 flex items-center gap-4 border-t border-line pt-6">
                <span
                  className={`grid h-12 w-12 place-items-center rounded-full font-display text-sm font-extrabold text-white ${
                    AVATAR_COLORS[index % AVATAR_COLORS.length]
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
          ))}
        </div>
      </div>
    </section>
  );
}
