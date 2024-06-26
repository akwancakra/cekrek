import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: any, { params }: any) {
  try {
    const url = new URL(req.url);
    const limit = url?.searchParams?.get("limit") || "10";
    const skip = url?.searchParams?.get("skip") || "0";
    const childId = parseInt(params.childId);
    const child_recommendations = await prisma.child_recommendations.findMany({
      where: { children_id: childId },
      // include: {
      //   children: true,
      //   recommendations: true,
      //   monitors: {
      //     include: {
      //       child_recommendations: {
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
    if (child_recommendations.length === 0)
      return NextResponse.json(
        { status: "error", message: "No child_recommendations Found" },
        { status: 200 }
      );
    return NextResponse.json(
      { status: "success", child_recommendations },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { status: "error", message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
