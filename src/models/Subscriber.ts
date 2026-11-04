import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

// A newsletter subscriber collected from the footer form
const subscriberSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
  },
  { timestamps: true },
);

export type SubscriberDoc = InferSchemaType<typeof subscriberSchema>;

const Subscriber: Model<SubscriberDoc> =
  (mongoose.models.Subscriber as Model<SubscriberDoc> | undefined) ??
  mongoose.model<SubscriberDoc>("Subscriber", subscriberSchema);

export default Subscriber;
