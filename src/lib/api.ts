import { NextResponse } from "next/server";
import type { ApiResponse } from "@/types";
import { isDatabaseConfigured } from "@/lib/db";

// Builds a JSON response using the shared API shape
export function json<T>(body: ApiResponse<T>, status = 200) {
  return NextResponse.json(body, { status });
}

// Returns a friendly 503 when MongoDB has not been connected yet, otherwise null
export function requireDatabase() {
  if (isDatabaseConfigured()) return null;
  return json(
    {
      ok: false,
      message:
        "The database is not connected yet. Add MONGODB_URI to .env.local and restart the server.",
    },
    503,
  );
}
