import type { CSSProperties } from "react";

// Staggers the scroll-reveal animation of items in a list (90ms apart, capped)
export function stagger(index: number): CSSProperties {
  return { "--d": `${Math.min(index, 6) * 90}ms` } as CSSProperties;
}
