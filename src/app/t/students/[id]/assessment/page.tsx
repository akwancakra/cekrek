"use client";

import React, { useEffect, useState } from "react";
import AssessmentChoice from "@/components/elements/assessments/AssessmentChoice";
import AssessmentChoose from "@/components/elements/assessments/AssessmentChoose";
import AssessmentGetRecomendations from "@/components/elements/assessments/AssessmentGetRecomendations";
import AssessmentResult from "@/components/elements/assessments/AssessmentResult";
import { fetcher } from "@/utils/fetcher";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";
import { Child } from "@/types/children.types";
import { Assessment } from "@/types/assessment.types";
import { AssessmentAnswer } from "@/types/assessmentAnswer.copy";
import { useCounter, useLocalStorage } from "usehooks-ts";
import useProfile from "@/utils/useProfile";

const stages = [
    "assessment-choose",
    "assessment-choice",
    "results",
    "recomendations",
];

export default function AssessmentPage() {
    const [assessmentType, setAssessmentType] = useState<"umum" | "m-chart">();
    const [data, setData] = useState<Child>();
    const [assessmentData, setAssessmentData] = useState<Assessment[]>([]);
    const { profile, isReady } = useProfile();
    // const [currentStage, setCurrentStage] = useState(1);
    const {
        count: currentStage,
        setCount: setCurrentStage,
        increment,
        decrement,
        reset,
    } = useCounter(1);
    const [assessmentAnswers, setAssessmentAnswers] = useState<
        AssessmentAnswer[]
    >([]);
    const [value, setValue, removeValue] = useLocalStorage<AssessmentAnswer[]>(
        "assessment-answer",
        []
    );

    const { id } = useParams();
    const { back, push, replace } = useRouter();
    const searchParams = useSearchParams();

    const {
        data: childData,
        isLoading: isLoadingChild,
    }: { data: { status: string; child: Child }; isLoading: boolean } = useSWR(
        isReady && profile?.id && `/api/teachers/${profile?.id}/students/${id}`,
        fetcher
    );

    const chooseAssessmentType = (type: "umum" | "m-chart") => {
        setAssessmentType(type);
        handleNextStage();
    };

    const handleNextStage = () => {
        if (currentStage !== stages.length) {
            const nextStageIndex = currentStage + 1;
            if (nextStageIndex <= stages.length) {
                // setCurrentStage(nextStageIndex);
                increment();
                push(
                    `/t/students/${id}/assessment?stage=${
                        stages[nextStageIndex - 1]
                    }`
                );
            }
        }
        // setCurrentStage(currentStage + 1);
    };

    const handleBackStage = () => {
        if (currentStage !== 1) {
            const previousStageIndex = currentStage - 1;
            if (previousStageIndex > 0) {
                decrement();
                // setCurrentStage(previousStageIndex);
                push(
                    `/t/students/${id}/assessment?stage=${
                        stages[previousStageIndex - 1]
                    }`
                );
            }
        }
        // setCurrentStage(currentStage - 1);
    };

    const saveNewAnswer = ({
        assesmentType,
        answer,
        assessmentId,
    }: {
        assesmentType: string;
        answer: string;
        assessmentId: string;
    }) => {
        const date = new Date().toString();

        // Cari data assessment berdasarkan assessmentId
        const assessment = assessmentData.find(
            (a: Assessment) => a.id.toString() === assessmentId
        );

        const newAnswer: AssessmentAnswer = {
            teacher_id: "1",
            children_id: childData.child.id.toString(),
            assesment_id: assessmentId,
            assesment_type: assesmentType,
            answer: answer,
            date_time: date,
            assesment: assessment, // Tambahkan data assessment
        };

        // Update atau tambah jawaban di assessmentAnswers
        setAssessmentAnswers((prevAnswers) => {
            const updatedAnswers = prevAnswers.map((a) =>
                a.assesment_id === assessmentId ? newAnswer : a
            );
            const isExistingAnswer = prevAnswers.some(
                (a) => a.assesment_id === assessmentId
            );
            return isExistingAnswer
                ? updatedAnswers
                : [...prevAnswers, newAnswer];
        });

        // Simpan ke local storage
        setValue((prevValue) => {
            const updatedValue = prevValue.map((a) =>
                a.assesment_id === assessmentId ? newAnswer : a
            );
            const isExistingValue = prevValue.some(
                (a) => a.assesment_id === assessmentId
            );
            return isExistingValue ? updatedValue : [...prevValue, newAnswer];
        });
    };

    useEffect(() => {
        if (!isLoadingChild && profile) {
            if (childData && childData.child) {
                setData(childData.child);
            } else {
                back(); // Panggil back() jika data tidak ada
            }
        }

        // Muat data dari localStorage jika ada
        if (value && value.length > 0) {
            setAssessmentAnswers(value);
        }
    }, [isLoadingChild, childData, back]);

    useEffect(() => {
        const stageParam = searchParams.get("stage");
        let initialStageIndex = 1;

        if (stageParam) {
            const stageIndex = stages.indexOf(stageParam) + 1;
            if (stageIndex > 0) {
                initialStageIndex = stageIndex;
            }
        }

        // Cek apakah panjang assessmentsAnswer sudah 20
        const isAssessmentsComplete = assessmentAnswers.length === 20;

        // Validasi akses ke "results" atau "recommendations"
        if (
            stages[initialStageIndex - 1] === "results" ||
            stages[initialStageIndex - 1] === "recommendations"
        ) {
            if (!isAssessmentsComplete) {
                initialStageIndex = 2; // Arahkan ke "assessment-choice" jika assessmentsAnswer belum lengkap
            }
        }

        setCurrentStage(initialStageIndex);
        replace(
            `/t/students/${id}/assessment?stage=${
                stages[initialStageIndex - 1]
            }`
        );

        // Arahkan ke stage pertama jika tidak ada parameter "stage"
        if (!stageParam) {
            setCurrentStage(1);
            replace(`/t/students/${id}/assessment?stage=${stages[0]}`);
        }
    }, [searchParams, assessmentAnswers]);

    const getStageComponent = () => {
        if (!isLoadingChild && data) {
            switch (currentStage) {
                case 1:
                    return (
                        <AssessmentChoose
                            student={data}
                            chooseAssessmentType={chooseAssessmentType}
                        />
                    );
                case 2:
                    return (
                        <AssessmentChoice
                            setAssessmentData={setAssessmentData}
                            assessmentAnswers={assessmentAnswers}
                            saveNewAnswer={saveNewAnswer}
                            handleBackStage={handleBackStage}
                            handleNextStage={handleNextStage}
                        />
                    );
                    break;
                case 3:
                    return (
                        <AssessmentResult
                            child={childData.child}
                            assessmentAnswer={assessmentAnswers}
                            handleBackStage={handleBackStage}
                            handleNextStage={handleNextStage}
                        />
                    );
                case 4:
                    return (
                        <AssessmentGetRecomendations
                            child={childData.child}
                            removeAssessmentAnswer={removeValue}
                            assessmentAnswer={assessmentAnswers}
                            handleBackStage={handleBackStage}
                        />
                    );
                default:
                    return null;
            }
        } else {
            return (
                <div className="flex min-h-screen justify-center items-center">
                    <div className="flex items-center gap-1">
                        <span className="loading loading-spinner loading-sm"></span>
                        <span>Memuat data...</span>
                    </div>
                </div>
            );
        }
    };

    return <div>{getStageComponent()}</div>;
}
