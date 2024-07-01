import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Detil Asesmen | CekRek",
};

export default function AssessmentDetail({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
