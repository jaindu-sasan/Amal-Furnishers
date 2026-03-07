"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { ProductForm, type ProductFormValues } from "@/components/admin/product-form"
import { AdminPageHeader } from "@/components/admin/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { parseApiResponse } from "@/lib/admin-api"
import type { Category } from "@/lib/admin-types"

type CategoryListResponse = {
  data: Category[]
}

export default function NewProductPage() {
  const router = useRouter()
  const [categories, setCategories] = useState<Array<{ id: string; name: string }>>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories", { cache: "no-store" })
        const payload = await parseApiResponse<CategoryListResponse>(response)
        setCategories(payload.data.map((category) => ({ id: category.id, name: category.name })))
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Failed to load categories")
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  const handleSubmit = async (values: ProductFormValues) => {
    const response = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })

    await parseApiResponse(response)
    toast.success("Product created")
    router.push("/admin/products")
    router.refresh()
  }

  return (
    <div>
      <AdminPageHeader
        title="New Product"
        description="Add a new product under an existing category."
      />

      <Card>
        <CardContent className="p-4 md:p-6">
          {loading ? (
            <p className="text-sm text-muted-foreground">Loading categories...</p>
          ) : (
            <ProductForm categories={categories} submitLabel="Create Product" onSubmit={handleSubmit} />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
