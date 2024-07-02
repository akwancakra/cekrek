import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { generateAssessmentWrap } from "@/utils/converters";

const prisma = new PrismaClient();

export async function GET(req: any, { params }: any) {
    try {
        const parentId = parseInt(params.id);
        const childId = parseInt(params.childId);

        const child = await prisma.children.findUnique({
            where: { id: childId },
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
                parent: {
                    where: { id: parentId },
                },
            },
        });

        if (!child) {
            return NextResponse.json(
                { status: "error", message: "Child Not Found" },
                { status: 200 }
            );
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

export async function PUT(req: any, { params }: any) {
    try {
        const id = parseInt(params.childId);
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

        const parent_ids = Array.isArray(parent_id) ? parent_id : [parent_id];

        // Fetch parents with the given IDs
        const parents = await prisma.users.findMany({
            where: {
                id: { in: parent_ids },
                role: "parent",
            },
        });

        // Extract the IDs of the found parents
        const foundParentIds = parents.map((parent) => parent.id);

        // Identify missing parent IDs
        const missingParentIds = parent_ids.filter(
            (id) => !foundParentIds.includes(id)
        );

        if (missingParentIds.length > 0) {
            return NextResponse.json(
                {
                    status: "error",
                    message: `Parent ID(s) ${missingParentIds.join(
                        ", "
                    )} not found`,
                },
                { status: 404 }
            );
        }

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

        const existingParentIds =
            existingParents?.parent.map((p) => p.id) || [];
        const disconnectParents = existingParentIds
            .filter(
                (existingId) =>
                    !connectParents.some((cp: any) => cp.id === existingId)
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
                picture: data.picture || existingChild.picture,
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

// Delete a child
export async function DELETE(req: any, { params }: any) {
    try {
        const id = parseInt(params.childId);

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

        // Delete the child
        await prisma.children.delete({
            where: { id },
        });

        return NextResponse.json(
            { status: "success", message: "Child Deleted Successfully" },
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
