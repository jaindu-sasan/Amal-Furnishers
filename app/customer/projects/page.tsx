"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Calendar, ArrowRight, Filter } from "lucide-react"
import { projects } from "@/lib/data"
import { Button } from "@/components/ui/button"

const clientTypes = ["All", "Residential", "Corporate", "Hospitality", "Commercial"]

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("All")

  const filteredProjects = activeFilter === "All"
    ? projects
    : projects.filter((p) => p.clientType === activeFilter)

  return (
    <main>
      {/* Hero */}
      <section className="relative bg-secondary py-20">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h1 className="font-serif text-4xl font-bold text-secondary-foreground md:text-5xl">
            Our Projects
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-secondary-foreground/70">
            Explore our portfolio of completed projects, from luxury residences to
            boutique hotels and corporate offices.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-4 py-4">
          <Filter className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
          {clientTypes.map((type) => (
            <button
              key={type}
              onClick={() => setActiveFilter(type)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                activeFilter === type
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="group overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={project.images[0]}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="inline-block rounded-full bg-primary/90 px-3 py-1 text-xs font-medium text-primary-foreground">
                    {project.clientType}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {project.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {project.completionYear}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                  {project.shortDescription}
                </p>
                <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary">
                  View Project
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-lg text-muted-foreground">No projects found for this category.</p>
            <Button variant="outline" className="mt-4" onClick={() => setActiveFilter("All")}>
              View All Projects
            </Button>
          </div>
        )}
      </section>
    </main>
  )
}
