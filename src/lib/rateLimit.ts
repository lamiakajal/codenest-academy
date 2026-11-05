import { json } from "@/lib/api";

interface Bucket {
  count: number;
  resetAt: number;
}

// In-memory counters. This protects a single server instance; on serverless hosts
// each instance keeps its own counters, which still blocks simple abuse.
const buckets = new Map<string, Bucket>();

// Best-effort client identifier taken from the proxy headers
function clientId(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

// Returns a 429 response when the caller exceeded the limit, otherwise null
export function rateLimit(request: Request, name: string, limit: number, windowMs: number) {
  const now = Date.now();
  const key = `${name}:${clientId(request)}`;

  // Drop expired buckets occasionally so the map cannot grow forever
  if (buckets.size > 5000) {
    for (const [k, b] of buckets) if (b.resetAt <= now) buckets.delete(k);
  }

  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return null;
  }

  bucket.count += 1;
  if (bucket.count > limit) {
    const seconds = Math.ceil((bucket.resetAt - now) / 1000);
    return json({ ok: false, message: `Too many attempts. Please try again in ${seconds} seconds.` }, 429);
  }
  return null;
}
