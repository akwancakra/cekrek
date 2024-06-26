import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: any, { params }: any) {
  try {
    const recommendationId = parseInt(params.recommendationId);
    const studentId = parseInt(params.studentId);
    const child_recommendation = await prisma.child_recommendation.findFirst({
      where: { children_id: studentId, id: recommendationId },
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
    });
    if (!child_recommendation) {
      return NextResponse.json(
        { status: "error", message: "Recommendation Not Found" },
        { status: 200 }
      );
    }
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
