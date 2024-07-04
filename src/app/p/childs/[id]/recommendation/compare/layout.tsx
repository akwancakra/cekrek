import CustomSuspense from "@/components/elements/suspsenses/CustomSuspense";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Perbandingan Monitoring Rekomendasi Anak | CekRek",
};

export default function CompareMonitoringLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <CustomSuspense>{children}</CustomSuspense>;
}
