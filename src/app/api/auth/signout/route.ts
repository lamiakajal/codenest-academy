import { destroySession } from "@/lib/auth";
import { json } from "@/lib/api";

// POST /api/auth/signout - clears the session cookie
export async function POST() {
  await destroySession();
  return json({ ok: true, message: "Signed out." });
}
