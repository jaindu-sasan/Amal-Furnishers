import { Badge } from "@/components/ui/badge"
import type { CategoryStatus, MessageStatus, ProductStockStatus } from "@/lib/admin-types"

type StatusBadgeProps =
  | { type: "category"; value: CategoryStatus }
  | { type: "product"; value: ProductStockStatus }
  | { type: "message"; value: MessageStatus }

const labelByStatus: Record<string, string> = {
  ACTIVE: "Active",
  INACTIVE: "Inactive",
  IN_STOCK: "In Stock",
  OUT_OF_STOCK: "Out of Stock",
  MADE_TO_ORDER: "Made to Order",
  READ: "Read",
  UNREAD: "Unread",
}

const variantByStatus: Record<string, "default" | "secondary" | "outline"> = {
  ACTIVE: "default",
  INACTIVE: "secondary",
  IN_STOCK: "default",
  OUT_OF_STOCK: "secondary",
  MADE_TO_ORDER: "outline",
  READ: "secondary",
  UNREAD: "default",
}

export function StatusBadge({ value }: StatusBadgeProps) {
  return <Badge variant={variantByStatus[value]}>{labelByStatus[value]}</Badge>
}
