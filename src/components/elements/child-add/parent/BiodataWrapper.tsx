"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { DatePicker } from "../../inputs/datepicker";
import { useEffect, useMemo, useState } from "react";
import { ErrorMessage, Field, Form, FormikProvider, useFormik } from "formik";
import { toast } from "sonner";
import * as Yup from "yup";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useIsClient } from "usehooks-ts";
import { User } from "@/types/user.types";
import { useRouter } from "next/navigation";
import { getImageUrl } from "@/utils/converters";
import { ChildrenData } from "@/types/childrenData.type";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { useInfiniteQuery } from "@tanstack/react-query";

const validationSchema = Yup.object().shape({
    teacher_id: Yup.string().required("Guru hapus dipilih"),
    full_name: Yup.string()
        .required("Nama tidak boleh kosong") // Required field with custom error message
        .trim() // Remove leading/trailing whitespace
        .min(3, "Nama minimal 3 karakter") // Minimum length of 3 characters
        .max(50, "Nama maksimal 50 karakter"), // Maximum length of 50 characters

    nick_name: Yup.string()
        .trim() // Optional field, remove whitespace if present
        .min(3, "Nama panggilan minimal 3 karakter") // Minimum length of 3 (if provided)
        .max(20, "Nama panggilan maksimal 20 karakter"), // Maximum length of 20 (if provided)

    gender: Yup.string()
        .oneOf(
            ["laki-laki", "perempuan"],
            "Jenis kelamin harus laki-laki atau perempuan"
        )
        .required("Jenis kelamin harus dipilih"), // Must be "pria" or "wanita"

    religion: Yup.string()
        .trim() // Optional field, remove whitespace if present
        .required("Agama harus dipilih"), // Required field with custom error message

    place_birth: Yup.string()
        .trim() // Optional field, remove whitespace if present
        .required("Tempat lahir harus dipilih"), // Required field with custom error message

    date_birth: Yup.date().required("Tanggal lahir harus dipilih"), // Must be a valid date
    // "Tanggal lahir harus berupa tanggal yang valid"

    hearing: Yup.string().trim().nullable(), // Optional field, remove whitespace if present
    // .oneOf(
    //     ["normal", "kurang", "tuna rungu"],
    //     "Pendengaran harus normal, kurang, atau tuna rungu"
    // ), // Must be "normal", "kurang", or "tuna rungu"
    risk_category: Yup.string(),
    count_of_siblings: Yup.number()
        .min(0, "Jumlah saudara minimal 0") // Must be a number greater than or equal to 0
        .integer("Jumlah saudara harus berupa bilangan bulat"), // Must be an integer
});

interface Props {
    // handleBackStage: () => void;
    handleNextStage: () => void;
    saveAllAnswers: (
        section: keyof ChildrenData,
        newData: Partial<ChildrenData[keyof ChildrenData]>
    ) => void;
    localData: ChildrenData;
}

const getBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
};

export default function BiodataWrapper({
    // handleBackStage,
    handleNextStage,
    saveAllAnswers,
    localData,
}: Props) {
    const [city, setCity] = useState("");
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [isLoading, setIsLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    // const [teachersData, setTeachersData] = useState<User[]>([]);
    const [selectedTeacher, setSelectedTeacher] = useState<User>({} as User);
    const isClient = useIsClient();

    // const {
    //     data: teachersRaw,
    //     isLoading: isLoadingTeachers,
    // }: { data: { status: string; teachers: User[] }; isLoading: boolean } =
    //     useSWR("/api/teachers?plain=true", fetcher);

    const initialValues: { [key: string]: string } = {
        teacher_id: "",
        risk_category: "",
        parent_dad: "",
        parent_mother: "",
        parent_wali: "",
        full_name: "",
        nick_name: "",
        gender: "",
        religion: "",
        place_birth: city || "",
        date_birth: date ? new Date(date).toISOString() : "",
        hearing: "",
        count_of_siblings: "0",
        picture: "",
    };

    const data: { [key: string]: string } = localData?.biodata || ({} as any);
    const fields: (keyof typeof initialValues)[] = [
        "teacher_id",
        "risk_category",
        "parent_wali",
        "parent_dad",
        "parent_mother",
        "full_name",
        "nick_name",
        "gender",
        "religion",
        "place_birth",
        "date_birth",
        "hearing",
        "count_of_siblings",
    ];

    fields.forEach((field) => {
        if (data[field] !== undefined) {
            initialValues[field] = data[field];
        }
    });

    const formik = useFormik({
        initialValues,
        // enableReinitialize: true,
        validationSchema,
        onSubmit: async (values: any) => {
            setIsLoading(true);
            values = { ...values, picture: selectedImage };

            try {
                // console.log(values);
                saveAllAnswers("biodata", {
                    // id: values.id,
                    teacher_id: values.teacher_id,
                    risk_category: values.risk_category,
                    parent_dad: values.parent_dad,
                    parent_mother: values.parent_mother,
                    parent_wali: values.parent_wali,
                    full_name: values.full_name,
                    nick_name: values.nick_name,
                    gender: values.gender,
                    religion: values.religion,
                    place_birth: values.place_birth,
                    date_birth: values.date_birth,
                    hearing: values.hearing,
                    count_of_siblings: values.count_of_siblings,
                    picture: values.picture,
                });

                handleNextStage();
            } catch (error) {
                console.error(error);
                toast.error("Something went wrong");
            } finally {
                setIsLoading(false);
            }
        },
    });

    useEffect(() => {
        if (localData) {
            const latestData = localData?.biodata;
            console.log(latestData);
            if (latestData) {
                latestData.picture
                    ? setSelectedImage(latestData.picture)
                    : setSelectedImage(null);
                if (latestData.place_birth) setCity(latestData.place_birth);
                if (latestData.date_birth)
                    setDate(new Date(latestData.date_birth));

                // console.log(typeof latestData?.date_birth);

                formik.setValues({
                    // ...formik.values,
                    teacher_id: latestData.teacher_id || "",
                    risk_category: latestData.risk_category || "",
                    parent_dad: latestData.parent_dad || "",
                    parent_mother: latestData.parent_mother || "",
                    parent_wali: latestData.parent_wali || "",
                    full_name: latestData.full_name || "",
                    nick_name: latestData.nick_name || "",
                    gender: latestData.gender || "",
                    religion: latestData.religion || "",
                    place_birth: latestData.place_birth || "",
                    date_birth: new Date(latestData.date_birth) || new Date(),
                    hearing: latestData.hearing || "",
                    count_of_siblings: latestData.count_of_siblings || 0,
                    picture: null,
                });
            }
        }
    }, [localData]);

    const resetForm = () => {
        formik.resetForm();
        setSelectedImage(null);
        setDate(new Date());
        setCity("");
    };

    const handleImageChange = async (event: any) => {
        const selectedFile = event.target.files[0];
        const allowedExtensions = ["jpg", "png", "jpeg"];
        const extension = selectedFile.name.split(".").pop().toLowerCase();
        const fileSize = selectedFile.size;

        if (fileSize > 1024000) {
            setSelectedImage(null);
            toast.error("Ukuran maksimal gambar 1MB");
        } else if (!allowedExtensions.includes(extension)) {
            setSelectedImage(null);
            toast.error("Hanya gambar dengan tipe jpg, jpeg, atau png");
        } else {
            const base64String: any = await getBase64(selectedFile);
            localStorage.setItem("image", base64String); // Store image in localStorage
            setSelectedImage(base64String);
        }
    };

    useEffect(() => {
        if (date) {
            formik.setFieldValue("date_birth", date);
        }

        if (city) {
            formik.setFieldValue("place_birth", city);
        }

        // console.log(date);
    }, [date, city]);

    // useEffect(() => {
    //     if (teachersRaw?.teachers) {
    //         setTeachersData(teachersRaw.teachers);
    //     }
    // }, [teachersRaw]);

    if (!isClient) {
        return null;
    }

    return (
        <>
            {(isLoading || !isClient) && (
                <>
                    <div className="mb-3">
                        <p className="text-large font-semibold tracking-tight">
                            Biodata
                        </p>
                        <div className="skeleton rounded-lg w-14 sm:w-28 h-14 sm:h-28"></div>
                    </div>
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
            )}

            {!isLoading && isClient && (
                <FormikProvider value={formik}>
                    <Form>
                        <div>
                            <p className="text-large font-semibold tracking-tight">
                                Biodata
                            </p>
                            <div className="mt-3">
                                <label className="form-control max-w-32 cursor-pointer">
                                    <div className="max-w-32 bg-gray-300 border border-gray-300 rounded-lg overflow-hidden transition-all ease-in-out hover:border-primary hover:border-2">
                                        <AspectRatio ratio={1 / 1}>
                                            <Image
                                                src={getImageUrl(selectedImage)}
                                                alt="Child Profile"
                                                fill={true}
                                                className="rounded-lg object-cover"
                                                draggable={false}
                                            />
                                        </AspectRatio>
                                    </div>
                                    <Field
                                        name="picture"
                                        type="file"
                                        className="file-input file-input-ghost hidden"
                                        accept="image/*"
                                        onChange={(e: any) =>
                                            handleImageChange(e)
                                        }
                                        // {...formik.getFieldProps("picture")}
                                    />
                                    <p className="text-small italic">
                                        Foto anak (ubah)
                                    </p>
                                </label>
                                <ErrorMessage
                                    name="picture"
                                    component="div"
                                    className="text-red-500 text-xs sm:text-sm"
                                />
                            </div>
                            <div className="divider my-1 dark:after:!bg-neutral-600 dark:before:!bg-neutral-600">
                                Data Guru
                            </div>
                            <div className="grid gap-2 mb-3 grid-cols-1 sm:grid-cols-2 group-[.open]:grid-cols-1 md:group-[.open]:grid-cols-2">
                                <div>
                                    <label className="form-control w-full">
                                        <div className="label ps-0">
                                            <span className="label-text">
                                                Guru
                                                {formik.errors.teacher_id && (
                                                    <span className="text-red-500 text-xs italic">
                                                        *wajib dipilih
                                                    </span>
                                                )}
                                            </span>
                                        </div>
                                        <TeacherPicker
                                            teacherId={formik.values.teacher_id}
                                            setTeacherId={(value) =>
                                                formik.setFieldValue(
                                                    "teacher_id",
                                                    value
                                                )
                                            }
                                            setSelectedTeacher={
                                                setSelectedTeacher
                                            }
                                            // teachersData={teachersData}
                                        />
                                    </label>
                                    <ErrorMessage
                                        name="teacher_id"
                                        component="div"
                                        className="text-red-500 text-xs sm:text-sm"
                                    />
                                </div>
                            </div>
                            {formik.values.teacher_id && (
                                <div className="border border-gray-300 p-2 rounded-lg mb-3 grid gap-2 grid-cols-2 sm:grid-cols-3 dark:border-neutral-600">
                                    {[
                                        {
                                            label: "Nama",
                                            value: selectedTeacher.name,
                                        },
                                        {
                                            label: "No Telp",
                                            value: selectedTeacher.phone || "-",
                                        },
                                        {
                                            label: "E-mail",
                                            value: selectedTeacher.email || "-",
                                        },
                                        {
                                            label: "Agama",
                                            value:
                                                selectedTeacher.religion || "-",
                                        },
                                        {
                                            label: "Pendidikan",
                                            value:
                                                selectedTeacher.education ||
                                                "-",
                                        },
                                    ].map((field, index) => (
                                        <div key={index} className="my-1">
                                            <p className="text-xs text-gray-400">
                                                {field.label}
                                            </p>
                                            <p className="text-medium font-semibold break-words">
                                                {field.value}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div className="divider my-1 dark:after:!bg-neutral-600 dark:before:!bg-neutral-600">
                                Data Anak
                            </div>
                            <div className="grid gap-2 mb-3 grid-cols-1 sm:grid-cols-2 group-[.open]:grid-cols-1 md:group-[.open]:grid-cols-2">
                                <div>
                                    <label className="form-control w-full">
                                        <div className="label ps-0">
                                            <span className="label-text">
                                                Nama Panjang{" "}
                                                {formik.errors.full_name && (
                                                    <span className="text-red-500 text-xs italic">
                                                        *wajib dipilih
                                                    </span>
                                                )}
                                            </span>
                                        </div>
                                        <Field
                                            type="text"
                                            // name="full_name"
                                            placeholder="Anista Dwi..."
                                            className="input input-bordered rounded-lg px-3 py-2 text-sm h-fit min-h-fit w-full"
                                            {...formik.getFieldProps(
                                                "full_name"
                                            )}
                                            // value={formik.values.full_name}
                                            // onChange={formik.handleChange}
                                            // onBlur={formik.handleBlur}
                                        />
                                    </label>
                                    <ErrorMessage
                                        name="full_name"
                                        component="div"
                                        className="text-red-500 text-xs sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="form-control w-full">
                                        <div className="label ps-0">
                                            <span className="label-text">
                                                Nama Panggilan
                                            </span>
                                        </div>
                                        <Field
                                            type="text"
                                            // name="nickname"
                                            placeholder="Anit..."
                                            className="input input-bordered rounded-lg px-3 py-2 text-sm h-fit min-h-fit w-full"
                                            {...formik.getFieldProps(
                                                "nick_name"
                                            )}
                                            // value={formik.values.name}
                                            // onChange={formik.handleChange}
                                            // onBlur={formik.handleBlur}
                                        />
                                    </label>
                                    <ErrorMessage
                                        name="nick_name"
                                        component="div"
                                        className="text-red-500 text-xs sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <div className="label ps-0">
                                        <span className="label-text">
                                            Jenis kelamin{" "}
                                            {formik.errors.gender && (
                                                <span className="text-red-500 text-xs italic">
                                                    *wajib dipilih
                                                </span>
                                            )}
                                        </span>
                                    </div>
                                    {/* <select
                                        title="Jenis Kelamin"
                                        value={formik.values.gender}
                                        onChange={(e) =>
                                            formik.setFieldValue(
                                                "gender",
                                                e.target.value
                                            )
                                        }
                                        onBlur={formik.handleBlur}
                                        name="gender"
                                        className="w-full"
                                    >
                                        <option value="" disabled>
                                            Pilih Jenis Kelamin
                                        </option>
                                        <option value="laki-laki">
                                            Laki-laki
                                        </option>
                                        <option value="perempuan">
                                            Perempuan
                                        </option>
                                    </select> */}
                                    <Select
                                        value={formik.values.gender || ""}
                                        defaultValue={
                                            formik.values.gender || ""
                                        }
                                        onValueChange={(value) =>
                                            formik.setFieldValue(
                                                "gender",
                                                value
                                            )
                                        }
                                    >
                                        <SelectTrigger
                                            name="gender"
                                            className="w-full"
                                            onBlur={formik.handleBlur}
                                        >
                                            <SelectValue placeholder="Pilih Jenis Kelamin" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="laki-laki">
                                                Laki-laki
                                            </SelectItem>
                                            <SelectItem value="perempuan">
                                                Perempuan
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {/* {genderOptions.map(
                                                (gender, index) => (
                                                    <SelectItem
                                                        key={index}
                                                        value={gender.value}
                                                    >
                                                        {gender.label}
                                                    </SelectItem>
                                                )
                                            )} */}
                                    <ErrorMessage
                                        name="gender"
                                        component="div"
                                        className="text-red-500 text-xs sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <div className="label ps-0">
                                        <span className="label-text">
                                            Agama{" "}
                                            {formik.errors.religion && (
                                                <span className="text-red-500 text-xs italic">
                                                    *wajib dipilih
                                                </span>
                                            )}
                                        </span>
                                    </div>
                                    {/* <select
                                        title="Agama"
                                        value={formik.values.religion}
                                        onChange={(e) =>
                                            formik.setFieldValue(
                                                "religion",
                                                e.target.value
                                            )
                                        }
                                        onBlur={formik.handleBlur}
                                        name="religion"
                                        className="w-full"
                                    >
                                        <option value="" disabled>
                                            Pilih Agama
                                        </option>
                                        <option value="islam">Islam</option>
                                        <option value="kristen">Kristen</option>
                                        <option value="katolik">Katolik</option>
                                        <option value="hindu">Hindu</option>
                                        <option value="buddha">Buddha</option>
                                        <option value="konghucu">
                                            Konghucu
                                        </option>
                                    </select> */}
                                    <Select
                                        value={formik.values.religion || ""}
                                        defaultValue={
                                            formik.values.religion || ""
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
                                            onBlur={formik.handleBlur}
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
                                    <ErrorMessage
                                        name="religion"
                                        component="div"
                                        className="text-red-500 text-xs sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <div className="label ps-0">
                                        <span className="label-text">
                                            Tanggal Lahir{" "}
                                            {formik.errors.date_birth && (
                                                <span className="text-red-500 text-xs italic">
                                                    *wajib dipilih
                                                </span>
                                            )}
                                        </span>
                                    </div>
                                    <DatePicker
                                        initialDate={formik.values.date_birth}
                                        date={formik.values.date_birth}
                                        setDate={setDate}
                                    />
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
                                                Tempat Lahir{" "}
                                                {formik.errors.place_birth && (
                                                    <span className="text-red-500 text-xs italic">
                                                        *wajib dipilih
                                                    </span>
                                                )}
                                            </span>
                                        </div>
                                        <Field
                                            type="text"
                                            placeholder="Masukkan tempat lahir..."
                                            className="input input-bordered rounded-lg px-3 py-2 text-sm h-fit min-h-fit w-full"
                                            {...formik.getFieldProps(
                                                "place_birth"
                                            )}
                                        />
                                    </label>
                                    {/* <CityPicker
                                        city={formik.values.place_birth}
                                        setCity={setCity}
                                    /> */}
                                    <ErrorMessage
                                        name="place_birth"
                                        component="div"
                                        className="text-red-500 text-xs sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <div className="label ps-0">
                                        <span className="label-text">
                                            Pendengaran
                                        </span>
                                    </div>
                                    <Select
                                        value={formik.values.hearing || ""}
                                        defaultValue={
                                            formik.values.hearing || ""
                                        }
                                        onValueChange={(value) =>
                                            formik.setFieldValue(
                                                "hearing",
                                                value
                                            )
                                        }
                                    >
                                        <SelectTrigger
                                            name="hearing"
                                            className="w-full"
                                            onBlur={formik.handleBlur}
                                        >
                                            <SelectValue placeholder="Pilih Kualitas Pendengaran" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="normal">
                                                Dalam batas normal
                                            </SelectItem>
                                            <SelectItem value="below_normal">
                                                Di bawah normal
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <ErrorMessage
                                        name="hearing"
                                        component="div"
                                        className="text-red-500 text-xs sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <div className="label ps-0">
                                        <span className="label-text">
                                            Kategori{" "}
                                        </span>
                                    </div>
                                    <Select
                                        value={
                                            formik.values.risk_category || ""
                                        }
                                        defaultValue={
                                            formik.values.risk_category || ""
                                        }
                                        onValueChange={(value) =>
                                            formik.setFieldValue(
                                                "risk_category",
                                                value
                                            )
                                        }
                                    >
                                        <SelectTrigger
                                            name="risk_category"
                                            className="w-full"
                                            onBlur={formik.handleBlur}
                                        >
                                            <SelectValue placeholder="Pilih Kategori" />
                                        </SelectTrigger>
                                        <SelectContent>
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
                                    </Select>
                                    <ErrorMessage
                                        name="risk_category"
                                        component="div"
                                        className="text-red-500 text-xs sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="form-control">
                                        <div className="label ps-0">
                                            <span className="label-text">
                                                Jumlah Saudara Kandung
                                            </span>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                variant={"outline"}
                                                size={"icon"}
                                                className="rounded-full w-12"
                                                onClick={() =>
                                                    formik.values
                                                        .count_of_siblings != 0
                                                        ? formik.setFieldValue(
                                                              "count_of_siblings",
                                                              formik.values
                                                                  .count_of_siblings -
                                                                  1
                                                          )
                                                        : null
                                                }
                                                type="button"
                                            >
                                                <span className="material-symbols-outlined cursor-pointer !text-xl !leading-none">
                                                    remove
                                                </span>
                                            </Button>
                                            <Field
                                                type="number"
                                                // name="count_of_siblings"
                                                className="input input-bordered text-center rounded-lg ps-0 px-3 py-2 text-sm h-fit min-h-fit w-full number-input-no-arrow placeholder:text-center"
                                                {...formik.getFieldProps(
                                                    "count_of_siblings"
                                                )}
                                                // value={formik.values.count_of_siblings}
                                                // onChange={formik.handleChange}
                                                // onBlur={formik.handleBlur}
                                            />
                                            <Button
                                                variant={"outline"}
                                                size={"icon"}
                                                className="rounded-full w-12"
                                                onClick={() =>
                                                    formik.setFieldValue(
                                                        "count_of_siblings",
                                                        formik.values
                                                            .count_of_siblings +
                                                            1
                                                    )
                                                }
                                                type="button"
                                            >
                                                <span className="material-symbols-outlined cursor-pointer !text-xl !leading-none">
                                                    add
                                                </span>
                                            </Button>
                                        </div>
                                    </label>
                                    <ErrorMessage
                                        name="count_of_siblings"
                                        component="div"
                                        className="text-red-500 text-xs sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end gap-2">
                                <Button
                                    variant={"outline"}
                                    type="reset"
                                    onClick={resetForm}
                                    disabled={isLoading}
                                >
                                    {" "}
                                    <span className="material-symbols-outlined me-1 !leading-none !text-xl hover:no-underline">
                                        close
                                    </span>{" "}
                                    Reset
                                </Button>
                                <Button
                                    variant={"default"}
                                    type="submit"
                                    disabled={isLoading}
                                >
                                    Selanjutnya{" "}
                                    <span className="material-symbols-outlined me-1 !leading-none !text-xl hover:no-underline">
                                        arrow_forward
                                    </span>
                                </Button>
                            </div>
                        </div>
                    </Form>
                </FormikProvider>
            )}
        </>
    );
}

interface CityPickerProps {
    city: string;
    setCity: (city: string) => void;
}

const CityPicker = ({ city, setCity }: CityPickerProps) => {
    // const CityPicker = () => {
    // const [city, setCity] = useState("");
    const [open, setOpen] = useState(false);

    // const [cities, setCities] = useState();
    const cities = {
        Provinsi: [
            "Aceh",
            "Sumatera Utara",
            "Sumatera Barat",
            "Riau",
            "Kepulauan Riau",
            "Jambi",
            "Sumatera Selatan",
            "Bengkulu",
            "Lampung",
            "Bangka Belitung",
            "DKI Jakarta",
            "Jawa Barat",
            "Jawa Tengah",
            "DI Yogyakarta",
            "Jawa Timur",
            "Banten",
            "Bali",
            "Nusa Tenggara Barat",
            "Nusa Tenggara Timur",
            "Kalimantan Barat",
            "Kalimantan Tengah",
            "Kalimantan Selatan",
            "Kalimantan Timur",
            "Kalimantan Utara",
            "Sulawesi Utara",
            "Sulawesi Tengah",
            "Sulawesi Selatan",
            "Sulawesi Tenggara",
            "Gorontalo",
            "Sulawesi Barat",
            "Maluku",
            "Maluku Utara",
            "Papua",
            "Papua Barat",
            "Papua Barat Daya",
            "Papua Pegunungan",
            "Papua Selatan",
            "Papua Tengah",
        ],
        Kota: [
            "Banda Aceh",
            "Sabang",
            "Langsa",
            "Lhokseumawe",
            "Subulussalam",
            "Medan",
            "Binjai",
            "Tanjungbalai",
            "Pematangsiantar",
            "Tebing Tinggi",
            "Sibolga",
            "Padang Sidempuan",
            "Gunungsitoli",
            "Padang",
            "Bukittinggi",
            "Payakumbuh",
            "Padang Panjang",
            "Pariaman",
            "Sawahlunto",
            "Solok",
            "Pekanbaru",
            "Dumai",
            "Tanjungpinang",
            "Batam",
            "Jambi",
            "Sungai Penuh",
            "Palembang",
            "Pagar Alam",
            "Lubuklinggau",
            "Prabumulih",
            "Bengkulu",
            "Bandar Lampung",
            "Metro",
            "Pangkal Pinang",
            "Jakarta",
            "Bandung",
            "Cimahi",
            "Cirebon",
            "Bekasi",
            "Bogor",
            "Sukabumi",
            "Tasikmalaya",
            "Banjar",
            "Depok",
            "Semarang",
            "Surakarta",
            "Salatiga",
            "Pekalongan",
            "Magelang",
            "Tegal",
            "Yogyakarta",
            "Surabaya",
            "Malang",
            "Madiun",
            "Kediri",
            "Blitar",
            "Mojokerto",
            "Pasuruan",
            "Probolinggo",
            "Batu",
            "Serang",
            "Cilegon",
            "Tangerang",
            "Tangerang Selatan",
            "Denpasar",
            "Mataram",
            "Bima",
            "Kupang",
            "Pontianak",
            "Singkawang",
            "Palangka Raya",
            "Banjarmasin",
            "Banjarbaru",
            "Samarinda",
            "Balikpapan",
            "Bontang",
            "Tarakan",
            "Manado",
            "Bitung",
            "Tomohon",
            "Kotamobagu",
            "Palu",
            "Makassar",
            "Parepare",
            "Palopo",
            "Kendari",
            "Bau-Bau",
            "Gorontalo",
            "Ambon",
            "Tual",
            "Ternate",
            "Tidore Kepulauan",
            "Jayapura",
            "Sorong",
            "Manokwari",
        ],
    };

    const cityOptions = cities.Kota.map((city) => ({
        label: city,
        value: city,
    }));

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between text-sm"
                >
                    {city
                        ? cityOptions.find((kota) => kota.value === city)?.label
                        : "Pilih kota..."}
                    <span className="material-symbols-outlined cursor-pointer !text-xl !leading-none opacity-70">
                        unfold_more
                    </span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className=" p-0" align="start">
                <Command>
                    <CommandInput placeholder="Cari kota..." />
                    <CommandList className="overflow-y-auto max-h-40 md:max-h-80">
                        <CommandEmpty>Kota tidak ditemukan.</CommandEmpty>
                        <CommandGroup>
                            {cityOptions.map((kota, index) => (
                                <CommandItem
                                    key={index}
                                    value={kota.value}
                                    onSelect={(currentValue) => {
                                        setCity(
                                            currentValue === city
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
                                                    kota.value === city,
                                                "opacity-0":
                                                    kota.value !== city,
                                            }
                                        )}
                                    >
                                        check
                                    </span>
                                    {kota.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

interface TeacherPickerProps {
    teacherId: string;
    setTeacherId: (teacherId: string) => void;
    // teachersData: User[];
    setSelectedTeacher: (any) => void;
}

const TeacherPicker = ({
    teacherId,
    setTeacherId,
    // teachersData,
    setSelectedTeacher,
}: TeacherPickerProps) => {
    const [open, setOpen] = useState(false);
    // const router = useRouter();
    const isClient = useIsClient();
    // const currentUrl =
    //     typeof window !== "undefined" ? window.location.href : "";
    const [teachersData, setTeachersData] = useState<User[]>([]);
    const [search, setSearch] = useState("");
    const limit = 25;

    const fetchTeachers = async ({ pageParam = 0 }) => {
        const res = await fetch(
            `/api/teachers?plain=true&limit=${limit}&skip=${pageParam}&sort=asc`
        );
        return res.json();
    };

    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
    }: any = useInfiniteQuery({
        queryKey: ["teachers"],
        queryFn: fetchTeachers,
        initialPageParam: 0,
        getNextPageParam: (lastPage) => lastPage.nextCursor,
    });

    // const teacherOptions = teachersData.map((teacher) => ({
    //     label: teacher.name,
    //     value: teacher.id.toString() + "-" + teacher.name,
    // }));

    const teacherOptions = useMemo(() => {
        return data?.pages.flatMap((page) => {
            if (page?.message || page?.teachers?.length === 0) {
                return [];
            }

            return page?.teachers.map((teacher) => ({
                label: teacher.name,
                value: teacher.id.toString() + "-" + teacher.name,
            }));
        });
    }, [data]);

    useEffect(() => {
        if (data) {
            setTeachersData((prev) => {
                const newTeachers = data.pages.flatMap((page) => page.teachers);
                const uniqueNewTeachers = newTeachers.filter(
                    (newTeacher) =>
                        !prev.some(
                            (existingTeacher) =>
                                existingTeacher.id === newTeacher.id
                        )
                );

                return [...prev, ...uniqueNewTeachers];
            });
        }
    }, [data]);

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
                    {teacherId
                        ? teacherOptions.find(
                              (parent) => parent.value === teacherId
                          )?.label
                        : `Pilih Guru...`}
                    <span className="material-symbols-outlined cursor-pointer !text-xl !leading-none opacity-70">
                        unfold_more
                    </span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 border-neutral-600" align="start">
                <Command>
                    <CommandInput
                        placeholder={`Cari Guru...`}
                        onValueChange={setSearch}
                    />
                    <CommandList className="overflow-y-auto max-h-40 md:max-h-80">
                        {isFetching || status === "pending" ? (
                            <CommandEmpty>Mendapatkan data...</CommandEmpty>
                        ) : (
                            <>
                                <CommandEmpty>
                                    Guru tidak ditemukan
                                </CommandEmpty>
                                <CommandGroup>
                                    {teacherOptions.map((parent, index) => (
                                        <CommandItem
                                            key={index}
                                            value={parent.value}
                                            defaultValue={parent.value}
                                            onSelect={(currentValue) => {
                                                const selectedId =
                                                    currentValue.split("-")[0];

                                                setTeacherId(
                                                    selectedId === teacherId
                                                        ? ""
                                                        : currentValue
                                                );
                                                setOpen(false);

                                                const setTeacher =
                                                    teachersData.find(
                                                        (p: User) =>
                                                            p.id.toString() ===
                                                            selectedId
                                                    );

                                                if (setTeacher) {
                                                    setSelectedTeacher(
                                                        setTeacher
                                                    );
                                                }
                                            }}
                                        >
                                            <span
                                                className={cn(
                                                    "material-symbols-outlined cursor-pointer !text-lg !leading-none mr-2 h-4 w-4",
                                                    {
                                                        "opacity-100":
                                                            parent.value ===
                                                            teacherId,
                                                        "opacity-0":
                                                            parent.value !==
                                                            teacherId,
                                                    }
                                                )}
                                            >
                                                check
                                            </span>
                                            {parent.label}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                                {hasNextPage && (
                                    <CommandItem asChild value={"z " + search}>
                                        <Button
                                            onClick={() => fetchNextPage()}
                                            disabled={isFetchingNextPage}
                                            className="cursor-pointer w-full flex justify-center items-center text-small p-4 transition-all ease-in-out hover:bg-gray-200 dark:hover:bg-neutral-700"
                                        >
                                            {isFetchingNextPage
                                                ? "Memuat data..."
                                                : "Lihat Lainnya"}
                                        </Button>
                                    </CommandItem>
                                )}
                            </>
                        )}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};
