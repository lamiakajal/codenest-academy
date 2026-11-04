import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import Marquee from "@/components/sections/Marquee";
import Courses from "@/components/sections/Courses";
import Features from "@/components/sections/Features";
import Roadmap from "@/components/sections/Roadmap";
import Instructors from "@/components/sections/Instructors";
import Campus from "@/components/sections/Campus";
import Projects from "@/components/sections/Projects";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import CallToAction from "@/components/sections/CallToAction";

export default function HomePage() {
  return (
    <>
      {/* 1. Hero with animated code editor */}
      <Hero />
      {/* 2. Results strip */}
      <Stats />
      <Marquee />
      {/* 3. Course tracks */}
      <Courses />
      {/* 4. Why CodeNest: projects, support, careers */}
      <Features />
      {/* 5. NEW: 16-week learning roadmap */}
      <Roadmap />
      {/* 6. Mentors */}
      <Instructors />
      {/* 7. Campus and how CodeNest changes your career */}
      <Campus />
      {/* 8. NEW: student project showcase */}
      <Projects />
      {/* 9. Student stories */}
      <Testimonials />
      {/* 10. FAQ */}
      <FAQ />
      {/* 11. Final call to action */}
      <CallToAction />
    </>
  );
}
