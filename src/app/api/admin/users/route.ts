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
        const users = await prisma.users.findMany({
            where: { name: { contains: name_params } },
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
            take: parseInt(limit),
            skip: parseInt(skip),
        });
        if (users.length === 0)
            return NextResponse.json(
                { status: "error", message: "No Users Found" },
                { status: 200 }
            );
        return NextResponse.json({ status: "success", users }, { status: 200 });
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

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const { email, password, role, name } = data;

        let defaultPassword = "";
        if (!password) {
            const trimmedName = name.replace(/\s+/g, "").toLowerCase();
            defaultPassword = trimmedName + "-cekrek";
        }

        // role should be either "teacher" or "parent"
        if (role !== "admin") {
            return NextResponse.json(
                {
                    status: "error",
                    message: "Role should be admin",
                },
                { status: 400 }
            );
        }

        // Create user
        const user = await prisma.users.create({
            data: {
                name,
                email,
                role,
                password: await bcrypt.hash(password || defaultPassword, 10),
            },
        });

        return NextResponse.json({ status: "success", user }, { status: 201 });
    } catch (error: any) {
        if (error.code === "P2002") {
            // Unique constraint error
            return NextResponse.json(
                { status: "error", message: "Email already exists" },
                { status: 400 }
            );
        } else {
            // Other errors
            return NextResponse.json(
                {
                    status: "error",
                    message: error.message || "Internal Server Error",
                },
                { status: 500 }
            );
        }
    }
}
