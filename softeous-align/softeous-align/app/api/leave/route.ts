import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongoose"
import LeaveRequest from "@/models/LeaveRequest"

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    const data = await request.json()
    const { userId, userName, leaveType, startDate, endDate, reason } = data

    // Create new leave request
    const newLeaveRequest = new LeaveRequest({
      userId,
      userName,
      leaveType,
      startDate,
      endDate,
      reason,
      status: "Pending",
    })

    const savedLeaveRequest = await newLeaveRequest.save()

    return NextResponse.json({
      success: true,
      id: savedLeaveRequest._id,
      request: savedLeaveRequest,
    })
  } catch (error) {
    console.error("Leave request error:", error)
    return NextResponse.json({ error: "Failed to submit leave request" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    await dbConnect()
    const data = await request.json()
    const { id, status } = data

    // Update leave request status
    const updatedLeaveRequest = await LeaveRequest.findByIdAndUpdate(
      id,
      { status },
      { new: true }, // Return the updated document
    )

    if (!updatedLeaveRequest) {
      return NextResponse.json({ error: "Leave request not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, request: updatedLeaveRequest })
  } catch (error) {
    console.error("Update leave request error:", error)
    return NextResponse.json({ error: "Failed to update leave request" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const status = searchParams.get("status")

    let query = {}

    if (userId) {
      query = { ...query, userId }
    }

    if (status) {
      query = { ...query, status }
    }

    // Get leave requests based on query
    const leaveRequests = await LeaveRequest.find(query).sort({ createdAt: -1 }).lean()

    return NextResponse.json({ requests: leaveRequests })
  } catch (error) {
    console.error("Get leave requests error:", error)
    return NextResponse.json({ error: "Failed to fetch leave requests" }, { status: 500 })
  }
}

