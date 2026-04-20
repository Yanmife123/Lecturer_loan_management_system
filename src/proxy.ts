import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const Cookies = await cookies();
  const token = Cookies.get("token");
  const user = Cookies.get("user")
    ? JSON.parse(Cookies.get("user")!.value)
    : null;

  if (!user) {
    if (pathname.startsWith("/dashboard") || pathname.startsWith("/admin")) {
      Cookies.delete("token");
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
  // const url = new URL(request.url);
  if (pathname.startsWith("/dashboard") && !token) {
    Cookies.delete("user");
    console.log("No token found, redirecting to login", token);
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname.startsWith("/admin") && !token) {
    Cookies.delete("user");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  if (pathname.startsWith("/admin/dashboard") && user?.role === "member") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
