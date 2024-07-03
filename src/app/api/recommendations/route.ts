import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    try {
        // Extract query parameters
        const url = new URL(req.url);
        const limit = url?.searchParams?.get("limit");
        const skip = url?.searchParams?.get("skip");
        const name_params = url?.searchParams?.get("name") || "";
        const data = url?.searchParams?.get("data") || "";
        const main = url?.searchParams?.get("main");

        let recommendations;

        const queryOptions: any = {
            include: { children: true },
        };

        if (main) {
            queryOptions.where = { is_main: main === "true" ? true : false };
        }

        // Apply limit and skip if they exist
        if (limit) {
            queryOptions.take = parseInt(limit);
        }
        if (skip) {
            queryOptions.skip = parseInt(skip);
        }

        if (data) {
            const finalData = JSON.parse(data);
            const { risk_category, assessments } = finalData;

            const assessmentNumbers = Array.isArray(assessments)
                ? assessments.map((assessment) =>
                      parseInt(assessment.assessment_number)
                  )
                : [];

            queryOptions.where = {
                AND: [
                    { is_main: true },
                    {
                        OR: [
                            { risk_category: risk_category },
                            { risk_category: null },
                        ],
                    },
                    { assessment_number: { in: assessmentNumbers } },
                ],
            };
        } else {
            queryOptions.where = {
                title: { contains: name_params },
            };
        }

        recommendations = await prisma.recommendations.findMany(queryOptions);

        if (recommendations.length === 0) {
            return NextResponse.json(
                {
                    status: "error",
                    message: "No Recommendations Found",
                    recommendations: [],
                },
                { status: 200 }
            );
        }

        return NextResponse.json(
            { status: "success", recommendations },
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

        // Destructure data from request body
        const { child_id, date_time, assessmentsAnswer, childRecommendations } =
            data;

        const newDate = new Date(date_time);

        // Begin transaction
        const transaction = await prisma.$transaction(async (prisma) => {
            const createdRecommendations = [];

            // Create or link recommendations and child_recommendations
            for (const recommendation of childRecommendations) {
                if (recommendation.recommendation_id) {
                    // Create child_recommendations only
                    const childRecommendation =
                        await prisma.child_recommendations.create({
                            data: {
                                recommendation_id:
                                    recommendation.recommendation_id,
                                children_id: child_id,
                            },
                        });
                    createdRecommendations.push(childRecommendation);
                } else {
                    // Create new recommendation and corresponding child_recommendations
                    const newRecommendation =
                        await prisma.recommendations.create({
                            data: {
                                title: recommendation.title,
                                assesment_number:
                                    recommendation.assesment_number,
                                description: recommendation.description || null,
                                icon: recommendation.icon || null,
                                frequency: recommendation.frequency,
                                risk_category:
                                    recommendation.risk_category || null,
                                is_main: false,
                            },
                        });

                    const childRecommendation =
                        await prisma.child_recommendations.create({
                            data: {
                                recommendation_id: newRecommendation.id,
                                children_id: child_id,
                            },
                        });
                    createdRecommendations.push(childRecommendation);
                }
            }

            // Create child_assessments
            for (const assessment of assessmentsAnswer) {
                // console.log(assessment);
                await prisma.child_assesment.create({
                    data: {
                        answer: assessment.answer,
                        assesment_id: parseInt(assessment.assessment_id),
                        date_time: new Date(),
                        children_id: child_id,
                        assesment_type: "awal",
                    },
                });
            }

            return createdRecommendations;
        });

        return NextResponse.json(
            { status: "success", createdRecommendations: transaction },
            { status: 201 }
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

// PUNYA KRISNA SBLM UPDATE
// export async function POST(req: NextRequest) {
//     try {
//         const data = await req.json();
//         const {
//             title,
//             assesment_number,
//             description,
//             icon,
//             frequency,
//             risk_category,
//         } = data;

//         // Create user
//         const recommendation = await prisma.recommendations.create({
//             data: {
//                 title,
//                 assesment_number,
//                 description,
//                 icon,
//                 frequency,
//                 risk_category,
//             },
//         });

//         return NextResponse.json(
//             { status: "success", recommendation },
//             { status: 201 }
//         );
//     } catch (error: any) {
//         return NextResponse.json(
//             {
//                 status: "error",
//                 message: error.message || "Internal Server Error",
//             },
//             { status: 500 }
//         );
//     }
// }
