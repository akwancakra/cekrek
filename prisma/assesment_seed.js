const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Create assessments
  const assesment1 = await prisma.assesments.create({
    data: {
      assesment_number: 1,
      question:
        "Jika anda menunjuk sesuatu di ruangan, apakah anak anda melihatnya? (Misalnya, jika anda menunjuk hewan atau mainan, apakah anak anda melihat ke arah hewan atau mainan yang anda tunjuk?)",
    },
  });

  const assesment2 = await prisma.assesments.create({
    data: {
      assesment_number: 2,
      question: "Pernahkah anda berpikir bahwa anak anda tuli?",
    },
  });

  const assesment3 = await prisma.assesments.create({
    data: {
      assesment_number: 3,
      question:
        "Apakah anak anda pernah bermain pura-pura? (Misalnya, berpura-pura minum dari gelas kosong, berpura-pura berbicara menggunakan telepon, atau menyuapi boneka atau boneka binatang?)",
    },
  });

  const assesment4 = await prisma.assesments.create({
    data: {
      assesment_number: 4,
      question:
        "Apakah anak anda suka memanjat benda-benda? (Misalnya, furniture, alat-alat bermain, atau tangga)",
    },
  });

  const assesment5 = await prisma.assesments.create({
    data: {
      assesment_number: 5,
      question:
        "Apakah anak anda menggerakkan jari-jari tangannya dengan cara yang tidak biasa di dekat matanya? (Misalnya, apakah anak anda menggoyangkan jari dekat pada matanya?)",
    },
  });

  const assesment6 = await prisma.assesments.create({
    data: {
      assesment_number: 6,
      question:
        "Apakah anak anda pernah menunjuk dengan satu jari untuk meminta sesuatu atau untuk meminta tolong? (Misalnya, menunjuk makanan atau mainan yang jauh dari jangkauannya)",
    },
  });

  const assesment7 = await prisma.assesments.create({
    data: {
      assesment_number: 7,
      question:
        "Apakah anak anda pernah menunjuk dengan satu jari untuk menunjukkan sesuatu yang menarik pada anda? (Misalnya, menunjuk pada pesawat di langit atau truk besar di jalan)",
    },
  });

  const assesment8 = await prisma.assesments.create({
    data: {
      assesment_number: 8,
      question:
        "Apakah anak anda tertarik pada anak lain? (Misalnya, apakah anak anda memperhatikan anak lain, tersenyum pada mereka atau pergi ke arah mereka)",
    },
  });

  const assesment9 = await prisma.assesments.create({
    data: {
      assesment_number: 9,
      question:
        "Apakah anak anda pernah memperlihatkan suatu benda dengan membawa atau mengangkatnya kepada anda – tidak untuk minta tolong, hanya untuk berbagi? (Misalnya, memperlihatkan anda bunga, binatang atau truk mainan)",
    },
  });

  const assesment10 = await prisma.assesments.create({
    data: {
      assesment_number: 10,
      question:
        "Apakah anak anda memberikan respon jika namanya dipanggil? (Misalnya, apakah anak anda melihat, bicara atau bergumam, atau menghentikan apa yang sedang dilakukannya saat anda memanggil namanya)",
    },
  });

  const assesment11 = await prisma.assesments.create({
    data: {
      assesment_number: 11,
      question:
        "Saat anda tersenyum pada anak anda, apakah anak anda tersenyum balik?",
    },
  });

  const assesment12 = await prisma.assesments.create({
    data: {
      assesment_number: 12,
      question:
        "Apakah anak anda pernah marah saat mendengar suara bising sehari-hari? (Misalnya, apakah anak anda berteriak atau menangis saat mendengar suara bising seperti vacuum cleaner atau musik keras)",
    },
  });

  const assesment13 = await prisma.assesments.create({
    data: {
      assesment_number: 13,
      question: "Apakah anak anda bisa berjalan?",
    },
  });

  const assesment14 = await prisma.assesments.create({
    data: {
      assesment_number: 14,
      question:
        "Apakah anak anda menatap mata anda saat anda bicara padanya, bermain bersamanya, atau saat memakaikan pakaian?",
    },
  });

  const assesment15 = await prisma.assesments.create({
    data: {
      assesment_number: 15,
      question:
        "Apakah anak anda mencoba meniru apa yang anda lakukan? (Misalnya, melambaikan tangan, tepuk tangan atau meniru saat anda membuat suara lucu)",
    },
  });

  const assesment16 = await prisma.assesments.create({
    data: {
      assesment_number: 16,
      question:
        "Jika anda memutar kepala untuk melihat sesuatu, apakah anak anda melihat sekeliling untuk melihat apa yang anda lihat?",
    },
  });

  const assesment17 = await prisma.assesments.create({
    data: {
      assesment_number: 17,
      question:
        "Apakah anak anda mencoba untuk membuat anda melihat kepadanya? (Misalnya, apakah anak anda melihat anda untuk dipuji atau berkata 'lihat' atau 'lihat aku')",
    },
  });

  const assesment18 = await prisma.assesments.create({
    data: {
      assesment_number: 18,
      question:
        "Apakah anak anda mengerti saat anda memintanya melakukan sesuatu? (Misalnya, jika anda tidak menunjuk, apakah anak anda mengerti kalimat 'letakkan buku itu di atas kursi' atau 'ambilkan saya selimut')",
    },
  });

  const assesment19 = await prisma.assesments.create({
    data: {
      assesment_number: 19,
      question:
        "Jika sesuatu yang baru terjadi, apakah anak anda menatap wajah anda untuk melihat perasaan anda tentang hal tersebut? (Misalnya, jika anak anda mendengar bunyi aneh atau lucu, atau melihat mainan baru, akankah dia menatap wajah anda?)",
    },
  });

  const assesment20 = await prisma.assesments.create({
    data: {
      assesment_number: 20,
      question:
        "Apakah anak anda menyukai aktivitas yang bergerak? (Misalnya, diayun-ayun atau dihentak-hentakkan pada lutut anda)",
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
