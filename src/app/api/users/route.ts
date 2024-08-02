import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

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

        const users = await prisma.users.findMany(findOptions);
        // Fetch total count
        const totalCount = await prisma.users.count({
            where: findOptions.where,
        });

        // Calculate next cursor
        const nextCursor =
            parseInt(skip) + users.length < totalCount
                ? parseInt(skip) + users.length
                : null;

        if (users.length === 0)
            return NextResponse.json(
                { status: "error", message: "No Users Found" },
                { status: 200 }
            );
        return NextResponse.json(
            { status: "success", users, totalCount, nextCursor },
            { status: 200 }
        );
    } catch (error: any) {
        console.log(error);
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

        // role should be either "teacher" or "parent"
        if (!["teacher", "parent"].includes(role)) {
            return NextResponse.json(
                {
                    status: "error",
                    message: 'Role should be either "teacher" or "parent"',
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
                password: await bcrypt.hash(password, 10),
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
