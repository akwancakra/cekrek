import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: any, { params }: any) {
  try {
    const url = new URL(req.url);
    const limit = url?.searchParams?.get("limit") || "10";
    const skip = url?.searchParams?.get("skip") || "0";
    const studentId = parseInt(params.studentId);

    const child_recommendations = await prisma.child_recommendations.findMany({
      where: { children_id: studentId },
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

    // Process the result to include date_time
    const processed_recommendations = child_recommendations
      .map((rec) => {
        const monitorDates = rec.monitors.map((monitor) => ({
          date_time: monitor.date_time,
          children: rec.children,
          recommendations: [
            {
              id: rec.id,
              children_id: rec.children_id,
              recommendation_id: rec.recommendation_id,
              recommendation: rec.recommendations,
            },
          ],
        }));

        return monitorDates;
      })
      .flat();

    return NextResponse.json(
      { status: "success", child_recommendations: processed_recommendations },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { status: "error", message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
