import type { Metadata } from "next";
import Link from "next/link";
import AuthShell from "@/components/ui/AuthShell";
import ResetForm from "@/components/ui/ResetForm";

export const metadata: Metadata = { title: "Choose a new password" };

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  return (
    <AuthShell
      title="Choose a new password"
      subtitle="Pick a strong password you have not used before."
      footer={
        <Link href="/forgot-password" className="font-bold text-brand hover:underline">
          Need a new link?
        </Link>
      }
    >
      <ResetForm token={token ?? ""} />
    </AuthShell>
  );
}
