"use client";

import React, { useEffect, useState } from "react";
import AssessmentChoice from "@/components/elements/assessments/AssessmentChoice";
import AssessmentChoose from "@/components/elements/assessments/AssessmentChoose";
import AssessmentGetRecomendations from "@/components/elements/assessments/AssessmentGetRecomendations";
import AssessmentResult from "@/components/elements/assessments/AssessmentResult";
import { fetcher } from "@/utils/fetcher";
import { useParams, useRouter } from "next/navigation";
import useSWR from "swr";
import { Child } from "@/types/children.types";
import { Assessment } from "@/types/assessment.types";
import { AssessmentAnswer } from "@/types/assessmentAnswer.copy";
import { useLocalStorage } from "usehooks-ts";

export default function AssessmentPage() {
    const [assessmentType, setAssessmentType] = useState<"umum" | "m-chart">();
    const [data, setData] = useState<Child>();
    const [assessmentData, setAssessmentData] = useState<Assessment[]>([]);
    const [currentStage, setCurrentStage] = useState(1);
    const [assessmentAnswers, setAssessmentAnswers] = useState<
        AssessmentAnswer[]
    >([]);
    const [value, setValue, removeValue] = useLocalStorage<AssessmentAnswer[]>(
        "assessment-answer",
        []
    );
    const stages = [
        "assessment-choose",
        "assessment-choice",
        "results",
        "recomendations",
    ];

    const { id } = useParams();
    const { back } = useRouter();

    const {
        data: childData,
        isLoading: isLoadingChild,
    }: { data: { status: string; child: Child }; isLoading: boolean } = useSWR(
        `/api/teachers/${1}/students/${id}`,
        fetcher
    );

    useEffect(() => {
        if (childData && childData.child) {
            setData(childData.child);
        } else if (childData && !childData.child) {
            back();
        }

        // Muat data dari localStorage jika ada
        if (value && value.length > 0) {
            setAssessmentAnswers(value);
        }
    }, [childData, back]);

    const chooseAssessmentType = (type: "umum" | "m-chart") => {
        setAssessmentType(type);
        handleNextStage();
    };

    const handleNextStage = () => {
        setCurrentStage(currentStage + 1);
    };

    const handleBackStage = () => {
        setCurrentStage(currentStage - 1);
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

        console.log("NEW: " + newAnswer);
        console.log("FULL: " + assessmentAnswers);
    };

    const removeAssessmentAnswer = () => {
        removeValue();
    };

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
                            removeAssessmentAnswer={removeAssessmentAnswer}
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
