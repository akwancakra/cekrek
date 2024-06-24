import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Daftar Asesmen | CekRek",
};

export default function AssessmentTeacherLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
