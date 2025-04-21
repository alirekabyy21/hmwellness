import { cookies } from "next/headers"
import { redirect } from "next/navigation"

// Allowed admin emails and password
const ADMIN_EMAILS = ["alirekaby01@gmail.com", "hagarmoharam7@gmail.com", "hagar@hmwellness.site"]
const ADMIN_PASSWORD = "Hagarm@07"

// Session duration in milliseconds (24 hours)
const SESSION_DURATION = 24 * 60 * 60 * 1000

export interface AdminSession {
  email: string
  expiresAt: number
}

export function login(email: string, password: string): boolean {
  // Check if email is allowed and password is correct
  if (ADMIN_EMAILS.includes(email) && password === ADMIN_PASSWORD) {
    // Create session
    const session: AdminSession = {
      email,
      expiresAt: Date.now() + SESSION_DURATION,
    }

    // Store session in cookies
    cookies().set("admin_session", JSON.stringify(session), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: SESSION_DURATION / 1000, // Convert to seconds
      path: "/",
    })

    return true
  }

  return false
}

export function logout() {
  cookies().delete("admin_session")
}

export function getSession(): AdminSession | null {
  const sessionCookie = cookies().get("admin_session")

  if (!sessionCookie) {
    return null
  }

  try {
    const session: AdminSession = JSON.parse(sessionCookie.value)

    // Check if session is expired
    if (session.expiresAt < Date.now()) {
      logout()
      return null
    }

    return session
  } catch (error) {
    return null
  }
}

export function requireAuth() {
  const session = getSession()

  if (!session) {
    redirect("/admin/login")
  }

  return session
}
