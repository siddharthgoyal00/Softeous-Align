import clientPromise from "./mongodb"
import { ObjectId } from "mongodb"

// Database and collection names
const DB_NAME = "hr_platform"
const COLLECTIONS = {
  USERS: "users",
  ATTENDANCE: "attendance",
  LEAVE_REQUESTS: "leave_requests",
  EMPLOYEES: "employees",
}

// User types
export interface User {
  _id?: string | ObjectId
  name: string
  email: string
  password: string 
  role: "admin" | "employee"
  department?: string
  position?: string
  createdAt?: Date
  updatedAt?: Date
}

// Attendance record types
export interface AttendanceRecord {
  _id?: string | ObjectId
  userId: string
  userName: string
  date: string
  clockIn: string
  clockOut?: string | null
  status: "Active" | "Completed"
  createdAt?: Date
  updatedAt?: Date
}

// Leave request types
export interface LeaveRequest {
  _id?: string | ObjectId
  userId: string
  userName: string
  leaveType: string
  startDate: string
  endDate: string
  reason: string
  status: "Pending" | "Approved" | "Rejected"
  createdAt?: Date
  updatedAt?: Date
}

// Employee types
export interface Employee {
  _id?: string | ObjectId
  firstName: string
  lastName: string
  email: string
  department: string
  position: string
  startDate: string
  salary: string
  status: "Active" | "Inactive" | "On Leave"
  createdAt?: Date
  updatedAt?: Date
}

// Get database connection
export async function getDb() {
  const client = await clientPromise
  return client.db(DB_NAME)
}

// User operations
export async function findUserByEmail(email: string) {
  const db = await getDb()
  return db.collection(COLLECTIONS.USERS).findOne({ email })
}

// 
export async function createUser(userData: User) {
  const db = await getDb()
  const now = new Date()
  const { _id, ...rest } = userData // omit _id if present
  const result = await db.collection(COLLECTIONS.USERS).insertOne({
    ...rest,
    createdAt: now,
    updatedAt: now,
  })
  return result
}


export async function getAllUsers() {
  const db = await getDb()
  return db.collection(COLLECTIONS.USERS).find({}).toArray()
}

// Attendance operations
export async function createAttendanceRecord(attendanceData: AttendanceRecord) {
  const db = await getDb()
  const now = new Date()
  const result = await db.collection(COLLECTIONS.ATTENDANCE).insertOne({
    // ...attendanceData,
    // createdAt: now,
    // updatedAt: now,
  })
  return result
}

export async function updateAttendanceRecord(id: string, updateData: Partial<AttendanceRecord>) {
  const db = await getDb()
  const result = await db.collection(COLLECTIONS.ATTENDANCE).updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        ...updateData,
        updatedAt: new Date(),
      },
    },
  )
  return result
}

export async function findAttendanceByUserAndDate(userId: string, date: string) {
  const db = await getDb()
  return db.collection(COLLECTIONS.ATTENDANCE).findOne({ userId, date })
}

export async function getAttendanceByUser(userId: string) {
  const db = await getDb()
  return db.collection(COLLECTIONS.ATTENDANCE).find({ userId }).sort({ date: -1 }).toArray()
}

export async function getAllAttendance() {
  const db = await getDb()
  return db.collection(COLLECTIONS.ATTENDANCE).find({}).sort({ date: -1 }).toArray()
}

export async function getAttendanceForDate(date: string) {
  const db = await getDb()
  return db.collection(COLLECTIONS.ATTENDANCE).find({ date }).toArray()
}

// Leave request operations
export async function createLeaveRequest(leaveData: LeaveRequest) {
  const db = await getDb()
  const now = new Date()
  const result = await db.collection(COLLECTIONS.LEAVE_REQUESTS).insertOne({
    // ...leaveData,
    // status: "Pending",
    // createdAt: now,
    // updatedAt: now,
  })
  return result
}

export async function updateLeaveRequest(id: string, updateData: Partial<LeaveRequest>) {
  const db = await getDb()
  const result = await db.collection(COLLECTIONS.LEAVE_REQUESTS).updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        ...updateData,
        updatedAt: new Date(),
      },
    },
  )
  return result
}

export async function getLeaveRequestsByUser(userId: string) {
  const db = await getDb()
  return db.collection(COLLECTIONS.LEAVE_REQUESTS).find({ userId }).sort({ createdAt: -1 }).toArray()
}

export async function getAllLeaveRequests() {
  const db = await getDb()
  return db.collection(COLLECTIONS.LEAVE_REQUESTS).find({}).sort({ createdAt: -1 }).toArray()
}

export async function getPendingLeaveRequests() {
  const db = await getDb()
  return db.collection(COLLECTIONS.LEAVE_REQUESTS).find({ status: "Pending" }).sort({ createdAt: -1 }).toArray()
}

// Employee operations
export async function createEmployee(employeeData: Employee) {
  const db = await getDb()
  const now = new Date()
  
  const result = await db.collection(COLLECTIONS.EMPLOYEES).insertOne({
     ...employeeData,
     status: "Active",
     createdAt: now,
     updatedAt: now,
  })
  return result
}

export async function updateEmployee(id: string, updateData: Partial<Employee>) {
  const db = await getDb()
  const result = await db.collection(COLLECTIONS.EMPLOYEES).updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        ...updateData,
        updatedAt: new Date(),
      },
    },
  )
  return result
}

export async function getAllEmployees() {
  const db = await getDb()
  return db.collection(COLLECTIONS.EMPLOYEES).find({}).sort({ lastName: 1, firstName: 1 }).toArray()
}

export async function getEmployeeById(id: string) {
  const db = await getDb()
  return db.collection(COLLECTIONS.EMPLOYEES).findOne({ _id: new ObjectId(id) })
}

