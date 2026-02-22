import { auth } from "@/lib/auth";
import { NextResponse, type NextRequest } from "next/server";

export const config = {
  matcher: ["/admin/:path*"],
};

export const proxy = auth((req: NextRequest) => {
  const pathname = req.nextUrl.pathname;

  // NextAuth attaches auth info to the request wrapper. TypeScript doesn't know it by default.
  const session = (req as any).auth;
  const role = session?.role;

  if (!session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (role !== "admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
});