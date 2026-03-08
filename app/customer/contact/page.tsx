"use client"

import { useState } from "react"
import { Phone, Mail, MapPin, MessageCircle, Clock, Send } from "lucide-react"
import { COMPANY_NAME, PHONE_NUMBERS, EMAIL, ADDRESS, WHATSAPP_NUMBER, WHATSAPP_CONTACTS, WORKING_HOURS } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const inquiryTypes = ["Personal", "Corporate", "Industry"]

type ContactCard = {
  icon: typeof Phone
  label: string
  values: Array<{
    text: string
    href?: string
  }>
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    email: "",
    message: "",
    inquiryType: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const message = `Contact Inquiry\n\nName: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nAddress: ${formData.address}\nType: ${formData.inquiryType}\n\nMessage: ${formData.message}`
    const encoded = encodeURIComponent(message)
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, "_blank")
  }

  const contactCards: ContactCard[] = [
    {
      icon: Phone,
      label: "Call Us",
      values: PHONE_NUMBERS.map((phone) => ({ text: phone.display, href: `tel:${phone.href}` })),
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      values: WHATSAPP_CONTACTS.map((contact) => ({
        text: contact.display,
        href: `https://wa.me/${contact.href}`,
      })),
    },
    ...(EMAIL
      ? [
          {
            icon: Mail,
            label: "Email",
            values: [{ text: EMAIL, href: `mailto:${EMAIL}` }],
          },
        ]
      : []),
    {
      icon: MapPin,
      label: "Address",
      values: [{ text: ADDRESS }],
    },
    ...(WORKING_HOURS
      ? [
          {
            icon: Clock,
            label: "Working Hours",
            values: [{ text: WORKING_HOURS }],
          },
        ]
      : []),
  ]

  return (
    <main>
      {/* Hero */}
      <section className="relative bg-secondary py-20">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h1 className="font-serif text-4xl font-bold text-secondary-foreground md:text-5xl">
            Contact Us
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-secondary-foreground/70">
            We&apos;d love to hear from you. Reach out for inquiries, quotations, or
            to schedule a showroom visit.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {contactCards.map((item) => (
            <div key={item.label} className="rounded-xl border border-border bg-card p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mt-4 text-sm font-semibold text-foreground">{item.label}</h3>
              <div className="mt-3 space-y-2">
                {item.values.map((value) =>
                  value.href ? (
                    <a
                      key={value.href}
                      href={value.href}
                      target={value.href.startsWith("http") ? "_blank" : undefined}
                      rel={value.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="block text-sm text-primary hover:underline"
                    >
                      {value.text}
                    </a>
                  ) : (
                    <p key={value.text} className="text-sm text-muted-foreground">
                      {value.text}
                    </p>
                  ),
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Form + Map */}
      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-20">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Form */}
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">Get In Touch</span>
              <h2 className="mt-2 font-serif text-3xl font-bold text-foreground">Send Us a Message</h2>
              <p className="mt-2 text-sm text-muted-foreground">Fill out the form and we will get back to you within 24 hours.</p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="c-name">Full Name</Label>
                    <Input id="c-name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="c-phone">Phone</Label>
                    <Input id="c-phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="c-email">Email</Label>
                    <Input id="c-email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                  </div>
                  <div className="space-y-2">
                    <Label>Inquiry Type</Label>
                    <Select value={formData.inquiryType} onValueChange={(v) => setFormData({ ...formData, inquiryType: v })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {inquiryTypes.map((t) => (
                          <SelectItem key={t} value={t}>{t}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="c-address">Address</Label>
                  <Input id="c-address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="c-message">Message</Label>
                  <Textarea
                    id="c-message"
                    rows={5}
                    placeholder="Tell us how we can help..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>

                <Button type="submit" size="lg" className="w-full gap-2">
                  <Send className="h-4 w-4" />
                  Send Message
                </Button>
              </form>
            </div>

            {/* Map + Address */}
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">Visit Our Showroom</span>
              <h2 className="mt-2 font-serif text-3xl font-bold text-foreground">Find Us</h2>

              <div className="mt-6 overflow-hidden rounded-xl border border-border">
                <iframe
                  src={`https://www.google.com/maps?q=${encodeURIComponent(ADDRESS)}&output=embed`}
                  width="100%"
                  height="350"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${COMPANY_NAME} location`}
                />
              </div>

              <div className="mt-6 rounded-xl border border-border bg-card p-6">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <h3 className="font-semibold text-foreground">{COMPANY_NAME}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{ADDRESS}</p>
                    {WORKING_HOURS ? <p className="mt-2 text-xs text-muted-foreground">{WORKING_HOURS}</p> : null}
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-border bg-primary/5 p-6 text-center">
                <MessageCircle className="mx-auto h-8 w-8 text-primary" />
                <h3 className="mt-3 font-semibold text-foreground">Prefer WhatsApp?</h3>
                <p className="mt-1 text-sm text-muted-foreground">Chat with our team instantly for quick responses.</p>
                <Button asChild className="mt-4 gap-2" size="lg">
                  <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-4 w-4" />
                    Chat on WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
