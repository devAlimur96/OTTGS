import { create } from "zustand"
import mockData from "@/app/data/mockData.json"

export interface Teacher {
  id: string
  name: string
}

export interface Room {
  id: string
  name: string
  capacity: number
}

export interface Course {
  id: string
  code: string
  title: string
  hours: number
  teacherId: string
}

export interface StudentGroup {
  id: string
  name: string
  size: number
}

export interface TimeSlot {
  day: string
  startTime: string
  courseId: string
  teacherId: string
  roomId: string
  groupId: string
}

export interface Timetable {
  id: string
  name: string
  groupId: string
  courseIds: string[]
  term: string
  days: string[]
  hoursPerDay: number
  slots: TimeSlot[]
  published: boolean
  createdAt: string
}

interface AppState {
  teachers: Teacher[]
  rooms: Room[]
  courses: Course[]
  studentGroups: StudentGroup[]
  timetables: Timetable[]

  // Teacher actions
  addTeacher: (teacher: Omit<Teacher, "id">) => void
  updateTeacher: (id: string, teacher: Partial<Teacher>) => void
  deleteTeacher: (id: string) => void

  // Room actions
  addRoom: (room: Omit<Room, "id">) => void
  updateRoom: (id: string, room: Partial<Room>) => void
  deleteRoom: (id: string) => void

  // Course actions
  addCourse: (course: Omit<Course, "id">) => void
  updateCourse: (id: string, course: Partial<Course>) => void
  deleteCourse: (id: string) => void

  // StudentGroup actions
  addStudentGroup: (group: Omit<StudentGroup, "id">) => void
  updateStudentGroup: (id: string, group: Partial<StudentGroup>) => void
  deleteStudentGroup: (id: string) => void

  // Timetable actions
  addTimetable: (timetable: Omit<Timetable, "id">) => void
  updateTimetable: (id: string, timetable: Partial<Timetable>) => void
  deleteTimetable: (id: string) => void
}

const generateId = () => Math.random().toString(36).substr(2, 9)

export const useStore = create<AppState>((set) => ({
  teachers: mockData.teachers,
  rooms: mockData.rooms,
  courses: mockData.courses,
  studentGroups: mockData.studentGroups,
  timetables: mockData.timetables,

  addTeacher: (teacher) =>
    set((state) => ({
      teachers: [...state.teachers, { ...teacher, id: generateId() }],
    })),

  updateTeacher: (id, updates) =>
    set((state) => ({
      teachers: state.teachers.map((t) => (t.id === id ? { ...t, ...updates } : t)),
    })),

  deleteTeacher: (id) =>
    set((state) => ({
      teachers: state.teachers.filter((t) => t.id !== id),
    })),

  addRoom: (room) =>
    set((state) => ({
      rooms: [...state.rooms, { ...room, id: generateId() }],
    })),

  updateRoom: (id, updates) =>
    set((state) => ({
      rooms: state.rooms.map((r) => (r.id === id ? { ...r, ...updates } : r)),
    })),

  deleteRoom: (id) =>
    set((state) => ({
      rooms: state.rooms.filter((r) => r.id !== id),
    })),

  addCourse: (course) =>
    set((state) => ({
      courses: [...state.courses, { ...course, id: generateId() }],
    })),

  updateCourse: (id, updates) =>
    set((state) => ({
      courses: state.courses.map((c) => (c.id === id ? { ...c, ...updates } : c)),
    })),

  deleteCourse: (id) =>
    set((state) => ({
      courses: state.courses.filter((c) => c.id !== id),
    })),

  addStudentGroup: (group) =>
    set((state) => ({
      studentGroups: [...state.studentGroups, { ...group, id: generateId() }],
    })),

  updateStudentGroup: (id, updates) =>
    set((state) => ({
      studentGroups: state.studentGroups.map((g) => (g.id === id ? { ...g, ...updates } : g)),
    })),

  deleteStudentGroup: (id) =>
    set((state) => ({
      studentGroups: state.studentGroups.filter((g) => g.id !== id),
    })),

  addTimetable: (timetable) =>
    set((state) => ({
      timetables: [...state.timetables, { ...timetable, id: generateId() }],
    })),

  updateTimetable: (id, updates) =>
    set((state) => ({
      timetables: state.timetables.map((t) => (t.id === id ? { ...t, ...updates } : t)),
    })),

  deleteTimetable: (id) =>
    set((state) => ({
      timetables: state.timetables.filter((t) => t.id !== id),
    })),
}))
