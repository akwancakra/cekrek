import type { Metadata } from "next";
import NextAuthProvider from "@/utils/NextAuthProvider";
import DashboardParent from "@/components/layouts/DashboardParent";

export const metadata: Metadata = {
    title: "Dasbor Orang Tua | CekRek",
    description: "First page of CekRek",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <NextAuthProvider>
            <DashboardParent>{children}</DashboardParent>
        </NextAuthProvider>
    );
}
