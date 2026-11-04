import type { NavItem } from "@/types";

// Core brand details used across the site
export const SITE = {
  name: "CodeNest Academy",
  shortName: "CodeNest",
  tagline: "Learn to build software that ships.",
  email: "hello@codenest.academy",
  address: "House 42, Road 11, Banani, Dhaka 1213, Bangladesh",
  github: "https://github.com/lamiakajal",
};

// Main navigation links (hash links work from every page)
export const navLinks: NavItem[] = [
  { label: "Home", href: "/#home" },
  { label: "Courses", href: "/#courses" },
  { label: "Why CodeNest", href: "/#features" },
  { label: "Roadmap", href: "/#roadmap" },
  { label: "Mentors", href: "/#mentors" },
  { label: "Campus", href: "/#campus" },
  { label: "Projects", href: "/#projects" },
  { label: "FAQ", href: "/#faq" },
];

export interface Course {
  slug: string;
  title: string;
  level: string;
  duration: string;
  price: string;
  description: string;
  outcomes: string[];
  tags: string[];
  popular: boolean;
}

// Course catalog (also validated by the /api/enroll route)
export const courses: Course[] = [
  {
    slug: "frontend-engineering",
    title: "Frontend Engineering",
    level: "Beginner to advanced",
    duration: "3 months",
    price: "BDT 24,000",
    description:
      "Start from semantic HTML and finish with a polished React interface. You will learn modern CSS, JavaScript, TypeScript and how to structure a component library that a team can maintain.",
    outcomes: [
      "Build responsive, accessible interfaces",
      "Ship a design system with Tailwind CSS",
      "Deploy three portfolio projects",
    ],
    tags: ["HTML & CSS", "JavaScript", "TypeScript", "React"],
    popular: false,
  },
  {
    slug: "fullstack-nextjs",
    title: "Full-Stack with Next.js",
    level: "Intermediate",
    duration: "4 months",
    price: "BDT 36,000",
    description:
      "Build complete products with the Next.js App Router, API routes, authentication and a MongoDB database. Every module ends with a feature you can demo to an interviewer.",
    outcomes: [
      "Design REST APIs and data models",
      "Add secure sign-in with sessions",
      "Launch a production app on Vercel",
    ],
    tags: ["Next.js", "Node.js", "MongoDB", "Authentication"],
    popular: true,
  },
  {
    slug: "backend-and-devops",
    title: "Backend, APIs & DevOps",
    level: "Advanced",
    duration: "3 months",
    price: "BDT 30,000",
    description:
      "Go deeper on the server side: database modeling, caching, background jobs, Docker and automated deployments. You will learn how to keep an API fast and reliable under real traffic.",
    outcomes: [
      "Model data for performance",
      "Containerize services with Docker",
      "Automate tests and releases with CI/CD",
    ],
    tags: ["Express", "Docker", "System design", "CI/CD"],
    popular: false,
  },
];

export interface Mentor {
  name: string;
  role: string;
  experience: string;
  bio: string;
  image: string;
  focus: string;
}

// Mentor roster (portraits are illustrations in /public/images)
export const mentors: Mentor[] = [
  {
    name: "Imran Hossain",
    role: "Lead full-stack architect",
    experience: "8 years in industry",
    bio: "Built payment and logistics platforms for startups across Dhaka and Singapore. He teaches system design by having students break and repair a real service.",
    image: "/images/mentor-imran.jpg",
    focus: "Next.js and system design",
  },
  {
    name: "Sabiha Rahman",
    role: "Senior frontend engineer",
    experience: "6 years in industry",
    bio: "Specializes in accessible interfaces and design systems. Her code reviews focus on readable components and the details users actually feel.",
    image: "/images/mentor-sabiha.jpg",
    focus: "React and UI engineering",
  },
  {
    name: "Alif Ahmed",
    role: "Backend and DevOps engineer",
    experience: "5 years in industry",
    bio: "Runs APIs that serve millions of requests a day. He walks students through authentication, databases and deployment pipelines step by step.",
    image: "/images/mentor-alif.jpg",
    focus: "Node.js and security",
  },
];

// Feature highlights shown in the alternating "Why CodeNest" blocks
export const features = [
  {
    tag: "Project-based learning",
    title: "Build real software from week one",
    description:
      "Every module ends with something that runs in the browser. By graduation you will have shipped a portfolio of full applications with authentication, databases and live deployments, not just finished exercises.",
    image: "/images/feature-projects.jpg",
    alt: "A smiling student with classmates working on laptops in a class",
    points: ["Weekly build challenges", "Real client-style briefs", "Public GitHub portfolio"],
  },
  {
    tag: "Lifetime support",
    title: "Get unstuck in minutes, not days",
    description:
      "Post a question in the student forum and a mentor or senior alumnus replies, usually within the hour. Support does not expire when the course ends.",
    image: "/images/feature-support.jpg",
    alt: "A student wearing headphones and learning on a laptop",
    points: ["Mentor replies within hours", "Private alumni community", "Weekly live debugging sessions"],
  },
  {
    tag: "Career outcomes",
    title: "Learn the skills employers pay for",
    description:
      "We train you for the interview as seriously as for the job. Expect mock technical rounds, resume and GitHub reviews, and introductions to hiring partners who are looking for junior engineers.",
    image: "/images/feature-career.jpg",
    alt: "A smiling developer at a laptop with money fanned out behind him",
    points: ["Mock technical interviews", "Resume and portfolio review", "Hiring partner introductions"],
  },
];

// Four stages of the learning journey (used by the Roadmap section)
export const roadmap = [
  {
    stage: "Weeks 1-3",
    title: "Foundations",
    description:
      "Learn how the web works. Write HTML and CSS by hand, then add JavaScript to make pages respond to people.",
    deliverable: "A responsive personal site",
  },
  {
    stage: "Weeks 4-8",
    title: "Frontend craft",
    description:
      "Move into React and TypeScript. Learn state, routing, forms and how to test the interfaces you build.",
    deliverable: "A multi-page web app",
  },
  {
    stage: "Weeks 9-14",
    title: "Full-stack products",
    description:
      "Add a server and a database. Build sign-in, protected pages and APIs, then deploy everything online.",
    deliverable: "A live product with real users",
  },
  {
    stage: "Weeks 15-16",
    title: "Career launch",
    description:
      "Polish your portfolio, practice interviews with working engineers and meet our hiring partners.",
    deliverable: "Interview-ready portfolio",
  },
];

// Student project showcase cards
export const projects = [
  {
    title: "Bazar Run",
    by: "Nusrat Jahan, Batch 05",
    description: "A grocery delivery app with live order tracking and a vendor dashboard.",
    stack: ["Next.js", "MongoDB"],
    image: "/images/project-bazar.svg",
  },
  {
    title: "PaperTrail",
    by: "Tamim Iqbal, Batch 04",
    description: "A note-taking tool that syncs across devices and exports to Markdown.",
    stack: ["React", "Node.js"],
    image: "/images/project-papertrail.svg",
  },
  {
    title: "FitSplit",
    by: "Fahim Shahriar, Batch 03",
    description: "Workout planner that adapts weekly routines to the equipment you own.",
    stack: ["TypeScript", "Express"],
    image: "/images/project-fitsplit.svg",
  },
  {
    title: "ClassRoute",
    by: "Maliha Tabassum, Batch 05",
    description: "University timetable builder that warns you about clashing lectures.",
    stack: ["Next.js", "Tailwind"],
    image: "/images/project-classroute.svg",
  },
];

// Campus pillars shown under the lab photo
export const campusPillars = [
  {
    title: "Zero to production code",
    description:
      "Follow real industry architecture and build scalable backends with a mentor beside you.",
  },
  {
    title: "Modern lab with fast Wi-Fi",
    description:
      "Dedicated workstations with dual monitors and a quiet room built for long focus sessions.",
  },
  {
    title: "Live one-on-one code review",
    description:
      "After every project a senior engineer reviews your code and explains what to improve.",
  },
  {
    title: "Remote-ready career skills",
    description:
      "A clean GitHub profile, interview practice and the English communication needed for global teams.",
  },
];

export const testimonials = [
  {
    name: "Tamim Iqbal",
    role: "Junior Frontend Developer",
    batch: "Batch 04 graduate",
    quote:
      "The project-based approach changed how I think about code. My portfolio got me shortlisted for my first interview.",
  },
  {
    name: "Fahim Shahriar",
    role: "Full-Stack Engineer, remote",
    batch: "Batch 03 graduate",
    quote:
      "Without mentor support I would have lost days on Server Actions and authentication bugs. I got answers within the hour.",
  },
  {
    name: "Nusrat Jahan",
    role: "React Developer",
    batch: "Batch 05 graduate",
    quote:
      "Working in the offline lab with a team gave me the confidence to join a real software agency from day one.",
  },
];

export const faqs = [
  {
    q: "Do I need coding experience before I join?",
    a: "No. The frontend track starts from zero with HTML, CSS and JavaScript fundamentals. The full-stack and backend tracks expect you to be comfortable with JavaScript.",
  },
  {
    q: "Will you help me find a job after the course?",
    a: "Yes. Our placement team reviews your resume and GitHub profile, runs mock technical interviews and introduces graduates to hiring partners. We support your search, but we cannot guarantee an offer.",
  },
  {
    q: "Can I attend online as well as in the Dhaka lab?",
    a: "Yes. Every class runs live online, and the Banani lab is open to all enrolled students. You can switch between the two whenever you like.",
  },
  {
    q: "What support do I get after the course ends?",
    a: "Support is free for life. You keep access to the student forum, the alumni community and our weekly problem-solving sessions.",
  },
  {
    q: "How do I pay, and is there an installment plan?",
    a: "You can pay by bank transfer, bKash or card. Each course can be split into monthly installments. The admissions team will share the exact plan after you submit the enrollment form.",
  },
];

export const stats = [
  { value: "25,000+", label: "Graduates", detail: "Developers now working in product teams and agencies." },
  { value: "15,000+", label: "Placements", detail: "Learners hired by startups and established companies." },
  { value: "35,000+", label: "Students enrolled", detail: "Learners studying with us online and in the lab." },
];
