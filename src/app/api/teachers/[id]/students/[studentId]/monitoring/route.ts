import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: any, { params }: any) {
    try {
        const teacherId = parseInt(params.id);
        const studentId = parseInt(params.studentId);

        const child = await prisma.children.findUnique({
            where: { id: studentId, teacher_id: teacherId },
            include: {
                child_recommendations: {
                    include: {
                        monitors: true,
                    },
                },
            },
        });

        if (!child) {
            return NextResponse.json(
                { status: "error", message: "Child Not Found" },
                { status: 404 }
            );
        }

        // Flatten monitors
        const allMonitors = child.child_recommendations
            .map((rec) => rec.monitors)
            .flat();

        // Group monitors by date
        const monitorsByDate: { [date: string]: any } = {};
        allMonitors.forEach((monitor) => {
            const date = monitor.date_time.toISOString().split("T")[0];
            if (!monitorsByDate[date]) {
                monitorsByDate[date] = {
                    date: date,
                    finishedActivities: 0,
                    unfinishedActivities: 0,
                };
            }
            if (monitor.is_done) {
                monitorsByDate[date].finishedActivities++;
            } else {
                monitorsByDate[date].unfinishedActivities++;
            }
        });

        // Convert object to array for response
        const monitorTableData = Object.values(monitorsByDate);

        return NextResponse.json(
            {
                status: "success",
                monitorTableData,
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
