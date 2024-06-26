import { Button } from "@/components/ui/button";
import Pill from "../alerts/Pill";

export default function AssessmentResult() {
    return (
        <section className="mx-auto max-w-7xl flex flex-col justify-center items-center w-full h-full gap-2 p-2">
            <div className="w-full border border-gray-300 rounded-lg p-2">
                <div>
                    <p className="text-gray-400 text-xs">
                        Hasil Akhir Asesmen Umum
                    </p>
                    <p className="text-large font-semibold tracking-tight">
                        Dewantara
                    </p>
                </div>
            </div>
            <div className="w-full border border-gray-300 rounded-lg mt-3 overflow-hidden">
                <div className="bg-purple-100 w-full p-3">
                    <p className="text-large font-semibold tracking-tight">
                        Screening Awal
                    </p>
                </div>
                <div className="p-3">
                    <div className="flex justify-between gap-2 mb-3">
                        <div>
                            <p className="font-medium tracking-tight text-medium">
                                Asesmen Awal
                            </p>
                            <p className="text-gray-400 text-small -mb-1">
                                Skor: 12 Ya, 8 Tidak
                            </p>
                        </div>
                        <Button
                            variant={"secondary"}
                            size={"icon"}
                            className="rounded-full"
                        >
                            <span className="material-symbols-outlined !text-xl !leading-4">
                                info
                            </span>
                        </Button>
                    </div>
                    <div className="flex justify-between gap-2">
                        <div>
                            <p className="font-medium tracking-tight text-medium">
                                Asesmen Follow Up
                            </p>
                            <p className="text-gray-400 text-small -mb-1">
                                Skor: 12 Ya, 8 Tidak
                            </p>
                        </div>
                        <Button
                            variant={"secondary"}
                            size={"icon"}
                            className="rounded-full"
                        >
                            <span className="material-symbols-outlined !text-xl !leading-4">
                                info
                            </span>
                        </Button>
                    </div>
                </div>
            </div>
            <div className="w-full border border-gray-300 rounded-lg mt-3 overflow-hidden">
                <div className="bg-purple-100 w-full p-3">
                    <p className="text-large font-semibold tracking-tight">
                        Skoring Soal
                    </p>
                </div>
                <div className="p-3">
                    <div className="flex justify-between gap-2 mb-3">
                        <div>
                            <p className="font-medium tracking-tight text-medium">
                                Soal 1
                            </p>
                            <p className="text-gray-400 text-small -mb-1">
                                Jika anda menunjuk sesuatu di ruangan, apakah
                                $namaAnak melihatnya?
                            </p>
                        </div>
                        <Pill type="primary" text="Lulus" icon="assignment" />
                    </div>
                    <div className="flex justify-between gap-2 mb-3">
                        <div>
                            <p className="font-medium tracking-tight text-medium">
                                Soal 2
                            </p>
                            <p className="text-gray-400 text-small -mb-1">
                                Jika anda menunjuk sesuatu di ruangan, apakah
                                $namaAnak melihatnya?
                            </p>
                        </div>
                        <Pill type="error" text="Gagal" icon="assignment" />
                    </div>
                    <div className="flex justify-between gap-2 mb-3">
                        <div>
                            <p className="font-medium tracking-tight text-medium">
                                Soal 3
                            </p>
                            <p className="text-gray-400 text-small -mb-1">
                                Jika anda menunjuk sesuatu di ruangan, apakah
                                $namaAnak melihatnya?
                            </p>
                        </div>
                        <Pill type="error" text="Gagal" icon="assignment" />
                    </div>
                    <div className="flex justify-between gap-2 mb-3">
                        <div>
                            <p className="font-medium tracking-tight text-medium">
                                Soal 4
                            </p>
                            <p className="text-gray-400 text-small -mb-1">
                                Jika anda menunjuk sesuatu di ruangan, apakah
                                $namaAnak melihatnya?
                            </p>
                        </div>
                        <Pill type="error" text="Gagal" icon="assignment" />
                    </div>
                </div>
            </div>
            <div className="flex gap-3 w-full mb-3 justify-between sm:justify-end">
                <Button variant={"outline"} className="gap-1">
                    <span className="material-symbols-outlined !text-xl !leading-none pointer-events-none">
                        chevron_left
                    </span>
                    <span>Kembali</span>
                </Button>
                <Button variant={"outline"} className="gap-1">
                    <span>Dapatkan Rekomendasi</span>
                    <span className="material-symbols-outlined !text-xl !leading-none pointer-events-none">
                        check
                    </span>
                </Button>
            </div>
        </section>
    );
}
