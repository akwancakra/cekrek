import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Detil Dwiky Putra | CekRek",
};

export default function AddClassLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
