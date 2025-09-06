import mongoose from "mongoose";

type GlobalWithMongoose = typeof globalThis & {
  _mongoose?: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };
};

const g = global as GlobalWithMongoose;

export async function connectDB(uri: string) {
  if (!uri) throw new Error("MONGODB_URI missing");

  if (!g._mongoose) g._mongoose = { conn: null, promise: null };
  if (g._mongoose.conn) return g._mongoose.conn;

  if (!g._mongoose.promise) {
    g._mongoose.promise = mongoose.connect(uri).then((m) => m);
  }
  g._mongoose.conn = await g._mongoose.promise;
  console.log("✅ MongoDB connected");
  return g._mongoose.conn;
}
