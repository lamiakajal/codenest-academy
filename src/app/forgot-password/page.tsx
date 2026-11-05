import type { Metadata } from "next";
import Link from "next/link";
import AuthShell from "@/components/ui/AuthShell";
import ForgotForm from "@/components/ui/ForgotForm";

export const metadata: Metadata = { title: "Forgot password" };

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      title="Reset your password"
      subtitle="Enter the email you signed up with and we will send you a link to choose a new password."
      footer={
        <>
          Remembered it?{" "}
          <Link href="/signin" className="font-bold text-brand hover:underline">
            Back to sign in
          </Link>
        </>
      }
    >
      <ForgotForm />
    </AuthShell>
  );
}
