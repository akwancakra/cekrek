import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import fs from "fs";
import * as XLSX from "xlsx";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const file_example_path = path.join(
      process.cwd(),
      "public/uploads",
      "Format_Import_Data_Peserta_Didik_SLB_Satria_Galdin.xlsx"
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
        "attachment; filename=Format_Import_Data_Peserta_Didik_SLB_Satria_Galdin.xlsx",
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

const parseExcelFile = (filePath: string) => {
  const workbook = XLSX.read(fs.readFileSync(filePath), { type: "buffer" });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const jsonData = XLSX.utils.sheet_to_json(sheet);

  // Map through jsonData and replace 'L' and 'P' with 'laki-laki' and 'perempuan' respectively
  const mappedData = jsonData.map((row: any) => {
    return {
      ...row,
      "Jenis Kelamin": row["Jenis Kelamin"] === "L" ? "laki-laki" : "perempuan",
    };
  });

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

    const childrenData = parseExcelFile(filePath);
    console.log("Parsed data:", JSON.stringify(childrenData, null, 2));

    // Store the data in the database
    const createMany = childrenData.map((child: any) =>
      prisma.children.create({
        data: {
          full_name: child["Nama Lengkap"],
          nick_name: child["Nama Panggilan"],
          gender: child["Jenis Kelamin"],
          place_birth: child["Tempat Lahir"],
          date_time_birth: new Date(child["Tanggal Lahir"]),
          religion: child["Agama"],
          count_of_siblings: child["Jumlah Saudara Kandung"],
          risk_category: child["Kategori Risiko Autisme"],
          hearing_test: child["Hasil Tes Pendengaran"],
        },
      })
    );

    await prisma.$transaction(createMany);

    // Delete the file after processing
    fs.unlinkSync(filePath);
    console.log("File deleted:", filePath);

    return NextResponse.json({ Message: "Success", status: 201, childrenData });
  } catch (error: any) {
    console.log("Error occurred:", error);
    return NextResponse.json({
      Message: "Failed: " + error.message,
      status: 500,
    });
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};
