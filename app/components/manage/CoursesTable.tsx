"use client"

import { useState } from "react"
import { useStore } from "@/app/lib/store"
import { ModalForm } from "../ModalForm"
import { Trash2, Plus, Edit2 } from "lucide-react"

export function CoursesTable() {
  const { courses, teachers, addCourse, updateCourse, deleteCourse } = useStore()
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const handleSubmit = (data: any) => {
    if (editingId) {
      updateCourse(editingId, data)
      setEditingId(null)
    } else {
      addCourse({
        code: data.code,
        title: data.title,
        hours: Number(data.hours),
        teacherId: data.teacherId,
      })
    }
  }

  const editingCourse = courses.find((c) => c.id === editingId)

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Courses</h3>
        <button
          onClick={() => {
            setEditingId(null)
            setShowModal(true)
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          Add Course
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Code</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Title</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Hours</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Teacher</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => {
              const teacher = teachers.find((t) => t.id === course.teacherId)
              return (
                <tr key={course.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">{course.code}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{course.title}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{course.hours}h</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{teacher?.name || "N/A"}</td>
                  <td className="px-4 py-3 text-sm">
                    <button
                      onClick={() => {
                        setEditingId(course.id)
                        setShowModal(true)
                      }}
                      className="p-1 text-blue-600 hover:bg-blue-50 rounded mr-2"
                      aria-label="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteCourse(course.id)}
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
          title={editingCourse ? "Edit Course" : "Add Course"}
          fields={[
            { name: "code", label: "Course Code", type: "text", required: true },
            { name: "title", label: "Course Title", type: "text", required: true },
            { name: "hours", label: "Hours", type: "number", required: true },
            {
              name: "teacherId",
              label: "Assign Teacher",
              type: "select",
              required: true,
              options: teachers.map((t) => ({ value: t.id, label: t.name })),
            },
          ]}
          onSubmit={handleSubmit}
          onClose={() => setShowModal(false)}
          initialData={editingCourse}
        />
      )}
    </div>
  )
}
