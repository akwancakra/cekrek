import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: any, { params }: any) {
    try {
        const id = parseInt(params.id);
        const recommendation = await prisma.recommendations.findUnique({
            where: { id: id },
        });
        if (!recommendation) {
            return NextResponse.json(
                { status: "error", message: "Recommendation Not Found" },
                { status: 200 }
            );
        }
        return NextResponse.json(
            { status: "success", recommendation },
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
        const id = parseInt(params.id);
        const data = await req.json();
        const {
            type,
            title,
            description,
            icon,
            duration,
            duration_type,
            repetition,
            risk_category,
        } = data;

        const userExists = await prisma.recommendations.findUnique({
            where: { id: id },
        });

        if (!userExists) {
            return NextResponse.json(
                { status: "error", message: "Recommendation Not Found" },
                { status: 200 }
            );
        }

        // Update user data
        const teacherData = {
            type,
            title,
            description,
            icon,
            duration,
            duration_type,
            repetition,
            risk_category,
        };

        const recommendation = await prisma.recommendations.update({
            where: { id: id },
            data: teacherData,
        });

        return NextResponse.json(
            {
                status: "success",
                message: "Recommendation Updated Successfully",
                recommendation,
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

export async function DELETE(req: any, { params }: any) {
    const prisma = new PrismaClient();

    try {
        const id = parseInt(params.id);

        // Mulai transaksi
        await prisma.$transaction(async (prisma) => {
            // Cari recommendation di dalam transaksi
            const recommendation = await prisma.recommendations.findUnique({
                where: { id: id, is_main: false },
            });

            if (!recommendation) {
                throw new Error(
                    "Recommendation Not Found or Recommendation Can't Be Deleted"
                );
            }

            // Cari child_recommendations terkait di dalam transaksi
            // await prisma.child_recommendations.findMany({
            //     where: { recommendation_id: id },
            // });

            await prisma.monitor_child_recommendation.deleteMany({
                where: { child_recommendation_id: id },
            });

            // Hapus semua child_recommendations di dalam transaksi
            await prisma.child_recommendations.deleteMany({
                where: { recommendation_id: id },
            });

            // Hapus recommendation di dalam transaksi
            await prisma.recommendations.delete({
                where: { id: id },
            });
        });

        // Berhasil jika tidak ada kesalahan dalam transaksi
        return NextResponse.json(
            {
                status: "success",
                message:
                    "Recommendation and associated child_recommendations deleted successfully",
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.log(error);

        // Rollback secara implisit karena transaksi gagal
        return NextResponse.json(
            {
                status: "error",
                message: error.message || "Internal Server Error",
            },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect(); // Pastikan untuk memutus koneksi setelah selesai
    }
}

// export async function DELETE(req: any, { params }: any) {
//     try {
//         const id = parseInt(params.id);

//         const teacherExist = await prisma.recommendations.findUnique({
//             where: { id: id, is_main: false },
//         });

//         if (!teacherExist) {
//             return NextResponse.json(
//                 { status: "error", message: "Recommendation Not Found" },
//                 { status: 200 }
//             );
//         }

//         const recommendation = await prisma.recommendations.delete({
//             where: { id: id },
//         });
//         return NextResponse.json(
//             {
//                 status: "success",
//                 message: "Recommendation Deleted Successfully",
//                 recommendation,
//             },
//             { status: 200 }
//         );
//     } catch (error: any) {
//         console.log(error);
//         return NextResponse.json(
//             {
//                 status: "error",
//                 message: error.message || "Internal Server Error",
//             },
//             { status: 500 }
//         );
//     }
// }
