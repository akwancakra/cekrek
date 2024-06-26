import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(req: any, { params }: any) {
  try {
    const studentId = parseInt(params.studentId);
    // Create child
    const child = await prisma.children.update({
      where: { id: studentId },
      data: { teacher_id: null },
    });

    return NextResponse.json({ status: "success", child }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { status: "error", message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
