import type { Course, Teacher, Room, StudentGroup, TimeSlot } from "./store"

export interface ScheduleInput {
  courses: Course[]
  teachers: Map<string, Teacher>
  rooms: Map<string, Room>
  studentGroup: StudentGroup
  days: string[]
  hoursPerDay: number
}

interface Slot {
  day: string
  hour: number
  courseId?: string
  teacherId?: string
  roomId?: string
}

export function autoSchedule(input: ScheduleInput): TimeSlot[] | null {
  const { courses, teachers, rooms, days, hoursPerDay } = input

  // Create time grid: days × hours
  const grid: Map<string, Slot> = new Map()

  for (const day of days) {
    for (let hour = 0; hour < hoursPerDay; hour++) {
      grid.set(`${day}-${hour}`, { day, hour })
    }
  }

  // Track teacher and room availability
  const teacherBusy: Map<string, Set<string>> = new Map()
  const roomBusy: Map<string, Set<string>> = new Map()

  for (const teacher of teachers.values()) {
    teacherBusy.set(teacher.id, new Set())
  }
  for (const room of rooms.values()) {
    roomBusy.set(room.id, new Set())
  }

  // Sort courses by hours (descending) for better placement
  const sortedCourses = [...courses].sort((a, b) => b.hours - a.hours)

  const slots: TimeSlot[] = []

  for (const course of sortedCourses) {
    let placed = false
    const teacher = teachers.get(course.teacherId)
    if (!teacher) continue

    // Find first available slot
    for (const day of days) {
      for (let hour = 0; hour <= hoursPerDay - course.hours; hour++) {
        // Check if all hours are free
        const slotsNeeded = Array.from({ length: course.hours }, (_, i) => `${day}-${hour + i}`)
        const allFree = slotsNeeded.every((slotKey) => {
          const slot = grid.get(slotKey)
          return slot && !slot.courseId
        })

        // Check teacher and room availability
        const availableRooms = Array.from(rooms.values()).find(
          (room) => !slotsNeeded.some((s) => roomBusy.get(room.id)?.has(s)),
        )

        const teacherFree = !slotsNeeded.some((s) => teacherBusy.get(course.teacherId)?.has(s))

        if (allFree && availableRooms && teacherFree) {
          // Place the course
          for (let i = 0; i < course.hours; i++) {
            const slotKey = `${day}-${hour + i}`
            const slot = grid.get(slotKey)
            if (slot) {
              slot.courseId = course.id
              slot.teacherId = course.teacherId
              slot.roomId = availableRooms.id
            }
            teacherBusy.get(course.teacherId)?.add(slotKey)
            roomBusy.get(availableRooms.id)?.add(slotKey)
          }

          // Add slot entries for each hour
          for (let i = 0; i < course.hours; i++) {
            slots.push({
              day,
              startTime: `${String(hour + i).padStart(2, "0")}:00`,
              courseId: course.id,
              teacherId: course.teacherId,
              roomId: availableRooms.id,
              groupId: input.studentGroup.id,
            })
          }

          placed = true
          break
        }
      }
      if (placed) break
    }

    if (!placed) {
      console.warn(`Could not schedule course: ${course.title}`)
      return null // Scheduling failed
    }
  }

  return slots
}
