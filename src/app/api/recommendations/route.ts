import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const limit = url?.searchParams?.get("limit") || "10";
    const skip = url?.searchParams?.get("skip") || "0";
    const name_params = url?.searchParams?.get("name") || "";
    const recommendations = await prisma.recommendations.findMany({
      where: { title: { contains: name_params } },
      include: { children: true },
      take: parseInt(limit),
      skip: parseInt(skip),
    });
    if (recommendations.length === 0)
      return NextResponse.json(
        { status: "error", message: "No Recommendations Found" },
        { status: 200 }
      );
    return NextResponse.json(
      { status: "success", recommendations },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { status: "error", message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const {
      type,
      title,
      description,
      icon,
      duration,
      duration_type,
      repetition,
      risk_category,
    } = data;

    // Create user
    const recommendation = await prisma.recommendations.create({
      data: {
        type,
        title,
        description,
        icon,
        duration,
        duration_type,
        repetition,
        risk_category,
      },
    });

    return NextResponse.json(
      { status: "success", recommendation },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { status: "error", message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
