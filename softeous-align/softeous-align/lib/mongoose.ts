import mongoose, { Mongoose } from "mongoose"

declare global {
  var mongoose: {
    conn: Mongoose | null
    promise: Promise<Mongoose> | null

  } | undefined
}

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your MongoDB connection string to .env.local")
}

const MONGODB_URI = process.env.MONGODB_URI

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose || (global.mongoose = { conn: null, promise: null })


if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    cached.promise = mongoose.connect(MONGODB_URI!, opts)
  
  }
  cached.conn = await cached.promise
  return cached.conn
}

export default dbConnect

