"use client"

import { useState } from "react"
import { useStore } from "@/app/lib/store"
import { autoSchedule } from "@/app/lib/scheduler"
import { BuilderForm } from "./builder/BuilderForm"
import { TimetableGrid } from "./builder/TimetableGrid"
import { Download, Save } from "lucide-react"

export function TimetableBuilder() {
  const store = useStore()
  const [generated, setGenerated] = useState(false)
  const [loading, setLoading] = useState(false)
  const [currentConfig, setCurrentConfig] = useState<any>(null)
  const [currentSlots, setCurrentSlots] = useState<any[]>([])
  const [savedTimetables, setSavedTimetables] = useState<string[]>([])

  const handleGenerate = async (config: any) => {
    setLoading(true)
    try {
      // Simulate async operation
      await new Promise((resolve) => setTimeout(resolve, 500))

      const groupObj = store.studentGroups.find((g) => g.id === config.groupId)
      const coursesArray = store.courses.filter((c) => config.courseIds.includes(c.id))
      const teachersMap = new Map(store.teachers.map((t) => [t.id, t]))
      const roomsMap = new Map(store.rooms.map((r) => [r.id, r]))

      const slots = autoSchedule({
        courses: coursesArray,
        teachers: teachersMap,
        rooms: roomsMap,
        studentGroup: groupObj!,
        days: config.days,
        hoursPerDay: config.hoursPerDay,
      })

      if (slots) {
        setCurrentConfig(config)
        setCurrentSlots(slots)
        setGenerated(true)
      } else {
        alert("Could not generate timetable - scheduling conflict detected. Try adjusting parameters.")
      }
    } finally {
      setLoading(false)
    }
  }

  const handleSaveTimetable = () => {
    if (!currentConfig || !currentSlots.length) return

    const group = store.studentGroups.find((g) => g.id === currentConfig.groupId)
    const timetableName = `${group?.name} - ${currentConfig.term}`

    store.addTimetable({
      name: timetableName,
      groupId: currentConfig.groupId,
      courseIds: currentConfig.courseIds,
      term: currentConfig.term,
      days: currentConfig.days,
      hoursPerDay: currentConfig.hoursPerDay,
      slots: currentSlots,
      published: false,
      createdAt: new Date().toISOString(),
    })

    setSavedTimetables((prev) => [...prev, timetableName])
    alert("Timetable saved successfully!")
  }

  const handleDownloadJSON = () => {
    if (!currentSlots.length) return

    const data = {
      config: currentConfig,
      slots: currentSlots,
      generatedAt: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `timetable-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const coursesMap = new Map(store.courses.map((c) => [c.id, c]))
  const teachersMap = new Map(store.teachers.map((t) => [t.id, t]))
  const roomsMap = new Map(store.rooms.map((r) => [r.id, r]))

  return (
    <div className="max-w-7xl space-y-8">
      <h2 className="text-3xl font-bold text-gray-900">Timetable Builder</h2>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-1">
          <BuilderForm onGenerate={handleGenerate} isLoading={loading} />

          {generated && (
            <div className="mt-6 space-y-3">
              <button
                onClick={handleSaveTimetable}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
              >
                <Save className="w-4 h-4" />
                Save Timetable
              </button>
              <button
                onClick={handleDownloadJSON}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-medium"
              >
                <Download className="w-4 h-4" />
                Download JSON
              </button>
            </div>
          )}
        </div>

        {/* Grid */}
        <div className="lg:col-span-2">
          {generated ? (
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Generated Timetable</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Drag and drop lessons to reschedule. Red highlights indicate conflicts.
                </p>
              </div>
              <TimetableGrid
                slots={currentSlots}
                courses={coursesMap}
                teachers={teachersMap}
                rooms={roomsMap}
                days={currentConfig.days}
                hoursPerDay={currentConfig.hoursPerDay}
              />
            </div>
          ) : (
            <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-lg shadow p-12 flex items-center justify-center text-center">
              <div>
                <p className="text-lg text-gray-600">Configure and generate a timetable to get started</p>
                <p className="text-sm text-gray-500 mt-2">Select a student group, courses, and schedule parameters</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
