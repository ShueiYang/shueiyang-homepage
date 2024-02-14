import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "./lib/auth";

// Middleware function to protect backoffice route and auth API route.
export async function middleware(req: NextRequest) {
  const jwtCookie = req.cookies.get("shueiJWT");
  const jwtSecret = process.env.JWT_SECRET ?? "";
  const url = req.url;

  if (!jwtCookie) {
    if (url.includes("/backoffice/admin")) {
      return;
    } else if (url.includes("/backoffice")) {
      return NextResponse.redirect(new URL("/backoffice/admin", url));
    } else {
      return NextResponse.json(
        { message: "Authentification required" },
        { status: 401 },
      );
    }
  }
  try {
    const tokenValue = jwtCookie.value;
    // verify if the jwt is valid
    await verifyAuth(tokenValue, jwtSecret);

    if (url.includes("/backoffice/admin")) {
      return NextResponse.rewrite(new URL("/backoffice/dashboard", url));
    }
    return NextResponse.next();
  } catch (err) {
    console.error(err);
    if (req.nextUrl.pathname.startsWith("/backoffice/dashboard")) {
      return NextResponse.redirect(new URL("/backoffice/admin", url));
    }
    return NextResponse.json(
      { message: "Jwt is expired or is not valid" },
      { status: 403 },
    );
  }
}

export const config = {
  matcher: ["/backoffice/:path*"],
};
