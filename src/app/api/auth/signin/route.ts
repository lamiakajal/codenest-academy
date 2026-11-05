import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import { createSession } from "@/lib/auth";
import { json, requireDatabase } from "@/lib/api";
import { rateLimit } from "@/lib/rateLimit";
import { isValidEmail, readJson } from "@/lib/validators";
import User from "@/models/User";

// POST /api/auth/signin - verifies credentials and starts a session
export async function POST(request: Request) {
  // Slows down password guessing: 10 attempts per 15 minutes per visitor
  const limited = rateLimit(request, "signin", 10, 15 * 60 * 1000);
  if (limited) return limited;
  const missingDb = requireDatabase();
  if (missingDb) return missingDb;

  const { email, password } = await readJson(request);

  if (!isValidEmail(email) || typeof password !== "string" || !password) {
    return json({ ok: false, message: "Enter your email and password." }, 400);
  }

  try {
    await connectDB();

    const user = await User.findOne({ email: email.trim().toLowerCase() });
    // Use one generic message so attackers cannot tell which part was wrong
    const invalid = json({ ok: false, message: "Incorrect email or password." }, 401);
    if (!user) return invalid;

    const matches = await bcrypt.compare(password, user.passwordHash);
    if (!matches) return invalid;

    await createSession({
      id: String(user._id),
      name: user.name,
      email: user.email,
    });

    return json({ ok: true, message: "Signed in successfully." });
  } catch (error) {
    console.error("[signin]", error);
    return json({ ok: false, message: "Something went wrong while signing you in. Please try again." }, 500);
  }
}
