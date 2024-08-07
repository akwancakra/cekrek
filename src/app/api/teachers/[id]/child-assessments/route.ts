import { generateAssessmentWrap } from "@/utils/converters";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const url = new URL(req.url);
        const limit = url?.searchParams?.get("limit") as string;
        const skip = url?.searchParams?.get("skip") as string;
        const sort = url.searchParams.get("sort"); // asc, desc
        const name = url.searchParams.get("name");
        const teacherId = parseInt(params.id);

        // Initialize findOptions with a where clause that ensures child_assesments exist
        let findOptions: any = {
            where: {
                teacher_id: teacherId,
                child_assesments: {
                    some: {}, // This ensures that only children with at least one assessment are returned
                },
            },
            include: {
                child_assesments: {
                    include: {
                        assesment: true, // Include the related assessment details
                    },
                },
            },
        };

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

        if (name) {
            findOptions.where = {
                ...findOptions.where,
                full_name: { contains: name },
            };
        }

        // Step 1: Get children based on teacherId and having child_assesments
        const children = await prisma.children.findMany(findOptions);

        if (children.length === 0) {
            return NextResponse.json(
                {
                    status: "error",
                    message: "No Children Found with Assessments",
                },
                { status: 200 }
            );
        }

        // Fetch total count
        const totalCount = await prisma.children.count({
            where: findOptions.where,
        });

        // Calculate next cursor
        const nextCursor =
            parseInt(skip) + children.length < totalCount
                ? parseInt(skip) + children.length
                : null;

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
            { status: "success", childrenAssessments, totalCount, nextCursor },
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
