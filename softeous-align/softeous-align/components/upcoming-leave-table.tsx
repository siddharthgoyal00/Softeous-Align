import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

// Mock data for upcoming leave
const upcomingLeave = [
  {
    id: "1",
    employee: {
      name: "John Doe",
      avatar: "/placeholder.svg?height=32&width=32",
      department: "Engineering",
    },
    type: "Annual Leave",
    startDate: "Jul 15, 2025",
    endDate: "Jul 22, 2025",
    status: "Approved",
    duration: "8 days",
  },
  {
    id: "2",
    employee: {
      name: "Jane Smith",
      avatar: "/placeholder.svg?height=32&width=32",
      department: "Marketing",
    },
    type: "Personal Leave",
    startDate: "Jun 10, 2025",
    endDate: "Jun 12, 2025",
    status: "Pending",
    duration: "3 days",
  },
  {
    id: "3",
    employee: {
      name: "Robert Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      department: "HR",
    },
    type: "Sick Leave",
    startDate: "Jun 5, 2025",
    endDate: "Jun 6, 2025",
    status: "Approved",
    duration: "2 days",
  },
  {
    id: "4",
    employee: {
      name: "Emily Davis",
      avatar: "/placeholder.svg?height=32&width=32",
      department: "Finance",
    },
    type: "Annual Leave",
    startDate: "Jun 20, 2025",
    endDate: "Jul 5, 2025",
    status: "Approved",
    duration: "16 days",
  },
]

export function UpcomingLeaveTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Employee</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Duration</TableHead>
          <TableHead>Dates</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {upcomingLeave.map((leave) => (
          <TableRow key={leave.id}>
            <TableCell>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={leave.employee.avatar} alt={leave.employee.name} />
                  <AvatarFallback>
                    {leave.employee.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div>{leave.employee.name}</div>
                  <div className="text-sm text-muted-foreground">{leave.employee.department}</div>
                </div>
              </div>
            </TableCell>
            <TableCell>{leave.type}</TableCell>
            <TableCell>{leave.duration}</TableCell>
            <TableCell>
              {leave.startDate} - {leave.endDate}
            </TableCell>
            <TableCell>
              <Badge variant={leave.status === "Approved" ? "default" : "outline"}>{leave.status}</Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

