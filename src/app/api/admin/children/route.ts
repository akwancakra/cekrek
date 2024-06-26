import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function GET(req: any, { params }: any) {
  try {
    const url = new URL(req.url);
    const limit = url?.searchParams?.get("limit") || "10";
    const skip = url?.searchParams?.get("skip") || "0";
    const name_params = url?.searchParams?.get("name") || "";

    // Find children by parent id
    const children = await prisma.children.findMany({
      where: {
        full_name: { contains: name_params },
      },
      include: {
        birth_history: true,
        health_status: true,
        expert_examination: true,
        child_recommendation: {
          include: {
            recommendations: true,
            monitors: true,
          },
        },
        child_assesments: {
          include: {
            assesments: true,
          },
        },
        parent: true,
      },
      take: parseInt(limit),
      skip: parseInt(skip),
    });

    // Process to add last_assesment_date
    const childrenWithLastAssesmentDate = await Promise.all(
      children.map(async (child) => {
        // Get the latest child_assesment for the current child
        const lastAssesment = await prisma.child_assesment.findFirst({
          where: { children_id: child.id },
          orderBy: { date_time: "desc" }, // order by date_time to get the latest one
          select: { date_time: true }, // select only the date_time field
        });

        // Convert date_time to ISO string and extract the date part
        const lastAssesmentDate = lastAssesment
          ? lastAssesment.date_time.toISOString().split("T")[0]
          : null;

        return {
          ...child,
          last_assesment_date: lastAssesmentDate,
        };
      })
    );

    // Return the response
    return NextResponse.json(
      { status: "success", children: childrenWithLastAssesmentDate },
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
      parent_id,
      teacher_id,
      full_name,
      nick_name,
      picture,
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

    // if date time birth is not provided, set it to null
    if (!date_time_birth) {
      data.date_time_birth = null;
    }

    // Ensure date_time_birth is a valid Date object or null
    const birthDate = date_time_birth ? new Date(date_time_birth) : null;

    // Check is parent is valid
    const parent = await prisma.users.findUnique({
      where: { id: parent_id, role: "parent" },
    });
    if (!parent)
      return NextResponse.json(
        { status: "error", message: "Parent not found" },
        { status: 404 }
      );

    // Handle both single parent_id and array of parent_id
    const connectParents = Array.isArray(parent_id)
      ? parent_id.map((id) => ({ id }))
      : [{ id: parent_id }];

    // Create child
    const child = await prisma.children.create({
      include: {
        birth_history: true,
        expert_examination: true,
        health_status: true,
      },
      data: {
        teacher_id,
        full_name,
        nick_name,
        picture,
        gender,
        place_birth,
        date_time_birth: birthDate,
        religion,
        count_of_siblings,
        risk_category,
        hearing_test,
        parent: {
          connect: connectParents,
        },
        birth_history: {
          create: {
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
          create: {
            pediatrician,
            rehabilitation,
            psychologist,
            therapist,
          },
        },
        health_status: {
          create: {
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

    return NextResponse.json({ status: "success", child }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { status: "error", message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
