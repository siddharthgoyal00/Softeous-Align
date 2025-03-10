"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Calendar, Clock, FileText, Home, Plus, Settings, Users } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth-provider"

export function DashboardNav() {
  const pathname = usePathname()
  const { isAdmin } = useAuth()

  return (
    <div className="flex flex-col gap-2 p-4">
      <div className="flex items-center gap-2 px-2 py-4">
        <Users className="h-5 w-5" />
        <span className="font-semibold">HR Platform</span>
      </div>
      <nav className="grid gap-1">
        <Link href="/dashboard" passHref>
          <Button variant="ghost" className={cn("w-full justify-start", pathname === "/dashboard" && "bg-muted")}>
            <Home className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
        </Link>
        <Link href="/dashboard/employees" passHref>
          <Button
            variant="ghost"
            className={cn("w-full justify-start", pathname.startsWith("/dashboard/employees") && "bg-muted")}
          >
            <Users className="mr-2 h-4 w-4" />
            Employees
          </Button>
        </Link>
        {isAdmin && (
          <Link href="/dashboard/employees/new" passHref>
            <Button
              variant="ghost"
              className={cn("w-full justify-start", pathname === "/dashboard/employees/new" && "bg-muted")}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Employee
            </Button>
          </Link>
        )}
        <Link href="/dashboard/attendance" passHref>
          <Button
            variant="ghost"
            className={cn("w-full justify-start", pathname.startsWith("/dashboard/attendance") && "bg-muted")}
          >
            <Clock className="mr-2 h-4 w-4" />
            Attendance
          </Button>
        </Link>
        <Link href="/dashboard/leave" passHref>
          <Button
            variant="ghost"
            className={cn("w-full justify-start", pathname.startsWith("/dashboard/leave") && "bg-muted")}
          >
            <Calendar className="mr-2 h-4 w-4" />
            Leave
          </Button>
        </Link>
        <Link href="/dashboard/performance" passHref>
          <Button
            variant="ghost"
            className={cn("w-full justify-start", pathname.startsWith("/dashboard/performance") && "bg-muted")}
          >
            <BarChart3 className="mr-2 h-4 w-4" />
            Performance
          </Button>
        </Link>
        <Link href="/dashboard/documents" passHref>
          <Button
            variant="ghost"
            className={cn("w-full justify-start", pathname.startsWith("/dashboard/documents") && "bg-muted")}
          >
            <FileText className="mr-2 h-4 w-4" />
            Documents
          </Button>
        </Link>
        <Link href="/dashboard/settings" passHref>
          <Button
            variant="ghost"
            className={cn("w-full justify-start", pathname.startsWith("/dashboard/settings") && "bg-muted")}
          >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </Link>
      </nav>
    </div>
  )
}

