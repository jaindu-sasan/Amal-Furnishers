"use client"

import { useEffect, useState } from "react"
import { Pencil, Plus, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { AdminPageHeader } from "@/components/admin/page-header"
import { DeleteConfirmDialog } from "@/components/admin/delete-confirm-dialog"
import { StatusBadge } from "@/components/admin/status-badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { categoryStatusOptions } from "@/lib/admin-labels"
import type { Category, CategoryStatus } from "@/lib/admin-types"
import { parseApiResponse } from "@/lib/admin-api"

type CategoryListResponse = {
  data: Category[]
}

type CategoryPayload = {
  name: string
  slug: string
  status: CategoryStatus
}

const initialPayload: CategoryPayload = {
  name: "",
  slug: "",
  status: "ACTIVE",
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [createPayload, setCreatePayload] = useState<CategoryPayload>(initialPayload)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [editPayload, setEditPayload] = useState<CategoryPayload>(initialPayload)

  const loadCategories = async () => {
    try {
      const response = await fetch("/api/categories", { cache: "no-store" })
      const payload = await parseApiResponse<CategoryListResponse>(response)
      setCategories(payload.data)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to load categories")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCategories()
  }, [])

  const createCategory = async () => {
    setSubmitting(true)
    try {
      const response = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(createPayload),
      })
      await parseApiResponse(response)
      toast.success("Category created")
      setIsCreateOpen(false)
      setCreatePayload(initialPayload)
      await loadCategories()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to create category")
    } finally {
      setSubmitting(false)
    }
  }

  const updateCategory = async () => {
    if (!editingCategory) return

    setSubmitting(true)
    try {
      const response = await fetch(`/api/categories/${editingCategory.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editPayload),
      })
      await parseApiResponse(response)
      toast.success("Category updated")
      setEditingCategory(null)
      await loadCategories()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update category")
    } finally {
      setSubmitting(false)
    }
  }

  const deleteCategory = async (id: string) => {
    try {
      const response = await fetch(`/api/categories/${id}`, { method: "DELETE" })
      await parseApiResponse(response)
      toast.success("Category deleted")
      await loadCategories()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete category")
    }
  }

  return (
    <div>
      <AdminPageHeader
        title="Categories"
        description="Add, edit, and manage category status."
        action={
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Category
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Category</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div className="space-y-2">
                  <Label htmlFor="create-name">Name</Label>
                  <Input
                    id="create-name"
                    value={createPayload.name}
                    onChange={(event) =>
                      setCreatePayload((prev) => ({ ...prev, name: event.target.value }))
                    }
                    placeholder="Seating"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="create-slug">Slug (optional)</Label>
                  <Input
                    id="create-slug"
                    value={createPayload.slug}
                    onChange={(event) =>
                      setCreatePayload((prev) => ({ ...prev, slug: event.target.value }))
                    }
                    placeholder="seating"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select
                    value={createPayload.status}
                    onValueChange={(value) =>
                      setCreatePayload((prev) => ({ ...prev, status: value as CategoryStatus }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryStatusOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button onClick={createCategory} disabled={submitting}>
                  {submitting ? "Saving..." : "Create"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-20 text-center text-muted-foreground">
                    Loading categories...
                  </TableCell>
                </TableRow>
              ) : categories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-20 text-center text-muted-foreground">
                    No categories found.
                  </TableCell>
                </TableRow>
              ) : (
                categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell className="font-medium">{category.name}</TableCell>
                    <TableCell>{category.slug}</TableCell>
                    <TableCell>
                      <StatusBadge type="category" value={category.status} />
                    </TableCell>
                    <TableCell>{new Date(category.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Dialog
                          open={editingCategory?.id === category.id}
                          onOpenChange={(open) => {
                            if (!open) {
                              setEditingCategory(null)
                              return
                            }
                            setEditingCategory(category)
                            setEditPayload({
                              name: category.name,
                              slug: category.slug,
                              status: category.status,
                            })
                          }}
                        >
                          <DialogTrigger asChild>
                            <Button variant="outline" size="icon">
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Category</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 py-2">
                              <div className="space-y-2">
                                <Label>Name</Label>
                                <Input
                                  value={editPayload.name}
                                  onChange={(event) =>
                                    setEditPayload((prev) => ({ ...prev, name: event.target.value }))
                                  }
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Slug</Label>
                                <Input
                                  value={editPayload.slug}
                                  onChange={(event) =>
                                    setEditPayload((prev) => ({ ...prev, slug: event.target.value }))
                                  }
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Status</Label>
                                <Select
                                  value={editPayload.status}
                                  onValueChange={(value) =>
                                    setEditPayload((prev) => ({ ...prev, status: value as CategoryStatus }))
                                  }
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {categoryStatusOptions.map((option) => (
                                      <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                              </DialogClose>
                              <Button onClick={updateCategory} disabled={submitting}>
                                {submitting ? "Saving..." : "Save"}
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>

                        <DeleteConfirmDialog
                          title="Delete Category"
                          description="This action cannot be undone. Categories with products cannot be deleted."
                          onConfirm={() => deleteCategory(category.id)}
                          trigger={
                            <Button variant="outline" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          }
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
