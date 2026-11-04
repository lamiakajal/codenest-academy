import type { Metadata } from "next";
import AuthShell from "@/components/ui/AuthShell";
import EnrollForm from "@/components/ui/EnrollForm";
import { courses } from "@/data/site";

export const metadata: Metadata = { title: "Enroll" };

interface EnrollPageProps {
  searchParams: Promise<{ course?: string }>;
}

export default async function EnrollPage({ searchParams }: EnrollPageProps) {
  const { course } = await searchParams;
  // Preselect the course from the link (?course=slug) when it is valid
  const defaultCourse = courses.some((c) => c.slug === course) ? (course as string) : courses[1].slug;

  return (
    <AuthShell
      title="Enroll in the next batch"
      subtitle="Tell us a little about yourself. Our admissions team will call you within 24 hours to confirm your seat and share the payment plan."
      footer={<>Prefer to talk first? Email hello@codenest.academy</>}
    >
      <EnrollForm defaultCourse={defaultCourse} />
    </AuthShell>
  );
}
