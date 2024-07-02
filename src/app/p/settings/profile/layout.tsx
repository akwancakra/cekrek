import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Profil Orang Tua | CekRek",
};

export default function ParentProfileLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
