import { TopNavbar } from "@/components/top-navbar"
import { MainNavbar } from "@/components/main-navbar"
import { Footer } from "@/components/footer"

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <TopNavbar />
      <MainNavbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
