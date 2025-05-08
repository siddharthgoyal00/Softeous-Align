import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongoose"
import Attendance from "@/models/Attendance"

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    const data = await request.json()
    const { userId, userName, date, clockIn } = data

    // Check if attendance record already exists for this user and date
    const existingRecord = await Attendance.findOne({ userId, date })

    if (existingRecord) {
      return NextResponse.json({ error: "Attendance record already exists for today" }, { status: 400 })
    }

    // Create new attendance record
    const newAttendance = new Attendance({
      userId,
      userName,
      date,
      clockIn,
      clockOut: null,
      status: "Active",
    })

    const savedAttendance = await newAttendance.save()

    return NextResponse.json({
      success: true,
      id: savedAttendance._id,
      record: savedAttendance,
    })
  } catch (error) {
    console.error("Clock in error:", error)
    return NextResponse.json({ error: "Failed to clock in" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    await dbConnect()
    const data = await request.json()
    const { id, clockOut } = data

    // Update attendance record with clock out time
    const updatedAttendance = await Attendance.findByIdAndUpdate(
      id,
      {
        clockOut,
        status: "Completed",
      },
      { new: true }, // Return the updated document
    )

    if (!updatedAttendance) {
      return NextResponse.json({ error: "Attendance record not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, record: updatedAttendance })
  } catch (error) {
    console.error("Clock out error:", error)
    return NextResponse.json({ error: "Failed to clock out" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const date = searchParams.get("date")

    let query = {}

    if (userId) {
      query = { ...query, userId }
    }

    if (date) {
      query = { ...query, date }
    }

    // Get attendance records based on query
    const attendanceRecords = await Attendance.find(query).sort({ date: -1, clockIn: -1 }).lean()

    return NextResponse.json({ records: attendanceRecords })
  } catch (error) {
    console.error("Get attendance error:", error)
    return NextResponse.json({ error: "Failed to fetch attendance records" }, { status: 500 })
  }
}

