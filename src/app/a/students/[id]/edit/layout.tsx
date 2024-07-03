import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Ubah Murid | CekRek",
};

export default function StudentEditAdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
