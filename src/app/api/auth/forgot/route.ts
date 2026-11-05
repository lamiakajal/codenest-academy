import crypto from "node:crypto";
import { connectDB } from "@/lib/db";
import { json, requireDatabase } from "@/lib/api";
import { rateLimit } from "@/lib/rateLimit";
import { sendMail, siteUrl } from "@/lib/mail";
import { isValidEmail, readJson } from "@/lib/validators";
import { SITE } from "@/data/site";
import User from "@/models/User";
import PasswordReset from "@/models/PasswordReset";

const GENERIC_MESSAGE = "If an account exists for that email, we have sent a reset link. It is valid for 30 minutes.";

// POST /api/auth/forgot - emails a one-time password reset link
export async function POST(request: Request) {
  const limited = rateLimit(request, "forgot", 5, 15 * 60 * 1000);
  if (limited) return limited;
  const missingDb = requireDatabase();
  if (missingDb) return missingDb;

  const { email } = await readJson(request);
  if (!isValidEmail(email)) {
    return json({ ok: false, message: "Enter a valid email address." }, 400);
  }

  try {
    await connectDB();
    const user = await User.findOne({ email: email.trim().toLowerCase() });

    if (user) {
      // Random token goes in the email; only its hash is saved in the database
      const token = crypto.randomBytes(32).toString("hex");
      const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

      await PasswordReset.deleteMany({ userId: String(user._id) });
      await PasswordReset.create({
        userId: String(user._id),
        tokenHash,
        expiresAt: new Date(Date.now() + 30 * 60 * 1000),
      });

      await sendMail({
        to: user.email,
        subject: `Reset your ${SITE.name} password`,
        text: `Hi ${user.name},\n\nUse this link to choose a new password (valid for 30 minutes):\n${siteUrl()}/reset-password?token=${token}\n\nIf you did not ask for this, you can ignore this email.\n\n${SITE.name}`,
      });
    }

    // Same answer whether or not the account exists, so emails cannot be probed
    return json({ ok: true, message: GENERIC_MESSAGE });
  } catch (error) {
    console.error("[forgot]", error);
    return json({ ok: false, message: "Something went wrong. Please try again." }, 500);
  }
}
