"use client";

import { useState, type FormEvent } from "react";
import Field from "./Field";
import FormMessage from "./FormMessage";
import { courses } from "@/data/site";
import type { ApiResponse } from "@/types";

interface EnrollFormProps {
  defaultCourse: string;
}

const MODES = [
  { value: "offline", label: "In the Banani lab" },
  { value: "online", label: "Live online" },
  { value: "hybrid", label: "Both" },
];

// Enrollment request form that posts to /api/enroll
export default function EnrollForm({ defaultCourse }: EnrollFormProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [courseSlug, setCourseSlug] = useState(defaultCourse);
  const [mode, setMode] = useState("offline");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult(null);
    setLoading(true);

    try {
      const res = await fetch("/api/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, phone, courseSlug, mode, message }),
      });
      const body = (await res.json()) as ApiResponse;

      if (body.ok) {
        setResult({ type: "success", message: body.message ?? "Request received." });
        setFullName("");
        setEmail("");
        setPhone("");
        setMessage("");
      } else {
        setResult({ type: "error", message: body.message ?? "Could not submit your request." });
      }
    } catch {
      setResult({ type: "error", message: "Network error. Check your connection and try again." });
    } finally {
      setLoading(false);
    }
  };

  const selectClass =
    "w-full rounded-xl border border-line bg-bg px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/15";

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <Field label="Full name" name="fullName" autoComplete="name" required value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Your full name" />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Email address" name="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
        <Field label="Phone number" name="phone" type="tel" autoComplete="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+880 1XXX XXXXXX" />
      </div>

      <div>
        <label htmlFor="course" className="mb-1.5 block text-sm font-semibold">Course</label>
        <select id="course" value={courseSlug} onChange={(e) => setCourseSlug(e.target.value)} className={selectClass}>
          {courses.map((course) => (
            <option key={course.slug} value={course.slug}>
              {course.title} ({course.duration}, {course.price})
            </option>
          ))}
        </select>
      </div>

      <fieldset>
        <legend className="mb-2 text-sm font-semibold">How do you want to attend?</legend>
        <div className="grid gap-2 sm:grid-cols-3">
          {MODES.map((item) => (
            <label
              key={item.value}
              className={`cursor-pointer rounded-xl border px-4 py-3 text-center text-sm font-semibold transition ${
                mode === item.value ? "border-brand bg-brand/10 text-brand" : "border-line hover:border-brand/50"
              }`}
            >
              <input type="radio" name="mode" value={item.value} checked={mode === item.value} onChange={() => setMode(item.value)} className="sr-only" />
              {item.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-semibold">
          Anything we should know? <span className="font-normal text-muted">(optional)</span>
        </label>
        <textarea
          id="message"
          rows={3}
          maxLength={600}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us about your experience or goals"
          className={selectClass}
        />
      </div>

      {result && <FormMessage type={result.type} message={result.message} />}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-brand py-3.5 text-sm font-bold text-brand-fg shadow-card transition hover:bg-brand-strong active:scale-[0.99] disabled:opacity-60"
      >
        {loading ? "Sending request..." : "Send enrollment request"}
      </button>
    </form>
  );
}
