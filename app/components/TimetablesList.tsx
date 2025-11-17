"use client"

import { useState } from "react"
import { useStore } from "@/app/lib/store"
import { ModalForm } from "./ModalForm"
import { TimetableGrid } from "./builder/TimetableGrid"
import { Trash2, Eye, Edit2, FileDown } from "lucide-react"
import { generateCSV, downloadCSV } from "@/app/lib/csvExport"

export function TimetablesList() {
  const store = useStore()
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [previewId, setPreviewId] = useState<string | null>(null)

  const handleRename = (data: any) => {
    if (editingId) {
      store.updateTimetable(editingId, { name: data.name })
      setEditingId(null)
    }
  }

  const handleExportCSV = (timetableId: string) => {
    const timetable = store.timetables.find((t) => t.id === timetableId)
    if (!timetable) return

    const coursesMap = new Map(store.courses.map((c) => [c.id, c]))
    const teachersMap = new Map(store.teachers.map((t) => [t.id, t]))
    const roomsMap = new Map(store.rooms.map((r) => [r.id, r]))

    const csv = generateCSV(timetable, coursesMap, teachersMap, roomsMap)
    downloadCSV(csv, `${timetable.name}.csv`)
  }

  const previewTimetable = store.timetables.find((t) => t.id === previewId)
  const coursesMap = new Map(store.courses.map((c) => [c.id, c]))
  const teachersMap = new Map(store.teachers.map((t) => [t.id, t]))
  const roomsMap = new Map(store.rooms.map((r) => [r.id, r]))

  return (
    <div className="max-w-6xl">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Saved Timetables</h2>

      {store.timetables.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <p className="text-gray-600 mb-4">No timetables yet</p>
          <p className="text-sm text-gray-500">Create a new timetable using the Builder</p>
        </div>
      ) : (
        <>
          {/* Timetables Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {store.timetables.map((timetable) => {
              const group = store.studentGroups.find((g) => g.id === timetable.groupId)
              return (
                <div key={timetable.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{timetable.name}</h3>
                      <p className="text-sm text-gray-600">{group?.name}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Term: {timetable.term} | {timetable.slots.length} slots
                      </p>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50">
                      <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                      <span className="text-xs font-medium text-blue-600">
                        {timetable.published ? "Published" : "Draft"}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setPreviewId(timetable.id)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 font-medium"
                    >
                      <Eye className="w-4 h-4" />
                      Preview
                    </button>
                    <button
                      onClick={() => {
                        setEditingId(timetable.id)
                        setShowModal(true)
                      }}
                      className="flex items-center justify-center gap-2 px-3 py-2 text-sm text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleExportCSV(timetable.id)}
                      className="flex items-center justify-center gap-2 px-3 py-2 text-sm text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100"
                    >
                      <FileDown className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => store.deleteTimetable(timetable.id)}
                      className="flex items-center justify-center gap-2 px-3 py-2 text-sm text-red-600 bg-red-50 rounded-lg hover:bg-red-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Preview Modal */}
          {previewId && previewTimetable && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-96 overflow-auto">
                <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
                  <h3 className="font-bold text-gray-900">{previewTimetable.name}</h3>
                  <button onClick={() => setPreviewId(null)} className="text-gray-400 hover:text-gray-600">
                    ✕
                  </button>
                </div>
                <div className="p-4">
                  <TimetableGrid
                    slots={previewTimetable.slots}
                    courses={coursesMap}
                    teachers={teachersMap}
                    rooms={roomsMap}
                    days={previewTimetable.days}
                    hoursPerDay={previewTimetable.hoursPerDay}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Rename Modal */}
          {showModal && (
            <ModalForm
              title="Rename Timetable"
              fields={[{ name: "name", label: "Timetable Name", type: "text", required: true }]}
              onSubmit={handleRename}
              onClose={() => setShowModal(false)}
              initialData={store.timetables.find((t) => t.id === editingId)}
            />
          )}
        </>
      )}
    </div>
  )
}
