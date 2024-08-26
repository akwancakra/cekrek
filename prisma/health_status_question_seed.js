const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
    // Create health_status_question
    //   Keadaan Kesehatan
    const keadaanKesehatan1 = await prisma.health_status_question.create({
        data: {
            type: "keadaan kesehatan",
            question:
                "Pernah Sakit Keras? (ya/tidak) berikan keterangan jika ya",
            image: "10.png",
        },
    });

    const keadaanKesehatan2 = await prisma.health_status_question.create({
        data: {
            type: "keadaan kesehatan",
            question: "Penyakit yang diderita? (jika ada)",
            image: "10.png",
        },
    });

    const keadaanKesehatan3 = await prisma.health_status_question.create({
        data: {
            type: "keadaan kesehatan",
            question: "Dirawat di? (Rumah Sakit, Puskesmas, Bidan, dll)",
            image: "4.png",
        },
    });

    const keadaanKesehatan4 = await prisma.health_status_question.create({
        data: {
            type: "keadaan kesehatan",
            question: "Lama dirawat? (hari, minggu, bulan)",
            example_answer: "2 bulan",
            image: "11.png",
        },
    });

    //   PERKEMBANGAN JASMANI
    const perkembanganJasmani1 = await prisma.health_status_question.create({
        data: {
            type: "perkembangan jasmani",
            question:
                "Dibandingkan dengan Saudara yang lain pada umumnya (sama/terlambat)",
            image: "12.png",
        },
    });

    const perkembanganJasmani2 = await prisma.health_status_question.create({
        data: {
            type: "perkembangan jasmani",
            question: "Perkembangan Merangkak (Normal, Terlambat)",
            image: "13.png",
        },
    });

    const perkembanganJasmani3 = await prisma.health_status_question.create({
        data: {
            type: "perkembangan jasmani",
            question: "Perkembangan Duduk (Normal, Terlambat)",
            image: "14.png",
        },
    });

    const perkembanganJasmani4 = await prisma.health_status_question.create({
        data: {
            type: "perkembangan jasmani",
            question: "Perkembangan Berjalan (Normal, Terlambat)",
            image: "15.png",
        },
    });

    const perkembanganJasmani5 = await prisma.health_status_question.create({
        data: {
            type: "perkembangan jasmani",
            question: "Mulai mengucapkan kata-kata pada usia ... tahun",
            image: "16.png",
        },
    });

    const perkembanganJasmani6 = await prisma.health_status_question.create({
        data: {
            type: "perkembangan jasmani",
            question: "Lancar berbicara pada usia ... tahun",
            image: "16.png",
        },
    });

    const perkembanganJasmani7 = await prisma.health_status_question.create({
        data: {
            type: "perkembangan jasmani",
            question:
                "Mengompol ... (Tidak ada kelainan, Ada kelainan) Sebutkan Jika ada!",
            image: "17.png",
        },
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
