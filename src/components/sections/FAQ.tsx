"use client";

import { useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import { faqs } from "@/data/site";

export default function FAQ() {
  // Index of the open question (the first one starts open)
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative border-y border-line bg-surface/80 py-20 backdrop-blur-sm md:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Questions students ask before enrolling"
          description="Cannot find your answer? Email us and we will reply within one working day."
        />

        <div className="space-y-4">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.q}
                className={`overflow-hidden rounded-2xl border bg-bg transition-colors ${
                  isOpen ? "border-brand/60" : "border-line"
                }`}
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${index}`}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left text-base font-bold sm:p-6 sm:text-lg"
                  >
                    {item.q}
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full bg-surface-2 transition-transform duration-300 ${
                        isOpen ? "rotate-45 bg-brand text-brand-fg" : ""
                      }`}
                      aria-hidden="true"
                    >
                      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-[2.5]" strokeLinecap="round">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </button>
                </h3>
                {/* Grid-rows trick animates the panel height smoothly */}
                <div
                  id={`faq-panel-${index}`}
                  role="region"
                  className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-6 text-sm leading-relaxed text-muted sm:px-6 sm:text-base">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
