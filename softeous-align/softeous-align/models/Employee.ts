import mongoose, { Schema, type Document } from "mongoose"

export interface IEmployee extends Document {
  firstName: string
  lastName: string
  email: string
  department: string
  position: string
  startDate: string
  salary: string
  status: "Active" | "Inactive" | "On Leave"
  createdAt: Date
  updatedAt: Date
}

const EmployeeSchema: Schema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    position: { type: String, required: true },
    startDate: { type: String, required: true },
    salary: { type: String, required: true },
    status: { type: String, enum: ["Active", "Inactive", "On Leave"], default: "Active" },
  },
  { timestamps: true },
)

export default mongoose.models.Employee || mongoose.model<IEmployee>("Employee", EmployeeSchema)

