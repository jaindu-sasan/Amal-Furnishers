import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import { prisma } from "@/backend/db/prisma"
import { WHATSAPP_NUMBER } from "@/lib/data"
import { InquiryDialog } from "@/components/product/inquiry-dialog"
import { Separator } from "@/components/ui/separator"

function formatStock(stockStatus: "IN_STOCK" | "OUT_OF_STOCK" | "MADE_TO_ORDER") {
  if (stockStatus === "IN_STOCK") return "In Stock"
  if (stockStatus === "OUT_OF_STOCK") return "Out of Stock"
  return "Made to Order"
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: true },
  })

  if (!product || !product.category || product.category.status !== "ACTIVE") {
    notFound()
  }

  const relatedProducts = await prisma.product.findMany({
    where: {
      categoryId: product.categoryId,
      id: { not: product.id },
      category: { status: "ACTIVE" },
    },
    include: { category: true },
    orderBy: { createdAt: "desc" },
    take: 4,
  })

  const imageUrl = product.imageUrl || "/placeholder.jpg"

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-primary">Products</Link>
        <span>/</span>
        <Link href={`/products?category=${product.category.slug}`} className="hover:text-primary">
          {product.category.name}
        </Link>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </div>

      <Link href="/products" className="mb-6 inline-flex items-center gap-1 text-sm text-primary hover:underline">
        <ChevronLeft className="h-4 w-4" />
        Back to Products
      </Link>

      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <div className="relative aspect-square overflow-hidden rounded-xl border border-border bg-card">
            <Image src={imageUrl} alt={product.name} fill className="object-cover" />
          </div>
        </div>

        <div>
          <p className="mb-1 text-sm text-muted-foreground">Code: {product.productCode}</p>
          <h1 className="mb-2 font-serif text-3xl font-bold text-foreground">{product.name}</h1>
          <p className="mb-6 text-3xl font-bold text-primary">
            LKR{product.price.toNumber().toLocaleString()}
          </p>
          <p className="mb-6 leading-relaxed text-muted-foreground">{product.fullDescription}</p>

          <Separator className="my-6" />

          <div className="mb-6 grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Category</span>
              <p className="font-medium text-foreground">{product.category.name}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Availability</span>
              <p
                className={`font-medium ${
                  product.stockStatus === "IN_STOCK" ? "text-primary" : "text-destructive"
                }`}
              >
                {formatStock(product.stockStatus)}
              </p>
            </div>
          </div>

          <InquiryDialog
            productId={product.id}
            productName={product.name}
            productCode={product.productCode}
            whatsappNumber={WHATSAPP_NUMBER}
          />
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 font-serif text-2xl font-bold text-foreground">Related Products</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((relatedProduct) => (
              <Link
                key={relatedProduct.id}
                href={`/products/${relatedProduct.id}`}
                className="group overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-lg"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={relatedProduct.imageUrl || "/placeholder.jpg"}
                    alt={relatedProduct.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="mb-1 text-sm font-medium text-card-foreground group-hover:text-primary">
                    {relatedProduct.name}
                  </h3>
                  <span className="text-sm font-bold text-primary">
                    LKR{relatedProduct.price.toNumber().toLocaleString()}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
