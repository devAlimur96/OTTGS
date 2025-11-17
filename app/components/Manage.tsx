"use client"

import { useState } from "react"
import { CoursesTable } from "./manage/CoursesTable"
import { TeachersTable } from "./manage/TeachersTable"
import { RoomsTable } from "./manage/RoomsTable"
import { GroupsTable } from "./manage/GroupsTable"

type TabType = "courses" | "teachers" | "rooms" | "groups"

export function Manage() {
  const [activeTab, setActiveTab] = useState<TabType>("courses")

  const tabs: { id: TabType; label: string }[] = [
    { id: "courses", label: "Courses" },
    { id: "teachers", label: "Teachers" },
    { id: "rooms", label: "Rooms" },
    { id: "groups", label: "Student Groups" },
  ]

  return (
    <div className="max-w-6xl">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Manage Resources</h2>

      <div className="bg-white rounded-lg shadow">
        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === "courses" && <CoursesTable />}
          {activeTab === "teachers" && <TeachersTable />}
          {activeTab === "rooms" && <RoomsTable />}
          {activeTab === "groups" && <GroupsTable />}
        </div>
      </div>
    </div>
  )
}
