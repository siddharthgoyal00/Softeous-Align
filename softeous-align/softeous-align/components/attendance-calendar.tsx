"use client"

import { useState, useEffect } from "react"
import { CalendarIcon } from "lucide-react"
import { format, parseISO } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Card, CardContent } from "@/components/ui/card"
import { useAuth } from "@/components/auth-provider"

interface AttendanceRecord {
  id: string
  userId: string
  userName: string
  date: string
  clockIn: string
  clockOut: string | null
  status: "Active" | "Completed"
}

interface AttendanceCalendarProps {
  userId?: string
}

export function AttendanceCalendar({ userId }: AttendanceCalendarProps) {
  const [date, setDate] = useState<Date>(new Date())
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([])
  const { isAdmin } = useAuth()

  useEffect(() => {
    // Get attendance records from localStorage
    const storedAttendance = localStorage.getItem("hr-platform-attendance")
    if (storedAttendance) {
      const allRecords = JSON.parse(storedAttendance) as AttendanceRecord[]

      // Filter records by userId if not admin
      if (!isAdmin && userId) {
        setAttendanceRecords(allRecords.filter((record) => record.userId === userId))
      } else {
        setAttendanceRecords(allRecords)
      }
    }
  }, [userId, isAdmin])

  // Function to check if a date has attendance records
  const hasAttendanceRecord = (day: Date) => {
    return attendanceRecords.some((record) => {
      const recordDate = record.date
      return recordDate === format(day, "yyyy-MM-dd")
    })
  }

  // Function to get attendance records for a specific date
  const getAttendanceRecordsForDate = (day: Date) => {
    return attendanceRecords.filter((record) => {
      const recordDate = record.date
      return recordDate === format(day, "yyyy-MM-dd")
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">{format(date, "MMMM yyyy")}</h3>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {format(date, "PPP")}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(newDate) => newDate && setDate(newDate)}
              initialFocus
              modifiers={{
                hasAttendance: (day) => hasAttendanceRecord(day),
              }}
              modifiersClassNames={{
                hasAttendance: "bg-green-100 dark:bg-green-900 font-bold",
              }}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center font-medium text-sm py-2">
            {day}
          </div>
        ))}

        {Array.from({ length: 35 }).map((_, index) => {
          const currentDate = new Date(
            date.getFullYear(),
            date.getMonth(),
            index - new Date(date.getFullYear(), date.getMonth(), 1).getDay() + 1,
          )
          const isCurrentMonth = currentDate.getMonth() === date.getMonth()
          const records = getAttendanceRecordsForDate(currentDate)
          const hasAttendance = records.length > 0

          return (
            <Card
              key={index}
              className={cn(
                "min-h-[100px] p-1",
                !isCurrentMonth && "opacity-50 bg-muted",
                hasAttendance && isCurrentMonth && "border-green-500 dark:border-green-700",
              )}
            >
              <div className="text-right text-sm p-1">{format(currentDate, "d")}</div>
              <CardContent className="p-1">
                <div className="space-y-1">
                  {records.map((record) => (
                    <div
                      key={record.id}
                      className={cn(
                        "text-xs p-1 rounded truncate",
                        record.status === "Completed"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
                      )}
                    >
                      {record.userName} - {format(parseISO(record.clockIn), "h:mm a")}
                      {record.clockOut && ` to ${format(parseISO(record.clockOut), "h:mm a")}`}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

