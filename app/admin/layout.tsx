"use client"

import { useEffect, useState } from "react"
import type { ReactNode } from "react"
import { usePathname, useRouter } from "next/navigation"
import { AdminShell } from "@/components/admin/admin-shell"

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [checkingAuth, setCheckingAuth] = useState(true)

  const isLoginRoute = pathname === "/admin/login"

  useEffect(() => {
    const checkSession = async () => {
      if (isLoginRoute) {
        setCheckingAuth(false)
        return
      }

      setCheckingAuth(true)

      try {
        const response = await fetch("/api/admin/me", { cache: "no-store" })
        if (!response.ok) {
          const nextPath = encodeURIComponent(pathname || "/admin/dashboard")
          router.replace(`/admin/login?next=${nextPath}`)
          return
        }
      } catch {
        const nextPath = encodeURIComponent(pathname || "/admin/dashboard")
        router.replace(`/admin/login?next=${nextPath}`)
        return
      }

      setCheckingAuth(false)
    }

    checkSession()
  }, [isLoginRoute, pathname, router])

  if (isLoginRoute) {
    return <>{children}</>
  }

  if (checkingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-sm text-muted-foreground">
        Checking admin session...
      </div>
    )
  }

  return <AdminShell>{children}</AdminShell>
}
