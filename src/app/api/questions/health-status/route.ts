import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const limit = url.searchParams.get("limit");
        const skip = url.searchParams.get("skip");

        const queryOptions: any = {};

        if (limit && !isNaN(parseInt(limit))) {
            queryOptions.take = parseInt(limit);
        }
        if (skip && !isNaN(parseInt(skip))) {
            queryOptions.skip = parseInt(skip);
        }

        const health_status_question =
            await prisma.health_status_question.findMany(queryOptions);

        if (health_status_question.length === 0) {
            return NextResponse.json(
                { status: "error", message: "No Data Found" },
                { status: 200 }
            );
        }

        return NextResponse.json(
            {
                status: "success",
                health_status_question,
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
