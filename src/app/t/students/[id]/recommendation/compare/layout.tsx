import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Perbandingan Monitoring Rekomendasi Anak | CekRek",
};

export default function CompareMonitoringLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
