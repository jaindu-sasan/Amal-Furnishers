import { NextResponse } from "next/server"
import { mockQuoteRequests } from "@/lib/data"

export async function GET() {
  return NextResponse.json({ success: true, data: mockQuoteRequests })
}

export async function POST(request: Request) {
  const body = await request.json()
  // Placeholder: In production, save to database and send notification
  return NextResponse.json(
    { success: true, message: "Quote request submitted (placeholder)", data: body },
    { status: 201 }
  )
}
