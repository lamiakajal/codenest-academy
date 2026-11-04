import type { Metadata } from "next";
import Link from "next/link";
import AuthShell from "@/components/ui/AuthShell";
import AuthForm from "@/components/ui/AuthForm";

export const metadata: Metadata = { title: "Sign up" };

export default function SignUpPage() {
  return (
    <AuthShell
      title="Create your account"
      subtitle="Join CodeNest to enroll in courses and keep your progress in one place."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/signin" className="font-bold text-brand hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <AuthForm mode="signup" />
    </AuthShell>
  );
}
