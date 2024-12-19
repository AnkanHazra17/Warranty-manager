import {NextRequest, NextResponse} from "next/server";

const publicRoutes = ["/sign-in"]

export function middleware(request: NextRequest) {
    const {cookies, nextUrl} = request
    const accessToken = cookies.get("sessionID")
    const isPublicRoute = publicRoutes.find((route) => nextUrl.pathname.startsWith(route))

    if(accessToken && isPublicRoute){
        return NextResponse.redirect(new URL("/", nextUrl))
    }

    if(!accessToken && !isPublicRoute) {
        return NextResponse.redirect(new URL("/sign-in", nextUrl))
    }
}

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next|api|trpc).*)"]
}