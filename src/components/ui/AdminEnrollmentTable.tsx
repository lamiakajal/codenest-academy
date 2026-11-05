"use client";

import { useState } from "react";
import type { ApiResponse } from "@/types";

export interface AdminEnrollment {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  courseTitle: string;
  mode: string;
  status: string;
  message: string;
  createdAt: string;
}

const STATUSES = ["pending", "contacted", "confirmed"];

// Admin table with an inline status dropdown for each enrollment
export default function AdminEnrollmentTable({ initial }: { initial: AdminEnrollment[] }) {
  const [rows, setRows] = useState(initial);
  const [error, setError] = useState("");
  const [savingId, setSavingId] = useState<string | null>(null);

  const updateStatus = async (id: string, status: string) => {
    setError("");
    setSavingId(id);
    const previous = rows;
    // Update the screen right away, then roll back if the server refuses
    setRows((current) => current.map((row) => (row.id === id ? { ...row, status } : row)));
    try {
      const res = await fetch(`/api/admin/enrollments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const body = (await res.json()) as ApiResponse;
      if (!body.ok) {
        setRows(previous);
        setError(body.message ?? "Could not update the status.");
      }
    } catch {
      setRows(previous);
      setError("Network error. The status was not saved.");
    } finally {
      setSavingId(null);
    }
  };

  if (rows.length === 0) {
    return <p className="rounded-2xl border border-line bg-surface p-8 text-center text-muted">No enrollment requests yet.</p>;
  }

  return (
    <div>
      {error && <p role="alert" className="mb-4 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-500">{error}</p>}
      <div className="overflow-x-auto rounded-2xl border border-line bg-surface shadow-card">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="border-b border-line bg-surface-2 text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="px-4 py-3">Student</th>
              <th className="px-4 py-3">Course</th>
              <th className="px-4 py-3">Mode</th>
              <th className="px-4 py-3">Received</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.map((row) => (
              <tr key={row.id} className="align-top">
                <td className="px-4 py-3">
                  <p className="font-bold">{row.fullName}</p>
                  <p className="text-xs text-muted">{row.email}</p>
                  <p className="text-xs text-muted">{row.phone}</p>
                  {row.message && <p className="mt-1 max-w-xs text-xs italic text-muted">&ldquo;{row.message}&rdquo;</p>}
                </td>
                <td className="px-4 py-3">{row.courseTitle}</td>
                <td className="px-4 py-3 capitalize">{row.mode}</td>
                <td className="px-4 py-3 text-xs text-muted">{new Date(row.createdAt).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}</td>
                <td className="px-4 py-3">
                  <select
                    value={row.status}
                    disabled={savingId === row.id}
                    onChange={(e) => updateStatus(row.id, e.target.value)}
                    aria-label={`Status for ${row.fullName}`}
                    className="rounded-lg border border-line bg-bg px-3 py-2 text-xs font-semibold capitalize outline-none focus:border-brand disabled:opacity-60"
                  >
                    {STATUSES.map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
