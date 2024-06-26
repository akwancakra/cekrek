import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: any, { params }: any) {
  try {
    const url = new URL(req.url);
    const limit = url?.searchParams?.get("limit") || "100";
    const skip = url?.searchParams?.get("skip") || "0";
    // const childId = parseInt(params.childId);
    const assesments = await prisma.assesments.findMany({
      take: parseInt(limit),
      skip: parseInt(skip),
    });
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
      { status: "error", message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: any, { params }: any) {
  try {
    const childId = parseInt(params.childId);
    const data = await req.json();
    const { assesment_id, answer, date } = data;

    // if student does not exist
    const student = await prisma.children.findUnique({
      where: { id: childId },
    });
    if (!student)
      return NextResponse.json(
        { status: "error", message: "Student not found" },
        { status: 200 }
      );
    const dateResult = date ? new Date(date) : new Date();
    // Create user
    const child_assesment = await prisma.child_assesment.create({
      data: {
        children_id: childId,
        assesment_id,
        answer,
        date_time: dateResult,
      },
    });

    return NextResponse.json(
      { status: "success", child_assesment },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { status: "error", message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
