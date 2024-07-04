import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: any, { params }: any) {
    try {
        const url = new URL(req.url);
        const limit = url?.searchParams?.get("limit") || "10";
        const skip = url?.searchParams?.get("skip") || "0";
        const childId = parseInt(params.childId);
        const date: string | Date =
            url?.searchParams?.get("date") || new Date().toLocaleDateString();

        // Get the date from params and create start and end of the day
        const startDate = new Date(date);
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 1);

        const child = await prisma.children.findFirstOrThrow({
            where: { id: childId },
            include: {
                child_recommendations: {
                    include: {
                        recommendations: true,
                    },
                },
            },
        });

        const monitors = await prisma.monitor_child_recommendation.findMany({
            where: {
                child_recommendations: { children_id: childId },
                date_time: {
                    gte: startDate.toISOString(),
                    lt: endDate.toISOString(),
                },
            },
            include: {
                child_recommendations: true,
            },
        });

        // Menghitung finishedRecommendations dan unfinishedRecommendations oleh orang tua
        const finishedRecommendations = monitors.filter(
            (monitor) => monitor.is_done && monitor.with_whom === "parent"
        ).length;

        const unfinishedRecommendations =
            child.child_recommendations.length - finishedRecommendations;

        // Menghitung finishedRecommendations dan unfinishedRecommendations oleh guru
        const finishedRecommendationsByTeacher = monitors.filter(
            (monitor) => monitor.is_done && monitor.with_whom === "teacher"
        ).length;

        const unfinishedRecommendationsByTeacher =
            child.child_recommendations.length -
            finishedRecommendationsByTeacher;

        // Process and combine the recommendations and monitors
        const processed_recommendations = {
            ...child,
            child_recommendations: child.child_recommendations.map((rec) => ({
                ...rec,
                isFinishedByParent: monitors.some(
                    (monitor) =>
                        monitor.child_recommendations.id === rec.id &&
                        monitor.is_done &&
                        monitor.with_whom === "parent"
                ),
                isFinishedByTeacher: monitors.some(
                    (monitor) =>
                        monitor.child_recommendations.id === rec.id &&
                        monitor.is_done &&
                        monitor.with_whom === "teacher"
                ),
            })),
            monitor_child_recommendation: monitors.map((monitor) => ({
                ...monitor,
                recommendations: child.child_recommendations
                    .filter(
                        (rec) =>
                            rec.recommendation_id ===
                            monitor.child_recommendations.recommendation_id
                    )
                    .map((rec) => ({
                        id: rec.id,
                        recommendation: rec.recommendations,
                        // tambahkan properti lain yang Anda perlukan
                    })),
            })),
            finishedRecommendations,
            unfinishedRecommendations,
            finishedRecommendationsByTeacher,
            unfinishedRecommendationsByTeacher,
        };

        return NextResponse.json(
            {
                status: "success",
                child: processed_recommendations,
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

// export async function GET(req: any, { params }: any) {
//   try {
//     const url = new URL(req.url);
//     const limit = url?.searchParams?.get("limit") || "10";
//     const skip = url?.searchParams?.get("skip") || "0";
//     const childId = parseInt(params.childId);

//     const child_recommendations = await prisma.child_recommendations.findMany({
//       where: { children_id: childId },
//       include: {
//         children: true,
//         recommendations: true,
//         monitors: true,
//       },
//       take: parseInt(limit),
//       skip: parseInt(skip),
//     });

//     if (child_recommendations.length === 0)
//       return NextResponse.json(
//         { status: "error", message: "No child_recommendations Found" },
//         { status: 200 }
//       );

//     // Process the result to include date_time
//     const processed_recommendations = child_recommendations
//       .map((rec) => {
//         const monitorDates = rec.monitors.map((monitor) => ({
//           date_time: monitor.date_time,
//           children: rec.children,
//           recommendations: [
//             {
//               id: rec.id,
//               children_id: rec.children_id,
//               recommendation_id: rec.recommendation_id,
//               recommendation: rec.recommendations,
//             },
//           ],
//         }));

//         return monitorDates;
//       })
//       .flat();

//     return NextResponse.json(
//       { status: "success", child_recommendations: processed_recommendations },
//       { status: 200 }
//     );
//   } catch (error: any) {
//     return NextResponse.json(
//       { status: "error", message: error.message || "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }
