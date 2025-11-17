import type { Course, Timetable } from "./store"

export function generateCSV(
  timetable: Timetable,
  courses: Map<string, Course>,
  teachers: Map<string, { id: string; name: string }>,
  rooms: Map<string, { id: string; name: string }>,
): string {
  const headers = ["Day", "Time", "Course Code", "Course Title", "Teacher", "Room", "Hours"]

  // Group slots by day and time
  const sortedSlots = [...timetable.slots].sort((a, b) => {
    const dayOrder = timetable.days.indexOf(a.day) - timetable.days.indexOf(b.day)
    if (dayOrder !== 0) return dayOrder
    return a.startTime.localeCompare(b.startTime)
  })

  const rows = sortedSlots.map((slot) => {
    const course = courses.get(slot.courseId)
    const teacher = teachers.get(slot.teacherId)
    const room = rooms.get(slot.roomId)

    return [
      slot.day,
      slot.startTime,
      course?.code || "",
      course?.title || "",
      teacher?.name || "",
      room?.name || "",
      course?.hours || "",
    ]
  })

  // Create CSV content
  const csvContent = [headers.join(","), ...rows.map((row) => row.map((cell) => `"${cell}"`).join(","))].join("\n")

  return csvContent
}

export function downloadCSV(content: string, filename: string) {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" })
  const link = document.createElement("a")
  const url = URL.createObjectURL(blob)

  link.setAttribute("href", url)
  link.setAttribute("download", filename)
  link.style.visibility = "hidden"

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
