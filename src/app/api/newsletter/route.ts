import { connectDB } from "@/lib/db";
import { json, requireDatabase } from "@/lib/api";
import { rateLimit } from "@/lib/rateLimit";
import { isValidEmail, readJson } from "@/lib/validators";
import Subscriber from "@/models/Subscriber";

// POST /api/newsletter - subscribes an email to the newsletter
export async function POST(request: Request) {
  const limited = rateLimit(request, "newsletter", 6, 60 * 60 * 1000);
  if (limited) return limited;
  const missingDb = requireDatabase();
  if (missingDb) return missingDb;

  const { email } = await readJson(request);
  if (!isValidEmail(email)) {
    return json({ ok: false, message: "Enter a valid email address." }, 400);
  }

  try {
    await connectDB();
    // Upsert keeps repeat sign-ups from creating duplicates or errors
    await Subscriber.updateOne(
      { email: email.trim().toLowerCase() },
      { $setOnInsert: { email: email.trim().toLowerCase() } },
      { upsert: true },
    );
    return json({ ok: true, message: "You are subscribed. Watch your inbox for the next update." });
  } catch (error) {
    console.error("[newsletter]", error);
    return json({ ok: false, message: "Subscription failed. Please try again." }, 500);
  }
}
