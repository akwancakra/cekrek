"use client";

import { MinimalTiptapEditor } from "@/components/minimal-tiptap";
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
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { Assessment } from "@/types/assessment.types";
import { Recommendation } from "@/types/recommendation.type";
import { truncateString } from "@/utils/converters";
import { fetcher } from "@/utils/fetcher";
import axios from "axios";
import { ErrorMessage, Field, Form, FormikProvider, useFormik } from "formik";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import useSWR from "swr";
import { useIsClient } from "usehooks-ts";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    title: Yup.string()
        .min(3, "Judul minimal 3 karakter")
        .max(45, "Judul maksimal 45 karakter")
        .required("Judul wajib diisi"),
    description: Yup.string()
        .min(3, "Deskripsi minimal 3 karakter")
        .required("Deskripsi wajib diisi"),
    icon: Yup.string(),
    is_main: Yup.boolean(),
    assesment_number: Yup.string().required("Nomor asessment wajib dipilih"),
    frequency: Yup.string().required("Frekuensi wajib diisi"),
    risk_category: Yup.string()
        .oneOf(["other", "rendah", "sedang", "tinggi"])
        .required("Kategori Risiko wajib diisi"),
});

export default function EditRecommendatioPage() {
    const [assessments, setAssessments] = useState([] as Assessment[]);
    const [recommendation, setRecommendation] = useState<Recommendation>();
    const [isSubmit, setIsSubmit] = useState(false);

    const { id } = useParams();
    const { push } = useRouter();

    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            icon: "",
            is_main: false,
            assesment_number: "0",
            frequency: "",
            risk_category: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            setIsSubmit(true);

            let finalData = {
                ...values,
                id: recommendation?.id,
            };

            const submitPromise = new Promise<void>(async (resolve, reject) => {
                try {
                    await axios.put("/api/recommendations/admin", finalData);

                    resolve();
                } catch (error) {
                    reject(error);
                }
            });

            toast.promise(submitPromise, {
                loading: "Mengirimkan data...",
                success: () => {
                    push("/a/recommendations");
                    return "Berhasil menyimpan data!";
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
        },
    });

    const {
        data: recommendationData,
        isLoading: recommendationIsLoading,
    }: {
        data: { status: string; recommendation: Recommendation };
        isLoading: boolean;
    } = useSWR(`/api/recommendations/${id}`, fetcher);

    const {
        data,
        isLoading,
    }: {
        data: { status: string; assesments: Assessment[] };
        isLoading: boolean;
    } = useSWR("/api/assesments", fetcher);

    useEffect(() => {
        if (!isLoading && data?.assesments) {
            setAssessments(data?.assesments || []);
            console.log(data?.assesments);
        }
    }, [data, isLoading]);

    useEffect(() => {
        if (recommendationData?.recommendation) {
            setRecommendation(recommendationData?.recommendation);

            const {
                title,
                description,
                icon,
                is_main,
                assesment_number,
                frequency,
                risk_category,
            } = recommendationData.recommendation;
            formik.setValues({
                title: title || "",
                description: description || "",
                icon: icon || "",
                is_main: is_main || false,
                assesment_number: assesment_number.toString() || "0",
                frequency: frequency || "",
                risk_category: risk_category || "other",
            });
        }
    }, [recommendationData]);

    return (
        <>
            <section className="mx-auto max-w-7xl mb-4">
                <div className="rounded-lg mb-3 p-4 w-full flex items-center bg-gradient-to-r from-purple-400 to-purple-600 h-28 sm:h-36">
                    <div>
                        <p className="text-white text-sm -mb-1">
                            Tambah Rekomendasi
                        </p>
                        <p className="font-semibold tracking-tight text-xl text-white">
                            CekRek
                        </p>
                    </div>
                </div>

                <div className="flex gap-2 justify-between items-center">
                    <Button asChild variant={"outline"} className="mb-3">
                        <Link href={"/a/recommendations"}>
                            <span className="material-symbols-outlined me-1 !leading-none !text-lg hover:no-underline">
                                arrow_back
                            </span>
                            Kembali
                        </Link>
                    </Button>
                </div>

                <div className="sm:flex group-[.open]:block md:group-[.open]:flex">
                    {isLoading || recommendationIsLoading ? (
                        <>
                            <div className="w-full sm:pe-3 sm:w-2/3 group-[.open]:pe-0 md:group-[.open]:pe-3 group-[.open]:w-full md:group-[.open]:w-2/3">
                                <div className="skeleton w-full h-[400px] rounded-lg"></div>
                            </div>
                            <div className="sticky top-4 rounded-lg p-2 bg-white w-full h-fit sm:w-1/3 mt-3 sm:mt-0 group-[.open]:mt-3 md:group-[.open]:mt-0 group-[.open]:w-full md:group-[.open]:w-1/3 dark:bg-neutral-800">
                                <div className="skeleton w-full h-36 rounded-lg"></div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="w-full sm:pe-3 sm:w-2/3 group-[.open]:pe-0 md:group-[.open]:pe-3 group-[.open]:w-full md:group-[.open]:w-2/3">
                                <div className="border border-gray-300 rounded-lg p-3 dark:border-neutral-600">
                                    <div>
                                        <p className="font-semibold text-large tracking-tight">
                                            Data Rekomendasi
                                        </p>
                                    </div>
                                    <div className="divider my-1"></div>
                                    <FormikProvider value={formik}>
                                        <Form>
                                            <div className="flex flex-col">
                                                {/* <div className="mb-2">
                                            <label className="form-control w-full">
                                                <div className="label ps-0">
                                                    <span className="label-text">
                                                        Jadikan rekomendasi
                                                        utama{" "}
                                                        {formik.errors
                                                            .title && (
                                                            <span className="text-red-500 text-xs italic">
                                                                *wajib dipilih
                                                            </span>
                                                        )}
                                                    </span>
                                                </div>
                                                <Switch
                                                    value={
                                                        formik.values.is_main ? "1" : "0"
                                                    }
                                                    defaultValue={
                                                        formik.values.is_main?  "1" : "0"
                                                    }
                                                    onChange={(e) =>
                                                        formik.setFieldValue(
                                                            "is_main",
                                                            e
                                                        )
                                                    }
                                                />
                                            </label>
                                            <ErrorMessage
                                                name="is_main"
                                                component="div"
                                                className="text-small text-red-500"
                                            />
                                        </div> */}
                                                <div>
                                                    <label className="form-control w-full">
                                                        <div className="label ps-0">
                                                            <span className="label-text">
                                                                Nomor Asessment
                                                                {formik.errors
                                                                    .assesment_number && (
                                                                    <span className="text-red-500 text-xs italic">
                                                                        *wajib
                                                                        dipilih
                                                                    </span>
                                                                )}
                                                            </span>
                                                        </div>
                                                        <AssessmentPicker
                                                            asessmentId={formik.values.assesment_number.toString()}
                                                            setAssessmentId={(
                                                                value
                                                            ) =>
                                                                formik.setFieldValue(
                                                                    "assesment_number",
                                                                    value
                                                                )
                                                            }
                                                            assessments={
                                                                assessments
                                                            }
                                                        />
                                                    </label>
                                                    <ErrorMessage
                                                        name="assesment_number"
                                                        component="div"
                                                        className="text-red-500 text-xs sm:text-sm"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="form-control w-full">
                                                        <div className="label ps-0">
                                                            <span className="label-text">
                                                                Judul{" "}
                                                                {formik.errors
                                                                    .title && (
                                                                    <span className="text-red-500 text-xs italic">
                                                                        *wajib
                                                                        diisi
                                                                    </span>
                                                                )}
                                                            </span>
                                                        </div>
                                                        <Field
                                                            {...formik.getFieldProps(
                                                                "title"
                                                            )}
                                                            placeholder="Berikan judul rekomendasi..."
                                                            className="input input-bordered px-3 py-2 text-sm h-fit min-h-fit w-full"
                                                        />
                                                    </label>
                                                    <ErrorMessage
                                                        name="title"
                                                        component="div"
                                                        className="text-small text-red-500"
                                                    />
                                                </div>
                                                <div>
                                                    <div className="label">
                                                        <span className="label-text">
                                                            Deskripsi{" "}
                                                            {formik.errors
                                                                .description && (
                                                                <span className="text-red-500 text-xs italic">
                                                                    *wajib diisi
                                                                </span>
                                                            )}
                                                        </span>
                                                    </div>
                                                    <MinimalTiptapEditor
                                                        value={
                                                            formik.values
                                                                .description
                                                        } // Memastikan nilai dari Formik
                                                        className={cn(
                                                            "w-full",
                                                            {
                                                                "border-red-500 focus-within:border-red-500":
                                                                    formik
                                                                        .errors
                                                                        .description,
                                                            }
                                                        )}
                                                        onValueChange={(
                                                            value
                                                        ) =>
                                                            formik.setFieldValue(
                                                                "description",
                                                                value
                                                            )
                                                        } // Menggunakan setFieldValue untuk mengubah nilai description
                                                        outputValue="html"
                                                    />
                                                    <ErrorMessage
                                                        name="description"
                                                        component="div"
                                                        className="text-small text-red-500"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="form-control w-full">
                                                        <div className="label ps-0">
                                                            <span className="label-text">
                                                                Frekuensi{" "}
                                                                {formik.errors
                                                                    .frequency && (
                                                                    <span className="text-red-500 text-xs italic">
                                                                        *wajib
                                                                        diisi
                                                                    </span>
                                                                )}
                                                            </span>
                                                        </div>
                                                        <Field
                                                            {...formik.getFieldProps(
                                                                "frequency"
                                                            )}
                                                            placeholder="2 kali sehari..."
                                                            className="input input-bordered px-3 py-2 text-sm h-fit min-h-fit w-full"
                                                        />
                                                    </label>
                                                    <ErrorMessage
                                                        name="frequency"
                                                        component="div"
                                                        className="text-small text-red-500"
                                                    />
                                                </div>
                                                <div>
                                                    <div className="label ps-0">
                                                        <span className="label-text">
                                                            Kategori Risiko{" "}
                                                            {formik.errors
                                                                .risk_category && (
                                                                <span className="text-red-500 text-xs italic">
                                                                    *wajib
                                                                    dipilih
                                                                </span>
                                                            )}
                                                        </span>
                                                    </div>
                                                    <Select
                                                        value={
                                                            formik.values
                                                                .risk_category
                                                        }
                                                        defaultValue={
                                                            formik.values
                                                                .risk_category
                                                        }
                                                        onValueChange={(
                                                            value
                                                        ) =>
                                                            formik.setFieldValue(
                                                                "risk_category",
                                                                value
                                                            )
                                                        }
                                                    >
                                                        <SelectTrigger
                                                            name="risk_category"
                                                            className="w-full"
                                                            onBlur={
                                                                formik.handleBlur
                                                            }
                                                        >
                                                            <SelectValue placeholder="Pilih Kategori Risiko" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="other">
                                                                Semua
                                                            </SelectItem>
                                                            <SelectItem value="rendah">
                                                                Rendah
                                                            </SelectItem>
                                                            <SelectItem value="sedang">
                                                                Sedang
                                                            </SelectItem>
                                                            <SelectItem value="tinggi">
                                                                Tinggi
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>{" "}
                                                    <ErrorMessage
                                                        name="risk_category"
                                                        component="div"
                                                        className="text-small text-red-500"
                                                    />
                                                </div>
                                            </div>
                                        </Form>
                                    </FormikProvider>
                                    <div className="divider my-1"></div>
                                    <div className="flex justify-end gap-2">
                                        <Button
                                            variant={"outline"}
                                            onClick={() => formik.resetForm()}
                                            className="gap-1"
                                            disabled={
                                                isLoading ||
                                                recommendationIsLoading ||
                                                isSubmit
                                            }
                                        >
                                            <span className="material-symbols-outlined me-1 !leading-none !text-lg hover:no-underline">
                                                close
                                            </span>{" "}
                                            <span>Reset</span>
                                        </Button>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button
                                                    variant={"default"}
                                                    className="gap-1"
                                                    disabled={
                                                        isLoading ||
                                                        recommendationIsLoading ||
                                                        isSubmit
                                                    }
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
                                                            Ini akan menyimpan
                                                            dan membuat data
                                                            rekomendasi baru
                                                            untuk{" "}
                                                            <span className="font-semibold">
                                                                {truncateString(
                                                                    formik
                                                                        .values
                                                                        .title
                                                                ) || "N/A"}
                                                            </span>
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>
                                                            Kembali
                                                        </AlertDialogCancel>
                                                        <AlertDialogAction
                                                            asChild
                                                        >
                                                            <Button
                                                                variant={
                                                                    "default"
                                                                }
                                                                onClick={
                                                                    formik.submitForm
                                                                }
                                                                className="gap-1"
                                                                disabled={
                                                                    isLoading ||
                                                                    recommendationIsLoading ||
                                                                    isSubmit
                                                                }
                                                            >
                                                                <span>
                                                                    Simpan
                                                                </span>{" "}
                                                                <span className="material-symbols-outlined me-1 !leading-none !text-lg hover:no-underline">
                                                                    save
                                                                </span>
                                                            </Button>
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </ScrollArea>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </div>
                                </div>
                            </div>

                            <div className="sticky top-4 rounded-lg p-2 bg-white border border-gray-300 w-full h-fit sm:w-1/3 mt-3 sm:mt-0 group-[.open]:mt-3 md:group-[.open]:mt-0 group-[.open]:w-full md:group-[.open]:w-1/3 dark:bg-neutral-800 dark:border-neutral-600">
                                <div className="grid gap-2 gap-y-2 mb-3 sm:grid-cols-2 md:group-[.open]:grid-cols-2">
                                    <div>
                                        <p className="text-xs text-gray-400">
                                            Judul
                                        </p>
                                        <p className="text-medium font-semibold">
                                            {formik.values.title || "N/A"}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400">
                                            Kategori
                                        </p>
                                        <p className="text-medium font-semibold">
                                            {formik.values.risk_category ||
                                                "N/A"}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400">
                                            Frekuensi
                                        </p>
                                        <p className="text-medium font-semibold">
                                            {formik.values.frequency || "N/A"}
                                        </p>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="text-xs text-gray-400">
                                            Deskripsi
                                        </p>
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html:
                                                    formik.values.description ??
                                                    "",
                                            }}
                                            className="text-small"
                                        />
                                        {/* <p className="text-medium font-semibold">
                                            {formik.values. || "N/A"}
                                        </p> */}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </section>
        </>
    );
}

interface AssessmentPickerProps {
    asessmentId: string;
    setAssessmentId: (value: string) => void;
    assessments: Assessment[];
}

const AssessmentPicker = ({
    asessmentId,
    setAssessmentId,
    assessments,
}: AssessmentPickerProps) => {
    const [open, setOpen] = useState(false);
    const isClient = useIsClient();

    const assessmentsOption = [
        // {
        //     label: "Tidak ada",
        //     value: "-1",
        // },
        ...assessments.map((assessment) => ({
            label:
                assessment.assesment_number +
                " - " +
                truncateString(assessment.question, 25),
            value: assessment.id.toString(),
        })),
    ];

    if (!isClient) {
        return null;
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between text-sm"
                >
                    <span>
                        {asessmentId != "0" && asessmentId
                            ? assessmentsOption.find(
                                  (assessment) =>
                                      assessment.value == asessmentId
                              )?.label
                            : `Pilih Nomor Asesment...`}
                    </span>
                    {/* {asessmentId
                        ? assessmentsOption.find(
                              (assessment) => assessment.value === asessmentId
                          )?.label
                        : `Pilih Nomor Asesment...`} */}
                    <span className="material-symbols-outlined cursor-pointer !text-xl !leading-none opacity-70">
                        unfold_more
                    </span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className=" p-0" align="start">
                <Command className=" w-full">
                    <CommandInput placeholder={`Cari Asesmen...`} />
                    <CommandList className="overflow-y-auto max-h-40 md:max-h-80">
                        <CommandEmpty>
                            <p>Tidak ada asesmen</p>
                        </CommandEmpty>
                        <CommandGroup>
                            {assessmentsOption.map((assessment, index) => (
                                <CommandItem
                                    key={index}
                                    value={assessment.value}
                                    onSelect={(currentValue) => {
                                        setAssessmentId(
                                            currentValue === asessmentId
                                                ? ""
                                                : currentValue
                                        );
                                        setOpen(false);
                                    }}
                                >
                                    <span
                                        className={cn(
                                            "material-symbols-outlined cursor-pointer !text-lg !leading-none mr-2 h-4 w-4",
                                            {
                                                "opacity-100":
                                                    assessment.value ===
                                                    asessmentId,
                                                "opacity-0":
                                                    assessment.value !==
                                                    asessmentId,
                                            }
                                        )}
                                    >
                                        check
                                    </span>
                                    {assessment.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};
