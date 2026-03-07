import { PrismaClient, CategoryStatus, StockStatus, MessageStatus } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

function slugify(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}

async function main() {
  const passwordHash = await bcrypt.hash("admin123", 12)

  const admin = await prisma.adminUser.upsert({
    where: { email: "admin@amalfurnishers.com" },
    create: {
      email: "admin@amalfurnishers.com",
      name: "Admin User",
      passwordHash,
      isActive: true,
    },
    update: {
      name: "Admin User",
      passwordHash,
      isActive: true,
    },
  })

  const categoriesInput = [
    { name: "Seating", status: CategoryStatus.ACTIVE },
    { name: "Dining", status: CategoryStatus.ACTIVE },
    { name: "Office Furniture", status: CategoryStatus.ACTIVE },
    { name: "Outdoor Furniture", status: CategoryStatus.INACTIVE },
  ]

  const categories = []
  for (const category of categoriesInput) {
    const created = await prisma.category.upsert({
      where: { slug: slugify(category.name) },
      create: {
        name: category.name,
        slug: slugify(category.name),
        status: category.status,
      },
      update: {
        name: category.name,
        status: category.status,
      },
    })
    categories.push(created)
  }

  const seatingCategory = categories.find((item) => item.slug === "seating")
  const diningCategory = categories.find((item) => item.slug === "dining")

  if (!seatingCategory || !diningCategory) {
    throw new Error("Required seed categories are missing.")
  }

  const productsInput = [
    {
      productCode: "SOFA-001",
      name: "Premium Teak Sofa",
      categoryId: seatingCategory.id,
      price: "45000.00",
      stockStatus: StockStatus.IN_STOCK,
      shortDescription: "Luxurious 3-seater teak sofa with deep cushioning.",
      fullDescription:
        "Crafted from premium teak wood, this sofa combines elegance with comfort and durability.",
      imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500",
    },
    {
      productCode: "DINING-001",
      name: "Sheesham Dining Table",
      categoryId: diningCategory.id,
      price: "28000.00",
      stockStatus: StockStatus.MADE_TO_ORDER,
      shortDescription: "6-seater dining table with natural wood grain finish.",
      fullDescription:
        "Beautiful sheesham wood dining table designed for modern and traditional homes.",
      imageUrl: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=500",
    },
  ]

  const seededProducts = []
  for (const product of productsInput) {
    const created = await prisma.product.upsert({
      where: { productCode: product.productCode },
      create: product,
      update: product,
    })
    seededProducts.push(created)
  }

  const firstProduct = seededProducts[0]
  await prisma.message.create({
    data: {
      customerName: "John Smith",
      phone: "+1 555-0123",
      email: "john@example.com",
      message: "Please share a quotation for this sofa with custom finish options.",
      productId: firstProduct?.id,
      status: MessageStatus.UNREAD,
    },
  })

  console.log("Seed completed.")
  console.log("Admin email:", admin.email)
  console.log("Admin password:", "admin123")
}

main()
  .catch((error) => {
    console.error("Seed failed:", error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
