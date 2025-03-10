"use client"

import { useState, useEffect } from "react"
import { Clock, ClockIcon as ClockCheck } from "lucide-react"
import { format } from "date-fns"

import { useAuth } from "@/components/auth-provider"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { AttendanceCalendar } from "@/components/attendance-calendar"
import { AttendanceHistoryTable } from "@/components/attendance-history-table"

export default function AttendancePage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [clockedIn, setClockedIn] = useState(false)
  const [clockInTime, setClockInTime] = useState<Date | null>(null)

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Check if already clocked in today from localStorage
  useEffect(() => {
    const storedClockInData = localStorage.getItem("hr-platform-clock-in")
    if (storedClockInData) {
      const { date, time } = JSON.parse(storedClockInData)
      const today = format(new Date(), "yyyy-MM-dd")

      if (date === today) {
        setClockedIn(true)
        setClockInTime(new Date(time))
      }
    }
  }, [])

  const handleClockIn = () => {
    const now = new Date()
    setClockInTime(now)
    setClockedIn(true)

    // Save to localStorage
    const clockInData = {
      date: format(now, "yyyy-MM-dd"),
      time: now.toISOString(),
      userId: user?.id,
      userName: user?.name,
    }

    // Get existing attendance records
    const existingAttendance = JSON.parse(localStorage.getItem("hr-platform-attendance") || "[]")

    // Add new record
    const newAttendance = [
      ...existingAttendance,
      {
        id: Date.now().toString(),
        userId: user?.id,
        userName: user?.name,
        date: format(now, "yyyy-MM-dd"),
        clockIn: now.toISOString(),
        clockOut: null,
        status: "Active",
      },
    ]

    // Save updated records
    localStorage.setItem("hr-platform-attendance", JSON.stringify(newAttendance))
    localStorage.setItem("hr-platform-clock-in", JSON.stringify(clockInData))

    toast({
      title: "Clocked in successfully",
      description: `You clocked in at ${format(now, "h:mm a")}`,
    })
  }

  const handleClockOut = () => {
    const now = new Date()

    // Get existing attendance records
    const existingAttendance = JSON.parse(localStorage.getItem("hr-platform-attendance") || "[]")

    // Find today's record for this user
    interface AttendanceRecord {
      userId: string
      date: string
      clockOut: string | null
      [key: string]: any
    }

    const updatedAttendance = existingAttendance.map((record: AttendanceRecord) => {
      if (record.userId === user?.id && record.date === format(new Date(), "yyyy-MM-dd") && !record.clockOut) {
        return {
          ...record,
          clockOut: now.toISOString(),
          status: "Completed",
        }
      }
      return record
    })

    // Save updated records
    localStorage.setItem("hr-platform-attendance", JSON.stringify(updatedAttendance))
    localStorage.removeItem("hr-platform-clock-in")

    setClockedIn(false)
    setClockInTime(null)

    toast({
      title: "Clocked out successfully",
      description: `You clocked out at ${format(now, "h:mm a")}`,
    })
  }

  return (
    <div className="space-y-6">
      <DashboardHeader heading="Attendance Management" text="Track your work hours and attendance" />

      <Card>
        <CardHeader>
          <CardTitle>Clock In/Out</CardTitle>
          <CardDescription>Record your daily attendance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center space-y-6 py-4">
            <div className="text-4xl font-bold">{format(currentTime, "h:mm:ss a")}</div>
            <div className="text-xl">{format(currentTime, "EEEE, MMMM d, yyyy")}</div>

            <div className="flex gap-4 mt-6">
              {!clockedIn ? (
                <Button size="lg" onClick={handleClockIn} className="gap-2">
                  <Clock className="h-5 w-5" />
                  Clock In
                </Button>
              ) : (
                <div className="space-y-4">
                  <div className="text-center text-sm text-muted-foreground">
                    Clocked in at {clockInTime && format(clockInTime, "h:mm a")}
                  </div>
                  <Button size="lg" onClick={handleClockOut} className="gap-2" variant="outline">
                    <ClockCheck className="h-5 w-5" />
                    Clock Out
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="calendar" className="space-y-4">
        <TabsList>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          <TabsTrigger value="history">Attendance History</TabsTrigger>
        </TabsList>
        <TabsContent value="calendar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Calendar</CardTitle>
              <CardDescription>View your attendance records in calendar format</CardDescription>
            </CardHeader>
            <CardContent>
              <AttendanceCalendar userId={user?.id} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Attendance History</CardTitle>
              <CardDescription>Detailed view of your attendance records</CardDescription>
            </CardHeader>
            <CardContent>
              <AttendanceHistoryTable userId={user?.id} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

