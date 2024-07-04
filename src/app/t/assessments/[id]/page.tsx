"use client";

import Alert from "@/components/elements/alerts/Alert";
import Pill from "@/components/elements/alerts/Pill";
import RecomendationCard from "@/components/elements/cards/RecomendationCard";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { ChildAssesment } from "@/types/childAssesment.type";
import { Child } from "@/types/children.types";
import { capitalizeFirstLetter, formattedDate } from "@/utils/formattedDate";
import Image from "next/image";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher, getChildrenImage } from "@/utils/fetcher";
import { useParams, useSearchParams } from "next/navigation";
import { getRiskCategory } from "@/utils/converters";
import { ChildRecommendation } from "@/types/childRecommendation.type";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ExcelAssessmentStudent from "@/components/elements/exports/ExcelAssessmentStudent";
import { PDFAssessmentStudent } from "@/components/elements/exports/PDFAssessmentStudent";
import useProfile from "@/utils/useProfile";

export default function AssessmentDetail({}) {
    const [data, setData] = useState<Child>();
    const profile = useProfile();

    const searchParams = useSearchParams();
    const date = searchParams.get("date");
    const { id } = useParams();

    const {
        data: childAssesment,
        isLoading,
    }: { data: { status: string; child: Child }; isLoading: boolean } = useSWR(
        `/api/teachers/${profile?.id}/assesments/${id}?date=${date}`,
        fetcher
    );

    // const router = useRouter();

    // const {
    //     data,
    //     error,
    //     isLoading,
    // }: {
    //     data: { status: string; child: Child };
    //     error: any;
    //     isLoading: boolean;
    // } = useSWR("http://localhost:3000/api/teachers/1/students/1", fetcher);

    // if ((!isLoading && error) || (!isLoading && !data?.child)) {
    //     router.back();
    // }

    // const initializeData = () => {
    //     data.child_assesments?.map((chass) => {
    //         // chass.
    //     });
    // };

    // const getTotalChildAssessmentGagal = ({
    //     childAssessment,
    //     type,
    // }: {
    //     childAssessment: ChildAssesment[];
    //     type?: "awal" | "follow up";
    // }) => {};

    const getTotalChildAssessment = ({
        childAssessment,
        type,
        answer,
    }: {
        childAssessment: ChildAssesment[];
        type?: "awal" | "follow up";
        answer?: "lulus" | "gagal" | "ya" | "tidak";
    }) => {
        return childAssessment.filter(
            (chass) => chass.assesment_type === type && chass.answer === answer
        ).length;
    };

    const childAssessmentIsExist = ({
        childAssessment,
        type,
    }: {
        childAssessment: ChildAssesment[];
        type?: "awal" | "follow up";
    }): boolean => {
        const isExist = childAssessment.some(
            (chass) => chass.assesment_type === type
        );
        return isExist;
    };

    useEffect(() => {
        if (childAssesment?.child) {
            setData(childAssesment.child);
        }
    }, [childAssesment]);

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
                    {isLoading ? (
                        <>
                            <div className="top-5 flex flex-col items-center w-full static group-[.open]:static group-[.open]:w-full lg:group-[.open]:w-1/3 md:w-1/3 lg:group-[.open]:sticky lg:group-[.open]:h-full md:sticky md:h-full">
                                <div className="relative rounded-lg max-w-xs w-full lg:max-w-none">
                                    <AspectRatio ratio={3 / 4}>
                                        <div className="skeleton w-full h-full"></div>
                                    </AspectRatio>
                                </div>
                            </div>
                            <div className="w-full mt-3 group-[.open]:w-full group-[.open]:mt-3 lg:group-[.open]:w-2/3 lg:group-[.open]:mt-0 md:w-2/3 md:mt-0">
                                <div className="grid gap-4 mb-3 grid-cols-1 sm:grid-cols-2 group-[.open]:grid-cols-1 md:group-[.open]:grid-cols-2">
                                    <div className="flex flex-col gap-2">
                                        <div className="skeleton rounded-lg w-1/2 h-6"></div>
                                        <div className="skeleton rounded-lg w-full h-9"></div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <div className="skeleton rounded-lg w-1/2 h-6"></div>
                                        <div className="skeleton rounded-lg w-full h-9"></div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <div className="skeleton rounded-lg w-1/2 h-6"></div>
                                        <div className="skeleton rounded-lg w-full h-9"></div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <div className="skeleton rounded-lg w-1/2 h-6"></div>
                                        <div className="skeleton rounded-lg w-full h-9"></div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <div className="skeleton rounded-lg w-1/2 h-6"></div>
                                        <div className="skeleton rounded-lg w-full h-9"></div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <div className="skeleton rounded-lg w-1/2 h-6"></div>
                                        <div className="skeleton rounded-lg w-full h-9"></div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="top-5 flex flex-col items-center w-full static group-[.open]:static group-[.open]:w-full lg:group-[.open]:w-1/3 md:w-1/3 lg:group-[.open]:sticky lg:group-[.open]:h-full md:sticky md:h-full">
                                <div className="relative rounded-lg bg-gray-400 max-w-xs w-full lg:max-w-none">
                                    <AspectRatio ratio={3 / 4}>
                                        <Image
                                            src={
                                                data?.picture
                                                    ? getChildrenImage(
                                                          data.picture
                                                      )
                                                    : "/static/images/user-default.jpg"
                                            }
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
                                        <div className="flex justify-between items-center">
                                            <p className="font-semibold tracking-tight text-large">
                                                Asesmen{" "}
                                                {formattedDate(
                                                    data?.child_assesments?.[0]?.date_time?.toString() ||
                                                        new Date().toString()
                                                )}
                                            </p>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger
                                                    asChild
                                                    className="gap-1"
                                                >
                                                    <Button variant="outline">
                                                        <span>Export</span>{" "}
                                                        <span className="material-symbols-outlined cursor-pointer filled !text-xl !leading-4 opacity-70">
                                                            more_horiz
                                                        </span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent
                                                    className="w-56"
                                                    align="end"
                                                >
                                                    <DropdownMenuLabel>
                                                        Aksi
                                                    </DropdownMenuLabel>
                                                    {data?.child_assesments?.[0]
                                                        ?.assesments && (
                                                        <DropdownMenuGroup>
                                                            <DropdownMenuSub>
                                                                <DropdownMenuSubTrigger>
                                                                    <span className="material-symbols-outlined cursor-pointer me-1 !text-xl !leading-4 opacity-70">
                                                                        assignment
                                                                    </span>{" "}
                                                                    <span>
                                                                        Unduh
                                                                        asesmen
                                                                    </span>
                                                                </DropdownMenuSubTrigger>
                                                                <DropdownMenuPortal>
                                                                    <DropdownMenuSubContent>
                                                                        <ExcelAssessmentStudent
                                                                            data={
                                                                                data
                                                                            }
                                                                        />
                                                                        <PDFAssessmentStudent
                                                                            data={
                                                                                data
                                                                            }
                                                                        />
                                                                    </DropdownMenuSubContent>
                                                                </DropdownMenuPortal>
                                                            </DropdownMenuSub>
                                                        </DropdownMenuGroup>
                                                    )}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                        <div className="divider my-1" />

                                        <Alert
                                            text={`Kategori ${getRiskCategory({
                                                childAssesment:
                                                    data?.child_assesments?.[0]
                                                        ?.assesments || [],
                                                type: "awal",
                                            })}`}
                                            icon="info"
                                            type="primary"
                                            classnew="my-2"
                                        />

                                        <div className="w-full grid grid-cols-3 gap-2">
                                            <div className="my-1">
                                                <p className="text-xs to-gray-400">
                                                    Nama
                                                </p>
                                                <p className="text-medium font-semibold">
                                                    {data?.full_name || "N/A"}
                                                </p>
                                            </div>
                                            <div className="my-1">
                                                <p className="text-xs to-gray-400">
                                                    Nama Panggilan
                                                </p>
                                                <p className="text-medium font-semibold">
                                                    {data?.nick_name || "N/A"}
                                                </p>
                                            </div>
                                            <div className="my-1">
                                                <p className="text-xs to-gray-400">
                                                    Jenis Kelamin
                                                </p>
                                                <p className="text-medium font-semibold">
                                                    {data?.gender
                                                        ? capitalizeFirstLetter(
                                                              data.gender
                                                          )
                                                        : "N/A"}
                                                </p>
                                            </div>
                                            <div className="my-1">
                                                <p className="text-xs to-gray-400">
                                                    Agama
                                                </p>
                                                <p className="text-medium font-semibold">
                                                    {data?.religion
                                                        ? capitalizeFirstLetter(
                                                              data.religion
                                                          )
                                                        : "N/A"}
                                                </p>
                                            </div>
                                            <div className="my-1">
                                                <p className="text-xs to-gray-400">
                                                    Tempat Lahir
                                                </p>
                                                <p className="text-medium font-semibold">
                                                    {data?.place_birth || "N/A"}
                                                </p>
                                            </div>
                                            <div className="my-1">
                                                <p className="text-xs to-gray-400">
                                                    Tanggal Lahir
                                                </p>
                                                <p className="text-medium font-semibold">
                                                    {data?.date_time_birth
                                                        ? formattedDate(
                                                              data.date_time_birth.toString()
                                                          )
                                                        : "N/A"}
                                                </p>
                                            </div>
                                            <div className="my-1">
                                                <p className="text-xs to-gray-400">
                                                    Pendengaran
                                                </p>
                                                <p className="text-medium font-semibold">
                                                    {data?.hearing_test
                                                        ? capitalizeFirstLetter(
                                                              data.hearing_test
                                                          )
                                                        : "N/A"}
                                                </p>
                                            </div>
                                            <div className="my-1">
                                                <p className="text-xs to-gray-400">
                                                    Jumlah Saudara
                                                </p>
                                                <p className="text-medium font-semibold">
                                                    {data?.count_of_siblings ||
                                                        "N/A"}
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
                                                Asesmen
                                            </p>
                                            {/* Awal */}
                                            <p className="text-gray-400 text-small -mb-1">
                                                {"Skor: " +
                                                    getTotalChildAssessment({
                                                        childAssessment:
                                                            data
                                                                ?.child_assesments?.[0]
                                                                ?.assesments ||
                                                            [],
                                                        type: "awal",
                                                        answer: "ya",
                                                    }) +
                                                    " Ya, " +
                                                    getTotalChildAssessment({
                                                        childAssessment:
                                                            data
                                                                ?.child_assesments?.[0]
                                                                ?.assesments ||
                                                            [],
                                                        type: "awal",
                                                        answer: "tidak",
                                                    }) +
                                                    " Tidak"}
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
                                    {/* <div className="flex justify-between gap-2">
                                        <div>
                                            <p className="font-medium tracking-tight text-medium">
                                                Asesmen Follow Up
                                            </p>
                                            <p className="text-gray-400 text-small -mb-1">
                                                {"Skor: " +
                                                    getTotalChildAssessment({
                                                        childAssessment:
                                                            data
                                                                ?.child_assesments?.[0]
                                                                ?.assesments ||
                                                            [],
                                                        type: "follow up",
                                                        answer: "lulus",
                                                    }) +
                                                    " Lulus, " +
                                                    getTotalChildAssessment({
                                                        childAssessment:
                                                            data
                                                                ?.child_assesments?.[0]
                                                                ?.assesments ||
                                                            [],
                                                        type: "follow up",
                                                        answer: "gagal",
                                                    }) +
                                                    " Gagal"}
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
                                    </div> */}
                                </div>

                                <div className="w-full border border-gray-300 rounded-lg p-2 mt-3 overflow-hidden">
                                    <div className="">
                                        <p className="text-small text-gray-400 -mb-1">
                                            Skoring Soal
                                        </p>
                                        <p className="text-large font-semibold tracking-tight">
                                            Asesmen
                                        </p>
                                        {/* Awal */}
                                    </div>
                                    <div className="divider my-1" />
                                    {!childAssessmentIsExist({
                                        childAssessment:
                                            data?.child_assesments?.[0]
                                                ?.assesments || [],
                                        type: "awal",
                                    }) && (
                                        <div>
                                            <p className="text-center text-small">
                                                Belum ada data asesmen follow up
                                            </p>
                                        </div>
                                    )}
                                    {ScoreChildAssessmentCard({
                                        childAssessments:
                                            data?.child_assesments?.[0]
                                                ?.assesments || [],
                                        type: "awal",
                                    })}
                                </div>

                                {/* <div className="w-full border border-gray-300 rounded-lg p-2 mt-3 overflow-hidden">
                                    <div className="">
                                        <p className="text-small text-gray-400 -mb-1">
                                            Skoring Soal
                                        </p>
                                        <p className="text-large font-semibold tracking-tight">
                                            Asesmen Follow Up
                                        </p>
                                    </div>
                                    <div className="divider my-1" />
                                    {!childAssessmentIsExist({
                                        childAssessment:
                                            data?.child_assesments?.[0]
                                                ?.assesments || [],
                                        type: "follow up",
                                    }) && (
                                        <div>
                                            <p className="text-center text-small">
                                                Belum ada data asesmen follow up
                                            </p>
                                        </div>
                                    )}
                                    {ScoreChildAssessmentCard({
                                        childAssessments:
                                            data?.child_assesments?.[0]
                                                ?.assesments || [],
                                        type: "follow up",
                                    })}
                                </div> */}

                                {/* <div className="border border-gray-300 p-2 rounded-lg my-3">
                                    <p className="text-large font-semibold tracking-tight">
                                        Rekomendasi Aktifitas
                                    </p>
                                    <div className="divider my-1" />

                                    {data?.child_recommendations?.length ==
                                    0 ? (
                                        <div>
                                            <p className="text-center text-small">
                                                Belum ada data asesmen follow up
                                            </p>
                                        </div>
                                    ) : (
                                        <ChildRecommendationCard
                                            childRecommendations={
                                                data?.child_recommendations ||
                                                []
                                            }
                                        />
                                    )}
                                </div> */}
                            </div>
                        </>
                    )}
                </div>
            </section>
        </>
    );
}

const ScoreChildAssessmentCard = ({
    childAssessments,
    type,
}: {
    childAssessments: ChildAssesment[];
    type: "awal" | "follow up";
}) => {
    const filteredAssessments: ChildAssesment[] = childAssessments.filter(
        (chass) => chass.assesment_type === type
    );

    return (
        <>
            {filteredAssessments.map((chass) => (
                <div
                    key={chass.id}
                    className="flex justify-between items-center gap-2 mb-3"
                >
                    <div>
                        <p className="font-medium tracking-tight text-medium">
                            Soal {chass.assesment?.id || 0}
                        </p>
                        <p className="text-gray-400 text-small -mb-1">
                            {chass.assesment?.question || "Pertanyaan"}
                        </p>
                    </div>
                    <Pill
                        type={
                            chass.answer === "ya" || chass.answer == "lulus"
                                ? "primary"
                                : "error"
                        }
                        text={capitalizeFirstLetter(chass.answer)}
                        icon="assignment"
                    />
                </div>
            ))}
        </>
    );
};

const ChildRecommendationCard = ({
    childRecommendations,
}: {
    childRecommendations: ChildRecommendation[];
}) => {
    return (
        <>
            {childRecommendations.map((chrec) => {
                if (chrec?.recommendation) {
                    return (
                        <RecomendationCard
                            key={chrec.id}
                            className={`mb-2`}
                            isActive={false}
                            recommendation={chrec.recommendation}
                        />
                    );
                }
            })}
        </>
    );
};
