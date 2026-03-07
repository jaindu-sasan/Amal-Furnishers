import { NextResponse } from "next/server"
import { StockStatus } from "@prisma/client"
import { z } from "zod"
import { prisma } from "@/backend/db/prisma"
import { requireAdminSession } from "@/backend/admin/admin-route"

const updateProductSchema = z.object({
  name: z.string().trim().min(2).optional(),
  categoryId: z.string().min(1).optional(),
  productCode: z.string().trim().min(2).optional(),
  price: z.preprocess((value) => Number(value), z.number().nonnegative()).optional(),
  stockStatus: z.nativeEnum(StockStatus).optional(),
  shortDescription: z.string().trim().min(2).max(300).optional(),
  fullDescription: z.string().trim().min(2).optional(),
  imageUrl: z.string().trim().url().optional().or(z.literal("")),
})

function serializeProduct(product: {
  id: string
  name: string
  categoryId: string
  productCode: string
  price: { toNumber: () => number }
  stockStatus: StockStatus
  shortDescription: string
  fullDescription: string
  imageUrl: string | null
  createdAt: Date
  updatedAt: Date
  category: { id: string; name: string; slug: string; status: string } | null
}) {
  return {
    ...product,
    price: product.price.toNumber(),
  }
}

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    const product = await prisma.product.findUnique({
      where: { id },
      include: { category: true },
    })

    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 })
    }

    return NextResponse.json({ data: serializeProduct(product) })
  } catch (error) {
    console.error("GET /api/products/[id] failed", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminSession()
  if (auth.response) return auth.response

  try {
    const { id } = await params
    const body = await request.json()
    const parsed = updateProductSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Invalid product payload", errors: parsed.error.flatten() },
        { status: 400 },
      )
    }

    const existing = await prisma.product.findUnique({
      where: { id },
      select: { id: true, productCode: true, categoryId: true },
    })

    if (!existing) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 })
    }

    if (parsed.data.categoryId) {
      const categoryExists = await prisma.category.findUnique({
        where: { id: parsed.data.categoryId },
        select: { id: true },
      })
      if (!categoryExists) {
        return NextResponse.json({ message: "Category not found" }, { status: 404 })
      }
    }

    if (parsed.data.productCode && parsed.data.productCode !== existing.productCode) {
      const codeConflict = await prisma.product.findUnique({
        where: { productCode: parsed.data.productCode },
        select: { id: true },
      })
      if (codeConflict) {
        return NextResponse.json({ message: "Product code already exists" }, { status: 409 })
      }
    }

    const updated = await prisma.product.update({
      where: { id },
      data: {
        ...(parsed.data.name ? { name: parsed.data.name } : {}),
        ...(parsed.data.categoryId ? { categoryId: parsed.data.categoryId } : {}),
        ...(parsed.data.productCode ? { productCode: parsed.data.productCode } : {}),
        ...(typeof parsed.data.price === "number" ? { price: parsed.data.price } : {}),
        ...(parsed.data.stockStatus ? { stockStatus: parsed.data.stockStatus } : {}),
        ...(parsed.data.shortDescription ? { shortDescription: parsed.data.shortDescription } : {}),
        ...(parsed.data.fullDescription ? { fullDescription: parsed.data.fullDescription } : {}),
        ...(typeof parsed.data.imageUrl !== "undefined" ? { imageUrl: parsed.data.imageUrl || null } : {}),
      },
      include: {
        category: true,
      },
    })

    return NextResponse.json({ data: serializeProduct(updated) })
  } catch (error) {
    console.error("PATCH /api/products/[id] failed", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminSession()
  if (auth.response) return auth.response

  try {
    const { id } = await params
    const product = await prisma.product.findUnique({ where: { id }, select: { id: true } })

    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 })
    }

    await prisma.product.delete({ where: { id } })
    return NextResponse.json({ message: "Product deleted" })
  } catch (error) {
    console.error("DELETE /api/products/[id] failed", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
