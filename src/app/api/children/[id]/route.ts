import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { generateAssessmentWrap } from "@/utils/converters";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

interface ChildrenData {
    teacher_id: string;
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

export async function GET(req: any, { params }: any) {
    try {
        const studentId = parseInt(params.id);
        const child = await prisma.children.findUnique({
            where: { id: studentId },
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
        });

        if (!child) {
            return NextResponse.json(
                { status: "error", message: "Child Not Found" },
                { status: 200 }
            );
        }

        if (child?.teacher_id) {
            const teacher = await prisma.users.findUnique({
                where: { id: child.teacher_id },
            });

            child.teacher_id = teacher.id;
        }

        // Get the latest child_assesment date for the current child
        const lastAssesment = await prisma.child_assesment.findFirst({
            where: { children_id: child.id },
            orderBy: { date_time: "desc" }, // order by date_time to get the latest one
            select: { date_time: true }, // select only the date_time field
        });

        // Convert date_time to ISO string and extract the date part
        const lastAssesmentDate = lastAssesment
            ? lastAssesment.date_time.toISOString().split("T")[0]
            : null;

        // Include last_assesment_date in the response
        const response = {
            ...child,
            last_assesment_date: lastAssesmentDate,
        };

        // BUAT MONITOR TABLE
        // Flatten monitors
        const allMonitors = child.child_recommendations
            .map((rec) => rec.monitors)
            .flat();

        // Group monitors by date
        const monitorsByDate: { [date: string]: any } = {};
        allMonitors.forEach((monitor) => {
            const date = monitor.date_time.toISOString().split("T")[0];
            if (!monitorsByDate[date]) {
                monitorsByDate[date] = {
                    date: date,
                    finishedActivities: 0,
                    unfinishedActivities: 0,
                };
            }
            if (monitor.is_done) {
                monitorsByDate[date].finishedActivities++;
            } else {
                monitorsByDate[date].unfinishedActivities++;
            }
        });

        // Convert object to array for response
        const monitor_table_data = Object.values(monitorsByDate);

        const childFinal = {
            ...response,
            child_assesments: generateAssessmentWrap(response),
            monitor_table_data,
        };

        return NextResponse.json(
            { status: "success", child: childFinal },
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

// export async function GET(req: any, { params }: any) {
//     try {
//         const id = parseInt(params.id);
//         const child = await prisma.children.findUnique({
//             where: { id: id },
//             include: {
//                 birth_history: true,
//                 health_status: true,
//                 expert_examination: true,
//                 child_recommendations: {
//                     include: {
//                         recommendations: true,
//                     },
//                 },
//             },
//         });
//         if (!child) {
//             return NextResponse.json(
//                 { status: "error", message: "Child Not Found" },
//                 { status: 200 }
//             );
//         }
//         return NextResponse.json({ status: "success", child }, { status: 200 });
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

export async function PUT(req: any, { params }: any) {
    try {
        const id = parseInt(params.studentId);
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

        // Check if the child exists
        const childExist = await prisma.children.findUnique({
            where: { id },
        });

        const teacherExist = await prisma.users.findUnique({
            where: { id: parseInt(teacher_id) },
        });

        if (!teacherExist) {
            return NextResponse.json(
                { status: "error", message: "Teacher Not Found" },
                { status: 404 }
            );
        }

        if (!childExist) {
            return NextResponse.json(
                { status: "error", message: "Child Not Found" },
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

        // Prepare the connect and disconnect arrays for parent
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

        const existingParentIds =
            existingParents?.parent.map((p) => p.id) || [];

        const disconnectParents = existingParentIds
            .filter(
                (existingId) =>
                    !connectParents.some((cp: any) => cp.id === existingId)
            )
            .map((id) => ({ id }));

        // Update child data and include related data

        // if (typeof picture === "string") {
        //     // Do nothing, keep existing picture path
        // } else if (picture instanceof File) {
        let updatedPicture = childExist.picture;
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

            // Delete previous image if exists
            if (childExist.picture && childExist.picture !== updatedPicture) {
                const existingImagePath = path.join(
                    process.cwd(),
                    "public",
                    `/uploads/children/${childExist.picture}`
                );
                if (fs.existsSync(existingImagePath)) {
                    fs.unlinkSync(existingImagePath);
                }
            }
        }

        const updatedChild = await prisma.children.update({
            where: { id },
            include: {
                birth_history: true,
                expert_examination: true,
                health_status: true,
            },
            data: {
                teacher_id: parseInt(teacher_id),
                full_name,
                picture: updatedPicture,
                nick_name,
                gender,
                place_birth,
                date_time_birth:
                    date_time_birth !== undefined
                        ? date_time_birth
                            ? new Date(date_time_birth)
                            : null
                        : childExist.date_time_birth,
                religion,
                count_of_siblings,
                risk_category,
                hearing_test,
                parent: {
                    connect: connectParents,
                    disconnect: disconnectParents,
                },
                birth_history: {
                    upsert: {
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
                },
                expert_examination: {
                    upsert: {
                        create: {
                            pediatrician,
                            rehabilitation,
                            psychologist,
                            therapist,
                        },
                        update: {
                            pediatrician,
                            rehabilitation,
                            psychologist,
                            therapist,
                        },
                    },
                },
                health_status: {
                    upsert: {
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

// export async function PUT(req: any, { params }: any) {
//     try {
//         const id = parseInt(params.id);
//         const data = await req.json();
//         const {
//             parent_id,
//             full_name,
//             nick_name,
//             gender,
//             place_birth,
//             date_time_birth,
//             religion,
//             count_of_siblings,
//             risk_category,
//             hearing_test,
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

//         if (!childExist) {
//             return NextResponse.json(
//                 { status: "error", message: "Child Not Found" },
//                 { status: 404 }
//             );
//         }

//         // Check if parent is valid
//         const parent = await prisma.users.findUnique({
//             where: { id: parent_id, role: "parent" },
//         });
//         if (!parent)
//             return NextResponse.json(
//                 { status: "error", message: "Parent not found" },
//                 { status: 404 }
//             );

//         // Prepare the connect and disconnect arrays for parent
//         let connectParents: any = [];
//         if (Array.isArray(parent_id)) {
//             connectParents = parent_id.map((id) => ({ id }));
//         } else if (parent_id) {
//             connectParents = [{ id: parent_id }];
//         }

//         // Check if the child exists
//         const existingChild = await prisma.children.findUnique({
//             where: { id },
//             include: { parent: true }, // Include parent to verify
//         });

//         if (!existingChild) {
//             return NextResponse.json(
//                 { status: "error", message: "Child Not Found" },
//                 { status: 404 }
//             );
//         }

//         // Fetch existing parents to disconnect any that are not included in the new parent_id array
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
//         const updatedChild = await prisma.children.update({
//             where: { id },
//             include: {
//                 birth_history: true,
//                 expert_examination: true,
//                 health_status: true,
//             },
//             data: {
//                 full_name,
//                 nick_name,
//                 gender,
//                 place_birth,
//                 date_time_birth:
//                     date_time_birth !== undefined
//                         ? date_time_birth
//                             ? new Date(date_time_birth)
//                             : null
//                         : existingChild.date_time_birth, // Preserve existing date_time_birth if not provided or explicitly set to null
//                 religion,
//                 count_of_siblings,
//                 risk_category,
//                 hearing_test,
//                 parent: {
//                     connect: connectParents,
//                     disconnect: disconnectParents,
//                 },
//                 birth_history: {
//                     update: {
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
//                     update: {
//                         pediatrician,
//                         rehabilitation,
//                         psychologist,
//                         therapist,
//                     },
//                 },
//                 health_status: {
//                     update: {
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
