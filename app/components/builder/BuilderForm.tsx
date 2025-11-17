"use client"

import type React from "react"

import { useStore } from "@/app/lib/store"
import { useState } from "react"
import { Wand2 } from "lucide-react"

interface BuilderFormProps {
  onGenerate: (config: {
    groupId: string
    courseIds: string[]
    term: string
    days: string[]
    hoursPerDay: number
  }) => void
  isLoading?: boolean
}

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

export function BuilderForm({ onGenerate, isLoading }: BuilderFormProps) {
  const { studentGroups, courses } = useStore()

  const [groupId, setGroupId] = useState("")
  const [selectedCourses, setSelectedCourses] = useState<string[]>([])
  const [term, setTerm] = useState("Fall 2024")
  const [selectedDays, setSelectedDays] = useState<string[]>(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"])
  const [hoursPerDay, setHoursPerDay] = useState(6)

  const handleCourseToggle = (courseId: string) => {
    setSelectedCourses((prev) => (prev.includes(courseId) ? prev.filter((id) => id !== courseId) : [...prev, courseId]))
  }

  const handleDayToggle = (day: string) => {
    setSelectedDays((prev) => (prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (groupId && selectedCourses.length > 0 && selectedDays.length > 0) {
      onGenerate({
        groupId,
        courseIds: selectedCourses,
        term,
        days: selectedDays,
        hoursPerDay,
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
      {/* Student Group Selection */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-3">Select Student Group</label>
        <select
          value={groupId}
          onChange={(e) => setGroupId(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Choose a group...</option>
          {studentGroups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name} ({group.size} students)
            </option>
          ))}
        </select>
      </div>

      {/* Course Selection */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-3">Select Courses</label>
        <div className="grid md:grid-cols-2 gap-3">
          {courses.map((course) => (
            <label
              key={course.id}
              className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedCourses.includes(course.id)}
                onChange={() => handleCourseToggle(course.id)}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm text-gray-900">
                {course.code} - {course.title} ({course.hours}h)
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Term */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">Term</label>
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Days Selection */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-3">Select Days</label>
        <div className="grid grid-cols-5 gap-2">
          {DAYS.map((day) => (
            <label key={day} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedDays.includes(day)}
                onChange={() => handleDayToggle(day)}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm text-gray-900">{day.slice(0, 3)}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Hours Per Day */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">Hours Per Day: {hoursPerDay}</label>
        <input
          type="range"
          min="4"
          max="10"
          value={hoursPerDay}
          onChange={(e) => setHoursPerDay(Number(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Generate Button */}
      <button
        type="submit"
        disabled={!groupId || selectedCourses.length === 0 || isLoading}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-lg hover:from-blue-700 hover:to-teal-600 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
      >
        <Wand2 className="w-5 h-5" />
        {isLoading ? "Generating..." : "Generate Timetable"}
      </button>
    </form>
  )
}
