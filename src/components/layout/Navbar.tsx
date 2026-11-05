"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Logo from "@/components/ui/Logo";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { moreLinks, navLinks } from "@/data/site";
import type { ApiResponse, SessionUser } from "@/types";

export default function Navbar() {
  // Mobile drawer state, scroll state and the signed-in user (null for guests)
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<SessionUser | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  // "More" dropdown state; the ref lets us close it when clicking elsewhere
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!moreOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) setMoreOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMoreOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [moreOpen]);

  // Add a shadow once the page has been scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Ask the server who is signed in (only reads the cookie, no database needed)
  useEffect(() => {
    let cancelled = false;
    fetch("/api/auth/me")
      .then((res) => res.json() as Promise<ApiResponse<{ user: SessionUser | null; isAdmin: boolean }>>)
      .then((body) => {
        if (!cancelled) {
          setUser(body.data?.user ?? null);
          setIsAdmin(body.data?.isAdmin ?? false);
        }
      })
      .catch(() => {
        // Treat network or config errors as a signed-out visitor
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const signOut = async () => {
    await fetch("/api/auth/signout", { method: "POST" });
    setUser(null);
    setIsAdmin(false);
    setIsOpen(false);
    window.location.assign("/");
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b backdrop-blur-xl transition-all duration-300 ${
        scrolled
          ? "border-line bg-bg/85 shadow-card"
          : "border-transparent bg-bg/60"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="group" aria-label="CodeNest Academy home">
          <Logo />
        </Link>

        {/* Desktop links */}
        <nav aria-label="Main" className="hidden items-center gap-1 xl:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-muted transition-colors hover:bg-surface-2 hover:text-fg"
            >
              {link.label}
            </Link>
          ))}

          {/* More dropdown */}
          <div ref={moreRef} className="relative">
            <button
              type="button"
              onClick={() => setMoreOpen((open) => !open)}
              aria-haspopup="menu"
              aria-expanded={moreOpen}
              className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold text-muted transition-colors hover:bg-surface-2 hover:text-fg"
            >
              More
              <svg viewBox="0 0 24 24" className={`h-4 w-4 fill-none stroke-current stroke-2 transition-transform duration-200 ${moreOpen ? "rotate-180" : ""}`} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            {moreOpen && (
              <div role="menu" className="animate-rise absolute left-0 top-full mt-2 w-56 overflow-hidden rounded-2xl border border-line bg-surface p-2 shadow-card">
                {moreLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    role="menuitem"
                    onClick={() => setMoreOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors hover:bg-surface-2 hover:text-brand"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 xl:flex">
          <ThemeToggle />
          {user ? (
            <>
              {isAdmin && (
                <Link href="/admin" className="rounded-lg px-3 py-2 text-sm font-semibold text-accent transition hover:bg-surface-2">
                  Admin
                </Link>
              )}
              <Link href="/account" className="max-w-40 truncate rounded-lg px-3 py-2 text-sm font-semibold transition hover:bg-surface-2" title={user.email}>
                Hi, {user.name.split(" ")[0]}
              </Link>
              <button
                type="button"
                onClick={signOut}
                className="rounded-lg border border-line px-4 py-2 text-sm font-semibold transition hover:border-brand hover:text-brand"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link href="/signin" className="rounded-lg px-4 py-2 text-sm font-semibold transition hover:bg-surface-2">
                Sign in
              </Link>
              <Link
                href="/signup"
                className="rounded-lg border border-line px-4 py-2 text-sm font-semibold transition hover:border-brand hover:text-brand"
              >
                Sign up
              </Link>
            </>
          )}
          <Link
            href="/enroll"
            className="rounded-lg bg-brand px-5 py-2.5 text-sm font-bold text-brand-fg shadow-card transition-all hover:-translate-y-0.5 hover:bg-brand-strong active:scale-95"
          >
            Enroll now
          </Link>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 xl:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2" strokeLinecap="round" strokeLinejoin="round">
              {isOpen ? <path d="M6 18 18 6M6 6l12 12" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {isOpen && (
        <div className="animate-rise max-h-[calc(100vh-4.5rem)] overflow-y-auto border-t border-line bg-bg px-4 pb-6 pt-3 xl:hidden">
          <nav aria-label="Mobile" className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={closeMenu}
                className="rounded-lg px-3 py-3 text-base font-semibold hover:bg-surface-2"
              >
                {link.label}
              </Link>
            ))}
            <p className="px-3 pb-1 pt-3 text-xs font-bold uppercase tracking-wide text-muted">More</p>
            {moreLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={closeMenu}
                className="rounded-lg px-3 py-2.5 text-sm font-semibold text-muted hover:bg-surface-2 hover:text-fg"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 grid gap-2 border-t border-line pt-4">
            {user ? (
              <>
                <Link href="/account" onClick={closeMenu} className="rounded-lg border border-line py-3 text-center text-sm font-semibold">
                  My account ({user.name.split(" ")[0]})
                </Link>
                {isAdmin && (
                  <Link href="/admin" onClick={closeMenu} className="rounded-lg border border-accent/50 py-3 text-center text-sm font-semibold text-accent">
                    Admin dashboard
                  </Link>
                )}
                <button
                  type="button"
                  onClick={signOut}
                  className="rounded-lg border border-line py-3 text-sm font-semibold"
                >
                  Sign out
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link href="/signin" onClick={closeMenu} className="rounded-lg border border-line py-3 text-center text-sm font-semibold">
                  Sign in
                </Link>
                <Link href="/signup" onClick={closeMenu} className="rounded-lg border border-line py-3 text-center text-sm font-semibold">
                  Sign up
                </Link>
              </div>
            )}
            <Link
              href="/enroll"
              onClick={closeMenu}
              className="rounded-lg bg-brand py-3 text-center text-sm font-bold text-brand-fg"
            >
              Enroll now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
