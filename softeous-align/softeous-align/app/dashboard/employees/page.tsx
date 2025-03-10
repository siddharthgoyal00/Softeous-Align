"use client"

import Link from "next/link"
import { PlusCircle } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DashboardHeader } from "@/components/dashboard-header"
import { EmployeeTable } from "@/components/employee-table"

export default function EmployeesPage() {
  const { isAdmin } = useAuth()

  return (
    <div className="space-y-6">
      <DashboardHeader heading="Employees" text="Manage your employee directory">
        {isAdmin && (
          <Link href="/dashboard/employees/new">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Employee
            </Button>
          </Link>
        )}
      </DashboardHeader>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Input placeholder="Search employees..." className="w-[300px]" />
          </div>
          <div className="flex items-center gap-2">
            {isAdmin && (
              <>
                <Button variant="outline" size="sm">
                  Export
                </Button>
                <Button variant="outline" size="sm">
                  Filter
                </Button>
              </>
            )}
          </div>
        </div>
        <EmployeeTable />
      </div>
    </div>
  )
}

