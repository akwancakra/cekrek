// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { getToken } from "next-auth/jwt";
// import { Session, UserSession } from "./types/userSession.type";

// const restrictedRoutes = ["/login", "/register"];
// const publicRoutes = [
//     "/api",
//     "/_next/static",
//     "/_next/image",
//     "/static/images",
//     "/.*svg",
//     "/.*png",
//     "/.*jpg",
//     "/.*jpeg",
//     "/.*gif",
//     "/.*webp",
//     "/favicon.ico",
// ];

// const adminPrefixUrl = "/a";
// const teacherPrefixUrl = "/t";
// const parentPrefixUrl = "/p";

// export async function middleware(req: NextRequest) {
//     const pathname = req.nextUrl.pathname;
//     const token: Session | null = (await getToken({
//         req,
//         secret: process.env.NEXTAUTH_SECRET,
//     })) as Session | null;

//     console.log(pathname);

//     // console.log(token);

//     // CHECK IF THE ROUTE IS PUBLIC
//     const isPublicRoute =
//         pathname === "/" ||
//         publicRoutes.some((route) => pathname.startsWith(route));

//     // Allow access to public routes
//     if (isPublicRoute) {
//         return NextResponse.next();
//     }

//     // CHECK IF THE USER IS LOGGED IN
//     if (!token) {
//         // USER IS NOT LOGGED IN
//         if (!restrictedRoutes.includes(pathname)) {
//             // USER IS TRYING TO ACCESS A RESTRICTED ROUTE WITHOUT LOGIN
//             const url = new URL("/login", req.url);
//             url.searchParams.set("callbackUrl", encodeURI(req.url));
//             return NextResponse.redirect(url);
//         }
//     } else {
//         // USER IS LOGGED IN
//         const userRole = token?.role;

//         // REDIRECT BASED ON USER ROLE
//         if (pathname.startsWith(adminPrefixUrl) && userRole !== "admin") {
//             return NextResponse.redirect(new URL("/", req.url));
//         }
//         if (pathname.startsWith(teacherPrefixUrl) && userRole !== "teacher") {
//             return NextResponse.redirect(new URL("/", req.url));
//         }
//         if (pathname.startsWith(parentPrefixUrl) && userRole !== "parent") {
//             return NextResponse.redirect(new URL("/", req.url));
//         }

//         // USER IS TRYING TO ACCESS LOGIN OR REGISTER PAGE WHILE LOGGED IN
//         if (restrictedRoutes.includes(pathname)) {
//             return NextResponse.redirect(new URL("/", req.url));
//         }
//     }

//     // ALLOW ACCESS TO OTHER ROUTES
//     return NextResponse.next();
// }
