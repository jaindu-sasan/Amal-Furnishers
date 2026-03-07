import { NextResponse } from "next/server"
import { reviews } from "@/lib/data"

export async function GET() {
  return NextResponse.json({ success: true, data: reviews })
}

export async function POST(request: Request) {
  const body = await request.json()
  // Placeholder: In production, save to database
  return NextResponse.json({ success: true, message: "Review submitted (placeholder)", data: body }, { status: 201 })
}
