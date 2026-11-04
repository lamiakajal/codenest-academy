// Small, dependency-free validation helpers shared by the API routes

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^\+?[0-9\s-]{7,16}$/;

export function isValidEmail(value: unknown): value is string {
  return typeof value === "string" && EMAIL_PATTERN.test(value.trim());
}

export function isValidPhone(value: unknown): value is string {
  return typeof value === "string" && PHONE_PATTERN.test(value.trim());
}

export function isValidName(value: unknown): value is string {
  return (
    typeof value === "string" &&
    value.trim().length >= 2 &&
    value.trim().length <= 80
  );
}

// Passwords need at least 8 characters including a letter and a number
export function isStrongPassword(value: unknown): value is string {
  return (
    typeof value === "string" &&
    value.length >= 8 &&
    value.length <= 72 &&
    /[A-Za-z]/.test(value) &&
    /[0-9]/.test(value)
  );
}

// Safely parses a request body as a plain object
export async function readJson(
  request: Request,
): Promise<Record<string, unknown>> {
  try {
    const body: unknown = await request.json();
    return body && typeof body === "object"
      ? (body as Record<string, unknown>)
      : {};
  } catch {
    return {};
  }
}
