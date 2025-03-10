"use client"

import { useState, useEffect } from "react"
import { format, parseISO, differenceInMinutes } from "date-fns"
import { useAuth } from "@/components/auth-provider"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

interface AttendanceRecord {
  id: string
  userId: string
  userName: string
  date: string
  clockIn: string
  clockOut: string | null
  status: "Active" | "Completed"
}

interface AttendanceHistoryTableProps {
  userId?: string
}

export function AttendanceHistoryTable({ userId }: AttendanceHistoryTableProps) {
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([])
  const [filteredRecords, setFilteredRecords] = useState<AttendanceRecord[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const { isAdmin } = useAuth()

  useEffect(() => {
    // Get attendance records from localStorage
    const storedAttendance = localStorage.getItem("hr-platform-attendance")
    if (storedAttendance) {
      const allRecords = JSON.parse(storedAttendance) as AttendanceRecord[]

      // Sort by date (newest first)
      const sortedRecords = allRecords.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

      // Filter records by userId if not admin
      if (!isAdmin && userId) {
        const userRecords = sortedRecords.filter((record) => record.userId === userId)
        setAttendanceRecords(userRecords)
        setFilteredRecords(userRecords)
      } else {
        setAttendanceRecords(sortedRecords)
        setFilteredRecords(sortedRecords)
      }
    }
  }, [userId, isAdmin])

  // Filter records when search term changes
  useEffect(() => {
    if (searchTerm) {
      const filtered = attendanceRecords.filter(
        (record) =>
          record.userName.toLowerCase().includes(searchTerm.toLowerCase()) || record.date.includes(searchTerm),
      )
      setFilteredRecords(filtered)
    } else {
      setFilteredRecords(attendanceRecords)
    }
  }, [searchTerm, attendanceRecords])

  // Calculate duration between clock in and clock out
  const calculateDuration = (clockIn: string, clockOut: string | null) => {
    if (!clockOut) return "In progress"

    const minutes = differenceInMinutes(parseISO(clockOut), parseISO(clockIn))
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60

    return `${hours}h ${remainingMinutes}m`
  }

  return (
    <div className="space-y-4">
      {isAdmin && (
        <div>
          <Input
            placeholder="Search by name or date..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {isAdmin && <TableHead>Employee</TableHead>}
              <TableHead>Date</TableHead>
              <TableHead>Clock In</TableHead>
              <TableHead>Clock Out</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRecords.length > 0 ? (
              filteredRecords.map((record) => (
                <TableRow key={record.id}>
                  {isAdmin && <TableCell>{record.userName}</TableCell>}
                  <TableCell>{format(new Date(record.date), "MMM d, yyyy")}</TableCell>
                  <TableCell>{format(parseISO(record.clockIn), "h:mm a")}</TableCell>
                  <TableCell>
                    {record.clockOut ? format(parseISO(record.clockOut), "h:mm a") : "Not clocked out"}
                  </TableCell>
                  <TableCell>{calculateDuration(record.clockIn, record.clockOut)}</TableCell>
                  <TableCell>
                    <Badge variant={record.status === "Completed" ? "default" : "secondary"}>{record.status}</Badge>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={isAdmin ? 6 : 5} className="h-24 text-center">
                  No attendance records found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

