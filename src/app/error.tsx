"use client";

import { useEffect } from "react";

// Friendly error screen for unexpected runtime errors
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-6 text-center">
      <h1 className="text-3xl font-extrabold">Something went wrong</h1>
      <p className="mt-3 text-muted">
        An unexpected error stopped this page from loading. Try again, and if
        the problem continues, contact us.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-7 rounded-xl bg-brand px-7 py-3.5 text-sm font-bold text-brand-fg transition hover:bg-brand-strong active:scale-95"
      >
        Try again
      </button>
    </section>
  );
}
