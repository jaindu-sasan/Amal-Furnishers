import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "@/components/ui/sonner"
import { COMPANY_NAME } from "@/lib/data"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"], variable: "--font-geist" })
const _geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })
const _playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })

export const metadata: Metadata = {
  title: `${COMPANY_NAME} | Furniture in Moratuwa`,
  description:
    "Amal Furnishers Pvt Ltd provides furniture solutions for homes, offices, and commercial spaces in Moratuwa, Sri Lanka.",
  keywords: "Amal Furnishers, furniture Moratuwa, custom furniture Sri Lanka, office furniture, home furniture",
}

export const viewport: Viewport = {
  themeColor: "#4A9BD9",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${_geist.variable} ${_geistMono.variable} ${_playfair.variable} font-sans antialiased`}>
        {children}
        <Toaster richColors position="top-right" />
        <Analytics />
      </body>
    </html>
  )
}
