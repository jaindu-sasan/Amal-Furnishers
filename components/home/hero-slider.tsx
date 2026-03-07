"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const slides = [
  {
    image: "/images/hero-1.jpg",
    title: "Crafted for Living",
    subtitle: "Handmade furniture that transforms your home into a sanctuary of style and comfort.",
  },
  {
    image: "/images/hero-2.jpg",
    title: "Timeless Elegance",
    subtitle: "Each piece is designed to become a cherished part of your story for generations.",
  },
  {
    image: "/images/hero-3.jpg",
    title: "Bespoke Dining",
    subtitle: "Gather around furniture crafted with passion, designed for unforgettable moments.",
  },
]

export function HeroSlider() {
  const [current, setCurrent] = useState(0)

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000)
    return () => clearInterval(timer)
  }, [nextSlide])

  return (
    <section className="relative h-[70vh] min-h-[500px] overflow-hidden lg:h-[85vh]">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === current ? "opacity-100" : "opacity-0"}`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-secondary/60" />
        </div>
      ))}

      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto w-full max-w-7xl px-4">
          <div className="max-w-2xl">
            <h1 className="mb-4 font-serif text-4xl font-bold leading-tight text-secondary-foreground md:text-5xl lg:text-6xl">
              {slides[current].title}
            </h1>
            <p className="mb-8 text-lg leading-relaxed text-secondary-foreground/80 md:text-xl">
              {slides[current].subtitle}
            </p>
            <Button asChild size="lg" className="rounded-full px-8">
              <Link href="/products">View Products</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-card/20 p-2 text-card-foreground backdrop-blur-sm transition-colors hover:bg-card/40"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 text-secondary-foreground" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-card/20 p-2 text-card-foreground backdrop-blur-sm transition-colors hover:bg-card/40"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 text-secondary-foreground" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all ${i === current ? "w-8 bg-primary" : "w-2 bg-secondary-foreground/40"}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
