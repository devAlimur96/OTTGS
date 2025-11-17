"use client"

import { useState } from "react"
import { TopBar } from "./components/TopBar"
import { LeftNav } from "./components/LeftNav"
import { Dashboard } from "./components/Dashboard"

export default function Home() {
  const [navOpen, setNavOpen] = useState(false)

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      <LeftNav isOpen={navOpen} onClose={() => setNavOpen(false)} />
      <div className="flex-1 flex flex-col">
        <TopBar onMenuClick={() => setNavOpen(true)} />
        <main className="flex-1 bg-gradient-to-br from-blue-50 to-teal-50 p-6">
          <Dashboard />
        </main>
      </div>
    </div>
  )
}
