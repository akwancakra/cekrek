"use client";

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
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { capitalizeFirstLetter, formattedDate } from "@/utils/formattedDate";
import { ErrorMessage, Field, Form, FormikProvider, useFormik } from "formik";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { useLocalStorage } from "usehooks-ts";
import * as Yup from "yup";

const initialValues = {
    name: "",
    email: "",
    password: "",
    type: "ibu",
    role: "parent",
    place_birth: "",
    date_birth: new Date(),
    religion: "",
    education: "",
    job: "",
    address: "",
    phone: "",
};

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Nama harus diisi"),
    email: Yup.string()
        .email("Format email tidak valid")
        .required("Email harus diisi"),
    type: Yup.string()
        .oneOf(["ayah", "ibu", "wali"])
        .required("Jenis harus dipilih"),
    place_birth: Yup.string().required("Tempat lahir harus diisi"),
    date_birth: Yup.date().required("Tanggal lahir harus diisi").nullable(),
    religion: Yup.string().required("Agama harus diisi"),
    education: Yup.string().required("Pendidikan harus diisi"),
    job: Yup.string().required("Pekerjaan harus diisi"),
    address: Yup.string().required("Alamat harus diisi"),
    phone: Yup.string()
        .matches(/^\d+$/, "Nomor telepon hanya boleh berisi angka")
        .required("Nomor telepon harus diisi"),
});

type UserAdd = {
    email: string;
    password?: string;
    role: string;
    name: string;
    type?: string;
    place_birth?: string;
    date_time_birth?: Date;
    religion?: string;
    education?: string;
    job?: string;
    address?: string;
    phone?: string;
};

export default function AddParentPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    const [value, setValue, removeValue] = useLocalStorage(
        "parent-data",
        {} as UserAdd
    );
    const searchParams = useSearchParams();
    const callback = searchParams.get("callback");
    const router = useRouter();

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            setIsSubmit(true);

            console.log(values);

            // setValue({
            //     ...values,
            // });

            // const submitPromise = new Promise<void>(async (resolve, reject) => {
            //     try {
            //         const response = await fetch("/api/parents", {
            //             method: "POST",
            //             headers: {
            //                 "Content-Type": "application/json",
            //             },
            //             body: JSON.stringify(values),
            //         });

            //         if (!response.ok) {
            //             throw new Error("Failed to add parent");
            //         }

            //         resolve();
            //     } catch (error) {
            //         reject(error);
            //     } finally {
            //         setIsSubmit(false);
            //     }
            // });

            // toast.promise(submitPromise, {
            //     loading: "Mengirimkan data...",
            //     success: () => {
            //         if (callback) {
            //             router.push(callback);
            //         } else {
            //             router.push("/t");
            //         }
            //         return "Data orang tua telah ditambahkan!";
            //     },
            //     error: "Something went wrong",
            // });
        },
    });

    return (
        <>
            <section className="mx-auto max-w-7xl">
                <div className="flex gap-2 justify-between items-center">
                    <Button asChild variant={"outline"} className="mb-3">
                        <Link href={"/p/settings/profile"}>
                            <span className="material-symbols-outlined me-1 !leading-none !text-lg hover:no-underline">
                                arrow_back
                            </span>
                            Kembali
                        </Link>
                    </Button>
                </div>
                <p className="font-semibold tracking-tighter text-xl sm:text-2xl">
                    Ubah Akun
                </p>
                <div className="divider my-1"></div>
                <div className="sm:flex group-[.open]:block md:group-[.open]:flex">
                    <div className=" w-full sm:pe-3 sm:w-2/3 group-[.open]:pe-0 md:group-[.open]:pe-3 group-[.open]:w-full md:group-[.open]:w-2/3">
                        {isLoading ? (
                            <>
                                <div className="grid gap-4 mb-3 grid-cols-1 sm:grid-cols-2 group-[.open]:grid-cols-1 md:group-[.open]:grid-cols-2">
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
                                <div className="flex justify-end">
                                    <div className="flex gap-2">
                                        <div className="skeleton rounded-lg w-24 h-9"></div>
                                        <div className="skeleton rounded-lg w-24 h-9"></div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <FormikProvider value={formik}>
                                <Form>
                                    <div className="grid gap-2 mb-3 grid-cols-1 sm:grid-cols-2 group-[.open]:grid-cols-1 md:group-[.open]:grid-cols-2">
                                        <div>
                                            <label className="form-control w-full">
                                                <div className="label ps-0">
                                                    <span className="label-text">
                                                        Nama{" "}
                                                        {formik.errors.name && (
                                                            <span className="text-red-500 text-xs italic">
                                                                *wajib diisi
                                                            </span>
                                                        )}
                                                    </span>
                                                </div>
                                                <Field
                                                    type="text"
                                                    placeholder="Anita Dwi..."
                                                    className="input input-bordered rounded-lg px-3 py-2 text-sm h-fit min-h-fit w-full"
                                                    {...formik.getFieldProps(
                                                        "name"
                                                    )}
                                                />
                                            </label>
                                            <ErrorMessage
                                                name="name"
                                                component="div"
                                                className="text-red-500 text-xs sm:text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="form-control w-full">
                                                <div className="label ps-0">
                                                    <span className="label-text">
                                                        Email{" "}
                                                        {formik.errors
                                                            .email && (
                                                            <span className="text-red-500 text-xs italic">
                                                                *wajib diisi
                                                            </span>
                                                        )}
                                                    </span>
                                                </div>
                                                <Field
                                                    type="text"
                                                    placeholder="example@mail.com"
                                                    className="input input-bordered rounded-lg px-3 py-2 text-sm h-fit min-h-fit w-full"
                                                    {...formik.getFieldProps(
                                                        "email"
                                                    )}
                                                />
                                            </label>
                                            <ErrorMessage
                                                name="email"
                                                component="div"
                                                className="text-red-500 text-xs sm:text-sm"
                                            />
                                        </div>
                                        <div>
                                            <div className="label ps-0">
                                                <span className="label-text">
                                                    Tipe orang tua{" "}
                                                    {formik.errors.type && (
                                                        <span className="text-red-500 text-xs italic">
                                                            *wajib diisi
                                                        </span>
                                                    )}
                                                </span>
                                            </div>
                                            <Select
                                                value={formik.values.type}
                                                onValueChange={(value) =>
                                                    formik.setFieldValue(
                                                        "type",
                                                        value
                                                    )
                                                }
                                            >
                                                <SelectTrigger
                                                    name="type"
                                                    className="w-full"
                                                    onBlur={formik.handleBlur}
                                                >
                                                    <SelectValue placeholder="Pilih Tipe" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="ayah">
                                                        Ayah
                                                    </SelectItem>
                                                    <SelectItem value="ibu">
                                                        Ibu
                                                    </SelectItem>
                                                    <SelectItem value="wali">
                                                        Wali
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <ErrorMessage
                                                name="type"
                                                component="div"
                                                className="text-red-500 text-xs sm:text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="form-control w-full">
                                                <div className="label ps-0">
                                                    <span className="label-text">
                                                        Tempat Lahir{" "}
                                                        {formik.errors
                                                            .place_birth && (
                                                            <span className="text-red-500 text-xs italic">
                                                                *wajib diisi
                                                            </span>
                                                        )}
                                                    </span>
                                                </div>
                                                <Field
                                                    type="text"
                                                    placeholder="Jakarta"
                                                    className="input input-bordered rounded-lg px-3 py-2 text-sm h-fit min-h-fit w-full"
                                                    {...formik.getFieldProps(
                                                        "place_birth"
                                                    )}
                                                />
                                            </label>
                                            <ErrorMessage
                                                name="place_birth"
                                                component="div"
                                                className="text-red-500 text-xs sm:text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="form-control w-full">
                                                <div className="label ps-0">
                                                    <span className="label-text">
                                                        Tanggal Lahir{" "}
                                                        {formik.errors
                                                            .date_birth && (
                                                            <span className="text-red-500 text-xs italic">
                                                                *wajib diisi
                                                            </span>
                                                        )}
                                                    </span>
                                                </div>
                                                <Field
                                                    type="date"
                                                    className="input input-bordered rounded-lg px-3 py-2 text-sm h-fit min-h-fit w-full"
                                                    {...formik.getFieldProps(
                                                        "date_birth"
                                                    )}
                                                />
                                            </label>
                                            <ErrorMessage
                                                name="date_birth"
                                                component="div"
                                                className="text-red-500 text-xs sm:text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="form-control w-full">
                                                <div className="label ps-0">
                                                    <span className="label-text">
                                                        Agama{" "}
                                                        {formik.errors
                                                            .religion && (
                                                            <span className="text-red-500 text-xs italic">
                                                                *wajib diisi
                                                            </span>
                                                        )}
                                                    </span>
                                                </div>
                                                <Select
                                                    defaultValue={
                                                        formik.values.religion
                                                    }
                                                    onValueChange={(value) =>
                                                        formik.setFieldValue(
                                                            "religion",
                                                            value
                                                        )
                                                    }
                                                >
                                                    <SelectTrigger
                                                        name="religion"
                                                        className="w-full"
                                                        onBlur={
                                                            formik.handleBlur
                                                        }
                                                    >
                                                        <SelectValue placeholder="Pilih Agama" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="islam">
                                                            Islam
                                                        </SelectItem>
                                                        <SelectItem value="kristen">
                                                            Kristen
                                                        </SelectItem>
                                                        <SelectItem value="katolik">
                                                            Katolik
                                                        </SelectItem>
                                                        <SelectItem value="hindu">
                                                            Hindu
                                                        </SelectItem>
                                                        <SelectItem value="buddha">
                                                            Buddha
                                                        </SelectItem>
                                                        <SelectItem value="konghucu">
                                                            Konghucu
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </label>
                                            <ErrorMessage
                                                name="religion"
                                                component="div"
                                                className="text-red-500 text-xs sm:text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="form-control w-full">
                                                <div className="label ps-0">
                                                    <span className="label-text">
                                                        Pendidikan{" "}
                                                        {formik.errors
                                                            .education && (
                                                            <span className="text-red-500 text-xs italic">
                                                                *wajib diisi
                                                            </span>
                                                        )}
                                                    </span>
                                                </div>
                                                <Select
                                                    defaultValue={
                                                        formik.values.education
                                                    }
                                                    onValueChange={(value) =>
                                                        formik.setFieldValue(
                                                            "education",
                                                            value
                                                        )
                                                    }
                                                >
                                                    <SelectTrigger
                                                        name="education"
                                                        className="w-full"
                                                        onBlur={
                                                            formik.handleBlur
                                                        }
                                                    >
                                                        <SelectValue placeholder="Pilih Pendidikan Terakhir" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Tidak Sekolah">
                                                            Tidak Sekolah
                                                        </SelectItem>
                                                        <SelectItem value="SD">
                                                            SD
                                                        </SelectItem>
                                                        <SelectItem value="SMP">
                                                            SMP
                                                        </SelectItem>
                                                        <SelectItem value="SMA">
                                                            SMA
                                                        </SelectItem>
                                                        <SelectItem value="Diploma">
                                                            Diploma
                                                        </SelectItem>
                                                        <SelectItem value="Sarjana (S1)">
                                                            Sarjana (S1)
                                                        </SelectItem>
                                                        <SelectItem value="Pasca Sarjana (S2)">
                                                            Pasca Sarjana (S2)
                                                        </SelectItem>
                                                        <SelectItem value="Doktoral (S3)">
                                                            Doktoral (S3)
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </label>
                                            <ErrorMessage
                                                name="education"
                                                component="div"
                                                className="text-red-500 text-xs sm:text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="form-control w-full">
                                                <div className="label ps-0">
                                                    <span className="label-text">
                                                        Pekerjaan{" "}
                                                        {formik.errors.job && (
                                                            <span className="text-red-500 text-xs italic">
                                                                *wajib diisi
                                                            </span>
                                                        )}
                                                    </span>
                                                </div>
                                                <Field
                                                    type="text"
                                                    placeholder="Buruh"
                                                    className="input input-bordered rounded-lg px-3 py-2 text-sm h-fit min-h-fit w-full"
                                                    {...formik.getFieldProps(
                                                        "job"
                                                    )}
                                                />
                                            </label>
                                            <ErrorMessage
                                                name="job"
                                                component="div"
                                                className="text-red-500 text-xs sm:text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="form-control w-full">
                                                <div className="label ps-0">
                                                    <span className="label-text">
                                                        Alamat{" "}
                                                        {formik.errors
                                                            .address && (
                                                            <span className="text-red-500 text-xs italic">
                                                                *wajib diisi
                                                            </span>
                                                        )}
                                                    </span>
                                                </div>
                                                <Field
                                                    type="text"
                                                    placeholder="Jl. Buruh no.12"
                                                    className="input input-bordered rounded-lg px-3 py-2 text-sm h-fit min-h-fit w-full"
                                                    {...formik.getFieldProps(
                                                        "address"
                                                    )}
                                                />
                                            </label>
                                            <ErrorMessage
                                                name="address"
                                                component="div"
                                                className="text-red-500 text-xs sm:text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="form-control w-full">
                                                <div className="label ps-0">
                                                    <span className="label-text">
                                                        Nomor Telepon{" "}
                                                        {formik.errors
                                                            .phone && (
                                                            <span className="text-red-500 text-xs italic">
                                                                *wajib diisi
                                                            </span>
                                                        )}
                                                    </span>
                                                </div>
                                                <Field
                                                    type="text"
                                                    placeholder="08123456789"
                                                    className="input input-bordered rounded-lg px-3 py-2 text-sm h-fit min-h-fit w-full"
                                                    {...formik.getFieldProps(
                                                        "phone"
                                                    )}
                                                />
                                            </label>
                                            <ErrorMessage
                                                name="phone"
                                                component="div"
                                                className="text-red-500 text-xs sm:text-sm"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-span-2 flex justify-end gap-2">
                                        <Button
                                            variant={"outline"}
                                            onClick={() => formik.resetForm()}
                                            disabled={isLoading || isSubmit}
                                            type="button"
                                        >
                                            {" "}
                                            <span className="material-symbols-outlined me-1 !leading-none !text-xl hover:no-underline">
                                                close
                                            </span>{" "}
                                            Reset
                                        </Button>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button
                                                    variant={"default"}
                                                    className="gap-1"
                                                    disabled={
                                                        isLoading || isSubmit
                                                    }
                                                    type="button"
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
                                                            baru untuk{" "}
                                                            <span className="font-semibold">
                                                                {formik?.values
                                                                    ?.name ||
                                                                    "N/A"}
                                                            </span>{" "}
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter className="mt-3">
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
                                                                disabled={
                                                                    isLoading ||
                                                                    isSubmit
                                                                }
                                                                type="submit"
                                                            >
                                                                Submit
                                                            </Button>
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </ScrollArea>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </div>
                                </Form>
                            </FormikProvider>
                        )}
                    </div>
                    <div className="sticky top-4 rounded-lg p-2 bg-white border border-gray-300 w-full h-fit sm:w-1/3 mt-3 sm:mt-0 group-[.open]:mt-3 md:group-[.open]:mt-0 group-[.open]:w-full md:group-[.open]:w-1/3">
                        {isLoading ? (
                            <>
                                <div className="grid gap-4 mb-3 grid-cols-1 sm:grid-cols-2 group-[.open]:grid-cols-1 md:group-[.open]:grid-cols-2">
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
                            <div className="grid gap-2 gap-y-2 mb-3 sm:grid-cols-2 md:group-[.open]:grid-cols-2">
                                <div>
                                    <p className="text-xs text-gray-400">
                                        Email
                                    </p>
                                    <p className="text-medium font-semibold">
                                        {formik.values.email || "N/A"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400">
                                        Nama
                                    </p>
                                    <p className="text-medium font-semibold">
                                        {formik.values.name || "N/A"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400">
                                        Tipe Orang Tua
                                    </p>
                                    <p className="text-medium font-semibold">
                                        {formik.values.type
                                            ? capitalizeFirstLetter(
                                                  formik.values.type
                                              )
                                            : "N/A"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400">
                                        Agama
                                    </p>
                                    <p className="text-medium font-semibold">
                                        {formik.values.religion || "N/A"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400">
                                        Tempat Lahir
                                    </p>
                                    <p className="text-medium font-semibold">
                                        {formik.values.place_birth || "N/A"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400">
                                        Tanggal Lahir
                                    </p>
                                    <p className="text-medium font-semibold">
                                        {formik.values.date_birth
                                            ? formattedDate(
                                                  formik.values.date_birth.toString()
                                              )
                                            : "N/A"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400">
                                        Pendidikan
                                    </p>
                                    <p className="text-medium font-semibold">
                                        {formik.values.education || "N/A"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400">
                                        Pekerjaan
                                    </p>
                                    <p className="text-medium font-semibold">
                                        {formik.values.job || "N/A"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400">
                                        Alamat
                                    </p>
                                    <p className="text-medium font-semibold">
                                        {formik.values.address || "N/A"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400">
                                        Nomor Telepon
                                    </p>
                                    <p className="text-medium font-semibold">
                                        {formik.values.phone || "N/A"}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}
