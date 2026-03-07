"use client"

import { useState } from "react"
import { Search, Eye, Mail, Phone } from "lucide-react"
import { mockQuoteRequests } from "@/lib/data"
import type { QuoteRequest } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const statuses: QuoteRequest["status"][] = ["New", "In Progress", "Quoted", "Confirmed", "Closed"]

const statusColors: Record<QuoteRequest["status"], string> = {
  New: "bg-primary/10 text-primary",
  "In Progress": "bg-chart-4/20 text-chart-5",
  Quoted: "bg-chart-2/20 text-chart-2",
  Confirmed: "bg-chart-1/20 text-chart-1",
  Closed: "bg-muted text-muted-foreground",
}

export default function AdminQuotesPage() {
  const [quotes, setQuotes] = useState<QuoteRequest[]>(mockQuoteRequests)
  const [search, setSearch] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [selectedQuote, setSelectedQuote] = useState<QuoteRequest | null>(null)

  const filtered = quotes.filter((q) => {
    const matchesSearch =
      q.customerName.toLowerCase().includes(search.toLowerCase()) ||
      q.productName.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = filterStatus === "all" || q.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const updateStatus = (id: string, newStatus: QuoteRequest["status"]) => {
    setQuotes(quotes.map((q) => (q.id === id ? { ...q, status: newStatus } : q)))
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-2xl font-bold text-foreground">Quote Requests</h1>
        <p className="mt-1 text-sm text-muted-foreground">{quotes.length} total requests, {quotes.filter((q) => q.status === "New").length} new.</p>
      </div>

      {/* Status overview */}
      <div className="mb-6 grid gap-3 sm:grid-cols-5">
        {statuses.map((s) => {
          const count = quotes.filter((q) => q.status === s).length
          return (
            <button
              key={s}
              onClick={() => setFilterStatus(filterStatus === s ? "all" : s)}
              className={`rounded-lg border p-3 text-center transition-colors ${
                filterStatus === s ? "border-primary bg-primary/5" : "border-border bg-card hover:bg-muted/50"
              }`}
            >
              <p className="text-xl font-bold text-foreground">{count}</p>
              <p className="text-xs text-muted-foreground">{s}</p>
            </button>
          )
        })}
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by customer name or product..."
          className="pl-10"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Details</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Date</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((q) => (
                  <tr key={q.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-foreground">{q.customerName}</p>
                        <p className="text-xs text-muted-foreground">{q.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-foreground">{q.productName}</p>
                      <p className="text-xs text-muted-foreground">{q.productCode}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-xs text-muted-foreground">{q.woodType} / {q.size}</p>
                    </td>
                    <td className="px-6 py-4">
                      <Select value={q.status} onValueChange={(v) => updateStatus(q.id, v as QuoteRequest["status"])}>
                        <SelectTrigger className="h-7 w-32">
                          <span className={`rounded px-1.5 py-0.5 text-xs font-medium ${statusColors[q.status]}`}>
                            {q.status}
                          </span>
                        </SelectTrigger>
                        <SelectContent>
                          {statuses.map((s) => (
                            <SelectItem key={s} value={s}>{s}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{q.createdAt}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setSelectedQuote(q)}>
                              <Eye className="h-3.5 w-3.5" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Quote Request Details</DialogTitle>
                            </DialogHeader>
                            {selectedQuote && (
                              <div className="space-y-4 py-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-xs font-semibold uppercase text-muted-foreground">Customer</p>
                                    <p className="mt-1 text-sm text-foreground">{selectedQuote.customerName}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs font-semibold uppercase text-muted-foreground">Status</p>
                                    <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${statusColors[selectedQuote.status]}`}>
                                      {selectedQuote.status}
                                    </span>
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Phone className="h-3.5 w-3.5" />
                                    {selectedQuote.phone}
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Mail className="h-3.5 w-3.5" />
                                    {selectedQuote.email}
                                  </div>
                                </div>
                                <div className="rounded-lg bg-muted/50 p-4">
                                  <p className="text-xs font-semibold uppercase text-muted-foreground">Product</p>
                                  <p className="mt-1 text-sm font-medium text-foreground">{selectedQuote.productName} ({selectedQuote.productCode})</p>
                                  <p className="mt-1 text-xs text-muted-foreground">
                                    Wood: {selectedQuote.woodType} | Size: {selectedQuote.size}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs font-semibold uppercase text-muted-foreground">Address</p>
                                  <p className="mt-1 text-sm text-muted-foreground">{selectedQuote.address}</p>
                                </div>
                                <div>
                                  <p className="text-xs font-semibold uppercase text-muted-foreground">Message</p>
                                  <p className="mt-1 text-sm text-muted-foreground">{selectedQuote.message}</p>
                                </div>
                              </div>
                            )}
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button variant="outline">Close</Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
