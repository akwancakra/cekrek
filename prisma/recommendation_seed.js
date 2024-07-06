const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Create a recommendation
  const recommendation1_tinggi = await prisma.recommendations.create({
    data: {
      is_main: true,
      assesment_number: 1,
      title: "Melatih Bahasa Reseptif",
      description: `<p style="line-height:1.2;margin-bottom:12pt;margin-top:12pt;text-align:justify;" dir="ltr">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Membangkitkan kontak mata anak dengan memberi perintah “lihat” bersamaan dengan memperlihatkan benda-benda yang menarik perhatiannya, lalu letakkan benda ke mata terapis agar dapat fokus melihat mata dan lakukan sampai 5-10 detik, Serta berikan hadiah saat anak dapat melakukan perintah dengan benar</span></span>
    </p>
    <p style="line-height:1.2;margin-bottom:12pt;margin-top:12pt;text-align:justify;" dir="ltr">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Contoh:</span></span>
    </p>
    <p style="line-height:1.2;margin-bottom:12pt;margin-top:12pt;text-align:justify;" dir="ltr">
        <span style="background-color:transparent;color:#4a86e8;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Ilustrasi: Orang tua memberikan perintah kepada anak untuk melihat benda dengan bubble chat “lihat!”</span></span>
    </p>
    <p style="line-height:1.2;margin-bottom:12pt;margin-top:12pt;text-align:justify;" dir="ltr">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Catatan:&nbsp;</strong></span></span>
    </p>
    <ul style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
        <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
            <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Jika anak dalam kondisi resiko tinggi dapat dilakukan setiap hari dalam jangka waktu yang sama. Akan tetapi, benda yang dipegang diayunkan ke depan mata anda, persis di tengah antara kedua mata dan berjarak kira-kira 5 cm dari wajah anda. Sambil katakan secara bersamaan “Lihat!”.</span></span>
        </li>
        <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
            <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Jika anak sudah sempat melakukan kontak mata namun masih mengabaikan lakukan kegiatan ini selama 5-10&nbsp; detik setiap harinya.&nbsp;</span></span>
        </li>
        <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
            <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Jika anak dalam resiko rendah. Lakukan kegiatan ini selama 5-10 detik setiap harinya.&nbsp;</span></span>
        </li>
    </ul>`,
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
      description: `<p style="line-height:1.2;margin-bottom:12pt;margin-top:12pt;text-align:justify;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Membangkitkan kontak mata anak dengan memberi perintah “lihat” bersamaan dengan memperlihatkan benda-benda yang menarik perhatiannya, lalu letakkan benda ke mata terapis agar dapat fokus melihat mata dan lakukan sampai 5-10 detik, Serta berikan hadiah saat anak dapat melakukan perintah dengan benar</span></span>
</p>
<p style="line-height:1.2;margin-bottom:12pt;margin-top:12pt;text-align:justify;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Contoh:</span></span>
</p>
<p style="line-height:1.2;margin-bottom:12pt;margin-top:12pt;text-align:justify;" dir="ltr">
    <span style="background-color:transparent;color:#4a86e8;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Ilustrasi: Orang tua memberikan perintah kepada anak untuk melihat benda dengan bubble chat “lihat!”</span></span>
</p>
<p style="line-height:1.2;margin-bottom:12pt;margin-top:12pt;text-align:justify;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Catatan:&nbsp;</strong></span></span>
</p>
<ul style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Jika anak dalam kondisi resiko tinggi dapat dilakukan setiap hari dalam jangka waktu yang sama. Akan tetapi, benda yang dipegang diayunkan ke depan mata anda, persis di tengah antara kedua mata dan berjarak kira-kira 5 cm dari wajah anda. Sambil katakan secara bersamaan “Lihat!”.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Jika anak sudah sempat melakukan kontak mata namun masih mengabaikan lakukan kegiatan ini selama 5-10&nbsp; detik setiap harinya.&nbsp;</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Jika anak dalam resiko rendah. Lakukan kegiatan ini selama 5-10 detik setiap harinya.&nbsp;</span></span>
    </li>
</ul>`,
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
      description: `<p style="line-height:1.2;margin-bottom:12pt;margin-top:12pt;text-align:justify;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Membangkitkan kontak mata anak dengan memberi perintah “lihat” bersamaan dengan memperlihatkan benda-benda yang menarik perhatiannya, lalu letakkan benda ke mata terapis agar dapat fokus melihat mata dan lakukan sampai 5-10 detik, Serta berikan hadiah saat anak dapat melakukan perintah dengan benar</span></span>
</p>
<p style="line-height:1.2;margin-bottom:12pt;margin-top:12pt;text-align:justify;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Contoh:</span></span>
</p>
<p style="line-height:1.2;margin-bottom:12pt;margin-top:12pt;text-align:justify;" dir="ltr">
    <span style="background-color:transparent;color:#4a86e8;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Ilustrasi: Orang tua memberikan perintah kepada anak untuk melihat benda dengan bubble chat “lihat!”</span></span>
</p>
<p style="line-height:1.2;margin-bottom:12pt;margin-top:12pt;text-align:justify;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Catatan:&nbsp;</strong></span></span>
</p>
<ul style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Jika anak dalam kondisi resiko tinggi dapat dilakukan setiap hari dalam jangka waktu yang sama. Akan tetapi, benda yang dipegang diayunkan ke depan mata anda, persis di tengah antara kedua mata dan berjarak kira-kira 5 cm dari wajah anda. Sambil katakan secara bersamaan “Lihat!”.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Jika anak sudah sempat melakukan kontak mata namun masih mengabaikan lakukan kegiatan ini selama 5-10&nbsp; detik setiap harinya.&nbsp;</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Jika anak dalam resiko rendah. Lakukan kegiatan ini selama 5-10 detik setiap harinya.&nbsp;</span></span>
    </li>
</ul>`,
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
      description: `<p style="line-height:1.2;margin-bottom:12pt;margin-top:12pt;" dir="ltr">
      <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Contoh aktivitas: Mengelompokkan Warna dan Bentuk</strong></span></span>
  </p>
  <p style="line-height:1.2;margin-bottom:12pt;margin-top:12pt;padding:0pt 0pt 0pt 18pt;text-indent:-18pt;" dir="ltr">
      <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">1.</span></span><span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:6.999999999999999pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">&nbsp;</span><span class="Apple-tab-span" style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre;">	</span></span><span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Memberikan bantuan berupa petunjuk agar anak dapat memberikan respon dengan benar.</span></span>
  </p>
  <p style="line-height:1.2;margin-bottom:12pt;margin-top:12pt;padding:0pt 0pt 0pt 18pt;text-indent:-18pt;" dir="ltr">
      <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Contoh:</span><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong> "Ambil balok warna kuning."</strong></span></span>
  </p>
  <p style="line-height:1.2;margin-bottom:12pt;margin-top:12pt;padding:0pt 0pt 0pt 18pt;text-align:justify;text-indent:-18pt;" dir="ltr">
      <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">2.</span></span><span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:6.999999999999999pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">&nbsp;</span><span class="Apple-tab-span" style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre;">	</span></span><span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Instruksi diberikan dengan cara sederhana, singkat, jelas, konsisten, ulangi&nbsp; instruksi hingga respon yang diberikan anak benar.</span></span>
  </p>
  <p style="line-height:1.2;margin-bottom:12pt;margin-top:12pt;padding:0pt 0pt 0pt 18pt;text-indent:-18pt;" dir="ltr">
      <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Contoh:&nbsp;</span><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>"Ambil balok warna kuning dan letakkan di kotak."</strong></span></span>
  </p>
  <p style="line-height:1.2;margin-bottom:12pt;margin-top:12pt;padding:0pt 0pt 0pt 18pt;text-align:justify;text-indent:-18pt;" dir="ltr">
      <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">3. Tingkatkan kesulitan dengan memberikan dua instruksi sekaligus.</span></span>
  </p>
  <p style="line-height:1.2;margin-bottom:12pt;margin-top:12pt;padding:0pt 0pt 0pt 18pt;text-align:justify;text-indent:-18pt;" dir="ltr">
      <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Contoh:&nbsp;</span><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>"Ambil balok warna kuning dan letakkan di kotak merah."</strong></span></span>
  </p>
  <p style="line-height:1.2;margin-bottom:12pt;margin-top:12pt;padding:0pt 0pt 0pt 18pt;text-align:justify;text-indent:-18pt;" dir="ltr">
      <span style="background-color:transparent;color:#4a86e8;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Ilustrasi: orang tua menunjuk benda dengan bubble chat (lihat lukisan)</span></span>
  </p>
  <p style="line-height:1.2;margin-bottom:12pt;margin-top:12pt;padding:0pt 0pt 0pt 18pt;text-align:justify;text-indent:-18pt;" dir="ltr">
      <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Catatan:&nbsp;</strong></span></span>
  </p>
  <ul style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
      <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
          <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Jika anak dalam kondisi resiko tinggi maka lakukan simulasi dari point nomor 1.</span></span>
      </li>
      <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
          <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Jika anak selalu mengabaikan suara berikan bantuan berupa petunjuk isyarat non verbal agar anak dapat memberikan respon dengan benar.</span></span>
      </li>
      <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
          <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Apabila anak dalam resiko rendah berikan simulasi mulai dari point nomor 2.</span></span>
      </li>
  </ul>`,
    },
  });

  const recommendation3_tinggi = await prisma.recommendations.create({
    data: {
      is_main: true,
      assesment_number: 3,
      title: "Perkembangan Kognitif dan Imajinatif",
      description: `<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Melibatkan diri dalam permainan, ajak anak berbicara atau meminta mereka untuk menjelaskan mainan nya, lakukan kegiatan tersebut selama&nbsp;</span><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>20 – 30 menit dalam sehari-hari.</strong></span></span>
</p>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Contoh: permainan Berpura-pura Berbicara Menggunakan Telepon&nbsp;</strong></span></span>
</p>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#4a86e8;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Ilustrasi: anak dan orang tua duduk bersama sambil bermain puzzle atau ular tangga.</span></span>
</p>
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
      description: `<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Melibatkan diri dalam permainan, ajak anak berbicara atau meminta mereka untuk menjelaskan mainan nya, lakukan kegiatan tersebut selama&nbsp;</span><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>20 – 30 menit dalam sehari-hari.</strong></span></span>
</p>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Contoh: permainan Berpura-pura Berbicara Menggunakan Telepon&nbsp;</strong></span></span>
</p>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#4a86e8;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Ilustrasi: anak dan orang tua duduk bersama sambil bermain puzzle atau ular tangga.</span></span>
</p>
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
      description: `<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Melibatkan diri dalam permainan, ajak anak berbicara atau meminta mereka untuk menjelaskan mainan nya, lakukan kegiatan tersebut selama&nbsp;</span><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>20 – 30 menit dalam sehari-hari.</strong></span></span>
</p>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Contoh: permainan Berpura-pura Berbicara Menggunakan Telepon&nbsp;</strong></span></span>
</p>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#4a86e8;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Ilustrasi: anak dan orang tua duduk bersama sambil bermain puzzle atau ular tangga.</span></span>
</p>
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
      description: `<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Melakukan permainan sirkuit yaitu aktivitas yang disusun secara berurutan dimana anak berpindah dari suatu aktivitas (dalam stasiun atau pos) ke aktivitas lainnya terutama permainan yang meningkatkan kemampuan motorik kasar (</span><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Contoh: permainan menjelajah</strong></span><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">)</span></span>
</p>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Pos 1: Lempar Bola Beanbag</strong></span></span>
</p>
<ul style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Berdiri di garis awal, lempar bola beanbag ke dalam keranjang dari jarak 1 meter.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Jika berhasil, lanjutkan ke pos 2. Jika tidak, ulangi lemparan bola beanbag.</span></span>
    </li>
</ul>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Pos 2: Merayap di Bawah Terowongan</strong></span></span>
</p>
<ul style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Merayap di bawah terowongan kain sepanjang 3 meter.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Berdiri di ujung terowongan dan lanjutkan ke pos 3.</span></span>
    </li>
</ul>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Pos 3: Berjalan di Atas Balok Keseimbangan</strong></span></span>
</p>
<ul style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Berjalan di atas balok keseimbangan sepanjang 1 meter.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Berhenti di ujung balok dan sentuh garis finish.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Lanjutkan ke pos 4.</span></span>
    </li>
</ul>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Pos 4: Bermain Bowling</strong></span></span>
</p>
<ul style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Berdiri di garis start, lempar bola bowling ke pin bowling.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Jika berhasil menjatuhkan pin, lanjutkan ke pos 5. Jika tidak, ulangi lemparan bola bowling.</span></span>
    </li>
</ul>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Pos 5: Lompat Tali</strong></span></span>
</p>
<ul style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Berdiri di garis awal, lompat tali sebanyak 5 kali.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Jika berhasil, kembali ke pos 1 dan ulangi sirkuit dari awal.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Jika tidak, ulangi lompatan tali.</span></span>
    </li>
</ul>
<p style="line-height:1.2;margin-bottom:12pt;margin-top:12pt;" dir="ltr">
    <span style="background-color:transparent;color:#4a86e8;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Ilustrasi: dalam situasi ada permainan, gambar 1 anak bermain lempar bola, gambar 2 anak merayap di bawah terowongan, gambar 3 anak berjalan di atas balok keseimbangan, gambar 4 anak bermain bowling dan gambar 5 anak main lompat tali.</span></span>
</p>
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
      description: `<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Melakukan permainan sirkuit yaitu aktivitas yang disusun secara berurutan dimana anak berpindah dari suatu aktivitas (dalam stasiun atau pos) ke aktivitas lainnya terutama permainan yang meningkatkan kemampuan motorik kasar (</span><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Contoh: permainan menjelajah</strong></span><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">)</span></span>
</p>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Pos 1: Lempar Bola Beanbag</strong></span></span>
</p>
<ul style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Berdiri di garis awal, lempar bola beanbag ke dalam keranjang dari jarak 1 meter.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Jika berhasil, lanjutkan ke pos 2. Jika tidak, ulangi lemparan bola beanbag.</span></span>
    </li>
</ul>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Pos 2: Merayap di Bawah Terowongan</strong></span></span>
</p>
<ul style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Merayap di bawah terowongan kain sepanjang 3 meter.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Berdiri di ujung terowongan dan lanjutkan ke pos 3.</span></span>
    </li>
</ul>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Pos 3: Berjalan di Atas Balok Keseimbangan</strong></span></span>
</p>
<ul style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Berjalan di atas balok keseimbangan sepanjang 1 meter.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Berhenti di ujung balok dan sentuh garis finish.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Lanjutkan ke pos 4.</span></span>
    </li>
</ul>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Pos 4: Bermain Bowling</strong></span></span>
</p>
<ul style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Berdiri di garis start, lempar bola bowling ke pin bowling.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Jika berhasil menjatuhkan pin, lanjutkan ke pos 5. Jika tidak, ulangi lemparan bola bowling.</span></span>
    </li>
</ul>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Pos 5: Lompat Tali</strong></span></span>
</p>
<ul style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Berdiri di garis awal, lompat tali sebanyak 5 kali.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Jika berhasil, kembali ke pos 1 dan ulangi sirkuit dari awal.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Jika tidak, ulangi lompatan tali.</span></span>
    </li>
</ul>
<p style="line-height:1.2;margin-bottom:12pt;margin-top:12pt;" dir="ltr">
    <span style="background-color:transparent;color:#4a86e8;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Ilustrasi: dalam situasi ada permainan, gambar 1 anak bermain lempar bola, gambar 2 anak merayap di bawah terowongan, gambar 3 anak berjalan di atas balok keseimbangan, gambar 4 anak bermain bowling dan gambar 5 anak main lompat tali.</span></span>
</p>
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
      description: `<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Melakukan permainan sirkuit yaitu aktivitas yang disusun secara berurutan dimana anak berpindah dari suatu aktivitas (dalam stasiun atau pos) ke aktivitas lainnya terutama permainan yang meningkatkan kemampuan motorik kasar (</span><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Contoh: permainan menjelajah</strong></span><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">)</span></span>
</p>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Pos 1: Lempar Bola Beanbag</strong></span></span>
</p>
<ul style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Berdiri di garis awal, lempar bola beanbag ke dalam keranjang dari jarak 1 meter.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Jika berhasil, lanjutkan ke pos 2. Jika tidak, ulangi lemparan bola beanbag.</span></span>
    </li>
</ul>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Pos 2: Merayap di Bawah Terowongan</strong></span></span>
</p>
<ul style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Merayap di bawah terowongan kain sepanjang 3 meter.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Berdiri di ujung terowongan dan lanjutkan ke pos 3.</span></span>
    </li>
</ul>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Pos 3: Berjalan di Atas Balok Keseimbangan</strong></span></span>
</p>
<ul style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Berjalan di atas balok keseimbangan sepanjang 1 meter.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Berhenti di ujung balok dan sentuh garis finish.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Lanjutkan ke pos 4.</span></span>
    </li>
</ul>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Pos 4: Bermain Bowling</strong></span></span>
</p>
<ul style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Berdiri di garis start, lempar bola bowling ke pin bowling.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Jika berhasil menjatuhkan pin, lanjutkan ke pos 5. Jika tidak, ulangi lemparan bola bowling.</span></span>
    </li>
</ul>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Pos 5: Lompat Tali</strong></span></span>
</p>
<ul style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Berdiri di garis awal, lompat tali sebanyak 5 kali.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Jika berhasil, kembali ke pos 1 dan ulangi sirkuit dari awal.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Jika tidak, ulangi lompatan tali.</span></span>
    </li>
</ul>
<p style="line-height:1.2;margin-bottom:12pt;margin-top:12pt;" dir="ltr">
    <span style="background-color:transparent;color:#4a86e8;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Ilustrasi: dalam situasi ada permainan, gambar 1 anak bermain lempar bola, gambar 2 anak merayap di bawah terowongan, gambar 3 anak berjalan di atas balok keseimbangan, gambar 4 anak bermain bowling dan gambar 5 anak main lompat tali.</span></span>
</p>
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
      description: `<p style="line-height:1.2;margin-bottom:12pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Latihan PECS Fase Pertama:&nbsp;</strong></span></span><span style="background-color:#ffffff;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Mengajak anak untuk bertukar gambar dengan objek yang mereka inginkan.</span></span>
</p>
<p style="line-height:1.2;margin-bottom:12pt;margin-top:12pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Latihan PECS Fase Kedua (Fase jarak, ketekunan, dan kemauan yang kuat):&nbsp;</strong></span><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">mengambil gambar lalu membawakan nya ke terapis untuk menukar dengan benda yang diinginkan</span></span>
</p>
<p style="line-height:1.2;margin-bottom:12pt;margin-top:12pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Latihan PECS Fase Ketiga (fase&nbsp;</strong></span><i><span style="font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>discrimination</strong></span></i><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>)</strong></span></span>
</p>
<p style="line-height:1.2;margin-bottom:12pt;margin-top:12pt;" dir="ltr">
    <span style="background-color:#ffffff;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Membeda-bedakan antara gambar, mengajarkan individu untuk memilih gambar yang benar dari beberapa pilihan</span></span>
</p>
<p style="line-height:1.2;margin-bottom:12pt;margin-top:12pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Latihan PECS Fase Keempat merekatkan kata “saya mau”&nbsp;</strong></span><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">merekatkan kata “saya mau”</span></span>
</p>
<p style="line-height:1.2;margin-bottom:12pt;margin-top:12pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Latihan PECS Fase Kelima (fase r</strong></span><i><span style="font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>esponsive requesting</strong></span></i><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>/menjawab pertanyaan):&nbsp;</strong></span><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">menjawab dengan menyusun kalimat ketika ditanya “kamu mau apa?”</span></span>
</p>
<p style="line-height:1.2;margin-bottom:12pt;margin-top:12pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">“saya mau”</span></span>
</p>
<p style="line-height:1.2;margin-bottom:12pt;margin-top:12pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Latihan PECS Fase Keenam (fase&nbsp;</strong></span><i><span style="font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Commenting</strong></span></i><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>/ memberikan komentar):&nbsp;</strong></span><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">anak dapat menyusun kalimat dengan menggunakan gambar “saya melihat” pada permulaan kalimat dan gambar item dari objek.</span></span>
</p>
<p style="line-height:1.2;margin-bottom:12pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:#ffffff;color:#4a86e8;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Ilustrasi: Anak membawa kartu bergambar boneka, disampingnya ada orang tua membawa boneka dengan buble cht tulisan saya mau.</span></span>
</p>
<p style="line-height:1.2;margin-bottom:12pt;margin-top:12pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Catatan:</strong></span></span>
</p>
<ul style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Jika anak dalam kondisi resiko rendah</span><i><span style="font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"> (hanya menunjuk tanpa berbicara)&nbsp;</span></i><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">simulasi dapat dilakukan mulai dari PECS fase keempat.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Berikan instruksi secara berulang dan apabila anak menunjukkan respon berikan penguatan positif.</span></span>
    </li>
</ul>
<p>
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Jika anak dalam kondisi resiko tinggi&nbsp;</span><i><span style="font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">(tidak pernah menunjukkan bentuk komunikasi)</span></i><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"> berikan simulasi PECS dari fase pertama.</span></span>
</p>`,
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
      description: `<p style="line-height:1.2;margin-bottom:12pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Latihan PECS Fase Pertama:&nbsp;</strong></span></span><span style="background-color:#ffffff;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Mengajak anak untuk bertukar gambar dengan objek yang mereka inginkan.</span></span>
</p>
<p style="line-height:1.2;margin-bottom:12pt;margin-top:12pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Latihan PECS Fase Kedua (Fase jarak, ketekunan, dan kemauan yang kuat):&nbsp;</strong></span><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">mengambil gambar lalu membawakan nya ke terapis untuk menukar dengan benda yang diinginkan</span></span>
</p>
<p style="line-height:1.2;margin-bottom:12pt;margin-top:12pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Latihan PECS Fase Ketiga (fase&nbsp;</strong></span><i><span style="font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>discrimination</strong></span></i><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>)</strong></span></span>
</p>
<p style="line-height:1.2;margin-bottom:12pt;margin-top:12pt;" dir="ltr">
    <span style="background-color:#ffffff;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Membeda-bedakan antara gambar, mengajarkan individu untuk memilih gambar yang benar dari beberapa pilihan</span></span>
</p>
<p style="line-height:1.2;margin-bottom:12pt;margin-top:12pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Latihan PECS Fase Keempat merekatkan kata “saya mau”&nbsp;</strong></span><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">merekatkan kata “saya mau”</span></span>
</p>
<p style="line-height:1.2;margin-bottom:12pt;margin-top:12pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Latihan PECS Fase Kelima (fase r</strong></span><i><span style="font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>esponsive requesting</strong></span></i><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>/menjawab pertanyaan):&nbsp;</strong></span><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">menjawab dengan menyusun kalimat ketika ditanya “kamu mau apa?”</span></span>
</p>
<p style="line-height:1.2;margin-bottom:12pt;margin-top:12pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">“saya mau”</span></span>
</p>
<p style="line-height:1.2;margin-bottom:12pt;margin-top:12pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Latihan PECS Fase Keenam (fase&nbsp;</strong></span><i><span style="font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Commenting</strong></span></i><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>/ memberikan komentar):&nbsp;</strong></span><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">anak dapat menyusun kalimat dengan menggunakan gambar “saya melihat” pada permulaan kalimat dan gambar item dari objek.</span></span>
</p>
<p style="line-height:1.2;margin-bottom:12pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:#ffffff;color:#4a86e8;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Ilustrasi: Anak membawa kartu bergambar boneka, disampingnya ada orang tua membawa boneka dengan buble cht tulisan saya mau.</span></span>
</p>
<p style="line-height:1.2;margin-bottom:12pt;margin-top:12pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Catatan:</strong></span></span>
</p>
<ul style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Jika anak dalam kondisi resiko rendah</span><i><span style="font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"> (hanya menunjuk tanpa berbicara)&nbsp;</span></i><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">simulasi dapat dilakukan mulai dari PECS fase keempat.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Berikan instruksi secara berulang dan apabila anak menunjukkan respon berikan penguatan positif.</span></span>
    </li>
</ul>
<p>
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Jika anak dalam kondisi resiko tinggi&nbsp;</span><i><span style="font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">(tidak pernah menunjukkan bentuk komunikasi)</span></i><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"> berikan simulasi PECS dari fase pertama.</span></span>
</p>`,
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
      description: `<p style="line-height:1.2;margin-bottom:12pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Latihan PECS Fase Pertama:&nbsp;</strong></span></span><span style="background-color:#ffffff;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Mengajak anak untuk bertukar gambar dengan objek yang mereka inginkan.</span></span>
</p>
<p style="line-height:1.2;margin-bottom:12pt;margin-top:12pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Latihan PECS Fase Kedua (Fase jarak, ketekunan, dan kemauan yang kuat):&nbsp;</strong></span><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">mengambil gambar lalu membawakan nya ke terapis untuk menukar dengan benda yang diinginkan</span></span>
</p>
<p style="line-height:1.2;margin-bottom:12pt;margin-top:12pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Latihan PECS Fase Ketiga (fase&nbsp;</strong></span><i><span style="font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>discrimination</strong></span></i><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>)</strong></span></span>
</p>
<p style="line-height:1.2;margin-bottom:12pt;margin-top:12pt;" dir="ltr">
    <span style="background-color:#ffffff;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Membeda-bedakan antara gambar, mengajarkan individu untuk memilih gambar yang benar dari beberapa pilihan</span></span>
</p>
<p style="line-height:1.2;margin-bottom:12pt;margin-top:12pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Latihan PECS Fase Keempat merekatkan kata “saya mau”&nbsp;</strong></span><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">merekatkan kata “saya mau”</span></span>
</p>
<p style="line-height:1.2;margin-bottom:12pt;margin-top:12pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Latihan PECS Fase Kelima (fase r</strong></span><i><span style="font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>esponsive requesting</strong></span></i><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>/menjawab pertanyaan):&nbsp;</strong></span><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">menjawab dengan menyusun kalimat ketika ditanya “kamu mau apa?”</span></span>
</p>
<p style="line-height:1.2;margin-bottom:12pt;margin-top:12pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">“saya mau”</span></span>
</p>
<p style="line-height:1.2;margin-bottom:12pt;margin-top:12pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Latihan PECS Fase Keenam (fase&nbsp;</strong></span><i><span style="font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Commenting</strong></span></i><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>/ memberikan komentar):&nbsp;</strong></span><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">anak dapat menyusun kalimat dengan menggunakan gambar “saya melihat” pada permulaan kalimat dan gambar item dari objek.</span></span>
</p>
<p style="line-height:1.2;margin-bottom:12pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:#ffffff;color:#4a86e8;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Ilustrasi: Anak membawa kartu bergambar boneka, disampingnya ada orang tua membawa boneka dengan buble cht tulisan saya mau.</span></span>
</p>
<p style="line-height:1.2;margin-bottom:12pt;margin-top:12pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Catatan:</strong></span></span>
</p>
<ul style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Jika anak dalam kondisi resiko rendah</span><i><span style="font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"> (hanya menunjuk tanpa berbicara)&nbsp;</span></i><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">simulasi dapat dilakukan mulai dari PECS fase keempat.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Berikan instruksi secara berulang dan apabila anak menunjukkan respon berikan penguatan positif.</span></span>
    </li>
</ul>
<p>
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Jika anak dalam kondisi resiko tinggi&nbsp;</span><i><span style="font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">(tidak pernah menunjukkan bentuk komunikasi)</span></i><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"> berikan simulasi PECS dari fase pertama.</span></span>
</p>`,
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
      description: `<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Terapi Bermain Peran</strong></span></span>
    </p>
    <p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Bermain Peran untuk meningkatkan kemampuan sosial pada anak.</span></span>
    </p>
    <p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Contoh:&nbsp;</span></span>
    </p>
    <ul style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
        <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
            <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Untuk anak dengan kondisi resiko tinggi (sama sekali tidak menunjukkan interaksi terhadap anak lain), buatlah cerita yang diperankan oleh alat bantu seperti boneka yang memerankan dua orang yang sedang berinteraksi agar anak tertarik melakukan interaksi dengan anak lainnya.</span></span>
        </li>
        <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
            <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Bagi anak dengan kondisi resiko sedang (bertingkah malu atau ragu terhadap anak lain) berikan permainan peran yang membuat anak berani berinteraksi dengan anak lain.</span></span>
        </li>
        <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
            <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Bagi anak dengan keadaan&nbsp; resiko ringan, berikan peran cerita yang menunjukkan bagaimana seharusnya anak berinteraksi dengan anak lainnya.</span></span>
        </li>
    </ul>
    <p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Contoh: bermain peran sebagai pedagang atau bermain peran dalam pesta minum teh&nbsp;</strong></span></span>
    </p>
    <p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
        <span style="background-color:transparent;color:#4a86e8;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Ilustrasi: situasi anak mengadakan acara minum teh bersama bonekanya.&nbsp;</span></span>
    </p>
    <p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Catatan:</strong></span></span>
    </p>
    <ul style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
        <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
            <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Konsisten dalam bermain peran hingga anak tertarik dan mampu berinteraksi dengan anak lainnya.</span></span>
        </li>
    </ul>`,
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
      description: `<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Terapi Bermain Peran</strong></span></span>
</p>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Bermain Peran untuk meningkatkan kemampuan sosial pada anak.</span></span>
</p>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Contoh:&nbsp;</span></span>
</p>
<ul style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Untuk anak dengan kondisi resiko tinggi (sama sekali tidak menunjukkan interaksi terhadap anak lain), buatlah cerita yang diperankan oleh alat bantu seperti boneka yang memerankan dua orang yang sedang berinteraksi agar anak tertarik melakukan interaksi dengan anak lainnya.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Bagi anak dengan kondisi resiko sedang (bertingkah malu atau ragu terhadap anak lain) berikan permainan peran yang membuat anak berani berinteraksi dengan anak lain.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Bagi anak dengan keadaan&nbsp; resiko ringan, berikan peran cerita yang menunjukkan bagaimana seharusnya anak berinteraksi dengan anak lainnya.</span></span>
    </li>
</ul>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Contoh: bermain peran sebagai pedagang atau bermain peran dalam pesta minum teh&nbsp;</strong></span></span>
</p>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#4a86e8;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Ilustrasi: situasi anak mengadakan acara minum teh bersama bonekanya.&nbsp;</span></span>
</p>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Catatan:</strong></span></span>
</p>
<ul style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Konsisten dalam bermain peran hingga anak tertarik dan mampu berinteraksi dengan anak lainnya.</span></span>
    </li>
</ul>`,
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
      description: `<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Terapi Bermain Peran</strong></span></span>
</p>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Bermain Peran untuk meningkatkan kemampuan sosial pada anak.</span></span>
</p>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Contoh:&nbsp;</span></span>
</p>
<ul style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Untuk anak dengan kondisi resiko tinggi (sama sekali tidak menunjukkan interaksi terhadap anak lain), buatlah cerita yang diperankan oleh alat bantu seperti boneka yang memerankan dua orang yang sedang berinteraksi agar anak tertarik melakukan interaksi dengan anak lainnya.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Bagi anak dengan kondisi resiko sedang (bertingkah malu atau ragu terhadap anak lain) berikan permainan peran yang membuat anak berani berinteraksi dengan anak lain.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Bagi anak dengan keadaan&nbsp; resiko ringan, berikan peran cerita yang menunjukkan bagaimana seharusnya anak berinteraksi dengan anak lainnya.</span></span>
    </li>
</ul>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Contoh: bermain peran sebagai pedagang atau bermain peran dalam pesta minum teh&nbsp;</strong></span></span>
</p>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#4a86e8;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Ilustrasi: situasi anak mengadakan acara minum teh bersama bonekanya.&nbsp;</span></span>
</p>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Catatan:</strong></span></span>
</p>
<ul style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Konsisten dalam bermain peran hingga anak tertarik dan mampu berinteraksi dengan anak lainnya.</span></span>
    </li>
</ul>`,
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
      description: `<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Mengajarkan anak agar mau berbagi hal yang diminatinya&nbsp; (dalam konteks sosial)&nbsp;</span><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>contoh melalui kegiatan bermain lego</strong></span><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">.</span></span>
</p>
<ol style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Mengajak anak untuk menyusun lego sesuai dengan kreativitasnya.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Setelah selesai menyusun lego instruksikan anak untuk memperlihatkan karyanya kepada orang lain.</span></span>
    </li>
</ol>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#4a86e8;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">ilustrasi : anak dan orang tua menyusun lego bersama.&nbsp;</span></span>
</p>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Catatan:</strong></span></span>
</p>
<ul style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Lakukan aktivitas ini selama empat hingga lima kali dalam seminggu.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Konsisten dalam melakukan pengulangan aktivitas hingga anak mulai menunjukkan sikap ingin berbagi hal yang diminatinya kepada orang lain.</span></span>
    </li>
</ul>`,
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
      description: `<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Mengajarkan anak agar mau berbagi hal yang diminatinya&nbsp; (dalam konteks sosial)&nbsp;</span><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>contoh melalui kegiatan bermain lego</strong></span><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">.</span></span>
</p>
<ol style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Mengajak anak untuk menyusun lego sesuai dengan kreativitasnya.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Setelah selesai menyusun lego instruksikan anak untuk memperlihatkan karyanya kepada orang lain.</span></span>
    </li>
</ol>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#4a86e8;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">ilustrasi : anak dan orang tua menyusun lego bersama.&nbsp;</span></span>
</p>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Catatan:</strong></span></span>
</p>
<ul style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Lakukan aktivitas ini selama empat hingga lima kali dalam seminggu.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Konsisten dalam melakukan pengulangan aktivitas hingga anak mulai menunjukkan sikap ingin berbagi hal yang diminatinya kepada orang lain.</span></span>
    </li>
</ul>`,
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
      description: `<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Mengajarkan anak agar mau berbagi hal yang diminatinya&nbsp; (dalam konteks sosial)&nbsp;</span><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>contoh melalui kegiatan bermain lego</strong></span><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">.</span></span>
</p>
<ol style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Mengajak anak untuk menyusun lego sesuai dengan kreativitasnya.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Setelah selesai menyusun lego instruksikan anak untuk memperlihatkan karyanya kepada orang lain.</span></span>
    </li>
</ol>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#4a86e8;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">ilustrasi : anak dan orang tua menyusun lego bersama.&nbsp;</span></span>
</p>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Catatan:</strong></span></span>
</p>
<ul style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Lakukan aktivitas ini selama empat hingga lima kali dalam seminggu.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Konsisten dalam melakukan pengulangan aktivitas hingga anak mulai menunjukkan sikap ingin berbagi hal yang diminatinya kepada orang lain.</span></span>
    </li>
</ul>`,
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
      description: `<p style="line-height:1.2;margin-bottom:12pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Langkah Pelaksanaan DIR/</strong></span><i><span style="font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Floortime</strong></span></i><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>:&nbsp;</strong></span></span>
</p>
<ol style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Tahap 1 Mengikuti Minat Anak</span></span>
    </li>
</ol>
<p style="line-height:1.2;margin-bottom:12pt;margin-left:36pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Contoh: mengajak anak untuk bermain, permainan yang diminatinya. Misalnya bermain mobil-mobilan</span></span>
</p>
<ol style="margin-bottom:0;margin-top:0;padding-inline-start:48px;" start="2">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Tahap 2 Masuk ke Dunia Anak</span></span>
    </li>
</ol>
<p style="line-height:1.2;margin-bottom:12pt;margin-left:36pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Contoh: ikut bermain bersama anak sembari bertanya mobil mana yang menjadi kesukaannya.</span></span>
</p>
<ol style="margin-bottom:0;margin-top:0;padding-inline-start:48px;" start="3">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Tahap 3 Membangun komunikasi</span></span>
    </li>
</ol>
<p style="line-height:1.2;margin-bottom:12pt;margin-left:36pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Contoh: libatkan anak dalam percakapan sederhana tentang kemana mobil itu pergi dan apa yang akan dilakukan di sana.</span></span>
</p>
<ol style="margin-bottom:0;margin-top:0;padding-inline-start:48px;" start="4">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Tahap 4 Menggunakan Strategi Emosional dan Sosial</span></span>
    </li>
</ol>
<p style="line-height:1.2;margin-bottom:12pt;margin-left:36pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Contoh: bicarakan tentang perasaan mobil dan tanyakan bagaimana anak akan membantu. seperti “Mobil ini merasa lelah setelah perjalanan panjang. Apa yang harus kita lakukan?”</span></span>
</p>
<ol style="margin-bottom:0;margin-top:0;padding-inline-start:48px;" start="5">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Tahap 5 Mendorong anak untuk berpikir</span></span>
    </li>
</ol>
<p style="line-height:1.2;margin-bottom:12pt;margin-left:36pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Contoh: ajak anak untuk berpikir tentang solusi, seperti mencari pompa bensin atau meminta bantuan mobil lain.</span></span>
</p>
<p style="line-height:1.2;margin-bottom:12pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#4a86e8;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Ilustrasi: anak sedang bermain mobil-mobilan ditemani orang tua diberikan buble chat dengan tulisan “kalau mobilnya habis bensin harus beli apa ya?”</span></span>
</p>
<p style="line-height:1.2;margin-bottom:12pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Catatan</strong></span></span>
</p>
<ul style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Bagi anak dengan kondisi resiko tinggi, simulasi selama 60 menit, 2-3 kali seminggu</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Bagi anak dengan kondisi resiko sedang,simulasi 45 menit, 1-2 kali seminggu.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Bagi anak dengan kondisi resiko rendah simulasi dilakukan kurang dari 30 menit 1 kali seminggu.&nbsp;</span></span>
    </li>
</ul>`,
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
      description: `<p style="line-height:1.2;margin-bottom:12pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Langkah Pelaksanaan DIR/</strong></span><i><span style="font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Floortime</strong></span></i><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>:&nbsp;</strong></span></span>
</p>
<ol style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Tahap 1 Mengikuti Minat Anak</span></span>
    </li>
</ol>
<p style="line-height:1.2;margin-bottom:12pt;margin-left:36pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Contoh: mengajak anak untuk bermain, permainan yang diminatinya. Misalnya bermain mobil-mobilan</span></span>
</p>
<ol style="margin-bottom:0;margin-top:0;padding-inline-start:48px;" start="2">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Tahap 2 Masuk ke Dunia Anak</span></span>
    </li>
</ol>
<p style="line-height:1.2;margin-bottom:12pt;margin-left:36pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Contoh: ikut bermain bersama anak sembari bertanya mobil mana yang menjadi kesukaannya.</span></span>
</p>
<ol style="margin-bottom:0;margin-top:0;padding-inline-start:48px;" start="3">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Tahap 3 Membangun komunikasi</span></span>
    </li>
</ol>
<p style="line-height:1.2;margin-bottom:12pt;margin-left:36pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Contoh: libatkan anak dalam percakapan sederhana tentang kemana mobil itu pergi dan apa yang akan dilakukan di sana.</span></span>
</p>
<ol style="margin-bottom:0;margin-top:0;padding-inline-start:48px;" start="4">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Tahap 4 Menggunakan Strategi Emosional dan Sosial</span></span>
    </li>
</ol>
<p style="line-height:1.2;margin-bottom:12pt;margin-left:36pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Contoh: bicarakan tentang perasaan mobil dan tanyakan bagaimana anak akan membantu. seperti “Mobil ini merasa lelah setelah perjalanan panjang. Apa yang harus kita lakukan?”</span></span>
</p>
<ol style="margin-bottom:0;margin-top:0;padding-inline-start:48px;" start="5">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Tahap 5 Mendorong anak untuk berpikir</span></span>
    </li>
</ol>
<p style="line-height:1.2;margin-bottom:12pt;margin-left:36pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Contoh: ajak anak untuk berpikir tentang solusi, seperti mencari pompa bensin atau meminta bantuan mobil lain.</span></span>
</p>
<p style="line-height:1.2;margin-bottom:12pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#4a86e8;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Ilustrasi: anak sedang bermain mobil-mobilan ditemani orang tua diberikan buble chat dengan tulisan “kalau mobilnya habis bensin harus beli apa ya?”</span></span>
</p>
<p style="line-height:1.2;margin-bottom:12pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Catatan</strong></span></span>
</p>
<ul style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Bagi anak dengan kondisi resiko tinggi, simulasi selama 60 menit, 2-3 kali seminggu</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Bagi anak dengan kondisi resiko sedang,simulasi 45 menit, 1-2 kali seminggu.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Bagi anak dengan kondisi resiko rendah simulasi dilakukan kurang dari 30 menit 1 kali seminggu.&nbsp;</span></span>
    </li>
</ul>`,
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
      description: `<p style="line-height:1.2;margin-bottom:12pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Langkah Pelaksanaan DIR/</strong></span><i><span style="font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Floortime</strong></span></i><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>:&nbsp;</strong></span></span>
</p>
<ol style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Tahap 1 Mengikuti Minat Anak</span></span>
    </li>
</ol>
<p style="line-height:1.2;margin-bottom:12pt;margin-left:36pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Contoh: mengajak anak untuk bermain, permainan yang diminatinya. Misalnya bermain mobil-mobilan</span></span>
</p>
<ol style="margin-bottom:0;margin-top:0;padding-inline-start:48px;" start="2">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Tahap 2 Masuk ke Dunia Anak</span></span>
    </li>
</ol>
<p style="line-height:1.2;margin-bottom:12pt;margin-left:36pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Contoh: ikut bermain bersama anak sembari bertanya mobil mana yang menjadi kesukaannya.</span></span>
</p>
<ol style="margin-bottom:0;margin-top:0;padding-inline-start:48px;" start="3">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Tahap 3 Membangun komunikasi</span></span>
    </li>
</ol>
<p style="line-height:1.2;margin-bottom:12pt;margin-left:36pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Contoh: libatkan anak dalam percakapan sederhana tentang kemana mobil itu pergi dan apa yang akan dilakukan di sana.</span></span>
</p>
<ol style="margin-bottom:0;margin-top:0;padding-inline-start:48px;" start="4">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Tahap 4 Menggunakan Strategi Emosional dan Sosial</span></span>
    </li>
</ol>
<p style="line-height:1.2;margin-bottom:12pt;margin-left:36pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Contoh: bicarakan tentang perasaan mobil dan tanyakan bagaimana anak akan membantu. seperti “Mobil ini merasa lelah setelah perjalanan panjang. Apa yang harus kita lakukan?”</span></span>
</p>
<ol style="margin-bottom:0;margin-top:0;padding-inline-start:48px;" start="5">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Tahap 5 Mendorong anak untuk berpikir</span></span>
    </li>
</ol>
<p style="line-height:1.2;margin-bottom:12pt;margin-left:36pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Contoh: ajak anak untuk berpikir tentang solusi, seperti mencari pompa bensin atau meminta bantuan mobil lain.</span></span>
</p>
<p style="line-height:1.2;margin-bottom:12pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#4a86e8;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Ilustrasi: anak sedang bermain mobil-mobilan ditemani orang tua diberikan buble chat dengan tulisan “kalau mobilnya habis bensin harus beli apa ya?”</span></span>
</p>
<p style="line-height:1.2;margin-bottom:12pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Catatan</strong></span></span>
</p>
<ul style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Bagi anak dengan kondisi resiko tinggi, simulasi selama 60 menit, 2-3 kali seminggu</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Bagi anak dengan kondisi resiko sedang,simulasi 45 menit, 1-2 kali seminggu.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Bagi anak dengan kondisi resiko rendah simulasi dilakukan kurang dari 30 menit 1 kali seminggu.&nbsp;</span></span>
    </li>
</ul>`,
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
      description: `Bermain Flashcard Ekspresi
Terapi bermain dengan flashcard adalah salah satu metode yang dapat digunakan untuk meningkatkan keterampilan sosial anak. 
Tunjukkan flashcard yang berisi gambar macam-macam ekspresi hingga anak mengenal macam-macam ekspresi tersebut.
Mintalah anak untuk menirukan macam-macam ekspresi yang terdapat dalam flashcard.
Ajarkan anak untuk berekspresi sesuai dengan suasana atau keadaan yang dirasakannya.

Ilustrasi: Orang tua menunjukkan kartu yang berisi gambar ekspresi marah dan anak menirukan ekspresi marah seperti pada gambar.
Catatan:
Lakukan aktivitas pada point 1 bagi anak dengan kondisi resiko tinggi hingga anak mampu mengenal macam-macam ekspresi kemudian lanjut pada tahap selanjutnya.
Jika anak dalam kondisi resiko sedang lakukan aktivitas mulai dari point 2.
Apabila anak dengan kondisi resiko rendah lakukan simulasi pada aktivitas 2 dan atau 3.
`,
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
      description: `Bermain Flashcard Ekspresi
Terapi bermain dengan flashcard adalah salah satu metode yang dapat digunakan untuk meningkatkan keterampilan sosial anak. 
Tunjukkan flashcard yang berisi gambar macam-macam ekspresi hingga anak mengenal macam-macam ekspresi tersebut.
Mintalah anak untuk menirukan macam-macam ekspresi yang terdapat dalam flashcard.
Ajarkan anak untuk berekspresi sesuai dengan suasana atau keadaan yang dirasakannya.

Ilustrasi: Orang tua menunjukkan kartu yang berisi gambar ekspresi marah dan anak menirukan ekspresi marah seperti pada gambar.
Catatan:
Lakukan aktivitas pada point 1 bagi anak dengan kondisi resiko tinggi hingga anak mampu mengenal macam-macam ekspresi kemudian lanjut pada tahap selanjutnya.
Jika anak dalam kondisi resiko sedang lakukan aktivitas mulai dari point 2.
Apabila anak dengan kondisi resiko rendah lakukan simulasi pada aktivitas 2 dan atau 3.
`,
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
      description: `Bermain Flashcard Ekspresi
Terapi bermain dengan flashcard adalah salah satu metode yang dapat digunakan untuk meningkatkan keterampilan sosial anak. 
Tunjukkan flashcard yang berisi gambar macam-macam ekspresi hingga anak mengenal macam-macam ekspresi tersebut.
Mintalah anak untuk menirukan macam-macam ekspresi yang terdapat dalam flashcard.
Ajarkan anak untuk berekspresi sesuai dengan suasana atau keadaan yang dirasakannya.

Ilustrasi: Orang tua menunjukkan kartu yang berisi gambar ekspresi marah dan anak menirukan ekspresi marah seperti pada gambar.
Catatan:
Lakukan aktivitas pada point 1 bagi anak dengan kondisi resiko tinggi hingga anak mampu mengenal macam-macam ekspresi kemudian lanjut pada tahap selanjutnya.
Jika anak dalam kondisi resiko sedang lakukan aktivitas mulai dari point 2.
Apabila anak dengan kondisi resiko rendah lakukan simulasi pada aktivitas 2 dan atau 3.
`,
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
      description: `<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Pengenalan sensasi, mengerti makna informasi/ interpretasi, merespon informasi sensori "Apakah kamu ingin tetap duduk di sini atau ingin pergi ke ruangan yang lebih tenang?”</span></span>
</p>
<ul style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Tahap 1</strong></span><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"> pengenalan sensasi</span></span>
    </li>
</ul>
<p style="line-height:1.2;margin-bottom:0pt;margin-left:36pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Contoh: Mengenalkan bahwa itu adalah bunyi kebisingan kendaraan di jalanan.</span></span>
</p>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#4a86e8;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Ilustrasi: ilustrasi suara bising motor di halaman rumah.</span></span>
</p>
<ul style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Tahap&nbsp; 2</strong></span><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"> Interpretasi Informasi</span></span>
    </li>
</ul>
<p style="line-height:1.2;margin-bottom:0pt;margin-left:36pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Contoh: Memberitahukan anak bahwa itu adalah tanda bahwa kondisi di jalanan sedang ramai.</span></span>
</p>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#4a86e8;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Ilustrasi: orang tua dan anak berada di pinggir jalan dengan buble chat pada orang tua dengan tulisan “tandanya di jalan sedang ramai”.</span></span>
</p>
<ul style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Tahap 3</strong></span><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"> Respon Positif</span></span>
    </li>
</ul>
<p style="line-height:1.2;margin-bottom:0pt;margin-left:36pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Contoh: mengajarkan respon kepada anak,&nbsp;</span><i><span style="font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">"Apakah kamu ingin tetap duduk di sini atau ingin pergi ke ruangan yang lebih tenang?”</span></i></span>
</p>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#4a86e8;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Ilustrasi: orang tua dan anak berada di pinggir jalan dengan buble chat pada orang tua dengan tulisan&nbsp;</span><i><span style="font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">"Apakah kamu ingin tetap duduk di sini atau ingin pergi ke ruangan yang lebih tenang?”</span></i></span>
</p>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Catatan:</strong></span></span>
</p>
<ul style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Bagi anak dengan kondisi resiko tinggi simulasi diberikan mulai dari tahap 1.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Bagi anak dengan kondisi resiko sedang simulasi diberikan mulai dari tahap 2.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Bagi anak dengan kondisi resiko rendah simulasi diberikan adalah pada tahap 3.</span></span>
    </li>
</ul>`,
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
      description: `<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Pengenalan sensasi, mengerti makna informasi/ interpretasi, merespon informasi sensori "Apakah kamu ingin tetap duduk di sini atau ingin pergi ke ruangan yang lebih tenang?”</span></span>
</p>
<ul style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Tahap 1</strong></span><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"> pengenalan sensasi</span></span>
    </li>
</ul>
<p style="line-height:1.2;margin-bottom:0pt;margin-left:36pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Contoh: Mengenalkan bahwa itu adalah bunyi kebisingan kendaraan di jalanan.</span></span>
</p>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#4a86e8;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Ilustrasi: ilustrasi suara bising motor di halaman rumah.</span></span>
</p>
<ul style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Tahap&nbsp; 2</strong></span><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"> Interpretasi Informasi</span></span>
    </li>
</ul>
<p style="line-height:1.2;margin-bottom:0pt;margin-left:36pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Contoh: Memberitahukan anak bahwa itu adalah tanda bahwa kondisi di jalanan sedang ramai.</span></span>
</p>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#4a86e8;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Ilustrasi: orang tua dan anak berada di pinggir jalan dengan buble chat pada orang tua dengan tulisan “tandanya di jalan sedang ramai”.</span></span>
</p>
<ul style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Tahap 3</strong></span><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"> Respon Positif</span></span>
    </li>
</ul>
<p style="line-height:1.2;margin-bottom:0pt;margin-left:36pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Contoh: mengajarkan respon kepada anak,&nbsp;</span><i><span style="font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">"Apakah kamu ingin tetap duduk di sini atau ingin pergi ke ruangan yang lebih tenang?”</span></i></span>
</p>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#4a86e8;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Ilustrasi: orang tua dan anak berada di pinggir jalan dengan buble chat pada orang tua dengan tulisan&nbsp;</span><i><span style="font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">"Apakah kamu ingin tetap duduk di sini atau ingin pergi ke ruangan yang lebih tenang?”</span></i></span>
</p>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Catatan:</strong></span></span>
</p>
<ul style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Bagi anak dengan kondisi resiko tinggi simulasi diberikan mulai dari tahap 1.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Bagi anak dengan kondisi resiko sedang simulasi diberikan mulai dari tahap 2.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Bagi anak dengan kondisi resiko rendah simulasi diberikan adalah pada tahap 3.</span></span>
    </li>
</ul>`,
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
      description: `<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Pengenalan sensasi, mengerti makna informasi/ interpretasi, merespon informasi sensori "Apakah kamu ingin tetap duduk di sini atau ingin pergi ke ruangan yang lebih tenang?”</span></span>
</p>
<ul style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Tahap 1</strong></span><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"> pengenalan sensasi</span></span>
    </li>
</ul>
<p style="line-height:1.2;margin-bottom:0pt;margin-left:36pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Contoh: Mengenalkan bahwa itu adalah bunyi kebisingan kendaraan di jalanan.</span></span>
</p>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#4a86e8;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Ilustrasi: ilustrasi suara bising motor di halaman rumah.</span></span>
</p>
<ul style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Tahap&nbsp; 2</strong></span><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"> Interpretasi Informasi</span></span>
    </li>
</ul>
<p style="line-height:1.2;margin-bottom:0pt;margin-left:36pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Contoh: Memberitahukan anak bahwa itu adalah tanda bahwa kondisi di jalanan sedang ramai.</span></span>
</p>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#4a86e8;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Ilustrasi: orang tua dan anak berada di pinggir jalan dengan buble chat pada orang tua dengan tulisan “tandanya di jalan sedang ramai”.</span></span>
</p>
<ul style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Tahap 3</strong></span><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"> Respon Positif</span></span>
    </li>
</ul>
<p style="line-height:1.2;margin-bottom:0pt;margin-left:36pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Contoh: mengajarkan respon kepada anak,&nbsp;</span><i><span style="font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">"Apakah kamu ingin tetap duduk di sini atau ingin pergi ke ruangan yang lebih tenang?”</span></i></span>
</p>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#4a86e8;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Ilustrasi: orang tua dan anak berada di pinggir jalan dengan buble chat pada orang tua dengan tulisan&nbsp;</span><i><span style="font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">"Apakah kamu ingin tetap duduk di sini atau ingin pergi ke ruangan yang lebih tenang?”</span></i></span>
</p>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Catatan:</strong></span></span>
</p>
<ul style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Bagi anak dengan kondisi resiko tinggi simulasi diberikan mulai dari tahap 1.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Bagi anak dengan kondisi resiko sedang simulasi diberikan mulai dari tahap 2.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Bagi anak dengan kondisi resiko rendah simulasi diberikan adalah pada tahap 3.</span></span>
    </li>
</ul>`,
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
      description: `<p style="line-height:1.38;margin-bottom:12pt;margin-top:0pt;text-align:justify;" dir="ltr">
        <span style="background-color:#ffffff;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Terapi okupasi adalah bentuk terapi yang bertujuan untuk membantu individu mencapai kemandirian dalam kegiatan sehari-hari, atau aktivitas kehidupan sehari-hari (ADL -&nbsp;</span><i><span style="font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Activities of Daily Living</span></i><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">) Contoh: Anak berjalan di atas garis lurus yang ditandai di lantai atau&nbsp; berjalan pada permukaan yang bertekstur&nbsp;</span></span>
    </p>
    <p style="line-height:1.38;margin-bottom:12pt;margin-top:0pt;text-align:justify;" dir="ltr">
        <span style="background-color:#ffffff;color:#4a86e8;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Ilustrasi: Anak berjalan di atas garis lurus yang diberi tanda.</span></span>
    </p>
    <p style="line-height:1.38;margin-bottom:12pt;margin-top:0pt;text-align:justify;" dir="ltr">
        <span style="background-color:#ffffff;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Catatan:</strong></span></span>
    </p>
    <ul style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
        <li style="background-color:transparent;color:#ff0000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
            <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Bagi anak dengan kondisi resiko tinggi selama 3-5 kali per minggu.</span></span>
        </li>
        <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
            <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Bagi anak dengan kondisi resiko sedang selama 2-3 kali per minggu.</span></span>
        </li>
        <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
            <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Bagi anak dengan kondisi resiko tinggi selama 1-2 kali per minggu.</span></span>
        </li>
    </ul>`,
      icon: "walking",
      frequency: "Ya/Tidak",
    },
  });

  const recommendation14_tinggi = await prisma.recommendations.create({
    data: {
      is_main: true,
      assesment_number: 14,
      title: "Melatih Komunikasi Non-verbal",
      description: `<p style="line-height:1.2;margin-bottom:12pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><i><span style="font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Joint attention Symbolic Play Engagement and Regulation</strong></span></i><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong> (JASPER) Intervention.</strong></span></span>
</p>
<p style="line-height:1.2;margin-bottom:12pt;margin-left:23pt;margin-top:12pt;padding:0pt 0pt 0pt 18pt;text-indent:-18pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">1.</span></span><span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:6.999999999999999pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">&nbsp;</span><span class="Apple-tab-span" style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre;">	</span></span><span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Menarik Perhatian Anak dengan mainan yang disukainnya.&nbsp;</span><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>contoh : mainan yang berwarana&nbsp;</strong></span></span>
</p>
<p style="line-height:1.2;margin-bottom:12pt;margin-left:23pt;margin-top:12pt;padding:0pt 0pt 0pt 18pt;text-indent:-18pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">2.</span></span><span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:6.999999999999999pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">&nbsp;</span><span class="Apple-tab-span" style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre;">	</span></span><span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Pegang mainan di dekat wajah Anda sehingga anak perlu melihat ke arah wajah Anda untuk melihat mainannya.&nbsp;</span><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>contoh : Pegang bola di samping wajah denngan ekspresi senyum</strong></span></span>
</p>
<p style="line-height:1.2;margin-bottom:12pt;margin-left:23pt;margin-top:12pt;padding:0pt 0pt 0pt 18pt;text-indent:-18pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">3.</span></span><span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:6.999999999999999pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">&nbsp;</span><span class="Apple-tab-span" style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre;">	</span></span><span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Memperpanjang Durasi Kontak Mata</span></span>
</p>
<p style="line-height:1.2;margin-bottom:12pt;margin-left:23pt;margin-top:12pt;padding:0pt 0pt 0pt 18pt;text-indent:-18pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">4.</span></span><span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:6.999999999999999pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">&nbsp;</span><span class="Apple-tab-span" style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre;">	</span></span><span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Penguatan Positif: Berikan pujian dan mainan setelah kontak mata terjadi. Misalnya, "Hebat, kamu melihat mata saya lebih lama!"</span></span>
</p>
<p style="line-height:1.2;margin-bottom:12pt;margin-top:12pt;" dir="ltr">
    <span style="background-color:transparent;color:#4a86e8;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Ilustrasi: ada gambar orang tua lalu ada buble chat “Hebat, kamu melihat mata saya lebih lama!”</span></span>
</p>
<p style="line-height:1.2;margin-bottom:12pt;margin-left:23pt;margin-top:12pt;padding:0pt 0pt 0pt 18pt;text-indent:-18pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">5.</span></span><span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:6.999999999999999pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">&nbsp;</span><span class="Apple-tab-span" style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre;">	</span></span><span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Mengintegrasikan melibatkan kontak mata dalam Rutinitas Sehari-hari</span></span>
</p>
<p style="line-height:1.2;margin-bottom:12pt;margin-top:12pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Catatan:</strong></span></span>
</p>
<ul style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Bagi anak dengan kondisi resiko tinggi simulasi selama&nbsp;</span><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>30-45 menit</strong></span><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"> dan dilakukan&nbsp;</span><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>2-3 kali seminggu</strong></span><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Bagi anak dengan kondisi resiko sedang simulasi selama&nbsp;</span><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>25-30 menit</strong></span><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"> dan dilakukan&nbsp;</span><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>2-3 kali seminggu</strong></span><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Bagi anak dengan kondisi resiko rendah</span></span><span style="background-color:transparent;color:#000000;font-family:Arial,sans-serif;font-size:11pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">&nbsp;</span></span><span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">simulasi&nbsp; selama 10-15 menit dan dilakukan&nbsp;</span><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>2-3 kali seminggu</strong></span><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Pemberian durasi memperhatikan kondisi anak.</span></span>
    </li>
</ul>`,
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
      description: `<p style="line-height:1.2;margin-bottom:12pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><i><span style="font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Joint attention Symbolic Play Engagement and Regulation</strong></span></i><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong> (JASPER) Intervention.</strong></span></span>
</p>
<p style="line-height:1.2;margin-bottom:12pt;margin-left:23pt;margin-top:12pt;padding:0pt 0pt 0pt 18pt;text-indent:-18pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">1.</span></span><span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:6.999999999999999pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">&nbsp;</span><span class="Apple-tab-span" style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre;">	</span></span><span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Menarik Perhatian Anak dengan mainan yang disukainnya.&nbsp;</span><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>contoh : mainan yang berwarana&nbsp;</strong></span></span>
</p>
<p style="line-height:1.2;margin-bottom:12pt;margin-left:23pt;margin-top:12pt;padding:0pt 0pt 0pt 18pt;text-indent:-18pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">2.</span></span><span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:6.999999999999999pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">&nbsp;</span><span class="Apple-tab-span" style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre;">	</span></span><span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Pegang mainan di dekat wajah Anda sehingga anak perlu melihat ke arah wajah Anda untuk melihat mainannya.&nbsp;</span><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>contoh : Pegang bola di samping wajah denngan ekspresi senyum</strong></span></span>
</p>
<p style="line-height:1.2;margin-bottom:12pt;margin-left:23pt;margin-top:12pt;padding:0pt 0pt 0pt 18pt;text-indent:-18pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">3.</span></span><span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:6.999999999999999pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">&nbsp;</span><span class="Apple-tab-span" style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre;">	</span></span><span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Memperpanjang Durasi Kontak Mata</span></span>
</p>
<p style="line-height:1.2;margin-bottom:12pt;margin-left:23pt;margin-top:12pt;padding:0pt 0pt 0pt 18pt;text-indent:-18pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">4.</span></span><span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:6.999999999999999pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">&nbsp;</span><span class="Apple-tab-span" style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre;">	</span></span><span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Penguatan Positif: Berikan pujian dan mainan setelah kontak mata terjadi. Misalnya, "Hebat, kamu melihat mata saya lebih lama!"</span></span>
</p>
<p style="line-height:1.2;margin-bottom:12pt;margin-top:12pt;" dir="ltr">
    <span style="background-color:transparent;color:#4a86e8;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Ilustrasi: ada gambar orang tua lalu ada buble chat “Hebat, kamu melihat mata saya lebih lama!”</span></span>
</p>
<p style="line-height:1.2;margin-bottom:12pt;margin-left:23pt;margin-top:12pt;padding:0pt 0pt 0pt 18pt;text-indent:-18pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">5.</span></span><span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:6.999999999999999pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">&nbsp;</span><span class="Apple-tab-span" style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre;">	</span></span><span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Mengintegrasikan melibatkan kontak mata dalam Rutinitas Sehari-hari</span></span>
</p>
<p style="line-height:1.2;margin-bottom:12pt;margin-top:12pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Catatan:</strong></span></span>
</p>
<ul style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Bagi anak dengan kondisi resiko tinggi simulasi selama&nbsp;</span><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>30-45 menit</strong></span><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"> dan dilakukan&nbsp;</span><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>2-3 kali seminggu</strong></span><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Bagi anak dengan kondisi resiko sedang simulasi selama&nbsp;</span><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>25-30 menit</strong></span><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"> dan dilakukan&nbsp;</span><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>2-3 kali seminggu</strong></span><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Bagi anak dengan kondisi resiko rendah</span></span><span style="background-color:transparent;color:#000000;font-family:Arial,sans-serif;font-size:11pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">&nbsp;</span></span><span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">simulasi&nbsp; selama 10-15 menit dan dilakukan&nbsp;</span><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>2-3 kali seminggu</strong></span><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Pemberian durasi memperhatikan kondisi anak.</span></span>
    </li>
</ul>`,
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
      description: `<p style="line-height:1.2;margin-bottom:12pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><i><span style="font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Joint attention Symbolic Play Engagement and Regulation</strong></span></i><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong> (JASPER) Intervention.</strong></span></span>
</p>
<p style="line-height:1.2;margin-bottom:12pt;margin-left:23pt;margin-top:12pt;padding:0pt 0pt 0pt 18pt;text-indent:-18pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">1.</span></span><span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:6.999999999999999pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">&nbsp;</span><span class="Apple-tab-span" style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre;">	</span></span><span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Menarik Perhatian Anak dengan mainan yang disukainnya.&nbsp;</span><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>contoh : mainan yang berwarana&nbsp;</strong></span></span>
</p>
<p style="line-height:1.2;margin-bottom:12pt;margin-left:23pt;margin-top:12pt;padding:0pt 0pt 0pt 18pt;text-indent:-18pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">2.</span></span><span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:6.999999999999999pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">&nbsp;</span><span class="Apple-tab-span" style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre;">	</span></span><span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Pegang mainan di dekat wajah Anda sehingga anak perlu melihat ke arah wajah Anda untuk melihat mainannya.&nbsp;</span><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>contoh : Pegang bola di samping wajah denngan ekspresi senyum</strong></span></span>
</p>
<p style="line-height:1.2;margin-bottom:12pt;margin-left:23pt;margin-top:12pt;padding:0pt 0pt 0pt 18pt;text-indent:-18pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">3.</span></span><span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:6.999999999999999pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">&nbsp;</span><span class="Apple-tab-span" style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre;">	</span></span><span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Memperpanjang Durasi Kontak Mata</span></span>
</p>
<p style="line-height:1.2;margin-bottom:12pt;margin-left:23pt;margin-top:12pt;padding:0pt 0pt 0pt 18pt;text-indent:-18pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">4.</span></span><span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:6.999999999999999pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">&nbsp;</span><span class="Apple-tab-span" style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre;">	</span></span><span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Penguatan Positif: Berikan pujian dan mainan setelah kontak mata terjadi. Misalnya, "Hebat, kamu melihat mata saya lebih lama!"</span></span>
</p>
<p style="line-height:1.2;margin-bottom:12pt;margin-top:12pt;" dir="ltr">
    <span style="background-color:transparent;color:#4a86e8;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Ilustrasi: ada gambar orang tua lalu ada buble chat “Hebat, kamu melihat mata saya lebih lama!”</span></span>
</p>
<p style="line-height:1.2;margin-bottom:12pt;margin-left:23pt;margin-top:12pt;padding:0pt 0pt 0pt 18pt;text-indent:-18pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">5.</span></span><span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:6.999999999999999pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">&nbsp;</span><span class="Apple-tab-span" style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre;">	</span></span><span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Mengintegrasikan melibatkan kontak mata dalam Rutinitas Sehari-hari</span></span>
</p>
<p style="line-height:1.2;margin-bottom:12pt;margin-top:12pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Catatan:</strong></span></span>
</p>
<ul style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Bagi anak dengan kondisi resiko tinggi simulasi selama&nbsp;</span><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>30-45 menit</strong></span><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"> dan dilakukan&nbsp;</span><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>2-3 kali seminggu</strong></span><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Bagi anak dengan kondisi resiko sedang simulasi selama&nbsp;</span><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>25-30 menit</strong></span><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"> dan dilakukan&nbsp;</span><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>2-3 kali seminggu</strong></span><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Bagi anak dengan kondisi resiko rendah</span></span><span style="background-color:transparent;color:#000000;font-family:Arial,sans-serif;font-size:11pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">&nbsp;</span></span><span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">simulasi&nbsp; selama 10-15 menit dan dilakukan&nbsp;</span><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>2-3 kali seminggu</strong></span><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Pemberian durasi memperhatikan kondisi anak.</span></span>
    </li>
</ul>`,
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
      description: `<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>APPLYING RECIPROCAL IMITATION TRAINING</strong></span></span>
</p>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Reciprocal Imitation Training&nbsp; adalah intervensi berbasis permainan yang bertujuan untuk meningkatkan keterampilan imitasi dan interaksi sosial anak-anak dengan autisme. RIT berfokus pada mengajarkan anak-anak untuk meniru perilaku dan tindakan orang dewasa secara spontan dan natural saat bermain.&nbsp;</span></span>
</p>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Contoh:</span></span>
</p>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Lakukanlah aktivitas bersama anak, kemudian lakukan kegiatan seperti menyusun balok menjadi bentuk bertingkat, setelah itu berikan anak instruksi untuk melakukan hal yang sama.</span></span>
</p>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#4a86e8;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Ilustrasi: Sama seperti contoh</span></span>
</p>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Catatan:</strong></span></span>
</p>
<ul style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Berikan anak bantuan untuk meniru kegiatan yang kita lakukan, misalnya dengan cara memberikan intruksi yang tegas dan berulang atau membantu membimbing anak.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Konsisten dalam melakukan pengulangan aktivitas sampai anak terbiasa meniru hal yang kita lakukan.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Variasikan kegiatan yang dilakukan, seperti melakukan aktivitas bermain lainnya (bermain boneka, dll).</span></span>
    </li>
</ul>`,
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
      description: `<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>APPLYING RECIPROCAL IMITATION TRAINING</strong></span></span>
</p>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Reciprocal Imitation Training&nbsp; adalah intervensi berbasis permainan yang bertujuan untuk meningkatkan keterampilan imitasi dan interaksi sosial anak-anak dengan autisme. RIT berfokus pada mengajarkan anak-anak untuk meniru perilaku dan tindakan orang dewasa secara spontan dan natural saat bermain.&nbsp;</span></span>
</p>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Contoh:</span></span>
</p>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Lakukanlah aktivitas bersama anak, kemudian lakukan kegiatan seperti menyusun balok menjadi bentuk bertingkat, setelah itu berikan anak instruksi untuk melakukan hal yang sama.</span></span>
</p>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#4a86e8;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Ilustrasi: Sama seperti contoh</span></span>
</p>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Catatan:</strong></span></span>
</p>
<ul style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Berikan anak bantuan untuk meniru kegiatan yang kita lakukan, misalnya dengan cara memberikan intruksi yang tegas dan berulang atau membantu membimbing anak.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Konsisten dalam melakukan pengulangan aktivitas sampai anak terbiasa meniru hal yang kita lakukan.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Variasikan kegiatan yang dilakukan, seperti melakukan aktivitas bermain lainnya (bermain boneka, dll).</span></span>
    </li>
</ul>`,
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
      description: `<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>APPLYING RECIPROCAL IMITATION TRAINING</strong></span></span>
</p>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Reciprocal Imitation Training&nbsp; adalah intervensi berbasis permainan yang bertujuan untuk meningkatkan keterampilan imitasi dan interaksi sosial anak-anak dengan autisme. RIT berfokus pada mengajarkan anak-anak untuk meniru perilaku dan tindakan orang dewasa secara spontan dan natural saat bermain.&nbsp;</span></span>
</p>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Contoh:</span></span>
</p>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Lakukanlah aktivitas bersama anak, kemudian lakukan kegiatan seperti menyusun balok menjadi bentuk bertingkat, setelah itu berikan anak instruksi untuk melakukan hal yang sama.</span></span>
</p>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#4a86e8;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Ilustrasi: Sama seperti contoh</span></span>
</p>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Catatan:</strong></span></span>
</p>
<ul style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Berikan anak bantuan untuk meniru kegiatan yang kita lakukan, misalnya dengan cara memberikan intruksi yang tegas dan berulang atau membantu membimbing anak.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Konsisten dalam melakukan pengulangan aktivitas sampai anak terbiasa meniru hal yang kita lakukan.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Variasikan kegiatan yang dilakukan, seperti melakukan aktivitas bermain lainnya (bermain boneka, dll).</span></span>
    </li>
</ul>`,
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
      description: `<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><i><span style="font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Theraplay</strong></span></i><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong> untuk Meningkatkan&nbsp;</strong></span><i><span style="font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Join Attention</strong></span></i></span>
</p>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><i><span style="font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Theraplay</span></i><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"> adalah pendekatan terapi berbasis permainan yang dirancang untuk meningkatkan&nbsp;&nbsp;</span><i><span style="font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">joint attention&nbsp;</span></i><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">(perhatian bersama) pada anak, dengan menggunakan aktivitas yang melibatkan kontak mata, interaksi sosial, dan koordinasi.</span></span>
</p>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Contoh:</span></span>
</p>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Lakukan aktivitas bersama anak yang melibatkan kontak mata, interaksi sosial, dan kegiatan yang memerlukan koordinasi seperti permainan Ciluk Ba.</span></span>
</p>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#4a86e8;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Ilustrasi: anak sedang bermain cilukba</span></span>
</p>
<p>
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Durasi&nbsp;</strong></span><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">yang disarankan dalam melakukan terapi ini adalah satu setengah bulan, dimana dalam satu minggu melakukan 2 sesi di hari yang berbeda (minal 14 kali sesi) hingga anak memiliki keterampilan&nbsp;</span><i><span style="font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">join attention.</span></i></span>
</p>`,
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
      description: `<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><i><span style="font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Theraplay</strong></span></i><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong> untuk Meningkatkan&nbsp;</strong></span><i><span style="font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Join Attention</strong></span></i></span>
</p>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><i><span style="font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Theraplay</span></i><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"> adalah pendekatan terapi berbasis permainan yang dirancang untuk meningkatkan&nbsp;&nbsp;</span><i><span style="font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">joint attention&nbsp;</span></i><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">(perhatian bersama) pada anak, dengan menggunakan aktivitas yang melibatkan kontak mata, interaksi sosial, dan koordinasi.</span></span>
</p>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Contoh:</span></span>
</p>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Lakukan aktivitas bersama anak yang melibatkan kontak mata, interaksi sosial, dan kegiatan yang memerlukan koordinasi seperti permainan Ciluk Ba.</span></span>
</p>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#4a86e8;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Ilustrasi: anak sedang bermain cilukba</span></span>
</p>
<p>
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Durasi&nbsp;</strong></span><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">yang disarankan dalam melakukan terapi ini adalah satu setengah bulan, dimana dalam satu minggu melakukan 2 sesi di hari yang berbeda (minal 14 kali sesi) hingga anak memiliki keterampilan&nbsp;</span><i><span style="font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">join attention.</span></i></span>
</p>`,
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
      description: `<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><i><span style="font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Theraplay</strong></span></i><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong> untuk Meningkatkan&nbsp;</strong></span><i><span style="font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Join Attention</strong></span></i></span>
</p>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><i><span style="font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Theraplay</span></i><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"> adalah pendekatan terapi berbasis permainan yang dirancang untuk meningkatkan&nbsp;&nbsp;</span><i><span style="font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">joint attention&nbsp;</span></i><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">(perhatian bersama) pada anak, dengan menggunakan aktivitas yang melibatkan kontak mata, interaksi sosial, dan koordinasi.</span></span>
</p>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Contoh:</span></span>
</p>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Lakukan aktivitas bersama anak yang melibatkan kontak mata, interaksi sosial, dan kegiatan yang memerlukan koordinasi seperti permainan Ciluk Ba.</span></span>
</p>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#4a86e8;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Ilustrasi: anak sedang bermain cilukba</span></span>
</p>
<p>
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Durasi&nbsp;</strong></span><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">yang disarankan dalam melakukan terapi ini adalah satu setengah bulan, dimana dalam satu minggu melakukan 2 sesi di hari yang berbeda (minal 14 kali sesi) hingga anak memiliki keterampilan&nbsp;</span><i><span style="font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">join attention.</span></i></span>
</p>`,
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
      description: `<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Menggunakan kartu kata bergambar untuk meningkatkan kemampuan komunikasi verbal dan non verbal anak.</span></span>
</p>
<ol style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Perkenalkan kartu yang berisi kosa kata beserta gambar ilustrasinya, contoh gambar melambaikan tangan untuk kata “Halo”.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Mintalah anak menyebutkan kata yang ada dalam kartu bila perlu melakukan gestur seperti pada gambar.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Ajarkan anak menggunakan kartu tersebut untuk meminta sesuatu (dengan bahasa verbal dan non verbal).</span></span>
    </li>
</ol>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#4a86e8;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Ilustrasi: Anak menunjukkan gambar mobil kemudian ditukar dengan mobil oleh orang tua.</span></span>
</p>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Catatan:</strong></span></span>
</p>
<ul style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Pada anak dengan kondisi resiko tinggi (anak tidak menunjukkan secara verbal dan non verbal) lakukan aktivitas mulai dari point 1, kemudian berlanjut kepada aktivitas point 2 dan 3 apabila sudah mengalami peningkatan.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Pada anak dengan kondisi resiko sedang (anak melakukan komunikasi secara non verbal dengan menatap anda) lakukan aktivitas dimulai dari point nomor 2.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Pada anak dengan kondisi resiko rendah (anak menunjukkan bahasa verbal dengan berceloteh) lakukan aktivitas dengan aktivitas pada point 3.</span></span>
    </li>
</ul>`,
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
      description: `<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Menggunakan kartu kata bergambar untuk meningkatkan kemampuan komunikasi verbal dan non verbal anak.</span></span>
</p>
<ol style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Perkenalkan kartu yang berisi kosa kata beserta gambar ilustrasinya, contoh gambar melambaikan tangan untuk kata “Halo”.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Mintalah anak menyebutkan kata yang ada dalam kartu bila perlu melakukan gestur seperti pada gambar.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Ajarkan anak menggunakan kartu tersebut untuk meminta sesuatu (dengan bahasa verbal dan non verbal).</span></span>
    </li>
</ol>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#4a86e8;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Ilustrasi: Anak menunjukkan gambar mobil kemudian ditukar dengan mobil oleh orang tua.</span></span>
</p>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Catatan:</strong></span></span>
</p>
<ul style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Pada anak dengan kondisi resiko tinggi (anak tidak menunjukkan secara verbal dan non verbal) lakukan aktivitas mulai dari point 1, kemudian berlanjut kepada aktivitas point 2 dan 3 apabila sudah mengalami peningkatan.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Pada anak dengan kondisi resiko sedang (anak melakukan komunikasi secara non verbal dengan menatap anda) lakukan aktivitas dimulai dari point nomor 2.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Pada anak dengan kondisi resiko rendah (anak menunjukkan bahasa verbal dengan berceloteh) lakukan aktivitas dengan aktivitas pada point 3.</span></span>
    </li>
</ul>`,
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
      description: `<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Menggunakan kartu kata bergambar untuk meningkatkan kemampuan komunikasi verbal dan non verbal anak.</span></span>
</p>
<ol style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Perkenalkan kartu yang berisi kosa kata beserta gambar ilustrasinya, contoh gambar melambaikan tangan untuk kata “Halo”.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Mintalah anak menyebutkan kata yang ada dalam kartu bila perlu melakukan gestur seperti pada gambar.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Ajarkan anak menggunakan kartu tersebut untuk meminta sesuatu (dengan bahasa verbal dan non verbal).</span></span>
    </li>
</ol>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#4a86e8;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Ilustrasi: Anak menunjukkan gambar mobil kemudian ditukar dengan mobil oleh orang tua.</span></span>
</p>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Catatan:</strong></span></span>
</p>
<ul style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Pada anak dengan kondisi resiko tinggi (anak tidak menunjukkan secara verbal dan non verbal) lakukan aktivitas mulai dari point 1, kemudian berlanjut kepada aktivitas point 2 dan 3 apabila sudah mengalami peningkatan.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Pada anak dengan kondisi resiko sedang (anak melakukan komunikasi secara non verbal dengan menatap anda) lakukan aktivitas dimulai dari point nomor 2.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Pada anak dengan kondisi resiko rendah (anak menunjukkan bahasa verbal dengan berceloteh) lakukan aktivitas dengan aktivitas pada point 3.</span></span>
    </li>
</ul>`,
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
      description: `<ol style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Memberikan instruksi kepada anak dengan perintah yang jelas dan tegas, seperti “Buka Sepatumu.”</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Berikan petunjuk non verbal untuk membantu anak memahami intruksi yang diberikan, seperti memberikan isyarat dengan gerakan ketika memberi instruksi untuk membuka sepatu.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Jika anak tidak mengerti instruksi yang diberikan, berikan bantuan berupa contoh bagaimana cara merespon instruksi tersebut. Misalnya dengan memberi contoh cara melepas sepatu atau membantu anak melepaskan sepatunya.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Konsisten dalam melatih anak mendengarkan dan merespon instruksi yang diberikan hingga anak terbiasa dan tidak lagi memerlukan bantuan.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Berikan anak pujian ketika ia mendengarkan dan memberikan respon positif akan intruksi yang diberikan.</span></span>
    </li>
</ol>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#4a86e8;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Ilustrasi orang tua dengan buble chat “buka sepatumu” lalu anak membuka sepatu.</span></span><span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">&nbsp;</span></span>
</p>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Catatan:</strong></span></span>
</p>
<ul style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Konsisten dalam melatih anak mendengarkan dan merespon intruksi hingga anak terbiasa memberikan respon positif.</span></span>
    </li>
</ul>`,
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
      description: `<ol style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Memberikan instruksi kepada anak dengan perintah yang jelas dan tegas, seperti “Buka Sepatumu.”</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Berikan petunjuk non verbal untuk membantu anak memahami intruksi yang diberikan, seperti memberikan isyarat dengan gerakan ketika memberi instruksi untuk membuka sepatu.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Jika anak tidak mengerti instruksi yang diberikan, berikan bantuan berupa contoh bagaimana cara merespon instruksi tersebut. Misalnya dengan memberi contoh cara melepas sepatu atau membantu anak melepaskan sepatunya.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Konsisten dalam melatih anak mendengarkan dan merespon instruksi yang diberikan hingga anak terbiasa dan tidak lagi memerlukan bantuan.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Berikan anak pujian ketika ia mendengarkan dan memberikan respon positif akan intruksi yang diberikan.</span></span>
    </li>
</ol>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#4a86e8;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Ilustrasi orang tua dengan buble chat “buka sepatumu” lalu anak membuka sepatu.</span></span><span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">&nbsp;</span></span>
</p>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Catatan:</strong></span></span>
</p>
<ul style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Konsisten dalam melatih anak mendengarkan dan merespon intruksi hingga anak terbiasa memberikan respon positif.</span></span>
    </li>
</ul>`,
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
      description: `<ol style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Memberikan instruksi kepada anak dengan perintah yang jelas dan tegas, seperti “Buka Sepatumu.”</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Berikan petunjuk non verbal untuk membantu anak memahami intruksi yang diberikan, seperti memberikan isyarat dengan gerakan ketika memberi instruksi untuk membuka sepatu.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Jika anak tidak mengerti instruksi yang diberikan, berikan bantuan berupa contoh bagaimana cara merespon instruksi tersebut. Misalnya dengan memberi contoh cara melepas sepatu atau membantu anak melepaskan sepatunya.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Konsisten dalam melatih anak mendengarkan dan merespon instruksi yang diberikan hingga anak terbiasa dan tidak lagi memerlukan bantuan.</span></span>
    </li>
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Berikan anak pujian ketika ia mendengarkan dan memberikan respon positif akan intruksi yang diberikan.</span></span>
    </li>
</ol>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#4a86e8;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Ilustrasi orang tua dengan buble chat “buka sepatumu” lalu anak membuka sepatu.</span></span><span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">&nbsp;</span></span>
</p>
<p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Catatan:</strong></span></span>
</p>
<ul style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
        <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Konsisten dalam melatih anak mendengarkan dan merespon intruksi hingga anak terbiasa memberikan respon positif.</span></span>
    </li>
</ul>`,
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
      description: `<ol>
        <li>
            <p style="line-height:1.2;margin-bottom:12pt;margin-top:0pt;" dir="ltr">
                <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Metode&nbsp;</strong></span><i><span style="font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Social Stories</strong></span></i><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong> (cerita sosial)&nbsp;</strong></span><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">adalah alat yang efektif untuk membantu anak-anak dengan autisme memahami dan merespons situasi sosial dengan lebih baik.</span></span>
            </p>
        </li>
        <li>
            <p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
                <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Contoh: Buatlah cerita yang menceritakan latar dimana ketika ada orang lain yang mendekati anak, kemudian ajari anak untuk memberi respon dengan tersenyum kemudian mengucapkan kata “Hai” atau “Halo” serta berikan arahan untuk anak mendengarkan apa yang orang lain ingin katakan, atau mengajari anak mengucapkan “maaf saya tidak ingin diganggu” apabila anak merasa tidak nyaman dengan kehadiran orang tersebut.</span></span>
            </p>
        </li>
        <li>
            <p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
                <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">ilustrasi: anak menatap orang tua dengan ekspresi takut disertai dengan buble karakter menyeramkan.</span></span>
            </p>
            <p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
                <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>Catatan:</strong></span></span>
            </p>
        </li>
        <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
            <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Berikan anak sosial stories apabila ada perilaku yang harus diajarkan kepada anak.</span></span>
        </li>
        <li style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1">
            <p>
                <span style="background-color:transparent;color:#000000;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Ulangi cerita sampai anak mengerti dan mampu mempraktikkan perilaku dalam cerita tersebut.</span></span>
            </p>
            <p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
                <span style="background-color:transparent;color:#4a86e8;font-family:'Times New Roman',serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Ilustrasi: gambar anak dan orang tua sedang bercerita</span></span>
            </p>
        </li>
    </ol>`,
      icon: "face",
      frequency: "Ya/Tidak",
    },
  });

  const recommendation20_tinggi = await prisma.recommendations.create({
    data: {
      is_main: true,
      assesment_number: 20,
      title: "Melatih Perkembangan Sensorik Taktil",
      description: `<p>
        Mengajarkan anak untuk menyukai aktivitas bergerak melalui permainan dan aktivitas fisik.
    </p>`,
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
