import mongoose from "mongoose";

// Cache the connection on the global object so hot reloads in development
// (and serverless invocations in production) reuse a single connection.
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

const globalWithMongoose = globalThis as typeof globalThis & {
  mongooseCache?: MongooseCache;
};

const cache: MongooseCache = globalWithMongoose.mongooseCache ?? {
  conn: null,
  promise: null,
};
globalWithMongoose.mongooseCache = cache;

// Returns true when a MongoDB connection string has been configured
export function isDatabaseConfigured(): boolean {
  return Boolean(process.env.MONGODB_URI);
}

// Connects to MongoDB (or returns the already-open connection)
export async function connectDB(): Promise<typeof mongoose> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not set. Add it to your .env.local file.");
  }
  if (cache.conn) return cache.conn;

  if (!cache.promise) {
    cache.promise = mongoose.connect(uri, { bufferCommands: false });
  }

  try {
    cache.conn = await cache.promise;
  } catch (error) {
    // Reset the promise so the next request can retry the connection
    cache.promise = null;
    throw error;
  }
  return cache.conn;
}
