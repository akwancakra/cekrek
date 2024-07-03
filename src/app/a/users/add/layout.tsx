import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Tambah Akun | CekRek",
};

export default function AddUsersAdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
