import SectionHeading from "@/components/ui/SectionHeading";
import { SITE } from "@/data/site";

// Map section shown before the footer. The map always uses a dark style.
export default function Location() {
  const query = encodeURIComponent(SITE.address);
  // Keyless Google Maps embed plus a normal link for directions
  const embedUrl = `https://maps.google.com/maps?q=${query}&z=16&output=embed`;
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;

  return (
    <section id="location" className="relative pb-20 md:pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Find us in Banani, Dhaka"
          description="Drop in for a free campus tour, or get directions to the lab below."
        />

        <div className="relative overflow-hidden rounded-3xl border border-line bg-[#0d1030] shadow-card">
          {/* Inverting the light map tiles gives a dark map without any API key */}
          <iframe
            title={`Map showing ${SITE.name} at ${SITE.address}`}
            src={embedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="block h-[420px] w-full border-0 md:h-[520px]"
            style={{ filter: "invert(92%) hue-rotate(180deg) contrast(0.95) saturate(0.8)" }}
          />

          {/* Address card */}
          <div className="border-t border-white/10 bg-[#0d1030]/95 p-6 text-white backdrop-blur md:absolute md:bottom-6 md:left-6 md:max-w-sm md:rounded-2xl md:border md:p-6">
            <p className="text-sm font-semibold text-white/60">{SITE.name}</p>
            <p className="mt-2 text-base font-bold leading-snug">{SITE.address}</p>
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-[#1b1360] transition hover:-translate-y-0.5 hover:bg-white/90 active:scale-95"
            >
              Get directions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
