"use client"

import { useStore } from "@/app/lib/store"
import { TimetableGrid } from "@/app/components/builder/TimetableGrid"
import { Download } from "lucide-react"
import { generateCSV, downloadCSV } from "@/app/lib/csvExport"
import { use } from "react"

interface Props {
  params: Promise<{ id: string }>
}

export default function SharedTimetablePage({ params }: Props) {
  const { id } = use(params)
  const store = useStore()

  const timetable = store.timetables.find((t) => t.id === id)
  const group = timetable ? store.studentGroups.find((g) => g.id === timetable.groupId) : null

  const coursesMap = new Map(store.courses.map((c) => [c.id, c]))
  const teachersMap = new Map(store.teachers.map((t) => [t.id, t]))
  const roomsMap = new Map(store.rooms.map((r) => [r.id, r]))

  const handleExportCSV = () => {
    if (!timetable) return
    const csv = generateCSV(timetable, coursesMap, teachersMap, roomsMap)
    downloadCSV(csv, `${timetable.name}.csv`)
  }

  if (!timetable) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-md">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Timetable Not Found</h1>
          <p className="text-gray-600">The timetable you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    )
  }

  if (!timetable.published) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-md">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600">This timetable is not published yet. Please check back later.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-teal-500 px-6 py-8 text-white">
            <h1 className="text-3xl font-bold mb-2">{timetable.name}</h1>
            <p className="text-blue-100 mb-2">{group?.name}</p>
            <p className="text-sm text-blue-100">Term: {timetable.term}</p>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Export Button */}
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Schedule</h2>
                <p className="text-sm text-gray-600 mt-1">{timetable.slots.length} class sessions scheduled</p>
              </div>
              <button
                onClick={handleExportCSV}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
            </div>

            {/* Grid */}
            <TimetableGrid
              slots={timetable.slots}
              courses={coursesMap}
              teachers={teachersMap}
              rooms={roomsMap}
              days={timetable.days}
              hoursPerDay={timetable.hoursPerDay}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
