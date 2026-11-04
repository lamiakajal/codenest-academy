import { connectDB } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { json, requireDatabase } from "@/lib/api";
import { courses } from "@/data/site";
import {
  isValidEmail,
  isValidName,
  isValidPhone,
  readJson,
} from "@/lib/validators";
import Enrollment from "@/models/Enrollment";

const MODES = ["online", "offline", "hybrid"] as const;
type Mode = (typeof MODES)[number];

// POST /api/enroll - stores a course enrollment request
export async function POST(request: Request) {
  const missingDb = requireDatabase();
  if (missingDb) return missingDb;

  const { fullName, email, phone, courseSlug, mode, message } =
    await readJson(request);

  if (!isValidName(fullName)) {
    return json({ ok: false, message: "Enter your full name." }, 400);
  }
  if (!isValidEmail(email)) {
    return json({ ok: false, message: "Enter a valid email address." }, 400);
  }
  if (!isValidPhone(phone)) {
    return json({ ok: false, message: "Enter a valid phone number." }, 400);
  }
  if (typeof courseSlug !== "string" || !courses.some((c) => c.slug === courseSlug)) {
    return json({ ok: false, message: "Choose one of the available courses." }, 400);
  }
  if (typeof mode !== "string" || !MODES.includes(mode as Mode)) {
    return json({ ok: false, message: "Choose how you want to attend." }, 400);
  }

  try {
    await connectDB();
    const session = await getSession().catch(() => null);

    await Enrollment.create({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      courseSlug,
      mode,
      message: typeof message === "string" ? message.trim().slice(0, 600) : "",
      userId: session?.id ?? null,
    });

    return json({ ok: true, message: "Request received. Our admissions team will contact you within 24 hours." }, 201);
  } catch (error) {
    console.error("[enroll]", error);
    return json({ ok: false, message: "We could not save your request. Please try again." }, 500);
  }
}
