import { NextResponse } from "next/server"
import { projects } from "@/lib/data"

export async function GET() {
  return NextResponse.json({ success: true, data: projects })
}

export async function POST(request: Request) {
  const body = await request.json()
  // Placeholder: In production, save to database
  return NextResponse.json({ success: true, message: "Project created (placeholder)", data: body }, { status: 201 })
}
