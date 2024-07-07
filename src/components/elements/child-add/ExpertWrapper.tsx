"use client";

import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ChildrenData } from "@/types/childrenData.type";
import { ErrorMessage, Field, Form, FormikProvider, useFormik } from "formik";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import * as Yup from "yup";

interface Props {
    handleNextStage: () => void;
    handleBackStage: () => void;
    saveAllAnswers: (
        section: keyof ChildrenData,
        newData: Partial<ChildrenData[keyof ChildrenData]>
    ) => void;
    localData: ChildrenData;
}

const validationSchema = Yup.object().shape({
    pediatrician: Yup.string().trim().min(3, "Kata minimal 3 karakter"),
    pediatrician_other: Yup.string().when("pediatrician", {
        is: (value: string) => value === "other",
        then: (schema) =>
            schema
                .required("This field is required when 'Lainnya' is selected")
                .min(3, "Kata minimal 3 karakter"),
        otherwise: (schema) => schema,
    }),
    rehabilitation: Yup.string().trim().min(3, "Kata minimal 3 karakter"),
    rehabilitation_other: Yup.string().when("rehabilitation", {
        is: (value: string) => value === "other",
        then: (schema) =>
            schema
                .required("This field is required when 'Lainnya' is selected")
                .min(3, "Kata minimal 3 karakter"),
        otherwise: (schema) => schema,
    }),
    psychologist: Yup.string().trim().min(3, "Kata minimal 3 karakter"),
    psychologist_other: Yup.string().when("psychologist", {
        is: (value: string) => value === "other",
        then: (schema) =>
            schema
                .required("This field is required when 'Lainnya' is selected")
                .min(3, "Kata minimal 3 karakter"),
        otherwise: (schema) => schema,
    }),
    therapist: Yup.string().trim().min(3, "Kata minimal 3 karakter"),
    therapist_other: Yup.string().when("therapist", {
        is: (value: string) => value === "other",
        then: (schema) =>
            schema
                .required("This field is required when 'Lainnya' is selected")
                .min(3, "Kata minimal 3 karakter"),
        otherwise: (schema) => schema,
    }),
});

const options: { value: string; label: string }[] = [
    {
        value: "Tidak Tahu",
        label: "Tidak Tahu",
    },
    {
        value: "ASD",
        label: "Autism Spectrum Disorder",
    },
    {
        value: "ADHD",
        label: "Attention Deficit Hyperactivity Disorder",
    },
    {
        value: "Normal",
        label: "Normal",
    },
    {
        value: "other",
        label: "Lainnya",
    },
];

export default function ExpertWrapper({
    handleNextStage,
    handleBackStage,
    saveAllAnswers,
    localData,
}: Props) {
    const [isLoading, setIsLoading] = useState(false);
    const [answers, setAnswers] = useState({});
    const [showOtherFields, setShowOtherFields] = useState({
        pediatrician: false,
        rehabilitation: false,
        psychologist: false,
        therapist: false,
    });

    const initialValues: { [key: string]: string } = {
        pediatrician: "Tidak Tahu",
        pediatrician_other: "",
        rehabilitation: "Tidak Tahu",
        rehabilitation_other: "",
        psychologist: "Tidak Tahu",
        psychologist_other: "",
        therapist: "Tidak Tahu",
        therapist_other: "",
    };

    const data: { [key: string]: string } =
        localData?.expertExamination || ({} as any);
    const fields: (keyof typeof initialValues)[] = [
        "pediatrician",
        "psychologist",
        "rehabilitation",
        "therapist",
    ];

    fields.forEach((field) => {
        const value = data[field];
        const isOption = options.some((option) => option.value === value);

        if (isOption) {
            initialValues[field] = value;
        } else {
            initialValues[field] = "other";
            initialValues[`${field}_other`] = value || "";
        }
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values: any) => {
            setIsLoading(true);

            try {
                const formattedValues = {
                    pediatrician:
                        values.pediatrician === "other"
                            ? values.pediatrician_other
                            : values.pediatrician,
                    rehabilitation:
                        values.rehabilitation === "other"
                            ? values.rehabilitation_other
                            : values.rehabilitation,
                    psychologist:
                        values.psychologist === "other"
                            ? values.psychologist_other
                            : values.psychologist,
                    therapist:
                        values.therapist === "other"
                            ? values.therapist_other
                            : values.therapist,
                };

                saveAllAnswers("expertExamination", formattedValues);
                handleNextStage();
                // toast.success("Data successfully saved");
            } catch (error) {
                console.error(error);
                toast.error("Something went wrong");
            } finally {
                setIsLoading(false);
            }
        },
    });

    useEffect(() => {
        const data: { [key: string]: string } = localData?.expertExamination;
        if (data) {
            const fields: string[] = [
                "pediatrician",
                "psychologist",
                "rehabilitation",
                "therapist",
            ];

            fields.forEach((field: string) => {
                const value = data[field];
                const isOption = options.some(
                    (option) => option.value === value
                );

                if (!isOption) {
                    setShowOtherFields((prevState) => ({
                        ...prevState,
                        [field]: true,
                    }));
                }
            });
        }
    }, [localData]);

    const handleSelectChange = (field: string, value: string) => {
        formik.setFieldValue(field, value);
        if (value === "other") {
            setShowOtherFields({ ...showOtherFields, [field]: true });
        } else {
            setShowOtherFields({ ...showOtherFields, [field]: false });
        }
    };

    // useEffect(() => {
    //     const data: { [key: string]: string } = localData?.expertExamination;
    //     if (data) {
    //         const fields: string[] = [
    //             "pediatrician",
    //             "psychologist",
    //             "rehabilitation",
    //             "therapist",
    //         ];

    //         fields.forEach((field: string) => {
    //             const value = data[field];
    //             const isOption = options.some(
    //                 (option) => option.value === value
    //             );

    //             if (isOption) {
    //                 formik.setFieldValue(field, value);
    //                 setShowOtherFields((prevState) => ({
    //                     ...prevState,
    //                     [field]: false,
    //                 }));
    //             } else {
    //                 formik.setFieldValue(field, "other");
    //                 formik.setFieldValue(`${field}_other`, value);
    //                 setShowOtherFields((prevState) => ({
    //                     ...prevState,
    //                     [field]: true,
    //                 }));
    //             }
    //         });

    //         console.log(data, formik.values);
    //     }
    // }, [localData]);

    return (
        <>
            <FormikProvider value={formik}>
                <Form>
                    <div>
                        <div className="divider mb-1 mt-4"></div>
                        <p className="text-large font-semibold tracking-tight">
                            Hasil Pemeriksaan Ahli
                        </p>
                        <div className="mb-3">
                            <div className="w-full">
                                <p className="font-medium text-medium">
                                    1. Pemeriksaan oleh Dokter ahli anak
                                </p>
                                <p className="text-small to-gray-500">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit. Quibusdam, iste adipisci?
                                    Dolorem enim est impedit, molestias eos ut
                                    perspiciatis earum.
                                </p>
                            </div>
                            <label className="form-control w-full">
                                <div className="label ps-0">
                                    <span className="label-text">Hasil</span>
                                </div>
                                <Select
                                    name="pediatrician"
                                    value={formik.values.pediatrician}
                                    onValueChange={(value) =>
                                        handleSelectChange(
                                            "pediatrician",
                                            value
                                        )
                                    }
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Pilih Jawaban" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {options.map((option, idx) => (
                                            <SelectItem
                                                key={idx}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </label>
                            {showOtherFields.pediatrician && (
                                <Field
                                    type="text"
                                    // name="pediatrician_other"
                                    placeholder="Lainnya..."
                                    className="input input-bordered rounded-lg px-3 py-2 mt-3 text-sm h-fit min-h-fit w-full"
                                    // value={formik.values.pediatrician_other}
                                    // onChange={formik.handleChange}
                                    // onBlur={formik.handleBlur}
                                    {...formik.getFieldProps(
                                        "pediatrician_other"
                                    )}
                                />
                            )}
                            <ErrorMessage
                                name="pediatrician_other"
                                component="div"
                                className="text-red-500 text-xs sm:text-sm"
                            />
                        </div>
                        <div className="mb-3">
                            <div className="w-full">
                                <p className="font-medium text-medium">
                                    2. Pemeriksaan oleh Dokter ahli rehabilitasi
                                </p>
                                <p className="text-small to-gray-500">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit. Quibusdam, iste adipisci?
                                    Dolorem enim est impedit, molestias eos ut
                                    perspiciatis earum.
                                </p>
                            </div>
                            <label className="form-control w-full">
                                <div className="label ps-0">
                                    <span className="label-text">Hasil</span>
                                </div>
                                <Select
                                    name="rehabilitation"
                                    value={formik.values.rehabilitation}
                                    onValueChange={(value) =>
                                        handleSelectChange(
                                            "rehabilitation",
                                            value
                                        )
                                    }
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Pilih Jawaban" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {options.map((option, idx) => (
                                            <SelectItem
                                                key={idx}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </label>
                            {showOtherFields.rehabilitation && (
                                <Field
                                    type="text"
                                    // name="rehabilitation_other"
                                    placeholder="Lainnya..."
                                    className="input input-bordered rounded-lg px-3 py-2 mt-3 text-sm h-fit min-h-fit w-full"
                                    // value={formik.values.rehabilitation_other}
                                    // onChange={formik.handleChange}
                                    // onBlur={formik.handleBlur}
                                    {...formik.getFieldProps(
                                        "rehabilitation_other"
                                    )}
                                />
                            )}
                            <ErrorMessage
                                name="rehabilitation_other"
                                component="div"
                                className="text-red-500 text-xs sm:text-sm"
                            />
                        </div>
                        <div className="mb-3">
                            <div className="w-full">
                                <p className="font-medium text-medium">
                                    3. Pemeriksaan oleh Dokter ahli psikologi
                                </p>
                                <p className="text-small to-gray-500">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit. Quibusdam, iste adipisci?
                                    Dolorem enim est impedit, molestias eos ut
                                    perspiciatis earum.
                                </p>
                            </div>
                            <label className="form-control w-full">
                                <div className="label ps-0">
                                    <span className="label-text">Hasil</span>
                                </div>
                                <Select
                                    name="psychologist"
                                    value={formik.values.psychologist}
                                    onValueChange={(value) =>
                                        handleSelectChange(
                                            "psychologist",
                                            value
                                        )
                                    }
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Pilih Jawaban" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {options.map((option, idx) => (
                                            <SelectItem
                                                key={idx}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </label>
                            {showOtherFields.psychologist && (
                                <Field
                                    type="text"
                                    // name="psychologist_other"
                                    placeholder="Lainnya..."
                                    className="input input-bordered rounded-lg px-3 py-2 mt-3 text-sm h-fit min-h-fit w-full"
                                    // value={formik.values.psychologist_other}
                                    // onChange={formik.handleChange}
                                    // onBlur={formik.handleBlur}
                                    {...formik.getFieldProps(
                                        "psychologist_other"
                                    )}
                                />
                            )}
                            <ErrorMessage
                                name="psychologist_other"
                                component="div"
                                className="text-red-500 text-xs sm:text-sm"
                            />
                        </div>
                        <div className="mb-3">
                            <div className="w-full">
                                <p className="font-medium text-medium">
                                    4. Pemeriksaan oleh Dokter ahli terapi
                                </p>
                                <p className="text-small to-gray-500">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit. Quibusdam, iste adipisci?
                                    Dolorem enim est impedit, molestias eos ut
                                    perspiciatis earum.
                                </p>
                            </div>
                            <label className="form-control w-full">
                                <div className="label ps-0">
                                    <span className="label-text">Hasil</span>
                                </div>
                                <Select
                                    name="therapist"
                                    value={formik.values.therapist}
                                    onValueChange={(value) =>
                                        handleSelectChange("therapist", value)
                                    }
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Pilih Jawaban" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {options.map((option, idx) => (
                                            <SelectItem
                                                key={idx}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </label>
                            {showOtherFields.therapist && (
                                <Field
                                    type="text"
                                    // name="therapist_other"
                                    placeholder="Lainnya..."
                                    className="input input-bordered rounded-lg px-3 py-2 mt-3 text-sm h-fit min-h-fit w-full"
                                    // value={formik.values.therapist_other}
                                    // onChange={formik.handleChange}
                                    // onBlur={formik.handleBlur}
                                    {...formik.getFieldProps("therapist_other")}
                                />
                            )}
                            <ErrorMessage
                                name="therapist_other"
                                component="div"
                                className="text-red-500 text-xs sm:text-sm"
                            />
                        </div>
                        <div className="flex gap-2 justify-end">
                            <Button
                                variant={"outline"}
                                type="reset"
                                onClick={handleBackStage}
                            >
                                <span className="material-symbols-outlined me-1 !leading-none !text-xl hover:no-underline">
                                    arrow_back
                                </span>
                                Kembali
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
        </>
    );
}
