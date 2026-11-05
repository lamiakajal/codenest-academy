"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import Field from "./Field";
import FormMessage from "./FormMessage";
import type { ApiResponse } from "@/types";

interface AuthFormProps {
  mode: "signin" | "signup";
}

// Handles both the sign in and sign up forms and talks to /api/auth/*
export default function AuthForm({ mode }: AuthFormProps) {
  const isSignup = mode === "signup";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`/api/auth/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(isSignup ? { name, email, password } : { email, password }),
      });
      const body = (await res.json()) as ApiResponse;

      if (!body.ok) {
        setError(body.message ?? "Something went wrong. Please try again.");
        return;
      }
      // Full reload so the navbar picks up the new session cookie
      window.location.assign("/");
    } catch {
      setError("Network error. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      {isSignup && (
        <Field
          label="Full name"
          name="name"
          autoComplete="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your full name"
        />
      )}
      <Field
        label="Email address"
        name="email"
        type="email"
        autoComplete="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
      />
      <div>
        <Field
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          autoComplete={isSignup ? "new-password" : "current-password"}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={isSignup ? "At least 8 characters" : "Your password"}
          hint={isSignup ? "Use 8 or more characters with at least one letter and one number." : undefined}
        />
        <div className="mt-2 flex items-center justify-between gap-3">
        <label className="flex cursor-pointer items-center gap-2 text-xs text-muted">
          <input
            type="checkbox"
            checked={showPassword}
            onChange={(e) => setShowPassword(e.target.checked)}
            className="h-4 w-4 accent-[var(--brand)]"
          />
          Show password
        </label>
        {!isSignup && (
          <Link href="/forgot-password" className="text-xs font-semibold text-brand hover:underline">
            Forgot password?
          </Link>
        )}
        </div>
      </div>

      {error && <FormMessage type="error" message={error} />}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-brand py-3.5 text-sm font-bold text-brand-fg shadow-card transition hover:bg-brand-strong active:scale-[0.99] disabled:opacity-60"
      >
        {loading ? (isSignup ? "Creating account..." : "Signing in...") : isSignup ? "Create account" : "Sign in"}
      </button>
    </form>
  );
}
