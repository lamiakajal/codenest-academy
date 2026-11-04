import Link from "next/link";
import type { ReactNode } from "react";
import { LogoMark } from "./Logo";

interface AuthShellProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}

// Centered card layout shared by the sign in, sign up and enroll pages
export default function AuthShell({ title, subtitle, children, footer }: AuthShellProps) {
  return (
    <section className="relative mx-auto flex min-h-[80vh] max-w-xl items-center px-4 py-14 sm:px-6">
      <div className="animate-rise w-full rounded-3xl border border-line bg-surface p-7 shadow-card sm:p-10">
        <Link href="/" aria-label="Back to home" className="inline-block transition-transform hover:rotate-6">
          <LogoMark size={48} />
        </Link>
        <h1 className="mt-6 text-3xl font-extrabold">{title}</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted">{subtitle}</p>
        <div className="mt-8">{children}</div>
        <div className="mt-6 border-t border-line pt-6 text-center text-sm text-muted">{footer}</div>
      </div>
    </section>
  );
}
