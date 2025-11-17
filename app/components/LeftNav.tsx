"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Calendar, Settings, List, Send, X } from "lucide-react"

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/builder", label: "Timetable Builder", icon: Calendar },
  { href: "/manage", label: "Manage", icon: Settings },
  { href: "/timetables", label: "Timetables", icon: List },
  { href: "/publish", label: "Publish", icon: Send },
]

export function LeftNav({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <button onClick={onClose} className="fixed inset-0 bg-black/50 z-40 md:hidden" aria-label="Close menu" />
      )}

      {/* Navigation */}
      <nav
        className={`
        fixed md:static inset-y-0 left-0 z-50 w-64 bg-slate-50 border-r border-blue-200
        transform transition-transform duration-200 md:transform-none
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
      >
        <div className="flex items-center justify-between p-6 md:hidden">
          <h2 className="font-bold text-gray-900">Menu</h2>
          <button onClick={onClose} aria-label="Close">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2 p-6">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                pathname === href ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-blue-100"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  )
}
