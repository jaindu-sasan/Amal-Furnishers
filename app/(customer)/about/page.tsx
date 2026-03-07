import Image from "next/image"
import Link from "next/link"
import {
  Award,
  Truck,
  Wrench,
  Paintbrush,
  Package,
  ShieldCheck,
  Leaf,
  Star,
  Users,
  Clock,
  CheckCircle2,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const services = [
  { icon: Wrench, title: "Custom Furniture", description: "Bespoke pieces designed and built to your exact specifications." },
  { icon: Paintbrush, title: "Repairs & Polishing", description: "Expert restoration and refinishing to breathe new life into your furniture." },
  { icon: Package, title: "Installation", description: "Professional white-glove delivery and installation service." },
  { icon: Users, title: "Bulk Orders", description: "Volume pricing for hospitality, corporate, and commercial projects." },
  { icon: Truck, title: "Nationwide Delivery", description: "Careful, insured shipping to any location across the country." },
  { icon: ShieldCheck, title: "Warranty", description: "Comprehensive 5-year warranty on all handcrafted furniture pieces." },
]

const stats = [
  { value: "25+", label: "Years of Experience" },
  { value: "5,000+", label: "Pieces Crafted" },
  { value: "800+", label: "Happy Clients" },
  { value: "50+", label: "Master Craftsmen" },
]

const testimonials = [
  {
    text: "LuxeCraft transformed our entire home. The quality and attention to detail is unmatched in the industry.",
    author: "Alexandra Chen",
    role: "Interior Designer",
  },
  {
    text: "Working with the LuxeCraft team was an absolute pleasure. They understood our vision from day one.",
    author: "Michael Torres",
    role: "CEO, Torres Holdings",
  },
  {
    text: "Every piece we commissioned arrived flawless. Their craftsmanship speaks volumes about their dedication.",
    author: "Sofia Martinez",
    role: "Hotel Manager",
  },
]

export default function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative bg-secondary py-20">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h1 className="font-serif text-4xl font-bold text-secondary-foreground md:text-5xl">
            About LuxeCraft
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-secondary-foreground/70">
            Over 25 years of master craftsmanship, creating furniture that
            transforms spaces and stands the test of time.
          </p>
        </div>
      </section>

      {/* Story + Founder */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">Our Story</span>
            <h2 className="mt-2 font-serif text-3xl font-bold text-foreground">
              A Legacy of Craftsmanship
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Founded in 2001 by master craftsman Edward Hartwell, LuxeCraft began as a small
              woodworking studio in Brooklyn. What started as a one-man passion for creating
              heirloom-quality furniture has grown into a team of 50+ artisans dedicated to the
              art of fine furniture making.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Every piece that leaves our workshop carries the DNA of that original vision:
              meticulous attention to detail, the finest sustainably-sourced materials, and a
              relentless pursuit of perfection that turns functional furniture into works of art.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-serif text-2xl font-bold text-primary">{stat.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
            <Image
              src="/images/about-founder.jpg"
              alt="LuxeCraft founder in workshop"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="border-y border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-20">
          <div className="grid gap-12 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 font-serif text-xl font-semibold text-foreground">Our Mission</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                To create exceptional handcrafted furniture that elevates everyday living, combining
                traditional craftsmanship with contemporary design for homes and businesses worldwide.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 font-serif text-xl font-semibold text-foreground">Our Vision</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                To become the world's most trusted name in bespoke furniture, setting the standard
                for quality, sustainability, and customer experience in the luxury furniture industry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Workshop */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-video overflow-hidden rounded-2xl lg:order-1">
            <Image
              src="/images/about-workshop.jpg"
              alt="LuxeCraft workshop"
              fill
              className="object-cover"
            />
          </div>
          <div className="lg:order-0">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">Our Workshop</span>
            <h2 className="mt-2 font-serif text-3xl font-bold text-foreground">
              Where Art Meets Precision
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Our 15,000 sq ft workshop in Brooklyn houses state-of-the-art equipment alongside
              traditional hand tools. Every piece passes through the hands of multiple master
              craftsmen, each specializing in different aspects of furniture making.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Hand-selected, sustainably sourced hardwoods",
                "Traditional joinery techniques for lasting strength",
                "Multi-step finishing process for flawless surfaces",
                "Quality inspection at every stage of production",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-20">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">What We Offer</span>
            <h2 className="mt-2 font-serif text-3xl font-bold text-foreground">Our Services</h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div key={service.title} className="rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-md">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <service.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mt-4 font-semibold text-foreground">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-secondary">
        <div className="mx-auto max-w-7xl px-4 py-20">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">Client Voices</span>
            <h2 className="mt-2 font-serif text-3xl font-bold text-secondary-foreground">What Our Clients Say</h2>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.author} className="rounded-xl bg-secondary-foreground/5 p-6">
                <div className="flex gap-1 text-primary">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-secondary-foreground/80 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="mt-4 border-t border-secondary-foreground/10 pt-4">
                  <p className="text-sm font-semibold text-secondary-foreground">{t.author}</p>
                  <p className="text-xs text-secondary-foreground/60">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="rounded-2xl border border-border bg-card p-8 md:p-12">
          <div className="flex flex-col items-center gap-8 md:flex-row">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <Leaf className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-bold text-foreground">Our Commitment to Sustainability</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                We believe luxury and sustainability go hand in hand. All our hardwoods are sourced from
                certified sustainable forests. Our finishes are low-VOC, and we minimize waste through
                precision cutting and recycling programs. Every LuxeCraft piece is built to last
                generations, reducing the cycle of disposable furniture.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center">
          <h2 className="font-serif text-3xl font-bold text-primary-foreground">
            Ready to Transform Your Space?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">
            Let us create the perfect furniture for your home or business.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" variant="secondary">
              <Link href="/products">Browse Products</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
