"use client"

import { TopBar } from "@/app/components/TopBar"
import { LeftNav } from "@/app/components/LeftNav"
import { Publish } from "@/app/components/Publish"
import { useState } from "react"

export default function PublishPage() {
  const [navOpen, setNavOpen] = useState(false)

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      <LeftNav isOpen={navOpen} onClose={() => setNavOpen(false)} />
      <div className="flex-1 flex flex-col">
        <TopBar onMenuClick={() => setNavOpen(true)} />
        <main className="flex-1 bg-gradient-to-br from-blue-50 to-teal-50 p-6 overflow-y-auto">
          <Publish />
        </main>
      </div>
    </div>
  )
}
