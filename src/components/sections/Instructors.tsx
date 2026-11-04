import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import { mentors } from "@/data/site";

export default function Instructors() {
  return (
    <section id="mentors" className="relative border-y border-line bg-surface/80 py-20 backdrop-blur-sm md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Learn from engineers who ship every week"
          description="Your mentors build and maintain production software today. They teach what they use at work, not what a textbook says."
        />

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {mentors.map((mentor) => (
            <article
              key={mentor.name}
              className="group overflow-hidden rounded-3xl border border-line bg-bg p-5 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/60"
            >
              <div className="relative aspect-4/5 w-full overflow-hidden rounded-2xl bg-surface-2">
                <Image
                  src={mentor.image}
                  alt={`Portrait of ${mentor.name}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 380px"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="px-1 pb-2 pt-6">
                <h3 className="text-xl font-extrabold">{mentor.name}</h3>
                <p className="mt-1 text-sm font-semibold text-brand">{mentor.role}</p>
                <p className="mt-1 text-xs text-muted">
                  {mentor.experience} &middot; {mentor.focus}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted">{mentor.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
