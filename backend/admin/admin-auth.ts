import { createHmac, timingSafeEqual } from "crypto"
import { cookies } from "next/headers"
import { prisma } from "@/backend/db/prisma"
import { ADMIN_SESSION_COOKIE, ADMIN_SESSION_MAX_AGE } from "@/backend/admin/admin-constants"

export { ADMIN_SESSION_COOKIE, ADMIN_SESSION_MAX_AGE } from "@/backend/admin/admin-constants"

type SessionTokenPayload = {
  userId: string
  exp: number
}

type AdminSession = {
  userId: string
  email: string
  name: string | null
}

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET || "dev-only-admin-secret-change-me"
}

function signPayload(payload: string) {
  return createHmac("sha256", getSessionSecret()).update(payload).digest("base64url")
}

export function createAdminSessionToken(userId: string) {
  const payload: SessionTokenPayload = {
    userId,
    exp: Math.floor(Date.now() / 1000) + ADMIN_SESSION_MAX_AGE,
  }

  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url")
  const signature = signPayload(encodedPayload)
  return `${encodedPayload}.${signature}`
}

export function verifyAdminSessionToken(token: string): SessionTokenPayload | null {
  const [encodedPayload, signature] = token.split(".")
  if (!encodedPayload || !signature) return null

  const expectedSignature = signPayload(encodedPayload)
  const expectedBuffer = Buffer.from(expectedSignature)
  const signatureBuffer = Buffer.from(signature)

  if (expectedBuffer.length !== signatureBuffer.length) return null
  if (!timingSafeEqual(expectedBuffer, signatureBuffer)) return null

  let payload: SessionTokenPayload
  try {
    payload = JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf-8"))
  } catch {
    return null
  }

  if (!payload.userId || !payload.exp) return null
  if (payload.exp < Math.floor(Date.now() / 1000)) return null

  return payload
}

export async function getAdminSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value

  if (!token) return null

  const payload = verifyAdminSessionToken(token)
  if (!payload) return null

  const user = await prisma.adminUser.findFirst({
    where: {
      id: payload.userId,
      isActive: true,
    },
    select: {
      id: true,
      email: true,
      name: true,
    },
  })

  if (!user) return null

  return {
    userId: user.id,
    email: user.email,
    name: user.name,
  }
}

