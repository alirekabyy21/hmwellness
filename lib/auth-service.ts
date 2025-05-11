import { cookies } from "next/headers"
import { jwtVerify, SignJWT } from "jose"
import { adminConfig } from "@/app/config"

// Secret key for JWT signing and verification
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "default-secret-change-in-production")

// JWT expiration time
const JWT_EXPIRES_IN = "24h"

export async function login(email: string, password: string) {
  // Check if credentials match the admin user
  if (email === adminConfig.email && password === adminConfig.password) {
    // Create a JWT token
    const token = await new SignJWT({ email, role: "admin" })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(JWT_EXPIRES_IN)
      .sign(JWT_SECRET)

    // Set the token in a cookie
    cookies().set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60, // 24 hours
      path: "/",
    })

    return { success: true }
  }

  return { success: false, error: "Invalid credentials" }
}

export async function logout() {
  cookies().delete("auth-token")
  return { success: true }
}

export async function getSession() {
  const token = cookies().get("auth-token")?.value

  if (!token) {
    return null
  }

  try {
    const verified = await jwtVerify(token, JWT_SECRET)
    return verified.payload as { email: string; role: string }
  } catch (error) {
    console.error("Error verifying token:", error)
    return null
  }
}

export async function requireAuth() {
  const session = await getSession()

  if (!session || session.role !== "admin") {
    return { success: false, error: "Unauthorized" }
  }

  return { success: true, session }
}
