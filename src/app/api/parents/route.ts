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
    const parents = await prisma.users.findMany({
      where: { role: "parent", name: { contains: name_params } },
      include: {
        children: {
          include: {
            birth_history: true,
            health_status: true,
            expert_examination: true,
            child_recommendation: {
              include: {
                recommendations: true,
              },
            },
          },
        },
      },
      take: parseInt(limit),
      skip: parseInt(skip),
    });
    if (parents.length === 0)
      return NextResponse.json(
        { status: "error", message: "No Parents Found" },
        { status: 200 }
      );
    return NextResponse.json({ status: "success", parents }, { status: 200 });
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
      email,
      password,
      role,
      name,
      type,
      place_birth,
      date_time_birth,
      religion,
      education,
      job,
      address,
      phone,
    } = data;

    // role should be either "teacher" or "parent"
    if (!["teacher", "parent"].includes(role)) {
      return NextResponse.json(
        {
          status: "error",
          message: 'Role should be either "teacher" or "parent"',
        },
        { status: 400 }
      );
    }

    // if date time birth is not provided, set it to null
    if (!date_time_birth) {
      data.date_time_birth = null;
    }

    // Create user
    const parent = await prisma.users.create({
      data: {
        name,
        email,
        role,
        password: await bcrypt.hash(password, 10),
        type,
        place_birth,
        date_time_birth: date_time_birth ? new Date(date_time_birth) : null,
        religion,
        education,
        job,
        address,
        phone,
      },
    });

    return NextResponse.json({ status: "success", parent }, { status: 201 });
  } catch (error: any) {
    if (error.code === "P2002") {
      // Unique constraint error
      return NextResponse.json(
        { status: "error", message: "Email already exists" },
        { status: 400 }
      );
    } else {
      // Other errors
      return NextResponse.json(
        { status: "error", message: error.message || "Internal Server Error" },
        { status: 500 }
      );
    }
  }
}
