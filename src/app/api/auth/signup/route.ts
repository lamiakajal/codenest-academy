import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import { createSession } from "@/lib/auth";
import { json, requireDatabase } from "@/lib/api";
import { rateLimit } from "@/lib/rateLimit";
import { sendMail } from "@/lib/mail";
import { SITE } from "@/data/site";
import {
  isStrongPassword,
  isValidEmail,
  isValidName,
  readJson,
} from "@/lib/validators";
import User from "@/models/User";

// POST /api/auth/signup - creates a new student account and signs them in
export async function POST(request: Request) {
  const limited = rateLimit(request, "signup", 8, 60 * 60 * 1000);
  if (limited) return limited;
  const missingDb = requireDatabase();
  if (missingDb) return missingDb;

  const body = await readJson(request);
  const { name, email, password } = body;

  if (!isValidName(name)) {
    return json({ ok: false, message: "Enter your full name (2-80 characters)." }, 400);
  }
  if (!isValidEmail(email)) {
    return json({ ok: false, message: "Enter a valid email address." }, 400);
  }
  if (!isStrongPassword(password)) {
    return json(
      { ok: false, message: "Use a password with 8+ characters, including a letter and a number." },
      400,
    );
  }

  try {
    await connectDB();

    const normalizedEmail = email.trim().toLowerCase();
    const existing = await User.findOne({ email: normalizedEmail }).lean();
    if (existing) {
      return json({ ok: false, message: "An account with this email already exists. Try signing in." }, 409);
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      passwordHash,
    });

    await createSession({
      id: String(user._id),
      name: user.name,
      email: user.email,
    });

    // Welcome email (printed in the terminal until SMTP is configured)
    await sendMail({
      to: user.email,
      subject: `Welcome to ${SITE.name}`,
      text: `Hi ${user.name},\n\nYour ${SITE.name} account is ready. You can now enroll in a course from our website.\n\nSee you in class,\n${SITE.name}`,
    });

    return json({ ok: true, message: "Account created. Welcome aboard!" }, 201);
  } catch (error) {
    console.error("[signup]", error);
    return json({ ok: false, message: "Something went wrong while creating your account. Please try again." }, 500);
  }
}
