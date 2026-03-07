import { NextResponse } from "next/server"
import { MessageStatus } from "@prisma/client"
import { z } from "zod"
import { prisma } from "@/backend/db/prisma"
import { requireAdminSession } from "@/backend/admin/admin-route"

const updateMessageSchema = z.object({
  status: z.nativeEnum(MessageStatus),
})

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminSession()
  if (auth.response) return auth.response

  try {
    const { id } = await params
    const body = await request.json()
    const parsed = updateMessageSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Invalid message payload", errors: parsed.error.flatten() },
        { status: 400 },
      )
    }

    const existing = await prisma.message.findUnique({
      where: { id },
      select: { id: true },
    })

    if (!existing) {
      return NextResponse.json({ message: "Message not found" }, { status: 404 })
    }

    const updated = await prisma.message.update({
      where: { id },
      data: {
        status: parsed.data.status,
      },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            productCode: true,
          },
        },
      },
    })

    return NextResponse.json({ data: updated })
  } catch (error) {
    console.error("PATCH /api/messages/[id] failed", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminSession()
  if (auth.response) return auth.response

  try {
    const { id } = await params
    const existing = await prisma.message.findUnique({
      where: { id },
      select: { id: true },
    })

    if (!existing) {
      return NextResponse.json({ message: "Message not found" }, { status: 404 })
    }

    await prisma.message.delete({ where: { id } })
    return NextResponse.json({ message: "Message deleted" })
  } catch (error) {
    console.error("DELETE /api/messages/[id] failed", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
