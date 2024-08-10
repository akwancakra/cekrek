"use client";

import RecomendationCard from "@/components/elements/cards/RecomendationCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Child } from "@/types/customChild.types";
import { getVariant } from "@/utils/converters";
import { fetcher } from "@/utils/fetcher";
import {
    formattedDate,
    formattedDateStripYearFirst,
} from "@/utils/formattedDate";
import useProfile from "@/utils/useProfile";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function CompareMonitoringParentLayout() {
    const [date, setDate] = useState<Date>(new Date());
    const [student, setStudent] = useState<Child>();
    const today = formattedDateStripYearFirst(new Date().toString());
    const { profile, isReady } = useProfile();

    const searchParams = useSearchParams();
    const paramDate = searchParams.get("date");
    const router = useRouter();
    const { id } = useParams();

    const { data, isLoading } = useSWR<{ status: string; child: Child }>(
        isReady &&
            profile?.id &&
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
        if (!isLoading && isReady) {
            if (!data?.child) {
                router.push("/p/childs");
            } else {
                setStudent(data.child);
            }
        }
    }, [isLoading, data, isReady]);

    return (
        <>
            <section className="mx-auto max-w-7xl mb-4">
                {isLoading ? (
                    <>
                        <div>
                            <div className="skeleton h-9 w-32 rounded-lg mb-3"></div>
                            <div className="skeleton h-32 w-full rounded-lg mb-3"></div>
                            <div className="skeleton h-56 w-full rounded-lg mb-3"></div>
                            <div className="grid gap-2 grid-cols-1 group-[.open]:grid-cols-1 md:group-[.open]:grid-cols-3 sm:grid-cols-3">
                                <div className="skeleton h-64 w-full rounded-lg"></div>
                                <div className="skeleton h-64 w-full rounded-lg"></div>
                                <div className="skeleton h-64 w-full rounded-lg"></div>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <Button asChild variant={"outline"} className="mb-3">
                            <Link
                                href={`/p/childs/${id}/recommendation?date=${
                                    formattedDateStripYearFirst(
                                        date.toString()
                                    ) || today
                                }`}
                            >
                                <span className="material-symbols-outlined me-1 !leading-none !text-lg hover:no-underline">
                                    arrow_back
                                </span>
                                Kembali
                            </Link>
                        </Button>
                        <div className="flex justify-between items-center w-full border border-gray-300 rounded-lg p-2 mb-3 dark:border-neutral-600">
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
                                            getVariant(
                                                student.risk_category
                                            )) ||
                                        "bg-primary hover:bg-primary-foreground"
                                    }`}
                                >
                                    Tingkat {student?.risk_category || "N/A"}
                                </Badge>
                            </div>
                            <p className="font-semibold tracking-tight text-large">
                                {formattedDate(new Date().toString())}
                            </p>
                        </div>

                        <div className="w-full border border-gray-300 rounded-lg p-2 mb-3 justify-between block group-[.open]:block lg:group-[.open]:flex sm:flex dark:border-neutral-600">
                            <div className="grow">
                                <p className="text-large font-semibold tracking-tight">
                                    Monitoring yang saya lakukan
                                </p>
                                <div className="divider my-1 dark:after:!bg-neutral-600 dark:before:!bg-neutral-600"></div>
                                <div className="border border-gray-300 rounded-lg p-2 grid gap-2 text-center justify-evenly mb-2 grid-cols-1 sm:grid-cols-2 dark:border-neutral-600">
                                    <div className="flex flex-col justify-center items-center h-20 sm:h-32">
                                        <p className="text-small">
                                            Aktifitas belum dilakukan
                                        </p>
                                        <p className="font-semibold tracking-tight text-xl sm:text-3xl">
                                            {student?.unfinishedRecommendations ||
                                                "0"}
                                        </p>
                                    </div>
                                    <div className="flex flex-col justify-center items-center h-20 sm:h-32">
                                        <p className="text-small">
                                            Aktifitas selesai
                                        </p>
                                        <p className="font-semibold tracking-tight text-xl sm:text-3xl">
                                            {student?.finishedRecommendations ||
                                                "0"}
                                        </p>
                                    </div>
                                </div>

                                <p className="my-2">Rekomendasi</p>
                                <div>
                                    {student?.child_recommendations?.map(
                                        (child_recommendation) => (
                                            <RecomendationCard
                                                key={child_recommendation.id}
                                                recommendation={
                                                    child_recommendation.recommendations
                                                }
                                                isDone={
                                                    child_recommendation.isFinishedByParent
                                                }
                                            />
                                        )
                                    )}
                                </div>
                            </div>
                            <div className="divider group-[.open]:divider lg:group-[.open]:divider-horizontal md:divider-horizontal my-1 dark:after:!bg-neutral-600 dark:before:!bg-neutral-600"></div>
                            <div className="grow">
                                <p className="text-large font-semibold tracking-tight">
                                    Monitoring yang dilakukan guru
                                </p>
                                <div className="divider my-1 dark:after:!bg-neutral-600 dark:before:!bg-neutral-600"></div>
                                <div className="border border-gray-300 rounded-lg p-2 grid gap-2 text-center justify-evenly mb-2 grid-cols-1 sm:grid-cols-2 dark:border-neutral-600">
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
                                        <p className="text-small">
                                            Aktifitas selesai
                                        </p>
                                        <p className="font-semibold tracking-tight text-xl sm:text-3xl">
                                            {student?.finishedRecommendationsByTeacher ||
                                                "0"}
                                        </p>
                                    </div>
                                </div>

                                <p className="my-2">Rekomendasi</p>
                                <div>
                                    {student?.child_recommendations?.map(
                                        (child_recommendation) => (
                                            <RecomendationCard
                                                key={child_recommendation.id}
                                                recommendation={
                                                    child_recommendation.recommendations
                                                }
                                                isDone={
                                                    child_recommendation.isFinishedByTeacher
                                                }
                                            />
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </section>
        </>
    );
}
