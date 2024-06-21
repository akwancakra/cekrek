const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Create birth_history
  //   SEBELLUM KELAHIRAN
  const sebelumKelahiran1 = await prisma.birth_history.create({
    data: {
      type: "sebelum kelahiran",
      question: "Ibu sehat selama mengandung? (ya/tidak)",
    },
  });

  const sebelumKelahiran2 = await prisma.birth_history.create({
    data: {
      type: "sebelum kelahiran",
      question: "Ibu pernah sakit pada usia kandungan ... bulan",
    },
  });

  //   SAAT KELAHIRAN
  const saatKelahiran1 = await prisma.birth_history.create({
    data: {
      type: "saat kelahiran",
      question:
        "Lama Kandungan? contoh: Cukup bulan 38M, berat badan 37,5kg, Panjang 54cm",
      example_answer: "Kurang bulan 7M, berat badan 2,5kg, Panjang 45cm",
    },
  });

  const saatKelahiran2 = await prisma.birth_history.create({
    data: {
      type: "saat kelahiran",
      question: "Melahirkan di? (Rumah Sakit, Puskesmas, Bidan, Dukun, dll)",
    },
  });

  const saatKelahiran3 = await prisma.birth_history.create({
    data: {
      type: "saat kelahiran",
      question: "Ditolong oleh? (Dokter, Bidan, Keluarga, dll)",
    },
  });

  const saatKelahiran4 = await prisma.birth_history.create({
    data: {
      type: "saat kelahiran",
      question: "Proses kelahiran? (Normal, Caesar, Vakum, dll)",
    },
  });

  const saatKelahiran5 = await prisma.birth_history.create({
    data: {
      type: "saat kelahiran",
      question:
        "Kelainan bawaan? (Tidak ada, Tuli, Buta, Bibir Sumbing, Juling, dll)",
    },
  });

  const saatKelahiran6 = await prisma.birth_history.create({
    data: {
      type: "saat kelahiran",
      question: "Makanan Pertama yang diberikan? (MPASI, dll)",
    },
  });

  const saatKelahiran7 = await prisma.birth_history.create({
    data: {
      type: "saat kelahiran",
      question: "Susu Formula mulai usia ... bulan, sampai dengan ... bulan",
      example_answer: "3 sampai 6 bulan",
    },
  });

  const saatKelahiran8 = await prisma.birth_history.create({
    data: {
      type: "saat kelahiran",
      question: "Imunisasi? (Lengkap, Tidak Lengkap, Tidak Sama Sekali)",
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
