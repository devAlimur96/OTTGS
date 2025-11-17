"use client"

import { LayoutGrid, Menu } from "lucide-react"

export function TopBar({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="border-b border-blue-200 bg-white px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="p-2 hover:bg-gray-100 rounded-lg md:hidden" aria-label="Toggle menu">
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <LayoutGrid className="w-6 h-6 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Timetable Pro</h1>
        </div>
      </div>
      <div className="text-sm text-gray-600">Efficient Schedule Management</div>
    </header>
  )
}
