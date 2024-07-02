import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Tambah Siswa | CekRek",
};

export default function StudentAddLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
