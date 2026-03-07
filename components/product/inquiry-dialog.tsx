"use client"

import { useState } from "react"
import { MessageCircle } from "lucide-react"
import { toast } from "sonner"
import { parseApiResponse } from "@/lib/admin-api"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type InquiryDialogProps = {
  productId: string
  productName: string
  productCode: string
  whatsappNumber: string
}

type InquiryFormState = {
  customerName: string
  phone: string
  email: string
  quantity: string
  preferredWoodType: string
  preferredSize: string
  address: string
  notes: string
}

const initialState: InquiryFormState = {
  customerName: "",
  phone: "",
  email: "",
  quantity: "1",
  preferredWoodType: "",
  preferredSize: "",
  address: "",
  notes: "",
}

function buildInquiryMessage(input: {
  productName: string
  productCode: string
  quantity: number
  preferredWoodType: string
  preferredSize: string
  address: string
  notes: string
}) {
  return [
    "Quotation Inquiry",
    `Product: ${input.productName}`,
    `Product Code: ${input.productCode}`,
    `Quantity: ${input.quantity}`,
    `Preferred Wood Type: ${input.preferredWoodType || "-"}`,
    `Preferred Size: ${input.preferredSize || "-"}`,
    `Delivery Address: ${input.address || "-"}`,
    `Additional Notes: ${input.notes || "-"}`,
  ].join("\n")
}

export function InquiryDialog({
  productId,
  productName,
  productCode,
  whatsappNumber,
}: InquiryDialogProps) {
  const [open, setOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState<InquiryFormState>(initialState)

  const setField = (field: keyof InquiryFormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const submitInquiry = async () => {
    const quantity = Number(form.quantity)
    if (!Number.isInteger(quantity) || quantity < 1) {
      toast.error("Quantity must be at least 1")
      return
    }

    const message = buildInquiryMessage({
      productName,
      productCode,
      quantity,
      preferredWoodType: form.preferredWoodType.trim(),
      preferredSize: form.preferredSize.trim(),
      address: form.address.trim(),
      notes: form.notes.trim(),
    })

    setSubmitting(true)
    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: form.customerName.trim(),
          phone: form.phone.trim(),
          email: form.email.trim().toLowerCase(),
          message,
          productId,
        }),
      })

      await parseApiResponse(response)

      const whatsappText = encodeURIComponent(
        `Hello Amal Furnishers,\n\n${message}\n\nCustomer Name: ${form.customerName.trim()}\nPhone: ${form.phone.trim()}\nEmail: ${form.email.trim()}`,
      )
      window.open(`https://wa.me/${whatsappNumber}?text=${whatsappText}`, "_blank", "noopener,noreferrer")

      toast.success("Inquiry sent successfully. Opening WhatsApp...")
      setOpen(false)
      setForm(initialState)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to submit inquiry")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="w-full gap-2 rounded-full">
          <MessageCircle className="h-5 w-5" />
          Request Quotation
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Quotation Request</DialogTitle>
          <DialogDescription>
            Fill your details and submit. We will send it to admin and open WhatsApp with the same message.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          <div className="grid gap-2 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="inq-name">Full Name</Label>
              <Input
                id="inq-name"
                value={form.customerName}
                onChange={(event) => setField("customerName", event.target.value)}
                placeholder="Your full name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="inq-phone">Phone</Label>
              <Input
                id="inq-phone"
                value={form.phone}
                onChange={(event) => setField("phone", event.target.value)}
                placeholder="+94 77 123 4567"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="inq-email">Email</Label>
            <Input
              id="inq-email"
              type="email"
              value={form.email}
              onChange={(event) => setField("email", event.target.value)}
              placeholder="your@email.com"
            />
          </div>

          <div className="grid gap-2 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="inq-qty">Quantity</Label>
              <Input
                id="inq-qty"
                type="number"
                min={1}
                value={form.quantity}
                onChange={(event) => setField("quantity", event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="inq-wood">Preferred Wood</Label>
              <Input
                id="inq-wood"
                value={form.preferredWoodType}
                onChange={(event) => setField("preferredWoodType", event.target.value)}
                placeholder="Teak / Oak"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="inq-size">Preferred Size</Label>
              <Input
                id="inq-size"
                value={form.preferredSize}
                onChange={(event) => setField("preferredSize", event.target.value)}
                placeholder="Large / Custom"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="inq-address">Delivery Address</Label>
            <Input
              id="inq-address"
              value={form.address}
              onChange={(event) => setField("address", event.target.value)}
              placeholder="Address"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="inq-notes">Additional Notes</Label>
            <Textarea
              id="inq-notes"
              value={form.notes}
              onChange={(event) => setField("notes", event.target.value)}
              placeholder="Any customization details..."
              rows={4}
            />
          </div>

          <Button onClick={submitInquiry} disabled={submitting}>
            {submitting ? "Submitting..." : "Submit Inquiry"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
