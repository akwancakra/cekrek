import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import "./globalsIcons.css";
import "react-day-picker/dist/style.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "CekRek | Cek Rekomendasi",
    description: "First page of CekRek",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="scroll-smooth">
            <body className={inter.className}>
                {children}
                <Toaster richColors />
            </body>
        </html>
    );
}
