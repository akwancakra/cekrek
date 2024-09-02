"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";

export default function TermsAndConditions() {
    const [isAccepted, setIsAccepted] = useState(false);

    const handleAccept = () => {
        setIsAccepted(true);
        // Di sini Anda bisa menambahkan logika lain, seperti menyimpan status penerimaan ke database atau local storage
    };

    return (
        <>
            <Header />

            <div className="min-h-svh max-w-2xl mx-auto py-20 px-4">
                <h1 className="text-2xl font-bold mb-6">
                    Syarat dan Ketentuan
                </h1>

                <div className="prose mb-6">
                    <h2>1. Pendahuluan</h2>
                    <p>
                        Selamat datang di aplikasi kami. Dengan menggunakan
                        aplikasi ini, Anda menyetujui syarat dan ketentuan
                        berikut.
                    </p>

                    <h2>2. Penggunaan Layanan</h2>
                    <p>
                        Anda setuju untuk menggunakan layanan kami hanya untuk
                        tujuan yang sah dan sesuai dengan ketentuan ini.
                    </p>

                    <h2>3. Privasi</h2>
                    <p>
                        Penggunaan data Anda diatur dalam Kebijakan Privasi
                        kami.
                    </p>

                    <h2>4. Perubahan Ketentuan</h2>
                    <p>
                        Kami berhak mengubah syarat dan ketentuan ini
                        sewaktu-waktu. Perubahan akan efektif setelah diposting
                        di aplikasi.
                    </p>
                </div>

                <Button
                    onClick={handleAccept}
                    disabled={isAccepted}
                    className="mb-3"
                >
                    {isAccepted
                        ? "Syarat & Ketentuan Diterima"
                        : "Terima Syarat & Ketentuan"}
                </Button>

                {isAccepted && (
                    <p className="text-green-600">
                        Terima kasih telah menyetujui Syarat dan Ketentuan kami.
                    </p>
                )}
            </div>

            <Footer />
        </>
    );
}
