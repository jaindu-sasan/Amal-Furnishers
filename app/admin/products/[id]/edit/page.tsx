"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { toast } from "sonner"
import { ProductForm, type ProductFormValues } from "@/components/admin/product-form"
import { AdminPageHeader } from "@/components/admin/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { parseApiResponse } from "@/lib/admin-api"
import type { Category, Product } from "@/lib/admin-types"

type CategoryListResponse = {
  data: Category[]
}

type ProductResponse = {
  data: Product
}

export default function EditProductPage() {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const productId = params.id

  const [categories, setCategories] = useState<Array<{ id: string; name: string }>>([])
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesResponse, productResponse] = await Promise.all([
          fetch("/api/categories", { cache: "no-store" }),
          fetch(`/api/products/${productId}`, { cache: "no-store" }),
        ])

        const categoriesPayload = await parseApiResponse<CategoryListResponse>(categoriesResponse)
        const productPayload = await parseApiResponse<ProductResponse>(productResponse)
        setCategories(categoriesPayload.data.map((category) => ({ id: category.id, name: category.name })))
        setProduct(productPayload.data)
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Failed to load product")
      } finally {
        setLoading(false)
      }
    }

    if (productId) {
      fetchData()
    }
  }, [productId])

  const handleSubmit = async (values: ProductFormValues) => {
    const response = await fetch(`/api/products/${productId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })

    await parseApiResponse(response)
    toast.success("Product updated")
    router.push("/admin/products")
    router.refresh()
  }

  return (
    <div>
      <AdminPageHeader
        title="Edit Product"
        description="Update product details and category assignment."
      />

      <Card>
        <CardContent className="p-4 md:p-6">
          {loading ? (
            <p className="text-sm text-muted-foreground">Loading product...</p>
          ) : !product ? (
            <p className="text-sm text-muted-foreground">Product not found.</p>
          ) : (
            <ProductForm
              categories={categories}
              initialValues={{
                name: product.name,
                categoryId: product.categoryId,
                productCode: product.productCode,
                price: product.price,
                stockStatus: product.stockStatus,
                shortDescription: product.shortDescription,
                fullDescription: product.fullDescription,
                imageUrl: product.imageUrl ?? "",
              }}
              submitLabel="Update Product"
              onSubmit={handleSubmit}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
