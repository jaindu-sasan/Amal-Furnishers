"use client"

import { use, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Calendar, Users, ArrowLeft, Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { projects, products } from "@/lib/data"
import { Button } from "@/components/ui/button"

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const project = projects.find((p) => p.id === id)
  const [activeTab, setActiveTab] = useState<"gallery" | "before" | "after">("gallery")

  if (!project) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        <h1 className="font-serif text-2xl font-bold text-foreground">Project Not Found</h1>
        <Link href="/projects" className="mt-4 text-primary hover:underline">
          Back to Projects
        </Link>
      </div>
    )
  }

  const usedProducts = products.filter((p) => project.productsUsed.includes(p.id))

  const getActiveImages = () => {
    switch (activeTab) {
      case "before": return project.beforeImages
      case "after": return project.afterImages
      default: return project.images
    }
  }

  return (
    <main>
      {/* Back Link */}
      <div className="mx-auto max-w-7xl px-4 pt-8">
        <Link href="/projects" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </Link>
      </div>

      {/* Header */}
      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              {project.clientType}
            </span>
            <h1 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl">
              {project.title}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {project.location}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {project.completionYear}
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {project.clientType}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Tabs */}
      <section className="mx-auto max-w-7xl px-4 pb-12">
        <div className="mb-6 flex gap-2">
          {(["gallery", "before", "after"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-lg px-4 py-2 text-sm font-medium capitalize transition-colors ${
                activeTab === tab
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-accent"
              }`}
            >
              {tab === "gallery" ? "Main Gallery" : `${tab} Photos`}
            </button>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {getActiveImages().map((img, i) => (
            <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-xl">
              <Image src={img} alt={`${project.title} - ${activeTab} ${i + 1}`} fill className="object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* Description */}
      <section className="mx-auto max-w-7xl px-4 pb-12">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="font-serif text-2xl font-semibold text-foreground">About This Project</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {project.description}
            </p>
          </div>
          <div>
            <h3 className="font-serif text-lg font-semibold text-foreground">Project Details</h3>
            <dl className="mt-4 space-y-3">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Location</dt>
                <dd className="mt-1 text-sm text-foreground">{project.location}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Year Completed</dt>
                <dd className="mt-1 text-sm text-foreground">{project.completionYear}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Client Type</dt>
                <dd className="mt-1 text-sm text-foreground">{project.clientType}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Products Used</dt>
                <dd className="mt-1 text-sm text-foreground">{usedProducts.length} pieces</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Products Used */}
      {usedProducts.length > 0 && (
        <section className="border-t border-border bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 py-12">
            <h2 className="font-serif text-2xl font-semibold text-foreground">Products Used</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {usedProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="group flex gap-4 rounded-lg border border-border bg-card p-4 transition-shadow hover:shadow-md"
                >
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
                    <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">{product.name}</h4>
                    <p className="text-sm text-muted-foreground">{product.code}</p>
                    <p className="mt-1 text-sm font-semibold text-primary">${product.price.toLocaleString()}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonial */}
      {project.testimonial && (
        <section className="bg-secondary">
          <div className="mx-auto max-w-3xl px-4 py-16 text-center">
            <Quote className="mx-auto h-10 w-10 text-primary/60" />
            <blockquote className="mt-6 font-serif text-xl leading-relaxed text-secondary-foreground italic md:text-2xl">
              &ldquo;{project.testimonial.text}&rdquo;
            </blockquote>
            <div className="mt-6">
              <p className="font-semibold text-secondary-foreground">{project.testimonial.author}</p>
              <p className="text-sm text-secondary-foreground/60">{project.testimonial.role}</p>
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
