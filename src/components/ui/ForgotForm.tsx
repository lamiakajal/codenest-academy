"use client";

import { useState, type FormEvent } from "react";
import Field from "./Field";
import FormMessage from "./FormMessage";
import type { ApiResponse } from "@/types";

// Asks for an email and requests a reset link from /api/auth/forgot
export default function ForgotForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/forgot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const body = (await res.json()) as ApiResponse;
      setResult({ type: body.ok ? "success" : "error", message: body.message ?? "Done." });
    } catch {
      setResult({ type: "error", message: "Network error. Check your connection and try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <Field label="Email address" name="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
      {result && <FormMessage type={result.type} message={result.message} />}
      <button type="submit" disabled={loading} className="w-full rounded-xl bg-brand py-3.5 text-sm font-bold text-brand-fg shadow-card transition hover:bg-brand-strong active:scale-[0.99] disabled:opacity-60">
        {loading ? "Sending..." : "Send reset link"}
      </button>
    </form>
  );
}
