import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function GET(req: any, { params }: any) {
  try {
    const id = parseInt(params.id);
    const health_status_question =
      await prisma.health_status_question.findUnique({
        where: { id: id },
      });
    if (!health_status_question) {
      return NextResponse.json(
        { status: "error", message: "Question Not Found" },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { status: "success", health_status_question },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { status: "error", message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
