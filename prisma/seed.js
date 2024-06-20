const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Create users
  const teacher = await prisma.users.create({
    data: {
      email: "teacher@example.com",
      password: "teacher",
      role: "teacher",
    },
  });

  const parent = await prisma.users.create({
    data: {
      email: "parent@example.com",
      password: "parent",
      role: "parent",
    },
  });

  // Create teachers
  const teacher1 = await prisma.teachers.create({
    data: {
      user_id: teacher.id,
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

  // Create parents and related children, birth history, health status, expert examination, and child recommendations
  const parent1 = await prisma.parents.create({
    data: {
      user_id: parent.id,
      name: "Bambang Waluyo",
      type: "ayah",
      place_birth: "Jakarta",
      date_time_birth: new Date("1970-01-01"),
      religion: "Islam",
      education: "SMA/Sederajat",
      job: "PNS",
      address: "Jl. Nasution no.69",
      phone: "08123456789",
    },
  });

  //   Create children
  const child1 = await prisma.children.create({
    data: {
      parent_id: parent1.id,
      full_name: "Zahra Aulia",
      name: "Zahra",
      gender: "Perempuan",
      place_birth: "Bandung",
      date_time_birth: new Date("2000-01-01"),
      religion: "Islam",
      count_of_siblings: 2,
      risk_category: "rendah",
      hearing_test: "normal",
    },
  });

  // Create a birth history
  const birthHistory = await prisma.birth_history.create({
    data: {
      children_id: child1.id,
      type: "Riwayat Kelahiran",
      question: "Apakah anak lahir normal?",
      answer: "ya",
    },
  });

  // Create a health status
  const healthStatus1 = await prisma.health_status.create({
    data: {
      type: "keadaan kesehatan",
      question: "Apakah pernah sakit keras?",
    },
  });

  // Link health status to children through child_health_status
  const childHealthStatus = await prisma.child_health_status.create({
    data: {
      //   children_id: child1.id,
      health_status: {
        connect: { id: healthStatus1.id }, // Connect to the created health status
      },
      children: {
        connect: { id: child1.id }, // Connect to the actual child created
      },
      answer: "tidak",
    },
  });

  // Create an expert examination
  const expertExamination1 = await prisma.expert_examination.create({
    data: {
      type: "Dokter Ahli Anak",
    },
  });
  const expertExamination2 = await prisma.expert_examination.create({
    data: {
      type: "Dokter Ahli Rehabilitasi",
    },
  });
  const expertExamination3 = await prisma.expert_examination.create({
    data: {
      type: "Dokter Ahli Psikolog",
    },
  });
  const expertExamination4 = await prisma.expert_examination.create({
    data: {
      type: "Dokter Ahli Therapist",
    },
  });

  // Link expert examination to children through child_expert_examination
  const child1ExpertExamination1 = await prisma.child_expert_examination.create(
    {
      data: {
        children: {
          connect: { id: child1.id }, // Connect to the actual child created
        },
        expert_examination: {
          connect: { id: expertExamination1.id }, // Connect to the created expert examination
        },
        result: "ASD",
      },
    }
  );

  const child1ExpertExamination2 = await prisma.child_expert_examination.create(
    {
      data: {
        children: {
          connect: { id: child1.id }, // Connect to the actual child created
        },
        expert_examination: {
          connect: { id: expertExamination2.id }, // Connect to the created expert examination
        },
        result: "ASD",
      },
    }
  );

  const child1ExpertExamination3 = await prisma.child_expert_examination.create(
    {
      data: {
        children: {
          connect: { id: child1.id }, // Connect to the actual child created
        },
        expert_examination: {
          connect: { id: expertExamination3.id }, // Connect to the created expert examination
        },
        result: "ASD",
      },
    }
  );

  const child1ExpertExamination4 = await prisma.child_expert_examination.create(
    {
      data: {
        children: {
          connect: { id: child1.id }, // Connect to the actual child created
        },
        expert_examination: {
          connect: { id: expertExamination4.id }, // Connect to the created expert examination
        },
        result: "ASD",
      },
    }
  );

  // Create a recommendation
  const recommendation1 = await prisma.recommendation.create({
    data: {
      type: "Standar",
      title: "Pemeriksaan Rutin",
      description: "Lakukan pemeriksaan rutin setiap bulan.",
      icon: "stethoscope",
      duration: 30,
      duration_type: "hari",
      repetition: 1,
      risk_cateogry: "rendah",
    },
  });

  // Link recommendation to children through child_recommendation
  const childRecommendation = await prisma.child_recommendation.create({
    data: {
      children: {
        connect: { id: child1.id }, // Connect to the actual child created
      },
      recommendation: {
        connect: { id: recommendation1.id }, // Connect to the created recommendation
      },
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
