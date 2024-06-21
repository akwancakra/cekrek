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
        health_status: true,
        expert_examination: true,
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
      // Recommendation
      recommendation_id,
      recommendation_type,
      recommendation_title,
      recommendation_description,
      recommendation_icon,
      recommendation_duration,
      recommendation_duration_type,
      recommendation_repetition,
      recommendation_risk_category,
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
        full_name,
        nick_name,
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

    // Check if recommendation details are provided
    const hasRecommendationDetails =
      recommendation_type && recommendation_title && recommendation_description;

    if (recommendation_id && hasRecommendationDetails) {
      // Create and connect both existing and new recommendations
      await prisma.child_recommendation.create({
        data: {
          children: {
            connect: { id: child.id },
          },
          recommendations: {
            connect: { id: recommendation_id },
          },
        },
      });

      await prisma.child_recommendation.create({
        data: {
          children: {
            connect: { id: child.id },
          },
          recommendations: {
            create: {
              type: recommendation_type,
              title: recommendation_title,
              description:
                recommendation_description || "No description provided",
              icon: recommendation_icon,
              duration: recommendation_duration,
              duration_type: recommendation_duration_type,
              repetition: recommendation_repetition,
              risk_category: recommendation_risk_category,
            },
          },
        },
      });
    } else if (recommendation_id) {
      // Connect to an existing recommendation
      await prisma.child_recommendation.create({
        data: {
          children: {
            connect: { id: child.id },
          },
          recommendations: {
            connect: { id: recommendation_id },
          },
        },
      });
    } else if (hasRecommendationDetails) {
      // Create a new recommendation if all necessary fields are provided
      await prisma.child_recommendation.create({
        data: {
          children: {
            connect: { id: child.id },
          },
          recommendations: {
            create: {
              type: recommendation_type,
              title: recommendation_title,
              description:
                recommendation_description || "No description provided",
              icon: recommendation_icon,
              duration: recommendation_duration,
              duration_type: recommendation_duration_type,
              repetition: recommendation_repetition,
              risk_category: recommendation_risk_category,
            },
          },
        },
      });
    }

    return NextResponse.json({ status: "success", child }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { status: "error", message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
