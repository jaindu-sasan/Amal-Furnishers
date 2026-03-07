"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { parseApiResponse } from "@/lib/admin-api"
import type { Category, Product } from "@/lib/admin-types"

type CategoryListResponse = {
  data: Category[]
}

type ProductListResponse = {
  data: Product[]
}

export function MainNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openGroup, setOpenGroup] = useState<string | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const loadNavData = async () => {
      try {
        const [categoriesResponse, productsResponse] = await Promise.all([
          fetch("/api/categories?status=ACTIVE", { cache: "no-store" }),
          fetch("/api/products", { cache: "no-store" }),
        ])

        const categoriesPayload = await parseApiResponse<CategoryListResponse>(categoriesResponse)
        const productsPayload = await parseApiResponse<ProductListResponse>(productsResponse)

        setCategories(categoriesPayload.data)
        setProducts(
          productsPayload.data.filter((product) => product.category?.status === "ACTIVE"),
        )
      } catch {
        setCategories([])
        setProducts([])
      }
    }

    loadNavData()
  }, [])

  const productsByCategoryId = useMemo(() => {
    const grouped = new Map<string, Product[]>()
    for (const product of products) {
      const categoryId = product.category?.id
      if (!categoryId) continue
      const list = grouped.get(categoryId) ?? []
      list.push(product)
      grouped.set(categoryId, list)
    }

    for (const [categoryId, list] of grouped) {
      grouped.set(
        categoryId,
        [...list].sort((firstProduct, secondProduct) =>
          firstProduct.name.localeCompare(secondProduct.name),
        ),
      )
    }

    return grouped
  }, [products])

  const dedupedCategories = useMemo(() => {
    const seen = new Set<string>()
    const result: Category[] = []

    for (const category of categories) {
      if (category.status !== "ACTIVE") continue
      const key = category.name.trim().toLowerCase()
      if (seen.has(key)) continue
      seen.add(key)
      result.push(category)
    }

    return result
  }, [categories])

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center px-4 py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <Image
              src="/Amallogo.png"
              alt="AMAL FURNISHERS PVT LTD"
              width={180}
              height={56}
              className="h-10 md:h-11 w-auto"
              priority
            />
            <span className="hidden xl:block text-xs font-bold tracking-wide text-foreground">
              AMAL FURNISHERS PVT LTD
            </span>
          </Link>

        {/* Desktop Nav */}
        <nav className="hidden min-w-0 flex-1 flex-wrap items-center gap-x-5 gap-y-2 lg:ml-6 lg:flex">
          <Link href="/" className="whitespace-nowrap text-sm font-medium uppercase tracking-wider text-foreground transition-colors hover:text-primary">
            Home
          </Link>

          {dedupedCategories.map((category) => (
            <div
              key={category.id}
              className="relative"
              onMouseEnter={() => setOpenGroup(category.id)}
              onMouseLeave={() => setOpenGroup(null)}
            >
              <Link
                href={`/products?category=${category.slug}`}
                className="flex items-center gap-1 whitespace-nowrap text-sm font-medium uppercase tracking-wider text-foreground transition-colors hover:text-primary"
              >
                {category.name}
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${openGroup === category.id ? "rotate-180" : ""}`} />
              </Link>

              {openGroup === category.id && (
                <div className="absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 pt-2">
                  <div className="rounded-md border border-border bg-card p-2 shadow-lg">
                    {(productsByCategoryId.get(category.id) ?? []).slice(0, 8).map((product) => (
                      <Link
                        key={product.id}
                        href={`/products/${product.id}`}
                        className="block rounded px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                      >
                        {product.name}
                      </Link>
                    ))}
                    {(productsByCategoryId.get(category.id) ?? []).length === 0 && (
                      <p className="px-3 py-2 text-sm text-muted-foreground">No items yet</p>
                    )}
                    <Link
                      href={`/products?category=${category.slug}`}
                      className="mt-1 block rounded px-3 py-2 text-sm font-medium text-primary transition-colors hover:bg-accent"
                    >
                      View all {category.name}
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <div className="ml-auto flex items-center lg:hidden">
          {/* Mobile menu */}
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="border-t border-border bg-card px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-2">
            <Link href="/" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent">Home</Link>
            {/* Mobile Categories */}
            <div className="mt-2 border-t border-border pt-2">
              <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Categories</p>
              {dedupedCategories.map((category) => (
                <Link
                  key={category.id}
                  href={`/products?category=${category.slug}`}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-3 py-1.5 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
