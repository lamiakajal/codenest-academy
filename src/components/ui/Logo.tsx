import { SITE } from "@/data/site";

interface LogoMarkProps {
  size?: number;
  className?: string;
}

// The CodeNest mark: two code brackets cradling a glowing dot (the "nest")
export function LogoMark({ size = 40, className = "" }: LogoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label={`${SITE.name} logo`}
    >
      <defs>
        <linearGradient id="cn-logo-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#6c4dff" />
          <stop offset="1" stopColor="#0fbf8f" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill="url(#cn-logo-grad)" />
      <path
        d="M26 20 14 32l12 12"
        fill="none"
        stroke="#fff"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m38 20 12 12-12 12"
        fill="none"
        stroke="#fff"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity=".85"
      />
      <circle cx="32" cy="32" r="3.2" fill="#ffd166" />
    </svg>
  );
}

interface LogoProps {
  showTagline?: boolean;
}

// Mark plus wordmark used in the navbar and footer
export default function Logo({ showTagline = true }: LogoProps) {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark size={40} className="shrink-0 transition-transform duration-300 group-hover:rotate-6" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-xl font-extrabold tracking-tight">
          Code<span className="text-brand">Nest</span>
        </span>
        {showTagline && (
          <span className="mt-1 text-[11px] font-medium text-muted">Academy, Dhaka</span>
        )}
      </span>
    </span>
  );
}
