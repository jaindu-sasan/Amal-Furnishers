"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react"
import { PHONE_NUMBER, EMAIL, ADDRESS, WHATSAPP_NUMBER, WORKING_HOURS } from "@/lib/data"
import { parseApiResponse } from "@/lib/admin-api"
import type { Category } from "@/lib/admin-types"

type CategoryListResponse = {
  data: Category[]
}

export function Footer() {
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await fetch("/api/categories?status=ACTIVE", { cache: "no-store" })
        const payload = await parseApiResponse<CategoryListResponse>(response)
        setCategories(payload.data)
      } catch {
        setCategories([])
      }
    }

    loadCategories()
  }, [])

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <span className="font-serif text-lg font-bold text-primary-foreground">L</span>
              </div>
              <span className="font-serif text-xl font-bold text-secondary-foreground">LuxeCraft</span>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-secondary-foreground/70">
              Handcrafted premium furniture for discerning homes and businesses. Every piece tells a story of master craftsmanship.
            </p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              <MessageCircle className="h-4 w-4" />
              Chat on WhatsApp
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-secondary-foreground">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/products", label: "Products" },
                { href: "/projects", label: "Projects" },
                { href: "/about", label: "About Us" },
                { href: "/customization", label: "Customization" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-secondary-foreground/70 transition-colors hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-secondary-foreground">Categories</h4>
            <ul className="space-y-2">
              {categories.slice(0, 6).map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/products?category=${category.slug}`}
                    className="text-sm text-secondary-foreground/70 transition-colors hover:text-primary"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-secondary-foreground">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-sm text-secondary-foreground/70">{PHONE_NUMBER}</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-sm text-secondary-foreground/70">{EMAIL}</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-sm text-secondary-foreground/70">{ADDRESS}</span>
              </li>
            </ul>
            <p className="mt-4 text-xs text-secondary-foreground/50">{WORKING_HOURS}</p>
          </div>
        </div>

        <div className="mt-12 border-t border-secondary-foreground/10 pt-8 text-center">
          <p className="text-sm text-secondary-foreground/50">
            &copy; {new Date().getFullYear()} LuxeCraft Furniture. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
