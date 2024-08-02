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
        const sort = url.searchParams.get("sort"); // asc, desc
        const plain = url?.searchParams?.get("plain") === "true";

        // Deklarasikan findOptions sebagai any untuk mengizinkan properti dinamis
        let findOptions: any = { where: { role: "teacher" } };

        if (!plain) {
            findOptions.include = { children: true };
        }

        if (name_params) {
            findOptions.where = {
                ...findOptions.where,
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

        const teachers = await prisma.users.findMany(findOptions);
        // where: { role: "teacher", name: { contains: name_params } },
        // include: { children: true },
        // take: parseInt(limit),
        // skip: parseInt(skip),

        // Fetch total count
        const totalCount = await prisma.users.count({
            where: findOptions.where,
        });

        // // Calculate next cursor
        const nextCursor =
            parseInt(skip) + teachers.length < totalCount
                ? parseInt(skip) + teachers.length
                : null;

        if (teachers.length === 0)
            return NextResponse.json(
                { status: "error", message: "No Teachers Found" },
                { status: 200 }
            );
        return NextResponse.json(
            { status: "success", teachers, totalCount, nextCursor },
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

        // Create user
        const teacher = await prisma.users.create({
            data: {
                name,
                email,
                role,
                password: await bcrypt.hash(password || defaultPassword, 10),
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
            { status: "success", teacher },
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
