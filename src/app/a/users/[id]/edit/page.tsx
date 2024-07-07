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
import { User } from "@/types/user.types";
import { fetcher } from "@/utils/fetcher";
import { capitalizeFirstLetter, formattedDate } from "@/utils/formattedDate";
import axios from "axios";
import { ErrorMessage, Field, Form, FormikProvider, useFormik } from "formik";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import useSWR from "swr";
import * as Yup from "yup";

const initialValues = {
    name: "",
    email: "",
    // password: "",
    type: "",
    role: "",
    place_birth: "",
    date_birth: new Date(),
    religion: "",
    education: "",
    job: "",
    address: "",
    phone: "",
};

// const validationSchema = Yup.object().shape({
//     name: Yup.string().required("Nama harus diisi"),
//     email: Yup.string()
//         .email("Format email tidak valid")
//         .required("Email harus diisi"),
//     role: Yup.string()
//         .oneOf(["admin", "parent", "teacher"])
//         .required("Role harus dipilih"),
//     type: Yup.string().when("role", {
//         is: "parent",
//         then: (schema: any) =>
//             schema
//                 .required("Tipe harus dipilih (ayah, ibu, wali)")
//                 .oneOf(
//                     ["ayah", "ibu", "wali"],
//                     "Tipe harus salah satu dari ayah, ibu, atau wali"
//                 ),
//         otherwise: (schema: any) => schema.notRequired(),
//     }),
//     place_birth: Yup.string().when("role", {
//         is: (role: string) => role !== "admin",
//         then: (schema: any) => schema.required("Tempat lahir harus diisi"),
//         otherwise: (schema: any) => schema.notRequired(),
//     }),
//     date_birth: Yup.date().when("role", {
//         is: (role: string) => role !== "admin",
//         then: (schema: any) =>
//             schema.required("Tanggal lahir harus diisi").nullable(),
//         otherwise: (schema: any) => schema.notRequired(),
//     }),
//     religion: Yup.string().when("role", {
//         is: (role: string) => role !== "admin",
//         then: (schema: any) => schema.required("Agama harus diisi"),
//         otherwise: (schema: any) => schema.notRequired(),
//     }),
//     education: Yup.string().when("role", {
//         is: (role: string) => role !== "admin",
//         then: (schema: any) => schema.required("Pendidikan harus diisi"),
//         otherwise: (schema: any) => schema.notRequired(),
//     }),
//     job: Yup.string().when("role", {
//         is: (role: string) => role !== "admin",
//         then: (schema: any) => schema.required("Pekerjaan harus diisi"),
//         otherwise: (schema: any) => schema.notRequired(),
//     }),
//     address: Yup.string().when("role", {
//         is: (role: string) => role !== "admin",
//         then: (schema: any) => schema.required("Alamat harus diisi"),
//         otherwise: (schema: any) => schema.notRequired(),
//     }),
//     phone: Yup.string().when("role", {
//         is: (role: string) => role !== "admin",
//         then: (schema: any) =>
//             schema
//                 .matches(/^\d+$/, "Nomor telepon hanya boleh berisi angka")
//                 .required("Nomor telepon harus diisi"),
//         otherwise: (schema: any) => schema.notRequired(),
//     }),
// });

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Nama harus diisi"),
    email: Yup.string()
        .email("Format email tidak valid")
        .required("Email harus diisi"),
    role: Yup.string()
        .oneOf(["admin", "parent", "teacher"])
        .required("Role harus dipilih"),
    type: Yup.string().oneOf(
        ["ayah", "ibu", "wali"],
        "Tipe harus salah satu dari ayah, ibu, atau wali"
    ),
    place_birth: Yup.string(),
    date_birth: Yup.date(),
    religion: Yup.string(),
    education: Yup.string(),
    job: Yup.string(),
    address: Yup.string(),
    phone: Yup.string(),
});

export default function AddParentPage() {
    const [user, setUser] = useState<User>();
    const [isSubmit, setIsSubmit] = useState(false);

    const { id } = useParams();
    const router = useRouter();

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            const roleToApiUrl = {
                parent: `/api/parents/${id}`,
                teacher: `/api/teachers/${id}`,
                admin: `/api/admin/users/${id}`,
            };

            setIsSubmit(true);

            const apiUrl = roleToApiUrl[values.role] || "/api/users";

            const submitPromise = new Promise<void>(async (resolve, reject) => {
                try {
                    await axios.put(apiUrl, values);

                    resolve();
                } catch (error) {
                    reject(error);
                }
            });

            toast.promise(submitPromise, {
                loading: "Mengirimkan data...",
                success: () => {
                    router.push("/a/users");
                    return `Akun ${values.name} berhasil diubah`;
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
        data,
        isLoading,
    }: { data: { status: string; user: User }; isLoading: boolean } = useSWR(
        `/api/users/${id}`,
        fetcher
    );

    useEffect(() => {
        if (!isLoading) {
            if (data?.user) {
                setUser(data.user);

                formik.setValues({
                    name: data.user.name,
                    email: data.user.email,
                    role: data.user.role,
                    type: data.user.type || "",
                    place_birth: data.user.place_birth || "",
                    date_birth: data.user.date_time_birth
                        ? new Date(data.user.date_time_birth)
                        : null,
                    religion: data.user.religion || "",
                    education: data.user.education || "",
                    job: data.user.job || "",
                    address: data.user.address || "",
                    phone: data.user.phone || "",
                });
            } else {
                router.back();
            }
        }
    }, [data, isLoading]);

    return (
        <>
            <section className="mx-auto max-w-7xl">
                <div className="rounded-lg mb-3 p-4 w-full flex items-center bg-gradient-to-r from-purple-400 to-purple-600 h-28 sm:h-36">
                    <div>
                        <p className="text-white text-sm -mb-1">Tambah Akun</p>
                        <p className="font-semibold tracking-tight text-xl text-white">
                            CekRek
                        </p>
                    </div>
                </div>

                <div className="flex gap-2 justify-between items-center">
                    <Button asChild variant={"outline"} className="mb-3">
                        <Link href={"/a/users"}>
                            <span className="material-symbols-outlined me-1 !leading-none !text-lg hover:no-underline">
                                arrow_back
                            </span>
                            Kembali
                        </Link>
                    </Button>
                </div>

                <div className="sm:flex gap-3 group-[.open]:block md:group-[.open]:flex">
                    <div className=" w-full border border-gray-300 rounded-lg p-3 sm:pe-3 sm:w-2/3 group-[.open]:pe-0 md:group-[.open]:pe-3 group-[.open]:w-full md:group-[.open]:w-2/3">
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
                                    <div>
                                        <p className="font-semibold text-large tracking-tight">
                                            Data Akun
                                        </p>
                                    </div>
                                    <div className="divider my-1 dark:after:!bg-neutral-600 dark:before:!bg-neutral-600"></div>
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
                                            <label className="form-control w-full">
                                                <div className="label ps-0">
                                                    <span className="label-text">
                                                        Peran{" "}
                                                        {formik.errors.role && (
                                                            <span className="text-red-500 text-xs italic">
                                                                *wajib diisi
                                                            </span>
                                                        )}
                                                    </span>
                                                </div>
                                                <Select
                                                    defaultValue={
                                                        formik.values.role
                                                    }
                                                    onValueChange={(value) =>
                                                        formik.setFieldValue(
                                                            "role",
                                                            value
                                                        )
                                                    }
                                                >
                                                    <SelectTrigger
                                                        name="role"
                                                        className="w-full"
                                                        onBlur={
                                                            formik.handleBlur
                                                        }
                                                    >
                                                        <SelectValue placeholder="Pilih Peran" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="parent">
                                                            Orang Tua
                                                        </SelectItem>
                                                        <SelectItem value="teacher">
                                                            Guru
                                                        </SelectItem>
                                                        <SelectItem value="admin">
                                                            Admin
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </label>
                                            <ErrorMessage
                                                name="role"
                                                component="div"
                                                className="text-red-500 text-xs sm:text-sm"
                                            />
                                        </div>
                                        {formik.values.role === "parent" && (
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
                                                    defaultValue={
                                                        formik.values.type
                                                    }
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
                                                        onBlur={
                                                            formik.handleBlur
                                                        }
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
                                        )}
                                        {formik.values.role !== "admin" && (
                                            <>
                                                <div>
                                                    <label className="form-control w-full">
                                                        <div className="label ps-0">
                                                            <span className="label-text">
                                                                Tempat Lahir{" "}
                                                                {formik.errors
                                                                    .place_birth && (
                                                                    <span className="text-red-500 text-xs italic">
                                                                        *wajib
                                                                        diisi
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
                                                                        *wajib
                                                                        diisi
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
                                                                        *wajib
                                                                        diisi
                                                                    </span>
                                                                )}
                                                            </span>
                                                        </div>
                                                        <Select
                                                            defaultValue={
                                                                formik.values
                                                                    .religion
                                                            }
                                                            onValueChange={(
                                                                value
                                                            ) =>
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
                                                                        *wajib
                                                                        diisi
                                                                    </span>
                                                                )}
                                                            </span>
                                                        </div>
                                                        <Select
                                                            defaultValue={
                                                                formik.values
                                                                    .education
                                                            }
                                                            onValueChange={(
                                                                value
                                                            ) =>
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
                                                                    Tidak
                                                                    Sekolah
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
                                                                    Pasca
                                                                    Sarjana (S2)
                                                                </SelectItem>
                                                                <SelectItem value="Doktoral (S3)">
                                                                    Doktoral
                                                                    (S3)
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
                                                                {formik.errors
                                                                    .job && (
                                                                    <span className="text-red-500 text-xs italic">
                                                                        *wajib
                                                                        diisi
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
                                                                        *wajib
                                                                        diisi
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
                                                                        *wajib
                                                                        diisi
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
                                            </>
                                        )}
                                    </div>

                                    <div className="divider my-1 dark:after:!bg-neutral-600 dark:before:!bg-neutral-600"></div>
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
                                {formik.values.role === "parent" && (
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
                                )}
                                {formik.values.role !== "admin" && (
                                    <>
                                        <div>
                                            <p className="text-xs text-gray-400">
                                                Agama
                                            </p>
                                            <p className="text-medium font-semibold">
                                                {formik.values.religion ||
                                                    "N/A"}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400">
                                                Tempat Lahir
                                            </p>
                                            <p className="text-medium font-semibold">
                                                {formik.values.place_birth ||
                                                    "N/A"}
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
                                                {formik.values.education ||
                                                    "N/A"}
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
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}
