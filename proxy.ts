import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

interface JwtPayload {
  userId: number;
  role: "USER" | "ADMIN" | "GUEST";
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value;

  const isAccountRoute = pathname.startsWith("/account");
  const isAdminRoute = pathname.startsWith("/admin");
  const isPublicOnlyRoute =
    pathname.startsWith("/signin") || pathname.startsWith("/signup");

  //public-only signin/signup

  if (isPublicOnlyRoute && token) {
    try {
      jwt.verify(token, process.env.JWT_SECRET as string);
      return NextResponse.redirect(new URL("/account", req.url));
    } catch {
      return NextResponse.next();
    }
  }

  // protected account/admin
  if (isAccountRoute || isAdminRoute) {
    if (!token) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string,
      ) as JwtPayload;

      if (isAdminRoute && decoded.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/no-access", req.url));
      }

      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL("/signin", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/account/:path*", "/admin/:path*", "/signin", "/signup"],
};
