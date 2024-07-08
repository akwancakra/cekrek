import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { capitalizeFirstLetter } from "@/utils/formattedDate";

export async function GET(req: NextRequest) {
    const directoryPath = path.join(
        process.cwd(),
        "public/static/images/recommendations"
    );

    try {
        const files = await fs.readdir(directoryPath);
        const imageFiles = files.filter((file) =>
            /\.(jpg|jpeg|png)$/i.test(file)
        );

        const imageOptions = imageFiles.map((image) => {
            // Mendapatkan nama file tanpa ekstensi dan mengganti tanda "-"
            const label = image
                .split("/")
                .pop()
                .replace(/\.[^/.]+$/, "")
                .replace(/-/g, " ");
            return {
                label: capitalizeFirstLetter(label),
                value: image,
            };
        });

        return NextResponse.json(
            { status: "success", icons: imageOptions },
            { status: 200 }
        );
    } catch (err) {
        return NextResponse.json(
            {
                status: "error",
                message: "Tidak dapat mengambil gambar rekomendasi",
            },
            { status: 500 }
        );
    }
}
