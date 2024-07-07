import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import "./globalsIcons.css";
import "react-day-picker/dist/style.css";
import NextAuthProvider from "@/utils/NextAuthProvider";
import { ThemeProvider } from "@/components/elements/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "CekRek | Cek Rekomendasi",
    description:
        "Sebuah sistem informasi yang memudahkan guru dan orang tua dalam memonitoring anak mereka",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="scroll-smooth">
            <body className={inter.className}>
                <NextAuthProvider>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="light"
                        enableSystem
                        disableTransitionOnChange
                    >
                        {children}
                    </ThemeProvider>
                </NextAuthProvider>
                <Toaster richColors />
            </body>
        </html>
    );
}
