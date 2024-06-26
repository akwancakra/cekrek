import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: any, { params }: any) {
  try {
    const url = new URL(req.url);
    const limit = url?.searchParams?.get("limit") || "100";
    const skip = url?.searchParams?.get("skip") || "0";
    // const studentId = parseInt(params.studentId);
    const child_assesments = await prisma.child_assesment.findMany({
      where: {
        children_id: parseInt(params.studentId),
        date_time: {
          equals: new Date(params.date),
        },
      },
      include: {
        children: true,
        assesment: true,
      },
      take: parseInt(limit),
      skip: parseInt(skip),
    });
    if (child_assesments.length === 0)
      return NextResponse.json(
        { status: "error", message: "No child_assesment Found" },
        { status: 200 }
      );
    return NextResponse.json(
      { status: "success", child_assesments },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { status: "error", message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
