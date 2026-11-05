import { getSession } from "@/lib/auth";
import type { SessionUser } from "@/types";

// Emails listed in ADMIN_EMAILS (comma separated) may use the admin dashboard
export function isAdminEmail(email: string): boolean {
  const list = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
  return list.includes(email.trim().toLowerCase());
}

// Returns the signed-in user only when they are an admin, otherwise null
export async function getAdminSession(): Promise<SessionUser | null> {
  const user = await getSession();
  return user && isAdminEmail(user.email) ? user : null;
}
