import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Detil Murid | CekRek",
};

export default function StudentDetailAdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
