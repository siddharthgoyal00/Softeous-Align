import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongoose"
import User from "@/models/User"

// This endpoint is used to seed initial users for testing
export async function POST(request: NextRequest) {
  try {
    await dbConnect()

    // Default users for testing
    const defaultUsers = [
      {
        name: "Admin User",
        email: "admin@example.com",
        password: "admin123", // In a real app, passwords would be hashed
        role: "admin",
      },
      {
        name: "John Doe",
        email: "john@example.com",
        password: "employee123",
        role: "employee",
        department: "Engineering",
        position: "Senior Developer",
      },
    ]

    // Create users if they don't exist
    const results = await Promise.all(
      defaultUsers.map(async (userData) => {
        const existingUser = await User.findOne({ email: userData.email })
        if (!existingUser) {
          const newUser = new User(userData)
          await newUser.save()
          return { email: userData.email, status: "created" }
        }
        return { email: userData.email, status: "exists" }
      }),
    )

    return NextResponse.json({ success: true, results })
  } catch (error) {
    console.error("Seed users error:", error)
    return NextResponse.json({ error: "Failed to seed users" }, { status: 500 })
  }
}

