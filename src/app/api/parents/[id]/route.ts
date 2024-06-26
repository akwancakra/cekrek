import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function GET(req: any, { params }: any) {
  try {
    const id = parseInt(params.id);
    const parent = await prisma.users.findUnique({
      where: { id: id, role: "parent" },
      include: {
        children: {
          include: {
            birth_history: true,
            health_status: true,
            expert_examination: true,
            child_recommendations: {
              include: {
                recommendations: true,
              },
            },
            child_assesments: {
              include: {
                assesment: true,
              },
            },
          },
        },
      },
    });
    if (!parent) {
      return NextResponse.json(
        { status: "error", message: "Parent Not Found" },
        { status: 200 }
      );
    }
    return NextResponse.json({ status: "success", parent }, { status: 200 });
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
      name,
      email,
      password,
      role,
      type,
      place_birth,
      date_time_birth,
      religion,
      education,
      job,
      address,
      phone,
    } = data;

    const userExists = await prisma.users.findUnique({
      where: { id: id },
    });

    if (!userExists) {
      return NextResponse.json(
        { status: "error", message: "Parent Not Found" },
        { status: 200 }
      );
    }

    // Check email is unique
    const emailExist = await prisma.users.findFirst({
      where: { email: email },
    });

    if (emailExist && emailExist.id !== id) {
      return NextResponse.json(
        { status: "error", message: "Email Already Exist" },
        { status: 200 }
      );
    }

    // Check if password is provided and not empty
    let hashedPassword;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // Update user data
    const parentData = {
      name,
      email,
      role,
      type,
      place_birth,
      date_time_birth:
        date_time_birth !== undefined
          ? date_time_birth
            ? new Date(date_time_birth)
            : null
          : userExists.date_time_birth, // Preserve existing date_time_birth if not provided or explicitly set to null
      religion,
      education,
      job,
      address,
      phone,
      // Only include hashed password if provided
      ...(hashedPassword && { password: hashedPassword }),
    };

    const parent = await prisma.users.update({
      where: { id: id },
      data: parentData,
    });

    return NextResponse.json(
      { status: "success", message: "Parent Updated Successfully", parent },
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

    const teacherExist = await prisma.users.findUnique({
      where: { id: id, role: "parent" },
    });

    if (!teacherExist) {
      return NextResponse.json(
        { status: "error", message: "Parent Not Found" },
        { status: 200 }
      );
    }

    const parent = await prisma.users.delete({
      where: { id: id, role: "parent" },
    });
    return NextResponse.json(
      { status: "success", message: "Parent Deleted Successfully", parent },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { status: "error", message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
