import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingBubbles from "@/components/ui/FloatingBubbles";
import Splash from "@/components/ui/Splash";
import ScrollProgress from "@/components/ui/ScrollProgress";
import BackToTop from "@/components/ui/BackToTop";
import { SITE } from "@/data/site";

// Display font for headings and body font for paragraphs
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
const body = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} | Learn Full-Stack Web Development in Dhaka`,
    template: `%s | ${SITE.name}`,
  },
  description:
    "Project-based courses in React, Next.js, TypeScript and Node.js with live mentors, a modern Dhaka lab and lifetime support.",
};

export const viewport: Viewport = {
  themeColor: "#f5f6fb",
};

// Runs before the first paint. The site always opens in light mode unless the
// visitor has previously chosen dark mode with the toggle button.
const themeScript = `(function(){try{var t=localStorage.getItem("codenest-theme");document.documentElement.dataset.theme=t==="dark"?"dark":"light"}catch(e){document.documentElement.dataset.theme="light"}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-theme="light"
      className={`${display.variable} ${body.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="relative flex min-h-screen flex-col bg-bg text-fg antialiased">
        {/* Launch screen with logo and round loader */}
        <Splash />
        <ScrollProgress />

        {/* Ambient animated background */}
        <FloatingBubbles />

        <Navbar />
        <main className="relative z-10 grow">{children}</main>
        <Footer />

        <BackToTop />
      </body>
    </html>
  );
}
