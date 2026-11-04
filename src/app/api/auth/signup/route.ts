import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import { createSession } from "@/lib/auth";
import { json, requireDatabase } from "@/lib/api";
import {
  isStrongPassword,
  isValidEmail,
  isValidName,
  readJson,
} from "@/lib/validators";
import User from "@/models/User";

// POST /api/auth/signup - creates a new student account and signs them in
export async function POST(request: Request) {
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

    return json({ ok: true, message: "Account created. Welcome aboard!" }, 201);
  } catch (error) {
    console.error("[signup]", error);
    return json({ ok: false, message: "Something went wrong while creating your account. Please try again." }, 500);
  }
}
