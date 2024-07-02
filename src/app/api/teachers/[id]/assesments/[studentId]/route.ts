import { Child } from "@/types/children.types";
import { generateAssessmentWrap } from "@/utils/converters";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: any, { params }: any) {
    try {
        const url = new URL(req.url);
        const id = parseInt(params.studentId);
        const date = url?.searchParams?.get("date");

        if (!id || !date) {
            return NextResponse.json(
                {
                    status: "error",
                    message: "Missing 'id' or 'date' parameters",
                },
                { status: 400 }
            );
        }

        const startDate = new Date(date);
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 1);

        const child = await prisma.children.findFirstOrThrow({
            where: {
                id: id,
            },
            include: {
                child_assesments: {
                    where: {
                        date_time: {
                            gte: startDate.toISOString(), // Format ISO 8601
                            lt: endDate.toISOString(), // Format ISO 8601
                        },
                    },
                    include: {
                        assesment: true,
                    },
                },
            },
        });

        // Process child assessments
        const childFinal = {
            ...child,
            child_assesments: generateAssessmentWrap(child),
        };

        return NextResponse.json(
            { status: "success", child: childFinal },
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
