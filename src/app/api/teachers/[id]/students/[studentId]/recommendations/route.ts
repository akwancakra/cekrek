import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: any, { params }: any) {
    try {
        const url = new URL(req.url);
        const limit = url?.searchParams?.get("limit") || "10";
        const skip = url?.searchParams?.get("skip") || "0";
        const teacherId = parseInt(params.id);
        const studentId = parseInt(params.studentId);
        const date: string | Date =
            url?.searchParams?.get("date") || new Date();

        // Get the date from params and create start and end of the day
        const startDate = new Date(date);
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 1);

        const child = await prisma.children.findFirstOrThrow({
            where: { id: studentId, teacher_id: teacherId },
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
                child_recommendations: { children_id: studentId },
                date_time: {
                    gte: startDate.toISOString(),
                    lt: endDate.toISOString(),
                },
            },
            include: {
                child_recommendations: true,
            },
        });

        // Menghitung finishedRecommendations berdasarkan is_done
        const finishedRecommendations = monitors.filter(
            (monitor) => monitor.is_done && monitor.with_whom === "teacher"
        ).length;

        const unfinishedRecommendations =
            child.child_recommendations.length - finishedRecommendations;

        const finishedRecommendationsByParent = monitors.filter(
            (monitor) => monitor.is_done && monitor.with_whom === "parent"
        ).length;

        const unfinishedRecommendationsByParent =
            child.child_recommendations.length -
            finishedRecommendationsByParent;

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
            unfinishedRecommendations,
            finishedRecommendations,
            unfinishedRecommendationsByParent,
            finishedRecommendationsByParent,
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
