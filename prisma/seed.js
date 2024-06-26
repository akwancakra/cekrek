const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const saltRounds = 10; // Number of salt rounds for hashing

async function main() {
  const hashedTeacherPassword = await bcrypt.hash("teacher", saltRounds);
  const hashedParent1Password = await bcrypt.hash("dodi", saltRounds);
  const hashedParent2Password = await bcrypt.hash("elin", saltRounds);
  // Create users
  const teacher = await prisma.users.create({
    data: {
      email: "teacher@example.com",
      password: hashedTeacherPassword,
      role: "teacher",
      name: "Sumarni.S.Pd",
      place_birth: "Bandung",
      date_time_birth: new Date("1980-01-01"),
      religion: "Islam",
      education: "Sarjana",
      job: "Psikolog",
      address: "Jl. Braga no.69",
      phone: "08123456789",
    },
  });

  const parent1 = await prisma.users.create({
    data: {
      email: "dodi@example.com",
      password: hashedParent1Password,
      role: "parent",
      name: "Dodi Junaedi",
      type: "ayah",
      place_birth: "Bandung",
      date_time_birth: new Date("1983-06-26"),
      religion: "Islam",
      education: "SMA",
      job: "Wiraswasta",
      address: "Kp. Sukamanah RT 02 RW 11",
      phone: "08123456789",
    },
  });

  const parent2 = await prisma.users.create({
    data: {
      email: "elin@example.com",
      password: hashedParent2Password,
      role: "parent",
      name: "Elin Suminar",
      type: "ibu",
      place_birth: "Bandung",
      date_time_birth: new Date("1984-12-20"),
      religion: "Islam",
      education: "SMA",
      job: "Karyawan Swasta",
      address: "Kp. Sukamanah RT 02 RW 11",
      phone: "085559027696",
    },
  });

  //   Create children
  const child1 = await prisma.children.create({
    data: {
      teacher_id: teacher.id,
      full_name: "Muhammad Alif Nashrulloh",
      nick_name: "Alif",
      gender: "laki-laki",
      place_birth: "Bandung",
      date_time_birth: new Date("2016-09-27"),
      religion: "Islam",
      count_of_siblings: null,
      risk_category: "tinggi",
      hearing_test: "normal",
      parent: {
        connect: [{ id: parent1.id }, { id: parent2.id }],
      },
      birth_history: {
        create: {
          healthy_pregnancy: "ya",
          pregnancy_illness: "tidak ada",
          gestation_details: "38 minggu, 3.5kg, 50cm",
          birthplace: "rumah sakit",
          birth_assistance: "dokter",
          delivery_process: "normal",
          congenital_anomalies: "tidak ada",
          first_food: "MPASI",
          formula_milk: "3 sampai 23 bulan",
          immunization: "lengkap",
        },
      },
      expert_examination: {
        create: {
          pediatrician: "ASD",
          rehabilitation: "ASD",
          psychologist: "tidak ada",
          therapist: "ASD",
        },
      },
      health_status: {
        create: {
          serious_illness: "tidak",
          current_diseases: "-",
          treatment_location: "-",
          treatment_duration: "-",
          general_comparison: "normal",
          crawling_development: "normal",
          sitting_development: "normal",
          walking_development: "normal",
          first_words_age: "1 tahun",
          speaking_fluency_age: "2 tahun",
          bedwetting: "tidak ada kelainan",
        },
      },
    },
  });

  // Link recommendation to children through child_recommendation
  const childRecommendation = await prisma.child_recommendation.create({
    data: {
      children: {
        connect: { id: child1.id }, // Connect to the actual child created
      },
      recommendations: {
        connect: { id: 1 }, // Pemeriksaan rutin
      },
    },
  });

  const monitorChildRecommendation =
    await prisma.monitor_child_recommendation.create({
      data: {
        child_recommendation: {
          connect: { id: 1 }, // Reference to the existing child_recommendation by its id
        },
        is_done: false,
        date_time: new Date(),
      },
    });

  //   console.log({
  //     teacher,
  //     parent,
  //     teacher1,
  //     parent1,
  //     healthStatus,
  //     recommendation,
  //     childRecommendation,
  //   });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
