"use client"

import { useState } from "react"
import { Check, X } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

// Mock data for leave requests
const initialLeaveRequests = [
  {
    id: "1",
    employee: {
      name: "Jane Smith",
      avatar: "/placeholder.svg?height=32&width=32",
      department: "Marketing",
    },
    type: "Personal Leave",
    startDate: "Jun 10, 2025",
    endDate: "Jun 12, 2025",
    status: "Pending",
    requestDate: "Jun 1, 2025",
    reason: "Family event",
  },
  {
    id: "2",
    employee: {
      name: "Michael Wilson",
      avatar: "/placeholder.svg?height=32&width=32",
      department: "Engineering",
    },
    type: "Annual Leave",
    startDate: "Jul 1, 2025",
    endDate: "Jul 15, 2025",
    status: "Pending",
    requestDate: "Jun 2, 2025",
    reason: "Summer vacation",
  },
  {
    id: "3",
    employee: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      department: "Sales",
    },
    type: "Sick Leave",
    startDate: "Jun 7, 2025",
    endDate: "Jun 8, 2025",
    status: "Pending",
    requestDate: "Jun 3, 2025",
    reason: "Doctor's appointment",
  },
]

export function LeaveRequestTable() {
  const [leaveRequests, setLeaveRequests] = useState(initialLeaveRequests)
  const { toast } = useToast()

  const handleApprove = (id: string) => {
    setLeaveRequests((prev) =>
      prev.map((request) => (request.id === id ? { ...request, status: "Approved" } : request)),
    )

    toast({
      title: "Leave request approved",
      description: "The leave request has been approved successfully.",
    })
  }

  const handleReject = (id: string) => {
    setLeaveRequests((prev) =>
      prev.map((request) => (request.id === id ? { ...request, status: "Rejected" } : request)),
    )

    toast({
      title: "Leave request rejected",
      description: "The leave request has been rejected.",
    })
   }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Employee</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Dates</TableHead>
          <TableHead>Reason</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leaveRequests.map((request) => (
          <TableRow key={request.id}>
            <TableCell>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={request.employee.avatar} alt={request.employee.name} />
                  <AvatarFallback>
                    {request.employee.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div>{request.employee.name}</div>
                  <div className="text-sm text-muted-foreground">{request.employee.department}</div>
                </div>
              </div>
            </TableCell>
            <TableCell>{request.type}</TableCell>
            <TableCell>
              {request.startDate} - {request.endDate}
            </TableCell>
            <TableCell>{request.reason}</TableCell>
            <TableCell>
              <Badge
                variant={
                  request.status === "Approved" ? "default" : request.status === "Rejected" ? "destructive" : "outline"
                }
              >
                {request.status}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              {request.status === "Pending" && (
                <div className="flex justify-end gap-2">
                  <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => handleApprove(request.id)}>
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="sr-only">Approve</span>
                  </Button>
                  <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => handleReject(request.id)}>
                    <X className="h-4 w-4 text-red-500" />
                    <span className="sr-only">Reject</span>
                  </Button>
                </div>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

