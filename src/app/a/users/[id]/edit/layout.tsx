import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Ubah Akun | CekRek",
};

export default function EditUsersAdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
