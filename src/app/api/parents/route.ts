import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const name_params = url.searchParams.get("name");
        const plain = url.searchParams.get("plain") === "true";
        const limit = url.searchParams.get("limit") as string;
        const skip = url.searchParams.get("skip") as string;
        const type = url.searchParams.get("type"); // ayah, ibu, wali
        const sort = url.searchParams.get("sort"); // asc, desc

        // Deklarasikan findOptions sebagai any untuk mengizinkan properti dinamis
        let findOptions: any = {
            where: { role: "parent" },
        };

        if (limit) {
            findOptions.take = parseInt(limit);
        }

        if (skip) {
            findOptions.skip = parseInt(skip);
        }

        if (name_params) {
            // Pastikan properti where sudah dideklarasikan sebagai objek
            findOptions.where = {
                ...findOptions.where,
                name: { contains: name_params },
            };
        }

        if (type) {
            findOptions.where = {
                ...findOptions.where,
                type: type,
            };
        }

        if (sort) {
            findOptions.orderBy = {
                name: sort,
            };
        }

        if (!plain) {
            // Tambahkan properti include
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
                        child_assesments: {
                            include: {
                                assesment: true,
                            },
                        },
                    },
                },
            };
        }

        const parents = await prisma.users.findMany(findOptions);

        // Fetch total count
        const totalCount = await prisma.users.count({
            where: findOptions.where,
        });

        // Calculate next cursor
        const nextCursor =
            parseInt(skip) + parents.length < totalCount
                ? parseInt(skip) + parents.length
                : null;

        if (parents.length === 0) {
            return NextResponse.json(
                { status: "error", message: "No Parents Found" },
                { status: 200 }
            );
        }

        return NextResponse.json(
            { status: "success", parents, totalCount, nextCursor },
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

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const {
            email,
            password,
            role,
            name,
            type,
            place_birth,
            date_time_birth,
            religion,
            education,
            job,
            address,
            phone,
        } = data;

        let defaultPassword = "";
        if (!password) {
            const trimmedName = name.replace(/\s+/g, "").toLowerCase();
            defaultPassword = trimmedName + "-cekrek";
        }

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

        // if date time birth is not provided, set it to null
        if (!date_time_birth) {
            data.date_time_birth = null;
        }

        // Create user
        const parent = await prisma.users.create({
            data: {
                name,
                email,
                role,
                password: await bcrypt.hash(password || defaultPassword, 10),
                type,
                place_birth,
                date_time_birth: date_time_birth
                    ? new Date(date_time_birth)
                    : null,
                religion,
                education,
                job,
                address,
                phone,
            },
        });

        return NextResponse.json(
            { status: "success", parent },
            { status: 201 }
        );
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
