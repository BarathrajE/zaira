import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;
  const { pathname } = req.nextUrl;
  // Define your public routes from the actual folders
  const publicRoutes = [
    "/",
    "/authform", 
    "/womencollection",
    "/mencollection",
    "/productdisplay",
    "/whatsapppage",
    "/dashboard",
  ];
  // Allow access to proposal/details sub-routes (optional)
  const isProposalFormRoute = (path: string) => {
    const segments = path.split("/");
    return (
      segments.length >= 3 &&
      ["proposal", "details"].includes(segments[segments.length - 1])
    );
  };
  const isPublicRoute =
    publicRoutes.includes(pathname) || isProposalFormRoute(pathname);
  if (!isPublicRoute && !token) {
    return NextResponse.redirect(new URL("/authform", req.url)); 
  }
  return NextResponse.next();
}
export const config = {
  matcher: "/((?!_next|static|favicon.ico).*)",
};
