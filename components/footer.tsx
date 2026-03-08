"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react"
import { COMPANY_NAME, PHONE_NUMBERS, EMAIL, ADDRESS, WHATSAPP_NUMBER, WHATSAPP_CONTACTS, WORKING_HOURS } from "@/lib/data"
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
            <Link href="/" className="mb-4 inline-flex items-center">
              <Image
                src="/Amallogo.png"
                alt={COMPANY_NAME}
                width={180}
                height={56}
                className="h-12 w-auto"
              />
            </Link>
            <p className="mb-6 text-sm leading-relaxed text-secondary-foreground/70">
              Custom furniture solutions for homes, offices, and commercial spaces with a focus on quality craftsmanship and long-lasting design.
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
                <div className="space-y-1">
                  {PHONE_NUMBERS.map((phone) => (
                    <a
                      key={phone.href}
                      href={`tel:${phone.href}`}
                      className="block text-sm text-secondary-foreground/70 transition-colors hover:text-primary"
                    >
                      {phone.display}
                    </a>
                  ))}
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <div className="space-y-1">
                  {WHATSAPP_CONTACTS.map((contact) => (
                    <a
                      key={contact.href}
                      href={`https://wa.me/${contact.href}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm text-secondary-foreground/70 transition-colors hover:text-primary"
                    >
                      {contact.display}
                    </a>
                  ))}
                </div>
              </li>
              {EMAIL ? (
                <li className="flex items-start gap-2">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span className="text-sm text-secondary-foreground/70">{EMAIL}</span>
                </li>
              ) : null}
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-sm text-secondary-foreground/70">{ADDRESS}</span>
              </li>
            </ul>
            {WORKING_HOURS ? <p className="mt-4 text-xs text-secondary-foreground/50">{WORKING_HOURS}</p> : null}
          </div>
        </div>

        <div className="mt-12 border-t border-secondary-foreground/10 pt-8 text-center">
          <p className="text-sm text-secondary-foreground/50">
            &copy; {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
