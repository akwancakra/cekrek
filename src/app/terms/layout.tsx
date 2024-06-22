import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Syarat dan Ketentuan | CekRek",
};

export default function AddClassLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
