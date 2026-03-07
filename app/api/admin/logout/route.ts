import { NextResponse } from "next/server"
import { ADMIN_SESSION_COOKIE } from "@/backend/admin/admin-auth"

export async function POST() {
  const response = NextResponse.json({ message: "Logout successful" })

  response.cookies.set(ADMIN_SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  })

  return response
}

