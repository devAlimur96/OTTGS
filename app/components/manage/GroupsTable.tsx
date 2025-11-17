"use client"

import { useState } from "react"
import { useStore } from "@/app/lib/store"
import { ModalForm } from "../ModalForm"
import { Trash2, Plus, Edit2 } from "lucide-react"

export function GroupsTable() {
  const { studentGroups, addStudentGroup, updateStudentGroup, deleteStudentGroup } = useStore()
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const handleSubmit = (data: any) => {
    if (editingId) {
      updateStudentGroup(editingId, data)
      setEditingId(null)
    } else {
      addStudentGroup({
        name: data.name,
        size: Number(data.size),
      })
    }
  }

  const editingGroup = studentGroups.find((g) => g.id === editingId)

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Student Groups</h3>
        <button
          onClick={() => {
            setEditingId(null)
            setShowModal(true)
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          Add Group
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Group Name</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Size</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {studentGroups.map((group) => (
              <tr key={group.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-900">{group.name}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{group.size} students</td>
                <td className="px-4 py-3 text-sm">
                  <button
                    onClick={() => {
                      setEditingId(group.id)
                      setShowModal(true)
                    }}
                    className="p-1 text-blue-600 hover:bg-blue-50 rounded mr-2"
                    aria-label="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteStudentGroup(group.id)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                    aria-label="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <ModalForm
          title={editingGroup ? "Edit Student Group" : "Add Student Group"}
          fields={[
            { name: "name", label: "Group Name", type: "text", required: true },
            { name: "size", label: "Group Size", type: "number", required: true },
          ]}
          onSubmit={handleSubmit}
          onClose={() => setShowModal(false)}
          initialData={editingGroup}
        />
      )}
    </div>
  )
}
