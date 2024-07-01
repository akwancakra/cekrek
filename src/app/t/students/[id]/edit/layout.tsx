import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Ubah Siswa | CekRek",
};

export default function StudentEditLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
