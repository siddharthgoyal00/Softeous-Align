"use client"

import { useEffect, useState } from "react"
import { ArrowUpRight, Clock, DollarSign, Users } from "lucide-react"
import { format } from "date-fns"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EmployeeActivityTable } from "@/components/employee-activity-table"
import { UpcomingLeaveTable } from "@/components/upcoming-leave-table"
import { DashboardHeader } from "@/components/dashboard-header"
import { useAuth } from "@/components/auth-provider"
import { EmployeeDashboard } from "@/components/employee-dashboard"
import { AttendanceHistoryTable } from "@/components/attendance-history-table"

interface AttendanceRecord {
  id: string
  userId: string
  userName: string
  date: string
  clockIn: string
  clockOut: string | null
  status: "Active" | "Completed"
}

export default function DashboardPage() {
  const { isAdmin } = useAuth()
  const [todayAttendance, setTodayAttendance] = useState<number>(0)
  // Remove totalAttendance state if not used

  useEffect(() => {
    if (isAdmin) {
      // Get attendance records from localStorage
      const storedAttendance = localStorage.getItem("hr-platform-attendance")
      if (storedAttendance) {
        const allRecords = JSON.parse(storedAttendance) as AttendanceRecord[]

        // Count today's attendance
        const today = format(new Date(), "yyyy-MM-dd")
        const todayRecords = allRecords.filter((record) => record.date === today)
        setTodayAttendance(todayRecords.length)

        // Count total attendance records
        // setTotalAttendance(allRecords.length)
      }
    }
  }, [isAdmin])

  if (!isAdmin) {
    return <EmployeeDashboard />
  }

  return (
    <div className="space-y-6">
      <DashboardHeader heading="Admin Dashboard" text="Overview of your HR operations">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Last updated: Today at 9:45 AM</span>
        </div>
      </DashboardHeader>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-muted-foreground">+4 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today&apos;s Attendance</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayAttendance}</div>
            <p className="text-xs text-muted-foreground">{Math.round((todayAttendance / 142) * 100)}% of workforce</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Positions</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Salary</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$72,000</div>
            <p className="text-xs text-muted-foreground">+2.5% from last year</p>
          </CardContent>
        </Card>
      </div>
      <Tabs defaultValue="activity" className="space-y-4">
        <TabsList>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          <TabsTrigger value="leave">Upcoming Leave</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="performance">Performance Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Employee Activity</CardTitle>
              <CardDescription>Overview of recent employee actions and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <EmployeeActivityTable />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="leave" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Leave</CardTitle>
              <CardDescription>Employees scheduled to be on leave in the next 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <UpcomingLeaveTable />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="attendance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Overview</CardTitle>
              <CardDescription>Recent attendance records across the organization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <AttendanceHistoryTable />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Performance Reviews</CardTitle>
              <CardDescription>Performance reviews scheduled for the next 60 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10 text-muted-foreground">No upcoming performance reviews scheduled</div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

