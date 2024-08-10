import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const name_params = url?.searchParams?.get("name") || "";
        const limit = url?.searchParams?.get("limit") as string;
        const skip = url?.searchParams?.get("skip") as string;
        const sort = url.searchParams.get("sort"); // asc, desc
        const main = url?.searchParams?.get("main");
        const data = url?.searchParams?.get("data");

        // Inisialisasi findOptions sebagai objek kosong
        let findOptions: any = {};

        if (name_params) {
            findOptions.where = {
                name: { contains: name_params },
            };
        }

        if (limit) {
            findOptions.take = parseInt(limit);
        }

        if (skip) {
            findOptions.skip = parseInt(skip);
        }

        if (sort) {
            findOptions.orderBy = {
                name: sort,
            };
        }

        if (main) {
            findOptions.where = { is_main: main === "true" ? true : false };
        }

        if (data) {
            const finalData = JSON.parse(data);
            const { risk_category, assesments } = finalData;

            console.log(finalData, risk_category.toLowerCase());

            const assessmentNumbers = Array.isArray(assesments)
                ? assesments.map((assesment) =>
                      parseInt(assesment.assesment_number)
                  )
                : [];

            findOptions.where = {
                AND: [
                    { is_main: true },
                    {
                        OR: [
                            { risk_category: risk_category.toLowerCase() },
                            { risk_category: null },
                        ],
                    },
                    { assesment_number: { in: assessmentNumbers } },
                ],
            };
        } else {
            findOptions.where = {
                title: { contains: name_params },
            };
        }

        const recommendations = await prisma.recommendations.findMany(
            findOptions
        );
        // Fetch total count
        const totalCount = await prisma.recommendations.count({
            where: findOptions.where,
        });

        // Calculate next cursor
        const nextCursor =
            parseInt(skip) + recommendations.length < totalCount
                ? parseInt(skip) + recommendations.length
                : null;

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
            { status: "success", recommendations, totalCount, nextCursor },
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

export const maxDuration = 60;
export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const {
            teacher_id,
            child_id,
            date_time,
            risk_category,
            assessmentsAnswer,
            childRecommendations,
        }: {
            teacher_id: string;
            child_id: string;
            date_time: any;
            risk_category: string;
            assessmentsAnswer: any;
            childRecommendations: any;
        } = data;

        // Helper function to handle image saving
        const saveImage = (base64Image: string) => {
            const base64Data = base64Image.replace(
                /^data:image\/\w+;base64,/,
                ""
            );
            const buffer = Buffer.from(base64Data, "base64");
            const imageName = `${Date.now()}_rekomendasi_image.png`;
            const fullPath = path.join(
                process.cwd(),
                "public",
                "uploads",
                "recommendations",
                imageName
            );
            fs.writeFileSync(fullPath, buffer);
            return imageName;
        };

        // Validate required fields
        if (
            !teacher_id ||
            !child_id ||
            !date_time ||
            !risk_category ||
            !assessmentsAnswer ||
            !childRecommendations
        ) {
            return NextResponse.json(
                { status: "error", message: "All fields are required" },
                { status: 400 }
            );
        }

        // Validate assessmentsAnswer and childRecommendations
        for (const assessment of assessmentsAnswer) {
            if (!assessment.assessment_id || !assessment.answer) {
                return NextResponse.json(
                    {
                        status: "error",
                        message: "All assessment fields are required",
                    },
                    { status: 400 }
                );
            }
        }

        for (const recommendation of childRecommendations) {
            if (recommendation.child_id || recommendation.recommendation_id) {
                if (
                    !recommendation.recommendation_id ||
                    !recommendation.child_id
                ) {
                    return NextResponse.json(
                        {
                            status: "error",
                            message: "All recommendation fields are required",
                        },
                        { status: 400 }
                    );
                }
            } else if (
                recommendation.title ||
                recommendation.description ||
                recommendation.frequency
            ) {
                if (
                    !recommendation.title ||
                    !recommendation.description ||
                    !recommendation.frequency
                ) {
                    return NextResponse.json(
                        {
                            status: "error",
                            message: "All recommendation fields are required",
                        },
                        { status: 400 }
                    );
                }
            }
        }

        // Handle images outside the transaction
        for (let recommendation of childRecommendations) {
            if (
                typeof recommendation.icon === "string" &&
                recommendation.icon.startsWith("data:image")
            ) {
                recommendation.icon = saveImage(recommendation.icon);
            }
        }

        const createdRecommendations = [];

        // Handle child recommendations
        for (const recommendation of childRecommendations) {
            if (recommendation.recommendation_id) {
                const childRecommendation =
                    await prisma.child_recommendations.create({
                        data: {
                            recommendation_id: recommendation.recommendation_id,
                            children_id: parseInt(child_id),
                        },
                    });
                createdRecommendations.push(childRecommendation);
            } else {
                const newRecommendation = await prisma.recommendations.create({
                    data: {
                        title: recommendation.title,
                        aspect: recommendation.aspect || "Perkembangan",
                        assesment_number: parseInt(
                            recommendation.assesment_number
                        ),
                        description: recommendation.description || null,
                        icon: recommendation.icon || null,
                        frequency: recommendation.frequency,
                        risk_category: recommendation.risk_category || null,
                        is_main: false,
                        teacher_id: parseInt(recommendation.teacher_id) || null,
                    },
                });

                const childRecommendation =
                    await prisma.child_recommendations.create({
                        data: {
                            recommendation_id: newRecommendation.id,
                            children_id: parseInt(child_id),
                        },
                    });
                createdRecommendations.push(childRecommendation);
            }
        }

        // Prepare data for child assessments
        const assessmentsData = assessmentsAnswer.map((assessment) => ({
            answer: assessment.answer,
            assesment_id: parseInt(assessment.assessment_id),
            date_time: new Date(),
            children_id: parseInt(child_id),
            assesment_type: "awal",
        }));

        // Handle child assessments using createMany
        await prisma.child_assesment.createMany({
            data: assessmentsData,
        });

        // Update child data
        await prisma.children.update({
            where: { id: parseInt(child_id) },
            data: {
                risk_category,
            },
        });

        return NextResponse.json(
            { status: "success", createdRecommendations },
            { status: 201 }
        );
    } catch (error: any) {
        console.error(error);
        return NextResponse.json(
            {
                status: "error",
                message: error.message || "Internal Server Error",
            },
            { status: 500 }
        );
    }
}

// export async function POST(req: NextRequest) {
//     const data = await req.json();

//     // Destructure data from request body
//     const {
//         teacher_id,
//         child_id,
//         date_time,
//         risk_category,
//         assessmentsAnswer,
//         childRecommendations,
//     } = data;

//     const savedImages = [];

//     // Process and save images before starting the transaction
//     for (const recommendation of childRecommendations) {
//         if (
//             typeof recommendation?.icon === "string" &&
//             recommendation?.icon.startsWith("data:image")
//         ) {
//             const base64Data = recommendation.icon.replace(
//                 /^data:image\/\w+;base64,/,
//                 ""
//             );
//             const buffer = Buffer.from(base64Data, "base64");
//             const imageName = `${Date.now()}_rekomendasi_image.png`;
//             const fullPath = path.join(
//                 process.cwd(),
//                 "public",
//                 `/uploads/recommendations/${imageName}`
//             );

//             fs.writeFileSync(fullPath, buffer);
//             savedImages.push(fullPath);
//             recommendation.icon = imageName;
//         }
//     }

//     try {
//         const createdRecommendations = await prisma.$transaction(
//             async (prisma) => {
//                 const recommendations = [];

//                 for (const recommendation of childRecommendations) {
//                     let recommendationId = recommendation.recommendation_id;

//                     if (!recommendationId) {
//                         const newRecommendation =
//                             await prisma.recommendations.create({
//                                 data: {
//                                     title: recommendation.title,
//                                     assesment_number: parseInt(
//                                         recommendation.assesment_number
//                                     ),
//                                     description:
//                                         recommendation.description || null,
//                                     icon: recommendation.icon || null,
//                                     frequency: recommendation.frequency,
//                                     risk_category:
//                                         recommendation.risk_category || null,
//                                     is_main: false,
//                                     teacher_id:
//                                         (typeof teacher_id == "string" &&
//                                             parseInt(teacher_id)) ||
//                                         teacher_id ||
//                                         parseInt(recommendation.teacher_id) ||
//                                         null,
//                                 },
//                             });

//                         recommendationId = newRecommendation.id;
//                     }

//                     const childRecommendation =
//                         await prisma.child_recommendations.create({
//                             data: {
//                                 recommendation_id: recommendationId,
//                                 children_id: child_id,
//                             },
//                         });

//                     recommendations.push(childRecommendation);
//                 }

//                 for (const assessment of assessmentsAnswer) {
//                     await prisma.child_assesment.create({
//                         data: {
//                             answer: assessment.answer,
//                             assesment_id: parseInt(assessment.assessment_id),
//                             date_time: new Date(),
//                             children_id: child_id,
//                             assesment_type: "awal",
//                         },
//                     });
//                 }

//                 await prisma.children.update({
//                     where: { id: child_id },
//                     data: {
//                         risk_category: risk_category,
//                     },
//                 });

//                 return recommendations;
//             }
//         );

//         return NextResponse.json(
//             { status: "success", createdRecommendations },
//             { status: 201 }
//         );
//     } catch (error) {
//         console.log(error);

//         // Clean up saved images if transaction fails
//         for (const imagePath of savedImages) {
//             if (fs.existsSync(imagePath)) {
//                 fs.unlinkSync(imagePath);
//             }
//         }

//         return NextResponse.json(
//             {
//                 status: "error",
//                 message: error.message || "Internal Server Error",
//             },
//             { status: 500 }
//         );
//     }
// }

// export async function POST(req: NextRequest) {
//     try {
//         const data = await req.json();

//         // Destructure data from request body
//         const {
//             teacher_id,
//             child_id,
//             date_time,
//             risk_category,
//             assessmentsAnswer,
//             childRecommendations,
//         } = data;

//         // const newDate = new Date(date_time);

//         // Begin transaction
//         const transaction = await prisma.$transaction(async (prisma) => {
//             const createdRecommendations = [];

//             // Create or link recommendations and child_recommendations
//             for (const recommendation of childRecommendations) {
//                 if (recommendation.recommendation_id) {
//                     // Create child_recommendations only
//                     const childRecommendation =
//                         await prisma.child_recommendations.create({
//                             data: {
//                                 recommendation_id:
//                                     recommendation.recommendation_id,
//                                 children_id: child_id,
//                             },
//                         });
//                     createdRecommendations.push(childRecommendation);
//                 } else {
//                     let updatedPicture = recommendation.icon;
//                     if (
//                         typeof recommendation.icon === "string" &&
//                         recommendation.icon.startsWith("data:image")
//                     ) {
//                         const base64Data = recommendation.icon.replace(
//                             /^data:image\/\w+;base64,/,
//                             ""
//                         );
//                         const buffer = Buffer.from(base64Data, "base64");
//                         const imageName = `${Date.now()}_rekomendasi_image.png`;
//                         const fullPath = path.join(
//                             process.cwd(),
//                             "public",
//                             `/uploads/recommendations/${imageName}`
//                         );

//                         fs.writeFileSync(fullPath, buffer);
//                         updatedPicture = imageName;
//                     } else {
//                         updatedPicture = recommendation.icon || null;
//                     }

//                     // Create new recommendation and corresponding child_recommendations
//                     const newRecommendation =
//                         await prisma.recommendations.create({
//                             data: {
//                                 title: recommendation.title,
//                                 assesment_number: parseInt(
//                                     recommendation.assesment_number
//                                 ),
//                                 description: recommendation.description || null,
//                                 icon: recommendation.icon || null,
//                                 frequency: recommendation.frequency,
//                                 risk_category:
//                                     recommendation.risk_category || null,
//                                 is_main: false,
//                                 teacher_id:
//                                     parseInt(recommendation.teacher_id) ||
//                                     teacher_id ||
//                                     null,
//                             },
//                         });

//                     const childRecommendation =
//                         await prisma.child_recommendations.create({
//                             data: {
//                                 recommendation_id: newRecommendation.id,
//                                 children_id: child_id,
//                             },
//                         });
//                     createdRecommendations.push(childRecommendation);
//                 }
//             }

//             // Create child_assessments
//             for (const assessment of assessmentsAnswer) {
//                 // console.log(assessment);
//                 await prisma.child_assesment.create({
//                     data: {
//                         answer: assessment.answer,
//                         assesment_id: parseInt(assessment.assessment_id),
//                         date_time: new Date(),
//                         children_id: child_id,
//                         assesment_type: "awal",
//                     },
//                 });
//             }

//             await prisma.children.update({
//                 where: { id: child_id },
//                 data: {
//                     risk_category: risk_category,
//                 },
//             });

//             return createdRecommendations;
//         });

//         return NextResponse.json(
//             { status: "success", createdRecommendations: transaction },
//             { status: 201 }
//         );
//     } catch (error: any) {
//         console.log(error);
//         return NextResponse.json(
//             {
//                 status: "error",
//                 // message: error.message || "Internal Server Error",
//                 message: error,
//             },
//             { status: 500 }
//         );
//     }
// }

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
