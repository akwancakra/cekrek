import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(req: NextRequest) {
    try {
        const data = await req.json();
        const { teacher_id, student_id } = data;

        // Create child
        const child = await prisma.children.update({
            where: { id: student_id },
            data: {
                teacher_id:
                    typeof teacher_id === "string"
                        ? parseInt(teacher_id)
                        : teacher_id,
            },
        });

        return NextResponse.json({ status: "success", child }, { status: 201 });
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
