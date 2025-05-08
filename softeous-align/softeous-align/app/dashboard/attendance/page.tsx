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

interface AttendanceRecord {
  _id: string
  userId: string
  userName: string
  date: string
  clockIn: string
  clockOut: string | null
  status: "Active" | "Completed"
}

export default function AttendancePage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [clockedIn, setClockedIn] = useState(false)
  const [clockInTime, setClockInTime] = useState<Date | null>(null)
  const [currentAttendance, setCurrentAttendance] = useState<AttendanceRecord | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Check if already clocked in today
  useEffect(() => {
    if (user) {
      const checkAttendance = async () => {
        try {
          const today = format(new Date(), "yyyy-MM-dd")
          const response = await fetch(`/api/attendance?userId=${user._id}&date=${today}`)

          if (response.ok) {
            const data = await response.json()
            if (data.records && data.records.length > 0) {
              const todayRecord = data.records.find((record: AttendanceRecord) => record.date === today)

              if (todayRecord) {
                setCurrentAttendance(todayRecord)
                setClockedIn(true)
                setClockInTime(new Date(todayRecord.clockIn))
              }
            }
          }
        } catch (error) {
          console.error("Error checking attendance:", error)
        }
      }

      checkAttendance()
    }
  }, [user])

  const handleClockIn = async () => {
    if (!user) return

    setIsLoading(true)
    try {
      const now = new Date()
      const attendanceData = {
        userId: user._id,
        userName: user.name,
        date: format(now, "yyyy-MM-dd"),
        clockIn: now.toISOString(),
      }

      const response = await fetch("/api/attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(attendanceData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to clock in")
      }

      const data = await response.json()

      setClockInTime(now)
      setClockedIn(true)
      setCurrentAttendance(data.record)

      toast({
        title: "Clocked in successfully",
        description: `You clocked in at ${format(now, "h:mm a")}`,
      })
    } catch (error) {
      console.error("Clock in error:", error)
      toast({
        title: "Clock in failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleClockOut = async () => {
    if (!user || !currentAttendance?._id) return

    setIsLoading(true)
    try {
      const now = new Date()

      const response = await fetch("/api/attendance", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: currentAttendance._id,
          clockOut: now.toISOString(),
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to clock out")
      }

      setClockedIn(false)
      setClockInTime(null)
      setCurrentAttendance(null)

      toast({
        title: "Clocked out successfully",
        description: `You clocked out at ${format(now, "h:mm a")}`,
      })
    } catch (error) {
      console.error("Clock out error:", error)
      toast({
        title: "Clock out failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
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
                <Button size="lg" onClick={handleClockIn} className="gap-2" disabled={isLoading}>
                  <Clock className="h-5 w-5" />
                  {isLoading ? "Processing..." : "Clock In"}
                </Button>
              ) : (
                <div className="space-y-4">
                  <div className="text-center text-sm text-muted-foreground">
                    Clocked in at {clockInTime && format(clockInTime, "h:mm a")}
                  </div>
                  <Button size="lg" onClick={handleClockOut} className="gap-2" variant="outline" disabled={isLoading}>
                    <ClockCheck className="h-5 w-5" />
                    {isLoading ? "Processing..." : "Clock Out"}
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
              <AttendanceCalendar userId={user?._id} />
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
              <AttendanceHistoryTable userId={user?._id} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

