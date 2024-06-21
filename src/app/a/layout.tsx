import type { Metadata } from "next";
import NextAuthProvider from "@/utils/NextAuthProvider";
import DashboardAdmin from "@/components/layouts/DashboardAdmin";

export const metadata: Metadata = {
    title: "Dasbor Admin | CekRek",
    description: "First page of CekRek",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <NextAuthProvider>
            <DashboardAdmin>{children}</DashboardAdmin>
        </NextAuthProvider>
    );
}
