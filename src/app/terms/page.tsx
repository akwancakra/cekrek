"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import Image from "next/image";
import {
    getRecommendationImageUrl,
    isRecommendationResponse,
} from "@/utils/converters";

type RecommendationResponse = {
    title: string;
    aspect: string;
    description: string;
    frequency: string;
    icon: string;
};

export default function Terms() {
    const [assessment, setAssessment] = useState([
        {
            aspect: "Kemampuan Berhitung",
            // answer: "tidak",
            description:
                "Anak mengalami kesulitan dalam memahami konsep dasar matematika, seperti penjumlahan dan pengurangan sederhana.",
        },
        {
            aspect: "Kemampuan Mengikuti Perintah",
            // answer: "tidak",
            description:
                "Apakah anak dapat mengikuti perintah seperti menujuk suatu dan melihat suatu hal yang ditunjuk?",
        },
    ]);
    const [recommendations, setRecommendations] = useState<
        RecommendationResponse[]
    >([]);
    const [riskCategory, setRiskCategory] = useState("sedang");
    const [isLoading, setisLoading] = useState(false);

    const child = {
        id: 1,
        full_name: "Muhammad Alif Nashrulloh",
        teacher_id: 1,
        nick_name: "Alif",
        picture: null,
        gender: "laki-laki",
        place_birth: "Bandung",
        date_time_birth: "2016-09-27T00:00:00.000Z",
        religion: "Islam",
        count_of_siblings: null,
        risk_category: "tinggi",
        hearing_test: "normal",
        created_at: "2024-07-08T02:33:47.751Z",
        updated_at: null,
        birth_history: {
            id: 1,
            child_id: 1,
            healthy_pregnancy: "ya",
            pregnancy_illness: "tidak ada",
            gestation_details: "38 minggu, 3.5kg, 50cm",
            birthplace: "rumah sakit",
            birth_assistance: "dokter",
            delivery_process: "normal",
            congenital_anomalies: "tidak ada",
            first_food: "MPASI",
            formula_milk: "3 sampai 23 bulan",
            immunization: "lengkap",
        },
        health_status: {
            id: 1,
            child_id: 1,
            serious_illness: "tidak",
            current_diseases: "-",
            treatment_location: "-",
            treatment_duration: "-",
            general_comparison: "normal",
            crawling_development: "normal",
            sitting_development: "normal",
            walking_development: "normal",
            first_words_age: "1 tahun",
            speaking_fluency_age: "2 tahun",
            bedwetting: "tidak ada kelainan",
        },
        expert_examination: {
            id: 1,
            child_id: 1,
            pediatrician: "ASD",
            rehabilitation: "ASD",
            psychologist: "tidak ada",
            therapist: "ASD",
        },
    };

    const getRecommendations = async () => {
        setisLoading(true);
        try {
            await axios
                .post("/api/ai/recommendations", {
                    assesment: assessment,
                    risk_category: riskCategory,
                    child,
                })
                .then((res) => {
                    const newRecommendations = JSON.parse(res.data.text);

                    if (
                        Array.isArray(newRecommendations) &&
                        newRecommendations.every(isRecommendationResponse)
                    ) {
                        setRecommendations((prev) => [
                            ...prev,
                            ...newRecommendations,
                        ]);
                    } else {
                        toast.error(
                            "Response tidak sesuai dengan tipe yang diharapkan"
                        );
                    }

                    console.log(newRecommendations);
                })
                .catch((error) => {
                    console.log(error);
                    toast.error(
                        error?.response?.data?.message ||
                            error?.message ||
                            "Terjadi kesalahan"
                    );
                });

            setisLoading(false);
            // const data = await response.json();
            // setRecommendations(data.recommendations);
        } catch (error) {
            console.error("Error fetching recommendations:", error);
            setisLoading(false);
        }
    };

    return (
        <div className="min-h-svh max-w-2xl mx-auto py-20">
            <h1 className="mb-3">Rekomendasi Aktivitas</h1>
            <Button
                variant="outline"
                onClick={getRecommendations}
                className="mb-3 gap-1"
                disabled={isLoading}
            >
                Dapatkan Rekomendasi{" "}
                {isLoading && (
                    <span className="loading loading-spinner loading-sm"></span>
                )}
            </Button>
            {recommendations.length > 0 && (
                <div>
                    <h2 className="mb-3">Rekomendasi</h2>
                    {recommendations.map((recommendation, idx) => (
                        <div
                            key={idx}
                            className="border border-gray-300 p-3 mb-3"
                        >
                            <Image
                                src={getRecommendationImageUrl({
                                    image: recommendation.icon,
                                })}
                                alt={recommendation.title}
                                width={100}
                                height={100}
                            />
                            <h3>{recommendation.title}</h3>
                            <p className="font-semibold">Deskripsi</p>
                            <p>{recommendation.description}</p>
                            <p>Frekuensi: {recommendation.frequency}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
