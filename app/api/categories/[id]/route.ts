import { NextResponse } from "next/server"
import { CategoryStatus } from "@prisma/client"
import { z } from "zod"
import { prisma } from "@/backend/db/prisma"
import { slugify } from "@/backend/utils/slugify"
import { requireAdminSession } from "@/backend/admin/admin-route"

const updateCategorySchema = z.object({
  name: z.string().trim().min(2).optional(),
  slug: z.string().trim().min(2).optional(),
  status: z.nativeEnum(CategoryStatus).optional(),
})

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminSession()
  if (auth.response) return auth.response

  try {
    const { id } = await params
    const body = await request.json()
    const parsed = updateCategorySchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Invalid category payload", errors: parsed.error.flatten() },
        { status: 400 },
      )
    }

    const existing = await prisma.category.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json({ message: "Category not found" }, { status: 404 })
    }

    const nextName = parsed.data.name ?? existing.name
    const nextSlug = slugify(parsed.data.slug ?? nextName)

    const duplicateSlug = await prisma.category.findFirst({
      where: {
        slug: nextSlug,
        id: { not: id },
      },
      select: { id: true },
    })

    if (duplicateSlug) {
      return NextResponse.json({ message: "Category slug already exists" }, { status: 409 })
    }

    const updated = await prisma.category.update({
      where: { id },
      data: {
        name: nextName,
        slug: nextSlug,
        status: parsed.data.status ?? existing.status,
      },
    })

    return NextResponse.json({ data: updated })
  } catch (error) {
    console.error("PATCH /api/categories/[id] failed", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminSession()
  if (auth.response) return auth.response

  try {
    const { id } = await params

    const category = await prisma.category.findUnique({
      where: { id },
      select: {
        id: true,
        _count: {
          select: { products: true },
        },
      },
    })

    if (!category) {
      return NextResponse.json({ message: "Category not found" }, { status: 404 })
    }

    if (category._count.products > 0) {
      return NextResponse.json(
        { message: "Cannot delete category with products. Remove products first." },
        { status: 400 },
      )
    }

    await prisma.category.delete({ where: { id } })
    return NextResponse.json({ message: "Category deleted" })
  } catch (error) {
    console.error("DELETE /api/categories/[id] failed", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
