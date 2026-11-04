import type { Metadata } from "next";
import Link from "next/link";
import AuthShell from "@/components/ui/AuthShell";
import AuthForm from "@/components/ui/AuthForm";

export const metadata: Metadata = { title: "Sign in" };

export default function SignInPage() {
  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to continue learning and manage your enrollments."
      footer={
        <>
          New to CodeNest?{" "}
          <Link href="/signup" className="font-bold text-brand hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      <AuthForm mode="signin" />
    </AuthShell>
  );
}
