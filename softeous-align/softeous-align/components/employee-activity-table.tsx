import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock data for recent activity
const recentActivity = [
  {
    id: "1",
    employee: {
      name: "John Doe",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    action: "Submitted leave request",
    date: "Today at 9:15 AM",
    details: "Annual leave from Jul 15 to Jul 22, 2025",
  },
  {
    id: "2",
    employee: {
      name: "Jane Smith",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    action: "Updated profile",
    date: "Today at 8:30 AM",
    details: "Changed contact information",
  },
  {
    id: "3",
    employee: {
      name: "Robert Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    action: "Returned from leave",
    date: "Yesterday at 9:00 AM",
    details: "Sick leave from Jun 1 to Jun 3, 2025",
  },
  {
    id: "4",
    employee: {
      name: "Emily Davis",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    action: "Completed training",
    date: "Yesterday at 2:45 PM",
    details: "Compliance training module",
  },
  {
    id: "5",
    employee: {
      name: "Michael Wilson",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    action: "Submitted expense report",
    date: "Jun 2, 2025",
    details: "Travel expenses for client meeting",
  },
]

export function EmployeeActivityTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Employee</TableHead>
          <TableHead>Action</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Details</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recentActivity.map((activity) => (
          <TableRow key={activity.id}>
            <TableCell>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={activity.employee.avatar} alt={activity.employee.name} />
                  <AvatarFallback>
                    {activity.employee.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <span>{activity.employee.name}</span>
              </div>
            </TableCell>
            <TableCell>{activity.action}</TableCell>
            <TableCell>{activity.date}</TableCell>
            <TableCell>{activity.details}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

