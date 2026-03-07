import Image from "next/image"
import Link from "next/link"
import { MapPin, ArrowRight } from "lucide-react"
import { projects } from "@/lib/data"
import { Button } from "@/components/ui/button"

export function RecentProjects() {
  const recentProjects = projects.slice(0, 6)

  return (
    <section className="bg-muted py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">Portfolio</p>
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">Recent Projects</h2>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {recentProjects.map((project) => (
            <div key={project.id} className="group overflow-hidden rounded-xl border border-border bg-card">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={project.images[0]}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h3 className="mb-1 font-serif text-lg font-bold text-card-foreground">{project.title}</h3>
                <div className="mb-3 flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  {project.location}
                </div>
                <Button asChild variant="outline" size="sm" className="gap-2">
                  <Link href={`/projects/${project.id}`}>
                    View Project
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
