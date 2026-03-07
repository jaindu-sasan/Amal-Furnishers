export type CategoryStatus = "ACTIVE" | "INACTIVE"
export type ProductStockStatus = "IN_STOCK" | "OUT_OF_STOCK" | "MADE_TO_ORDER"
export type MessageStatus = "READ" | "UNREAD"

export type Category = {
  id: string
  name: string
  slug: string
  status: CategoryStatus
  createdAt: string
  updatedAt: string
}

export type Product = {
  id: string
  name: string
  categoryId: string
  productCode: string
  price: number
  stockStatus: ProductStockStatus
  shortDescription: string
  fullDescription: string
  imageUrl: string | null
  createdAt: string
  updatedAt: string
  category: Category | null
}

export type Message = {
  id: string
  customerName: string
  phone: string
  email: string
  message: string
  productId: string | null
  status: MessageStatus
  createdAt: string
  updatedAt: string
  product: Pick<Product, "id" | "name" | "productCode"> | null
}

export type AdminSessionUser = {
  userId: string
  email: string
  name: string | null
}
