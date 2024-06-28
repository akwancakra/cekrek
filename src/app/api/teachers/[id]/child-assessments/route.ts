import { generateAssessmentWrap } from "@/utils/converters";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const teacherId = parseInt(params.id);

        // Step 1: Get children based on teacherId
        const children = await prisma.children.findMany({
            where: {
                teacher_id: teacherId,
            },
            include: {
                child_assesments: {
                    include: {
                        assesment: true, // Include the related assessment details
                    },
                },
            },
        });

        if (children.length === 0) {
            return NextResponse.json(
                { status: "error", message: "No Children Found" },
                { status: 200 }
            );
        }

        // Step 2: Process children and assessments
        const childrenAssessments = children.map((child) => {
            const assessmentWraps = generateAssessmentWrap(child);
            return {
                ...child,
                child_assesments: assessmentWraps,
            };
        });

        // Return the response
        return NextResponse.json(
            { status: "success", childrenAssessments },
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
