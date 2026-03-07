"use client"

import { useState } from "react"
import Image from "next/image"
import { Plus, Pencil, Trash2, MapPin, Calendar } from "lucide-react"
import { projects as initialProjects } from "@/lib/data"
import type { Project } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [showAdd, setShowAdd] = useState(false)

  const deleteProject = (id: string) => {
    setProjects(projects.filter((p) => p.id !== id))
  }

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-foreground">Projects</h1>
          <p className="mt-1 text-sm text-muted-foreground">{projects.length} completed projects.</p>
        </div>
        <Dialog open={showAdd} onOpenChange={setShowAdd}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Project</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label>Project Title</Label>
                <Input placeholder="e.g., Modern Villa Living Space" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input placeholder="e.g., Manhattan, New York" />
                </div>
                <div className="space-y-2">
                  <Label>Completion Year</Label>
                  <Input type="number" placeholder="2025" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Client Type</Label>
                <Input placeholder="e.g., Residential, Corporate, Hospitality" />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea rows={4} placeholder="Detailed project description..." />
              </div>
              <div className="rounded-lg border-2 border-dashed border-border p-6 text-center">
                <p className="text-sm text-muted-foreground">Upload project images (before, after, installation)</p>
                <p className="text-xs text-muted-foreground/60">Supports JPG, PNG. Max 5MB each.</p>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={() => setShowAdd(false)}>Add Project</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.id} className="overflow-hidden">
            <div className="relative aspect-video overflow-hidden">
              <Image src={project.images[0]} alt={project.title} fill className="object-cover" />
              <div className="absolute right-2 top-2 flex gap-1">
                <Button size="icon" variant="secondary" className="h-8 w-8 shadow-sm">
                  <Pencil className="h-3.5 w-3.5" />
                </Button>
                <Button size="icon" variant="secondary" className="h-8 w-8 shadow-sm text-destructive" onClick={() => deleteProject(project.id)}>
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-foreground">{project.title}</h3>
              <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {project.location}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {project.completionYear}
                </span>
              </div>
              <span className="mt-2 inline-block rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                {project.clientType}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
