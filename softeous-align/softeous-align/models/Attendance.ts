import mongoose, { Schema, type Document } from "mongoose"

export interface IAttendance extends Document {
  userId: mongoose.Types.ObjectId | string
  userName: string
  date: string
  clockIn: string
  clockOut?: string | null
  status: "Active" | "Completed"
  createdAt: Date
  updatedAt: Date
}

const AttendanceSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    userName: { type: String, required: true },
    date: { type: String, required: true },
    clockIn: { type: String, required: true },
    clockOut: { type: String, default: null },
    status: { type: String, enum: ["Active", "Completed"], default: "Active" },
  },
  { timestamps: true },
)

// Create a compound index on userId and date to ensure uniqueness
AttendanceSchema.index({ userId: 1, date: 1 }, { unique: true })

export default mongoose.models.Attendance || mongoose.model<IAttendance>("Attendance", AttendanceSchema)

