import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: any, { params }: any) {
  try {
    const id = parseInt(params.id);
    const child = await prisma.children.findUnique({
      where: { id: id },
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
      // Birth History
      healthy_pregnancy,
      pregnancy_illness,
      gestation_details,
      birthplace,
      birth_assistance,
      delivery_process,
      congenital_anomalies,
      first_food,
      formula_milk,
      immunization,
      // Health Status
      pediatrician,
      rehabilitation,
      psychologist,
      therapist,
      // Expert Examination
      serious_illness,
      current_diseases,
      treatment_location,
      treatment_duration,
      general_comparison,
      crawling_development,
      sitting_development,
      walking_development,
      first_words_age,
      speaking_fluency_age,
      bedwetting,
    } = data;

    // Check if the child exists
    const childExist = await prisma.children.findUnique({
      where: { id },
    });

    if (!childExist) {
      return NextResponse.json(
        { status: "error", message: "Child Not Found" },
        { status: 404 }
      );
    }

    // Check if parent is valid
    const parent = await prisma.users.findUnique({
      where: { id: parent_id, role: "parent" },
    });
    if (!parent)
      return NextResponse.json(
        { status: "error", message: "Parent not found" },
        { status: 404 }
      );

    // Prepare the connect and disconnect arrays for parent
    let connectParents: any = [];
    if (Array.isArray(parent_id)) {
      connectParents = parent_id.map((id) => ({ id }));
    } else if (parent_id) {
      connectParents = [{ id: parent_id }];
    }

    // Check if the child exists
    const existingChild = await prisma.children.findUnique({
      where: { id },
      include: { parent: true }, // Include parent to verify
    });

    if (!existingChild) {
      return NextResponse.json(
        { status: "error", message: "Child Not Found" },
        { status: 404 }
      );
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

    // Update child data and include related data
    const updatedChild = await prisma.children.update({
      where: { id },
      include: {
        birth_history: true,
        expert_examination: true,
        health_status: true,
      },
      data: {
        full_name,
        nick_name,
        gender,
        place_birth,
        date_time_birth:
          date_time_birth !== undefined
            ? date_time_birth
              ? new Date(date_time_birth)
              : null
            : existingChild.date_time_birth, // Preserve existing date_time_birth if not provided or explicitly set to null
        religion,
        count_of_siblings,
        risk_category,
        hearing_test,
        parent: {
          connect: connectParents,
          disconnect: disconnectParents,
        },
        birth_history: {
          update: {
            healthy_pregnancy,
            pregnancy_illness,
            gestation_details,
            birthplace,
            birth_assistance,
            delivery_process,
            congenital_anomalies,
            first_food,
            formula_milk,
            immunization,
          },
        },
        expert_examination: {
          update: {
            pediatrician,
            rehabilitation,
            psychologist,
            therapist,
          },
        },
        health_status: {
          update: {
            serious_illness,
            current_diseases,
            treatment_location,
            treatment_duration,
            general_comparison,
            crawling_development,
            sitting_development,
            walking_development,
            first_words_age,
            speaking_fluency_age,
            bedwetting,
          },
        },
      },
    });

    return NextResponse.json(
      {
        status: "success",
        message: "Child Updated Successfully",
        child: updatedChild,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { status: "error", message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
