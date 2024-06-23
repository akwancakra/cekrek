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
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Bar } from "react-chartjs-2";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import RecomendationCard from "@/components/elements/cards/RecomendationCard";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
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
            // position: "top" as const,
        },
        title: {
            display: false,
            // text: title,
        },
    },
    scales: {
        y: {
            display: false,
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
        backgroundColor: "rgba(126, 73, 255, 0.3)",
        borderColor: "rgba(126, 73, 255, 1)",
        borderWidth: 1.5,
    },
];

export default function RecomendationStudent({}) {
    // Initialize the date state with today's date
    const [date, setDate] = useState<Date | undefined>(new Date());

    // Function to handle date selection
    const handleDateSelect = (day: Date | undefined) => {
        if (day) {
            setDate(day);
        }
    };

    return (
        <section className="mx-auto max-w-7xl mb-4">
            <Button asChild variant={"outline"} className="mb-3">
                <Link href={"/t/students"}>
                    <span className="material-symbols-outlined me-1 !leading-none !text-lg hover:no-underline">
                        arrow_back
                    </span>
                    Kembali
                </Link>
            </Button>
            <div className="w-full border border-gray-300 rounded-lg p-2 mb-3">
                <div>
                    <p className="text-gray-400 text-small">
                        Monitoring Asesmen Umum
                    </p>
                    <p className="text-header">Dewantara</p>
                    <Badge
                        variant={"default"}
                        className="bg-primary hover:bg-primary"
                    >
                        Tingkat Medium
                    </Badge>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-2 group-[.open]:grid-cols-1 md:group-[.open]:grid-cols-3 md:grid-cols-3 mb-3">
                <div className="w-full border border-gray-300 p-2 rounded-lg">
                    <div className="flex justify-between items-center mb-2 text-sm sm:text-base">
                        <p className="text-medium font-medium tracking-tight">
                            Mengikuti Perintah
                        </p>
                        <Select>
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
                            <Bar
                                options={getOptions()}
                                data={getData(datasets1)}
                                className="!h-full"
                            />
                        </AspectRatio>
                    </div>
                </div>
                <div className="w-full border border-gray-300 p-2 rounded-lg sm:min-h-60">
                    <div className="flex justify-between items-center mb-2 text-sm sm:text-base">
                        <p className="font-medium tracking-tight">Nama Aspek</p>
                        <Select>
                            <SelectTrigger className="w-fit min-w-24">
                                <SelectValue placeholder="Pilih Minggu" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="light">
                                    Min 1 - Mar
                                </SelectItem>
                                <SelectItem value="dark" defaultChecked={true}>
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
                            <Bar
                                options={getOptions()}
                                data={getData(datasets1)}
                                className="!h-full"
                            />
                        </AspectRatio>
                    </div>
                </div>
                <div className="w-full border border-gray-300 p-2 rounded-lg sm:min-h-60">
                    <div className="flex justify-between items-center mb-2 text-sm sm:text-base">
                        <p className="font-medium tracking-tight">Nama Aspek</p>
                        <Select>
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
                            <Bar
                                options={getOptions()}
                                data={getData(datasets1)}
                                className="!h-full"
                            />
                        </AspectRatio>
                    </div>
                </div>
            </div>
            <div className="rounded-lg p-4 w-full flex items-center text-white bg-primary h-fit mb-3 sm:min-h-24">
                <div>
                    <p className="text-small -mb-1">Informasi</p>
                    <p className="font-semibold tracking-tight text-large">
                        Asesmen M-Chart-R/F sedang aktif
                    </p>
                </div>
            </div>
            <div className="border border-gray-300 rounded-lg overflow-hidden">
                <div className="bg-purple-50 flex justify-between items-center p-2 !text-sm sm:text-base">
                    <p className="font-semibold tracking-tight text-medium">
                        Rekomendasi Aktifitas
                    </p>
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
                </div>
                <div className="p-2">
                    <div className="border border-gray-300 rounded-lg p-2 grid gap-2 text-center justify-evenly mb-2 grid-cols-1 sm:grid-cols-2">
                        <div className="flex flex-col justify-center items-center h-20 sm:h-32">
                            <p className="text-small">
                                Aktifitas belum dilakukan
                            </p>
                            <p className="font-semibold tracking-tight text-3xl sm:text-5xl">
                                2
                            </p>
                        </div>
                        <div className="flex flex-col justify-center items-center h-20 sm:h-32">
                            <p className="text-small">Aktifitas selesai</p>
                            <p className="font-semibold tracking-tight text-3xl sm:text-5xl">
                                12
                            </p>
                        </div>
                    </div>
                    <p className="font-semibold tracking-tight text-medium mb-2">
                        Berbicara (2)
                    </p>
                    <div className="flex flex-col gap-2">
                        <RecomendationCard />
                        <RecomendationCard />
                        <RecomendationCard />
                    </div>
                </div>
                <div className="flex justify-end items-center p-2">
                    <Button asChild variant={"outline"}>
                        <Link href={"/t/students/1/assessment"}>
                            Cek Hari Ini
                            <span className="material-symbols-outlined !text-xl !leading-none pointer-events-none">
                                chevron_right
                            </span>
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
