import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

// A course enrollment request submitted from the enroll page
const enrollmentSchema = new Schema(
  {
    fullName: { type: String, required: true, trim: true, maxlength: 80 },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    courseSlug: { type: String, required: true },
    mode: { type: String, enum: ["online", "offline", "hybrid"], required: true },
    message: { type: String, trim: true, maxlength: 600, default: "" },
    userId: { type: String, default: null },
    status: {
      type: String,
      enum: ["pending", "contacted", "confirmed"],
      default: "pending",
    },
  },
  { timestamps: true },
);

export type EnrollmentDoc = InferSchemaType<typeof enrollmentSchema>;

const Enrollment: Model<EnrollmentDoc> =
  (mongoose.models.Enrollment as Model<EnrollmentDoc> | undefined) ??
  mongoose.model<EnrollmentDoc>("Enrollment", enrollmentSchema);

export default Enrollment;
