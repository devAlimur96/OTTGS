"use client"

import { useState } from "react"
import { useStore } from "@/app/lib/store"
import { ModalForm } from "../ModalForm"
import { Trash2, Plus, Edit2 } from "lucide-react"

export function TeachersTable() {
  const { teachers, addTeacher, updateTeacher, deleteTeacher } = useStore()
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const handleSubmit = (data: any) => {
    if (editingId) {
      updateTeacher(editingId, data)
      setEditingId(null)
    } else {
      addTeacher({ name: data.name })
    }
  }

  const editingTeacher = teachers.find((t) => t.id === editingId)

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Teachers</h3>
        <button
          onClick={() => {
            setEditingId(null)
            setShowModal(true)
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          Add Teacher
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Courses</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => {
              const courseCount = 0 // Count will be calculated as needed
              return (
                <tr key={teacher.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">{teacher.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{courseCount}</td>
                  <td className="px-4 py-3 text-sm">
                    <button
                      onClick={() => {
                        setEditingId(teacher.id)
                        setShowModal(true)
                      }}
                      className="p-1 text-blue-600 hover:bg-blue-50 rounded mr-2"
                      aria-label="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteTeacher(teacher.id)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded"
                      aria-label="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {showModal && (
        <ModalForm
          title={editingTeacher ? "Edit Teacher" : "Add Teacher"}
          fields={[{ name: "name", label: "Teacher Name", type: "text", required: true }]}
          onSubmit={handleSubmit}
          onClose={() => setShowModal(false)}
          initialData={editingTeacher}
        />
      )}
    </div>
  )
}
