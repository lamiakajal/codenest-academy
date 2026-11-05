import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import { courses } from "@/data/site";
import { stagger } from "@/lib/reveal";

export default function Courses() {
  return (
    <section id="courses" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Pick the track that matches where you are"
          description="Each course is built around projects you can show to employers. Start at the beginning or join the track that fits your current skills."
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {courses.map((course, index) => (
            <article
              key={course.slug}
              data-reveal
              style={stagger(index)}
              className={`relative flex flex-col rounded-3xl border bg-surface p-8 shadow-card transition-all duration-300 hover:-translate-y-1.5 ${
                course.popular ? "border-brand ring-2 ring-brand/25" : "border-line hover:border-brand/50"
              }`}
            >
              {course.popular && (
                <span className="absolute -top-3.5 right-6 rounded-full bg-brand px-4 py-1 text-xs font-bold text-brand-fg">
                  Most popular
                </span>
              )}

              <div className="flex items-center justify-between text-xs font-semibold text-muted">
                <span className="rounded-full bg-surface-2 px-3 py-1">{course.level}</span>
                <span>{course.duration}</span>
              </div>

              <h3 className="mt-5 text-2xl font-extrabold leading-tight">{course.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{course.description}</p>

              <ul className="mt-6 space-y-2.5">
                {course.outcomes.map((item) => (
                  <li key={item} className="flex gap-3 text-sm">
                    <svg viewBox="0 0 24 24" className="mt-0.5 h-5 w-5 shrink-0 fill-none stroke-accent stroke-[2.5]" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="m5 12 5 5 9-10" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-2">
                {course.tags.map((tag) => (
                  <span key={tag} className="rounded-lg border border-line bg-bg px-2.5 py-1 text-xs font-semibold text-muted">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex items-center justify-between gap-3 pt-8">
                <p className="font-display text-xl font-extrabold">{course.price}</p>
                <Link
                  href={`/enroll?course=${course.slug}`}
                  className={`rounded-xl px-5 py-3 text-sm font-bold transition-all active:scale-95 ${
                    course.popular
                      ? "bg-brand text-brand-fg hover:bg-brand-strong"
                      : "border border-line hover:border-brand hover:text-brand"
                  }`}
                >
                  Enroll in this course
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
