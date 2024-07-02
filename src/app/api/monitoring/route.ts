import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    const { date, data } = await req.json();

    const startDate = new Date(date);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 1);

    try {
        const upsertPromises = data.map(async (item: any) => {
            const existing =
                await prisma.monitor_child_recommendation.findFirst({
                    where: {
                        child_recommendation_id: item.child_recommendation_id,
                        date_time: {
                            gte: startDate,
                            lt: endDate,
                        },
                    },
                });

            if (existing) {
                return prisma.monitor_child_recommendation.update({
                    where: { id: existing.id },
                    data: {
                        date_time: startDate,
                        is_done: item.answer === "ya",
                    },
                });
            } else {
                return prisma.monitor_child_recommendation.create({
                    data: {
                        child_recommendation_id: item.child_recommendation_id,
                        date_time: startDate,
                        is_done: item.answer === "ya",
                    },
                });
            }
        });

        const results = await Promise.all(upsertPromises);

        return NextResponse.json(
            {
                status: "success",
                message: "Assessments processed successfully",
                results,
            },
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

// import { PrismaClient } from "@prisma/client";
// import { NextRequest, NextResponse } from "next/server";

// const prisma = new PrismaClient();

// export async function POST(req: NextRequest) {
//     try {
//         const { date, data } = await req.json();
//         // const dateToday = new Date();

//         const startDate = new Date(date);
//         const endDate = new Date(startDate);
//         endDate.setDate(startDate.getDate() + 1);

//         const upsertPromises = data.map(async (item: any) => {
//             return prisma.monitor_child_recommendation.upsert({
//                 where: {
//                     child_recommendation_id: item.child_recommendation_id,
//                     date_time: {
//                         gte: startDate.toISOString(),
//                         lt: endDate.toISOString(),
//                     },
//                 },
//                 update: {
//                     date_time: date,
//                     is_done: item.answer === "ya",
//                 },
//                 create: {
//                     child_recommendation_id: item.child_recommendation_id,
//                     date_time: date,
//                     is_done: item.answer === "ya",
//                 },
//             });
//         });

//         const assesments = await Promise.all(upsertPromises);

//         if (assesments.length === 0) {
//             return NextResponse.json(
//                 { status: "error", message: "No assessments Found" },
//                 { status: 200 }
//             );
//         }

//         return NextResponse.json(
//             { status: "success", assesments },
//             { status: 200 }
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
