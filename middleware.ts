import { NextResponse, type NextRequest } from "next/server"
import { ADMIN_SESSION_COOKIE } from "@/backend/admin/admin-constants"

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl

  if (pathname.startsWith("/admin/login")) {
    return NextResponse.next()
  }

  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value
    if (!token) {
      const loginUrl = new URL("/admin/login", request.url)
      const nextPath = `${pathname}${search || ""}`
      loginUrl.searchParams.set("next", nextPath)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}

