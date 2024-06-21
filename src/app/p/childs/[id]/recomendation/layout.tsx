import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Rekomendasi Aktifitas Nama | CekRek",
};

export default function AddClassLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
