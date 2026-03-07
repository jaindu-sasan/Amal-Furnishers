"use client"

import Link from "next/link"
import { Phone, MessageCircle } from "lucide-react"
import { PHONE_NUMBER, WHATSAPP_NUMBER } from "@/lib/data"

export function TopNavbar() {
  return (
    <div className="bg-secondary text-secondary-foreground">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-sm">
        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/about" className="transition-colors hover:text-primary">
            About Us
          </Link>
          <Link href="/projects" className="transition-colors hover:text-primary">
            Projects
          </Link>
          <Link href="/customization" className="transition-colors hover:text-primary">
            Customization
          </Link>
          <Link href="/contact" className="transition-colors hover:text-primary">
            Contact Us
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            WhatsApp
          </a>
          <a href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`} className="flex items-center gap-1.5 transition-colors hover:text-primary">
            <Phone className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{PHONE_NUMBER}</span>
          </a>
        </div>
      </div>
    </div>
  )
}
