import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Tambah Rekomendasi | CekRek",
};

export default function AddRecommendationsAdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
