"use client"

import { useState } from "react"
import { Save, Building2, Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react"
import { COMPANY_NAME, PHONE_NUMBERS, EMAIL, ADDRESS, WHATSAPP_CONTACTS, WORKING_HOURS } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    companyName: COMPANY_NAME,
    tagline: "Custom furniture solutions for homes, offices, and commercial spaces",
    phone: PHONE_NUMBERS.map((phone) => phone.display).join(" / "),
    whatsapp: WHATSAPP_CONTACTS.map((contact) => contact.display).join(" / "),
    email: EMAIL,
    address: ADDRESS,
    workingHours: WORKING_HOURS,
    seoTitle: `${COMPANY_NAME} | Furniture in Moratuwa`,
    seoDescription: "Amal Furnishers Pvt Ltd offers furniture solutions for homes, offices, and commercial spaces in Moratuwa, Sri Lanka.",
  })

  const handleSave = () => {
    // Placeholder for API save
    alert("Settings saved successfully (placeholder)")
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-foreground">Settings</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage your website configuration.</p>
        </div>
        <Button className="gap-2" onClick={handleSave}>
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Company Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Building2 className="h-4 w-4 text-primary" />
              Company Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Company Name</Label>
              <Input value={settings.companyName} onChange={(e) => setSettings({ ...settings, companyName: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Tagline</Label>
              <Input value={settings.tagline} onChange={(e) => setSettings({ ...settings, tagline: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Address</Label>
              <Textarea value={settings.address} onChange={(e) => setSettings({ ...settings, address: e.target.value })} rows={2} />
            </div>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Phone className="h-4 w-4 text-primary" />
              Contact Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Phone Number</Label>
              <Input value={settings.phone} onChange={(e) => setSettings({ ...settings, phone: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>WhatsApp Number</Label>
              <Input value={settings.whatsapp} onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input value={settings.email} onChange={(e) => setSettings({ ...settings, email: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Working Hours</Label>
              <Input value={settings.workingHours} onChange={(e) => setSettings({ ...settings, workingHours: e.target.value })} />
            </div>
          </CardContent>
        </Card>

        {/* SEO */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <MessageCircle className="h-4 w-4 text-primary" />
              SEO Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Meta Title</Label>
              <Input value={settings.seoTitle} onChange={(e) => setSettings({ ...settings, seoTitle: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Meta Description</Label>
              <Textarea value={settings.seoDescription} onChange={(e) => setSettings({ ...settings, seoDescription: e.target.value })} rows={3} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
