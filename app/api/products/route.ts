import { NextResponse } from "next/server"
import { StockStatus } from "@prisma/client"
import { z } from "zod"
import { prisma } from "@/backend/db/prisma"
import { requireAdminSession } from "@/backend/admin/admin-route"

const productSchema = z.object({
  name: z.string().trim().min(2),
  categoryId: z.string().min(1),
  productCode: z.string().trim().min(2),
  price: z.preprocess((value) => Number(value), z.number().nonnegative()),
  stockStatus: z.nativeEnum(StockStatus),
  shortDescription: z.string().trim().min(2).max(300),
  fullDescription: z.string().trim().min(2),
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

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const categoryId = searchParams.get("categoryId")
    const search = searchParams.get("search")

    const products = await prisma.product.findMany({
      where: {
        ...(categoryId ? { categoryId } : {}),
        ...(search
          ? {
              OR: [
                { name: { contains: search } },
                { productCode: { contains: search } },
              ],
            }
          : {}),
      },
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json({ data: products.map(serializeProduct) })
  } catch (error) {
    console.error("GET /api/products failed", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const auth = await requireAdminSession()
  if (auth.response) return auth.response

  try {
    const body = await request.json()
    const parsed = productSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Invalid product payload", errors: parsed.error.flatten() },
        { status: 400 },
      )
    }

    const category = await prisma.category.findUnique({
      where: { id: parsed.data.categoryId },
      select: { id: true },
    })

    if (!category) {
      return NextResponse.json({ message: "Category not found" }, { status: 404 })
    }

    const existingCode = await prisma.product.findUnique({
      where: { productCode: parsed.data.productCode },
      select: { id: true },
    })

    if (existingCode) {
      return NextResponse.json({ message: "Product code already exists" }, { status: 409 })
    }

    const created = await prisma.product.create({
      data: {
        name: parsed.data.name,
        categoryId: parsed.data.categoryId,
        productCode: parsed.data.productCode,
        price: parsed.data.price,
        stockStatus: parsed.data.stockStatus,
        shortDescription: parsed.data.shortDescription,
        fullDescription: parsed.data.fullDescription,
        imageUrl: parsed.data.imageUrl || null,
      },
      include: {
        category: true,
      },
    })

    return NextResponse.json({ data: serializeProduct(created) }, { status: 201 })
  } catch (error) {
    console.error("POST /api/products failed", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

