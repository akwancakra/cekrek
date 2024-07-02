"use client";

import { getImageUrl } from "@/app/t/students/[id]/edit/page";
import { ChildrenData } from "@/app/t/students/add/page";
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
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { capitalizeFirstLetter, formattedDate } from "@/utils/formattedDate";
import axios from "axios";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Props {
    handleBackStage: () => void;
    localData: ChildrenData;
    resetLocal: ({ push }: { push: boolean }) => void;
}

export default function PreviewData({
    handleBackStage,
    localData,
    resetLocal,
}: Props) {
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    const [data, setData] = useState<ChildrenData>();

    const router = useRouter();
    const { id } = useParams();

    useEffect(() => {
        setIsLoading(true);
        const finalData = localData;
        if (
            finalData?.biodata &&
            finalData?.birthHistory &&
            finalData?.expertExamination &&
            finalData?.healthStatus
        ) {
            setData(finalData);
        } else {
            if (isSubmit) {
                setIsSubmit(false);
                router.push("/t");
            }

            setIsSubmit(false);

            if (id) {
                router.push(`/t/students/${id}/edit?stage=biodata`);
            }
        }
        setIsLoading(false);
    }, [localData]);

    const handleSubmit = async () => {
        setIsSubmit(true);

        const finalData = {
            teacher_id: 1,
            ...data?.biodata,
            ...data?.birthHistory,
            ...data?.expertExamination,
            ...data?.healthStatus,
        };

        const submitPromise = new Promise<void>(async (resolve, reject) => {
            try {
                if (id) {
                    await axios.put(
                        `/api/teachers/${1}/students/${id}`,
                        finalData
                    );
                } else {
                    await axios.post("/api/children", finalData);
                }
                resolve();
            } catch (error) {
                reject(error);
            }
        });

        toast.promise(submitPromise, {
            loading: "Mengirimkan data...",
            success: () => {
                // setIsSubmit(false);
                resetLocal({ push: true });
                // if (id) {
                return "Berhasil menyimpan data!";
                // }
            },
            error: (data) => {
                setIsSubmit(false);
                if (data?.response?.status === 400) {
                    return data?.response?.data?.message;
                } else if (data?.response?.status === 500) {
                    return "Server Error";
                } else {
                    return "Terjadi kesalahan";
                }
            },
        });
    };

    return (
        <>
            <div>
                <div className="divider mb-1 mt-4"></div>
                <p className="text-large font-semibold tracking-tight mb-3">
                    Biodata
                </p>

                <div>
                    {isLoading ? (
                        <>
                            <div className="skeleton rounded-lg w-14 h-14 mb-3 sm:w-28 sm:h-28"></div>
                            <div className="grid gap-4 mb-3 sm:grid-cols-2 md:group-[.open]:grid-cols-2">
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
                        </>
                    ) : (
                        <>
                            <div className="max-w-32 mb-3 bg-gray-300 border border-gray-300 rounded-lg overflow-hidden">
                                <AspectRatio ratio={1 / 1}>
                                    <Image
                                        src={getImageUrl(
                                            data?.biodata?.picture
                                        )}
                                        alt="Child Profile"
                                        fill={true}
                                        className="rounded-lg object-cover"
                                        draggable={false}
                                    />
                                </AspectRatio>
                            </div>
                            <div className="grid gap-2 gap-y-2 mb-3 sm:grid-cols-2 md:group-[.open]:grid-cols-2">
                                <div>
                                    <p className="text-xs to-gray-400">Nama</p>
                                    <p className="text-medium font-semibold">
                                        {data?.biodata?.full_name || "N/A"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs to-gray-400">
                                        Nama Panggilan
                                    </p>
                                    <p className="text-medium font-semibold">
                                        {data?.biodata?.nick_name || "N/A"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs to-gray-400">
                                        Jenis Kelamin
                                    </p>
                                    <p className="text-medium font-semibold">
                                        {data?.biodata?.gender
                                            ? capitalizeFirstLetter(
                                                  data.biodata.gender
                                              )
                                            : "N/A"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs to-gray-400">Agama</p>
                                    <p className="text-medium font-semibold">
                                        {data?.biodata?.religion
                                            ? capitalizeFirstLetter(
                                                  data.biodata.religion
                                              )
                                            : "N/A"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs to-gray-400">
                                        Tempat Lahir
                                    </p>
                                    <p className="text-medium font-semibold">
                                        {data?.biodata?.place_birth || "N/A"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs to-gray-400">
                                        Tanggal Lahir
                                    </p>
                                    <p className="text-medium font-semibold">
                                        {data?.biodata?.date_birth
                                            ? formattedDate(
                                                  data.biodata.date_birth
                                              )
                                            : "N/A"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs to-gray-400">
                                        Pendengaran
                                    </p>
                                    <p className="text-medium font-semibold">
                                        {data?.biodata?.hearing
                                            ? capitalizeFirstLetter(
                                                  data.biodata.hearing
                                              )
                                            : "N/A"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs to-gray-400">
                                        Jumlah Saudara
                                    </p>
                                    <p className="text-medium font-semibold">
                                        {data?.biodata?.count_of_siblings ||
                                            "N/A"}
                                    </p>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            <div>
                <div className="divider mb-1 mt-4"></div>
                <p className="text-large font-semibold tracking-tight mb-3">
                    Riwayat Kehamilan
                </p>

                {isLoading ? (
                    <>
                        <div className="grid gap-4 mb-3 sm:grid-cols-2 md:group-[.open]:grid-cols-2">
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
                    </>
                ) : (
                    <>
                        <div className="grid gap-2 gap-y-2 mb-3 sm:grid-cols-2 md:group-[.open]:grid-cols-2">
                            {Object.entries(data?.birthHistory || {}).map(
                                ([key, value]) => (
                                    <div key={key}>
                                        <p className="text-xs to-gray-400">
                                            {key
                                                .replace("_", " ")
                                                .replace(/\b\w/g, (l) =>
                                                    l.toUpperCase()
                                                )}
                                        </p>
                                        <p className="text-medium font-semibold">
                                            {value || "N/A"}
                                        </p>
                                    </div>
                                )
                            )}
                        </div>
                    </>
                )}
            </div>

            <div>
                <div className="divider mb-1 mt-4"></div>
                <p className="text-large font-semibold tracking-tight mb-3">
                    Hasil Ahli
                </p>
                {isLoading ? (
                    <>
                        <div className="grid gap-4 mb-3 sm:grid-cols-2 md:group-[.open]:grid-cols-2">
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
                    </>
                ) : (
                    <>
                        <div className="grid gap-2 gap-y-2 mb-3 sm:grid-cols-2 md:group-[.open]:grid-cols-2">
                            {Object.entries(data?.expertExamination || {}).map(
                                ([key, value]) => (
                                    <div key={key}>
                                        <p className="text-xs to-gray-400">
                                            {key
                                                .replace("_", " ")
                                                .replace(/\b\w/g, (l) =>
                                                    l.toUpperCase()
                                                )}
                                        </p>
                                        <p className="text-medium font-semibold">
                                            {value || "N/A"}
                                        </p>
                                    </div>
                                )
                            )}
                        </div>
                    </>
                )}
            </div>

            <div>
                <div className="divider mb-1 mt-4"></div>
                <p className="text-large font-semibold tracking-tight mb-3">
                    Kesehatan
                </p>
                {isLoading ? (
                    <>
                        <div className="grid gap-4 mb-3 sm:grid-cols-2 md:group-[.open]:grid-cols-2">
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
                    </>
                ) : (
                    <>
                        <div className="grid gap-2 gap-y-2 mb-3 sm:grid-cols-2 md:group-[.open]:grid-cols-2">
                            {Object.entries(data?.healthStatus || {}).map(
                                ([key, value]) => (
                                    <div key={key}>
                                        <p className="text-xs to-gray-400">
                                            {key
                                                .replace("_", " ")
                                                .replace(/\b\w/g, (l) =>
                                                    l.toUpperCase()
                                                )}
                                        </p>
                                        <p className="text-medium font-semibold">
                                            {value || "N/A"}
                                        </p>
                                    </div>
                                )
                            )}
                        </div>
                    </>
                )}
            </div>

            <div className="flex justify-end gap-2">
                <Button
                    variant={"outline"}
                    onClick={handleBackStage}
                    disabled={isLoading || isSubmit}
                >
                    <span className="material-symbols-outlined me-1 !leading-none !text-xl hover:no-underline">
                        arrow_back
                    </span>{" "}
                    Kembali
                </Button>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button
                            variant={"default"}
                            className="gap-1"
                            disabled={isLoading || isSubmit}
                        >
                            Selesai & Simpan{" "}
                            <span className="material-symbols-outlined me-1 !leading-none !text-xl hover:no-underline">
                                save
                            </span>
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="p-0">
                        <ScrollArea className="max-h-[80vh] p-3">
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Apakah kamu yakin?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    Ini akan menyimpan dan membuat data baru
                                    untuk{" "}
                                    <span className="font-semibold">
                                        {data?.biodata?.full_name || "N/A"}
                                    </span>{" "}
                                    <span>Berikut data yang akan dibuat:</span>
                                    <span className="block mt-1">
                                        &gt; Biodata anak
                                    </span>
                                    <span className="block mt-1">
                                        &gt; Riwayat kelahiran
                                    </span>
                                    <span className="block mt-1">
                                        &gt; Hasil uji ahli
                                    </span>
                                    <span className="block mt-1">
                                        &gt; Riwayat kesehatan
                                    </span>
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Kembali</AlertDialogCancel>
                                <AlertDialogAction asChild>
                                    {/* <Button>Apus</Button> */}

                                    <Button
                                        variant={"default"}
                                        onClick={handleSubmit}
                                        disabled={isLoading || isSubmit}
                                    >
                                        Submit
                                    </Button>
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </ScrollArea>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </>
    );
}
