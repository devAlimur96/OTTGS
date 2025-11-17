"use client"

import { useState } from "react"
import { useStore } from "@/app/lib/store"
import { Share2, Copy, ToggleLeft as Toggle2 } from "lucide-react"

export function Publish() {
  const store = useStore()
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleTogglePublish = (timetableId: string, published: boolean) => {
    store.updateTimetable(timetableId, { published: !published })
  }

  const handleCopyUrl = (timetableId: string) => {
    const url = `${window.location.origin}/shared/${timetableId}`
    navigator.clipboard.writeText(url)
    setCopiedId(timetableId)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const coursesMap = new Map(store.courses.map((c) => [c.id, c]))
  const teachersMap = new Map(store.teachers.map((t) => [t.id, t]))
  const roomsMap = new Map(store.rooms.map((r) => [r.id, r]))

  const publishedTimetables = store.timetables.filter((t) => t.published)
  const draftTimetables = store.timetables.filter((t) => !t.published)

  return (
    <div className="max-w-6xl">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Publish & Share</h2>

      {store.timetables.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <p className="text-gray-600 mb-4">No timetables available</p>
          <p className="text-sm text-gray-500">Create and save a timetable first to publish it</p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Published Section */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              Published Timetables ({publishedTimetables.length})
            </h3>

            {publishedTimetables.length === 0 ? (
              <div className="bg-gray-50 rounded-lg p-8 text-center text-gray-600">
                No published timetables yet. Publish a timetable to share it with others.
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {publishedTimetables.map((timetable) => {
                  const group = store.studentGroups.find((g) => g.id === timetable.groupId)
                  const shareUrl = `${window.location.origin}/shared/${timetable.id}`

                  return (
                    <div key={timetable.id} className="bg-white rounded-lg shadow p-6 border-2 border-green-200">
                      <div className="mb-4">
                        <h4 className="text-lg font-semibold text-gray-900">{timetable.name}</h4>
                        <p className="text-sm text-gray-600">{group?.name}</p>
                        <p className="text-xs text-gray-500 mt-1">Term: {timetable.term}</p>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-3 mb-4">
                        <p className="text-xs font-semibold text-gray-700 mb-2">Shareable Link:</p>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={shareUrl}
                            readOnly
                            className="flex-1 px-2 py-2 text-xs bg-white border border-gray-300 rounded text-gray-600"
                          />
                          <button
                            onClick={() => handleCopyUrl(timetable.id)}
                            className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium text-xs"
                          >
                            {copiedId === timetable.id ? "Copied!" : <Copy className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={() => handleTogglePublish(timetable.id, true)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 font-medium"
                      >
                        <Toggle2 className="w-4 h-4" />
                        Unpublish
                      </button>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Draft Section */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-400"></div>
              Draft Timetables ({draftTimetables.length})
            </h3>

            {draftTimetables.length === 0 ? (
              <div className="bg-gray-50 rounded-lg p-8 text-center text-gray-600">All timetables are published!</div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {draftTimetables.map((timetable) => {
                  const group = store.studentGroups.find((g) => g.id === timetable.groupId)

                  return (
                    <div key={timetable.id} className="bg-white rounded-lg shadow p-6 border-2 border-gray-200">
                      <div className="mb-4">
                        <h4 className="text-lg font-semibold text-gray-900">{timetable.name}</h4>
                        <p className="text-sm text-gray-600">{group?.name}</p>
                        <p className="text-xs text-gray-500 mt-1">Term: {timetable.term}</p>
                      </div>

                      <button
                        onClick={() => handleTogglePublish(timetable.id, false)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                      >
                        <Share2 className="w-4 h-4" />
                        Publish & Share
                      </button>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Info Card */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h4 className="font-semibold text-blue-900 mb-2">Sharing Information</h4>
            <ul className="text-sm text-blue-800 space-y-2">
              <li>✓ Published timetables are accessible via shareable links</li>
              <li>✓ Recipients can view the complete schedule and export as CSV</li>
              <li>✓ Changes to a timetable are reflected immediately for all users with the link</li>
              <li>✓ Unpublish a timetable to remove it from public access</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
