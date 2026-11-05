import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import { getAdminSession } from "@/lib/admin";
import { json, requireDatabase } from "@/lib/api";
import { readJson } from "@/lib/validators";
import Enrollment from "@/models/Enrollment";

const STATUSES = ["pending", "contacted", "confirmed"] as const;

// PATCH /api/admin/enrollments/:id - admins change an enrollment status
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getAdminSession();
  if (!admin) return json({ ok: false, message: "Not allowed." }, 403);
  const missingDb = requireDatabase();
  if (missingDb) return missingDb;

  const { id } = await params;
  const { status } = await readJson(request);

  if (!mongoose.isValidObjectId(id)) {
    return json({ ok: false, message: "Invalid enrollment id." }, 400);
  }
  if (typeof status !== "string" || !STATUSES.includes(status as (typeof STATUSES)[number])) {
    return json({ ok: false, message: "Invalid status." }, 400);
  }

  try {
    await connectDB();
    const result = await Enrollment.updateOne({ _id: id }, { $set: { status } });
    if (result.matchedCount === 0) {
      return json({ ok: false, message: "Enrollment not found." }, 404);
    }
    return json({ ok: true, message: "Status updated." });
  } catch (error) {
    console.error("[admin enrollment]", error);
    return json({ ok: false, message: "Could not update the status." }, 500);
  }
}
