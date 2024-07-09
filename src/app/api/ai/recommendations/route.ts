import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Child } from "@/types/children.types";
import { formattedDate } from "@/utils/formattedDate";
import { AssessmentAnswer } from "@/types/assessmentAnswer.copy";

const prisma = new PrismaClient();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req: NextRequest) {
    try {
        // const url = new URL(req.url);
        // const limit = url?.searchParams?.get("limit") || "10";
        const {
            assesment,
            child,
            risk_category,
        }: {
            assesment: AssessmentAnswer[];
            child: Child;
            risk_category: string;
        } = await req.json();
        const prompt = buildPrompt(assesment, child, risk_category);

        console.log(assesment);
        console.log(prompt);

        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            generationConfig: { responseMimeType: "application/json" },
        });
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();
        // console.log(text);

        return NextResponse.json({ status: "success", text }, { status: 200 });
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

// untuk cek apakah anak terindikasi autis
const buildPrompt = (
    assessment: AssessmentAnswer[],
    child: Child,
    risk_category: string
) => {
    const assessmentDescriptions = assessment
        .map((item, index) => {
            return `${index + 1}. Pertanyaan: ${item.assesment?.question}`;
        })
        .join("\n");

    return `
Saya memiliki data hasil asesmen yang menunjukkan area di mana seorang anak gagal atau mengalami kesulitan. Berdasarkan hasil asesmen ini, saya ingin Anda memberikan rekomendasi aktivitas yang sesuai untuk membantu anak tersebut mengatasi kelemahan atau meningkatkan kemampuan mereka di area yang bermasalah.

Detil Pertanyaan Hasil Asesmen Yang Gagal atau Kurang:
${assessmentDescriptions}

Informasi Anak:
- Tanggal Lahir: ${
        child?.date_time_birth
            ? formattedDate(child.date_time_birth.toString())
            : "-"
    }
- Kategori autis: ${risk_category}

Berikan 3 rekomendasi aktivitas dalam format berikut:
[{
    aspect: string,
    title: string,
    description: string,
    frequency: string,
    icon: string,
},{
    aspect: string,
    title: string,
    description: string,
    frequency: string,
    icon: string,
},{
    aspect: string,
    title: string,
    description: string,
    frequency: string,
    icon: string,
}]

Catatan:
Anda dapat menggunakan tag html pada description untuk rekomendasi, untuk aspect itu maksimal 2 kata contohnya "Melatih Kognitif", "Motorik Halus". Untuk icon anda dapat memilih icon yang sesuai, berikut daftarnya:
- berekspresi-sesuai-arahan.png
- bermain-bowling.png
- bermain-di-tempat-sempit.png
- bermain-keseimbangan-dengan-satu-kaki.png
- bermain-keseimbangan.png
- bermain-lompat-tali.png
- berpura-pura-bermain-dengan-boneka.png
- bertanya-tentang-mobil.png
- ban-bergerak.png
- memanggil-dan-gestur.png
- memberikan-pernyataan-jalan-ramai.png
- menangkap-bola.png
- menanyakan-ingin-pergi-atau-tetap.png
- menatap-mata-afirmasi.png
- menatap-mata.png
- menatap-tangan-orang-tua.png
- menunjuk-boneka.png
- menunjuk-untuk-melihat-barang.png
- menunjuk-untuk-melihat-sesuatu.png
- menyesuaikan-boneka-dengan-gambar.png
- menyesuaikan-mobil-dengan-gambar.png
- menyodorkan-mobil.png
- menyuruh-membuka-sepatu.png
- menyusun-kubus.png
- menyusun-lego.png
- menyusun-puzzle.png
- tidak-boleh-melakukan-suatu-hal.png
    `;
};

// - Jawaban: ${assessment.answer}
