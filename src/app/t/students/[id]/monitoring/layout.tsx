import CustomSuspense from "@/components/elements/suspsenses/CustomSuspense";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Monitoring | CekRek",
};

export default function MonitoringLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <CustomSuspense>{children}</CustomSuspense>;
}
