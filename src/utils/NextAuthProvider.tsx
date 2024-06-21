"use client";

import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function NextAuthProvider({
    children,
}: {
    children: ReactNode;
}) {
    const pathname = usePathname();
    const urlExceptions = ["/login", "/register"];

    if (urlExceptions.includes(pathname)) {
        return <SessionProvider>{children}</SessionProvider>;
    }

    return <SessionProvider>{children}</SessionProvider>;
}
