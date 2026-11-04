// Shared TypeScript types used across the application

// A single navigation link in the navbar and footer
export interface NavItem {
  label: string;
  href: string;
}

// The logged-in user shape returned by /api/auth/me
export interface SessionUser {
  id: string;
  name: string;
  email: string;
}

// Standard JSON shape returned by every API route
export interface ApiResponse<T = unknown> {
  ok: boolean;
  message?: string;
  data?: T;
}
