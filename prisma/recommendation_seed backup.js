const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Create a recommendation
  const recommendation1_tinggi = await prisma.recommendations.create({
    data: {
      is_main: true,
      assesment_number: 1,
      title: "Melatih Bahasa Reseptif",
      description:
        "Membangkitkan kontak mata anak dengan memberi perintah “lihat” bersamaan dengan memperlihatkan benda-benda yang menarik perhatiannya, lalu letakkan benda ke mata terapis agar dapat fokus melihat mata dan lakukan sampai 5-10 detik, Serta berikan hadiah saat anak dapat melakukan perintah dengan benar \n Contoh: Orang tua memberikan perintah kepada anak untuk melihat benda dengan bubble chat lihat! \n Catatan: \n -Jika anak dalam kondisi resiko tinggi dapat dilakukan setiap hari dalam jangka waktu yang sama. Akan tetapi, benda yang dipegang diayunkan ke depan mata anda, persis di tengah antara kedua mata dan berjarak kira-kira 5 cm dari wajah anda. Sambil katakan secara bersamaan 'Lihat!'. \n -Jika anak sudah sempat melakukan kontak mata namun masih mengabaikan lakukan kegiatan ini selama 5-10  detik setiap harinya. \n -Jika anak dalam resiko rendah. Lakukan kegiatan ini selama 5-10 detik setiap harinya. \n Contoh: Orang tua memberikan perintah kepada anak untuk melihat benda dengan bubble chat lihat! \n Catatan: \n -Jika anak dalam kondisi resiko tinggi dapat dilakukan setiap hari dalam jangka waktu yang sama. Akan tetapi, benda yang dipegang diayunkan ke depan mata anda, persis di tengah antara kedua mata dan berjarak kira-kira 5 cm dari wajah anda. Sambil katakan secara bersamaan 'Lihat!'. \n -Jika anak sudah sempat melakukan kontak mata namun masih mengabaikan lakukan kegiatan ini selama 5-10  detik setiap harinya. \n -Jika anak dalam resiko rendah. Lakukan kegiatan ini selama 5-10 detik setiap harinya. ",
      icon: "eye",
      frequency: "2-3 kali sehari, 5-10 detik per sesi",
      risk_category: "tinggi",
    },
  });

  const recommendation1_sedang = await prisma.recommendations.create({
    data: {
      is_main: true,
      assesment_number: 1,
      title: "Melatih Bahasa Reseptif",
      description:
        "Membangkitkan kontak mata anak dengan memberi perintah “lihat” bersamaan dengan memperlihatkan benda-benda yang menarik perhatiannya, lalu letakkan benda ke mata terapis agar dapat fokus melihat mata dan lakukan sampai 5-10 detik, Serta berikan hadiah saat anak dapat melakukan perintah dengan benar \n Contoh: Orang tua memberikan perintah kepada anak untuk melihat benda dengan bubble chat lihat! \n Catatan: \n -Jika anak dalam kondisi resiko tinggi dapat dilakukan setiap hari dalam jangka waktu yang sama. Akan tetapi, benda yang dipegang diayunkan ke depan mata anda, persis di tengah antara kedua mata dan berjarak kira-kira 5 cm dari wajah anda. Sambil katakan secara bersamaan 'Lihat!'. \n -Jika anak sudah sempat melakukan kontak mata namun masih mengabaikan lakukan kegiatan ini selama 5-10  detik setiap harinya. \n -Jika anak dalam resiko rendah. Lakukan kegiatan ini selama 5-10 detik setiap harinya.",
      icon: "eye",
      frequency: "1-2 kali sehari, 5-10 detik per sesi",
      risk_category: "sedang",
    },
  });

  const recommendation1_rendah = await prisma.recommendations.create({
    data: {
      is_main: true,
      assesment_number: 1,
      title: "Melatih Bahasa Reseptif",
      description:
        "Membangkitkan kontak mata anak dengan memberi perintah “lihat” bersamaan dengan memperlihatkan benda-benda yang menarik perhatiannya, lalu letakkan benda ke mata terapis agar dapat fokus melihat mata dan lakukan sampai 5-10 detik, Serta berikan hadiah saat anak dapat melakukan perintah dengan benar \n Contoh: Orang tua memberikan perintah kepada anak untuk melihat benda dengan bubble chat lihat! \n Catatan: \n -Jika anak dalam kondisi resiko tinggi dapat dilakukan setiap hari dalam jangka waktu yang sama. Akan tetapi, benda yang dipegang diayunkan ke depan mata anda, persis di tengah antara kedua mata dan berjarak kira-kira 5 cm dari wajah anda. Sambil katakan secara bersamaan 'Lihat!'. \n -Jika anak sudah sempat melakukan kontak mata namun masih mengabaikan lakukan kegiatan ini selama 5-10  detik setiap harinya. \n -Jika anak dalam resiko rendah. Lakukan kegiatan ini selama 5-10 detik setiap harinya.",
      icon: "eye",
      frequency: "1-2 kali sehari, 5-10 detik per sesi",
      risk_category: "rendah",
    },
  });

  const recommendation2 = await prisma.recommendations.create({
    data: {
      is_main: true,
      assesment_number: 2,
      title: "Perkembangan sensorik dan Komunikasi",
      description: `Contoh aktivitas: Mengelompokkan Warna dan Bentuk\n 
        1. Memberikan bantuan berupa petunjuk agar anak dapat memberikan respon dengan benar.\n
        Contoh: 'Ambil balok warna kuning.'\n
        2. Instruksi diberikan dengan cara sederhana, singkat, jelas, konsisten, ulangi instruksi hingga respon yang diberikan anak benar.\n
        Contoh: 'Ambil balok warna kuning dan letakkan di kotak.'\n
        3. Tingkatkan kesulitan dengan memberikan dua instruksi sekaligus.\n
        Contoh: 'Ambil balok warna kuning dan letakkan di kotak merah.'\n
        Ilustrasi: orang tua menunjuk benda dengan bubble chat (lihat lukisan)\n
        Catatan:\n
        - Jika anak dalam kondisi resiko tinggi maka lakukan simulasi dari point nomor 1.\n
        - Jika anak selalu mengabaikan suara berikan bantuan berupa petunjuk isyarat non verbal agar anak dapat memberikan respon dengan benar.\n
        - Apabila anak dalam resiko rendah berikan simulasi mulai dari point nomor 2.\n",
      icon: "eye",
      frequency: "Tidak ada frekuensi (Ya/Tidak)`,
    },
  });

  const recommendation3_tinggi = await prisma.recommendations.create({
    data: {
      is_main: true,
      assesment_number: 3,
      title: "Perkembangan Kognitif dan Imajinatif",
      description: `Melibatkan diri dalam permainan, ajak anak berbicara atau meminta mereka untuk menjelaskan mainan nya, lakukan kegiatan tersebut selama 20 – 30 menit dalam sehari-hari.
\n Contoh: permainan Berpura-pura Berbicara Menggunakan Telepon 
\n Ilustrasi: anak dan orang tua duduk bersama sambil bermain puzzle atau ular tangga.
`,
      icon: "eye",
      frequency: "durasi 20-30 menit dalam sehari dengan lebih tersruktur",
      risk_category: "tinggi",
    },
  });

  const recommendation3_sedang = await prisma.recommendations.create({
    data: {
      is_main: true,
      assesment_number: 3,
      title: "Perkembangan Kognitif dan Imajinatif",
      description: `Melibatkan diri dalam permainan, ajak anak berbicara atau meminta mereka untuk menjelaskan mainan nya, lakukan kegiatan tersebut selama 20 – 30 menit dalam sehari-hari.
\n Contoh: permainan Berpura-pura Berbicara Menggunakan Telepon 
\n Ilustrasi: anak dan orang tua duduk bersama sambil bermain puzzle atau ular tangga.
`,
      icon: "eye",
      frequency: "durasi 20-30 menit dalam sehari dengan semi-tersruktur",
      risk_category: "sedang",
    },
  });

  const recommendation3_rendah = await prisma.recommendations.create({
    data: {
      is_main: true,
      assesment_number: 3,
      title: "Perkembangan Kognitif dan Imajinatif",
      description: `Melibatkan diri dalam permainan, ajak anak berbicara atau meminta mereka untuk menjelaskan mainan nya, lakukan kegiatan tersebut selama 20 – 30 menit dalam sehari-hari.
\n Contoh: permainan Berpura-pura Berbicara Menggunakan Telepon 
\n Ilustrasi: anak dan orang tua duduk bersama sambil bermain puzzle atau ular tangga.
`,
      icon: "eye",
      frequency: "durasi 20-30 menit dalam sehari dengan lebih bebas",
      risk_category: "rendah",
    },
  });

  const recommendation4_tinggi = await prisma.recommendations.create({
    data: {
      is_main: true,
      assesment_number: 4,
      title: "Perkembangan Motorik Kasar",
      description: `Melakukan permainan sirkuit yaitu aktivitas yang disusun secara berurutan dimana anak berpindah dari suatu aktivitas (dalam stasiun atau pos) ke aktivitas lainnya terutama permainan yang meningkatkan kemampuan motorik kasar (Contoh: permainan menjelajah) \n

Pos 1: Lempar Bola Beanbag\n
Berdiri di garis awal, lempar bola beanbag ke dalam keranjang dari jarak 1 meter.
Jika berhasil, lanjutkan ke pos 2. Jika tidak, ulangi lemparan bola beanbag.
Pos 2: Merayap di Bawah Terowongan\n
Merayap di bawah terowongan kain sepanjang 3 meter.
Berdiri di ujung terowongan dan lanjutkan ke pos 3.
Pos 3: Berjalan di Atas Balok Keseimbangan\n
Berjalan di atas balok keseimbangan sepanjang 1 meter.
Berhenti di ujung balok dan sentuh garis finish.
Lanjutkan ke pos 4.
Pos 4: Bermain Bowling \n
Berdiri di garis start, lempar bola bowling ke pin bowling.
Jika berhasil menjatuhkan pin, lanjutkan ke pos 5. Jika tidak, ulangi lemparan bola bowling.
Pos 5: Lompat Tali \n
Berdiri di garis awal, lompat tali sebanyak 5 kali.
Jika berhasil, kembali ke pos 1 dan ulangi sirkuit dari awal.
Jika tidak, ulangi lompatan tali.\n
Ilustrasi: dalam situasi ada permainan, gambar 1 anak bermain lempar bola, gambar 2 anak merayap di bawah terowongan, gambar 3 anak berjalan di atas balok keseimbangan, gambar 4 anak bermain bowling dan gambar 5 anak main lompat tali.
`,
      icon: "eye",
      frequency:
        "treatment dinaikan intensitasnya bila respon menurun dalam intensitas repetisi tinggi",
      risk_category: "tinggi",
    },
  });

  const recommendation4_sedang = await prisma.recommendations.create({
    data: {
      is_main: true,
      assesment_number: 4,
      title: "Perkembangan Motorik Kasar",
      description: `Melakukan permainan sirkuit yaitu aktivitas yang disusun secara berurutan dimana anak berpindah dari suatu aktivitas (dalam stasiun atau pos) ke aktivitas lainnya terutama permainan yang meningkatkan kemampuan motorik kasar (Contoh: permainan menjelajah) \n

Pos 1: Lempar Bola Beanbag\n
Berdiri di garis awal, lempar bola beanbag ke dalam keranjang dari jarak 1 meter.
Jika berhasil, lanjutkan ke pos 2. Jika tidak, ulangi lemparan bola beanbag.
Pos 2: Merayap di Bawah Terowongan\n
Merayap di bawah terowongan kain sepanjang 3 meter.
Berdiri di ujung terowongan dan lanjutkan ke pos 3.
Pos 3: Berjalan di Atas Balok Keseimbangan\n
Berjalan di atas balok keseimbangan sepanjang 1 meter.
Berhenti di ujung balok dan sentuh garis finish.
Lanjutkan ke pos 4.
Pos 4: Bermain Bowling \n
Berdiri di garis start, lempar bola bowling ke pin bowling.
Jika berhasil menjatuhkan pin, lanjutkan ke pos 5. Jika tidak, ulangi lemparan bola bowling.
Pos 5: Lompat Tali \n
Berdiri di garis awal, lompat tali sebanyak 5 kali.
Jika berhasil, kembali ke pos 1 dan ulangi sirkuit dari awal.
Jika tidak, ulangi lompatan tali.\n
Ilustrasi: dalam situasi ada permainan, gambar 1 anak bermain lempar bola, gambar 2 anak merayap di bawah terowongan, gambar 3 anak berjalan di atas balok keseimbangan, gambar 4 anak bermain bowling dan gambar 5 anak main lompat tali.
`,
      icon: "eye",
      frequency:
        "treatment dinaikan intensitasnya bila respon menurun dalam intensitas repetisi sedang",
      risk_category: "sedang",
    },
  });

  const recommendation4_rendah = await prisma.recommendations.create({
    data: {
      is_main: true,
      assesment_number: 4,
      title: "Perkembangan Motorik Kasar",
      description: `Melakukan permainan sirkuit yaitu aktivitas yang disusun secara berurutan dimana anak berpindah dari suatu aktivitas (dalam stasiun atau pos) ke aktivitas lainnya terutama permainan yang meningkatkan kemampuan motorik kasar (Contoh: permainan menjelajah) \n

Pos 1: Lempar Bola Beanbag\n
Berdiri di garis awal, lempar bola beanbag ke dalam keranjang dari jarak 1 meter.
Jika berhasil, lanjutkan ke pos 2. Jika tidak, ulangi lemparan bola beanbag.
Pos 2: Merayap di Bawah Terowongan\n
Merayap di bawah terowongan kain sepanjang 3 meter.
Berdiri di ujung terowongan dan lanjutkan ke pos 3.
Pos 3: Berjalan di Atas Balok Keseimbangan\n
Berjalan di atas balok keseimbangan sepanjang 1 meter.
Berhenti di ujung balok dan sentuh garis finish.
Lanjutkan ke pos 4.
Pos 4: Bermain Bowling \n
Berdiri di garis start, lempar bola bowling ke pin bowling.
Jika berhasil menjatuhkan pin, lanjutkan ke pos 5. Jika tidak, ulangi lemparan bola bowling.
Pos 5: Lompat Tali \n
Berdiri di garis awal, lompat tali sebanyak 5 kali.
Jika berhasil, kembali ke pos 1 dan ulangi sirkuit dari awal.
Jika tidak, ulangi lompatan tali.\n
Ilustrasi: dalam situasi ada permainan, gambar 1 anak bermain lempar bola, gambar 2 anak merayap di bawah terowongan, gambar 3 anak berjalan di atas balok keseimbangan, gambar 4 anak bermain bowling dan gambar 5 anak main lompat tali.
`,
      icon: "eye",
      frequency:
        "treatment dinaikan intensitasnya bila respon menurun dalam intensitas repetisi rendah",
      risk_category: "rendah",
    },
  });

  const recommendation5_tinggi = await prisma.recommendations.create({
    data: {
      is_main: true,
      assesment_number: 5,
      title: "Mengurangi Perilaku Stereotipik dan Berulang",
      description: `<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Terapi ABA&nbsp;</strong></span><i><span style="font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>(Applied Behavior Analysis)</strong></span></i><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"> untuk mengulangi perilaku sterotipikal pada anak.</span></span>
</p>
<ol style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Amati kapan, dimana, dan dalam kondisi seperti apa anak melakukan tindakan sterotipikal (catat frekuensi dan durasi).</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Ajarkan anak melakukan perilaku alternatif (misalkan ketika anak memegang tangan mendekati matanya arahkan untuk melakukan aktivitas lain seperti meremas bola). Serta berikan pujian dan penguatan apabila anak melakukan perilaku alternatif.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Berikan anak bantuan secara verbal maupun non verbal untuk melakukan perilaku alternatif.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Secara bertahap kurangi bantuan untuk melatih anak mandiri dalam melakukan perilaku alternatif.</span></span>
    </li>
</ol>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Contoh: meremas bola karet dengan tangan</strong></span></span>
</p>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#4a86e8;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Ilustrasi: Anak sedang memainkan jari di depan matanya, disampingnya ada orang tua dengan bubble chat yang berisi gambar anak memainkan jari di depan mata namun di silang.</span></span>
</p>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Catatan:</span></span>
</p>
<ul style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Konsisten dalam melakukan ABA hingga anak mengurangi atau bahkan menghilangkan perilaku sterotipikal dan menggantinya dengan perilaku alternatif.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Setelah salah satu perilaku sterotipikal dapat dikurangi atau tidak dilakukan lagi, lakukan terapi ABA untuk perilaku sterotipikal yang lainnya.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Selalu berikan pujian dan penguatan positif atas setiap kemajuan anak.</span></span>
    </li>
</ul>`,
      icon: "eye",
      frequency:
        "treatment dinaikan intensitasnya bila respon menurun dalam intensitas repetisi tinggi",
      risk_category: "tinggi",
    },
  });

  const recommendation5_sedang = await prisma.recommendations.create({
    data: {
      is_main: true,
      assesment_number: 5,
      title: "Mengurangi Perilaku Stereotipik dan Berulang",
      description: `<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Terapi ABA&nbsp;</strong></span><i><span style="font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>(Applied Behavior Analysis)</strong></span></i><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"> untuk mengulangi perilaku sterotipikal pada anak.</span></span>
</p>
<ol style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Amati kapan, dimana, dan dalam kondisi seperti apa anak melakukan tindakan sterotipikal (catat frekuensi dan durasi).</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Ajarkan anak melakukan perilaku alternatif (misalkan ketika anak memegang tangan mendekati matanya arahkan untuk melakukan aktivitas lain seperti meremas bola). Serta berikan pujian dan penguatan apabila anak melakukan perilaku alternatif.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Berikan anak bantuan secara verbal maupun non verbal untuk melakukan perilaku alternatif.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Secara bertahap kurangi bantuan untuk melatih anak mandiri dalam melakukan perilaku alternatif.</span></span>
    </li>
</ol>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Contoh: meremas bola karet dengan tangan</strong></span></span>
</p>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#4a86e8;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Ilustrasi: Anak sedang memainkan jari di depan matanya, disampingnya ada orang tua dengan bubble chat yang berisi gambar anak memainkan jari di depan mata namun di silang.</span></span>
</p>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Catatan:</span></span>
</p>
<ul style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Konsisten dalam melakukan ABA hingga anak mengurangi atau bahkan menghilangkan perilaku sterotipikal dan menggantinya dengan perilaku alternatif.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Setelah salah satu perilaku sterotipikal dapat dikurangi atau tidak dilakukan lagi, lakukan terapi ABA untuk perilaku sterotipikal yang lainnya.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Selalu berikan pujian dan penguatan positif atas setiap kemajuan anak.</span></span>
    </li>
</ul>`,
      icon: "eye",
      frequency:
        "treatment dinaikan intensitasnya bila respon menurun dalam intensitas repetisi sedang",
      risk_category: "sedang",
    },
  });

  const recommendation5_rendah = await prisma.recommendations.create({
    data: {
      is_main: true,
      assesment_number: 5,
      title: "Mengurangi Perilaku Stereotipik dan Berulang",
      description: `<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Terapi ABA&nbsp;</strong></span><i><span style="font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>(Applied Behavior Analysis)</strong></span></i><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"> untuk mengulangi perilaku sterotipikal pada anak.</span></span>
</p>
<ol style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Amati kapan, dimana, dan dalam kondisi seperti apa anak melakukan tindakan sterotipikal (catat frekuensi dan durasi).</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Ajarkan anak melakukan perilaku alternatif (misalkan ketika anak memegang tangan mendekati matanya arahkan untuk melakukan aktivitas lain seperti meremas bola). Serta berikan pujian dan penguatan apabila anak melakukan perilaku alternatif.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Berikan anak bantuan secara verbal maupun non verbal untuk melakukan perilaku alternatif.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Secara bertahap kurangi bantuan untuk melatih anak mandiri dalam melakukan perilaku alternatif.</span></span>
    </li>
</ol>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Contoh: meremas bola karet dengan tangan</strong></span></span>
</p>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#4a86e8;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Ilustrasi: Anak sedang memainkan jari di depan matanya, disampingnya ada orang tua dengan bubble chat yang berisi gambar anak memainkan jari di depan mata namun di silang.</span></span>
</p>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Catatan:</span></span>
</p>
<ul style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Konsisten dalam melakukan ABA hingga anak mengurangi atau bahkan menghilangkan perilaku sterotipikal dan menggantinya dengan perilaku alternatif.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Setelah salah satu perilaku sterotipikal dapat dikurangi atau tidak dilakukan lagi, lakukan terapi ABA untuk perilaku sterotipikal yang lainnya.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Selalu berikan pujian dan penguatan positif atas setiap kemajuan anak.</span></span>
    </li>
</ul>`,
      icon: "eye",
      frequency:
        "treatment dinaikan intensitasnya bila respon menurun dalam intensitas repetisi rendah",
      risk_category: "rendah",
    },
  });

  const recommendation6 = await prisma.recommendations.create({
    data: {
      is_main: true,
      assesment_number: 6,
      title: "Perkembangan Bahasa Ekspresif",
      description: `<p style="line-height:1.2;margin-bottom:12pt;margin-left:2pt;margin-top:0pt;" dir="ltr">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Mengajarkan anak untuk menggunakan gerakan tangan untuk meminta benda secara bertahap.</span></span>
    </p>
    <p style="line-height:1.2;margin-bottom:12pt;margin-left:2pt;margin-top:12pt;" dir="ltr">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Tahap 1</span></span>
    </p>
    <p style="line-height:1.2;margin-bottom:12pt;margin-left:2pt;margin-top:12pt;" dir="ltr">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Kontak mata dengan orang dewasa.</span></span>
    </p>
    <p style="line-height:1.3800000000000001;margin-bottom:12pt;margin-top:12pt;text-align:justify;" dir="ltr">
        <span style="background-color:transparent;color:#4a86e8;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Ilustrasi: orang tua dan anak saling menatap</span></span>
    </p>
    <p style="line-height:1.2;margin-bottom:12pt;margin-left:2pt;margin-top:12pt;" dir="ltr">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Tahap 2</span></span>
    </p>
    <p style="line-height:1.2;margin-bottom:12pt;margin-left:2pt;margin-top:12pt;" dir="ltr">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Mengulurkan tangan ke arah benda yang diinginkan.</span></span>
    </p>
    <p style="line-height:1.3800000000000001;margin-bottom:12pt;margin-top:12pt;text-align:justify;" dir="ltr">
        <span style="background-color:transparent;color:#4a86e8;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Ilustrasi: close up sebadan anak menunjukan mainannya ke arah kamera</span></span>
    </p>
    <p style="line-height:1.2;margin-bottom:12pt;margin-left:2pt;margin-top:12pt;" dir="ltr">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Tahap 3</span></span>
    </p>
    <p style="line-height:1.2;margin-bottom:12pt;margin-left:2pt;margin-top:12pt;" dir="ltr">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Menunjukkan benda dengan jari.</span></span>
    </p>
    <p style="line-height:1.3800000000000001;margin-bottom:12pt;margin-top:12pt;text-align:justify;" dir="ltr">
        <span style="background-color:transparent;color:#4a86e8;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Ilustrasi: Anak menunjuk suatu benda dengan satu jari.</span></span>
    </p>
    <p style="line-height:1.2;margin-bottom:12pt;margin-left:2pt;margin-top:12pt;" dir="ltr">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Tahap 4</span></span>
    </p>
    <p style="line-height:1.2;margin-bottom:12pt;margin-left:2pt;margin-top:12pt;" dir="ltr">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Menggunakan isyarat seperti "tolong" atau "minta" dengan gerakan tangan.</span></span>
    </p>
    <p style="line-height:1.2;margin-bottom:12pt;margin-left:2pt;margin-top:12pt;" dir="ltr">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Penguatan: Berikan benda yang diinginkan sambil memuji</span></span>
    </p>
    <p style="line-height:1.2;margin-bottom:12pt;margin-left:16pt;margin-top:12pt;padding:0pt 0pt 0pt 18pt;text-indent:-18pt;" dir="ltr">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">-</span></span><span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:6.999999999999999pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"> &nbsp;&nbsp;</span><span class="Apple-tab-span" style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre;">	</span></span><span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Lakukan sesi-sesi ini secara berulang dan konsisten, berikan penguatan positif setiap kali anak menunjukkan perilaku yang diinginkan.</span></span>
    </p>
    <p>
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">-</span></span><span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:6.999999999999999pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"> &nbsp;&nbsp;</span><span class="Apple-tab-span" style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre;">	</span></span><span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Secara bertahap kurangi prompt seiring anak semakin terampil menggunakan isyarat tersebut.</span></span>
    </p>`,
      icon: "eye",
      frequency: "Tidak ada frekuensi (Ya/Tidak)",
    },
  });

  const recommendation7_tinggi = await prisma.recommendations.create({
    data: {
      is_main: true,
      assesment_number: 7,
      title: "Melatih Joint Attention: berikan simulasi PECS dari fase pertama",
      description:
        "Latihan PECS Fase Pertama: Mengajak anak untuk bertukar gambar dengan objek yang mereka inginkan.\nLatihan PECS Fase Kedua (Fase jarak, ketekunan, dan kemauan yang kuat): mengambil gambar lalu membawakan nya ke terapis untuk menukar dengan benda yang diinginkan. \nLatihan PECS Fase Ketiga (fase discrimination) Membeda-bedakan antara gambar, mengajarkan individu untuk memilih gambar yang benar dari beberapa pilihan. \nLatihan PECS Fase Keempat merekatkan kata “saya mau” merekatkan kata 'saya mau'. \nLatihan PECS Fase Kelima (fase responsive requesting/menjawab pertanyaan): menjawab dengan menyusun kalimat ketika ditanya 'kamu mau apa?' \nLatihan PECS Fase Keenam (fase Commenting/ memberikan komentar): anak dapat menyusun kalimat dengan menggunakan gambar “saya melihat” pada permulaan kalimat dan gambar item dari objek.",
      icon: "eye",
      frequency: "Tidak ada frekuensi (Ya/Tidak)",
      risk_category: "tinggi",
    },
  });

  const recommendation7_sedang = await prisma.recommendations.create({
    data: {
      is_main: true,
      assesment_number: 7,
      title: "Melatih Joint Attention: berikan simulasi PECS dari fase pertama",
      description:
        "Latihan PECS Fase Pertama: Mengajak anak untuk bertukar gambar dengan objek yang mereka inginkan.\nLatihan PECS Fase Kedua (Fase jarak, ketekunan, dan kemauan yang kuat): mengambil gambar lalu membawakan nya ke terapis untuk menukar dengan benda yang diinginkan. \nLatihan PECS Fase Ketiga (fase discrimination) Membeda-bedakan antara gambar, mengajarkan individu untuk memilih gambar yang benar dari beberapa pilihan. \nLatihan PECS Fase Keempat merekatkan kata “saya mau” merekatkan kata 'saya mau'. \nLatihan PECS Fase Kelima (fase responsive requesting/menjawab pertanyaan): menjawab dengan menyusun kalimat ketika ditanya 'kamu mau apa?' \nLatihan PECS Fase Keenam (fase Commenting/ memberikan komentar): anak dapat menyusun kalimat dengan menggunakan gambar “saya melihat” pada permulaan kalimat dan gambar item dari objek.",
      icon: "eye",
      frequency: "Tidak ada frekuensi (Ya/Tidak)",
      risk_category: "sedang",
    },
  });

  const recommendation7_rendah = await prisma.recommendations.create({
    data: {
      is_main: true,
      assesment_number: 7,
      title: "Melatih Joint Attention: berikan simulasi PECS dari fase keempat",
      description:
        "Latihan PECS Fase Pertama: Mengajak anak untuk bertukar gambar dengan objek yang mereka inginkan.\nLatihan PECS Fase Kedua (Fase jarak, ketekunan, dan kemauan yang kuat): mengambil gambar lalu membawakan nya ke terapis untuk menukar dengan benda yang diinginkan. \nLatihan PECS Fase Ketiga (fase discrimination) Membeda-bedakan antara gambar, mengajarkan individu untuk memilih gambar yang benar dari beberapa pilihan. \nLatihan PECS Fase Keempat merekatkan kata “saya mau” merekatkan kata 'saya mau'. \nLatihan PECS Fase Kelima (fase responsive requesting/menjawab pertanyaan): menjawab dengan menyusun kalimat ketika ditanya 'kamu mau apa?' \nLatihan PECS Fase Keenam (fase Commenting/ memberikan komentar): anak dapat menyusun kalimat dengan menggunakan gambar “saya melihat” pada permulaan kalimat dan gambar item dari objek.",
      icon: "eye",
      frequency: "Tidak ada frekuensi (Ya/Tidak)",
      risk_category: "rendah",
    },
  });

  const recommendation8_tinggi = await prisma.recommendations.create({
    data: {
      is_main: true,
      assesment_number: 8,
      title: "Melatih Perkembangan Sosial",
      description:
        "Bermain Peran untuk meningkatkan kemampuan sosial pada anak. Permainan peran menggunakan alat bantu.",
      icon: "eye",
      frequency: "Tidak ada frekuensi (Ya/Tidak)",
      risk_category: "tinggi",
    },
  });

  const recommendation8_sedang = await prisma.recommendations.create({
    data: {
      is_main: true,
      assesment_number: 8,
      title: "Melatih Perkembangan Sosial",
      description:
        "Bermain Peran untuk meningkatkan kemampuan sosial pada anak. Permainan peran dilakukan dengan anak lain.",
      icon: "eye",
      frequency: "Tidak ada frekuensi (Ya/Tidak)",
      risk_category: "sedang",
    },
  });

  const recommendation8_rendah = await prisma.recommendations.create({
    data: {
      is_main: true,
      assesment_number: 8,
      title: "Melatih Perkembangan Sosial",
      description:
        "Bermain Peran untuk meningkatkan kemampuan sosial pada anak. Permainan peran dilakukan dengan anak lain.",
      icon: "eye",
      frequency: "Tidak ada frekuensi (Ya/Tidak)",
      risk_category: "rendah",
    },
  });

  const recommendation9_tinggi = await prisma.recommendations.create({
    data: {
      is_main: true,
      assesment_number: 9,
      title: "Melatih Perkembangan Sosial",
      description:
        "Mengajarkan anak agar mau berbagi hal yang diminatinya  (dalam konteks sosial) melalui kegiatan bermain lego.",
      icon: "eye",
      frequency: "lebih dari 5 kali seminggu dengan instruksi.",
      risk_category: "tinggi",
    },
  });

  const recommendation9_sedang = await prisma.recommendations.create({
    data: {
      is_main: true,
      assesment_number: 9,
      title: "Melatih Perkembangan Sosial",
      description:
        "Mengajarkan anak agar mau berbagi hal yang diminatinya  (dalam konteks sosial) melalui kegiatan bermain lego.",
      icon: "eye",
      frequency: "4-5 kali seminggu dengan instruksi.",
      risk_category: "sedang",
    },
  });

  const recommendation9_rendah = await prisma.recommendations.create({
    data: {
      is_main: true,
      assesment_number: 9,
      title: "Melatih Perkembangan Sosial",
      description:
        "Mengajarkan anak agar mau berbagi hal yang diminatinya  (dalam konteks sosial) melalui kegiatan bermain lego.",
      icon: "eye",
      frequency: "4-5 kali  seminggu tanpa instruksi.",
      risk_category: "rendah",
    },
  });

  const recommendation10_tinggi = await prisma.recommendations.create({
    data: {
      is_main: true,
      assesment_number: 10,
      title: "Melatih Respon Sosial",
      description:
        "Mengajarkan anak untuk memberikan respon ketika namanya dipanggil, dengan metode pengulangan dan penguatan positif.",
      icon: "bell",
      frequency: "2-3 kali seminggu, 60 menit per sesi",
      risk_category: "tinggi",
    },
  });

  const recommendation10_sedang = await prisma.recommendations.create({
    data: {
      is_main: true,
      assesment_number: 10,
      title: "Melatih Respon Sosial",
      description:
        "Mengajarkan anak untuk memberikan respon ketika namanya dipanggil, dengan metode pengulangan dan penguatan positif.",
      icon: "bell",
      frequency: "1-2 kali seminggu, 45 menit per sesi",
      risk_category: "sedang",
    },
  });

  const recommendation10_rendah = await prisma.recommendations.create({
    data: {
      is_main: true,
      assesment_number: 10,
      title: "Melatih Respon Sosial",
      description:
        "Mengajarkan anak untuk memberikan respon ketika namanya dipanggil, dengan metode pengulangan dan penguatan positif.",
      icon: "bell",
      frequency: "1 kali seminggu, ≤ 30 menit per sesi",
      risk_category: "rendah",
    },
  });

  const recommendation11_tinggi = await prisma.recommendations.create({
    data: {
      is_main: true,
      assesment_number: 11,
      title: "Melatih Respons Sosial dan Emosional",
      description:
        "Melatih anak untuk merespon senyuman dengan senyuman balik melalui berbagai aktivitas interaktif. Seperti menirukan ekspresi dari kartu",
      icon: "smile",
      frequency: "Dimulai pada tahapan aktivitas 1-3",
      risk_category: "tinggi",
    },
  });

  const recommendation11_sedang = await prisma.recommendations.create({
    data: {
      is_main: true,
      assesment_number: 11,
      title: "Melatih Respons Sosial dan Emosional",
      description:
        "Melatih anak untuk merespon senyuman dengan senyuman balik melalui berbagai aktivitas interaktif. Seperti menirukan ekspresi dari kartu",
      icon: "smile",
      frequency: "Dimulai pada tahapan aktivitas 2-3",
      risk_category: "sedang",
    },
  });

  const recommendation11_rendah = await prisma.recommendations.create({
    data: {
      is_main: true,
      assesment_number: 11,
      title: "Melatih Respons Sosial dan Emosional",
      description:
        "Melatih anak untuk merespon senyuman dengan senyuman balik melalui berbagai aktivitas interaktif. Seperti menirukan ekspresi dari kartu",
      icon: "smile",
      frequency: "Dimulai pada tahapan aktivitas 2-3",
      risk_category: "rendah",
    },
  });

  const recommendation12_tinggi = await prisma.recommendations.create({
    data: {
      is_main: true,
      assesment_number: 12,
      title: "Melatih Kepekaan Sensorik",
      description:
        "Mengajarkan anak untuk mengatasi ketakutan terhadap suara bising melalui desensitisasi bertahap.",
      icon: "volume-up",
      frequency:
        "Durasi berlangsung beberapa detik hingga beberapa menit dari tahap 1-3",
      risk_category: "tinggi",
    },
  });

  const recommendation12_sedang = await prisma.recommendations.create({
    data: {
      is_main: true,
      assesment_number: 12,
      title: "Melatih Kepekaan Sensorik",
      description:
        "Mengajarkan anak untuk mengatasi ketakutan terhadap suara bising melalui desensitisasi bertahap.",
      icon: "volume-up",
      frequency:
        "Durasi berlangsung beberapa detik hingga beberapa menit dari tahap 2-3",
      risk_category: "sedang",
    },
  });

  const recommendation12_rendah = await prisma.recommendations.create({
    data: {
      is_main: true,
      assesment_number: 12,
      title: "Melatih Kepekaan Sensorik",
      description:
        "Mengajarkan anak untuk mengatasi ketakutan terhadap suara bising melalui desensitisasi bertahap.",
      icon: "volume-up",
      frequency:
        "Durasi berlangsung beberapa detik hingga beberapa menit dari tahap 3",
      risk_category: "rendah",
    },
  });

  const recommendation13 = await prisma.recommendations.create({
    data: {
      is_main: true,
      assesment_number: 13,
      title: "Melatih Perkembangan Motorik Kasar",
      description:
        "Terapi okupasi adalah bentuk terapi yang bertujuan untuk membantu individu mencapai kemandirian dalam kegiatan sehari-hari, atau aktivitas kehidupan sehari-hari (ADL - Activities of Daily Living) Contoh: Anak berjalan di atas garis lurus yang ditandai di lantai atau  berjalan pada permukaan yang bertekstur.",
      icon: "walking",
      frequency: "Ya/Tidak",
    },
  });

  const recommendation14_tinggi = await prisma.recommendations.create({
    data: {
      is_main: true,
      assesment_number: 14,
      title: "Melatih Komunikasi Non-verbal",
      description:
        "Melatih anak untuk menatap mata saat berbicara atau bermain melalui interaksi yang terstruktur.",
      icon: "eye",
      frequency: "2-3 kali seminggu dengan durasi 30-45 menit per sesi",
      risk_category: "tinggi",
    },
  });

  const recommendation14_sedang = await prisma.recommendations.create({
    data: {
      is_main: true,
      assesment_number: 14,
      title: "Melatih Komunikasi Non-verbal",
      description:
        "Melatih anak untuk menatap mata saat berbicara atau bermain melalui interaksi yang terstruktur.",
      icon: "eye",
      frequency: "2-3 kali seminggu dengan durasi 25-30 menit per sesi",
      risk_category: "sedang",
    },
  });

  const recommendation14_rendah = await prisma.recommendations.create({
    data: {
      is_main: true,
      assesment_number: 14,
      title: "Melatih Komunikasi Non-verbal",
      description:
        "Melatih anak untuk menatap mata saat berbicara atau bermain melalui interaksi yang terstruktur.",
      icon: "eye",
      frequency: "2-3 kali seminggu dengan durasi 10-15 menit per sesi",
      risk_category: "rendah",
    },
  });

  const recommendation15_tinggi = await prisma.recommendations.create({
    data: {
      is_main: true,
      assesment_number: 15,
      title: "Melatih Perkembangan Sosial",
      description:
        "Reciprocal Imitation Training  adalah intervensi berbasis permainan yang bertujuan untuk meningkatkan keterampilan imitasi dan interaksi sosial anak-anak dengan autisme. RIT berfokus pada mengajarkan anak-anak untuk meniru perilaku dan tindakan orang dewasa secara spontan dan natural saat bermain.",
      icon: "copy",
      frequency:
        "Treatment dinaikan intensitasnya bila respon menurun dalam intensitas repetisi tinggi",
      risk_category: "tinggi",
    },
  });

  const recommendation15_sedang = await prisma.recommendations.create({
    data: {
      is_main: true,
      assesment_number: 15,
      title: "Melatih Perkembangan Sosial",
      description:
        "Reciprocal Imitation Training  adalah intervensi berbasis permainan yang bertujuan untuk meningkatkan keterampilan imitasi dan interaksi sosial anak-anak dengan autisme. RIT berfokus pada mengajarkan anak-anak untuk meniru perilaku dan tindakan orang dewasa secara spontan dan natural saat bermain.",
      icon: "copy",
      frequency:
        "Treatment diturunkan intensitasnya bila respon meningkat dalam intensitas repetisi sedang",
      risk_category: "sedang",
    },
  });

  const recommendation15_rendah = await prisma.recommendations.create({
    data: {
      is_main: true,
      assesment_number: 15,
      title: "Melatih Perkembangan Sosial",
      description:
        "Reciprocal Imitation Training  adalah intervensi berbasis permainan yang bertujuan untuk meningkatkan keterampilan imitasi dan interaksi sosial anak-anak dengan autisme. RIT berfokus pada mengajarkan anak-anak untuk meniru perilaku dan tindakan orang dewasa secara spontan dan natural saat bermain.",
      icon: "copy",
      frequency:
        "Treatment diturunkan intensitasnya bila respon meningkat dalam intensitas repetisi rendah",
      risk_category: "rendah",
    },
  });

  const recommendation16_tinggi = await prisma.recommendations.create({
    data: {
      is_main: true,
      assesment_number: 16,
      title: "Melatih Joint Attention",
      description:
        "Lakukan aktivitas bersama anak yang melibatkan kontak mata, interaksi sosial, dan kegiatan yang memerlukan koordinasi seperti permainan Ciluk Ba.",
      icon: "binoculars",
      frequency: "3-4 kali dalam seminggu, dengan durasi 30-45 menit per sesi",
      risk_category: "tinggi",
    },
  });

  const recommendation16_sedang = await prisma.recommendations.create({
    data: {
      is_main: true,
      assesment_number: 16,
      title: "Melatih Joint Attention",
      description:
        "Lakukan aktivitas bersama anak yang melibatkan kontak mata, interaksi sosial, dan kegiatan yang memerlukan koordinasi seperti permainan Ciluk Ba.",
      icon: "binoculars",
      frequency: "2-3 kali dalam seminggu, dengan durasi 30-45 menit per sesi",
      risk_category: "sedang",
    },
  });

  const recommendation16_rendah = await prisma.recommendations.create({
    data: {
      is_main: true,
      assesment_number: 16,
      title: "Melatih Joint Attention",
      description:
        "Lakukan aktivitas bersama anak yang melibatkan kontak mata, interaksi sosial, dan kegiatan yang memerlukan koordinasi seperti permainan Ciluk Ba.",
      icon: "binoculars",
      frequency: "1-2 kali dalam seminggu, dengan durasi 30-45 menit per sesi",
      risk_category: "rendah",
    },
  });

  const recommendation17_tinggi = await prisma.recommendations.create({
    data: {
      is_main: true,
      assesment_number: 17,
      title: "Melatih Keterampilan Komunikasi",
      description:
        "Menggunakan kartu kata bergambar untuk meningkatkan kemampuan komunikasi verbal dan non verbal anak. Mempraktikan dari gambar/ilustrasi",
      icon: "comment",
      frequency: "Dimulai pada tahapan aktivitas 1-3",
      risk_category: "tinggi",
    },
  });

  const recommendation17_sedang = await prisma.recommendations.create({
    data: {
      is_main: true,
      assesment_number: 17,
      title: "Melatih Keterampilan Komunikasi",
      description:
        "Menggunakan kartu kata bergambar untuk meningkatkan kemampuan komunikasi verbal dan non verbal anak. Mempraktikan dari gambar/ilustrasi",
      icon: "comment",
      frequency: "Dimulai pada tahapan aktivitas 2-3",
      risk_category: "sedang",
    },
  });

  const recommendation17_rendah = await prisma.recommendations.create({
    data: {
      is_main: true,
      assesment_number: 17,
      title: "Melatih Keterampilan Komunikasi",
      description:
        "Menggunakan kartu kata bergambar untuk meningkatkan kemampuan komunikasi verbal dan non verbal anak. Mempraktikan dari gambar/ilustrasi",
      icon: "comment",
      frequency: "Dimulai pada tahapan aktivitas 3",
      risk_category: "rendah",
    },
  });

  const recommendation18_tinggi = await prisma.recommendations.create({
    data: {
      is_main: true,
      assesment_number: 18,
      title: "Melatih Pemahaman Instruksi",
      description:
        "Memberikan intruksi kepada anak dengan perintah yang jelas dan tegas, seperti “Buka Sepatumu.",
      icon: "tasks",
      frequency: "Repetisi yang lebih sering dan instruksi lebih terstruktur",
      risk_category: "tinggi",
    },
  });

  const recommendation18_sedang = await prisma.recommendations.create({
    data: {
      is_main: true,
      assesment_number: 18,
      title: "Melatih Pemahaman Instruksi",
      description:
        "Memberikan intruksi kepada anak dengan perintah yang jelas dan tegas, seperti “Buka Sepatumu.",
      icon: "tasks",
      frequency: "Repetisi yang lebih sedikit dan instruksi lebih kompleks",
      risk_category: "sedang",
    },
  });

  const recommendation18_rendah = await prisma.recommendations.create({
    data: {
      is_main: true,
      assesment_number: 18,
      title: "Melatih Pemahaman Instruksi",
      description:
        "Memberikan intruksi kepada anak dengan perintah yang jelas dan tegas, seperti “Buka Sepatumu.",
      icon: "tasks",
      frequency: "Repetisi yang lebih sedikit dan instruksi lebih sedikit",
      risk_category: "rendah",
    },
  });

  const recommendation19 = await prisma.recommendations.create({
    data: {
      is_main: true,
      assesment_number: 19,
      title: "Melatih Kemampuan Sosial",
      description:
        "Buatlah cerita yang menceritakan latar dimana ketika ada orang lain yang mendekati anak, kemudian ajari anak untuk memberi respon dengan tersenyum.",
      icon: "face",
      frequency: "Ya/Tidak",
    },
  });

  const recommendation20_tinggi = await prisma.recommendations.create({
    data: {
      is_main: true,
      assesment_number: 20,
      title: "Melatih Perkembangan Sensorik Taktil",
      description:
        "Mengajarkan anak untuk menyukai aktivitas bergerak melalui permainan dan aktivitas fisik.",
      icon: "carrot",
      frequency: "Tidak ada frekuensi (Ya/Tidak)",
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
