import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: any, { params }: any) {
  try {
    const url = new URL(req.url);
    const limit = url?.searchParams?.get("limit") || "10";
    const skip = url?.searchParams?.get("skip") || "0";
    const studentId = parseInt(params.studentId);
    const child_recommendation = await prisma.child_recommendation.findMany({
      where: { children_id: studentId },
      // include: {
      //   children: true,
      //   recommendations: true,
      //   monitors: {
      //     include: {
      //       child_recommendation: {
      //         include: {
      //           recommendations: true,
      //         },
      //       },
      //     },
      //   },
      // },
      include: {
        children: true,
        recommendations: true,
        monitors: true,
      },
      take: parseInt(limit),
      skip: parseInt(skip),
    });
    if (child_recommendation.length === 0)
      return NextResponse.json(
        { status: "error", message: "No child_recommendation Found" },
        { status: 200 }
      );
    return NextResponse.json(
      { status: "success", child_recommendation },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { status: "error", message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
