// middleware.ts
import { auth } from "@/auth"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server

// List of public pages (no auth required)
const publicPages = ["/", "/about", "/contact","/signin"]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // If path is in public pages, allow access
  if (publicPages.includes(pathname)) {
    return NextResponse.next()
  }

  // Check if session exists for protected pages
  const session = await auth()

  if (!session?.user) {
    // Redirect unauthenticated users to signin
    return NextResponse.redirect(new URL("/signin", request.url))
  }

  // User is authenticated
  return NextResponse.next()
}
export const config = {
  matcher: ["/((?!api|_next|static|favicon.ico).*)"], // Run on all pages except system/internal
}
