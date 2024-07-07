import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function GET(req: any, { params }: any) {
    try {
        const id = parseInt(params.id);
        const teacher = await prisma.users.findUnique({
            where: { id: id, role: "teacher" },
            include: { children: true },
        });
        if (!teacher) {
            return NextResponse.json(
                { status: "error", message: "Teacher Not Found" },
                { status: 400 }
            );
        }
        return NextResponse.json(
            { status: "success", teacher },
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
            name,
            email,
            password,
            role,
            place_birth,
            date_time_birth,
            religion,
            education,
            job,
            address,
            phone,
        } = data;

        const userExists = await prisma.users.findUnique({
            where: { id: id },
        });

        if (!userExists) {
            return NextResponse.json(
                { status: "error", message: "Teacher Not Found" },
                { status: 400 }
            );
        }

        // Check email is unique
        const emailExist = await prisma.users.findFirst({
            where: { email: email },
        });

        if (emailExist && emailExist.id !== id) {
            return NextResponse.json(
                { status: "error", message: "Email Already Exist" },
                { status: 400 }
            );
        }

        // Check if password is provided and not empty
        let hashedPassword;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        // Update user data
        const teacherData = {
            name,
            email,
            role,
            place_birth,
            date_time_birth:
                date_time_birth !== undefined
                    ? date_time_birth
                        ? new Date(date_time_birth)
                        : null
                    : userExists.date_time_birth, // Preserve existing date_time_birth if not provided or explicitly set to null
            religion,
            education,
            job,
            address,
            phone,
            // Only include hashed password if provided
            ...(hashedPassword && { password: hashedPassword }),
        };

        const teacher = await prisma.users.update({
            where: { id: id },
            data: teacherData,
        });

        return NextResponse.json(
            {
                status: "success",
                message: "Teacher Updated Successfully",
                teacher,
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
    try {
        const id = parseInt(params.id);

        const teacherExist = await prisma.users.findUnique({
            where: { id: id, role: "teacher" },
        });

        if (!teacherExist) {
            return NextResponse.json(
                { status: "error", message: "Teacher Not Found" },
                { status: 400 }
            );
        }

        const teacher = await prisma.users.delete({
            where: { id: id, role: "teacher" },
        });
        return NextResponse.json(
            {
                status: "success",
                message: "Teacher Deleted Successfully",
                teacher,
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
