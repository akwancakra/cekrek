"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
    AssesmentWrap,
    MonitorRecommendationWrap,
} from "@/types/children.types";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    capitalizeFirstLetter,
    formattedDate,
    formattedDateStripYearFirst,
} from "@/utils/formattedDate";
import ExcelAssessmentStudent from "@/components/elements/exports/ExcelAssessmentStudent";
import { PDFAssessmentStudent } from "@/components/elements/exports/PDFAssessmentStudent";
import { getVariant, processChildAssessments } from "@/utils/converters";
import { fetcher, getChildrenImage } from "@/utils/fetcher";
import useSWR from "swr";
import { useParams, useRouter } from "next/navigation";
import { Recommendation } from "@/types/recommendation.type";
import { User } from "@/types/user.types";
import { BirthHistory } from "@/types/birthHistory.type";
import { ExpertExamination } from "@/types/expertExamination.type";
import { HealthStatus } from "@/types/healthStatus.type";
import { ProcessedAssessment } from "@/types/processedAssessments.type";
import { toast } from "sonner";

type ChildRecommendation = {
    id: number;
    children_id: number;
    recommendation_id: number;
    recommendations: Recommendation;
    isFinished: boolean;
};

type MonitorTableData = {
    date: string;
    finishedActivities: number;
    unfinishedActivities: number;
};

type Child = {
    id: number;
    teacher_id?: number;
    full_name: string;
    risk_category: string;
    hearing_test: string;
    nick_name?: string;
    picture?: string;
    gender: string;
    place_birth?: string;
    date_time_birth?: Date | string;
    religion?: string;
    count_of_siblings?: number;
    child_recommendations?: ChildRecommendation[];
    last_assesment?: string;
    parent?: User[];
    monitoringChildRecommendations?: MonitorRecommendationWrap[];
    birth_history?: BirthHistory;
    expert_examination?: ExpertExamination;
    health_status?: HealthStatus;
    child_assesments?: AssesmentWrap[];
    monitor_child_recommendations: {
        id: number;
        child_recommendation_id: number;
        date_time: string;
        is_done: boolean;
        child_recommendations: ChildRecommendation;
        recommendations: Recommendation;
    }[];
    unfinishedRecommendations: number;
    finishedRecommendations: number;
    monitor_table_data: MonitorTableData[];
};

export default function Template({}) {
    const [profile, setProfile] = useState<Child>();
    const [selectedChildId, setSelectedChildId] = useState<string>();
    const [historyAssessmen, setHistoryAssessmen] = useState<
        ProcessedAssessment[]
    >([]);
    // const historyAssessmen = processChildAssessments(profile);

    const { id } = useParams();
    const { push } = useRouter();

    const {
        data,
        isLoading,
    }: { data: { status: string; child: Child }; isLoading: boolean } = useSWR(
        `/api/parents/${1}/children/${id}`,
        fetcher
    );

    const handleChange = (value: any) => {
        setSelectedChildId(value);
        // setProfile(childs.find((child) => child.id == value) as Child);
    };

    const removeChildButton = (id: number) => {
        toast.error("Anak berhasil dihapus!");
        push("/p/childs");
        console.log("Child Remove Button Clicked!");
    };

    useEffect(() => {
        if (data?.child) {
            setProfile(data.child);
            // setSelectedChildId(data.child.id.toString());
            setHistoryAssessmen(processChildAssessments(data.child));
        }
    }, [data]);

    return (
        <section className="mx-auto max-w-7xl mb-4">
            <div className="flex gap-2 justify-between items-center">
                <Button asChild variant={"outline"} className="mb-3">
                    <Link href={"/p/childs"}>
                        <span className="material-symbols-outlined me-1 !leading-none !text-lg hover:no-underline">
                            arrow_back
                        </span>
                        Kembali
                    </Link>
                </Button>
            </div>

            {isLoading && (
                <>
                    <div className="text-center">
                        <p>Loading...</p>
                    </div>
                </>
            )}

            {!isLoading && profile && (
                <div className="block gap-4 group-[.open]:block lg:group-[.open]:flex md:flex">
                    <div className="flex flex-col items-center w-full group-[.open]:w-full lg:group-[.open]:w-1/3 md:w-1/3">
                        <div className="relative rounded-lg bg-gray-400 max-w-xs w-full lg:max-w-none">
                            <AspectRatio ratio={3 / 4}>
                                <Image
                                    src={
                                        profile?.picture
                                            ? getChildrenImage(profile.picture)
                                            : "/static/images/user-default.jpg"
                                    }
                                    alt="Child Profile"
                                    fill={true}
                                    className="rounded-lg object-cover"
                                    draggable={false}
                                />
                                {/* <div className="absolute bottom-0 w-full">
                                    <div className="m-2 flex justify-between items-center bg-white rounded-lg p-2 min-h-20">
                                        <Select
                                            value={selectedChildId}
                                            onValueChange={handleChange}
                                        >
                                            <SelectTrigger
                                                id="framework"
                                                className="h-fit"
                                            >
                                                <SelectValue placeholder="Pilih Anak" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {childs.map((item) => (
                                                    <SelectItem
                                                        key={item.id}
                                                        value={`${item.id}`}
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            <div className="min-w-16 max-w-20 bg-gray-300 rounded-lg ">
                                                                <AspectRatio
                                                                    ratio={
                                                                        1 / 1
                                                                    }
                                                                >
                                                                    <Image
                                                                        src={`/static/images/${
                                                                            item.picture ||
                                                                            "user-default.jpg"
                                                                        }`}
                                                                        alt="Child Profile"
                                                                        fill={
                                                                            true
                                                                        }
                                                                        className="rounded-lg object-cover"
                                                                        draggable={
                                                                            false
                                                                        }
                                                                    />
                                                                </AspectRatio>
                                                            </div>
                                                            <div className="flex flex-col items-start">
                                                                <p>
                                                                    {
                                                                        item.full_name
                                                                    }
                                                                </p>
                                                                <Badge
                                                                    variant={
                                                                        "outline"
                                                                    }
                                                                    className={`${getVariant(
                                                                        item.risk_category ||
                                                                            "Low"
                                                                    )}`}
                                                                >
                                                                    {item.risk_category?.toUpperCase()}
                                                                </Badge>
                                                            </div>
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div> */}
                            </AspectRatio>
                        </div>
                    </div>
                    <div className="w-full mt-3 group-[.open]:w-full group-[.open]:mt-3 lg:group-[.open]:w-2/3 lg:group-[.open]:mt-0 md:w-2/3 md:mt-0">
                        <div className="w-full justify-between items-center sm:flex">
                            <div>
                                <p className="text-gray-400 text-xs">Profile</p>
                                <p className="text-header">
                                    {profile?.full_name}
                                </p>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild className="gap-1">
                                    <Button variant="outline">
                                        <span>Menu</span>{" "}
                                        <span className="material-symbols-outlined cursor-pointer filled !text-xl !leading-4 opacity-70">
                                            more_horiz
                                        </span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="w-56"
                                    align="end"
                                >
                                    <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem
                                            className="cursor-pointer"
                                            asChild
                                        >
                                            <Link
                                                href={`/p/childs/${profile?.id}/recommendation`}
                                            >
                                                <span className="material-symbols-outlined cursor-pointer me-1 !text-xl !leading-4 opacity-70">
                                                    assignment
                                                </span>{" "}
                                                Lakukan monitoring
                                            </Link>
                                        </DropdownMenuItem>
                                        {/* <DropdownMenuItem
                                            className="cursor-pointer"
                                            asChild
                                        >
                                            <Link
                                                href={`/p/childs/${profile?.id}/recommendation`}
                                            >
                                                <span className="material-symbols-outlined cursor-pointer me-1 !text-xl !leading-4 opacity-70">
                                                    clinical_notes
                                                </span>{" "}
                                                Rekomendasi harian
                                            </Link>
                                        </DropdownMenuItem> */}
                                        {/* <DropdownMenuItem
                                            className="cursor-pointer"
                                            asChild
                                        >
                                            <Link
                                                href={`/p/childs/${profile?.id}/edit`}
                                            >
                                                <span className="material-symbols-outlined cursor-pointer me-1 !text-xl !leading-4 opacity-70">
                                                    edit
                                                </span>{" "}
                                                Ubah anak
                                            </Link>
                                        </DropdownMenuItem> */}
                                        <DropdownMenuItem
                                            className="cursor-pointer bg-red-100 text-red-500 hover:!bg-red-200 hover:!text-red-600"
                                            asChild
                                        >
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <button
                                                        type="button"
                                                        className="w-full text-small py-1.5 rounded-md px-2 gap-1 flex justify-start items-center cursor-pointer bg-red-100 text-red-500 hover:!bg-red-200 hover:!text-red-600"
                                                    >
                                                        <span className="material-symbols-outlined cursor-pointer !text-xl !leading-4 opacity-70">
                                                            delete
                                                        </span>
                                                        <span>Hapus anak</span>
                                                    </button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>
                                                            Apakah kamu yakin?
                                                        </AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Ini akan menghapus
                                                            data{" "}
                                                            <span className="font-semibold">
                                                                Dwiky Putra
                                                            </span>{" "}
                                                            dan tidak bisa
                                                            dikembalikan, dan
                                                            berikut rincian data
                                                            yang akan dihapus:
                                                            <span className="block mt-1">
                                                                &gt; Data profil
                                                                anak
                                                            </span>
                                                            <span className="block">
                                                                &gt; Data
                                                                riwayat asesmen
                                                            </span>
                                                            <span className="block">
                                                                &gt; Data
                                                                rekomendasi
                                                            </span>
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>
                                                            Batal
                                                        </AlertDialogCancel>
                                                        <AlertDialogAction
                                                            asChild
                                                        >
                                                            <Button
                                                                variant={
                                                                    "destructive"
                                                                }
                                                                onClick={() =>
                                                                    removeChildButton(
                                                                        profile?.id
                                                                    )
                                                                }
                                                                className="bg-red-500 text-white hover:bg-red-700"
                                                            >
                                                                Hapus
                                                            </Button>
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <div className="border border-gray-300 p-2 rounded-lg my-3">
                            <div>
                                <p className="font-semibold tracking-tight text-lg">
                                    Biodata
                                </p>
                                <div className="divider my-1" />
                                <div className="w-full grid grid-cols-3 gap-2">
                                    <div className="my-1">
                                        <p className="text-xs to-gray-400">
                                            Nama
                                        </p>
                                        <p className="text-medium font-semibold">
                                            {profile?.full_name || "N/A"}
                                        </p>
                                    </div>
                                    <div className="my-1">
                                        <p className="text-xs to-gray-400">
                                            Nama Panggilan
                                        </p>
                                        <p className="text-medium font-semibold">
                                            {profile?.nick_name || "N/A"}
                                        </p>
                                    </div>
                                    <div className="my-1">
                                        <p className="text-xs to-gray-400">
                                            Jenis Kelamin
                                        </p>
                                        <p className="text-medium font-semibold">
                                            {profile?.gender
                                                ? capitalizeFirstLetter(
                                                      profile.gender
                                                  )
                                                : "N/A"}
                                        </p>
                                    </div>
                                    <div className="my-1">
                                        <p className="text-xs to-gray-400">
                                            Agama
                                        </p>
                                        <p className="text-medium font-semibold">
                                            {profile?.religion
                                                ? capitalizeFirstLetter(
                                                      profile.religion
                                                  )
                                                : "N/A"}
                                        </p>
                                    </div>
                                    <div className="my-1">
                                        <p className="text-xs to-gray-400">
                                            Tempat Lahir
                                        </p>
                                        <p className="text-medium font-semibold">
                                            {profile?.place_birth || "N/A"}
                                        </p>
                                    </div>
                                    <div className="my-1">
                                        <p className="text-xs to-gray-400">
                                            Tanggal Lahir
                                        </p>
                                        <p className="text-medium font-semibold">
                                            {profile?.date_time_birth
                                                ? formattedDate(
                                                      profile.date_time_birth.toString()
                                                  )
                                                : "N/A"}
                                        </p>
                                    </div>
                                    <div className="my-1">
                                        <p className="text-xs to-gray-400">
                                            Pendengaran
                                        </p>
                                        <p className="text-medium font-semibold">
                                            {profile?.hearing_test
                                                ? capitalizeFirstLetter(
                                                      profile.hearing_test
                                                  )
                                                : "N/A"}
                                        </p>
                                    </div>
                                    <div className="my-1">
                                        <p className="text-xs to-gray-400">
                                            Jumlah Saudara
                                        </p>
                                        <p className="text-medium font-semibold">
                                            {profile?.count_of_siblings ||
                                                "N/A"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="border border-gray-300 p-2 rounded-lg my-3">
                            <div>
                                <p className="font-semibold tracking-tight text-lg">
                                    Riwayat Kehamilan/Kelahiran
                                </p>
                                <div className="divider my-1" />
                                <div className="w-full grid grid-cols-3 gap-2">
                                    {!profile?.birth_history && (
                                        <div className="col-span-3 text-center py-3 text-small">
                                            <p>Tidak ada riwayat</p>
                                        </div>
                                    )}
                                    {Object.entries(
                                        profile?.birth_history || {}
                                    ).map(([key, value]) => {
                                        if (
                                            key === "id" ||
                                            key === "child_id"
                                        ) {
                                            return null;
                                        }

                                        const translatedKey =
                                            {
                                                healthy_pregnancy:
                                                    "Kehamilan Sehat",
                                                pregnancy_illness:
                                                    "Penyakit Kehamilan",
                                                gestation_details:
                                                    "Rincian Kehamilan",
                                                birthplace: "Tempat Lahir",
                                                birth_assistance:
                                                    "Pertolongan Persalinan",
                                                delivery_process:
                                                    "Proses Persalinan",
                                                congenital_anomalies:
                                                    "Kelainan Bawaan",
                                                first_food: "Makanan Pertama",
                                                formula_milk: "Susu Formula",
                                                immunization: "Imunisasi",
                                            }[key] || key;

                                        return (
                                            <div key={key} className="my-1">
                                                <p className="text-xs to-gray-400">
                                                    {translatedKey.replace(
                                                        "_",
                                                        " "
                                                    )}
                                                </p>
                                                <p className="text-medium font-semibold">
                                                    {typeof value ===
                                                        "string" && value
                                                        ? capitalizeFirstLetter(
                                                              value
                                                          )
                                                        : "N/A"}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className="border border-gray-300 p-2 rounded-lg my-3">
                            <div>
                                <p className="font-semibold tracking-tight text-lg">
                                    Hasil Pemeriksaan Ahli
                                </p>
                                <div className="divider my-1" />
                                <div className="w-full grid grid-cols-3 gap-2">
                                    {!profile?.expert_examination && (
                                        <div className="col-span-3 text-center py-3 text-small">
                                            <p>Tidak ada riwayat</p>
                                        </div>
                                    )}
                                    {Object.entries(
                                        profile?.expert_examination || {}
                                    ).map(([key, value]) => {
                                        // Skip printing if key is 'id' or 'child_id'
                                        if (
                                            key === "id" ||
                                            key === "child_id"
                                        ) {
                                            return null;
                                        }

                                        // Translating keys for better understanding
                                        const translatedKey =
                                            {
                                                pediatrician: "Pediatrician",
                                                rehabilitation: "Rehabilitasi",
                                                psychologist: "Psikolog",
                                                therapist: "Terapis",
                                            }[key] || key;

                                        return (
                                            <div key={key} className="my-1">
                                                <p className="text-xs to-gray-400">
                                                    {translatedKey.replace(
                                                        "_",
                                                        " "
                                                    )}
                                                </p>
                                                <p className="text-medium font-semibold">
                                                    {typeof value ===
                                                        "string" && value
                                                        ? capitalizeFirstLetter(
                                                              value
                                                          )
                                                        : "N/A"}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className="border border-gray-300 p-2 rounded-lg my-3">
                            <div>
                                <p className="font-semibold tracking-tight text-lg">
                                    Kesehatan
                                </p>
                                <div className="divider my-1" />
                                <div className="w-full grid grid-cols-3 gap-2">
                                    {!profile?.health_status && (
                                        <div className="col-span-3 text-center py-3 text-small">
                                            <p>Tidak ada riwayat</p>
                                        </div>
                                    )}
                                    {Object.entries(
                                        profile?.health_status || {}
                                    ).map(([key, value]) => {
                                        // Skip printing if key is 'id' or 'child_id'
                                        if (
                                            key === "id" ||
                                            key === "child_id"
                                        ) {
                                            return null;
                                        }

                                        // Translating keys for better understanding
                                        const translatedKeyHealth =
                                            {
                                                serious_illness:
                                                    "Penyakit Serius",
                                                current_diseases:
                                                    "Penyakit Saat Ini",
                                                treatment_location:
                                                    "Lokasi Pengobatan",
                                                treatment_duration:
                                                    "Durasi Pengobatan",
                                                general_comparison:
                                                    "Perbandingan Umum",
                                                crawling_development:
                                                    "Perkembangan Merangkak",
                                                sitting_development:
                                                    "Perkembangan Duduk",
                                                walking_development:
                                                    "Perkembangan Berjalan",
                                                first_words_age:
                                                    "Usia Berkata Pertama",
                                                speaking_fluency_age:
                                                    "Usia Bicara Lancar",
                                                bedwetting: "Mengompol",
                                            }[key] || key;

                                        return (
                                            <div key={key} className="my-1">
                                                <p className="text-xs to-gray-400">
                                                    {translatedKeyHealth.replace(
                                                        "_",
                                                        " "
                                                    )}
                                                </p>
                                                <p className="text-medium font-semibold">
                                                    {typeof value ===
                                                        "string" && value
                                                        ? capitalizeFirstLetter(
                                                              value
                                                          )
                                                        : "N/A"}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* ASESMEN HISTORY */}
                        <div className="border border-gray-300 p-2 rounded-lg my-3">
                            <p className="font-semibold tracking-tight text-lg">
                                Riwayat Asesmen
                            </p>
                            <div className="divider my-1" />
                            <div className="overflow-x-auto">
                                <Table>
                                    {/* <TableCaption>
                                    A list of your recent invoices.
                                </TableCaption> */}
                                    <TableHeader>
                                        <TableRow>
                                            {/* <TableHead>ID</TableHead> */}
                                            <TableHead>Tipe</TableHead>
                                            <TableHead>Lulus/Gagal</TableHead>
                                            <TableHead>Kategori</TableHead>
                                            <TableHead>Tanggal Tes</TableHead>
                                            <TableHead className="w-2 text-center">
                                                #
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {historyAssessmen?.length == 0 && (
                                            <TableRow>
                                                <TableCell
                                                    colSpan={5}
                                                    className="text-center"
                                                >
                                                    Belum memiliki riwayat
                                                    asesmen
                                                </TableCell>
                                            </TableRow>
                                        )}

                                        {historyAssessmen?.map((ass, index) => (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    Asesmen{" "}
                                                    {capitalizeFirstLetter(
                                                        ass.type
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    {ass.score}
                                                </TableCell>
                                                <TableCell>
                                                    {ass.risk_category}
                                                </TableCell>
                                                <TableCell>
                                                    {formattedDate(
                                                        ass.date_time.toString()
                                                    )}
                                                </TableCell>
                                                <TableCell className="w-2 text-center">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger
                                                            asChild
                                                        >
                                                            <Button
                                                                variant="ghost"
                                                                className="h-8 w-8 p-0"
                                                            >
                                                                <span className="material-symbols-outlined cursor-pointer !text-xl !leading-none opacity-70">
                                                                    more_horiz
                                                                </span>
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuLabel>
                                                                Aksi
                                                            </DropdownMenuLabel>
                                                            {profile && (
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
                                                                                        profile
                                                                                    }
                                                                                />
                                                                                <PDFAssessmentStudent
                                                                                    data={
                                                                                        profile
                                                                                    }
                                                                                />
                                                                            </DropdownMenuSubContent>
                                                                        </DropdownMenuPortal>
                                                                    </DropdownMenuSub>
                                                                </DropdownMenuGroup>
                                                            )}
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                    <TableFooter>
                                        <TableRow>
                                            <TableCell colSpan={3}>
                                                Total
                                            </TableCell>
                                            <TableCell
                                                colSpan={2}
                                                className="text-right"
                                            >
                                                {
                                                    profile?.child_assesments
                                                        ?.length
                                                }{" "}
                                                Assesmen Total
                                            </TableCell>
                                        </TableRow>
                                    </TableFooter>
                                </Table>
                            </div>
                        </div>

                        <div className="border border-gray-300 p-2 rounded-lg my-3">
                            <p className="font-semibold tracking-tight text-lg">
                                Monitoring rekomendasi
                            </p>
                            <div className="divider my-1" />
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Selesai</TableHead>
                                        <TableHead>Belum Selesai</TableHead>
                                        <TableHead>Tanggal Monitor</TableHead>
                                        <TableHead className="w-2 text-center">
                                            #
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {profile?.monitor_table_data?.length ==
                                        0 && (
                                        <TableRow>
                                            <TableCell
                                                className="text-center"
                                                colSpan={4}
                                            >
                                                Belum memiliki riwayat
                                                monitoring
                                            </TableCell>
                                        </TableRow>
                                    )}

                                    {profile?.monitor_table_data?.map(
                                        (monitor, index) => (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    {monitor.finishedActivities}{" "}
                                                    Rekomendasi
                                                </TableCell>
                                                <TableCell>
                                                    {
                                                        monitor.unfinishedActivities
                                                    }{" "}
                                                    Rekomendasi
                                                </TableCell>
                                                <TableCell>
                                                    {formattedDate(
                                                        monitor.date
                                                    )}
                                                </TableCell>
                                                <TableCell className="w-2 text-center">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger
                                                            asChild
                                                        >
                                                            <Button
                                                                variant="ghost"
                                                                className="h-8 w-8 p-0"
                                                            >
                                                                <span className="material-symbols-outlined cursor-pointer !text-xl !leading-none opacity-70">
                                                                    more_horiz
                                                                </span>
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem
                                                                className="cursor-pointer"
                                                                asChild
                                                            >
                                                                <Link
                                                                    href={`/p/childs/${id}/recommendation?date=${formattedDateStripYearFirst(
                                                                        monitor.date
                                                                    )}`}
                                                                >
                                                                    <span className="material-symbols-outlined cursor-pointer me-1 !text-xl !leading-4 opacity-70">
                                                                        assignment
                                                                    </span>{" "}
                                                                    <span>
                                                                        Lihat
                                                                        hasil
                                                                        monitoring
                                                                    </span>
                                                                </Link>
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    )}
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TableCell colSpan={2}>Total</TableCell>
                                        <TableCell
                                            colSpan={3}
                                            className="text-right"
                                        >
                                            {
                                                profile?.monitor_table_data
                                                    ?.length
                                            }{" "}
                                            Monitor Total
                                        </TableCell>
                                    </TableRow>
                                </TableFooter>
                            </Table>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
