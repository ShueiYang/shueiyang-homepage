import { NextRequest, NextResponse } from "next/server"
import { verifyAuth } from "./lib/auth";
 
// Middleware function to protect backoffice route and auth API route.
export async function middleware(req: NextRequest) {

  const jwtCookie = req.cookies.get("shueiJWT") 
  const url = req.url;
  
  if(!jwtCookie && url.includes("/backoffice/dashboard")) {
    return NextResponse.redirect(new URL("/backoffice/login", url)) 
  }
  if(!jwtCookie && req.nextUrl.pathname.startsWith("/api/auth/publish")) {
    return NextResponse.json(
      { message: "Authentification required"},
      { status: 401 }     
    );
  }
  try {
    if(jwtCookie) {
      const tokenValue = jwtCookie.value;
      // verify if the jwt is valid
      await verifyAuth(tokenValue);  

      if(url.includes("/backoffice/login")) {
        return NextResponse.rewrite(new URL("/backoffice/dashboard", url))
      }
      return NextResponse.next();
    }            
  } catch (err) {
    console.error(err);
    if(url.includes("/backoffice/dashboard")) {
      return NextResponse.redirect(new URL("/backoffice/login", url)) 
    } 
    if(req.nextUrl.pathname.startsWith("/api/auth/publish")) {
      return NextResponse.json(
        { message: "Jwt is expired or is not valid"},
        { status: 403 }     
      );
    } 
  }   
}
 
export const config = {
  matcher: ["/backoffice/:path*", "/api/auth/publish/:path*"]
}