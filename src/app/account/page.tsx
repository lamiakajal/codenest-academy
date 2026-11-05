import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { connectDB, isDatabaseConfigured } from "@/lib/db";
import { courses } from "@/data/site";
import Enrollment from "@/models/Enrollment";
import StatusBadge from "@/components/ui/StatusBadge";

export const metadata: Metadata = { title: "My account" };
// Depends on the visitor's cookie, so it can never be cached
export const dynamic = "force-dynamic";

export default async function AccountPage() {
  // Protected page: guests are sent to the sign in screen
  const user = await getSession();
  if (!user) redirect("/signin");

  let enrollments: { id: string; courseSlug: string; mode: string; status: string; createdAt: string }[] = [];
  let dbReady = isDatabaseConfigured();

  if (dbReady) {
    try {
      await connectDB();
      const rows = await Enrollment.find({ $or: [{ userId: user.id }, { email: user.email }] })
        .sort({ createdAt: -1 })
        .lean();
      enrollments = rows.map((row) => ({
        id: String(row._id),
        courseSlug: row.courseSlug,
        mode: row.mode,
        status: row.status ?? "pending",
        createdAt: new Date((row as unknown as { createdAt: Date }).createdAt).toISOString(),
      }));
    } catch (error) {
      console.error("[account]", error);
      dbReady = false;
    }
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <div className="animate-rise">
        <h1 className="text-3xl font-extrabold sm:text-4xl">Hi, {user.name.split(" ")[0]}</h1>
        <p className="mt-2 text-muted">{user.email}</p>
      </div>

      <h2 className="mt-12 text-xl font-extrabold">Your enrollments</h2>

      {!dbReady ? (
        <p className="mt-4 rounded-2xl border border-line bg-surface p-6 text-sm text-muted">
          We could not load your enrollments right now. Please try again in a moment.
        </p>
      ) : enrollments.length === 0 ? (
        <div className="mt-4 rounded-2xl border border-line bg-surface p-8 text-center">
          <p className="text-muted">You have not enrolled in a course yet.</p>
          <Link href="/enroll" className="mt-5 inline-flex rounded-xl bg-brand px-6 py-3 text-sm font-bold text-brand-fg transition hover:bg-brand-strong">
            Enroll in a course
          </Link>
        </div>
      ) : (
        <ul className="mt-4 space-y-4">
          {enrollments.map((item) => {
            const course = courses.find((c) => c.slug === item.courseSlug);
            return (
              <li key={item.id} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-surface p-5 shadow-card">
                <div>
                  <p className="font-bold">{course?.title ?? item.courseSlug}</p>
                  <p className="mt-1 text-xs capitalize text-muted">
                    {item.mode} &middot; requested {new Date(item.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                  </p>
                </div>
                <StatusBadge status={item.status} />
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
