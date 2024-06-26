"use client";

import Alert from "@/components/elements/alerts/Alert";
import Pill from "@/components/elements/alerts/Pill";
import RecomendationCard from "@/components/elements/cards/RecomendationCard";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { ChildAssesment } from "@/types/childAssesment.type";
import { Child } from "@/types/children.types";
import { formattedDate } from "@/utils/formattedDate";
import { childs } from "@/utils/tempData";
import Image from "next/image";
import { useState } from "react";

type AssessmentHistory = {
    title: string;
    lulus: number;
    gagal: number;
    child_assessments?: ChildAssesment[];
};

export default function AssessmentDetail({}) {
    const [data, setData] = useState(childs[0]);
    const [firstAssessment, setFirstAssessment] = useState<AssessmentHistory>();
    const [followUpAssessment, setFollowUpAssessment] =
        useState<AssessmentHistory>();

    // const initializeData = () => {
    //     data.child_assesments?.map((chass) => {
    //         // chass.
    //     })
    // };

    return (
        <>
            <section className="mx-auto max-w-7xl mb-4">
                <div className="rounded-lg mb-3 p-4 w-full flex items-center bg-gradient-to-r from-purple-400 to-purple-600 h-28 sm:h-36">
                    <div>
                        <p className="text-white text-sm -mb-1">
                            Detil Asesmen
                        </p>
                        <p className="font-semibold tracking-tight text-xl text-white">
                            CekRek
                        </p>
                    </div>
                </div>

                <div className="block gap-4 group-[.open]:block lg:group-[.open]:flex md:flex">
                    <div className="sticky top-5 flex flex-col items-center w-full group-[.open]:w-full lg:group-[.open]:w-1/3 md:w-1/3">
                        <div className="relative rounded-lg bg-gray-400 max-w-xs w-full lg:max-w-none">
                            <AspectRatio ratio={3 / 4}>
                                <Image
                                    src={`/static/images/${
                                        data?.picture || "user-default.jpg"
                                    }`}
                                    alt="Student Image"
                                    fill={true}
                                    className="rounded-lg object-cover"
                                    draggable={false}
                                />
                            </AspectRatio>
                        </div>
                    </div>
                    <div className="w-full mt-3 group-[.open]:w-full group-[.open]:mt-3 lg:group-[.open]:w-2/3 lg:group-[.open]:mt-0 md:w-2/3 md:mt-0">
                        {/* PROFILE DATA */}
                        <div className="border border-gray-300 p-2 rounded-lg my-3">
                            <div>
                                <p className="font-semibold tracking-tight text-large">
                                    Asesmen{" "}
                                    {formattedDate(
                                        data?.child_assesments?.[0]?.date_time?.toString() ||
                                            new Date().toString()
                                    )}
                                </p>
                                <div className="divider my-1" />
                                <Alert
                                    text="Kategori Sedang"
                                    desc="Anak ini termasuk kategori sedang dengan 4 gagal"
                                    icon="info"
                                    type="primary"
                                    classnew="my-2"
                                />

                                <div className="w-full grid grid-cols-3 gap-2">
                                    <div>
                                        <p className="text-gray-400 text-small -mb-1">
                                            Nama
                                        </p>
                                        <p className="font-medium tracking-tight text-medium">
                                            {data.full_name}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-small -mb-1">
                                            Jenis Kelamin
                                        </p>
                                        <p className="font-medium tracking-tight text-medium">
                                            {data.gender}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-small -mb-1">
                                            Tanggal Lahir
                                        </p>
                                        <p className="font-medium tracking-tight text-medium">
                                            {formattedDate(
                                                data?.date_time_birth?.toString() ||
                                                    new Date().toString()
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full border border-gray-300 rounded-lg p-2 mt-3 overflow-hidden">
                            <p className="text-large font-semibold tracking-tight">
                                Rangkuman
                            </p>
                            <div className="divider my-1" />
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
                                        Skor: 12 Lulus, 8 Gagal
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

                        <div className="w-full border border-gray-300 rounded-lg p-2 mt-3 overflow-hidden">
                            <p className="text-large font-semibold tracking-tight">
                                Skoring Soal
                            </p>
                            <div className="divider my-1" />
                            <div className="flex justify-between gap-2 mb-3">
                                <div>
                                    <p className="font-medium tracking-tight text-medium">
                                        Soal 1
                                    </p>
                                    <p className="text-gray-400 text-small -mb-1">
                                        Jika anda menunjuk sesuatu di ruangan,
                                        apakah $namaAnak melihatnya?
                                    </p>
                                </div>
                                <Pill
                                    type="primary"
                                    text="Lulus"
                                    icon="assignment"
                                />
                            </div>
                            <div className="flex justify-between gap-2 mb-3">
                                <div>
                                    <p className="font-medium tracking-tight text-medium">
                                        Soal 2
                                    </p>
                                    <p className="text-gray-400 text-small -mb-1">
                                        Jika anda menunjuk sesuatu di ruangan,
                                        apakah $namaAnak melihatnya?
                                    </p>
                                </div>
                                <Pill
                                    type="error"
                                    text="Gagal"
                                    icon="assignment"
                                />
                            </div>
                            <div className="flex justify-between gap-2 mb-3">
                                <div>
                                    <p className="font-medium tracking-tight text-medium">
                                        Soal 3
                                    </p>
                                    <p className="text-gray-400 text-small -mb-1">
                                        Jika anda menunjuk sesuatu di ruangan,
                                        apakah $namaAnak melihatnya?
                                    </p>
                                </div>
                                <Pill
                                    type="error"
                                    text="Gagal"
                                    icon="assignment"
                                />
                            </div>
                            <div className="flex justify-between gap-2 mb-3">
                                <div>
                                    <p className="font-medium tracking-tight text-medium">
                                        Soal 4
                                    </p>
                                    <p className="text-gray-400 text-small -mb-1">
                                        Jika anda menunjuk sesuatu di ruangan,
                                        apakah $namaAnak melihatnya?
                                    </p>
                                </div>
                                <Pill
                                    type="error"
                                    text="Gagal"
                                    icon="assignment"
                                />
                            </div>
                        </div>

                        <div className="border border-gray-300 p-2 rounded-lg my-3">
                            <p className="text-large font-semibold tracking-tight">
                                Rekomendasi Aktifitas
                            </p>
                            <div className="divider my-1" />
                            <RecomendationCard
                                className="mb-2"
                                isActive={false}
                            />
                            <RecomendationCard
                                className="mb-2"
                                isActive={false}
                            />
                            <RecomendationCard
                                className="mb-2"
                                isActive={false}
                            />
                            <RecomendationCard
                                className="mb-2"
                                isActive={false}
                            />
                            <RecomendationCard isActive={false} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
