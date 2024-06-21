import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Asesmen Nama | CekRek",
};

export default function AddClassLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
