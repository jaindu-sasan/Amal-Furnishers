"use client"

import { useMemo, useState } from "react"
import type { FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { stockStatusOptions } from "@/lib/admin-labels"
import type { ProductStockStatus } from "@/lib/admin-types"

export type ProductFormValues = {
  name: string
  categoryId: string
  productCode: string
  price: number
  stockStatus: ProductStockStatus
  shortDescription: string
  fullDescription: string
  imageUrl: string
}

type CategoryOption = {
  id: string
  name: string
}

type ProductFormProps = {
  categories: CategoryOption[]
  initialValues?: Partial<ProductFormValues>
  submitLabel: string
  onSubmit: (values: ProductFormValues) => Promise<void> | void
}

export function ProductForm({ categories, initialValues, submitLabel, onSubmit }: ProductFormProps) {
  const defaultValues: ProductFormValues = useMemo(
    () => ({
      name: initialValues?.name ?? "",
      categoryId: initialValues?.categoryId ?? "",
      productCode: initialValues?.productCode ?? "",
      price: initialValues?.price ?? 0,
      stockStatus: initialValues?.stockStatus ?? "IN_STOCK",
      shortDescription: initialValues?.shortDescription ?? "",
      fullDescription: initialValues?.fullDescription ?? "",
      imageUrl: initialValues?.imageUrl ?? "",
    }),
    [initialValues],
  )

  const [formData, setFormData] = useState<ProductFormValues>(defaultValues)
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSaving(true)
    try {
      await onSubmit(formData)
    } finally {
      setSaving(false)
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Product Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
            placeholder="Premium Teak Sofa"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="productCode">Product Code</Label>
          <Input
            id="productCode"
            value={formData.productCode}
            onChange={(event) => setFormData((prev) => ({ ...prev, productCode: event.target.value }))}
            placeholder="SOFA-001"
            required
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label>Category</Label>
          <Select
            value={formData.categoryId}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, categoryId: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            type="number"
            min={0}
            step="0.01"
            value={formData.price}
            onChange={(event) => setFormData((prev) => ({ ...prev, price: Number(event.target.value) }))}
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Stock Status</Label>
          <Select
            value={formData.stockStatus}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, stockStatus: value as ProductStockStatus }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {stockStatusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="shortDescription">Short Description</Label>
        <Input
          id="shortDescription"
          value={formData.shortDescription}
          onChange={(event) => setFormData((prev) => ({ ...prev, shortDescription: event.target.value }))}
          placeholder="Short one-line description"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="fullDescription">Full Description</Label>
        <Textarea
          id="fullDescription"
          value={formData.fullDescription}
          onChange={(event) => setFormData((prev) => ({ ...prev, fullDescription: event.target.value }))}
          placeholder="Detailed product description"
          rows={5}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="imageUrl">Image URL</Label>
        <Input
          id="imageUrl"
          value={formData.imageUrl}
          onChange={(event) => setFormData((prev) => ({ ...prev, imageUrl: event.target.value }))}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={saving}>
          {saving ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  )
}
