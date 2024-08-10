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

        const teacherId = parseInt(params.id);
        const studentId = parseInt(params.studentId);

        const endDate = new Date(
            url?.searchParams?.get("endDate") || new Date()
        );

        // Set date range to last 7 days
        // const endDate = new Date();
        endDate.setHours(23, 59, 59, 999);

        const startDate = new Date(endDate);
        startDate.setDate(startDate.getDate() - 6);
        startDate.setHours(0, 0, 0, 0);

        const monitors = await prisma.monitor_child_recommendation.findMany({
            where: {
                child_recommendations: {
                    children_id: studentId,
                    recommendations: { aspect: { equals: aspect } },
                },
                date_time: {
                    gte: startDate.toISOString(),
                    lte: endDate.toISOString(),
                },
            },
            include: {
                child_recommendations: {
                    include: {
                        recommendations: true,
                    },
                },
            },
        });

        // Generate array of last 7 days
        const dateArray = Array.from({ length: 7 }, (_, i) => {
            const date = new Date(endDate);
            date.setDate(date.getDate() - i);
            return date.toISOString().split("T")[0];
        }).reverse();

        // Process data for chart
        const aspectData: { [key: string]: number } = {};

        monitors.forEach((monitor) => {
            const date = new Date(monitor.date_time)
                .toISOString()
                .split("T")[0];

            if (!aspectData[date]) {
                aspectData[date] = 0;
            }

            // Accumulate the value if the recommendation is done
            if (monitor.is_done) {
                aspectData[date] += 1;
            }
        });

        // Prepare data for chart, filling in missing dates with 0
        const chartData = {
            labels: dateArray.map((date) => {
                const [year, month, day] = date.split("-");
                return `${parseInt(day)} ${
                    [
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "May",
                        "Jun",
                        "Jul",
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec",
                    ][parseInt(month) - 1]
                }`;
            }),
            datasets: [
                {
                    label: aspect,
                    data: dateArray.map((date) => aspectData[date] || 0),
                },
            ],
        };

        return NextResponse.json(
            {
                status: "success",
                chartData: chartData,
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
//     try {
//         const url = new URL(req.url);

//         if (params.id === undefined || params.studentId === undefined) {
//             return NextResponse.json(
//                 {
//                     status: "error",
//                     message: "Missing required parameters",
//                 },
//                 { status: 400 }
//             );
//         }

//         const teacherId = parseInt(params.id);
//         const studentId = parseInt(params.studentId);

//         // Set date range to last 7 days
//         const endDate = new Date();
//         endDate.setHours(23, 59, 59, 999);

//         const startDate = new Date(endDate);
//         startDate.setDate(startDate.getDate() - 6);
//         startDate.setHours(0, 0, 0, 0);

//         const monitors = await prisma.monitor_child_recommendation.findMany({
//             where: {
//                 child_recommendations: { children_id: studentId },
//                 date_time: {
//                     gte: startDate.toISOString(),
//                     lte: endDate.toISOString(),
//                 },
//             },
//             include: {
//                 child_recommendations: {
//                     include: {
//                         recommendations: true,
//                     },
//                 },
//             },
//         });

//         // Generate array of last 7 days
//         const dateArray = Array.from({ length: 7 }, (_, i) => {
//             const date = new Date(endDate);
//             date.setDate(date.getDate() - i);
//             return date.toISOString().split("T")[0];
//         }).reverse();

//         // Process data for chart
//         const aspectData: { [key: string]: { [key: string]: number } } = {};

//         monitors.forEach((monitor) => {
//             const date = new Date(monitor.date_time)
//                 .toISOString()
//                 .split("T")[0];
//             const aspect = monitor.child_recommendations.recommendations.aspect;

//             if (!aspectData[aspect]) {
//                 aspectData[aspect] = {};
//             }

//             if (!aspectData[aspect][date]) {
//                 aspectData[aspect][date] = 0;
//             }

//             // Accumulate the value if the recommendation is done
//             if (monitor.is_done) {
//                 aspectData[aspect][date] += 1;
//             }
//         });

//         // Prepare data for chart, filling in missing dates with 0
//         const chartData = {
//             labels: dateArray.map((date) => {
//                 const [year, month, day] = date.split("-");
//                 return `${parseInt(day)} ${
//                     [
//                         "Jan",
//                         "Feb",
//                         "Mar",
//                         "Apr",
//                         "May",
//                         "Jun",
//                         "Jul",
//                         "Aug",
//                         "Sep",
//                         "Oct",
//                         "Nov",
//                         "Dec",
//                     ][parseInt(month) - 1]
//                 }`;
//             }),
//             datasets: Object.entries(aspectData).map(([aspect, dates]) => ({
//                 label: aspect,
//                 data: dateArray.map((date) => dates[date] || 0),
//             })),
//         };

//         return NextResponse.json(
//             {
//                 status: "success",
//                 chartData: chartData,
//             },
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
