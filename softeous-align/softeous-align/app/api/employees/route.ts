import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongoose"
import Employee from "@/models/Employee"

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    const data = await request.json()
    const { firstName, lastName, email, department, position, startDate, salary } = data

    // Check if employee with this email already exists
    const existingEmployee = await Employee.findOne({ email })

    if (existingEmployee) {
      return NextResponse.json({ error: "Employee with this email already exists" }, { status: 400 })
    }

    // Create new employee
    const newEmployee = new Employee({
      firstName,
      lastName,
      email,
      department,
      position,
      startDate,
      salary,
      status: "Active",
    })

    const savedEmployee = await newEmployee.save()

    return NextResponse.json({
      success: true,
      id: savedEmployee._id,
      employee: savedEmployee,
    })
  } catch (error) {
    console.error("Create employee error:", error)
    return NextResponse.json({ error: "Failed to create employee" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    await dbConnect()
    const data = await request.json()
    const { id, ...updateData } = data

    // Update employee
    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      updateData,
      { new: true }, // Return the updated document
    )

    if (!updatedEmployee) {
      return NextResponse.json({ error: "Employee not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, employee: updatedEmployee })
  } catch (error) {
    console.error("Update employee error:", error)
    return NextResponse.json({ error: "Failed to update employee" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (id) {
      // Get specific employee
      const employee = await Employee.findById(id).lean()

      if (!employee) {
        return NextResponse.json({ error: "Employee not found" }, { status: 404 })
      }

      return NextResponse.json({ employee })
    } else {
      // Get all employees
      const employees = await Employee.find().sort({ lastName: 1, firstName: 1 }).lean()

      return NextResponse.json({ employees })
    }
  } catch (error) {
    console.error("Get employees error:", error)
    return NextResponse.json({ error: "Failed to fetch employees" }, { status: 500 })
  }
}

