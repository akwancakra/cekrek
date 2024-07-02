import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Tambah Orang Tua atau Wali | CekRek",
};

export default function StudentAddLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
