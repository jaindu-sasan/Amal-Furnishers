"use client"

import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { SlidersHorizontal, X } from "lucide-react"
import { parseApiResponse } from "@/lib/admin-api"
import type { Category, Product } from "@/lib/admin-types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"

type ProductListResponse = {
  data: Product[]
}

type CategoryListResponse = {
  data: Category[]
}

const DEFAULT_MAX_PRICE = 10000

function formatStock(stockStatus: Product["stockStatus"]) {
  if (stockStatus === "IN_STOCK") return "In Stock"
  if (stockStatus === "OUT_OF_STOCK") return "Out of Stock"
  return "Made to Order"
}

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get("category") || ""
  const initialSearch = searchParams.get("search") || ""

  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)

  const [category, setCategory] = useState(initialCategory)
  const [inStockOnly, setInStockOnly] = useState(false)
  const [search, setSearch] = useState(initialSearch)
  const [sortBy, setSortBy] = useState("default")
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, DEFAULT_MAX_PRICE])

  const activeCategories = useMemo(
    () => categories.filter((currentCategory) => currentCategory.status === "ACTIVE"),
    [categories],
  )

  const maxPrice = useMemo(() => {
    if (products.length === 0) return DEFAULT_MAX_PRICE
    return Math.max(...products.map((product) => product.price))
  }, [products])

  useEffect(() => {
    const roundedMax = Math.max(100, Math.ceil(maxPrice / 100) * 100)
    setPriceRange([0, roundedMax])
  }, [maxPrice])

  useEffect(() => {
    const loadCatalog = async () => {
      try {
        const [productsResponse, categoriesResponse] = await Promise.all([
          fetch("/api/products", { cache: "no-store" }),
          fetch("/api/categories?status=ACTIVE", { cache: "no-store" }),
        ])

        const productsPayload = await parseApiResponse<ProductListResponse>(productsResponse)
        const categoriesPayload = await parseApiResponse<CategoryListResponse>(categoriesResponse)

        setProducts(productsPayload.data)
        setCategories(categoriesPayload.data)
      } catch (error) {
        setLoadError(error instanceof Error ? error.message : "Failed to load products")
      } finally {
        setLoading(false)
      }
    }

    loadCatalog()
  }, [])

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => product.category?.status === "ACTIVE")

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(q) ||
          product.shortDescription.toLowerCase().includes(q) ||
          product.productCode.toLowerCase().includes(q),
      )
    }

    if (category) {
      result = result.filter(
        (product) => product.categoryId === category || product.category?.slug === category,
      )
    }

    if (inStockOnly) {
      result = result.filter((product) => product.stockStatus === "IN_STOCK")
    }

    result = result.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1],
    )

    switch (sortBy) {
      case "price-asc":
        result.sort((firstProduct, secondProduct) => firstProduct.price - secondProduct.price)
        break
      case "price-desc":
        result.sort((firstProduct, secondProduct) => secondProduct.price - firstProduct.price)
        break
      case "name":
        result.sort((firstProduct, secondProduct) => firstProduct.name.localeCompare(secondProduct.name))
        break
    }

    return result
  }, [category, inStockOnly, priceRange, products, search, sortBy])

  const clearFilters = () => {
    setCategory("")
    setInStockOnly(false)
    setSearch("")
    setSortBy("default")
    const roundedMax = Math.max(100, Math.ceil(maxPrice / 100) * 100)
    setPriceRange([0, roundedMax])
  }

  const sliderMax = Math.max(100, Math.ceil(maxPrice / 100) * 100)

  const FilterSidebar = () => (
    <div className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-medium text-foreground">Search</label>
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-foreground">Category</label>
        <Select value={category || "all"} onValueChange={(value) => setCategory(value === "all" ? "" : value)}>
          <SelectTrigger><SelectValue placeholder="All Categories" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {activeCategories.map((currentCategory) => (
              <SelectItem key={currentCategory.id} value={currentCategory.slug}>
                {currentCategory.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-foreground">
          Price Range: LKR{priceRange[0].toLocaleString()} - LKR{priceRange[1].toLocaleString()}
        </label>
        <Slider
          value={priceRange}
          min={0}
          max={sliderMax}
          step={100}
          onValueChange={(value) => setPriceRange([value[0], value[1]])}
          className="mt-2"
        />
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          id="inStock"
          checked={inStockOnly}
          onCheckedChange={(checked) => setInStockOnly(Boolean(checked))}
        />
        <label htmlFor="inStock" className="text-sm text-foreground">In Stock Only</label>
      </div>

      <Button variant="outline" size="sm" onClick={clearFilters} className="w-full">
        Clear All Filters
      </Button>
    </div>
  )

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">Our Products</h1>
        <p className="mt-2 text-muted-foreground">
          Discover our collection of {loading ? "..." : products.length} furniture pieces
        </p>
      </div>

      <div className="flex gap-8">
        <aside className="hidden w-72 shrink-0 lg:block">
          <div className="sticky top-28 rounded-xl border border-border bg-card p-6">
            <h3 className="mb-4 font-semibold text-card-foreground">Filters</h3>
            <FilterSidebar />
          </div>
        </aside>

        <div className="flex-1">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {loading ? "Loading products..." : `${filteredProducts.length} products found`}
            </p>
            <div className="flex items-center gap-3">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon" className="lg:hidden" onClick={() => setFiltersOpen(true)}>
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {loading ? (
            <div className="py-20 text-center">
              <p className="text-lg font-medium text-muted-foreground">Loading products...</p>
            </div>
          ) : loadError ? (
            <div className="py-20 text-center">
              <p className="text-lg font-medium text-destructive">{loadError}</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-lg font-medium text-muted-foreground">No products match your filters</p>
              <Button variant="link" onClick={clearFilters} className="mt-2">Clear all filters</Button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="group overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-lg"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={product.imageUrl || "/placeholder.jpg"}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {product.stockStatus !== "IN_STOCK" && (
                      <span className="absolute left-3 top-3 rounded-full bg-destructive px-3 py-1 text-xs font-medium text-destructive-foreground">
                        {formatStock(product.stockStatus)}
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="mb-1 text-xs text-muted-foreground">{product.productCode}</p>
                    <h3 className="mb-1 font-medium text-card-foreground group-hover:text-primary">{product.name}</h3>
                    <p className="mb-3 text-xs leading-relaxed text-muted-foreground line-clamp-2">{product.shortDescription}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-primary">LKR{product.price.toLocaleString()}</span>
                      <span className="text-xs text-muted-foreground">{product.category?.name || "Uncategorized"}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {filtersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-foreground/50" onClick={() => setFiltersOpen(false)} />
          <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-2xl bg-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold text-card-foreground">Filters</h3>
              <button type="button" onClick={() => setFiltersOpen(false)}>
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
            <FilterSidebar />
            <Button className="mt-4 w-full" onClick={() => setFiltersOpen(false)}>Apply Filters</Button>
          </div>
        </div>
      )}
    </div>
  )
}
