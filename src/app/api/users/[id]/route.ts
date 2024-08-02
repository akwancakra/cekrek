import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function GET(req: any, { params }: any) {
    try {
        const id = parseInt(params.id);
        const user = await prisma.users.findUnique({
            where: { id: id },
            include: {
                children: {
                    include: {
                        birth_history: true,
                        health_status: true,
                        expert_examination: true,
                        child_recommendations: {
                            include: {
                                recommendations: true,
                            },
                        },
                    },
                },
            },
        });
        if (!user) {
            return NextResponse.json(
                { status: "error", message: "User Not Found" },
                { status: 200 }
            );
        }
        return NextResponse.json({ status: "success", user }, { status: 200 });
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
        const { email, password, role, name } = data;

        const userExists = await prisma.users.findUnique({
            where: { id: id },
        });

        if (!userExists) {
            return NextResponse.json(
                { status: "error", message: "User Not Found" },
                { status: 200 }
            );
        }

        // Check if password is provided and not empty
        let hashedPassword;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        // Update user data
        const userData = {
            email,
            name,
            role,
            // Only include hashed password if provided
            ...(hashedPassword && { password: hashedPassword }),
        };

        const user = await prisma.users.update({
            where: { id: id },
            data: userData,
        });

        return NextResponse.json(
            { status: "success", message: "User Updated Successfully", user },
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
    try {
        const id = parseInt(params.id);

        const userExists = await prisma.users.findUnique({
            where: { id: id },
        });

        if (!userExists) {
            return NextResponse.json(
                { status: "error", message: "User Not Found" },
                { status: 200 }
            );
        }

        const user = await prisma.users.delete({
            where: { id: id },
        });

        return NextResponse.json(
            { status: "success", message: "User Deleted Successfully", user },
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
