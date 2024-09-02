import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: any, { params }: any) {
    try {
        const url = new URL(req.url);
        const aspect = url?.searchParams?.get("aspect");

        if (
            params.id === undefined ||
            params.studentId === undefined ||
            !aspect
        ) {
            return NextResponse.json(
                {
                    status: "error",
                    message: "Missing required parameters",
                },
                { status: 400 }
            );
        }

        // const teacherId = parseInt(params.teacherId);
        const studentId = parseInt(params.studentId);

        // Fetch all monitor data based on aspect and student
        const monitors = await prisma.monitor_child_recommendation.findMany({
            where: {
                child_recommendations: {
                    children_id: studentId,
                    recommendations: {
                        aspect: aspect,
                    },
                },
            },
            orderBy: {
                date_time: "asc",
            },
        });

        if (monitors.length === 0) {
            const emptyWeeks = [];
            const startDate = new Date();
            startDate.setHours(0, 0, 0, 0);

            const endDate = new Date(startDate);
            endDate.setDate(startDate.getDate() + 6);

            emptyWeeks.push({
                label: `Min 1 - ${endDate.toLocaleDateString("id-ID", {
                    month: "short",
                })}`,
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                value: 0,
            });

            return NextResponse.json(
                { status: "success", weeks: emptyWeeks },
                { status: 200 }
            );
        }

        // Generate week ranges
        const weeks = [];
        let currentWeekStart = new Date(monitors[0].date_time);
        currentWeekStart.setHours(0, 0, 0, 0);

        for (let monitor of monitors) {
            const monitorDate = new Date(monitor.date_time);
            monitorDate.setHours(0, 0, 0, 0);

            // Check if date is still within the same week
            const diffTime = Math.abs(
                monitorDate.getTime() - currentWeekStart.getTime()
            );
            const diffDays = Math.ceil(
                diffTime / (1000 * 60 * 60 * 24)
            ) as number;

            if (diffDays >= 7) {
                const currentWeekEnd = new Date(currentWeekStart);
                currentWeekEnd.setDate(currentWeekStart.getDate() + 6);
                weeks.push({
                    label: `Min ${
                        weeks.length + 1
                    } - ${currentWeekEnd.toLocaleDateString("id-ID", {
                        month: "short",
                    })}`,
                    startDate: currentWeekStart.toISOString(),
                    endDate: currentWeekEnd.toISOString(),
                    value: weeks.length + 1,
                });

                currentWeekStart = monitorDate;
            }
        }

        // Add the last week if there are remaining days
        const currentWeekEnd = new Date(currentWeekStart);
        currentWeekEnd.setDate(currentWeekStart.getDate() + 6);
        weeks.push({
            label: `Min ${
                weeks.length + 1
            } - ${currentWeekEnd.toLocaleDateString("id-ID", {
                month: "short",
            })}`,
            startDate: currentWeekStart.toISOString(),
            endDate: currentWeekEnd.toISOString(),
            value: weeks.length + 1,
        });

        return NextResponse.json({ status: "success", weeks }, { status: 200 });
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
