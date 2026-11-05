"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import Field from "./Field";
import FormMessage from "./FormMessage";
import type { ApiResponse } from "@/types";

// Sets a new password with the token from the reset email
export default function ResetForm({ token }: { token: string }) {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const body = (await res.json()) as ApiResponse;
      setResult({ type: body.ok ? "success" : "error", message: body.message ?? "Done." });
      if (body.ok) setPassword("");
    } catch {
      setResult({ type: "error", message: "Network error. Check your connection and try again." });
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return <FormMessage type="error" message="This reset link is missing its token. Request a new link." />;
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <Field label="New password" name="password" type="password" autoComplete="new-password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 8 characters" hint="Use 8 or more characters with at least one letter and one number." />
      {result && <FormMessage type={result.type} message={result.message} />}
      {result?.type === "success" ? (
        <Link href="/signin" className="block w-full rounded-xl bg-brand py-3.5 text-center text-sm font-bold text-brand-fg transition hover:bg-brand-strong">
          Go to sign in
        </Link>
      ) : (
        <button type="submit" disabled={loading} className="w-full rounded-xl bg-brand py-3.5 text-sm font-bold text-brand-fg shadow-card transition hover:bg-brand-strong active:scale-[0.99] disabled:opacity-60">
          {loading ? "Saving..." : "Set new password"}
        </button>
      )}
    </form>
  );
}
