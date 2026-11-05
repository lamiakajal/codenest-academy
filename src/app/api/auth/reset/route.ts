import crypto from "node:crypto";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import { json, requireDatabase } from "@/lib/api";
import { rateLimit } from "@/lib/rateLimit";
import { isStrongPassword, readJson } from "@/lib/validators";
import User from "@/models/User";
import PasswordReset from "@/models/PasswordReset";

// POST /api/auth/reset - sets a new password using a valid reset token
export async function POST(request: Request) {
  const limited = rateLimit(request, "reset", 10, 15 * 60 * 1000);
  if (limited) return limited;
  const missingDb = requireDatabase();
  if (missingDb) return missingDb;

  const { token, password } = await readJson(request);
  if (typeof token !== "string" || token.length < 20) {
    return json({ ok: false, message: "This reset link is invalid." }, 400);
  }
  if (!isStrongPassword(password)) {
    return json({ ok: false, message: "Use a password with 8+ characters, including a letter and a number." }, 400);
  }

  try {
    await connectDB();
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
    const reset = await PasswordReset.findOne({ tokenHash, expiresAt: { $gt: new Date() } });
    if (!reset) {
      return json({ ok: false, message: "This reset link has expired. Request a new one." }, 400);
    }

    const passwordHash = await bcrypt.hash(password, 12);
    await User.updateOne({ _id: reset.userId }, { $set: { passwordHash } });
    // Invalidate every outstanding reset link for this user
    await PasswordReset.deleteMany({ userId: reset.userId });

    return json({ ok: true, message: "Password updated. You can sign in now." });
  } catch (error) {
    console.error("[reset]", error);
    return json({ ok: false, message: "Something went wrong. Please try again." }, 500);
  }
}
