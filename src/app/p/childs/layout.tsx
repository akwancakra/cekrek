import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Daftar Anak | CekRek",
};

export default function AddClassLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
