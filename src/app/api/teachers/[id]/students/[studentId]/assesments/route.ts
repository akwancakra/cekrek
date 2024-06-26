import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: any, { params }: any) {
  try {
    const url = new URL(req.url);
    const limit = url?.searchParams?.get("limit") || "100";
    const skip = url?.searchParams?.get("skip") || "0";
    // const studentId = parseInt(params.studentId);
    const assesments = await prisma.assesments.findMany({
      take: parseInt(limit),
      skip: parseInt(skip),
    });
    if (assesments.length === 0)
      return NextResponse.json(
        { status: "error", message: "No assesments Found" },
        { status: 200 }
      );
    return NextResponse.json(
      { status: "success", assesments },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { status: "error", message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: any, { params }: any) {
  try {
    const data = await req.json();
    const { date_time, child_id, assessmentsAnswer, childRecommendations } =
      data;

    // Check if the child exists
    const child = await prisma.children.findUnique({
      where: { id: child_id },
    });
    if (!child)
      return NextResponse.json(
        { status: "error", message: "Child not found" },
        { status: 200 }
      );

    const dateResult = date_time ? new Date(date_time) : new Date();

    // Save assessments answers
    const child_assessments = await Promise.all(
      assessmentsAnswer.map((assessment: any) => {
        return prisma.child_assesment.create({
          data: {
            // children_id: child_id,
            children: {
              connect: {
                id: child_id,
              },
            },
            assesment: {
              connect: {
                id: assessment.assessment_id,
              },
            },
            // assesment_id: assessment.assessment_id,
            answer: assessment.answer,
            date_time: dateResult,
          },
        });
      })
    );

    // Handle child recommendations
    const existingRecommendations = [];
    const newRecommendations = [];
    for (const recommendation of childRecommendations) {
      if (recommendation.id === null) {
        newRecommendations.push(recommendation);
      } else {
        existingRecommendations.push(recommendation);
      }
    }

    // Create new recommendations
    const createdRecommendations = await Promise.all(
      newRecommendations.map((rec: any) =>
        prisma.recommendations.create({
          data: {
            assesment_number: rec.assesment_number,
            is_main: rec.is_main,
            title: rec.title,
            description: rec.description,
            icon: rec.icon,
            frequency: rec.frequency,
            risk_category: rec.risk_category,
          },
        })
      )
    );

    // Connect existing recommendations and new recommendations to child
    const childRecommendationsData = [
      ...existingRecommendations.map((rec: any) => ({
        children_id: child_id,
        recommendation_id: rec.id,
      })),
      ...createdRecommendations.map((rec: any) => ({
        children_id: child_id,
        recommendation_id: rec.id,
      })),
    ];

    await prisma.child_recommendations.createMany({
      data: childRecommendationsData,
    });

    // Calculate child risk category
    const answersYes = assessmentsAnswer.filter(
      (a: any) => a.answer === "ya"
    ).length;
    const answersNo = assessmentsAnswer.filter(
      (a: any) => a.answer === "tidak"
    ).length;

    let childRiskCategory = "rendah";
    if (answersYes >= 3 && answersYes <= 7) {
      childRiskCategory = "medium";
    } else if (answersYes >= 8) {
      childRiskCategory = "tinggi";
    }

    // Get recommendations based on risk category
    const additionalRecommendations = await prisma.recommendations.findMany({
      where: {
        assesment_number: {
          in: assessmentsAnswer
            .filter((a: any) => a.answer === "tidak")
            .map((a: any) => a.assessment_id),
        },
        OR: [{ risk_category: childRiskCategory }, { risk_category: null }],
      },
    });

    await prisma.child_recommendations.createMany({
      data: additionalRecommendations.map((rec: any) => ({
        children_id: child_id,
        recommendation_id: rec.id,
      })),
    });

    // Update risk_category on child
    await prisma.children.update({
      where: { id: child_id },
      data: { risk_category: childRiskCategory },
    });

    const finalChildRecommendations =
      await prisma.child_recommendations.findMany({
        where: { children_id: child_id },
        include: { recommendations: true },
      });

    return NextResponse.json(
      {
        status: "success",
        child_assessments,
        child_recommendations: finalChildRecommendations,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { status: "error", message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
