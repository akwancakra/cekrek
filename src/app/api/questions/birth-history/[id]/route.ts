import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function GET(req: any, { params }: any) {
  try {
    const id = parseInt(params.id);
    const birth_history_question =
      await prisma.birth_history_question.findUnique({
        where: { id: id },
      });
    if (!birth_history_question) {
      return NextResponse.json(
        { status: "error", message: "Question Not Found" },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { status: "success", birth_history_question },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { status: "error", message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
