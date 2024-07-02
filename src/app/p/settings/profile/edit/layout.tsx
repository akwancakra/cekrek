import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Ubah Akun | CekRek",
};

export default function ParentEditLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
