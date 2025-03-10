"use client"

import { useState } from "react"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Card, CardContent } from "@/components/ui/card"

// Mock data for leave events
const leaveEvents = [
  {
    id: "1",
    employee: "John Doe",
    type: "Annual Leave",
    startDate: new Date(2025, 5, 15), // June 15, 2025
    endDate: new Date(2025, 5, 22), // June 22, 2025
    color: "bg-blue-200 text-blue-800",
  },
  {
    id: "2",
    employee: "Jane Smith",
    type: "Personal Leave",
    startDate: new Date(2025, 5, 10), // June 10, 2025
    endDate: new Date(2025, 5, 12), // June 12, 2025
    color: "bg-purple-200 text-purple-800",
  },
  {
    id: "3",
    employee: "Robert Johnson",
    type: "Sick Leave",
    startDate: new Date(2025, 5, 5), // June 5, 2025
    endDate: new Date(2025, 5, 6), // June 6, 2025
    color: "bg-red-200 text-red-800",
  },
  {
    id: "4",
    employee: "Emily Davis",
    type: "Annual Leave",
    startDate: new Date(2025, 5, 20), // June 20, 2025
    endDate: new Date(2025, 6, 5), // July 5, 2025
    color: "bg-blue-200 text-blue-800",
  },
]

export function LeaveCalendar() {
  const [date, setDate] = useState<Date>(new Date())

  // Function to check if a date has leave events
  const hasLeaveEvent = (day: Date) => {
    return leaveEvents.some((event) => day >= event.startDate && day <= event.endDate)
  }

  // Function to get leave events for a specific date
  const getLeaveEventsForDate = (day: Date) => {
    return leaveEvents.filter((event) => day >= event.startDate && day <= event.endDate)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">{format(date, "MMMM yyyy")}</h3>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {format(date, "PPP")}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(newDate) => newDate && setDate(newDate)}
              initialFocus
              modifiers={{
                hasEvent: (day) => hasLeaveEvent(day),
              }}
              modifiersClassNames={{
                hasEvent: "bg-primary/10 font-bold",
              }}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center font-medium text-sm py-2">
            {day}
          </div>
        ))}

        {Array.from({ length: 35 }).map((_, index) => {
          const currentDate = new Date(
            date.getFullYear(),
            date.getMonth(),
            index - new Date(date.getFullYear(), date.getMonth(), 1).getDay() + 1,
          )
          const isCurrentMonth = currentDate.getMonth() === date.getMonth()
          const events = getLeaveEventsForDate(currentDate)

          return (
            <Card key={index} className={cn("min-h-[100px] p-1", !isCurrentMonth && "opacity-50 bg-muted")}>
              <div className="text-right text-sm p-1">{format(currentDate, "d")}</div>
              <CardContent className="p-1">
                <div className="space-y-1">
                  {events.map((event) => (
                    <div key={event.id} className={cn("text-xs p-1 rounded truncate", event.color)}>
                      {event.employee} - {event.type}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

