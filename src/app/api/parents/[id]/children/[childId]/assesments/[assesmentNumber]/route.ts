import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: any, { params }: any) {
  try {
    const assesmentNumber = parseInt(params.assesmentNumber);
    const assesment = await prisma.assesments.findUnique({
      where: { id: assesmentNumber },
    });
    if (!assesment) {
      return NextResponse.json(
        { status: "error", message: "assesment Not Found" },
        { status: 200 }
      );
    }
    return NextResponse.json({ status: "success", assesment }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { status: "error", message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: any, { params }: any) {
  try {
    const id = parseInt(params.id);
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

    const userExists = await prisma.recommendations.findUnique({
      where: { id: id },
    });

    if (!userExists) {
      return NextResponse.json(
        { status: "error", message: "Recommendation Not Found" },
        { status: 200 }
      );
    }

    // Update user data
    const teacherData = {
      type,
      title,
      description,
      icon,
      duration,
      duration_type,
      repetition,
      risk_category,
    };

    const recommendation = await prisma.recommendations.update({
      where: { id: id },
      data: teacherData,
    });

    return NextResponse.json(
      {
        status: "success",
        message: "Recommendation Updated Successfully",
        recommendation,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { status: "error", message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: any, { params }: any) {
  try {
    const id = parseInt(params.id);

    const teacherExist = await prisma.recommendations.findUnique({
      where: { id: id },
    });

    if (!teacherExist) {
      return NextResponse.json(
        { status: "error", message: "Recommendation Not Found" },
        { status: 200 }
      );
    }

    const recommendation = await prisma.recommendations.delete({
      where: { id: id },
    });
    return NextResponse.json(
      {
        status: "success",
        message: "Recommendation Deleted Successfully",
        recommendation,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { status: "error", message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
