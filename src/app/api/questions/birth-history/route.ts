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

        const birth_history_question =
            await prisma.birth_history_question.findMany(queryOptions);
        if (birth_history_question.length === 0)
            return NextResponse.json(
                { status: "error", message: "No Data Found" },
                { status: 200 }
            );

        const health_status_question =
            await prisma.health_status_question.findMany(queryOptions);
        if (health_status_question.length === 0)
            return NextResponse.json(
                { status: "error", message: "No Data Found" },
                { status: 200 }
            );

        const expert_examination_question =
            await prisma.expert_examination_question.findMany(queryOptions);
        if (expert_examination_question.length === 0)
            return NextResponse.json(
                { status: "error", message: "No Data Found" },
                { status: 200 }
            );

        console.log(birth_history_question);

        return NextResponse.json(
            {
                status: "success",
                birth_history_question,
                health_status_question,
                expert_examination_question,
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
