"use client"

import { useState } from "react"
import Link from "next/link"
import { MoreHorizontal } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"

// Mock data for employees
const employees = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    department: "Engineering",
    position: "Senior Developer",
    status: "Active",
    joinDate: "Jan 15, 2022",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Aman Jain",
    email: "aman.jain@example.com",
    department: "Marketing",
    position: "Marketing Manager",
    status: "Active",
    joinDate: "Mar 10, 2021",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "Aditya Sharma",
    email: "aditya.sharma@example.com",
    department: "HR",
    position: "HR Specialist",
    status: "On Leave",
    joinDate: "Jun 5, 2023",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    name: "Manav Singh",
    email: "manav.singh@example.com",
    department: "Finance",
    position: "Financial Analyst",
    status: "Active",
    joinDate: "Nov 20, 2022",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "5",
    name: "Prince jain",
    email: "prince.jain@example.com",
    department: "Engineering",
    position: "Frontend Developer",
    status: "Active",
    joinDate: "Apr 12, 2023",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export function EmployeeTable() {
  const [sortColumn, setSortColumn] = useState("name")
  const [sortDirection, setSortDirection] = useState("asc")
  const [employeeList, setEmployeeList] = useState(employees)
  const { isAdmin } = useAuth()
  const { toast } = useToast()

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const handleDeactivate = (id: string) => {
    // Update employee status
    setEmployeeList((prev) =>
      prev.map((emp) => (emp.id === id ? { ...emp, status: emp.status === "Active" ? "Inactive" : "Active" } : emp)),
    )

    toast({
      title: "Employee status updated",
      description: "The employee status has been updated successfully.",
    })
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px] cursor-pointer" onClick={() => handleSort("name")}>
              Employee
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("department")}>
              Department
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("position")}>
              Position
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("status")}>
              Status
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("joinDate")}>
              Join Date
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employeeList.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={employee.avatar} alt={employee.name} />
                    <AvatarFallback>
                      {employee.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{employee.name}</div>
                    <div className="text-sm text-muted-foreground">{employee.email}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>{employee.department}</TableCell>
              <TableCell>{employee.position}</TableCell>
              <TableCell>
                <Badge variant={employee.status === "Active" ? "default" : "secondary"}>{employee.status}</Badge>
              </TableCell>
              <TableCell>{employee.joinDate}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <Link href={`/dashboard/employees/${employee.id}`} className="w-full">
                        View Profile
                      </Link>
                    </DropdownMenuItem>
                    {isAdmin && <DropdownMenuItem>Edit Employee</DropdownMenuItem>}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>View Leave History</DropdownMenuItem>
                    <DropdownMenuItem>Performance Reviews</DropdownMenuItem>
                    {isAdmin && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className={employee.status === "Active" ? "text-destructive" : "text-green-600"}
                          onClick={() => handleDeactivate(employee.id)}
                        >
                          {employee.status === "Active" ? "Deactivate" : "Activate"}
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

