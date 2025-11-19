"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"

type Props = {
  role: string
}

export default function LoginForm({ role }: Props) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setLoading(true)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          role: role.toLowerCase(),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Login failed")
        setLoading(false)
        return
      }

      // Store token in localStorage
      if (data.token) {
        localStorage.setItem("authToken", data.token)
        localStorage.setItem("userRole", role.toLowerCase())
        localStorage.setItem("userEmail", email)
      }

      setSuccess(`Welcome ${role}! Redirecting...`)
      
      // Redirect to dashboard after 1.5 seconds
      setTimeout(() => {
        router.push("/")
      }, 1500)
    } catch (err) {
      setError("Network error. Please try again.")
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">{role} Login</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded text-sm">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
            className="mt-1 block w-full border rounded px-3 py-2 disabled:bg-gray-100"
          />
          <p className="text-xs text-gray-500 mt-1">
            Try: student@example.com, faculty@example.com, or admin@example.com
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
            className="mt-1 block w-full border rounded px-3 py-2 disabled:bg-gray-100"
          />
          <p className="text-xs text-gray-500 mt-1">
            Try: student123, faculty123, or admin123
          </p>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-60 hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </div>
      </form>
    </div>
  )
}
