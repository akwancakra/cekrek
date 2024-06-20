import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const limit = url?.searchParams?.get("limit") || "10";
    const skip = url?.searchParams?.get("skip") || "0";
    const name_params = url?.searchParams?.get("name") || "";
    const children = await prisma.children.findMany({
      where: { full_name: { contains: name_params } },
      include: {
        birth_history: true,
        child_expert_examination: {
          include: {
            expert_examination: true,
          },
        },
        child_health_status: {
          include: {
            health_status: true,
          },
        },
        child_recommendation: {
          include: {
            recommendations: true,
          },
        },
      },
      take: parseInt(limit),
      skip: parseInt(skip),
    });
    if (children.length === 0)
      return NextResponse.json(
        { status: "error", message: "No Children Found" },
        { status: 200 }
      );
    return NextResponse.json({ status: "success", children }, { status: 200 });
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
      parent_id,
      full_name,
      gender,
      place_birth,
      date_time_birth,
      religion,
      count_of_siblings,
      risk_category,
      hearing_test,
    } = data;

    // if date time birth is not provided, set it to null
    if (!date_time_birth) {
      data.date_time_birth = null;
    }

    // Create user
    const child = await prisma.children.create({
      data: {
        parent_id,
        full_name,
        gender,
        place_birth,
        date_time_birth: date_time_birth ? new Date(date_time_birth) : null,
        religion,
        count_of_siblings,
        risk_category,
        hearing_test,
      },
    });

    return NextResponse.json({ status: "success", child }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { status: "error", message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
