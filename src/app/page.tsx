"use client";

import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { getUrlFromRole } from "@/utils/converters";
import useProfile from "@/utils/useProfile";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
    const { profile } = useProfile();

    return (
        <>
            <Header />

            <div className="relative" id="home">
                <div
                    aria-hidden="true"
                    className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-70"
                >
                    <div className="blur-[106px] h-32 bg-gradient-to-r from-yellow-400 to-red-300 dark:to-indigo-600" />
                    <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700" />
                </div>
                <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
                    <div className="relative pt-36 ml-auto">
                        <div className="lg:w-2/3 text-center mx-auto">
                            <h1 className="text-gray-900 dark:text-white font-bold text-5xl md:text-6xl xl:text-7xl">
                                Rekomendasi Tepat,{" "}
                                <span className="text-primary dark:text-purple-400">
                                    Hasil Hebat
                                </span>
                            </h1>
                            <p className="mt-8 text-small text-gray-700 dark:text-gray-300">
                                Cekrek adalah aplikasi pemantauan dan evaluasi
                                perkembangan siswa. Menggunakan asesmen awal dan
                                tindak lanjut, aplikasi ini menyimpan dan
                                memproses data siswa, menentukan kategori
                                risiko, dan menampilkan informasi secara
                                terstruktur. Dengan teknologi modern seperti
                                Prisma, Cekrek menyediakan antarmuka intuitif
                                untuk manajemen dan analisis data siswa.
                            </p>
                            <div className="mt-16 flex flex-wrap justify-center gap-y-4 gap-x-6">
                                <Button
                                    variant={"default"}
                                    asChild
                                    className="rounded-full"
                                >
                                    <Link
                                        href={
                                            profile?.role
                                                ? getUrlFromRole(profile.role)
                                                : "/login"
                                        }
                                    >
                                        <span className="relative text-sm font-semibold text-white">
                                            Coba Sekarang
                                        </span>
                                    </Link>
                                </Button>
                                <Button
                                    variant={"default"}
                                    asChild
                                    className="rounded-full bg-purple-200 text-primary hover:bg-purple-300 hover:text-primary dark:bg-purple-950 dark:border dark:border-purple-800 dark:text-white dark:hover:bg-purple-900"
                                >
                                    <Link href={"#features"}>
                                        <span className="relative text-sm font-semibold">
                                            Pelajari Lebih
                                        </span>
                                    </Link>
                                </Button>
                            </div>
                            <div className="hidden py-8 mt-16 border-y border-gray-100 dark:border-gray-800 sm:flex justify-between">
                                <div className="text-left">
                                    <h6 className="text-lg font-semibold text-gray-700 dark:text-white">
                                        Integrasi
                                    </h6>
                                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                                        Integrasi antara guru dan orang tua
                                    </p>
                                </div>
                                <div className="text-left">
                                    <h6 className="text-lg font-semibold text-gray-700 dark:text-white">
                                        Kesesuaian
                                    </h6>
                                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                                        Rekomendasi yang otomatis dan sesuai
                                    </p>
                                </div>
                                <div className="text-left">
                                    <h6 className="text-lg font-semibold text-gray-700 dark:text-white">
                                        Mudah
                                    </h6>
                                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                                        Tampilan yang mudah untuk digunakan
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-12 grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4">
                            <div className="p-4 grayscale transition duration-200 hover:grayscale-0">
                                <Image
                                    src="/static/images/logo-kemdikbud.png"
                                    className="h-max max-h-10 w-auto mx-auto"
                                    loading="lazy"
                                    alt="client logo"
                                    width="100"
                                    height="100"
                                />
                            </div>
                            <div className="p-4 grayscale transition duration-200 hover:grayscale-0">
                                <Image
                                    src="/static/images/logo-simbelmawa.png"
                                    className="h-max max-h-10 w-auto mx-auto"
                                    loading="lazy"
                                    alt="client logo"
                                    width="100"
                                    height="100"
                                />
                            </div>
                            <div className="p-4 grayscale transition duration-200 hover:grayscale-0">
                                <Image
                                    src="/static/images/logo-kampus-merdeka.png"
                                    className="h-max max-h-10 w-auto mx-auto"
                                    loading="lazy"
                                    alt="client logo"
                                    width="100"
                                    height="100"
                                />
                            </div>
                            <div className="p-4 grayscale transition duration-200 hover:grayscale-0">
                                <Image
                                    src="/static/images/logo-pkm.png"
                                    className="h-max max-h-10 w-auto mx-auto"
                                    loading="lazy"
                                    alt="client logo"
                                    width="100"
                                    height="100"
                                />
                            </div>
                            <div className="p-4 grayscale transition duration-200 hover:grayscale-0">
                                <Image
                                    src="/static/images/logo-upi.png"
                                    className="h-max max-h-10 w-auto mx-auto"
                                    loading="lazy"
                                    alt="client logo"
                                    width="100"
                                    height="100"
                                />
                            </div>
                            <div className="p-4 grayscale transition duration-200 hover:grayscale-0">
                                <Image
                                    src="/static/images/logo-satria.svg"
                                    className="h-max max-h-10 w-auto mx-auto dark:fill-white fill-black"
                                    loading="lazy"
                                    alt="client logo"
                                    width="100"
                                    height="100"
                                />
                            </div>
                            <div className="p-4 flex grayscale transition duration-200 hover:grayscale-0">
                                <Image
                                    src="/static/images/logo-helov.png"
                                    className="h-max max-h-10 w-auto m-auto"
                                    loading="lazy"
                                    alt="client logo"
                                    width="100"
                                    height="100"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="features" className="my-10">
                <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
                    <div className="md:w-2/3 lg:w-1/2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6 text-yellow-600"
                        >
                            <path
                                fillRule="evenodd"
                                d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <h2 className="my-8 text-2xl font-bold text-gray-700 dark:text-white md:text-4xl">
                            Sistem informasi yang tepat untuk rekomendasi
                            aktivitas secara otomatis
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            CekRek hadir untuk membantu orang tua dan guru dalam
                            proses monitoring perkembangan anak mereka. Didukung
                            oleh teknologi terkini, CekRek menawarkan solusi
                            komprehensif untuk memantau kemajuan anak autis.
                        </p>
                    </div>
                    <div className="mt-16 grid divide-x divide-y divide-gray-100 dark:divide-neutral-600 overflow-hidden rounded-3xl border border-gray-100 text-gray-600 dark:border-neutral-600 sm:grid-cols-2 lg:grid-cols-4 lg:divide-y-0 xl:grid-cols-4">
                        <div className="group relative bg-white transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10 dark:bg-neutral-700 dark:hover:bg-neutral-800">
                            <div className="relative space-y-8 py-12 p-8">
                                <Image
                                    src="https://cdn-icons-png.flaticon.com/512/4341/4341139.png"
                                    className="w-12"
                                    width={512}
                                    height={512}
                                    alt="burger illustration"
                                    draggable="false"
                                />
                                <div className="space-y-2">
                                    <h5 className="text-xl font-semibold text-gray-700 dark:text-white transition group-hover:text-primary">
                                        Fleksibel
                                    </h5>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        Pantau perkembangan anak Anda melalui
                                        perangkat apa pun.
                                    </p>
                                </div>
                                <a
                                    href="#"
                                    className="flex items-center justify-between dark:text-neutral-500 group-hover:text-primary"
                                >
                                    <span className="text-sm">
                                        Baca Selengkapnya
                                    </span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="w-5 h-5 -translate-x-4 text-2xl opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div className="group relative bg-white transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10 dark:bg-neutral-700 dark:hover:bg-neutral-800">
                            <div className="relative space-y-8 py-12 p-8">
                                <Image
                                    src="https://cdn-icons-png.flaticon.com/512/4341/4341134.png"
                                    className="w-12"
                                    width={512}
                                    height={512}
                                    alt="burger illustration"
                                    draggable="false"
                                />
                                <div className="space-y-2">
                                    <h5 className="text-xl font-semibold text-gray-700 dark:text-white transition group-hover:text-primary">
                                        Visualisasi Data
                                    </h5>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        Dapatkan pemahaman yang lebih baik
                                        tentang pola perkembangan anak Anda.
                                    </p>
                                </div>
                                <a
                                    href="#"
                                    className="flex items-center justify-between dark:text-neutral-500 group-hover:text-primary"
                                >
                                    <span className="text-sm">
                                        Baca Selengkapnya
                                    </span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="w-5 h-5 -translate-x-4 text-2xl opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div className="group relative bg-white transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10 dark:bg-neutral-700 dark:hover:bg-neutral-800">
                            <div className="relative space-y-8 py-12 p-8">
                                <Image
                                    src="https://cdn-icons-png.flaticon.com/512/4341/4341160.png"
                                    className="w-12"
                                    width={512}
                                    height={512}
                                    alt="burger illustration"
                                    draggable="false"
                                />
                                <div className="space-y-2">
                                    <h5 className="text-xl font-semibold text-gray-700 dark:text-white transition group-hover:text-primary">
                                        Efisiensi
                                    </h5>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        Tugas-tugas administrasi yang rumit
                                        menjadi lebih mudah.
                                    </p>
                                </div>
                                <a
                                    href="#"
                                    className="flex items-center justify-between dark:text-neutral-500 group-hover:text-primary"
                                >
                                    <span className="text-sm">
                                        Baca Selengkapnya
                                    </span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="w-5 h-5 -translate-x-4 text-2xl opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div className="group relative bg-gray-50 transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10 dark:bg-neutral-800 dark:hover:bg-neutral-800">
                            <div className="relative space-y-8 py-12 p-8 transition duration-300 group-hover:bg-white dark:group-hover:bg-neutral-900">
                                <Image
                                    src="https://cdn-icons-png.flaticon.com/512/4341/4341025.png"
                                    className="w-12"
                                    width={512}
                                    height={512}
                                    alt="burger illustration"
                                    draggable="false"
                                />
                                <div className="space-y-2">
                                    <h5 className="text-xl font-semibold text-gray-700 dark:text-white transition group-hover:text-primary">
                                        Keamanan
                                    </h5>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        Kami menjamin data yang anda miliki aman
                                        dan terlindungi.
                                    </p>
                                </div>
                                <a
                                    href="#"
                                    className="flex items-center justify-between group-hover:text-primary"
                                >
                                    <span className="text-sm">
                                        Baca Selengkapnya
                                    </span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="w-5 h-5 -translate-x-4 text-2xl opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="solution" className="my-10">
                <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6 text-sky-500"
                    >
                        <path
                            fillRule="evenodd"
                            d="M2.25 13.5a8.25 8.25 0 018.25-8.25.75.75 0 01.75.75v6.75H18a.75.75 0 01.75.75 8.25 8.25 0 01-16.5 0z"
                            clipRule="evenodd"
                        />
                        <path
                            fillRule="evenodd"
                            d="M12.75 3a.75.75 0 01.75-.75 8.25 8.25 0 018.25 8.25.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75V3z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <div className="space-y-6 justify-between text-gray-600 md:flex flex-row-reverse md:gap-6 md:space-y-0 lg:gap-12 lg:items-center">
                        <div className="md:5/12 lg:w-1/2">
                            <Image
                                src="/static/images/pie.svg"
                                alt="image"
                                loading="lazy"
                                width="12"
                                height="12"
                                className="!w-full"
                                draggable="false"
                            />
                        </div>
                        <div className="md:7/12 lg:w-1/2">
                            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
                                Kemudahan dan keunggulan dalam 1 sistem
                                informasi
                            </h2>
                            <p className="my-8 text-gray-600 dark:text-gray-300">
                                Sistem informasi CekRek memberikan solusi
                                lengkap untuk memenuhi kebutuhan perkembangan
                                anak autis. Dengan otomatisasi rekomendasi yang
                                disesuaikan dengan kebutuhan individu, asesmen
                                digital yang mudah, dan pengelolaan data yang
                                efisien, Guru dan orang tua dapat memantau
                                perkembangan anak mereka dengan lebih baik.
                            </p>
                            <div className="divide-y space-y-4 divide-gray-100 dark:divide-gray-800">
                                <div className="mt-8 flex gap-4 md:items-center">
                                    <div className="w-12 h-12 flex gap-4 rounded-full bg-indigo-100 dark:bg-indigo-900/20">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="w-6 h-6 m-auto text-indigo-500 dark:text-indigo-400"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97zM6.75 8.25a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H7.5z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <div className="w-5/6">
                                        <h4 className="font-semibold text-lg text-gray-700 dark:text-indigo-300">
                                            Digitalisasi Asesmen
                                        </h4>
                                        <p className="text-gray-500 dark:text-gray-400">
                                            Asesmen yang dilakukan secara
                                            digital dan mudah
                                        </p>
                                    </div>
                                </div>
                                <div className="pt-4 flex gap-4 md:items-center">
                                    <div className="w-12 h-12 flex gap-4 rounded-full bg-teal-100 dark:bg-teal-900/20">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="w-6 h-6 m-auto text-teal-600 dark:text-teal-400"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <div className="w-5/6">
                                        <h4 className="font-semibold text-lg text-gray-700 dark:text-teal-300">
                                            Otomatisasi Rekomendasi
                                        </h4>
                                        <p className="text-gray-500 dark:text-gray-400">
                                            Rekomendasi yang otomatis dan sesuai
                                            dengan kebutuhan anak
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-gray-600 dark:text-gray-300" id="testimonials">
                <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
                    <div className="mb-20 space-y-4 px-6 md:px-0">
                        <h2 className="text-center text-2xl font-bold text-gray-800 dark:text-white md:text-4xl">
                            Apa kata mereka
                        </h2>
                    </div>
                    <div className="md:columns-2 lg:columns-3 gap-8 space-y-8">
                        <div className="aspect-auto p-8 border border-gray-100 rounded-3xl bg-white shadow-2xl shadow-gray-600/10 dark:bg-neutral-900 dark:border-neutral-600 dark:shadow-none">
                            <div className="flex gap-4">
                                <div className="w-12">
                                    <AspectRatio ratio={1 / 1}>
                                        <Image
                                            className="rounded-full object-cover bg-center"
                                            src="/static/images/tim/merah-akwan.jpg"
                                            alt="user avatar"
                                            loading="lazy"
                                            draggable={false}
                                            fill={true}
                                        />
                                    </AspectRatio>
                                </div>
                                <div>
                                    <h6 className="text-lg font-medium text-gray-700 dark:text-white">
                                        Akwan Cakra
                                    </h6>
                                    <p className="text-sm text-gray-500 dark:text-gray-300">
                                        Pengembang
                                    </p>
                                </div>
                            </div>
                            <p className="mt-8">
                                Kami akan terus mengembangkan platform ini
                                dengan menambahkan fitur-fitur baru yang
                                inovatif. Tujuan kami adalah menciptakan
                                lingkungan untuk mendukung tumbuh kembang
                                anak-anak berkebutuhan khusus.
                            </p>
                        </div>
                        <div className="aspect-auto p-8 border border-gray-100 rounded-3xl bg-white shadow-2xl shadow-gray-600/10 dark:bg-neutral-900 dark:border-neutral-600 dark:shadow-none">
                            <div className="flex gap-4">
                                <div className="w-12">
                                    <AspectRatio ratio={1 / 1}>
                                        <Image
                                            className="rounded-full object-cover bg-center"
                                            src="/static/images/tim/merah-krisna.jpg"
                                            alt="user avatar"
                                            loading="lazy"
                                            draggable={false}
                                            fill={true}
                                        />
                                    </AspectRatio>
                                </div>
                                <div>
                                    <h6 className="text-lg font-medium text-gray-700 dark:text-white">
                                        Krisna Santosa
                                    </h6>
                                    <p className="text-sm text-gray-500 dark:text-gray-300">
                                        Pengembang
                                    </p>
                                </div>
                            </div>
                            <p className="mt-8">
                                {" "}
                                Dalam mengembangkan platform ini, kami telah
                                bekerja sama dengan mitra dan ahli di bidang
                                teknologi. Kolaborasi ini memungkinkan kami
                                untuk menciptakan sebuah produk yang benar-benar
                                memenuhi kebutuhan pengguna.
                            </p>
                        </div>
                        <div className="aspect-auto p-8 border border-gray-100 rounded-3xl bg-white shadow-2xl shadow-gray-600/10 dark:bg-neutral-900 dark:border-neutral-600 dark:shadow-none">
                            <div className="flex gap-4">
                                <div className="w-12">
                                    <AspectRatio ratio={1 / 1}>
                                        <Image
                                            className="rounded-full object-cover bg-center"
                                            src="/static/images/tim/merah-indri.jpg"
                                            alt="user avatar"
                                            loading="lazy"
                                            draggable={false}
                                            fill={true}
                                        />
                                    </AspectRatio>
                                </div>
                                <div>
                                    <h6 className="text-lg font-medium text-gray-700 dark:text-white">
                                        Indri Salsabila
                                    </h6>
                                    <p className="text-sm text-gray-500 dark:text-gray-300">
                                        Dokumen Pengembang
                                    </p>
                                </div>
                            </div>
                            <p className="mt-8">
                                Kami percaya bahwa teknologi dapat menjadi
                                kekuatan besar dalam mengatasi tantangan.
                                Platform ini adalah bukti nyata dari komitmen
                                kami untuk menggunakan teknologi untuk kebaikan.
                                Kami berharap dapat terus berkontribusi dalam
                                pengembangan solusi inovatif untuk mendukung
                                anak-anak autis.
                            </p>
                        </div>
                        <div className="aspect-auto p-8 border border-gray-100 rounded-3xl bg-white shadow-2xl shadow-gray-600/10 dark:bg-neutral-900 dark:border-neutral-600 dark:shadow-none">
                            <div className="flex gap-4">
                                <div className="w-12">
                                    <AspectRatio ratio={1 / 1}>
                                        <Image
                                            className="rounded-full object-cover bg-center"
                                            src="/static/images/tim/merah-anisa.jpg"
                                            alt="user avatar"
                                            loading="lazy"
                                            draggable={false}
                                            fill={true}
                                        />
                                    </AspectRatio>
                                </div>
                                <div>
                                    <h6 className="text-lg font-medium text-gray-700 dark:text-white">
                                        Anisa Rohmah
                                    </h6>
                                    <p className="text-sm text-gray-500 dark:text-gray-300">
                                        Dokumen Pengembang
                                    </p>
                                </div>
                            </div>
                            <p className="mt-8">
                                Dengan menggunakan platform ini, orang tua dapat
                                melacak perkembangan anak mereka secara lebih
                                efektif dan membuat keputusan yang lebih tepat.
                            </p>
                        </div>
                        <div className="aspect-auto p-8 border border-gray-100 rounded-3xl bg-white shadow-2xl shadow-gray-600/10 dark:bg-neutral-900 dark:border-neutral-600 dark:shadow-none">
                            <div className="flex gap-4">
                                <div className="w-12">
                                    <AspectRatio ratio={1 / 1}>
                                        <Image
                                            className="rounded-full object-cover bg-center"
                                            src="/static/images/tim/merah-tiara.jpg"
                                            alt="user avatar"
                                            loading="lazy"
                                            draggable={false}
                                            fill={true}
                                        />
                                    </AspectRatio>
                                </div>
                                <div>
                                    <h6 className="text-lg font-medium text-gray-700 dark:text-white">
                                        Tiara Nazwa
                                    </h6>
                                    <p className="text-sm text-gray-500 dark:text-gray-300">
                                        Sosmed Manajer
                                    </p>
                                </div>
                            </div>
                            <p className="mt-8">
                                {" "}
                                Desain website ini sangat responsif sehingga
                                dapat diakses dengan mudah melalui berbagai
                                perangkat, baik itu komputer, tablet, maupun
                                smartphone.
                            </p>
                        </div>
                        <div className="aspect-auto p-8 border border-gray-100 rounded-3xl bg-white shadow-2xl shadow-gray-600/10 dark:bg-neutral-900 dark:border-neutral-600 dark:shadow-none">
                            <div className="flex gap-4">
                                <div className="w-12">
                                    <AspectRatio ratio={1 / 1}>
                                        <Image
                                            className="rounded-full object-cover bg-center"
                                            src="/static/images/user-default.jpg"
                                            alt="user avatar"
                                            loading="lazy"
                                            draggable={false}
                                            fill={true}
                                        />
                                    </AspectRatio>
                                </div>
                                <div>
                                    <h6 className="text-lg font-medium text-gray-700 dark:text-white">
                                        Triana Lestari
                                    </h6>
                                    <p className="text-sm text-gray-500 dark:text-gray-300">
                                        Pembimbing
                                    </p>
                                </div>
                            </div>
                            <p className="mt-8">
                                Platform ini sangat bermanfaat bagi para orang
                                tua dan guru dalam memantau perkembangan anak
                                autis. Dengan fitur-fitur yang lengkap, CekRek
                                memungkinkan pengguna untuk mendapatkan
                                informasi yang akurat dan terkini.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative py-16 my-14">
                <div
                    aria-hidden="true"
                    className="absolute inset-0 h-max w-full m-auto grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-70"
                >
                    <div className="blur-[106px] h-32 bg-gradient-to-r from-yellow-400 to-red-300 dark:to-indigo-600" />
                    <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700" />
                </div>
                <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
                    <div className="relative">
                        <div className="mt-6 m-auto space-y-6 md:w-8/12 lg:w-7/12">
                            <h1 className="text-center text-4xl font-bold md:text-5xl">
                                Mari coba sekarang
                            </h1>
                            <p className="text-center text-xl">
                                Dapatkan Rekomendasi Aktivitas yang sesuai
                                dengan kebutuhan anak Anda!
                            </p>
                            <div className="flex flex-wrap justify-center gap-6">
                                <Button
                                    variant={"default"}
                                    asChild
                                    className="rounded-full"
                                >
                                    <Link
                                        href={
                                            profile?.role
                                                ? getUrlFromRole(profile.role)
                                                : "/login"
                                        }
                                    >
                                        <span className="relative text-sm font-semibold">
                                            Coba Sekarang
                                        </span>
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
