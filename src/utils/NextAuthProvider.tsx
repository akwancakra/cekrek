"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { ReactNode, useState } from "react";

export default function NextAuthProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [queryClient] = useState(
        new QueryClient({ defaultOptions: { queries: { staleTime: 5000 } } })
    );

    return (
        <SessionProvider>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </SessionProvider>
    );
}
