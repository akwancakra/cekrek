"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Line } from "react-chartjs-2";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import RecomendationCard from "@/components/elements/cards/RecomendationCard";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { useParams, useSearchParams } from "next/navigation";
import { getVariant } from "@/utils/converters";
import { formattedDateStripYearFirst } from "@/utils/formattedDate";
import useProfile from "@/utils/useProfile";
import { Child } from "@/types/customChild.types";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const labels = ["Apr - M-1", "Apr - M-2", "Apr - M-3", "Apr - M-4"];

// Fungsi untuk menghasilkan options
const getOptions = () => ({
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
        },
    },
    scales: {
        y: {
            display: true,
        },
    },
});

// Fungsi untuk menghasilkan data
const getData = (datasets: any) => ({
    labels,
    datasets,
});

const datasets1 = [
    {
        label: "Nama Aksi",
        data: [65, 59, 80, 81],
        backgroundColor: "rgba(126, 73, 255, 0.5)",
        borderColor: "rgba(126, 73, 255, 1)",
        borderWidth: 2,
        lineTension: 0.3,
        fill: true,
    },
];

export default function RecomendationStudent({}) {
    const [date, setDate] = useState<Date>(new Date());
    const [student, setStudent] = useState<Child>();
    const today = formattedDateStripYearFirst(new Date().toString());
    const { profile, isReady } = useProfile();

    const searchParams = useSearchParams();
    const paramDate = searchParams.get("date");
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

    const handleDateSelect = (day: Date | undefined) => {
        if (day) {
            setDate(day);
        }
    };

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
        <section className="mx-auto max-w-7xl mb-4">
            <Button asChild variant={"outline"} className="mb-3">
                <Link href={`/p/childs/${id}`}>
                    <span className="material-symbols-outlined me-1 !leading-none !text-lg hover:no-underline">
                        arrow_back
                    </span>
                    Kembali
                </Link>
            </Button>
            <div className="w-full border border-gray-300 rounded-lg p-2 mb-3 justify-between items-center block group-[.open]:block lg:group-[.open]:flex sm:flex dark:border-neutral-600">
                <div>
                    <p className="text-gray-400 text-small">
                        Monitoring Asesmen M-Chart-R/F
                    </p>
                    <p className="text-header">{student?.full_name || "N/A"}</p>
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
                {student?.child_recommendations?.length > 0 && (
                    <div className="mt-3 group-[.open]:mt-3 lg:group-[.open]:mt-0 sm:mt-0">
                        <Button variant={"outline"} asChild>
                            <Link
                                href={`/p/childs/${id}/recommendation/compare?date=${
                                    formattedDateStripYearFirst(
                                        date.toString()
                                    ) || today
                                }`}
                                className="flex gap-1 items-center"
                            >
                                Bandingkan hasil monitoring versi guru{" "}
                                <span className="material-symbols-outlined ms-1 !leading-none !text-xl me-1 hover:no-underline">
                                    arrow_forward
                                </span>
                            </Link>
                        </Button>
                    </div>
                )}
            </div>

            {student?.child_recommendations?.length > 0 && (
                <div className="grid grid-cols-1 gap-2 group-[.open]:grid-cols-1 md:group-[.open]:grid-cols-3 md:grid-cols-3 mb-3">
                    <div className="w-full border border-gray-300 p-2 rounded-lg dark:border-neutral-600">
                        <div className="flex justify-between items-center mb-2 text-sm sm:text-base">
                            <p className="text-medium font-medium tracking-tight">
                                Mengikuti Perintah
                            </p>
                            <Select disabled={isLoading}>
                                <SelectTrigger className="w-fit min-w-24">
                                    <SelectValue placeholder="Pilih Minggu" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="light" defaultChecked>
                                        Min 1 - Mar
                                    </SelectItem>
                                    <SelectItem value="dark">
                                        Min 2 - Mar
                                    </SelectItem>
                                    <SelectItem value="system">
                                        Min 3 - Mar
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="w-full">
                            <AspectRatio ratio={16 / 9}>
                                <Line
                                    options={getOptions()}
                                    data={getData(datasets1)}
                                    // className="!h-full"
                                />
                            </AspectRatio>
                        </div>
                    </div>
                    <div className="w-full border border-gray-300 p-2 rounded-lg sm:min-h-60 dark:border-neutral-600">
                        <div className="flex justify-between items-center mb-2 text-sm sm:text-base">
                            <p className="font-medium tracking-tight">
                                Motorik Halus
                            </p>
                            <Select disabled={isLoading}>
                                <SelectTrigger className="w-fit min-w-24">
                                    <SelectValue placeholder="Pilih Minggu" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="light">
                                        Min 1 - Mar
                                    </SelectItem>
                                    <SelectItem
                                        value="dark"
                                        defaultChecked={true}
                                    >
                                        Min 2 - Mar
                                    </SelectItem>
                                    <SelectItem value="system">
                                        Min 3 - Mar
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="w-full">
                            <AspectRatio ratio={16 / 9}>
                                <Line
                                    options={getOptions()}
                                    data={getData(datasets1)}
                                    // className="!h-full"
                                />
                            </AspectRatio>
                        </div>
                    </div>
                    <div className="w-full border border-gray-300 p-2 rounded-lg sm:min-h-60 dark:border-neutral-600">
                        <div className="flex justify-between items-center mb-2 text-sm sm:text-base">
                            <p className="font-medium tracking-tight">
                                Kognitif
                            </p>
                            <Select disabled={isLoading}>
                                <SelectTrigger className="w-fit min-w-24">
                                    <SelectValue placeholder="Pilih Minggu" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="light">
                                        Min 1 - Mar
                                    </SelectItem>
                                    <SelectItem value="dark">
                                        Min 2 - Mar
                                    </SelectItem>
                                    <SelectItem
                                        value="system"
                                        defaultChecked={true}
                                    >
                                        Min 3 - Mar
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="w-full">
                            <AspectRatio ratio={16 / 9}>
                                <Line
                                    options={getOptions()}
                                    data={getData(datasets1)}
                                    // className="!h-full"
                                />
                            </AspectRatio>
                        </div>
                    </div>
                </div>
            )}
            <div className="rounded-lg p-4 w-full flex items-center text-white bg-primary h-fit mb-3 sm:min-h-24">
                <div>
                    <p className="text-small -mb-1">Informasi</p>
                    <p className="font-semibold tracking-tight text-large">
                        Asesmen M-Chart-R/F sedang aktif
                    </p>
                </div>
            </div>
            <div className="border border-gray-300 rounded-lg overflow-hidden dark:border-neutral-600">
                <div className="bg-purple-50 flex justify-between items-center p-2 !text-sm sm:text-base dark:bg-purple-900">
                    <p className="font-semibold tracking-tight text-medium">
                        Rekomendasi Aktifitas
                    </p>
                    {student?.child_recommendations?.length > 0 && (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "justify-start text-left font-normal text-small",
                                        !date && "text-muted-foreground"
                                    )}
                                >
                                    <span className="material-symbols-outlined ms-1 !leading-none !text-xl me-1 hover:no-underline">
                                        calendar_month
                                    </span>
                                    {date ? (
                                        format(date, "PPP")
                                    ) : (
                                        <span>Pilih tanggal</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={handleDateSelect}
                                    initialFocus
                                    lang="id"
                                />
                            </PopoverContent>
                        </Popover>
                    )}
                </div>
                <div className="p-2">
                    <div className="border border-gray-300 rounded-lg p-2 grid gap-2 text-center justify-evenly mb-2 grid-cols-1 sm:grid-cols-2 dark:border-neutral-600">
                        <div className="flex flex-col justify-center items-center h-20 sm:h-32">
                            <p className="text-small">
                                Aktifitas belum dilakukan
                            </p>
                            <p className="font-semibold tracking-tight text-3xl sm:text-5xl">
                                {student?.unfinishedRecommendations || "0"}
                            </p>
                        </div>
                        <div className="flex flex-col justify-center items-center h-20 sm:h-32">
                            <p className="text-small">Aktifitas selesai</p>
                            <p className="font-semibold tracking-tight text-3xl sm:text-5xl">
                                {student?.finishedRecommendations || "0"}
                            </p>
                        </div>
                    </div>
                    {/* <p className="font-semibold tracking-tight text-medium mb-2">
                        Berbicara (2)
                    </p> */}
                    <div className="flex flex-col gap-2">
                        {student?.child_recommendations?.length == 0 && (
                            <div className="text-center">
                                <p>Tidak ada data rekomendasi</p>
                                <p className="text-gray-400 dark:text-neutral-300">
                                    Hubungi guru untuk melakukan asesmen agar
                                    mendapatkan rekomendasi aktifitas
                                </p>
                            </div>
                        )}

                        {student?.child_recommendations?.map((rec, idx) =>
                            rec?.recommendations ? (
                                <RecomendationCard
                                    key={idx}
                                    recommendation={rec.recommendations}
                                    isDone={
                                        rec?.isFinished ||
                                        rec?.isFinishedByParent
                                    }
                                />
                            ) : null
                        )}
                    </div>
                </div>
                <div className="flex justify-end items-center p-2">
                    <Button asChild variant={"outline"} disabled={isLoading}>
                        {today ==
                            formattedDateStripYearFirst(date.toString()) &&
                            student?.child_recommendations?.length > 0 && (
                                <Link
                                    href={`/p/childs/${id}/monitoring?date=${formattedDateStripYearFirst(
                                        date.toString()
                                    )}`}
                                >
                                    Cek Hari Ini
                                    <span className="material-symbols-outlined !text-xl !leading-none pointer-events-none">
                                        chevron_right
                                    </span>
                                </Link>
                            )}
                    </Button>
                </div>
            </div>
        </section>
    );
}
