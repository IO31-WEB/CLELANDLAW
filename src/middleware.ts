import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isAdminRoute     = createRouteMatcher(["/admin(.*)"]);
const isProtectedRoute = createRouteMatcher(["/dashboard(.*)", "/admin(.*)"]);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  // Rate limiting headers (actual enforcement via Upstash in API routes)
  const res = NextResponse.next();
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("X-Frame-Options", "DENY");

  if (isProtectedRoute(req)) {
    await auth.protect();
  }

  // Admin route: must be signed in — user ID check happens in the route itself
  if (isAdminRoute(req)) {
    await auth.protect();
  }

  return res;
});

export const config = {
  matcher: ["/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)", "/(api|trpc)(.*)"],
};
