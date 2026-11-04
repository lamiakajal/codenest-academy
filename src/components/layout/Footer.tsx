import Link from "next/link";
import Logo from "@/components/ui/Logo";
import NewsletterForm from "./NewsletterForm";
import { SITE, courses } from "@/data/site";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-line bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12">
          {/* Brand and newsletter */}
          <div className="space-y-5 lg:col-span-4">
            <Link href="/" className="group inline-block" aria-label="CodeNest Academy home">
              <Logo />
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-muted">
              Project-based full-stack courses taught by working engineers, in
              our Banani lab and live online.
            </p>
            <div className="max-w-sm">
              <p className="mb-2 text-sm font-semibold">Get new batch dates and free tutorials</p>
              <NewsletterForm />
            </div>
          </div>

          {/* Courses */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h4 className="mb-4 text-sm font-bold">Courses</h4>
            <ul className="space-y-2.5 text-sm text-muted">
              {courses.map((course) => (
                <li key={course.slug}>
                  <Link href={`/enroll?course=${course.slug}`} className="transition hover:text-brand">
                    {course.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore */}
          <div className="lg:col-span-2">
            <h4 className="mb-4 text-sm font-bold">Explore</h4>
            <ul className="space-y-2.5 text-sm text-muted">
              <li><Link href="/#roadmap" className="transition hover:text-brand">Learning roadmap</Link></li>
              <li><Link href="/#mentors" className="transition hover:text-brand">Mentors</Link></li>
              <li><Link href="/#projects" className="transition hover:text-brand">Student projects</Link></li>
              <li><Link href="/#faq" className="transition hover:text-brand">FAQ</Link></li>
              <li><a href={SITE.github} target="_blank" rel="noopener noreferrer" className="transition hover:text-brand">GitHub</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-2">
            <h4 className="mb-4 text-sm font-bold">Visit or write</h4>
            <address className="space-y-2 text-sm not-italic leading-relaxed text-muted">
              <p>{SITE.address}</p>
              <p>
                <a href={`mailto:${SITE.email}`} className="transition hover:text-brand">
                  {SITE.email}
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 text-xs text-muted md:flex-row">
          <p>&copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p className="inline-flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
            Admissions are open for the next batch
          </p>
        </div>
      </div>
    </footer>
  );
}
