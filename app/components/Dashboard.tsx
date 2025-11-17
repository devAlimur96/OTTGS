"use client"

import Link from "next/link"
import { useStore } from "@/app/lib/store"
import { BarChart3, Users, BookOpen, Zap } from "lucide-react"

export function Dashboard() {
  const { courses, teachers, rooms, studentGroups, timetables } = useStore()

  const stats = [
    { label: "Courses", value: courses.length, icon: BookOpen, color: "bg-blue-500" },
    { label: "Teachers", value: teachers.length, icon: Users, color: "bg-teal-500" },
    { label: "Rooms", value: rooms.length, icon: BarChart3, color: "bg-purple-500" },
    { label: "Timetables", value: timetables.length, icon: Zap, color: "bg-orange-500" },
  ]

  return (
    <div className="max-w-6xl">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h2>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.color} rounded-lg p-3`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Timetable Pro</h3>
        <p className="text-gray-600 mb-6">
          Efficiently manage courses, teachers, rooms, and student groups. Generate conflict-free timetables
          automatically with our intelligent scheduling engine.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-600 mb-2">📋 Manage Resources</h4>
            <p className="text-sm text-gray-600">Add and organize courses, teachers, rooms, and student groups.</p>
          </div>
          <div className="border border-teal-200 rounded-lg p-4">
            <h4 className="font-semibold text-teal-600 mb-2">⚙️ Smart Scheduling</h4>
            <p className="text-sm text-gray-600">Auto-generate conflict-free timetables with drag-and-drop editing.</p>
          </div>
          <div className="border border-purple-200 rounded-lg p-4">
            <h4 className="font-semibold text-purple-600 mb-2">📤 Publish & Share</h4>
            <p className="text-sm text-gray-600">Publish timetables and export as CSV or shareable links.</p>
          </div>
        </div>

        {/* Quick access to login pages */}
        <div className="mt-6 bg-gray-50 border border-dashed rounded-lg p-4">
          <h4 className="font-semibold text-gray-800 mb-3">Quick logins</h4>
          <div className="flex gap-3">
            <Link href="/student-login" className="inline-block bg-blue-600 text-white px-4 py-2 rounded">Student Login</Link>
            <Link href="/faculty-login" className="inline-block bg-teal-600 text-white px-4 py-2 rounded">Faculty Login</Link>
            <Link href="/admin-login" className="inline-block bg-purple-600 text-white px-4 py-2 rounded">Admin Login</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
