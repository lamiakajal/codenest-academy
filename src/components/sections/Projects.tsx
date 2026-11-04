import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import { projects } from "@/data/site";

// New section: examples of what students have built
export default function Projects() {
  return (
    <section id="projects" className="relative border-y border-line bg-surface/80 py-20 backdrop-blur-sm md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="What our students have built"
          description="These are capstone projects from recent batches. Each one runs online with real authentication and a real database."
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((project) => (
            <article
              key={project.title}
              className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-bg shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/60"
            >
              <div className="relative aspect-4/3 w-full overflow-hidden bg-surface-2">
                <Image
                  src={project.image}
                  alt={`${project.title} project preview`}
                  fill
                  unoptimized
                  sizes="(max-width: 640px) 100vw, 300px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-extrabold">{project.title}</h3>
                <p className="mt-1 text-xs font-semibold text-brand">{project.by}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{project.description}</p>
                <div className="mt-auto flex flex-wrap gap-2 pt-4">
                  {project.stack.map((tech) => (
                    <span key={tech} className="rounded-md bg-surface-2 px-2 py-1 text-xs font-semibold">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
