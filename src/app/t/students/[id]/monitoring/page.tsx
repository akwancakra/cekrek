"use client";

import AssessmentChoicePass from "@/components/elements/assessments/AssessmentChoicePass";
import { Child } from "@/types/children.types";
import { fetcher, getChildrenImage } from "@/utils/fetcher";
import {
    capitalizeFirstLetter,
    formattedDate,
    formattedDateStripYearFirst,
} from "@/utils/formattedDate";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useCounter } from "usehooks-ts";
import { toast } from "sonner";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Button } from "@/components/ui/button";
import RecomendationCard from "@/components/elements/cards/RecomendationCard";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";
import Image from "next/image";
import useProfile from "@/utils/useProfile";

export default function MonitoringRecommendations() {
    const [student, setStudent] = useState<Child>();
    const { count, setCount, increment, decrement } = useCounter(1);
    const [answers, setAnswers] = useState<string[]>([]);
    const [isSubmit, setIsSubmit] = useState(false);
    const { profile, isReady } = useProfile();

    const today = formattedDateStripYearFirst(new Date().toString());
    const { id } = useParams();
    const { push, back } = useRouter();

    const searchParams = useSearchParams();
    const date = searchParams.get("date") || today;

    const { data, isLoading } = useSWR<{ status: string; child: Child }>(
        isReady &&
            profile?.id &&
            `/api/teachers/${profile?.id}/students/${id}/recommendations?date=${date}`,
        fetcher
    );

    // const handleNextRecommendation = (index: number, answer: string) => {
    //     if (student?.child_recommendations) {
    //         handleSaveAnswer({ answer }, index);
    //         if (count < student.child_recommendations.length) {
    //             increment();
    //         }
    //     }
    // };
    // const handleBackRecommendation = (index: number, answer: string) => {
    //     if (student?.child_recommendations) {
    //         handleSaveAnswer({ answer }, index);
    //         if (count > 1) {
    //             decrement();
    //         }
    //     }
    // };

    const handleSaveAnswer = (answer: { answer: string }, index: number) => {
        console.log("Answer: " + answer.answer + ", Index: " + index);

        let newAnswers = [...answers];
        newAnswers[index - 1] = answer.answer; // Menggunakan index - 1 karena count dimulai dari 1

        setAnswers(newAnswers);
        console.log("New Answers: " + newAnswers);

        validateAnswersBeforePreview(newAnswers);
    };

    const validateAnswersBeforePreview = (answersAll: string[]) => {
        if (student?.child_recommendations) {
            if (count === student.child_recommendations.length) {
                let isValid = true;
                student.child_recommendations.forEach((_, index) => {
                    // console.log(index);
                    if (!answersAll[index]) {
                        toast.error(
                            "Jawaban rekomendasi ke " +
                                (index + 1) +
                                " tidak boleh kosong"
                        );
                        isValid = false;
                    }
                });

                if (isValid) {
                    increment();
                }
            } else {
                increment();
            }
        }
    };

    // const handleSubmit = () => {
    //     setIsSubmit(true);
    //     if (student?.child_recommendations) {
    //         const finalAnswers = answers.map((answer, index) => {
    //             return {
    //                 answer,
    //                 child_recommendation_id:
    //                     student.child_recommendations[index].id,
    //             };
    //         });
    //         console.log("submiteed");
    //         console.log(finalAnswers);
    //     }
    //     setIsSubmit(false);
    // };

    const handleSubmit = async () => {
        setIsSubmit(true);

        if (student?.child_recommendations?.length) {
            const finalAnswers = answers.map((answer, index) => {
                return {
                    answer,
                    child_recommendation_id:
                        student.child_recommendations[index].id,
                };
            });

            const submitPromise = new Promise<void>(async (resolve, reject) => {
                try {
                    await axios.post("/api/monitoring", {
                        date: today,
                        data: finalAnswers,
                        with_whom: "teacher",
                        teacher_id: profile?.id,
                    });
                    resolve();
                } catch (error) {
                    reject(error);
                }
            });

            toast.promise(submitPromise, {
                loading: "Mengirimkan jawaban...",
                success: () => {
                    push(`/t/students/${id}/recommendation`);
                    return "Jawaban monitoring tersimpan!";
                },
                error: (err: any) => {
                    console.log(err);
                    return "Terjadi kesalahan, coba lagi nanti.";
                },
            });
        } else {
            console.error("child_recommendations is undefined or empty");
        }
        setIsSubmit(false);
    };

    useEffect(() => {
        if (today != date) back();
    }, [date]);

    useEffect(() => {
        if (data?.child) {
            setStudent(data.child);
        }
    }, [isLoading, data]);

    return (
        <>
            {isLoading ? (
                <div className="mx-auto max-w-lg flex flex-col justify-center items-center min-h-svh h-full gap-2 p-2">
                    <div className="skeleton h-8 w-1/3 rounded-lg"></div>
                    <div className="skeleton w-full">
                        <AspectRatio ratio={16 / 9}></AspectRatio>
                    </div>
                    <div className="skeleton h-8 w-1/2 rounded-lg"></div>
                    <div className="skeleton h-8 w-full rounded-lg"></div>
                    <div className="skeleton h-8 w-3/4 rounded-lg"></div>
                </div>
            ) : student?.child_recommendations &&
              count <= student.child_recommendations.length ? (
                <div className="mx-auto max-w-2xl flex flex-col justify-center items-center min-h-svh h-full gap-2 p-2">
                    <QuestionChoice
                        count={count}
                        setCount={setCount}
                        student={student}
                        handleSaveAnswer={handleSaveAnswer}
                    />
                </div>
            ) : (
                <>
                    <section className="mx-auto max-w-7xl">
                        <Button
                            variant={"outline"}
                            className="mb-3"
                            onClick={() => setCount(1)}
                        >
                            <span className="material-symbols-outlined cursor-pointer !text-xl !leading-none">
                                arrow_back
                            </span>{" "}
                            Kembali
                        </Button>
                        <div>
                            <div className="flex justify-between gap-2">
                                <p className="font-semibold tracking-tight text-xlarge">
                                    Monitor {student?.full_name || "Nama"}
                                </p>
                                <p className="font-semibold tracking-tight text-xlarge">
                                    {formattedDate(new Date().toString())}
                                </p>
                            </div>
                            <div className="divider my-1"></div>
                            <div className="sm:flex group-[.open]:block md;group-[.open]:flex">
                                <div className=" w-full sm:pe-3 sm:w-2/3 group-[.open]:pe-0 md:group-[.open]:pe-3 group-[.open]:w-full md:group-[.open]:w-2/3">
                                    <div className="border border-gray-300 rounded-lg p-3 mb-3">
                                        <div>
                                            <p className="text-medium font-semibold">
                                                Biodata
                                            </p>
                                            <div className="divider my-1"></div>
                                        </div>
                                        <div className="grid gap-2 gap-y-2 mb-3 sm:grid-cols-2 md:group-[.open]:grid-cols-2">
                                            <div className="mb-3">
                                                <p className="text-xs to-gray-400">
                                                    Nama
                                                </p>
                                                <p className="text-medium font-semibold">
                                                    {student?.full_name ||
                                                        "N/A"}
                                                </p>
                                            </div>
                                            <div className="mb-3">
                                                <p className="text-xs to-gray-400">
                                                    Tanggal Lahir
                                                </p>
                                                <p className="text-medium font-semibold">
                                                    {student?.date_time_birth
                                                        ? formattedDate(
                                                              student.date_time_birth.toString()
                                                          )
                                                        : "N/A"}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs to-gray-400">
                                                    Jenis Kelamin
                                                </p>
                                                <p className="text-medium font-semibold">
                                                    {student?.gender
                                                        ? capitalizeFirstLetter(
                                                              student.gender
                                                          )
                                                        : "N/A"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border border-gray-300 rounded-lg p-3">
                                        <div>
                                            <p className="text-medium font-semibold">
                                                Hasil monitoring
                                            </p>
                                            <div className="divider my-1"></div>
                                            <div>
                                                {student?.child_recommendations?.map(
                                                    (rec, idx) =>
                                                        rec?.recommendations ? (
                                                            <RecomendationCard
                                                                key={idx}
                                                                recommendation={
                                                                    rec.recommendations
                                                                }
                                                                isDone={
                                                                    answers[
                                                                        idx
                                                                    ] == "ya"
                                                                        ? true
                                                                        : false
                                                                }
                                                            />
                                                        ) : null
                                                )}
                                            </div>
                                            <div className="divider my-1"></div>
                                            <div className="flex justify-end">
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button
                                                            variant={"default"}
                                                            className="gap-1"
                                                        >
                                                            Selesai & Simpan{" "}
                                                            <span className="material-symbols-outlined cursor-pointer !text-xl !leading-none">
                                                                save
                                                            </span>
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent className="p-0">
                                                        <ScrollArea className="max-h-[80vh] p-3">
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>
                                                                    Apakah kamu
                                                                    yakin?
                                                                </AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    Ini akan
                                                                    menyimpan
                                                                    data
                                                                    monitoring
                                                                    pada hari
                                                                    ini.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter className="mt-3">
                                                                <AlertDialogCancel>
                                                                    Kembali
                                                                </AlertDialogCancel>
                                                                <AlertDialogAction
                                                                    asChild
                                                                >
                                                                    {/* <Button>Apus</Button> */}

                                                                    <Button
                                                                        variant={
                                                                            "default"
                                                                        }
                                                                        onClick={
                                                                            handleSubmit
                                                                        }
                                                                        disabled={
                                                                            isLoading ||
                                                                            isSubmit
                                                                        }
                                                                    >
                                                                        Submit
                                                                    </Button>
                                                                </AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </ScrollArea>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col items-center w-full mt-3 group-[.open]:mt-3 group-[.open]:w-full lg:group-[.open]:w-1/3 lg:group-[.open]:mt-0 md:w-1/3 md:mt-0">
                                    <div className="relative rounded-lg bg-gray-400 max-w-xs w-full lg:max-w-none">
                                        <AspectRatio ratio={3 / 4}>
                                            <Image
                                                src={
                                                    student?.picture
                                                        ? getChildrenImage(
                                                              student.picture
                                                          )
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
                            </div>
                        </div>
                    </section>
                </>
            )}
        </>
    );
    //     <>
    //     {student?.child_recommendations &&
    //                 count <= student.child_recommendations.length ? (
    //                     <>
    //                         <QuestionChoice
    //                             count={count}
    //                             setCount={setCount}
    //                             student={student}
    //                             handleSaveAnswer={handleSaveAnswer}
    //                         />
    //                     </>
    //                 ) : (
    //         {isLoading ? (
    //             <div className="mx-auto max-w-lg flex flex-col justify-center items-center min-h-svh h-full gap-2 p-2">
    //                 <div className="skeleton h-8 w-1/3 rounded-lg"></div>
    //                 <div className="skeleton w-full">
    //                     <AspectRatio ratio={16 / 9}></AspectRatio>
    //                 </div>
    //                 <div className="skeleton h-8 w-1/2 rounded-lg"></div>
    //                 <div className="skeleton h-8 w-full rounded-lg"></div>
    //                 <div className="skeleton h-8 w-3/4 rounded-lg"></div>
    //             </div>
    //         ) : (
    //             <div className="mx-auto max-w-2xl flex flex-col justify-center items-center min-h-svh h-full gap-2 p-2">

    //             </div>
    //         )}
    //         <>
    //         <div>
    //             <p className="font-semibold tracking-tighter text-xl sm:text-2xl">
    //                 Monitor {today}
    //             </p>
    //             <div className="divider my-1"></div>
    //         </div>
    //     </>
    // )}
    //     </>
    // );
}

interface Props {
    count: number;
    setCount: React.Dispatch<React.SetStateAction<number>>;
    student: Child;
    handleSaveAnswer: (answer: { answer: string }, index: number) => void;
}

const QuestionChoice = ({
    count,
    setCount,
    student,
    handleSaveAnswer,
}: Props) => {
    if (student?.child_recommendations) {
        return (
            <>
                <Select
                    value={`${count.toString()}`}
                    defaultValue={`${count.toString()}`}
                    onValueChange={(value: string) =>
                        setCount(Number(parseInt(value)))
                    }
                >
                    <SelectTrigger className="w-fit min-w-24">
                        <SelectValue placeholder="Pilih Nomor" />
                    </SelectTrigger>
                    <SelectContent>
                        {student.child_recommendations.map((_, index) => (
                            <SelectItem
                                key={index}
                                value={(index + 1).toString()}
                            >
                                Rekomendasi {index + 1}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <AssessmentChoicePass
                    index={count}
                    recommendation={student.child_recommendations[count - 1]} // Menggunakan count - 1 untuk index array
                    handleSave={handleSaveAnswer}
                    // handleNext={handleNextRecommendation}
                    // handleBack={handleBackRecommendation}
                />
            </>
        );
    }
};
