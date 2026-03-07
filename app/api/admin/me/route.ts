import { NextResponse } from "next/server"
import { getAdminSession } from "@/backend/admin/admin-auth"

export async function GET() {
  try {
    const session = await getAdminSession()

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    return NextResponse.json({ data: session })
  } catch (error) {
    console.error("GET /api/admin/me failed", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

