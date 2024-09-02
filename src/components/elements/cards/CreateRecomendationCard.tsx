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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getRecommendationImageUrl } from "@/utils/converters";
import Image from "next/image";
import { AddRecomendationForm } from "../forms/AddRecomendationForm";
import { AssessmentAnswer } from "@/types/assessmentAnswer.copy";
import { FormikProps } from "formik";
import { useEffect, useState } from "react";

// type Recommendation = {
//     id?: number;
//     teacher_id?: number;
//     is_main: boolean;
//     assesment_number: number;
//     title: string;
//     description: string;
//     icon?: string;
//     frequency?: string;
//     risk_category?: "other" | "rendah" | "sedang" | "tinggi";
// };

type Recommendation = {
    id?: number;
    id_temp?: number;
    teacher_id?: string | number;
    is_main: boolean;
    is_change?: boolean;
    assesment_number: string | number;
    title: string;
    aspect?: string;
    description: string;
    icon?: string;
    frequency?: string;
    risk_category?: "other" | "rendah" | "sedang" | "tinggi";
};

interface CreateRecomendationCardProps {
    recommendation: Recommendation;
    onDelete: (id: string) => void;
    formik?: FormikProps<Recommendation>;
    assessmentFails?: AssessmentAnswer[];
}

export default function CreateRecomendationCard({
    recommendation,
    assessmentFails,
    onDelete,
    formik,
}: CreateRecomendationCardProps) {
    return (
        <div className="rounded-lg border border-gray-300 p-2 flex justify-between items-center gap-2 dark:border-neutral-600">
            <div className="flex gap-2 items-center">
                <div className="bg-gray-400 rounded-lg w-14 hidden sm:block sm:w-24 dark:bg-neutral-600">
                    <AspectRatio ratio={1 / 1}>
                        <Image
                            src={getRecommendationImageUrl({
                                image: recommendation?.icon,
                            })}
                            alt="Recomendation Image"
                            fill={true}
                            className="rounded-lg object-cover"
                            draggable={false}
                        />
                    </AspectRatio>
                </div>
                <div>
                    <p className="font-semibold tracking-tight text-medium">
                        {recommendation?.title || "N/A"}{" "}
                        {/* {recommendation?.is_main && (
                            <Badge
                                variant="outline"
                                className="!border-primary"
                            >
                                {recommendation?.is_main && "Utama"}
                            </Badge>
                        )} */}
                    </p>
                    <p className="text-gray-500 -mt-1 text-small dark:text-neutral-300">
                        {recommendation?.risk_category
                            ? "Untuk kategori: " + recommendation.risk_category
                            : "Untuk semua kategori"}
                    </p>
                </div>
            </div>
            <div className="items-center gap-2 hidden sm:flex group-[.open]:hidden md:group-[.open]:flex">
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant={"outline"}>
                            <span>Detil</span>
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="p-0">
                        <ScrollArea className="max-h-[80vh] p-3">
                            <AlertDialogHeader className="m-1">
                                <AlertDialogTitle>
                                    Detil Rekomendasi
                                </AlertDialogTitle>
                                <div className="divider my-1 dark:after:!bg-neutral-600 dark:before:!bg-neutral-600"></div>
                                <div>
                                    <div className="bg-gray-300 rounded-lg overflow-hidden">
                                        <AspectRatio ratio={1 / 1}>
                                            <Image
                                                src={getRecommendationImageUrl({
                                                    image: recommendation?.icon,
                                                })}
                                                alt="Recomendation Image"
                                                fill={true}
                                                className="rounded-lg object-cover"
                                                draggable={false}
                                            />
                                        </AspectRatio>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 mt-3">
                                        <div>
                                            <p className="text-small text-gray-400 -mb-1">
                                                Judul
                                            </p>
                                            <p>
                                                {recommendation?.title || "N/A"}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-small text-gray-400 -mb-1">
                                                Kategori
                                            </p>
                                            <p>
                                                {recommendation?.risk_category
                                                    ? "Untuk kategori: " +
                                                      recommendation.risk_category
                                                    : "Untuk semua kategori"}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-small text-gray-400 -mb-1">
                                                Aspek
                                            </p>
                                            <p>
                                                {recommendation?.aspect ||
                                                    "N/A"}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-small text-gray-400 -mb-1">
                                                Frekuensi
                                            </p>
                                            <p>
                                                {recommendation?.frequency ||
                                                    "N/A"}
                                            </p>
                                        </div>
                                        <div className="col-span-2">
                                            <p className="col-span-2 text-small text-gray-400 -mb-1">
                                                Deskripsi
                                            </p>
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html:
                                                        recommendation?.description ||
                                                        "N/A",
                                                }}
                                                className="text-small"
                                            />
                                            {/* <p>
                                                {recommendation?.description ||
                                                    "N/A"}
                                            </p> */}
                                        </div>
                                    </div>
                                </div>
                                <AlertDialogDescription />
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Tutup</AlertDialogCancel>
                                {!recommendation?.is_main && (
                                    <RecomendationFormDesktop
                                        recommendation={recommendation}
                                        assessmentFails={assessmentFails || []}
                                        formik={formik}
                                        isSubmit={formik.isSubmitting}
                                    />
                                )}
                            </AlertDialogFooter>
                        </ScrollArea>
                    </AlertDialogContent>
                </AlertDialog>
                <Button
                    variant={"outline"}
                    size={"icon"}
                    className="bg-red-500 text-white hover:bg-red-600 hover:text-white"
                    onClick={() =>
                        onDelete(
                            recommendation?.id &&
                                typeof recommendation?.id === "number"
                                ? recommendation?.id.toString()
                                : recommendation?.id ||
                                  typeof recommendation?.id_temp === "number"
                                ? recommendation?.id_temp.toString()
                                : recommendation?.id_temp
                        )
                    }
                >
                    <span className="material-symbols-outlined !text-xl !leading-none pointer-events-none">
                        close
                    </span>
                </Button>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger
                    asChild
                    className="inline-flex sm:hidden group-[.open]:inline-flex md:group-[.open]:hidden"
                >
                    <Button
                        variant="outline"
                        size={"icon"}
                        className="min-w-max"
                    >
                        <span className="material-symbols-outlined cursor-pointer !text-xl !leading-4 opacity-70">
                            more_horiz
                        </span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem className="cursor-pointer" asChild>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <button
                                        type="button"
                                        className="w-full text-sm py-1.5 rounded-md px-2 gap-1 flex justify-start items-center cursor-pointer mb-1 hover:bg-gray-100 dark:hover:bg-neutral-900"
                                    >
                                        <span className="material-symbols-outlined cursor-pointer me-1 !text-xl !leading-4 opacity-70">
                                            assignment
                                        </span>{" "}
                                        Lihat detil
                                    </button>
                                </AlertDialogTrigger>
                                <AlertDialogContent className="p-0">
                                    <ScrollArea className="max-h-[80vh] p-3">
                                        <AlertDialogHeader className="m-1">
                                            <AlertDialogTitle>
                                                Detil Rekomendasi
                                            </AlertDialogTitle>
                                            <div className="divider my-1 dark:after:!bg-neutral-600 dark:before:!bg-neutral-600"></div>
                                            <div>
                                                <div className="bg-gray-300 rounded-lg overflow-hidden">
                                                    <AspectRatio ratio={1 / 1}>
                                                        <Image
                                                            src={getRecommendationImageUrl(
                                                                {
                                                                    image: recommendation?.icon,
                                                                }
                                                            )}
                                                            alt="Recomendation Image"
                                                            fill={true}
                                                            className="rounded-lg object-cover"
                                                            draggable={false}
                                                        />
                                                    </AspectRatio>
                                                </div>
                                                <div className="grid grid-cols-2 gap-2 mt-3">
                                                    <div>
                                                        <p className="text-small text-gray-400 -mb-1">
                                                            Judul
                                                        </p>
                                                        <p>
                                                            {recommendation?.title ||
                                                                "N/A"}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-small text-gray-400 -mb-1">
                                                            Kategori
                                                        </p>
                                                        <p>
                                                            {recommendation?.risk_category
                                                                ? "Untuk kategori: " +
                                                                  recommendation.risk_category
                                                                : "Untuk semua kategori"}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-small text-gray-400 -mb-1">
                                                            Aspek
                                                        </p>
                                                        <p>
                                                            {recommendation?.aspect ||
                                                                "N/A"}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-small text-gray-400 -mb-1">
                                                            Frekuensi
                                                        </p>
                                                        <p>
                                                            {recommendation?.frequency ||
                                                                "N/A"}
                                                        </p>
                                                    </div>
                                                    <div className="col-span-2">
                                                        <p className="text-small text-gray-400 -mb-1">
                                                            Deskripsi
                                                        </p>
                                                        {/* <p>
                                                            {recommendation?.description ||
                                                                "N/A"}
                                                        </p> */}
                                                        <div
                                                            dangerouslySetInnerHTML={{
                                                                __html:
                                                                    recommendation?.description ||
                                                                    "N/A",
                                                            }}
                                                            className="text-small"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <AlertDialogDescription />
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>
                                                Batal
                                            </AlertDialogCancel>
                                        </AlertDialogFooter>
                                    </ScrollArea>
                                </AlertDialogContent>
                            </AlertDialog>
                        </DropdownMenuItem>
                        {!recommendation?.is_main && (
                            <DropdownMenuItem asChild>
                                <RecomendationForm
                                    recommendation={recommendation}
                                    assessmentFails={assessmentFails || []}
                                    formik={formik}
                                    isSubmit={formik.isSubmitting}
                                />
                            </DropdownMenuItem>
                        )}
                        <DropdownMenuItem asChild>
                            <button
                                type="button"
                                className="w-full text-sm py-1.5 rounded-md px-2 gap-1 flex justify-start items-center cursor-pointer bg-red-100 text-red-500 hover:!bg-red-200 hover:!text-red-600 dark:bg-red-600 dark:text-red-100 dark:hover:!bg-red-700 dark:hover:!text-red-200
"
                                onClick={() =>
                                    onDelete(
                                        recommendation?.id &&
                                            typeof recommendation?.id ===
                                                "number"
                                            ? recommendation?.id.toString()
                                            : recommendation?.id ||
                                              typeof recommendation?.id_temp ===
                                                  "number"
                                            ? recommendation?.id_temp.toString()
                                            : recommendation?.id_temp
                                    )
                                }
                            >
                                <span className="material-symbols-outlined cursor-pointer !text-xl !leading-4 opacity-70">
                                    close
                                </span>
                                <span>Hapus rekomendasi</span>
                            </button>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

const RecomendationForm = ({
    recommendation,
    assessmentFails,
    formik,
    isSubmit,
}: {
    recommendation?: Recommendation;
    assessmentFails: AssessmentAnswer[];
    formik: FormikProps<Recommendation>;
    isSubmit: boolean;
}) => {
    const [open, setOpen] = useState(false);
    // const [isAdd, setIsAdd] = useState(true);

    useEffect(() => {
        if (recommendation) {
            // setIsAdd(false);
            formik.setValues({
                ...recommendation,
                is_change: true,
            });
        }
    }, [recommendation]);

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <button
                    type="button"
                    className="w-full text-sm py-1.5 mb-1 rounded-md px-2 gap-1 flex justify-start items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-900"
                >
                    <span className="material-symbols-outlined cursor-pointer !text-xl !leading-4 opacity-70">
                        edit
                    </span>
                    <span>Ubah rekomendasi</span>
                </button>
            </DrawerTrigger>
            <DrawerContent className="p-0">
                <ScrollArea className="p-0 max-h-svh overflow-auto">
                    <DrawerHeader className="text-left">
                        <DrawerTitle>Ubah Rekomendasi</DrawerTitle>
                        <div>
                            <AddRecomendationForm
                                formik={formik}
                                assessmentFails={assessmentFails}
                            />
                        </div>
                        <DrawerDescription></DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter className="pt-2">
                        <DrawerClose asChild>
                            <Button
                                variant={"default"}
                                onClick={formik.submitForm}
                                disabled={isSubmit}
                            >
                                Simpan
                            </Button>
                        </DrawerClose>
                        <DrawerClose asChild>
                            <Button
                                variant="outline"
                                className="text-medium"
                                disabled={isSubmit}
                            >
                                Batal
                            </Button>
                        </DrawerClose>
                    </DrawerFooter>
                </ScrollArea>
            </DrawerContent>
        </Drawer>
    );
};

const RecomendationFormDesktop = ({
    recommendation,
    assessmentFails,
    formik,
    isSubmit,
}: {
    recommendation?: Recommendation;
    assessmentFails: AssessmentAnswer[];
    formik: FormikProps<Recommendation>;
    isSubmit: boolean;
}) => {
    useEffect(() => {
        if (recommendation) {
            // setIsAdd(false);
            formik.setValues({
                ...recommendation,
                is_change: true,
            });
        }
    }, [recommendation]);

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    variant={"warning"}
                    className="gap-1 w-full mt-2 sm:w-fit sm:mt-0 group-[.open]:mt-2 md:group-[.open]:mt-0 group-[.open]:w-full md:group-[.open]:w-fit"
                >
                    Ubah
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="p-0">
                <ScrollArea className="max-h-[80vh] p-3">
                    <AlertDialogHeader className="m-1">
                        <AlertDialogTitle>Ubah Rekomendasi</AlertDialogTitle>
                        <div className="divider my-1 dark:after:!bg-neutral-600 dark:before:!bg-neutral-600"></div>
                        <AddRecomendationForm
                            formik={formik}
                            assessmentFails={assessmentFails}
                        />
                        <AlertDialogDescription></AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction asChild>
                            <Button
                                variant={"default"}
                                onClick={formik.submitForm}
                                disabled={isSubmit}
                            >
                                Simpan
                            </Button>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </ScrollArea>
            </AlertDialogContent>
        </AlertDialog>
    );
};
