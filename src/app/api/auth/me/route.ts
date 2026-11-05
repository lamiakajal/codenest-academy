import { getSession } from "@/lib/auth";
import { json } from "@/lib/api";
import { isAdminEmail } from "@/lib/admin";
import type { SessionUser } from "@/types";

// Always read the cookie fresh instead of caching the response
export const dynamic = "force-dynamic";

// GET /api/auth/me - returns the signed-in user, or null for guests.
// This only verifies the cookie, so it works even before MongoDB is connected.
export async function GET() {
  const user = await getSession();
  return json<{ user: SessionUser | null; isAdmin: boolean }>({
    ok: true,
    data: { user, isAdmin: user ? isAdminEmail(user.email) : false },
  });
}
