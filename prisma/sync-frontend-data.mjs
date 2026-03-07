import fs from "node:fs"
import path from "node:path"
import vm from "node:vm"
import { fileURLToPath } from "node:url"
import { PrismaClient, CategoryStatus, StockStatus } from "@prisma/client"

const prisma = new PrismaClient()

function slugify(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}

function loadFrontendData() {
  const currentFile = fileURLToPath(import.meta.url)
  const rootDir = path.resolve(path.dirname(currentFile), "..")
  const dataFilePath = path.join(rootDir, "lib", "data.ts")
  const source = fs.readFileSync(dataFilePath, "utf-8")

  const interfacesStart = source.indexOf("export interface CategoryGroup")
  const dataStart = source.indexOf("export const categoryGroups")

  if (interfacesStart < 0 || dataStart < 0) {
    throw new Error("Could not parse lib/data.ts structure.")
  }

  const prefix = source.slice(0, interfacesStart)
  const dataPart = source.slice(dataStart)

  const executable = `${prefix}\n${dataPart}`
    .replace(/export const /g, "const ")
    .replace(/const\s+([a-zA-Z0-9_]+)\s*:[^=]+=/g, "const $1 =")
    .concat("\n;globalThis.__SYNC_DATA__ = { categoryGroups, products };")

  const sandbox = { globalThis: {} }
  vm.createContext(sandbox)
  vm.runInContext(executable, sandbox)

  const data = sandbox.globalThis.__SYNC_DATA__
  if (!data?.categoryGroups || !data?.products) {
    throw new Error("Failed to load categoryGroups/products from lib/data.ts")
  }

  return data
}

async function main() {
  const { categoryGroups, products } = loadFrontendData()

  const categoriesByGroupId = new Map()

  for (const group of categoryGroups) {
    const slug = slugify(group.id || group.name)
    const category = await prisma.category.upsert({
      where: { slug },
      create: {
        name: group.name,
        slug,
        status: CategoryStatus.ACTIVE,
      },
      update: {
        name: group.name,
        status: CategoryStatus.ACTIVE,
      },
    })

    categoriesByGroupId.set(group.id, category)
  }

  let syncedProducts = 0
  for (const product of products) {
    const category = categoriesByGroupId.get(product.categoryGroupId)
    if (!category) continue

    const imageUrl = Array.isArray(product.images) && product.images.length > 0 ? product.images[0] : null

    await prisma.product.upsert({
      where: { productCode: product.code },
      create: {
        name: product.name,
        categoryId: category.id,
        productCode: product.code,
        price: product.price,
        stockStatus: product.inStock ? StockStatus.IN_STOCK : StockStatus.OUT_OF_STOCK,
        shortDescription: product.shortDescription.slice(0, 300),
        fullDescription: product.description,
        imageUrl,
      },
      update: {
        name: product.name,
        categoryId: category.id,
        price: product.price,
        stockStatus: product.inStock ? StockStatus.IN_STOCK : StockStatus.OUT_OF_STOCK,
        shortDescription: product.shortDescription.slice(0, 300),
        fullDescription: product.description,
        imageUrl,
      },
    })

    syncedProducts += 1
  }

  console.log(`Synced ${categoryGroups.length} categories and ${syncedProducts} products from lib/data.ts`)
}

main()
  .catch((error) => {
    console.error("Frontend data sync failed:", error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
