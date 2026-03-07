"use client"

import Image from "next/image"
import Link from "next/link"
import { Camera, ArrowRight } from "lucide-react"
import { photos } from "@/lib/data2"
import { Button } from "@/components/ui/button"

export function PhotosSection() {
  const displayPhotos = photos.slice(0, 8)

  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <div className="mb-2 flex items-center justify-center gap-2">
            <Camera className="h-5 w-5 text-primary" />
            <p className="text-sm font-medium uppercase tracking-widest text-primary">Gallery</p>
          </div>
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">Our Photos</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Explore our collection of handcrafted furniture through our photo gallery. 
            Each piece tells a story of craftsmanship and quality.
          </p>
        </div>
        
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {displayPhotos.map((photo, index) => (
            <div 
              key={photo.id} 
              className={`group relative overflow-hidden rounded-xl ${
                index === 0 || index === 3 ? 'row-span-2' : ''
              }`}
            >
              <div className={`relative ${
                index === 0 || index === 3 ? 'aspect-[3/4]' : 'aspect-square'
              }`}>
                <Image
                  src={photo.imageUrl}
                  alt={photo.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 right-0 translate-y-4 p-4 opacity-0 transition-transform duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <h3 className="font-serif text-lg font-bold text-white">{photo.title}</h3>
                  {photo.category && (
                    <p className="text-sm text-white/80">{photo.category}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild size="lg" className="gap-2">
            <Link href="/gallery">
              View All Photos
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

