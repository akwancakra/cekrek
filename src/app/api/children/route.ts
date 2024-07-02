import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

interface ChildrenData {
    risk_category: string;
    parent_dad: string;
    parent_mother: string;
    parent_wali: string;
    full_name: string;
    nick_name: string;
    gender: string;
    religion: string;
    place_birth: string;
    date_birth: string;
    hearing: string;
    count_of_siblings: number;
    picture: any;
    healthy_pregnancy: string;
    pregnancy_illness: string;
    gestation_details: string;
    birthplace: string;
    birth_assistance: string;
    delivery_process: string;
    congenital_anomalies: string;
    first_food: string;
    formula_milk: string;
    immunization: string;
    pediatrician: string;
    rehabilitation: string;
    psychologist: string;
    therapist: string;
    serious_illness: string;
    current_diseases: string;
    treatment_location: string;
    treatment_duration: string;
    general_comparison: string;
    crawling_development: string;
    sitting_development: string;
    walking_development: string;
    first_words_age: string;
    speaking_fluency_age: string;
    bedwetting: string;
}

export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const limit = url?.searchParams?.get("limit") || "10";
        const skip = url?.searchParams?.get("skip") || "0";
        const name_params = url?.searchParams?.get("name") || "";
        const plain = url?.searchParams?.get("plain") === "true";

        const include = plain
            ? {}
            : {
                  birth_history: true,
                  health_status: true,
                  expert_examination: true,
                  child_recommendations: {
                      include: {
                          recommendations: true,
                      },
                  },
              };

        const children = await prisma.children.findMany({
            where: { full_name: { contains: name_params } },
            include,
            take: parseInt(limit),
            skip: parseInt(skip),
        });

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
                    last_assesment: lastAssesmentDate,
                };
            })
        );

        if (children.length === 0) {
            return NextResponse.json(
                { status: "error", message: "No Children Found" },
                { status: 200 }
            );
        }

        return NextResponse.json(
            { status: "success", children: childrenWithLastAssesmentDate },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json(
            {
                status: "error",
                message: error.message || "Internal Server Error",
            },
            { status: 500 }
        );
    }
}

const saveImage = (base64String: string, imagePath: string) => {
    const base64Data = base64String.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");
    fs.writeFileSync(imagePath, buffer);
};

export async function POST(req: NextRequest) {
    try {
        const data: ChildrenData = await req.json();

        const {
            teacher_id,
            parent_dad,
            parent_mother,
            parent_wali,
            full_name,
            nick_name,
            gender,
            place_birth,
            date_birth: date_time_birth,
            religion,
            count_of_siblings,
            risk_category,
            hearing: hearing_test,
            picture,
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
            // data.date_birth = null;
            return NextResponse.json(
                { status: "error", message: "Date of Birth is required" },
                { status: 400 }
            );
        }

        // Ensure date_time_birth is a valid Date object or null
        const birthDate = date_time_birth ? new Date(date_time_birth) : null;

        // Check if at least one parent is provided
        if (!parent_dad && !parent_mother && !parent_wali) {
            return NextResponse.json(
                {
                    status: "error",
                    message: "At least one parent must be provided",
                },
                { status: 400 }
            );
        }

        // Create array to connect parents
        const connectParents = [];
        if (parent_dad) {
            const dad = await prisma.users.findUnique({
                where: { id: parseInt(parent_dad), type: "ayah" },
            });
            if (!dad) {
                return NextResponse.json(
                    { status: "error", message: "Parent (dad) not found" },
                    { status: 404 }
                );
            }
            connectParents.push({ id: parseInt(parent_dad) });
        }
        if (parent_mother) {
            const mother = await prisma.users.findUnique({
                where: { id: parseInt(parent_mother), type: "ibu" },
            });
            if (!mother) {
                return NextResponse.json(
                    { status: "error", message: "Parent (mother) not found" },
                    { status: 404 }
                );
            }
            connectParents.push({ id: parseInt(parent_mother) });
        }
        if (parent_wali) {
            const wali = await prisma.users.findUnique({
                where: { id: parseInt(parent_wali), type: "wali" },
            });
            if (!wali) {
                return NextResponse.json(
                    { status: "error", message: "Parent (wali) not found" },
                    { status: 404 }
                );
            }
            connectParents.push({ id: parseInt(parent_wali) });
        }

        let imagePath = "",
            imageFullPath = "";
        if (picture) {
            const base64Data = picture.replace(/^data:image\/\w+;base64,/, "");
            const buffer = Buffer.from(base64Data, "base64");
            imagePath = `${Date.now()}_${full_name}_image.png`;
            imageFullPath = `/uploads/children/${imagePath}`;
            const fullPath = path.join(process.cwd(), "public", imageFullPath);

            fs.writeFileSync(fullPath, buffer);
        }

        // Create child
        const child = await prisma.children.create({
            include: {
                birth_history: true,
                expert_examination: true,
                health_status: true,
            },
            data: {
                teacher_id: parseInt(teacher_id) || null,
                full_name,
                nick_name,
                gender,
                place_birth,
                date_time_birth: birthDate,
                religion,
                count_of_siblings,
                risk_category,
                hearing_test,
                picture: imagePath,
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
            {
                status: "error",
                message: error.message || "Internal Server Error",
            },
            { status: 500 }
        );
    }
}
