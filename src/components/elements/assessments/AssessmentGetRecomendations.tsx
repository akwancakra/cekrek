"use client";

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
import CreateRecomendationCard from "../cards/CreateRecomendationCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { useCounter, useMediaQuery } from "usehooks-ts";
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
import { AssessmentAnswer } from "@/types/assessmentAnswer.copy";
import { getRiskCategory, isRecommendationResponse } from "@/utils/converters";
import { Child } from "@/types/children.types";
import axios from "axios";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { AddRecomendationForm } from "../forms/AddRecomendationForm";
import * as Yup from "yup";
import { FormikProps, useFormik } from "formik";
import useProfile from "@/utils/useProfile";

interface AssessmentGetRecommendationsProps {
    child: Child;
    assessmentAnswer: AssessmentAnswer[];
    handleBackStage: () => void;
    removeAssessmentAnswer: () => void;
    isLoading?: boolean;
}

type Recommendation = {
    id?: number;
    id_temp?: number;
    teacher_id?: string | number;
    aspect?: string;
    is_main: boolean;
    is_change?: boolean;
    assesment_number: string | number;
    title: string;
    description: string;
    icon?: string;
    frequency?: string;
    risk_category?: "other" | "rendah" | "sedang" | "tinggi";
};

const formSchema = Yup.object().shape({
    teacher_id: Yup.string(),
    title: Yup.string().required("Judul wajib diisi"),
    assesment_number: Yup.string().required("Nomor asesment wajib dipilih"),
    description: Yup.string(), //.required("Deskripsi wajib diisi")
    icon: Yup.string().required("Gambar tidak boleh kosong"),
    frequency: Yup.string().required("Frekuensi wajib diisi"),
    risk_category: Yup.string().required("Kategori risiko wajib diisi"),
});

const initialValues: Recommendation = {
    id_temp: 0,
    teacher_id: "",
    aspect: "",
    is_main: false,
    is_change: false,
    title: "",
    assesment_number: "",
    description: "",
    frequency: "",
    icon: "",
    risk_category: "other",
};

export default function AssessmentGetRecommendations({
    child,
    assessmentAnswer,
    handleBackStage,
    removeAssessmentAnswer,
    isLoading,
}: AssessmentGetRecommendationsProps) {
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const [isLoadingPost, setIsLoadingPost] = useState<boolean>(false);
    const [riskCategory, setRiskCategory] = useState<string>("");
    const [newRecommendations, setNewRecommendations] = useState<
        Recommendation[]
    >([]);
    const [recommendations, setRecommendations] = useState<Recommendation[]>(
        []
    );
    const [assessmentFails, setAssessmentFails] = useState<AssessmentAnswer[]>(
        []
    );
    const [isLoadingAI, setIsLoadingAI] = useState<boolean>(false);
    const { count, increment, decrement, setCount } = useCounter(0);
    const { profile, isReady } = useProfile();

    const { id } = useParams();
    const { push } = useRouter();

    const fetchRecommendations = async () => {
        setIsLoadingPost(true);

        const data = createDataObject(
            assessmentAnswer.filter(
                (item) => item.answer === "tidak" || item.answer == "gagal"
            )
        );

        await axios
            .get(`/api/recommendations?data=${JSON.stringify(data)}`)
            .then((res) => {
                toast.success("Berhasil mendapatkan rekomendasi!");
                setRecommendations(res.data?.recommendations || []);
                console.log(res.data);

                setIsLoadingPost(false);
            })
            .catch((err) => {
                if (err?.response.status === 400) {
                    toast.error(err?.response?.data?.message);
                } else if (err?.response.status === 500) {
                    toast.error("Server Error");
                } else {
                    toast.error("Terjadi kesalahan");
                }
                setIsLoadingPost(false);
            });
    };

    const createDataObject = (inputArray: AssessmentAnswer[]) => {
        const assesments = inputArray.map((item) => ({
            assesment_number:
                item.assesment?.assesment_number || item.assesment_id,
        }));

        return {
            risk_category: riskCategory,
            assesments,
        };
    };

    const createDataObjectFinal = () => {
        const currentDate = new Date();

        const assessmentsAnswer = assessmentAnswer.map((item) => ({
            assessment_id: item.assesment_id,
            answer: item.answer,
        }));

        const childRecommendations = recommendations.map((recommendation) => {
            if (recommendation.id) {
                return {
                    recommendation_id: recommendation.id,
                    child_id: child?.id || null,
                };
            } else {
                return {
                    assesment_number: recommendation.assesment_number,
                    is_main: recommendation.is_main,
                    title: recommendation.title,
                    description: recommendation.description,
                    icon: recommendation.icon,
                    frequency: recommendation.frequency,
                    risk_category: recommendation.risk_category,
                    child_id: child?.id || null,
                };
            }
        });

        return {
            child_id: child?.id || null,
            date_time: currentDate,
            riskCategory,
            assessmentsAnswer,
            childRecommendations,
        };
    };

    const getAIRecommendations = async () => {
        setIsLoadingAI(true);
        try {
            await axios
                .post("/api/ai/recommendations", {
                    assesment: assessmentFails,
                    risk_category: riskCategory,
                    child,
                })
                .then((res) => {
                    const newRecommendations = JSON.parse(res.data.text);
                    let countRec = count;
                    const newRecommendationsFinal = newRecommendations.map(
                        (recommendation: Recommendation) => {
                            countRec++;
                            return {
                                ...recommendation,
                                id_temp: countRec,
                                is_change: true,
                            };
                        }
                    );
                    setCount(countRec);

                    if (
                        Array.isArray(newRecommendationsFinal) &&
                        newRecommendationsFinal.every(isRecommendationResponse)
                    ) {
                        setNewRecommendations((prev) => [
                            ...prev,
                            ...newRecommendationsFinal,
                        ]);
                    } else {
                        toast.error(
                            "Response tidak sesuai dengan tipe yang diharapkan"
                        );
                    }

                    toast.success("Berhasil mendapatkan rekomendasi AI!", {
                        duration: 1000,
                    });
                    console.log(newRecommendationsFinal);
                })
                .catch((error) => {
                    console.log(error);
                    toast.error(
                        error?.response?.data?.message ||
                            error?.message ||
                            "Terjadi kesalahan"
                    );
                });

            setIsLoadingAI(false);
            // const data = await response.json();
            // setRecommendations(data.recommendations);
        } catch (error) {
            console.error("Error fetching recommendations:", error);
            setIsLoadingAI(false);
        }
    };

    // const transformRecommendation = (data: Recommendation[]) => {
    //     return data.map((recommendation) => ({
    //         title: recommendation.title,
    //         description: recommendation.description,
    //         icon: recommendation.icon,
    //         frequency: recommendation.frequency,
    //         risk_category:
    //             recommendation.risk_category === "other"
    //                 ? undefined
    //                 : recommendation.risk_category,
    //     }));
    // };

    const removeRecommendation = (id: string) => {
        console.log("Assessment Removed", id, recommendations);
        setRecommendations((prevRecommendations) =>
            prevRecommendations.filter((item) => item.id.toString() !== id)
        );
    };

    const removeNewRecommendation = (id: string) => {
        // console.log("Assessment New Removed", id, newRecommendations);
        // setNewRecommendations((prevNewRecommendations) =>
        //     prevNewRecommendations.filter(
        //         (item) => item.assesment_number !== id
        //     )
        // );

        console.log("Assessment New Removed", id, newRecommendations);
        setNewRecommendations((prevNewRecommendations) =>
            prevNewRecommendations.filter(
                (item) => item.id_temp.toString() !== id
            )
        );
    };

    const handleSubmitRecommendation = async () => {
        setIsLoadingPost(true);

        const data = createDataObjectFinal();
        let finalData = {
            teacher_id: profile?.id,
            child_id: data.child_id.toString(),
            date_time: data.date_time,
            risk_category: riskCategory,
            assessmentsAnswer: data.assessmentsAnswer,
            childRecommendations: [
                ...data.childRecommendations,
                ...newRecommendations,
            ],
        };

        const submitPromise = new Promise<void>(async (resolve, reject) => {
            try {
                await axios.post("/api/recommendations", finalData);
                resolve();
            } catch (error) {
                reject(error);
            }
        });

        try {
            // console.log(finalData);
            toast.promise(submitPromise, {
                loading: "Mengirim rekomendasi...",
                success: () => {
                    push(`/t/students/${id}`);
                    removeAssessmentAnswer();
                    return "Berhasil mengirim rekomendasi!";
                },
                error: (err) => {
                    if (err?.response?.status === 400) {
                        return (
                            err?.response?.data?.message ||
                            "Gagal mengirim rekomendasi"
                        );
                    } else if (err?.response?.status === 500) {
                        return "Server Error";
                    } else {
                        return "Terjadi kesalahan";
                    }
                },
                duration: 1000,
            });
        } catch (error: any) {
            console.log(error);
            console.error("Error sending recommendation:", error?.message);
        } finally {
            setIsLoadingPost(false);
        }
    };

    // const handleSubmitRecommendation = async () => {
    //     setIsLoadingPost(true);

    //     const data = createDataObjectFinal();
    //     let finalData = {
    //         child_id: data.child_id,
    //         date_time: data.date_time,
    //         assessmentsAnswer: data.assessmentsAnswer,
    //         childRecommendations: [
    //             ...data.childRecommendations,
    //             ...newRecommendations,
    //         ],
    //     };
    //     console.log(finalData);

    //     try {
    //         // setIsLoadingPost(false);
    //         await axios.post("/api/recommendations", finalData);
    //         toast.success("Berhasil mengirim rekomendasi!");
    //         removeAssessmentAnswer();
    //         push(`/t/students/${child?.id}`);
    //     } catch (err: any) {
    //         if (err?.response?.status === 400) {
    //             toast.error(err?.response?.data?.message);
    //         } else if (err?.response?.status === 500) {
    //             toast.error("Server Error");
    //         } else {
    //             toast.error("Terjadi kesalahan");
    //         }
    //     } finally {
    //         setIsLoadingPost(false);
    //     }
    // };

    const formik = useFormik({
        initialValues,
        validationSchema: formSchema,
        onSubmit: async (values) => {
            let newValues = {
                ...values,
                teacher_id:
                    typeof profile?.id === "number"
                        ? profile.id.toString()
                        : profile?.id,
                id_temp: count,
            };
            increment();

            if (values.is_change) {
                const updatedRecommendations = newRecommendations.map(
                    (recommendation) =>
                        recommendation.id_temp === values.id_temp
                            ? newValues
                            : recommendation
                );

                setNewRecommendations(updatedRecommendations);
            } else {
                setNewRecommendations([...newRecommendations, newValues]);
            }

            console.log([...newRecommendations, values], recommendations);

            formik.resetForm();
        },
    });

    useEffect(() => {
        const risk = getRiskCategory({
            childAssesment: assessmentAnswer,
            type: "awal",
        });
        setRiskCategory(risk);
    });

    useEffect(() => {
        if (riskCategory) {
            fetchRecommendations();
        }
    }, [riskCategory]);

    useEffect(() => {
        if (assessmentAnswer.length > 0) {
            const failedAssessments = assessmentAnswer.filter((item) => {
                return item.answer === "tidak" || item.answer === "gagal";
            });
            setAssessmentFails(failedAssessments);
        } else {
            setAssessmentFails([]);
        }
    }, [assessmentAnswer]);

    return (
        <section className="mx-auto max-w-7xl flex flex-col justify-center items-center w-full h-full gap-2 p-2">
            <div className="w-full border border-gray-300 rounded-lg p-2 dark:border-neutral-600">
                <div>
                    <p className="text-gray-400 text-xs">
                        Rekomendasi Hasil Asesmen M-Chart-R/F
                    </p>
                    <p className="text-large tracking-tight font-semibold">
                        {child?.full_name || "N/A"}
                    </p>
                </div>
            </div>
            <div className="w-full border border-gray-300 rounded-lg mt-3 p-3 overflow-hidden dark:border-neutral-600">
                <div className="rounded-lg p-4 w-full flex items-center text-white bg-primary h-fit sm:min-h-24">
                    <div>
                        <p className="text-xs -mb-1">Kategori</p>
                        <p className="font-semibold tracking-tight text-large">
                            {riskCategory || "N/A"}
                        </p>
                    </div>
                </div>
                <div className="w-full justify-between items-center my-3 sm:flex group-[.open]:block md:group-[.open]:flex">
                    {isDesktop ? (
                        <RecomendationFormDesktop
                            formik={formik}
                            isSubmit={
                                isSubmit || isLoadingPost || isLoading || false
                            }
                            assessmentFails={assessmentFails}
                        />
                    ) : (
                        <RecomendationForm
                            formik={formik}
                            isSubmit={
                                isSubmit || isLoadingPost || isLoading || false
                            }
                            assessmentFails={assessmentFails}
                        />
                    )}
                    <Button
                        variant={"default"}
                        className="gap-1 w-full mt-2 sm:w-fit sm:mt-0 group-[.open]:mt-2 md:group-[.open]:mt-0 group-[.open]:w-full md:group-[.open]:w-fit"
                        disabled={
                            isSubmit ||
                            isLoading ||
                            isLoadingPost ||
                            isLoadingAI
                        }
                        onClick={getAIRecommendations}
                        // disabled={isLoading || isLoadingPost}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                        >
                            <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.73 1.73 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.73 1.73 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.73 1.73 0 0 0 3.407 2.31zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z" />
                        </svg>
                        <span>
                            Rekomendasi AI{" "}
                            {isLoadingAI && (
                                <span className="loading loading-spinner loading-sm"></span>
                            )}
                        </span>
                    </Button>
                </div>
                <div className="flex flex-col gap-3">
                    {isLoading && (
                        <>
                            <div className="skeleton rounded-lg h-28 w-full"></div>
                            <div className="skeleton rounded-lg h-28 w-full"></div>
                            <div className="skeleton rounded-lg h-28 w-full"></div>
                        </>
                    )}

                    {!isLoading &&
                        recommendations.length === 0 &&
                        newRecommendations.length === 0 && (
                            <div>
                                <p className="text-center text-small">
                                    Tidak ada rekomendasi
                                </p>
                            </div>
                        )}

                    {!isLoading &&
                        recommendations &&
                        recommendations.length > 0 &&
                        recommendations.map((recommendation) => (
                            <CreateRecomendationCard
                                key={recommendation.id}
                                recommendation={recommendation}
                                onDelete={removeRecommendation}
                                formik={formik}
                                assessmentFails={assessmentFails}
                            />
                        ))}

                    {newRecommendations &&
                        newRecommendations.length > 0 &&
                        newRecommendations.map((recommendation, idx) => (
                            <CreateRecomendationCard
                                key={idx}
                                recommendation={recommendation}
                                onDelete={removeNewRecommendation}
                                formik={formik}
                                assessmentFails={assessmentFails}
                            />
                        ))}
                </div>
            </div>
            <div className="flex gap-3 w-full mb-3 justify-between sm:justify-end">
                <Button
                    variant={"outline"}
                    className="gap-1"
                    onClick={handleBackStage}
                    disabled={isLoading || isLoadingPost}
                >
                    <span className="material-symbols-outlined !text-xl !leading-none pointer-events-none">
                        chevron_left
                    </span>
                    <span>Kembali</span>
                </Button>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button
                            variant={"outline"}
                            className="gap-1"
                            disabled={
                                isLoading ||
                                isSubmit ||
                                isLoadingPost ||
                                isLoadingAI
                            }
                        >
                            <span>Selesai &amp; Kirim</span>
                            <span className="material-symbols-outlined !text-xl !leading-none pointer-events-none">
                                check
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
                                    Pastikan data yang akan dikirimkan sudah
                                    benar dan sesuai
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter className="mt-3">
                                <AlertDialogCancel>Kembali</AlertDialogCancel>
                                <AlertDialogAction asChild>
                                    {/* <Button>Apus</Button> */}

                                    <Button
                                        variant={"default"}
                                        onClick={handleSubmitRecommendation}
                                        disabled={isLoading || isLoadingPost}
                                    >
                                        Submit
                                    </Button>
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </ScrollArea>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </section>
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

    const handleReset = () => {
        formik.resetForm();
    };

    // useEffect(() => {
    //     if (recommendation) {
    //         setIsAdd(false);
    //         formik.setValues({
    //             ...recommendation,
    //         });
    //     }
    // }, [recommendation]);

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button
                    variant={"outline"}
                    className="gap-1 w-full mt-2 sm:w-fit sm:mt-0 group-[.open]:mt-2 md:group-[.open]:mt-0 group-[.open]:w-full md:group-[.open]:w-fit"
                >
                    <span>Tambah Rekomendasi</span>
                    <span className="material-symbols-outlined !text-xl !leading-none pointer-events-none">
                        assignment_add
                    </span>
                </Button>
            </DrawerTrigger>
            <DrawerContent className="p-0">
                <ScrollArea className="p-0 max-h-svh overflow-auto">
                    <DrawerHeader className="text-left">
                        <DrawerTitle>Tambah Rekomendasi</DrawerTitle>
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
                                Tambah
                            </Button>
                        </DrawerClose>
                        <Button
                            variant="secondary"
                            onClick={handleReset}
                            disabled={isSubmit}
                        >
                            Reset
                        </Button>
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
    // const [isAdd, setIsAdd] = useState(true);
    const handleReset = () => {
        formik.resetForm();
    };

    // useEffect(() => {
    //     if (recommendation) {
    //         setIsAdd(false);
    //         formik.setValues({
    //             ...recommendation,
    //         });
    //     }
    // }, [recommendation]);

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    variant={"outline"}
                    className="gap-1 w-full mt-2 sm:w-fit sm:mt-0 group-[.open]:mt-2 md:group-[.open]:mt-0 group-[.open]:w-full md:group-[.open]:w-fit"
                >
                    <span>Tambah Rekomendasi</span>
                    <span className="material-symbols-outlined !text-xl !leading-none pointer-events-none">
                        assignment_add
                    </span>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="p-0">
                <ScrollArea className="max-h-[80vh] p-3">
                    <AlertDialogHeader className="m-1">
                        <AlertDialogTitle>Tambah Rekomendasi</AlertDialogTitle>
                        <div className="divider my-1 dark:after:!bg-neutral-600 dark:before:!bg-neutral-600"></div>
                        <AddRecomendationForm
                            formik={formik}
                            assessmentFails={assessmentFails}
                        />
                        <AlertDialogDescription></AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <Button
                            variant="outline"
                            onClick={handleReset}
                            disabled={isSubmit}
                        >
                            Reset
                        </Button>
                        <AlertDialogAction asChild>
                            <Button
                                variant={"default"}
                                onClick={formik.submitForm}
                                disabled={isSubmit}
                            >
                                Tambah
                            </Button>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </ScrollArea>
            </AlertDialogContent>
        </AlertDialog>
    );
};
