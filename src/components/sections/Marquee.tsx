// Scrolling strip of technologies taught (replaces the old tech stack section with one slim line)
const TECH = ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Node.js", "MongoDB", "Git", "Docker", "Tailwind CSS", "REST APIs"];

export default function Marquee() {
  const items = [...TECH, ...TECH];
  return (
    <div aria-hidden="true" className="relative z-10 mt-16 overflow-hidden border-y border-line bg-surface/70 py-4 backdrop-blur">
      <div className="animate-marquee flex w-max gap-10 whitespace-nowrap">
        {items.map((name, i) => (
          <span key={i} className="flex items-center gap-10 text-sm font-semibold text-muted">
            {name}
            <span className="h-1.5 w-1.5 rounded-full bg-brand/50" />
          </span>
        ))}
      </div>
    </div>
  );
}
