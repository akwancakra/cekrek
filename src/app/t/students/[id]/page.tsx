"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
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
import { DropdownMenuPortal } from "@radix-ui/react-dropdown-menu";
import { PDFAssessmentStudent } from "@/components/elements/exports/PDFAssessmentStudent";
import ExcelAssessmentStudent from "@/components/elements/exports/ExcelAssessmentStudent";
import { useEffect, useState } from "react";
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
    generateAssessmentWrap,
    getVariant,
    processChildAssessments,
} from "@/utils/converters";
import {
    capitalizeFirstLetter,
    formattedDate,
    formattedDateStripYearFirst,
} from "@/utils/formattedDate";
import { fetcher, getChildrenImage } from "@/utils/fetcher";
import useSWR from "swr";
import { useParams, useRouter } from "next/navigation";
import { ProcessedAssessment } from "@/types/processedAssessments.type";
import axios from "axios";
import { toast } from "sonner";
import { Recommendation } from "@/types/recommendation.type";
import {
    AssesmentWrap,
    MonitorRecommendationWrap,
} from "@/types/children.types";
import { BirthHistory } from "@/types/birthHistory.type";
import { ExpertExamination } from "@/types/expertExamination.type";
import { HealthStatus } from "@/types/healthStatus.type";
import { User } from "@/types/user.types";
import useProfile from "@/utils/useProfile";

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
    full_name: string;
    teacher_id: number;
    nick_name: string | null;
    picture: string | null;
    gender: string;
    place_birth: string;
    date_time_birth: string;
    religion: string;
    count_of_siblings: number;
    risk_category: string;
    hearing_test: string;
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

export default function StudentDetails({}) {
    const [data, setData] = useState<Child>();
    const [isSubmit, setIsSubmit] = useState(false);
    const [historyAssessmen, setHistoryAssessmen] = useState<
        ProcessedAssessment[]
    >([]);
    const profile = useProfile();

    const { id } = useParams();
    const { push } = useRouter();

    const {
        data: childData,
        isLoading,
    }: { data: { status: string; child: Child }; isLoading: boolean } = useSWR(
        `/api/teachers/${profile?.id}/students/${id}`,
        fetcher
    );

    useEffect(() => {
        if (!isLoading && profile) {
            if (childData && childData.child) {
                // const assessmentWraps = generateAssessmentWrap(childData.child);

                // childData.child = {
                //     ...childData.child,
                //     child_assesments: assessmentWraps,
                // };

                setData(childData.child);

                const history = processChildAssessments(childData.child);
                setHistoryAssessmen(history);
            } else {
                push("/t");
            }
        }
    }, [childData, isLoading]);

    const removeStudentButton = async () => {
        if (childData?.child?.id) {
            await axios
                .put(`/api/teachers/${1}/students/${childData.child.id}/delete`)
                .then(() => {
                    toast.success("Siswa berhasil dihapus!");
                    setIsSubmit(false);
                    push("/t");
                })
                .catch((err) => {
                    if (err?.response.status === 400) {
                        toast.error(err?.response?.data?.message);
                    } else if (err?.response.status === 500) {
                        toast.error("Server Error");
                    } else {
                        toast.error("Terjadi kesalahan");
                    }
                    setIsSubmit(false);
                });
        }
    };

    return (
        <section className="mx-auto max-w-7xl mb-4">
            <div className="flex gap-2 justify-between items-center">
                <Button asChild variant={"outline"} className="mb-3">
                    <Link href={"/t"}>
                        <span className="material-symbols-outlined me-1 !leading-none !text-lg hover:no-underline">
                            arrow_back
                        </span>
                        Kembali
                    </Link>
                </Button>
            </div>
            <div className="block gap-4 group-[.open]:block lg:group-[.open]:flex md:flex">
                <div className="flex flex-col items-center w-full group-[.open]:w-full lg:group-[.open]:w-1/3 md:w-1/3">
                    <div className="relative rounded-lg bg-gray-400 max-w-xs w-full lg:max-w-none">
                        <AspectRatio ratio={3 / 4}>
                            <Image
                                src={
                                    data?.picture
                                        ? getChildrenImage(data.picture)
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
                    <div className="w-full justify-between items-center flex">
                        <div>
                            <p className="text-gray-400 text-xs">Profile</p>
                            <div className="flex gap-2">
                                <p className="text-header">
                                    {data?.full_name || "Nama"}
                                </p>
                                <Badge
                                    variant={"default"}
                                    className={`${
                                        data?.risk_category &&
                                        getVariant(data.risk_category)
                                    }`}
                                >
                                    {data?.risk_category
                                        ? capitalizeFirstLetter(
                                              data.risk_category
                                          )
                                        : "N/A"}
                                </Badge>
                            </div>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger
                                disabled={isLoading}
                                asChild
                                className="gap-1"
                            >
                                <Button variant="outline" disabled={isLoading}>
                                    <span>Menu</span>{" "}
                                    <span className="material-symbols-outlined cursor-pointer filled !text-xl !leading-4 opacity-70">
                                        more_horiz
                                    </span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="start">
                                <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem
                                        className="cursor-pointer"
                                        asChild
                                    >
                                        <Link
                                            href={`/t/students/${data?.id}/recommendation`}
                                        >
                                            <span className="material-symbols-outlined cursor-pointer me-1 !text-xl !leading-4 opacity-70">
                                                prescriptions
                                            </span>{" "}
                                            Lakukan monitoring
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="cursor-pointer"
                                        asChild
                                    >
                                        <Link
                                            href={`/t/students/${data?.id}/assessment`}
                                        >
                                            <span className="material-symbols-outlined cursor-pointer me-1 !text-xl !leading-4 opacity-70">
                                                assignment
                                            </span>{" "}
                                            Lakukan asesmen
                                        </Link>
                                    </DropdownMenuItem>
                                    {/* <DropdownMenuItem
                                        className="cursor-pointer"
                                        asChild
                                    >
                                        <Link
                                            href={`/t/students/${data?.id}/recommendation`}
                                        >
                                            <span className="material-symbols-outlined cursor-pointer me-1 !text-xl !leading-4 opacity-70">
                                                clinical_notes
                                            </span>{" "}
                                            Rekomendasi harian
                                        </Link>
                                    </DropdownMenuItem> */}
                                    <DropdownMenuItem
                                        className="cursor-pointer"
                                        asChild
                                    >
                                        <Link
                                            href={`/t/students/${data?.id}/edit`}
                                        >
                                            <span className="material-symbols-outlined cursor-pointer me-1 !text-xl !leading-4 opacity-70">
                                                edit
                                            </span>{" "}
                                            Ubah siswa
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="cursor-pointer bg-red-100 text-red-500 hover:!bg-red-200 hover:!text-red-600"
                                        asChild
                                    >
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <button
                                                    type="button"
                                                    className="w-full text-sm py-1.5 rounded-md px-2 gap-1 flex justify-start items-center cursor-pointer bg-red-100 text-red-500 hover:!bg-red-200 hover:!text-red-600"
                                                    disabled={isSubmit}
                                                >
                                                    <span className="material-symbols-outlined cursor-pointer !text-xl !leading-4 opacity-70">
                                                        delete
                                                    </span>
                                                    <span>Hapus siswa</span>
                                                </button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>
                                                        Apakah kamu yakin?
                                                    </AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        Ini akan menghapus data{" "}
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
                                                            &gt; Data riwayat
                                                            asesmen
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
                                                    <AlertDialogAction asChild>
                                                        {data && (
                                                            <Button
                                                                variant={
                                                                    "destructive"
                                                                }
                                                                onClick={() =>
                                                                    removeStudentButton()
                                                                }
                                                                className="bg-red-500 text-white hover:bg-red-700"
                                                                disabled={
                                                                    isSubmit
                                                                }
                                                            >
                                                                Hapus
                                                            </Button>
                                                        )}
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
                        <p className="font-semibold tracking-tight text-lg">
                            Orang Tua
                        </p>
                        <div className="divider my-1" />
                        <div className="w-full grid grid-cols-3 gap-2">
                            {data?.parent?.map((item, index) => (
                                <div className="my-1" key={index}>
                                    <p className="text-xs to-gray-400">
                                        {item?.type &&
                                            capitalizeFirstLetter(item.type)}
                                    </p>
                                    <p className="text-medium font-semibold">
                                        {item.name || "N/A"}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* PROFILE DATA */}
                    <div className="border border-gray-300 p-2 rounded-lg my-3">
                        <div>
                            <p className="font-semibold tracking-tight text-lg">
                                Biodata
                            </p>
                            <div className="divider my-1" />
                            <div className="w-full grid grid-cols-3 gap-2">
                                <div className="my-1">
                                    <p className="text-xs to-gray-400">Nama</p>
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
                                            ? capitalizeFirstLetter(data.gender)
                                            : "N/A"}
                                    </p>
                                </div>
                                <div className="my-1">
                                    <p className="text-xs to-gray-400">Agama</p>
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
                                        {data?.count_of_siblings || "N/A"}
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
                                {!data?.birth_history && (
                                    <div className="col-span-3 text-center py-3 text-small">
                                        <p>Tidak ada riwayat</p>
                                    </div>
                                )}
                                {Object.entries(data?.birth_history || {}).map(
                                    ([key, value]) => {
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
                                                    {value
                                                        ? capitalizeFirstLetter(
                                                              value
                                                          )
                                                        : "N/A"}
                                                </p>
                                            </div>
                                        );
                                    }
                                )}
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
                                {!data?.expert_examination && (
                                    <div className="col-span-3 text-center py-3 text-small">
                                        <p>Tidak ada riwayat</p>
                                    </div>
                                )}
                                {Object.entries(
                                    data?.expert_examination || {}
                                ).map(([key, value]) => {
                                    // Skip printing if key is 'id' or 'child_id'
                                    if (key === "id" || key === "child_id") {
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
                                                {value
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
                                {!data?.health_status && (
                                    <div className="col-span-3 text-center py-3 text-small">
                                        <p>Tidak ada riwayat</p>
                                    </div>
                                )}
                                {Object.entries(data?.health_status || {}).map(
                                    ([key, value]) => {
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
                                                    {value
                                                        ? capitalizeFirstLetter(
                                                              value
                                                          )
                                                        : "N/A"}
                                                </p>
                                            </div>
                                        );
                                    }
                                )}
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
                                <TableHeader>
                                    <TableRow>
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
                                                className="text-center"
                                                colSpan={4}
                                            >
                                                Belum memiliki riwayat asesmen
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
                                            <TableCell>{ass.score}</TableCell>
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
                                                        {data && (
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
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TableCell colSpan={2}>Total</TableCell>
                                        <TableCell
                                            colSpan={3}
                                            className="text-right"
                                        >
                                            {historyAssessmen?.length} Assesmen
                                            Total
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
                                {childData?.child?.monitor_table_data?.length ==
                                    0 && (
                                    <TableRow>
                                        <TableCell
                                            className="text-center"
                                            colSpan={4}
                                        >
                                            Belum memiliki riwayat monitoring
                                        </TableCell>
                                    </TableRow>
                                )}

                                {childData?.child?.monitor_table_data?.map(
                                    (monitor, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                {monitor.finishedActivities}{" "}
                                                Rekomendasi
                                            </TableCell>
                                            <TableCell>
                                                {monitor.unfinishedActivities}{" "}
                                                Rekomendasi
                                            </TableCell>
                                            <TableCell>
                                                {formattedDate(monitor.date)}
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
                                                        <DropdownMenuItem
                                                            className="cursor-pointer"
                                                            asChild
                                                        >
                                                            <Link
                                                                href={`/t/students/${id}/recommendation?date=${formattedDateStripYearFirst(
                                                                    monitor.date
                                                                )}`}
                                                            >
                                                                <span className="material-symbols-outlined cursor-pointer me-1 !text-xl !leading-4 opacity-70">
                                                                    assignment
                                                                </span>{" "}
                                                                <span>
                                                                    Lihat hasil
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
                                            childData?.child?.monitor_table_data
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
        </section>
    );
}
