import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

// One-time password reset request. Only a hash of the token is stored.
const passwordResetSchema = new Schema({
  userId: { type: String, required: true, index: true },
  tokenHash: { type: String, required: true, unique: true },
  // MongoDB removes the document automatically once this time passes
  expiresAt: { type: Date, required: true, index: { expires: 0 } },
});

export type PasswordResetDoc = InferSchemaType<typeof passwordResetSchema>;

const PasswordReset: Model<PasswordResetDoc> =
  (mongoose.models.PasswordReset as Model<PasswordResetDoc> | undefined) ??
  mongoose.model<PasswordResetDoc>("PasswordReset", passwordResetSchema);

export default PasswordReset;
