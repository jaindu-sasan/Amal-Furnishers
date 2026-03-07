import { NextResponse } from "next/server"
import { getAdminSession } from "@/backend/admin/admin-auth"

export async function requireAdminSession() {
  const session = await getAdminSession()
  if (!session) {
    return {
      session: null,
      response: NextResponse.json({ message: "Unauthorized" }, { status: 401 }),
    }
  }

  return {
    session,
    response: null,
  }
}

