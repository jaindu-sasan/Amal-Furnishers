"use client"

import { useState, useRef, useCallback } from "react"
import Image from "next/image"
import { RotateCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CushionViewer() {
  const [rotation, setRotation] = useState(0)
  const isDragging = useRef(false)
  const lastX = useRef(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleStart = useCallback((clientX: number) => {
    isDragging.current = true
    lastX.current = clientX
  }, [])

  const handleMove = useCallback((clientX: number) => {
    if (!isDragging.current) return
    const delta = clientX - lastX.current
    setRotation((prev) => prev + delta * 0.5)
    lastX.current = clientX
  }, [])

  const handleEnd = useCallback(() => {
    isDragging.current = false
  }, [])

  return (
    <section className="bg-secondary/30 py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Interactive Viewer */}
          <div
            ref={containerRef}
            className="relative mx-auto aspect-square w-full max-w-md cursor-grab overflow-hidden rounded-2xl bg-card shadow-lg active:cursor-grabbing"
            onMouseDown={(e) => handleStart(e.clientX)}
            onMouseMove={(e) => handleMove(e.clientX)}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
            onTouchStart={(e) => handleStart(e.touches[0].clientX)}
            onTouchMove={(e) => handleMove(e.touches[0].clientX)}
            onTouchEnd={handleEnd}
          >
            <div
              style={{ transform: `perspective(1000px) rotateY(${rotation}deg)` }}
              className="relative h-full w-full transition-none"
            >
              <Image
                src="/images/cushion-360.jpg"
                alt="Luxury cushion 360 view"
                fill
                className="pointer-events-none object-cover"
              />
            </div>
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-card/90 px-4 py-2 text-xs text-muted-foreground backdrop-blur-sm">
              <RotateCw className="h-3.5 w-3.5" />
              Drag to rotate
            </div>
          </div>

          {/* Content */}
          <div>
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">360 Viewer</p>
            <h2 className="mb-4 font-serif text-3xl font-bold text-foreground md:text-4xl">
              Luxury Cushion Collection
            </h2>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              Experience our premium cushion collection in an interactive 360-degree view. Each cushion is handcrafted with the finest velvet fabrics and filled with down-alternative inserts for cloud-like comfort.
            </p>
            <p className="mb-8 leading-relaxed text-muted-foreground">
              Available in 12 colors with custom sizing options. Gold piping detail adds an elegant finishing touch that elevates any sofa or armchair.
            </p>
            <Button asChild size="lg" className="rounded-full px-8">
              <Link href="/products">View Details</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
