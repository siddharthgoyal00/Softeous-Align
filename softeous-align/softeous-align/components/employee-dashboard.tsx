"use client"

import { useState, useEffect } from "react"
import { Calendar, Clock, FileText, MessageSquare } from "lucide-react"
import { format, parseISO } from "date-fns"
import Link from "next/link"

import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { AttendanceHistoryTable } from "@/components/attendance-history-table"
import { Badge } from "@/components/ui/badge"

interface AttendanceRecord {
  id: string
  userId: string
  userName: string
  date: string
  clockIn: string
  clockOut: string | null
  status: "Active" | "Completed"
}

export function EmployeeDashboard() {
  const { user } = useAuth()
  const [todayAttendance, setTodayAttendance] = useState<AttendanceRecord | null>(null)
  const [clockedIn, setClockedIn] = useState(false) // eslint-disable-line @typescript-eslint/no-unused-vars

  useEffect(() => {
    if (user) {
      // Check if already clocked in today
      const storedClockInData = localStorage.getItem("hr-platform-clock-in")
      if (storedClockInData) {
        const { date, userId } = JSON.parse(storedClockInData)
        const today = format(new Date(), "yyyy-MM-dd")

        if (date === today && userId === user.id) {
          setClockedIn(true)
        }
      }

      // Get today's attendance record
      const storedAttendance = localStorage.getItem("hr-platform-attendance")
      if (storedAttendance) {
        const allRecords = JSON.parse(storedAttendance) as AttendanceRecord[]
        const today = format(new Date(), "yyyy-MM-dd")

        const todayRecord = allRecords.find((record) => record.userId === user.id && record.date === today)

        if (todayRecord) {
          setTodayAttendance(todayRecord)
        }
      }
    }
  }, [user])

  return (
    <div className="space-y-6">
      <DashboardHeader heading={`Welcome, ${user?.name}`} text="Your personal dashboard">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Last login: Today at 8:30 AM</span>
        </div>
      </DashboardHeader>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leave Balance</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18 days</div>
            <p className="text-xs text-muted-foreground">Annual leave remaining</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today&apos;s Attendance</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {todayAttendance ? (
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant={todayAttendance.status === "Completed" ? "default" : "secondary"}>
                    {todayAttendance.status}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Clocked in: {format(parseISO(todayAttendance.clockIn), "h:mm a")}
                  {todayAttendance.clockOut && (
                    <span> - Out: {format(parseISO(todayAttendance.clockOut), "h:mm a")}</span>
                  )}
                </p>
              </div>
            ) : (
              <div>
                <div className="text-2xl font-bold">Not Clocked In</div>
                <p className="text-xs text-muted-foreground">
                  <Link href="/dashboard/attendance">
                    <Button variant="link" className="h-auto p-0 text-xs">
                      Clock in now
                    </Button>
                  </Link>
                </p>
              </div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Reviews</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Scheduled for July 15</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Pending your review</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="attendance" className="space-y-4">
        <TabsList>
          <TabsTrigger value="attendance">My Attendance</TabsTrigger>
          <TabsTrigger value="leave">My Leave</TabsTrigger>
          <TabsTrigger value="tasks">My Tasks</TabsTrigger>
          <TabsTrigger value="documents">My Documents</TabsTrigger>
        </TabsList>
        <TabsContent value="attendance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Attendance</CardTitle>
              <CardDescription>Your attendance history</CardDescription>
            </CardHeader>
            <CardContent>
              <AttendanceHistoryTable userId={user?.id} />
              <div className="mt-4 flex justify-center">
                <Link href="/dashboard/attendance">
                  <Button>Manage Attendance</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="leave" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Leave Requests</CardTitle>
              <CardDescription>Your recent and upcoming leave requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Annual Leave</h4>
                      <p className="text-sm text-muted-foreground">July 15 - July 22, 2025</p>
                    </div>
                    <div className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 px-3 py-1 rounded-full text-xs font-medium">
                      Approved
                    </div>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Sick Leave</h4>
                      <p className="text-sm text-muted-foreground">June 3, 2025</p>
                    </div>
                    <div className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 px-3 py-1 rounded-full text-xs font-medium">
                      Approved
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <Link href="/dashboard/leave/request">
                    <Button>Request Leave</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="tasks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Tasks</CardTitle>
              <CardDescription>Tasks that require your attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Complete Compliance Training</h4>
                      <p className="text-sm text-muted-foreground">Due by June 15, 2025</p>
                    </div>
                    <div className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100 px-3 py-1 rounded-full text-xs font-medium">
                      Pending
                    </div>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Update Emergency Contact</h4>
                      <p className="text-sm text-muted-foreground">Due by June 30, 2025</p>
                    </div>
                    <div className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100 px-3 py-1 rounded-full text-xs font-medium">
                      Pending
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Documents</CardTitle>
              <CardDescription>Documents shared with you</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <h4 className="font-medium">Employee Handbook 2025</h4>
                        <p className="text-sm text-muted-foreground">Shared on June 1, 2025</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <h4 className="font-medium">Benefits Overview</h4>
                        <p className="text-sm text-muted-foreground">Shared on May 15, 2025</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <h4 className="font-medium">Performance Review Template</h4>
                        <p className="text-sm text-muted-foreground">Shared on May 10, 2025</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

