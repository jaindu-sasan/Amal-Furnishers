import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
import { z } from "zod"
import { prisma } from "@/backend/db/prisma"
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_MAX_AGE,
  createAdminSessionToken,
} from "@/backend/admin/admin-auth"

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = loginSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Invalid login payload",
          errors: parsed.error.flatten(),
        },
        { status: 400 },
      )
    }

    const user = await prisma.adminUser.findUnique({
      where: { email: parsed.data.email.toLowerCase() },
    })

    if (!user || !user.isActive) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 })
    }

    const passwordMatches = await bcrypt.compare(parsed.data.password, user.passwordHash)
    if (!passwordMatches) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 })
    }

    const token = createAdminSessionToken(user.id)
    const response = NextResponse.json({
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    })

    response.cookies.set(ADMIN_SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: ADMIN_SESSION_MAX_AGE,
      path: "/",
    })

    return response
  } catch (error) {
    console.error("POST /api/admin/login failed", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

