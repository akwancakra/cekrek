import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Daftar Akun | CekRek",
};

export default function UsersAdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
