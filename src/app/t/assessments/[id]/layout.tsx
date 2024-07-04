import CustomSuspense from "@/components/elements/suspsenses/CustomSuspense";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Detil Asesmen | CekRek",
};

export default function AssessmentDetail({
    children,
}: {
    children: React.ReactNode;
}) {
    return <CustomSuspense>{children}</CustomSuspense>;
}
