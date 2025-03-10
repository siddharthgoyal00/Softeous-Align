"use client"

import Link from "next/link"
import { PlusCircle } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard-header"
import { LeaveCalendar } from "@/components/leave-calendar"
import { LeaveRequestTable } from "@/components/leave-request-table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function LeavePage() {
  const { isAdmin } = useAuth()

  return (
    <div className="space-y-6">
      <DashboardHeader heading="Leave Management" text="Track and manage employee leave">
        <Link href="/dashboard/leave/request">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Request Leave
          </Button>
        </Link>
      </DashboardHeader>
      <Tabs defaultValue="calendar" className="space-y-4">
        <TabsList>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          {isAdmin && <TabsTrigger value="requests">Leave Requests</TabsTrigger>}
          <TabsTrigger value="summary">Leave Summary</TabsTrigger>
        </TabsList>
        <TabsContent value="calendar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Leave Calendar</CardTitle>
              <CardDescription>View all scheduled leave in calendar format</CardDescription>
            </CardHeader>
            <CardContent>
              <LeaveCalendar />
            </CardContent>
          </Card>
        </TabsContent>
        {isAdmin && (
          <TabsContent value="requests" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pending Leave Requests</CardTitle>
                <CardDescription>Review and approve employee leave requests</CardDescription>
              </CardHeader>
              <CardContent>
                <LeaveRequestTable />
              </CardContent>
            </Card>
          </TabsContent>
        )}
        <TabsContent value="summary" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Annual Leave</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">324 days</div>
                <p className="text-xs text-muted-foreground">Used: 176 days (35%)</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Sick Leave</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">87 days</div>
                <p className="text-xs text-muted-foreground">Used: 42 days (48%)</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Parental Leave</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">120 days</div>
                <p className="text-xs text-muted-foreground">Used: 60 days (50%)</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Other Leave</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45 days</div>
                <p className="text-xs text-muted-foreground">Used: 12 days (27%)</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

