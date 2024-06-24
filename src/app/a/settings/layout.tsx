import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Pengaturan | CekRek",
};

export default function AddClassLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
