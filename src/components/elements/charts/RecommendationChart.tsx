import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { fetcher } from "@/utils/fetcher";
import { error } from "console";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import useSWR from "swr";

// TODO: UNTUK DIGUNAKAN PADA SELECT
type Week = {
    label: string;
    startDate: string; // ISO 8601 string
    endDate: string; // ISO 8601 string
    value: number;
};

type WeeksResponse = {
    status: "success";
    weeks: Week[];
};

// TODO: UNTUK DIGUNAKAN PADA CHART
export type ChartDataset = {
    label: string;
    data: number[];
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: number;
    lineTension?: number;
    fill?: boolean;
};

type ChartDataResponse = {
    status: "success";
    chartData: {
        labels: string[];
        datasets: ChartDataset[];
    };
};

const ChartComponent = ({ aspect, teacherId, studentId }) => {
    const [selectedWeek, setSelectedWeek] = useState<Week | null>(null);

    const {
        data: weeksData,
        error: weeksError,
        isLoading: isLoadingWeeks,
    }: {
        data: WeeksResponse;
        error: any;
        isLoading: boolean;
    } = useSWR<WeeksResponse>(
        `/api/teachers/${teacherId}/students/${studentId}/recommendations/chart/weeks?aspect=${aspect}`,
        fetcher
    );

    const {
        data: chartData,
        error: chartDataError,
        isLoading: isLoadingChartData,
    }: {
        data: ChartDataResponse;
        error: any;
        isLoading: boolean;
    } = useSWR<ChartDataResponse>(
        selectedWeek
            ? `/api/teachers/${teacherId}/students/${studentId}/recommendations/chart?aspect=${aspect}&endDate=${selectedWeek.endDate}`
            : null,
        fetcher
    );

    // Set initial selection based on the current date
    useEffect(() => {
        if (weeksData && weeksData.weeks.length > 0) {
            const today = new Date();
            const defaultWeek = weeksData.weeks.find((week) => {
                const startDate = new Date(week.startDate);
                const endDate = new Date(week.endDate);
                return today >= startDate && today <= endDate;
            });

            setSelectedWeek(defaultWeek || weeksData.weeks[0]);
        }
    }, [weeksData]);

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

    if (isLoadingWeeks || isLoadingChartData || !selectedWeek) {
        return (
            <>
                <div className="w-full min-h-36  border border-gray-300 p-2 rounded-lg dark:border-neutral-600">
                    <div className="h-full flex justify-center items-center mb-2 text-center text-sm sm:text-base">
                        <p>Data chart sedang dimuat...</p>
                    </div>
                </div>
            </>
        );
    }

    if (weeksError || chartDataError) {
        return (
            <>
                <div className="w-full min-h-36  border border-gray-300 p-2 rounded-lg dark:border-neutral-600">
                    <div className="h-full flex justify-center items-center mb-2 text-center text-sm sm:text-base">
                        <p>Data chart tidak tersedia</p>
                    </div>
                </div>
            </>
        );
    }

    const datasets =
        chartData?.chartData.datasets.map((dataset) => ({
            ...dataset,
            backgroundColor:
                dataset.backgroundColor ?? "rgba(126, 73, 255, 0.5)",
            borderColor: dataset.borderColor ?? "rgba(126, 73, 255, 1)",
            borderWidth: dataset.borderWidth ?? 2,
            lineTension: dataset.lineTension ?? 0.3,
            fill: dataset.fill ?? true,
        })) || [];

    return (
        <div className="w-full border border-gray-300 p-2 rounded-lg dark:border-neutral-600">
            <div className="flex justify-between items-center mb-2 text-sm sm:text-base">
                <p className="text-medium font-medium tracking-tight">
                    {aspect.charAt(0).toUpperCase() + aspect.slice(1)}
                </p>
                <Select
                    disabled={isLoadingWeeks}
                    defaultValue={selectedWeek?.value.toString()}
                    onValueChange={(value) =>
                        setSelectedWeek(
                            weeksData?.weeks.find(
                                (week) => week.value.toString() === value
                            )
                        )
                    }
                >
                    <SelectTrigger className="w-fit min-w-24">
                        <SelectValue placeholder="Pilih Minggu" />
                    </SelectTrigger>
                    <SelectContent>
                        {weeksData?.weeks.map((week) => (
                            <SelectItem
                                key={week.value}
                                value={week.value.toString()}
                            >
                                {week.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="w-full">
                <AspectRatio ratio={16 / 9}>
                    {chartData?.chartData && datasets && (
                        <Line
                            options={getOptions()}
                            data={{
                                labels: chartData.chartData.labels,
                                datasets,
                            }}
                        />
                    )}
                </AspectRatio>
            </div>
        </div>
    );
};

export default ChartComponent;
