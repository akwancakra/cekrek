import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: any, { params }: any) {
  try {
    const id = parseInt(params.id);
    const child = await prisma.children.findUnique({
      where: { id: id },
      include: {
        child_birth_history: {
          include: {
            birth_history: true,
          },
        },
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
    });
    if (!child) {
      return NextResponse.json(
        { status: "error", message: "Child Not Found" },
        { status: 200 }
      );
    }
    return NextResponse.json({ status: "success", child }, { status: 200 });
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
      parent_id,
      full_name,
      nick_name,
      gender,
      place_birth,
      date_time_birth,
      religion,
      count_of_siblings,
      risk_category,
      hearing_test,
    } = data;

    const childExist = await prisma.children.findUnique({
      where: { id: id },
    });

    if (!childExist) {
      return NextResponse.json(
        { status: "error", message: "Child Not Found" },
        { status: 200 }
      );
    }

    // Prepare the connect and disconnect arrays
    let connectParents: any = [];
    if (Array.isArray(parent_id)) {
      connectParents = parent_id.map((id) => ({ id }));
    } else if (parent_id) {
      connectParents = [{ id: parent_id }];
    }

    // Fetch existing parents to disconnect any that are not included in the new parent_id array
    const existingParents = await prisma.children.findUnique({
      where: { id },
      select: {
        parent: {
          select: {
            id: true,
          },
        },
      },
    });

    const existingParentIds = existingParents?.parent.map((p) => p.id) || [];
    const disconnectParents = existingParentIds
      .filter(
        (existingId) => !connectParents.some((cp: any) => cp.id === existingId)
      )
      .map((id) => ({ id }));

    // Update child data
    const child = await prisma.children.update({
      where: { id: id },
      data: {
        full_name,
        nick_name,
        gender,
        place_birth,
        date_time_birth: date_time_birth ? new Date(date_time_birth) : null,
        religion,
        count_of_siblings,
        risk_category,
        hearing_test,
        parent: {
          connect: connectParents,
          disconnect: disconnectParents,
        },
      },
    });

    return NextResponse.json(
      { status: "success", message: "Child Updated Successfully", child },
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

    const childExist = await prisma.children.findUnique({
      where: { id: id },
    });

    if (!childExist) {
      return NextResponse.json(
        { status: "error", message: "Child Not Found" },
        { status: 200 }
      );
    }

    const child = await prisma.children.delete({
      where: { id: id },
    });
    return NextResponse.json(
      { status: "success", message: "Child Deleted Successfully", child },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { status: "error", message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
