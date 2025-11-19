import { NextRequest, NextResponse } from "next/server"

type LoginRequest = {
  email: string
  password: string
  role: string
}

// Mock user database for demo purposes
const mockUsers: Record<string, { password: string; role: string }> = {
  "student@example.com": { password: "student123", role: "student" },
  "faculty@example.com": { password: "faculty123", role: "faculty" },
  "admin@example.com": { password: "admin123", role: "admin" },
}

export async function POST(request: NextRequest) {
  try {
    const body: LoginRequest = await request.json()
    const { email, password, role } = body

    // Validate input
    if (!email || !password || !role) {
      return NextResponse.json(
        { success: false, error: "Missing email, password, or role" },
        { status: 400 }
      )
    }

    // Check if user exists in mock database
    const user = mockUsers[email]
    if (!user || user.password !== password) {
      return NextResponse.json(
        { success: false, error: "Invalid email or password" },
        { status: 401 }
      )
    }

    // Check if role matches
    if (user.role !== role.toLowerCase()) {
      return NextResponse.json(
        { success: false, error: `Email doesn't match ${role} role` },
        { status: 401 }
      )
    }

    // Mock JWT token (in production, use a real JWT library)
    const token = Buffer.from(
      JSON.stringify({ email, role, iat: Date.now() })
    ).toString("base64")

    return NextResponse.json({
      success: true,
      token,
      user: { email, role },
      message: `${role} login successful`,
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    )
  }
}
