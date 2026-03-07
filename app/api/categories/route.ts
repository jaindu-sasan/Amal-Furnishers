import { NextResponse } from "next/server"
import { CategoryStatus } from "@prisma/client"
import { z } from "zod"
import { prisma } from "@/backend/db/prisma"
import { slugify } from "@/backend/utils/slugify"
import { requireAdminSession } from "@/backend/admin/admin-route"

const categorySchema = z.object({
  name: z.string().trim().min(2),
  slug: z.string().trim().min(2).optional(),
  status: z.nativeEnum(CategoryStatus).optional(),
})

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const statusParam = searchParams.get("status")
    const status = statusParam && statusParam in CategoryStatus
      ? (statusParam as CategoryStatus)
      : undefined

    const categories = await prisma.category.findMany({
      where: status ? { status } : undefined,
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json({ data: categories })
  } catch (error) {
    console.error("GET /api/categories failed", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const auth = await requireAdminSession()
  if (auth.response) return auth.response

  try {
    const body = await request.json()
    const parsed = categorySchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Invalid category payload", errors: parsed.error.flatten() },
        { status: 400 },
      )
    }

    const slug = slugify(parsed.data.slug || parsed.data.name)
    const existing = await prisma.category.findUnique({ where: { slug } })

    if (existing) {
      return NextResponse.json({ message: "Category slug already exists" }, { status: 409 })
    }

    const category = await prisma.category.create({
      data: {
        name: parsed.data.name,
        slug,
        status: parsed.data.status ?? CategoryStatus.ACTIVE,
      },
    })

    return NextResponse.json({ data: category }, { status: 201 })
  } catch (error) {
    console.error("POST /api/categories failed", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

