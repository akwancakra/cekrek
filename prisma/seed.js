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
    },
  });

  // Link health status to children through child_birth_history
  const childBirthHistory1 = await prisma.child_birth_history.create({
    data: {
      children: {
        connect: { id: child1.id }, // Connect to the actual child created
      },
      birth_history: {
        connect: { id: 1 }, // Ibu sehat selama mengandung?
      },
      answer: "ya",
    },
  });

  const childBirthHistory2 = await prisma.child_birth_history.create({
    data: {
      children: {
        connect: { id: child1.id }, // Connect to the actual child created
      },
      birth_history: {
        connect: { id: 2 }, // Ibu pernah sakit pada usia kandungan ... bulan
      },
      answer: null,
    },
  });

  const childBirthHistory3 = await prisma.child_birth_history.create({
    data: {
      children: {
        connect: { id: child1.id }, // Connect to the actual child created
      },
      birth_history: {
        connect: { id: 3 }, // Lama Kandungan? contoh: Cukup bulan 38M, berat badan 37,5kg, Panjang 54cm
      },
      answer: "Cukup bulan 38M, berat badan 37,5kg, Panjang 54cm",
    },
  });

  const childBirthHistory4 = await prisma.child_birth_history.create({
    data: {
      children: {
        connect: { id: child1.id }, // Connect to the actual child created
      },
      birth_history: {
        connect: { id: 4 }, // Melahirkan di? (Rumah Sakit, Puskesmas, Bidan, Dukun, dll)
      },
      answer: "Rumah Sakit",
    },
  });

  const childBirthHistory5 = await prisma.child_birth_history.create({
    data: {
      children: {
        connect: { id: child1.id }, // Connect to the actual child created
      },
      birth_history: {
        connect: { id: 5 }, // Ditolong oleh? (Dokter, Bidan, Keluarga, dll)
      },
      answer: "Dokter",
    },
  });

  const childBirthHistory6 = await prisma.child_birth_history.create({
    data: {
      children: {
        connect: { id: child1.id }, // Connect to the actual child created
      },
      birth_history: {
        connect: { id: 6 }, // Proses Kelahiran? (Normal, Caesar, Vakum, dll)
      },
      answer: "Secar",
    },
  });

  const childBirthHistory7 = await prisma.child_birth_history.create({
    data: {
      children: {
        connect: { id: child1.id }, // Connect to the actual child created
      },
      birth_history: {
        connect: { id: 7 }, // Kelainan bawaan? (Tidak ada, Tuli, Buta, Bibir Sumbing, Juling, dll)
      },
      answer: "Tidak",
    },
  });

  const childBirthHistory8 = await prisma.child_birth_history.create({
    data: {
      children: {
        connect: { id: child1.id }, // Connect to the actual child created
      },
      birth_history: {
        connect: { id: 8 }, // Makanan Pertama yang diberikan? (MPASI, dll)
      },
      answer: "MPASI",
    },
  });

  const childBirthHistory9 = await prisma.child_birth_history.create({
    data: {
      children: {
        connect: { id: child1.id }, // Connect to the actual child created
      },
      birth_history: {
        connect: { id: 9 }, // Susu Formula mulai usia ... bulan, sampai dengan ... bulan
      },
      answer: "3 Sampai 24 Bulan",
    },
  });

  const childBirthHistory10 = await prisma.child_birth_history.create({
    data: {
      children: {
        connect: { id: child1.id }, // Connect to the actual child created
      },
      birth_history: {
        connect: { id: 10 }, // Imunisasi? (Lengkap, Tidak Lengkap, Tidak Sama Sekali)
      },
      answer: "Lengkap",
    },
  });

  // Link health status to children through child_health_status
  const childHealthStatus1 = await prisma.child_health_status.create({
    data: {
      children: {
        connect: { id: child1.id }, // Connect to the actual child created
      },
      health_status: {
        connect: { id: 1 }, // Pernah sakit keras? (Tidak, Ya)
      },
      answer: "tidak",
    },
  });

  const childHealthStatus2 = await prisma.child_health_status.create({
    data: {
      children: {
        connect: { id: child1.id }, // Connect to the actual child created
      },
      health_status: {
        connect: { id: 2 }, // Penyakit yang pernah diderita
      },
      answer: null,
    },
  });

  const childHealthStatus3 = await prisma.child_health_status.create({
    data: {
      children: {
        connect: { id: child1.id }, // Connect to the actual child created
      },
      health_status: {
        connect: { id: 3 }, // Dirawat di?
      },
      answer: null,
    },
  });

  const childHealthStatus4 = await prisma.child_health_status.create({
    data: {
      children: {
        connect: { id: child1.id }, // Connect to the actual child created
      },
      health_status: {
        connect: { id: 4 }, // Lama dirawat?
      },
      answer: null,
    },
  });

  const childHealthStatus5 = await prisma.child_health_status.create({
    data: {
      children: {
        connect: { id: child1.id }, // Connect to the actual child created
      },
      health_status: {
        connect: { id: 5 }, // Dibandigkan dengan saudara yang lain pada umumnya
      },
      answer: "sama",
    },
  });

  const childHealthStatus6 = await prisma.child_health_status.create({
    data: {
      children: {
        connect: { id: child1.id }, // Connect to the actual child created
      },
      health_status: {
        connect: { id: 6 }, // Perkembangan merangkak
      },
      answer: "normal",
    },
  });

  const childHealthStatus7 = await prisma.child_health_status.create({
    data: {
      children: {
        connect: { id: child1.id }, // Connect to the actual child created
      },
      health_status: {
        connect: { id: 7 }, // Perkembangan duduk
      },
      answer: "normal",
    },
  });

  const childHealthStatus8 = await prisma.child_health_status.create({
    data: {
      children: {
        connect: { id: child1.id }, // Connect to the actual child created
      },
      health_status: {
        connect: { id: 8 }, // Perkembangan berjalan
      },
      answer: "normal",
    },
  });

  const childHealthStatus9 = await prisma.child_health_status.create({
    data: {
      children: {
        connect: { id: child1.id }, // Connect to the actual child created
      },
      health_status: {
        connect: { id: 9 }, // Mulai mengucapkan kata-kata pada usia ... tahun
      },
      answer: "3.5 tahun",
    },
  });

  const childHealthStatus10 = await prisma.child_health_status.create({
    data: {
      children: {
        connect: { id: child1.id }, // Connect to the actual child created
      },
      health_status: {
        connect: { id: 10 }, // Lancar berbicara pada usia ... tahun
      },
      answer: null,
    },
  });

  const childHealthStatus11 = await prisma.child_health_status.create({
    data: {
      children: {
        connect: { id: child1.id }, // Connect to the actual child created
      },
      health_status: {
        connect: { id: 11 }, // Mengompol ... (Tidak ada kelainan, Ada kelainan) Sebutkan Jika ada!
      },
      answer: "Tidak ada kelainan",
    },
  });

  // Link expert examination to children through child_expert_examination
  const child1ExpertExamination1 = await prisma.child_expert_examination.create(
    {
      data: {
        children: {
          connect: { id: child1.id }, // Dokter Ahli Anak
        },
        expert_examination: {
          connect: { id: 1 }, //
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
          connect: { id: 2 }, // Dokter Ahli Rehabilitasi
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
          connect: { id: 3 }, // Dokter Ahli Psikolog
        },
        result: null,
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
          connect: { id: 4 }, // Dokter Ahli Therapist
        },
        result: "ASD",
      },
    }
  );

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
