const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Create an expert examination
  const expertExamination1 = await prisma.expert_examination_question.create({
    data: {
      type: "Dokter Ahli Anak",
    },
  });
  const expertExamination2 = await prisma.expert_examination_question.create({
    data: {
      type: "Dokter Ahli Rehabilitasi",
    },
  });
  const expertExamination3 = await prisma.expert_examination_question.create({
    data: {
      type: "Dokter Ahli Psikolog",
    },
  });
  const expertExamination4 = await prisma.expert_examination_question.create({
    data: {
      type: "Dokter Ahli Therapist",
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
