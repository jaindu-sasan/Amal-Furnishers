import { NextResponse } from "next/server"
import { MessageStatus } from "@prisma/client"
import { z } from "zod"
import { prisma } from "@/backend/db/prisma"
import { requireAdminSession } from "@/backend/admin/admin-route"

const createMessageSchema = z.object({
  customerName: z.string().trim().min(2),
  phone: z.string().trim().min(6),
  email: z.string().trim().email(),
  message: z.string().trim().min(2),
  productId: z.string().trim().optional(),
})

export async function GET(request: Request) {
  const auth = await requireAdminSession()
  if (auth.response) return auth.response

  try {
    const { searchParams } = new URL(request.url)
    const statusParam = searchParams.get("status")
    const productId = searchParams.get("productId")

    const status = statusParam && statusParam in MessageStatus
      ? (statusParam as MessageStatus)
      : undefined

    const messages = await prisma.message.findMany({
      where: {
        ...(status ? { status } : {}),
        ...(productId ? { productId } : {}),
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
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json({ data: messages })
  } catch (error) {
    console.error("GET /api/messages failed", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = createMessageSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Invalid message payload", errors: parsed.error.flatten() },
        { status: 400 },
      )
    }

    if (parsed.data.productId) {
      const product = await prisma.product.findUnique({
        where: { id: parsed.data.productId },
        select: { id: true },
      })

      if (!product) {
        return NextResponse.json({ message: "Product not found" }, { status: 404 })
      }
    }

    const message = await prisma.message.create({
      data: {
        customerName: parsed.data.customerName,
        phone: parsed.data.phone,
        email: parsed.data.email,
        message: parsed.data.message,
        productId: parsed.data.productId || null,
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

    return NextResponse.json({ data: message }, { status: 201 })
  } catch (error) {
    console.error("POST /api/messages failed", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

