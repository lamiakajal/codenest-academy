"use client";

import { useState, type FormEvent } from "react";
import type { ApiResponse } from "@/types";

type Status = { type: "idle" | "loading" | "success" | "error"; message: string };

// Footer email form that posts to /api/newsletter
export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>({ type: "idle", message: "" });

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus({ type: "loading", message: "" });
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const body = (await res.json()) as ApiResponse;
      if (body.ok) {
        setEmail("");
        setStatus({ type: "success", message: body.message ?? "Subscribed." });
      } else {
        setStatus({ type: "error", message: body.message ?? "Could not subscribe." });
      }
    } catch {
      setStatus({ type: "error", message: "Network error. Check your connection and try again." });
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-2" noValidate>
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <div className="flex gap-2">
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="min-w-0 flex-1 rounded-lg border border-line bg-bg px-3 py-2.5 text-sm outline-none transition focus:border-brand"
        />
        <button
          type="submit"
          disabled={status.type === "loading"}
          className="rounded-lg bg-brand px-4 py-2.5 text-sm font-bold text-brand-fg transition hover:bg-brand-strong disabled:opacity-60"
        >
          {status.type === "loading" ? "Sending" : "Subscribe"}
        </button>
      </div>
      {status.message && (
        <p
          role="status"
          className={`text-xs ${status.type === "success" ? "text-accent" : "text-red-500"}`}
        >
          {status.message}
        </p>
      )}
    </form>
  );
}
