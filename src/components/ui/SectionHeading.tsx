interface SectionHeadingProps {
  title: string;
  description?: string;
  align?: "left" | "center";
}

// Consistent heading block used at the top of every home page section
export default function SectionHeading({
  title,
  description,
  align = "center",
}: SectionHeadingProps) {
  return (
    <div
      className={`mb-12 max-w-2xl md:mb-16 ${
        align === "center" ? "mx-auto text-center" : "text-left"
      }`}
    >
      <h2 className="text-balance text-3xl font-extrabold sm:text-4xl md:text-5xl">{title}</h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{description}</p>
      )}
    </div>
  );
}
