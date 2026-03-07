"use client"

import { useState } from "react"
import { Phone, Mail, MapPin, MessageCircle, Clock, Send } from "lucide-react"
import { PHONE_NUMBER, EMAIL, ADDRESS, WHATSAPP_NUMBER, WORKING_HOURS } from "@/lib/data"
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
          {[
            { icon: Phone, label: "Phone", value: PHONE_NUMBER, href: `tel:${PHONE_NUMBER.replace(/\D/g, "")}` },
            { icon: MessageCircle, label: "WhatsApp", value: "Chat with us", href: `https://wa.me/${WHATSAPP_NUMBER}` },
            { icon: Mail, label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
            { icon: Clock, label: "Working Hours", value: WORKING_HOURS, href: undefined },
          ].map((item) => (
            <div key={item.label} className="rounded-xl border border-border bg-card p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mt-4 text-sm font-semibold text-foreground">{item.label}</h3>
              {item.href ? (
                <a
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="mt-1 block text-sm text-primary hover:underline"
                >
                  {item.value}
                </a>
              ) : (
                <p className="mt-1 text-xs text-muted-foreground">{item.value}</p>
              )}
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
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.00369368400567!3d40.71312937933185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a23e28c1191%3A0x49f75d3281df052a!2s150%20Park%20Row%2C%20New%20York%2C%20NY%2010007!5e0!3m2!1sen!2sus!4v1640000000000!5m2!1sen!2sus"
                  width="100%"
                  height="350"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="LuxeCraft showroom location"
                />
              </div>

              <div className="mt-6 rounded-xl border border-border bg-card p-6">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <h3 className="font-semibold text-foreground">LuxeCraft Showroom</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{ADDRESS}</p>
                    <p className="mt-2 text-xs text-muted-foreground">{WORKING_HOURS}</p>
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
