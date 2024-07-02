import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function GET(req: any, { params }: any) {
    try {
        const url = new URL(req.url);
        const parentId = parseInt(params.id);
        const limit = url?.searchParams?.get("limit") || "10";
        const skip = url?.searchParams?.get("skip") || "0";
        const name_params = url?.searchParams?.get("name") || "";
        const limitRec = url?.searchParams?.get("limit-rec") || "5";
        const skipRec = url?.searchParams?.get("skip-rec") || "0";
        const limitAssess = url?.searchParams?.get("limit-assess") || "5";
        const skipAssess = url?.searchParams?.get("skip-assess") || "0";

        const date: string | Date =
            url?.searchParams?.get("date") || new Date();
        const startDate = new Date(date);
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 1);

        // Find children by parent id
        const children = await prisma.children.findMany({
            where: {
                full_name: { contains: name_params },
                parent: { some: { id: parentId } },
            },
            include: {
                birth_history: true,
                health_status: true,
                expert_examination: true,
                child_recommendations: {
                    include: {
                        recommendations: true,
                    },
                    take: parseInt(limitRec),
                    skip: parseInt(skipRec),
                },
                child_assesments: {
                    include: {
                        assesment: true,
                    },
                    take: parseInt(limitAssess),
                    skip: parseInt(skipAssess),
                },
                parent: true,
            },
            take: parseInt(limit),
            skip: parseInt(skip),
        });

        // Process and combine the recommendations and monitors
        const childrenWithRecommendations = await Promise.all(
            children.map(async (child) => {
                const totalRecommendationsCount =
                    await prisma.child_recommendations.count({
                        where: {
                            children_id: child.id,
                        },
                    });

                const monitors =
                    await prisma.monitor_child_recommendation.findMany({
                        where: {
                            child_recommendations: { children_id: child.id },
                            date_time: {
                                gte: startDate.toISOString(),
                                lt: endDate.toISOString(),
                            },
                        },
                        include: {
                            child_recommendations: true,
                        },
                    });

                const finishedRecommendations = monitors.filter(
                    (monitor) => monitor.is_done
                ).length;

                const recommendationsWithStatus =
                    child.child_recommendations.map((rec) => ({
                        ...rec,
                        isFinished: monitors.some(
                            (monitor) =>
                                monitor.child_recommendations.id === rec.id &&
                                monitor.is_done
                        ),
                    }));

                // Get the latest child_assesment for the current child
                const lastAssesment = await prisma.child_assesment.findFirst({
                    where: { children_id: child.id },
                    orderBy: { date_time: "desc" }, // order by date_time to get the latest one
                    select: { date_time: true }, // select only the date_time field
                });

                // Convert date_time to ISO string and extract the date part
                const lastAssesmentDate = lastAssesment
                    ? lastAssesment.date_time.toISOString().split("T")[0]
                    : null;

                return {
                    ...child,
                    totalRecommendation: totalRecommendationsCount,
                    child_recommendations: recommendationsWithStatus,
                    monitor_child_recommendation: monitors.map((monitor) => ({
                        ...monitor,
                        recommendations: child.child_recommendations
                            .filter(
                                (rec) =>
                                    rec.recommendation_id ===
                                    monitor.child_recommendations
                                        .recommendation_id
                            )
                            .map((rec) => ({
                                id: rec.id,
                                recommendation: rec.recommendations,
                                // tambahkan properti lain yang Anda perlukan
                            })),
                    })),
                    finishedRecommendations,
                    unfinishedRecommendations:
                        totalRecommendationsCount - finishedRecommendations,
                    last_assesment_date: lastAssesmentDate,
                };
            })
        );

        // Return the response
        return NextResponse.json(
            { status: "success", children: childrenWithRecommendations },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json(
            {
                status: "error",
                message: error.message || "Internal Server Error",
            },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const {
            parent_id,
            full_name,
            nick_name,
            gender,
            place_birth,
            date_time_birth,
            religion,
            count_of_siblings,
            risk_category,
            hearing_test,
            // Birth History
            healthy_pregnancy,
            pregnancy_illness,
            gestation_details,
            birthplace,
            birth_assistance,
            delivery_process,
            congenital_anomalies,
            first_food,
            formula_milk,
            immunization,
            // Health Status
            pediatrician,
            rehabilitation,
            psychologist,
            therapist,
            // Expert Examination
            serious_illness,
            current_diseases,
            treatment_location,
            treatment_duration,
            general_comparison,
            crawling_development,
            sitting_development,
            walking_development,
            first_words_age,
            speaking_fluency_age,
            bedwetting,
            // Recommendation
            recommendation_id,
            recommendation_type,
            recommendation_title,
            recommendation_description,
            recommendation_icon,
            recommendation_duration,
            recommendation_duration_type,
            recommendation_repetition,
            recommendation_risk_category,
        } = data;

        // if date time birth is not provided, set it to null
        if (!date_time_birth) {
            data.date_time_birth = null;
        }

        // Ensure date_time_birth is a valid Date object or null
        const birthDate = date_time_birth ? new Date(date_time_birth) : null;

        // Check is parent is valid
        const parent = await prisma.users.findUnique({
            where: { id: parent_id, role: "parent" },
        });
        if (!parent)
            return NextResponse.json(
                { status: "error", message: "Parent not found" },
                { status: 404 }
            );

        // Handle both single parent_id and array of parent_id
        const connectParents = Array.isArray(parent_id)
            ? parent_id.map((id) => ({ id }))
            : [{ id: parent_id }];

        // Create child
        const child = await prisma.children.create({
            include: {
                birth_history: true,
                expert_examination: true,
                health_status: true,
            },
            data: {
                full_name,
                nick_name,
                gender,
                place_birth,
                date_time_birth: birthDate,
                religion,
                count_of_siblings,
                risk_category,
                hearing_test,
                parent: {
                    connect: connectParents,
                },
                birth_history: {
                    create: {
                        healthy_pregnancy,
                        pregnancy_illness,
                        gestation_details,
                        birthplace,
                        birth_assistance,
                        delivery_process,
                        congenital_anomalies,
                        first_food,
                        formula_milk,
                        immunization,
                    },
                },
                expert_examination: {
                    create: {
                        pediatrician,
                        rehabilitation,
                        psychologist,
                        therapist,
                    },
                },
                health_status: {
                    create: {
                        serious_illness,
                        current_diseases,
                        treatment_location,
                        treatment_duration,
                        general_comparison,
                        crawling_development,
                        sitting_development,
                        walking_development,
                        first_words_age,
                        speaking_fluency_age,
                        bedwetting,
                    },
                },
            },
        });

        return NextResponse.json({ status: "success", child }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json(
            {
                status: "error",
                message: error.message || "Internal Server Error",
            },
            { status: 500 }
        );
    }
}
