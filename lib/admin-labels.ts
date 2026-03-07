import type { CategoryStatus, MessageStatus, ProductStockStatus } from "@/lib/admin-types"

export const categoryStatusOptions: Array<{ value: CategoryStatus; label: string }> = [
  { value: "ACTIVE", label: "Active" },
  { value: "INACTIVE", label: "Inactive" },
]

export const stockStatusOptions: Array<{ value: ProductStockStatus; label: string }> = [
  { value: "IN_STOCK", label: "In Stock" },
  { value: "OUT_OF_STOCK", label: "Out of Stock" },
  { value: "MADE_TO_ORDER", label: "Made to Order" },
]

export const messageStatusOptions: Array<{ value: MessageStatus; label: string }> = [
  { value: "UNREAD", label: "Unread" },
  { value: "READ", label: "Read" },
]
