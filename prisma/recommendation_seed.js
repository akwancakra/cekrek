const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Create a recommendation
  const recommendation1 = await prisma.recommendations.create({
    data: {
      type: "Standar",
      title: "Pemeriksaan Rutin",
      description: "Lakukan pemeriksaan rutin setiap bulan.",
      icon: "stethoscope",
      duration: 30,
      duration_type: "hari",
      repetition: 1,
      risk_category: "rendah",
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
