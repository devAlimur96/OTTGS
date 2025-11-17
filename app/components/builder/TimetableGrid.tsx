"use client"

import type React from "react"

import { useState } from "react"
import type { TimeSlot, Course } from "@/app/lib/store"
import { AlertCircle } from "lucide-react"

interface TimetableGridProps {
  slots: TimeSlot[]
  courses: Map<string, Course>
  teachers: Map<string, { id: string; name: string }>
  rooms: Map<string, { id: string; name: string }>
  days: string[]
  hoursPerDay: number
  onSlotMove?: (slotId: string, newDay: string, newHour: number) => void
  conflicts?: Set<string>
}

export function TimetableGrid({
  slots,
  courses,
  teachers,
  rooms,
  days,
  hoursPerDay,
  onSlotMove,
  conflicts = new Set(),
}: TimetableGridProps) {
  const [draggedSlot, setDraggedSlot] = useState<TimeSlot | null>(null)

  // Group slots by day and hour
  const gridMap = new Map<string, TimeSlot>()
  slots.forEach((slot) => {
    const hour = Number.parseInt(slot.startTime.split(":")[0])
    gridMap.set(`${slot.day}-${hour}`, slot)
  })

  const handleDragStart = (slot: TimeSlot) => {
    setDraggedSlot(slot)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (day: string, hour: number) => {
    if (draggedSlot && onSlotMove) {
      onSlotMove(draggedSlot.courseId, day, hour)
      setDraggedSlot(null)
    }
  }

  const hours = Array.from({ length: hoursPerDay }, (_, i) => i)

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">Time</th>
            {days.map((day) => (
              <th
                key={day}
                className="px-4 py-3 text-center text-sm font-semibold text-gray-900 border-b border-gray-200"
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hours.map((hour) => (
            <tr key={hour} className="border-b border-gray-200">
              <td className="px-4 py-3 text-sm font-medium text-gray-900 bg-gray-50">
                {String(hour).padStart(2, "0")}:00
              </td>
              {days.map((day) => {
                const slotKey = `${day}-${hour}`
                const slot = gridMap.get(slotKey)
                const hasConflict = conflicts.has(slotKey)
                const course = slot ? courses.get(slot.courseId) : null
                const teacher = slot ? teachers.get(slot.teacherId) : null
                const room = slot ? rooms.get(slot.roomId) : null

                return (
                  <td
                    key={slotKey}
                    onDragOver={handleDragOver}
                    onDrop={() => handleDrop(day, hour)}
                    className={`px-2 py-2 text-xs border border-gray-100 ${hasConflict ? "bg-red-50" : "bg-white"}`}
                  >
                    {slot && course ? (
                      <div
                        draggable
                        onDragStart={() => handleDragStart(slot)}
                        className={`p-2 rounded cursor-move ${
                          hasConflict ? "bg-red-200 border border-red-300" : "bg-blue-100 border border-blue-300"
                        }`}
                      >
                        <p className="font-semibold text-gray-900">{course.code}</p>
                        <p className="text-gray-700">{course.title}</p>
                        <p className="text-gray-600">{teacher?.name}</p>
                        <p className="text-gray-600">{room?.name}</p>
                        {hasConflict && (
                          <div className="flex items-center gap-1 mt-1 text-red-600">
                            <AlertCircle className="w-3 h-3" />
                            <span>Conflict</span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div
                        className={`p-2 border-2 border-dashed ${hasConflict ? "border-red-300" : "border-gray-300"}`}
                      />
                    )}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
