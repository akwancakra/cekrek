"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { getUrlFromRole } from "@/utils/converters";
import useProfile from "@/utils/useProfile";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
    const profile = useProfile();

    return (
        <>
            <header>
                <nav className="z-10 w-full absolute">
                    <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
                        <div className="flex flex-wrap items-center justify-between py-2 gap-6 md:py-4 md:gap-0 relative">
                            <input
                                aria-hidden="true"
                                type="checkbox"
                                name="toggle_nav"
                                id="toggle_nav"
                                className="hidden peer"
                            />
                            <div className="relative z-20 w-full flex justify-between lg:w-max md:px-0">
                                <Link
                                    href={"/"}
                                    aria-label="logo"
                                    className="flex space-x-2 items-center"
                                >
                                    <Image
                                        src={"/static/images/logo.png"}
                                        alt="Logo CekRek"
                                        width={35}
                                        height={35}
                                    />
                                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                        CekRek
                                    </span>
                                </Link>
                                <div className="relative flex items-center lg:hidden max-h-10">
                                    <label
                                        role="button"
                                        htmlFor="toggle_nav"
                                        aria-label="humburger"
                                        id="hamburger"
                                        className="relative  p-6 -mr-6"
                                    >
                                        <div
                                            aria-hidden="true"
                                            id="line"
                                            className="m-auto h-0.5 w-5 rounded bg-sky-900 dark:bg-gray-300 transition duration-300"
                                        />
                                        <div
                                            aria-hidden="true"
                                            id="line2"
                                            className="m-auto mt-2 h-0.5 w-5 rounded bg-sky-900 dark:bg-gray-300 transition duration-300"
                                        />
                                    </label>
                                </div>
                            </div>
                            <div
                                aria-hidden="true"
                                className="fixed z-10 inset-0 h-screen w-screen bg-white/70 backdrop-blur-2xl origin-bottom scale-y-0 transition duration-500 peer-checked:origin-top peer-checked:scale-y-100 lg:hidden dark:bg-gray-900/70"
                            />
                            <div
                                className="flex-col z-20 flex-wrap gap-6 p-8 rounded-xl border border-gray-100 bg-white shadow-2xl shadow-gray-600/10 justify-end w-full invisible opacity-0 translate-y-1  absolute top-full left-0 transition-all duration-300 scale-95 origin-top 
                      lg:relative lg:scale-100 lg:peer-checked:translate-y-0 lg:translate-y-0 lg:flex lg:flex-row lg:items-center lg:gap-0 lg:p-0 lg:bg-transparent lg:w-7/12 lg:visible lg:opacity-100 lg:border-none
                      peer-checked:scale-100 peer-checked:opacity-100 peer-checked:visible lg:shadow-none 
                      dark:shadow-none dark:bg-gray-800 dark:border-gray-700"
                            >
                                <div className="text-gray-600 dark:text-gray-300 lg:pr-4 lg:w-auto w-full lg:pt-0">
                                    <ul className="tracking-wide font-medium lg:text-sm flex-col flex lg:flex-row gap-6 lg:gap-0">
                                        {profile?.role && (
                                            <li>
                                                <Link
                                                    href={getUrlFromRole(
                                                        profile.role
                                                    )}
                                                    className="block md:px-4 transition hover:text-primary"
                                                >
                                                    <span>Dasbor</span>
                                                </Link>
                                            </li>
                                        )}
                                        <li>
                                            <Link
                                                href="#features"
                                                className="block md:px-4 transition hover:text-primary"
                                            >
                                                <span>Fitur</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="#solution"
                                                className="block md:px-4 transition hover:text-primary"
                                            >
                                                <span>Solusi</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="#testimonials"
                                                className="block md:px-4 transition hover:text-primary"
                                            >
                                                <span>Testimoni</span>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="mt-6 lg:mt-0">
                                    {profile ? (
                                        <Button
                                            variant={"default"}
                                            className="rounded-full w-full sm:w-fit"
                                            onClick={() => signOut()}
                                        >
                                            <span className="relative text-sm font-semibold text-white">
                                                Keluar
                                            </span>
                                        </Button>
                                    ) : (
                                        <Button
                                            variant={"default"}
                                            asChild
                                            className="rounded-full w-full sm:w-fit"
                                        >
                                            <Link href={"/login"}>
                                                <span className="relative text-sm font-semibold text-white">
                                                    Masuk
                                                </span>
                                            </Link>
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>

            <div className="relative" id="home">
                <div
                    aria-hidden="true"
                    className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20"
                >
                    <div className="blur-[106px] h-32 bg-gradient-to-r from-yellow-400 to-red-300 dark:to-indigo-600" />
                    <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700" />
                </div>
                <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
                    <div className="relative pt-36 ml-auto">
                        <div className="lg:w-2/3 text-center mx-auto">
                            <h1 className="text-gray-900 dark:text-white font-bold text-5xl md:text-6xl xl:text-7xl">
                                Rekomendasi Tepat,{" "}
                                <span className="text-primary dark:text-white">
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
                                    className="rounded-full bg-purple-200 text-primary hover:bg-purple-300 hover:text-primary"
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
                                    <p className="mt-2 text-gray-500">
                                        Integrasi antara guru dan orang tua
                                    </p>
                                </div>
                                <div className="text-left">
                                    <h6 className="text-lg font-semibold text-gray-700 dark:text-white">
                                        Kesesuaian
                                    </h6>
                                    <p className="mt-2 text-gray-500">
                                        Rekomendasi yang otomatis dan sesuai
                                    </p>
                                </div>
                                <div className="text-left">
                                    <h6 className="text-lg font-semibold text-gray-700 dark:text-white">
                                        Mudah
                                    </h6>
                                    <p className="mt-2 text-gray-500">
                                        Tampilan yang mudah untuk digunakan
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-12 grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3">
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
                                    src="/static/images/logo-satria.jpg"
                                    className="h-max max-h-10 w-auto mx-auto"
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
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Natus ad ipsum pariatur autem, fugit laborum
                            in atque amet obcaecati? Nisi minima aspernatur,
                            quidem nulla cupiditate nam consequatur eligendi
                            magni adipisci.
                        </p>
                    </div>
                    <div className="mt-16 grid divide-x divide-y divide-gray-100 dark:divide-gray-700 overflow-hidden rounded-3xl border border-gray-100 text-gray-600 dark:border-gray-700 sm:grid-cols-2 lg:grid-cols-4 lg:divide-y-0 xl:grid-cols-4">
                        <div className="group relative bg-white dark:bg-gray-800 transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10">
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
                                        First feature
                                    </h5>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        Neque Dolor, fugiat non cum doloribus
                                        aperiam voluptates nostrum.
                                    </p>
                                </div>
                                <a
                                    href="#"
                                    className="flex items-center justify-between group-hover:text-primary"
                                >
                                    <span className="text-sm">Read more</span>
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
                        <div className="group relative bg-white dark:bg-gray-800 transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10">
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
                                        Second feature
                                    </h5>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        Neque Dolor, fugiat non cum doloribus
                                        aperiam voluptates nostrum.
                                    </p>
                                </div>
                                <a
                                    href="#"
                                    className="flex items-center justify-between group-hover:text-primary"
                                >
                                    <span className="text-sm">Read more</span>
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
                        <div className="group relative bg-white dark:bg-gray-800 transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10">
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
                                        Third feature
                                    </h5>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        Neque Dolor, fugiat non cum doloribus
                                        aperiam voluptates nostrum.
                                    </p>
                                </div>
                                <a
                                    href="#"
                                    className="flex items-center justify-between group-hover:text-primary"
                                >
                                    <span className="text-sm">Read more</span>
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
                        <div className="group relative bg-gray-50 dark:bg-gray-900 transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10">
                            <div className="relative space-y-8 py-12 p-8 transition duration-300 group-hover:bg-white dark:group-hover:bg-gray-800">
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
                                        More features
                                    </h5>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        Neque Dolor, fugiat non cum doloribus
                                        aperiam voluptates nostrum.
                                    </p>
                                </div>
                                <a
                                    href="#"
                                    className="flex items-center justify-between group-hover:text-primary"
                                >
                                    <span className="text-sm">Read more</span>
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
                                Nobis minus voluptatibus pariatur dignissimos
                                libero quaerat iure expedita at? Asperiores nemo
                                possimus nesciunt dicta veniam aspernatur quam
                                mollitia. <br /> <br /> Vitae error, quaerat
                                officia delectus voluptatibus explicabo quo
                                pariatur impedit, at reprehenderit aliquam a
                                ipsum quas voluptatem. Quo pariatur asperiores
                                eum amet.
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
                                            Chat Anytime
                                        </h4>
                                        <p className="text-gray-500 dark:text-gray-400">
                                            Asperiores nemo possimus nesciunt
                                            quam mollitia.
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
                                            Real Time Location
                                        </h4>
                                        <p className="text-gray-500 dark:text-gray-400">
                                            Asperiores nemo possimus nesciunt
                                            quam mollitia.
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
                        <div className="aspect-auto p-8 border border-gray-100 rounded-3xl bg-white dark:bg-gray-800 dark:border-gray-700 shadow-2xl shadow-gray-600/10 dark:shadow-none">
                            <div className="flex gap-4">
                                <div className="w-12">
                                    <AspectRatio ratio={1 / 1}>
                                        <Image
                                            className="rounded-full"
                                            src="/static/images/user-default.jpg"
                                            alt="user avatar"
                                            width={400}
                                            height={400}
                                            loading="lazy"
                                            draggable={false}
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
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Illum aliquid quo eum quae
                                quos illo earum ipsa doloribus nostrum minus
                                libero aspernatur laborum cum, a suscipit,
                                ratione ea totam ullam! Lorem ipsum dolor sit
                                amet consectetur, adipisicing elit. Architecto
                                laboriosam deleniti aperiam ab veniam sint non
                                cumque quis tempore cupiditate. Sint libero
                                voluptas veniam at reprehenderit, veritatis
                                harum et rerum.
                            </p>
                        </div>
                        <div className="aspect-auto p-8 border border-gray-100 rounded-3xl bg-white dark:bg-gray-800 dark:border-gray-700 shadow-2xl shadow-gray-600/10 dark:shadow-none">
                            <div className="flex gap-4">
                                <div className="w-12">
                                    <AspectRatio ratio={1 / 1}>
                                        <Image
                                            className="rounded-full"
                                            src="/static/images/user-default.jpg"
                                            alt="user avatar"
                                            width={400}
                                            height={400}
                                            loading="lazy"
                                            draggable={false}
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
                                Lorem ipsum dolor laboriosam deleniti aperiam ab
                                veniam sint non cumque quis tempore cupiditate.
                                Sint libero voluptas veniam at reprehenderit,
                                veritatis harum et rerum.
                            </p>
                        </div>
                        <div className="aspect-auto p-8 border border-gray-100 rounded-3xl bg-white dark:bg-gray-800 dark:border-gray-700 shadow-2xl shadow-gray-600/10 dark:shadow-none">
                            <div className="flex gap-4">
                                <div className="w-12">
                                    <AspectRatio ratio={1 / 1}>
                                        <Image
                                            className="rounded-full"
                                            src="/static/images/user-default.jpg"
                                            alt="user avatar"
                                            width={400}
                                            height={400}
                                            loading="lazy"
                                            draggable={false}
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
                                Lorem ipsum dolor sit amet consectetur,
                                adipisicing elit. Architecto laboriosam deleniti
                                aperiam ab veniam sint non cumque quis tempore
                                cupiditate. Sint libero voluptas veniam at
                                reprehenderit, veritatis harum et rerum.
                            </p>
                        </div>
                        <div className="aspect-auto p-8 border border-gray-100 rounded-3xl bg-white dark:bg-gray-800 dark:border-gray-700 shadow-2xl shadow-gray-600/10 dark:shadow-none">
                            <div className="flex gap-4">
                                <div className="w-12">
                                    <AspectRatio ratio={1 / 1}>
                                        <Image
                                            className="rounded-full"
                                            src="/static/images/user-default.jpg"
                                            alt="user avatar"
                                            width={400}
                                            height={400}
                                            loading="lazy"
                                            draggable={false}
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
                                Lorem ipsum dolor sit amet consectetur,
                                adipisicing elit. Architecto laboriosam deleniti
                                aperiam ab veniam sint non cumque quis tempore
                                cupiditate. Sint libero voluptas veniam at
                                reprehenderit, veritatis harum et rerum.
                            </p>
                        </div>
                        <div className="aspect-auto p-8 border border-gray-100 rounded-3xl bg-white dark:bg-gray-800 dark:border-gray-700 shadow-2xl shadow-gray-600/10 dark:shadow-none">
                            <div className="flex gap-4">
                                <div className="w-12">
                                    <AspectRatio ratio={1 / 1}>
                                        <Image
                                            className="rounded-full"
                                            src="/static/images/user-default.jpg"
                                            alt="user avatar"
                                            width={400}
                                            height={400}
                                            loading="lazy"
                                            draggable={false}
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
                                Lorem ipsum dolor sit amet consectetur,
                                adipisicing elit. Architecto laboriosam deleniti
                                aperiam ab veniam sint non cumque quis tempore
                                cupiditate. Sint libero voluptas veniam at
                                reprehenderit, veritatis harum et rerum.
                            </p>
                        </div>
                        <div className="aspect-auto p-8 border border-gray-100 rounded-3xl bg-white dark:bg-gray-800 dark:border-gray-700 shadow-2xl shadow-gray-600/10 dark:shadow-none">
                            <div className="flex gap-4">
                                <div className="w-12">
                                    <AspectRatio ratio={1 / 1}>
                                        <Image
                                            className="rounded-full"
                                            src="/static/images/user-default.jpg"
                                            alt="user avatar"
                                            width={400}
                                            height={400}
                                            loading="lazy"
                                            draggable={false}
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
                                Lorem ipsum dolor sit amet consectetur,
                                adipisicing elit. Architecto laboriosam deleniti
                                aperiam ab veniam sint non cumque quis tempore
                                cupiditate. Sint libero voluptas veniam at
                                reprehenderit, veritatis harum et rerum.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative py-16 my-14">
                <div
                    aria-hidden="true"
                    className="absolute inset-0 h-max w-full m-auto grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20"
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
                                Be part of millions people around the world
                                using tailus in modern User Interfaces.
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

            <footer className="footer footer-center p-10 text-base-content rounded">
                <nav className="grid grid-flow-col gap-4">
                    <Link href="#testimonials" className="link link-hover">
                        Tentang Kami
                    </Link>
                    <Link
                        href="https://wa.me/+6285960224084"
                        target="_blank"
                        className="link link-hover"
                    >
                        Kontak
                    </Link>
                    <Link href="/terms" className="link link-hover">
                        Syarat & Ketentuan
                    </Link>
                </nav>
                <nav>
                    <div className="grid grid-flow-col gap-4">
                        <Link href={"https://instagram.com/cekrek_assist"}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                className="fill-current"
                            >
                                <path d="M20.947 8.305a6.53 6.53 0 0 0-.419-2.216 4.61 4.61 0 0 0-2.633-2.633 6.606 6.606 0 0 0-2.186-.42c-.962-.043-1.267-.055-3.709-.055s-2.755 0-3.71.055a6.606 6.606 0 0 0-2.185.42 4.607 4.607 0 0 0-2.633 2.633 6.554 6.554 0 0 0-.419 2.185c-.043.963-.056 1.268-.056 3.71s0 2.754.056 3.71c.015.748.156 1.486.419 2.187a4.61 4.61 0 0 0 2.634 2.632 6.584 6.584 0 0 0 2.185.45c.963.043 1.268.056 3.71.056s2.755 0 3.71-.056a6.59 6.59 0 0 0 2.186-.419 4.615 4.615 0 0 0 2.633-2.633c.263-.7.404-1.438.419-2.187.043-.962.056-1.267.056-3.71-.002-2.442-.002-2.752-.058-3.709zm-8.953 8.297c-2.554 0-4.623-2.069-4.623-4.623s2.069-4.623 4.623-4.623a4.623 4.623 0 0 1 0 9.246zm4.807-8.339a1.077 1.077 0 0 1-1.078-1.078 1.077 1.077 0 1 1 2.155 0c0 .596-.482 1.078-1.077 1.078z" />
                                <circle cx="11.994" cy="11.979" r="3.003" />
                            </svg>
                        </Link>
                        <Link href={"mailto:cekrek_assist@gmail.com"}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                className="fill-current"
                            >
                                <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4.7-8 5.334L4 8.7V6.297l8 5.333 8-5.333V8.7z" />
                            </svg>
                        </Link>
                    </div>
                </nav>
                <aside>
                    <p>Copyright © 2024 - All right reserved by Helov Team</p>
                </aside>
            </footer>
        </>
    );
}
