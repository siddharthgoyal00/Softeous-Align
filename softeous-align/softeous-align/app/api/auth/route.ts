import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongoose"
import User, {IUser} from "@/models/User"

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    const { email, password } = await request.json()

    // Find user by email
    // const user = await User.findOne({ email }).lean()
    const user = await User.findOne({ email }).lean() as IUser | null


    // If user not found or password doesn't match
    if (!user || user.password !== password) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Don't send password back to client
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({ user: userWithoutPassword })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}

// This endpoint is used to seed initial users for testing
export async function PUT(request: NextRequest) {
  try {
    await dbConnect()
    const { users } = await request.json()

    if (!users || !Array.isArray(users)) {
      return NextResponse.json({ error: "Invalid data format" }, { status: 400 })
    }

    // Create users if they don't exist
    const results = await Promise.all(
      users.map(async (userData) => {
        const existingUser = await User.findOne({ email: userData.email })
        if (!existingUser) {
          const newUser = new User(userData)
          await newUser.save()
          return { email: userData.email, status: "created" }
        }
        return { email: userData.email, status: "exists" }
      }),
    )

    return NextResponse.json({ results })
  } catch (error) {
    console.error("Seed users error:", error)
    return NextResponse.json({ error: "Failed to seed users" }, { status: 500 })
  }
}

