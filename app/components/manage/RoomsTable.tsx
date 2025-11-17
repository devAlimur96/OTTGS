"use client"

import { useState } from "react"
import { useStore } from "@/app/lib/store"
import { ModalForm } from "../ModalForm"
import { Trash2, Plus, Edit2 } from "lucide-react"

export function RoomsTable() {
  const { rooms, addRoom, updateRoom, deleteRoom } = useStore()
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const handleSubmit = (data: any) => {
    if (editingId) {
      updateRoom(editingId, data)
      setEditingId(null)
    } else {
      addRoom({
        name: data.name,
        capacity: Number(data.capacity),
      })
    }
  }

  const editingRoom = rooms.find((r) => r.id === editingId)

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Rooms</h3>
        <button
          onClick={() => {
            setEditingId(null)
            setShowModal(true)
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          Add Room
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Room Name</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Capacity</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-900">{room.name}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{room.capacity} students</td>
                <td className="px-4 py-3 text-sm">
                  <button
                    onClick={() => {
                      setEditingId(room.id)
                      setShowModal(true)
                    }}
                    className="p-1 text-blue-600 hover:bg-blue-50 rounded mr-2"
                    aria-label="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteRoom(room.id)}
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
          title={editingRoom ? "Edit Room" : "Add Room"}
          fields={[
            { name: "name", label: "Room Name", type: "text", required: true },
            { name: "capacity", label: "Capacity", type: "number", required: true },
          ]}
          onSubmit={handleSubmit}
          onClose={() => setShowModal(false)}
          initialData={editingRoom}
        />
      )}
    </div>
  )
}
