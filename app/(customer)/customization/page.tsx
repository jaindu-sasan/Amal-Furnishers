"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  MessageCircle,
  Upload,
  CheckCircle2,
  ArrowRight,
  Palette,
  Ruler,
  TreePine,
  Paintbrush,
  FileText,
  CreditCard,
  Factory,
  Truck,
} from "lucide-react"
import { WHATSAPP_NUMBER } from "@/lib/data"
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

const workflowSteps = [
  { icon: FileText, title: "Consultation", description: "Share your vision, measurements, and preferences. We'll discuss materials, design, and timeline." },
  { icon: CreditCard, title: "Quotation", description: "Receive a detailed quote with material costs, labor, and delivery. No hidden fees." },
  { icon: CheckCircle2, title: "Advance Payment", description: "Confirm your order with a 50% advance. Production begins immediately." },
  { icon: Factory, title: "Production", description: "Our master craftsmen build your piece with regular progress updates and photos." },
  { icon: Truck, title: "Delivery & Installation", description: "White-glove delivery and professional installation at your location." },
]

const woodTypes = ["Oak", "Walnut", "Teak", "Maple", "Cherry", "Mahogany", "Pine", "Birch"]
const polishColors = [
  "Natural Matte",
  "Semi-Gloss",
  "Dark Walnut",
  "Espresso",
  "Light Oak",
  "White Wash",
  "Ebony",
  "Hand-Rubbed Oil",
]

export default function CustomizationPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    furnitureType: "",
    width: "",
    height: "",
    depth: "",
    woodType: "",
    polishColor: "",
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const message = `Custom Furniture Request\n\nName: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nFurniture Type: ${formData.furnitureType}\nDimensions: ${formData.width}" W x ${formData.height}" H x ${formData.depth}" D\nWood Type: ${formData.woodType}\nPolish: ${formData.polishColor}\n\nNotes: ${formData.notes}`
    const encoded = encodeURIComponent(message)
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, "_blank")
  }

  return (
    <main>
      {/* Hero */}
      <section className="relative bg-secondary py-20">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h1 className="font-serif text-4xl font-bold text-secondary-foreground md:text-5xl">
            Custom Furniture
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-secondary-foreground/70">
            Bring your vision to life. Our master craftsmen create bespoke furniture
            tailored to your exact specifications and style.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Ruler, title: "Custom Sizes", desc: "Any dimension to fit your space perfectly" },
            { icon: TreePine, title: "Wood Selection", desc: "Choose from 8+ premium hardwood species" },
            { icon: Palette, title: "Polish & Finish", desc: "Over 20 finish options to match your decor" },
            { icon: Paintbrush, title: "Design Notes", desc: "Share sketches, photos, or design inspirations" },
          ].map((f) => (
            <div key={f.title} className="flex items-start gap-4 rounded-xl border border-border bg-card p-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <f.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{f.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Workflow */}
      <section className="border-y border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-20">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">How It Works</span>
            <h2 className="mt-2 font-serif text-3xl font-bold text-foreground">Our Custom Process</h2>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-5">
            {workflowSteps.map((step, i) => (
              <div key={step.title} className="relative text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <step.icon className="h-6 w-6" />
                </div>
                <div className="absolute left-[calc(50%+32px)] top-7 hidden h-px w-[calc(100%-64px)] bg-border md:block" />
                <h3 className="mt-4 text-sm font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">Request Form</span>
            <h2 className="mt-2 font-serif text-3xl font-bold text-foreground">
              Tell Us About Your Dream Piece
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Fill in your requirements and our design team will reach out with a detailed
              consultation and quotation within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="furnitureType">Furniture Type</Label>
                <Input
                  id="furnitureType"
                  placeholder="e.g., Dining table, Bookshelf, Bed frame..."
                  value={formData.furnitureType}
                  onChange={(e) => setFormData({ ...formData, furnitureType: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label className="mb-2 block">Dimensions (inches)</Label>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <Label htmlFor="width" className="text-xs text-muted-foreground">Width</Label>
                    <Input id="width" placeholder="W" value={formData.width} onChange={(e) => setFormData({ ...formData, width: e.target.value })} />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="height" className="text-xs text-muted-foreground">Height</Label>
                    <Input id="height" placeholder="H" value={formData.height} onChange={(e) => setFormData({ ...formData, height: e.target.value })} />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="depth" className="text-xs text-muted-foreground">Depth</Label>
                    <Input id="depth" placeholder="D" value={formData.depth} onChange={(e) => setFormData({ ...formData, depth: e.target.value })} />
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Wood Type</Label>
                  <Select value={formData.woodType} onValueChange={(v) => setFormData({ ...formData, woodType: v })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select wood" />
                    </SelectTrigger>
                    <SelectContent>
                      {woodTypes.map((w) => (
                        <SelectItem key={w} value={w}>{w}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Polish Color</Label>
                  <Select value={formData.polishColor} onValueChange={(v) => setFormData({ ...formData, polishColor: v })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select finish" />
                    </SelectTrigger>
                    <SelectContent>
                      {polishColors.map((p) => (
                        <SelectItem key={p} value={p}>{p}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Design Notes</Label>
                <Textarea
                  id="notes"
                  rows={4}
                  placeholder="Describe your vision, inspiration, or share any specific requirements..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>

              <div className="rounded-lg border-2 border-dashed border-border p-6 text-center">
                <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">
                  Upload reference images (coming soon)
                </p>
                <p className="text-xs text-muted-foreground/60">PNG, JPG up to 5MB</p>
              </div>

              <Button type="submit" size="lg" className="w-full gap-2">
                <MessageCircle className="h-5 w-5" />
                Send Request via WhatsApp
              </Button>
            </form>
          </div>

          {/* Gallery of Custom Projects */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">Gallery</span>
            <h3 className="mt-2 font-serif text-2xl font-bold text-foreground">Custom Creations</h3>
            <p className="mt-2 text-sm text-muted-foreground">Some of our recent bespoke furniture projects.</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                { src: "/images/project-1.jpg", label: "Custom Living Room Set" },
                { src: "/images/project-4.jpg", label: "Bespoke Bedroom Suite" },
                { src: "/images/project-5.jpg", label: "Restaurant Furniture" },
                { src: "/images/project-6.jpg", label: "Outdoor Terrace Set" },
              ].map((item) => (
                <div key={item.src} className="group relative aspect-square overflow-hidden rounded-xl">
                  <Image src={item.src} alt={item.label} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-foreground/60 to-transparent p-4">
                    <p className="text-sm font-medium text-card">{item.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
