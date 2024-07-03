import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Edit Rekomendasi | CekRek",
};

export default function EditRecommendationsAdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
