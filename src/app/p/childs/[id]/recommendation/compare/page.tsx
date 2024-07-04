"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Child } from "@/types/customChild.types";
import { getVariant } from "@/utils/converters";
import { fetcher } from "@/utils/fetcher";
import { formattedDateStripYearFirst } from "@/utils/formattedDate";
import useProfile from "@/utils/useProfile";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function CompareMonitoringParentLayout() {
    const [date, setDate] = useState<Date>(new Date());
    const [student, setStudent] = useState<Child>();
    const today = formattedDateStripYearFirst(new Date().toString());
    const profile = useProfile();

    const searchParams = useSearchParams();
    const paramDate = searchParams.get("date");
    const { id } = useParams();

    const { data, isLoading } = useSWR<{ status: string; child: Child }>(
        `/api/parents/${
            profile?.id
        }/children/${id}/recommendations?date=${formattedDateStripYearFirst(
            date.toString()
        )}`,
        fetcher
    );

    useEffect(() => {
        if (paramDate) {
            setDate(new Date(paramDate));
        }
    }, [paramDate]);

    useEffect(() => {
        if (data?.child) {
            setStudent(data?.child);
        }
    }, [data]);

    return (
        <>
            <section className="mx-auto max-w-7xl mb-4">
                <Button asChild variant={"outline"} className="mb-3">
                    <Link
                        href={`/p/childs/${id}/recommendation?date=${
                            formattedDateStripYearFirst(date.toString()) ||
                            today
                        }`}
                    >
                        <span className="material-symbols-outlined me-1 !leading-none !text-lg hover:no-underline">
                            arrow_back
                        </span>
                        Kembali
                    </Link>
                </Button>
                <div className="w-full border border-gray-300 rounded-lg p-2 mb-3">
                    <div>
                        <p className="text-gray-400 text-small">
                            Monitoring Asesmen M-Chart-R/F
                        </p>
                        <p className="text-header">
                            {student?.full_name || "N/A"}
                        </p>
                        <Badge
                            variant={"default"}
                            className={`${
                                (student?.risk_category &&
                                    getVariant(student.risk_category)) ||
                                "bg-primary hover:bg-primary-foreground"
                            }`}
                        >
                            Tingkat {student?.risk_category || "N/A"}
                        </Badge>
                    </div>
                </div>

                <div className="w-full border border-gray-300 rounded-lg p-2 mb-3 justify-between block group-[.open]:block lg:group-[.open]:flex sm:flex">
                    <div className="grow">
                        <p className="text-large font-semibold tracking-tight">
                            Monitoring yang saya lakukan
                        </p>
                        <div className="divider my-1"></div>
                        <div className="border border-gray-300 rounded-lg p-2 grid gap-2 text-center justify-evenly mb-2 grid-cols-1 sm:grid-cols-2">
                            <div className="flex flex-col justify-center items-center h-20 sm:h-32">
                                <p className="text-small">
                                    Aktifitas belum dilakukan
                                </p>
                                <p className="font-semibold tracking-tight text-xl sm:text-3xl">
                                    {student?.unfinishedRecommendations || "0"}
                                </p>
                            </div>
                            <div className="flex flex-col justify-center items-center h-20 sm:h-32">
                                <p className="text-small">Aktifitas selesai</p>
                                <p className="font-semibold tracking-tight text-xl sm:text-3xl">
                                    {student?.finishedRecommendations || "0"}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="divider group-[.open]:divider lg:group-[.open]:divider-horizontal md:divider-horizontal my-1"></div>
                    <div className="grow">
                        <p className="text-large font-semibold tracking-tight">
                            Monitoring yang dilakukan guru
                        </p>
                        <div className="divider my-1"></div>
                        <div className="border border-gray-300 rounded-lg p-2 grid gap-2 text-center justify-evenly mb-2 grid-cols-1 sm:grid-cols-2">
                            <div className="flex flex-col justify-center items-center h-20 sm:h-32">
                                <p className="text-small">
                                    Aktifitas belum dilakukan
                                </p>
                                <p className="font-semibold tracking-tight text-xl sm:text-3xl">
                                    {student?.unfinishedRecommendationsByTeacher ||
                                        "0"}
                                </p>
                            </div>
                            <div className="flex flex-col justify-center items-center h-20 sm:h-32">
                                <p className="text-small">Aktifitas selesai</p>
                                <p className="font-semibold tracking-tight text-xl sm:text-3xl">
                                    {student?.finishedRecommendationsByTeacher ||
                                        "0"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
