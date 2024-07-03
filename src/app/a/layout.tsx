import type { Metadata } from "next";
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
    return <DashboardAdmin>{children}</DashboardAdmin>;
}
