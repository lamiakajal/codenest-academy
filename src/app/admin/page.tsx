import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAdminSession } from "@/lib/admin";
import { connectDB, isDatabaseConfigured } from "@/lib/db";
import { courses } from "@/data/site";
import Enrollment from "@/models/Enrollment";
import Subscriber from "@/models/Subscriber";
import User from "@/models/User";
import AdminEnrollmentTable, { type AdminEnrollment } from "@/components/ui/AdminEnrollmentTable";

export const metadata: Metadata = { title: "Admin dashboard", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  // Anyone who is not an admin sees the normal 404 page, so the route stays hidden
  const admin = await getAdminSession();
  if (!admin) notFound();

  if (!isDatabaseConfigured()) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <h1 className="text-3xl font-extrabold">Admin dashboard</h1>
        <p className="mt-4 rounded-2xl border border-line bg-surface p-6 text-muted">Connect MongoDB (MONGODB_URI) to see enrollments here.</p>
      </section>
    );
  }

  await connectDB();
  const [userCount, subscriberCount, enrollmentCount, rows] = await Promise.all([
    User.countDocuments(),
    Subscriber.countDocuments(),
    Enrollment.countDocuments(),
    Enrollment.find().sort({ createdAt: -1 }).limit(200).lean(),
  ]);

  const enrollments: AdminEnrollment[] = rows.map((row) => ({
    id: String(row._id),
    fullName: row.fullName,
    email: row.email,
    phone: row.phone,
    courseTitle: courses.find((c) => c.slug === row.courseSlug)?.title ?? row.courseSlug,
    mode: row.mode,
    status: row.status ?? "pending",
    message: row.message ?? "",
    createdAt: new Date((row as unknown as { createdAt: Date }).createdAt).toISOString(),
  }));

  const stats = [
    { label: "Students registered", value: userCount },
    { label: "Enrollment requests", value: enrollmentCount },
    { label: "Newsletter subscribers", value: subscriberCount },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <h1 className="animate-rise text-3xl font-extrabold sm:text-4xl">Admin dashboard</h1>
      <p className="mt-2 text-muted">Signed in as {admin.email}</p>

      <dl className="mt-8 grid gap-4 sm:grid-cols-3">
        {stats.map((item) => (
          <div key={item.label} className="rounded-2xl border border-line bg-surface p-6 shadow-card">
            <dt className="text-sm font-semibold text-muted">{item.label}</dt>
            <dd className="mt-2 font-display text-4xl font-extrabold text-brand">{item.value}</dd>
          </div>
        ))}
      </dl>

      <h2 className="mb-4 mt-12 text-xl font-extrabold">Latest enrollment requests</h2>
      <AdminEnrollmentTable initial={enrollments} />
    </section>
  );
}
