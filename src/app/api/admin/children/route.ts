import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

interface ChildrenData {
    teacher_id?: string;
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
    count_of_siblings: string;
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
                child_recommendations: {
                    include: {
                        recommendations: true,
                        monitors: true,
                    },
                },
                child_assesments: {
                    include: {
                        assesment: true,
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
            {
                status: "error",
                message: error.message || "Internal Server Error",
            },
            { status: 500 }
        );
    }
}

export async function POST(req: any, { params }: any) {
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

        if (teacher_id) {
            const teacherExist = await prisma.users.findUnique({
                where: { id: parseInt(teacher_id) },
            });

            if (!teacherExist) {
                return NextResponse.json(
                    { status: "error", message: "Teacher Not Found" },
                    { status: 404 }
                );
            }
        } else {
            return NextResponse.json(
                { status: "error", message: "Teacher Not Found" },
                { status: 404 }
            );
        }

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
        const connectParents: { id: number }[] = [];
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

        // Update child data and include related data

        // if (typeof picture === "string") {
        //     // Do nothing, keep existing picture path
        // } else if (picture instanceof File) {
        let updatedPicture;
        if (typeof picture === "string" && picture.startsWith("data:image")) {
            const base64Data = picture.replace(/^data:image\/\w+;base64,/, "");
            const buffer = Buffer.from(base64Data, "base64");
            const imageName = `${Date.now()}_${full_name}_image.png`;
            const fullPath = path.join(
                process.cwd(),
                "public",
                `/uploads/children/${imageName}`
            );

            fs.writeFileSync(fullPath, buffer);
            updatedPicture = imageName;
        }

        const updatedChild = await prisma.children.create({
            include: {
                birth_history: true,
                expert_examination: true,
                health_status: true,
            },
            data: {
                teacher_id: teacher_id ? parseInt(teacher_id) : null,
                full_name,
                picture: updatedPicture,
                nick_name,
                gender,
                place_birth,
                date_time_birth: date_time_birth
                    ? new Date(date_time_birth)
                    : null,
                religion,
                count_of_siblings: parseInt(count_of_siblings) || null,
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
            {
                status: "error",
                message: error.message || "Internal Server Error",
            },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}

// export async function POST(req: NextRequest) {
//     try {
//         const data: ChildrenData = await req.json();

//         const {
//           teacher_id,
//           parent_dad,
//           parent_mother,
//           parent_wali,
//           full_name,
//           nick_name,
//           gender,
//           place_birth,
//           date_birth: date_time_birth,
//           religion,
//           count_of_siblings,
//           risk_category,
//           hearing: hearing_test,
//           picture,
//           // Birth History
//           healthy_pregnancy,
//           pregnancy_illness,
//           gestation_details,
//           birthplace,
//           birth_assistance,
//           delivery_process,
//           congenital_anomalies,
//           first_food,
//           formula_milk,
//           immunization,
//           // Health Status
//           pediatrician,
//           rehabilitation,
//           psychologist,
//           therapist,
//           // Expert Examination
//           serious_illness,
//           current_diseases,
//           treatment_location,
//           treatment_duration,
//           general_comparison,
//           crawling_development,
//           sitting_development,
//           walking_development,
//           first_words_age,
//           speaking_fluency_age,
//           bedwetting,
//         } = data;

//         // if date time birth is not provided, set it to null
//         if (!date_time_birth) {
//             data.date_time_birth = null;
//         }

//         // Ensure date_time_birth is a valid Date object or null
//         const birthDate = date_time_birth ? new Date(date_time_birth) : null;

//         // Check is parent is valid
//         const parent = await prisma.users.findUnique({
//             where: { id: parent_id, role: "parent" },
//         });
//         if (!parent)
//             return NextResponse.json(
//                 { status: "error", message: "Parent not found" },
//                 { status: 404 }
//             );

//         // Handle both single parent_id and array of parent_id
//         const connectParents = Array.isArray(parent_id)
//             ? parent_id.map((id) => ({ id }))
//             : [{ id: parent_id }];

//         // Create child
//         const child = await prisma.children.create({
//             include: {
//                 birth_history: true,
//                 expert_examination: true,
//                 health_status: true,
//             },
//             data: {
//                 teacher_id,
//                 full_name,
//                 nick_name,
//                 picture,
//                 gender,
//                 place_birth,
//                 date_time_birth: birthDate,
//                 religion,
//                 count_of_siblings,
//                 risk_category,
//                 hearing_test,
//                 parent: {
//                     connect: connectParents,
//                 },
//                 birth_history: {
//                     create: {
//                         healthy_pregnancy,
//                         pregnancy_illness,
//                         gestation_details,
//                         birthplace,
//                         birth_assistance,
//                         delivery_process,
//                         congenital_anomalies,
//                         first_food,
//                         formula_milk,
//                         immunization,
//                     },
//                 },
//                 expert_examination: {
//                     create: {
//                         pediatrician,
//                         rehabilitation,
//                         psychologist,
//                         therapist,
//                     },
//                 },
//                 health_status: {
//                     create: {
//                         serious_illness,
//                         current_diseases,
//                         treatment_location,
//                         treatment_duration,
//                         general_comparison,
//                         crawling_development,
//                         sitting_development,
//                         walking_development,
//                         first_words_age,
//                         speaking_fluency_age,
//                         bedwetting,
//                     },
//                 },
//             },
//         });

//         return NextResponse.json({ status: "success", child }, { status: 201 });
//     } catch (error: any) {
//         return NextResponse.json(
//             {
//                 status: "error",
//                 message: error.message || "Internal Server Error",
//             },
//             { status: 500 }
//         );
//     }
// }
