import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import fs from "fs";
import * as XLSX from "xlsx";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const file_example_path = path.join(
      process.cwd(),
      "public/uploads",
      "Format_Import_Data_Users.xlsx"
    );

    // Check if the file exists
    if (!fs.existsSync(file_example_path)) {
      return NextResponse.json(
        {
          status: "error",
          message: "File not found",
        },
        { status: 404 }
      );
    }

    // Read the file content
    const fileContent = fs.readFileSync(file_example_path);

    // Set headers to force download
    const headers = {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition":
        "attachment; filename=Format_Import_Data_Users.xlsx",
    };

    // Send the file as a response
    return new Response(fileContent, {
      headers,
    });
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

const saveExcelFile = async (buffer: Buffer, filename: string) => {
  const filePath = path.join(process.cwd(), "public/uploads", filename);
  await writeFile(filePath, buffer);
  return filePath;
};

const parseExcelFile = async (filePath: string) => {
  const workbook = XLSX.read(fs.readFileSync(filePath), { type: "buffer" });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const jsonData = XLSX.utils.sheet_to_json(sheet);

  // Map over the data and hash passwords asynchronously
  const mappedDataPromises = jsonData.map(async (row: any) => {
    // Convert password field to string
    const password = String(row["Password"]);
    // hash the password
    const hashedPassword =
      (await bcrypt.hash(password, 10)) || (await bcrypt.hash("12345678", 10));

    return {
      ...row,
      Password: hashedPassword,
    };
  });

  // Wait for all promises to resolve
  const mappedData = await Promise.all(mappedDataPromises);

  console.log(mappedData);
  return mappedData;
};

export const POST = async (req: any) => {
  const formData = await req.formData();

  const file = formData.get("file");
  if (!file) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = file.name.replaceAll(" ", "_");

  try {
    const filePath = await saveExcelFile(buffer, filename);
    console.log("File saved to:", filePath);

    const userData = await parseExcelFile(filePath); // Await here
    console.log("Parsed data:", JSON.stringify(userData, null, 2));

    const createMany = userData.map((user: any) =>
      prisma.users.create({
        data: {
          name: user["Nama Lengkap"],
          email: user["Email"],
          password: user["Password"], // Ensure this is hashed
          role: user["Role"],
          place_birth: user["Tempat Lahir"],
          date_time_birth: new Date(user["Tanggal Lahir"]),
          religion: user["Agama"],
          education: user["Pendidikan Terakhir"],
          job: user["Pekerjaan"],
          address: user["Alamat"],
          phone: user["No Telepon"],
          type: user["Tipe Orang Tua/Wali"],
        },
      })
    );

    await prisma.$transaction(createMany);

    fs.unlinkSync(filePath);
    console.log("File deleted:", filePath);

    return NextResponse.json({
      Message: "Success",
      status: 201,
      userData,
    });
  } catch (error: any) {
    console.log("Error occurred:", error);
    return NextResponse.json({
      Message: "Failed: " + error.message,
      status: 500,
    });
  }
};

// Replace this section with the new configuration
export const dynamic = "force-dynamic";

export const dynamicParams = true;

export const revalidate = 60;
