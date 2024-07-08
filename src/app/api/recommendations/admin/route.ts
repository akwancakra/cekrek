import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { iconsRecommendation } from "@/utils/fetcher";
import { truncateString } from "@/utils/converters";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();

        // Destructure data from the request body
        const {
            title,
            description,
            icon,
            is_main,
            assesment_number,
            frequency,
            risk_category,
        } = data;

        // const final_assesment_number = [0, -1, "0", "-1"].includes(
        //     assesment_number
        // )
        //     ? null
        //     : parseInt(assesment_number);

        let updatedPicture;
        if (typeof icon === "string" && icon.startsWith("data:image")) {
            const base64Data = icon.replace(/^data:image\/\w+;base64,/, "");
            const buffer = Buffer.from(base64Data, "base64");
            const imageName = `${Date.now()}_${truncateString(
                title,
                10
            )}_image.png`;
            const fullPath = path.join(
                process.cwd(),
                "public",
                `/uploads/recommendations/${imageName}`
            );

            fs.writeFileSync(fullPath, buffer);
            updatedPicture = imageName;
        } else {
            updatedPicture = icon;
        }

        // Insert data into the recommendations table
        const newRecommendation = await prisma.recommendations.create({
            data: {
                title,
                description,
                icon: updatedPicture,
                is_main,
                assesment_number: parseInt(assesment_number),
                frequency,
                risk_category: risk_category === "other" ? null : risk_category,
            },
        });

        return NextResponse.json(
            { status: "success", recommendation: newRecommendation },
            { status: 201 }
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

export async function PUT(req: NextRequest) {
    try {
        const data = await req.json();

        // Destructure data from the request body
        const {
            id,
            title,
            description,
            icon,
            is_main,
            assesment_number,
            frequency,
            risk_category,
        } = data;

        const oldRecommendation = await prisma.recommendations.findUnique({
            where: { id: parseInt(id) },
        });

        if (!oldRecommendation) {
            return NextResponse.json(
                {
                    status: "error",
                    message: "Recommendation not found",
                },
                {
                    status: 404,
                }
            );
        }

        let updatedPicture = oldRecommendation.icon;
        if (typeof icon === "string" && icon.startsWith("data:image")) {
            const base64Data = icon.replace(/^data:image\/\w+;base64,/, "");
            const buffer = Buffer.from(base64Data, "base64");
            const imageName = `${Date.now()}_${id}_image.png`;
            const fullPath = path.join(
                process.cwd(),
                "public",
                `/uploads/recommendations/${imageName}`
            );

            fs.writeFileSync(fullPath, buffer);
            updatedPicture = imageName;

            // Delete previous image if exists
            if (
                oldRecommendation?.icon &&
                oldRecommendation.icon !== updatedPicture &&
                !iconsRecommendation.includes(oldRecommendation.icon)
            ) {
                const existingImagePath = path.join(
                    process.cwd(),
                    "public",
                    `/uploads/recommendations/${oldRecommendation.icon}`
                );
                if (fs.existsSync(existingImagePath)) {
                    fs.unlinkSync(existingImagePath);
                }
            }
        } else {
            updatedPicture = icon;
        }

        const teacherData = {
            title,
            description,
            icon: updatedPicture,
            is_main,
            assesment_number: parseInt(assesment_number),
            frequency,
            risk_category: risk_category === "other" ? null : risk_category,
        };

        // console.log(teacherData);

        // Update data in the recommendations table
        const updatedRecommendation = await prisma.recommendations.update({
            where: { id: parseInt(id) },
            data: teacherData,
        });

        return NextResponse.json(
            {
                status: "success",
                recommendation: updatedRecommendation,
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

// export async function DELETE(req: NextRequest, { params }: any) {
//     try {
//         const recommendationId = parseInt(params.id);

//         // Check if the recommendation with given ID exists
//         const recommendation = await prisma.recommendations.findUnique({
//             where: { id: recommendationId },
//         });

//         if (!recommendation) {
//             return NextResponse.json(
//                 { status: "error", message: "Recommendation not found" },
//                 { status: 404 }
//             );
//         }

//         // Check if the recommendation is_main is false
//         if (recommendation.is_main) {
//             return NextResponse.json(
//                 {
//                     status: "error",
//                     message: "Main recommendations cannot be deleted",
//                 },
//                 { status: 400 }
//             );
//         }

//         // Proceed with deleting the recommendation
//         await prisma.recommendations.delete({
//             where: { id: recommendationId },
//         });

//         return NextResponse.json(
//             {
//                 status: "success",
//                 message: "Recommendation deleted successfully",
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
//     }
// }
