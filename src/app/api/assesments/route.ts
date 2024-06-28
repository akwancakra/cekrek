import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    try {
        // const url = new URL(req.url);
        // const limit = url?.searchParams?.get("limit") || "10";
        // const skip = url?.searchParams?.get("skip") || "0";
        const assesments = await prisma.assesments.findMany();

        if (assesments.length === 0)
            return NextResponse.json(
                { status: "error", message: "No assesments Found" },
                { status: 200 }
            );
        return NextResponse.json(
            { status: "success", assesments },
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
