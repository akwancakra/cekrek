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

export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const name_params = url?.searchParams?.get("name") || "";
        const plain = url.searchParams.get("plain") === "true";
        const limit = url?.searchParams?.get("limit") as string;
        const skip = url?.searchParams?.get("skip") as string;
        const sort = url.searchParams.get("sort"); // asc, desc

        // Inisialisasi findOptions sebagai objek kosong
        let findOptions: any = {};

        if (!plain) {
            findOptions.include = {
                birth_history: true,
                health_status: true,
                expert_examination: true,
                child_recommendations: {
                    include: {
                        recommendations: true,
                    },
                },
            };
        }

        if (name_params) {
            findOptions.where = {
                name: { contains: name_params },
            };
        }

        if (limit) {
            findOptions.take = parseInt(limit);
        }

        if (skip) {
            findOptions.skip = parseInt(skip);
        }

        if (sort) {
            findOptions.orderBy = {
                name: sort,
            };
        }

        const children = await prisma.children.findMany(findOptions);
        // Fetch total count
        const totalCount = await prisma.children.count({
            where: findOptions.where,
        });
        // Calculate next cursor
        const nextCursor =
            parseInt(skip) + children.length < totalCount
                ? parseInt(skip) + children.length
                : null;

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
            {
                status: "success",
                children: childrenWithLastAssesmentDate,
                totalCount,
                nextCursor,
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
    }
}

const saveImage = (base64String: string, imagePath: string) => {
    const base64Data = base64String.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");
    fs.writeFileSync(imagePath, buffer);
};

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

// export async function POST(req: any, { params }: any) {
//     try {
//         const id = parseInt(params.studentId);
//         const data: ChildrenData = await req.json();

//         const {
//             teacher_id,
//             parent_dad,
//             parent_mother,
//             parent_wali,
//             full_name,
//             nick_name,
//             gender,
//             place_birth,
//             date_birth: date_time_birth,
//             religion,
//             count_of_siblings,
//             risk_category,
//             hearing: hearing_test,
//             picture,
//             // Birth History
//             healthy_pregnancy,
//             pregnancy_illness,
//             gestation_details,
//             birthplace,
//             birth_assistance,
//             delivery_process,
//             congenital_anomalies,
//             first_food,
//             formula_milk,
//             immunization,
//             // Health Status
//             pediatrician,
//             rehabilitation,
//             psychologist,
//             therapist,
//             // Expert Examination
//             serious_illness,
//             current_diseases,
//             treatment_location,
//             treatment_duration,
//             general_comparison,
//             crawling_development,
//             sitting_development,
//             walking_development,
//             first_words_age,
//             speaking_fluency_age,
//             bedwetting,
//         } = data;

//         // Check if the child exists
//         const childExist = await prisma.children.findUnique({
//             where: { id },
//         });

//         if (teacher_id) {
//             const teacherExist = await prisma.users.findUnique({
//                 where: { id: parseInt(teacher_id) },
//             });

//             if (!teacherExist) {
//                 return NextResponse.json(
//                     { status: "error", message: "Teacher Not Found" },
//                     { status: 404 }
//                 );
//             }
//         } else {
//             return NextResponse.json(
//                 { status: "error", message: "Teacher Not Found" },
//                 { status: 404 }
//             );
//         }

//         if (!childExist) {
//             return NextResponse.json(
//                 { status: "error", message: "Child Not Found" },
//                 { status: 404 }
//             );
//         }

//         // Check if at least one parent is provided
//         if (!parent_dad && !parent_mother && !parent_wali) {
//             return NextResponse.json(
//                 {
//                     status: "error",
//                     message: "At least one parent must be provided",
//                 },
//                 { status: 400 }
//             );
//         }

//         // Create array to connect parents
//         const connectParents: { id: number }[] = [];
//         if (parent_dad) {
//             const dad = await prisma.users.findUnique({
//                 where: { id: parseInt(parent_dad), type: "ayah" },
//             });
//             if (!dad) {
//                 return NextResponse.json(
//                     { status: "error", message: "Parent (dad) not found" },
//                     { status: 404 }
//                 );
//             }
//             connectParents.push({ id: parseInt(parent_dad) });
//         }
//         if (parent_mother) {
//             const mother = await prisma.users.findUnique({
//                 where: { id: parseInt(parent_mother), type: "ibu" },
//             });
//             if (!mother) {
//                 return NextResponse.json(
//                     { status: "error", message: "Parent (mother) not found" },
//                     { status: 404 }
//                 );
//             }
//             connectParents.push({ id: parseInt(parent_mother) });
//         }
//         if (parent_wali) {
//             const wali = await prisma.users.findUnique({
//                 where: { id: parseInt(parent_wali), type: "wali" },
//             });
//             if (!wali) {
//                 return NextResponse.json(
//                     { status: "error", message: "Parent (wali) not found" },
//                     { status: 404 }
//                 );
//             }
//             connectParents.push({ id: parseInt(parent_wali) });
//         }

//         // Prepare the connect and disconnect arrays for parent
//         const existingParents = await prisma.children.findUnique({
//             where: { id },
//             select: {
//                 parent: {
//                     select: {
//                         id: true,
//                     },
//                 },
//             },
//         });

//         const existingParentIds =
//             existingParents?.parent.map((p) => p.id) || [];

//         const disconnectParents = existingParentIds
//             .filter(
//                 (existingId) =>
//                     !connectParents.some((cp: any) => cp.id === existingId)
//             )
//             .map((id) => ({ id }));

//         // Update child data and include related data

//         // if (typeof picture === "string") {
//         //     // Do nothing, keep existing picture path
//         // } else if (picture instanceof File) {
//         let updatedPicture = childExist.picture;
//         if (typeof picture === "string" && picture.startsWith("data:image")) {
//             const base64Data = picture.replace(/^data:image\/\w+;base64,/, "");
//             const buffer = Buffer.from(base64Data, "base64");
//             const imageName = `${Date.now()}_${full_name}_image.png`;
//             const fullPath = path.join(
//                 process.cwd(),
//                 "public",
//                 `/uploads/children/${imageName}`
//             );

//             fs.writeFileSync(fullPath, buffer);
//             updatedPicture = imageName;

//             // Delete previous image if exists
//             if (childExist.picture && childExist.picture !== updatedPicture) {
//                 const existingImagePath = path.join(
//                     process.cwd(),
//                     "public",
//                     `/uploads/children/${childExist.picture}`
//                 );
//                 if (fs.existsSync(existingImagePath)) {
//                     fs.unlinkSync(existingImagePath);
//                 }
//             }
//         }

//         const updatedChild = await prisma.children.update({
//             where: { id },
//             include: {
//                 birth_history: true,
//                 expert_examination: true,
//                 health_status: true,
//             },
//             data: {
//                 teacher_id: teacher_id ? parseInt(teacher_id) : null,
//                 full_name,
//                 picture: updatedPicture,
//                 nick_name,
//                 gender,
//                 place_birth,
//                 date_time_birth:
//                     date_time_birth !== undefined
//                         ? date_time_birth
//                             ? new Date(date_time_birth)
//                             : null
//                         : childExist.date_time_birth,
//                 religion,
//                 count_of_siblings,
//                 risk_category,
//                 hearing_test,
//                 parent: {
//                     connect: connectParents,
//                     disconnect: disconnectParents,
//                 },
//                 birth_history: {
//                     upsert: {
//                         create: {
//                             healthy_pregnancy,
//                             pregnancy_illness,
//                             gestation_details,
//                             birthplace,
//                             birth_assistance,
//                             delivery_process,
//                             congenital_anomalies,
//                             first_food,
//                             formula_milk,
//                             immunization,
//                         },
//                         update: {
//                             healthy_pregnancy,
//                             pregnancy_illness,
//                             gestation_details,
//                             birthplace,
//                             birth_assistance,
//                             delivery_process,
//                             congenital_anomalies,
//                             first_food,
//                             formula_milk,
//                             immunization,
//                         },
//                     },
//                 },
//                 expert_examination: {
//                     upsert: {
//                         create: {
//                             pediatrician,
//                             rehabilitation,
//                             psychologist,
//                             therapist,
//                         },
//                         update: {
//                             pediatrician,
//                             rehabilitation,
//                             psychologist,
//                             therapist,
//                         },
//                     },
//                 },
//                 health_status: {
//                     upsert: {
//                         create: {
//                             serious_illness,
//                             current_diseases,
//                             treatment_location,
//                             treatment_duration,
//                             general_comparison,
//                             crawling_development,
//                             sitting_development,
//                             walking_development,
//                             first_words_age,
//                             speaking_fluency_age,
//                             bedwetting,
//                         },
//                         update: {
//                             serious_illness,
//                             current_diseases,
//                             treatment_location,
//                             treatment_duration,
//                             general_comparison,
//                             crawling_development,
//                             sitting_development,
//                             walking_development,
//                             first_words_age,
//                             speaking_fluency_age,
//                             bedwetting,
//                         },
//                     },
//                 },
//             },
//         });

//         return NextResponse.json(
//             {
//                 status: "success",
//                 message: "Child Updated Successfully",
//                 child: updatedChild,
//             },
//             { status: 200 }
//         );
//     } catch (error: any) {
//         return NextResponse.json(
//             {
//                 status: "error",
//                 message: error.message || "Internal Server Error",
//             },
//             { status: 500 }
//         );
//     } finally {
//         await prisma.$disconnect();
//     }
// }

// export async function POST(req: NextRequest) {
//     try {
//         const data: ChildrenData = await req.json();

//         const {
//             teacher_id,
//             parent_dad,
//             parent_mother,
//             parent_wali,
//             full_name,
//             nick_name,
//             gender,
//             place_birth,
//             date_birth: date_time_birth,
//             religion,
//             count_of_siblings,
//             risk_category,
//             hearing: hearing_test,
//             picture,
//             // Birth History
//             healthy_pregnancy,
//             pregnancy_illness,
//             gestation_details,
//             birthplace,
//             birth_assistance,
//             delivery_process,
//             congenital_anomalies,
//             first_food,
//             formula_milk,
//             immunization,
//             // Health Status
//             pediatrician,
//             rehabilitation,
//             psychologist,
//             therapist,
//             // Expert Examination
//             serious_illness,
//             current_diseases,
//             treatment_location,
//             treatment_duration,
//             general_comparison,
//             crawling_development,
//             sitting_development,
//             walking_development,
//             first_words_age,
//             speaking_fluency_age,
//             bedwetting,
//         } = data;

//         // if date time birth is not provided, set it to null
//         if (!date_time_birth) {
//             // data.date_birth = null;
//             return NextResponse.json(
//                 { status: "error", message: "Date of Birth is required" },
//                 { status: 400 }
//             );
//         }

//         // Ensure date_time_birth is a valid Date object or null
//         const birthDate = date_time_birth ? new Date(date_time_birth) : null;

//         // Check if at least one parent is provided
//         if (!parent_dad && !parent_mother && !parent_wali) {
//             return NextResponse.json(
//                 {
//                     status: "error",
//                     message: "At least one parent must be provided",
//                 },
//                 { status: 400 }
//             );
//         }

//         // Create array to connect parents
//         const connectParents = [];
//         if (parent_dad) {
//             const dad = await prisma.users.findUnique({
//                 where: { id: parseInt(parent_dad), type: "ayah" },
//             });
//             if (!dad) {
//                 return NextResponse.json(
//                     { status: "error", message: "Parent (dad) not found" },
//                     { status: 404 }
//                 );
//             }
//             connectParents.push({ id: parseInt(parent_dad) });
//         }
//         if (parent_mother) {
//             const mother = await prisma.users.findUnique({
//                 where: { id: parseInt(parent_mother), type: "ibu" },
//             });
//             if (!mother) {
//                 return NextResponse.json(
//                     { status: "error", message: "Parent (mother) not found" },
//                     { status: 404 }
//                 );
//             }
//             connectParents.push({ id: parseInt(parent_mother) });
//         }
//         if (parent_wali) {
//             const wali = await prisma.users.findUnique({
//                 where: { id: parseInt(parent_wali), type: "wali" },
//             });
//             if (!wali) {
//                 return NextResponse.json(
//                     { status: "error", message: "Parent (wali) not found" },
//                     { status: 404 }
//                 );
//             }
//             connectParents.push({ id: parseInt(parent_wali) });
//         }

//         let imagePath = "",
//             imageFullPath = "";
//         if (picture) {
//             const base64Data = picture.replace(/^data:image\/\w+;base64,/, "");
//             const buffer = Buffer.from(base64Data, "base64");
//             imagePath = `${Date.now()}_${full_name}_image.png`;
//             imageFullPath = `/uploads/children/${imagePath}`;
//             const fullPath = path.join(process.cwd(), "public", imageFullPath);

//             fs.writeFileSync(fullPath, buffer);
//         }

//         // Create child
//         const child = await prisma.children.create({
//             include: {
//                 birth_history: true,
//                 expert_examination: true,
//                 health_status: true,
//             },
//             data: {
//                 teacher_id: teacher_id ? parseInt(teacher_id) : null,
//                 full_name,
//                 nick_name,
//                 gender,
//                 place_birth,
//                 date_time_birth: birthDate,
//                 religion,
//                 count_of_siblings,
//                 risk_category,
//                 hearing_test,
//                 picture: imagePath,
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
