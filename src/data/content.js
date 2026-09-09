/* ============================================================
   SATU-SATUNYA FILE YANG PERLU KAMU EDIT UNTUK GANTI ISI WEBSITE.
   Semua teks, proyek, dan link diambil dari sini.

   Data di bawah disusun mengikuti CV "Aaron Risang Panji Bharata".
   ============================================================ */

export const profile = {
  name: 'Aaron',
  fullName: 'Aaron Risang Panji Bharata',
  initials: 'AR',
  role: 'Software Developer',

  // Sengaja hanya sampai tingkat kecamatan. Alamat lengkap yang ada di CV
  // (nama jalan, RT/RW) tidak dipasang di situs publik.
  location: 'Kalasan, Sleman, Yogyakarta',

  // Foto utama di hero. Taruh filenya di folder public/ lalu tulis path-nya
  // diawali garis miring. Kalau dikosongkan atau filenya belum ada, otomatis
  // diganti inisial bergradasi — jadi tampilannya tidak pernah rusak.
  photo: '/aaron.jpg',

  birthDate: '19 Juni 2004',

  available: true,
  availableText: 'Terbuka untuk magang, freelance & kolaborasi',

  // Peran yang diketik bergantian di hero
  roles: [
    'Mahasiswa Informatika — Atma Jaya Yogyakarta',
    'Software Developer: website & aplikasi',
    'Eks-magang Divisi STI, PLN Pusat',
    'Terbiasa memimpin tim lintas bidang',
  ],

  tagline: ['Membangun web,', 'menggerakkan tim.'],

  intro:
    'Mahasiswa Informatika Universitas Atma Jaya Yogyakarta. Enam bulan terakhir saya magang di ' +
    'Divisi Sistem Teknologi Informasi PT PLN (Persero) Pusat, membangun sistem pemantauan proyek ' +
    'dan menyusun rancangan dashboard berbasis AI. Di luar itu, saya terbiasa memimpin tim lintas ' +
    'bidang dan bekerja di bawah tenggat yang ketat.',

  email: 'panjiaaron@gmail.com',

  // Nomor WhatsApp ditulis dalam format internasional tanpa tanda apa pun,
  // karena itu yang diminta oleh tautan wa.me. Yang tampil ke pengunjung
  // adalah `display`.
  whatsapp: {
    number: '6281228332267',
    display: '+62 812-2833-2267',
  },

  socials: [
    { label: 'GitHub', href: 'https://github.com/OhMyAaron', icon: 'github' },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/aaron-panji-80a5a4313/',
      icon: 'linkedin',
    },
    { label: 'Instagram', href: 'https://www.instagram.com/aaronpanji4', icon: 'instagram' },
    { label: 'YouTube', href: 'https://www.youtube.com/@aaronpanji0187', icon: 'youtube' },
    { label: 'WhatsApp', href: 'https://wa.me/6281228332267', icon: 'whatsapp' },
    { label: 'Email', href: 'mailto:panjiaaron@gmail.com', icon: 'mail' },
  ],

  // Taruh file CV di folder /public lalu sesuaikan path-nya
  cv: '/cv-aaron.pdf',
}

/* Ringkasan untuk berkas CV (nada formal). Dipakai oleh `npm run cv`.
   Teks di website memakai `profile.intro` yang gayanya lebih santai. */
export const cvSummary =
  'Mahasiswa Informatika Universitas Atma Jaya Yogyakarta dengan ketertarikan pada software ' +
  'development, khususnya pengembangan website dan aplikasi. Berpengalaman magang selama enam ' +
  'bulan di Divisi Sistem Teknologi Informasi PT PLN (Persero) Pusat, mengembangkan sistem ' +
  'pemantauan proyek dan menyusun rancangan dashboard berbasis AI. Terbiasa memimpin tim lintas ' +
  'bidang, bekerja di bawah tenggat yang ketat, serta antusias mempelajari hal baru untuk ' +
  'mendukung pengembangan profesional.'

/* Data diri ringkas — tampil sebagai daftar di bagian "Tentang" */
export const facts = [
  { label: 'Nama lengkap', value: profile.fullName },
  { label: 'Tanggal lahir', value: profile.birthDate },
  { label: 'Domisili', value: profile.location },
  { label: 'Kuliah', value: 'Informatika — Universitas Atma Jaya Yogyakarta' },
  { label: 'WhatsApp', value: profile.whatsapp.display },
  { label: 'Email', value: profile.email },
]

/* Angka-angka ini semuanya bisa ditelusuri ke CV */
export const stats = [
  { value: 6, suffix: '', label: 'Bulan magang di PLN Pusat' },
  { value: 55, suffix: '', label: 'Anggota senat dipimpin' },
  { value: 93, suffix: '', label: 'Orang didampingi' },
  { value: 7, suffix: '', label: 'Peran organisasi' },
]

export const about = [
  'Halo, saya **Aaron** — mahasiswa **Informatika Universitas Atma Jaya Yogyakarta** angkatan 2022. ' +
    'Ketertarikan saya ada di pengembangan perangkat lunak, terutama website dan aplikasi.',
  'Pengalaman terbesar saya sejauh ini adalah **magang di Divisi Sistem Teknologi Informasi ' +
    'PT PLN (Persero) Pusat**, bagian Manajemen Proyek. Di sana saya membangun sistem untuk ' +
    'memantau progres proyek yang sedang berjalan, sekaligus menyusun rancangan pengembangan ' +
    'dashboard berbasis AI.',
  'Di luar itu, sebagian besar waktu saya habis di organisasi dan kegiatan kampus. Saya pernah ' +
    'memimpin **55 anggota Senat Mahasiswa** Fakultas Teknologi Industri selama satu periode, ' +
    'menjadi **asisten dosen** untuk dua mata kuliah, dan mendampingi **13 peserta KKN** di ' +
    'Ketapang, Kalimantan Barat.',
  'Dari sana saya belajar hal yang tidak diajarkan di dalam editor kode: cara menjelaskan sesuatu ' +
    'sampai orang benar-benar paham, cara menjaga tenggat, dan cara tetap tenang ketika semuanya ' +
    'berjalan bersamaan. Kalau ada ide yang ingin kamu wujudkan, saya senang diajak ngobrol.',
]

/* Berjalan otomatis di pita marquee */
export const marqueeItems = [
  'Python',
  'JavaScript',
  'PHP',
  'Java',
  'C',
  'SQL',
  'HTML & CSS',
  'Laravel',
  'React',
  'GitHub',
  'Figma',
  'Postman',
]

export const stackGroups = [
  {
    icon: 'code',
    title: 'Bahasa Pemrograman',
    items: ['Python', 'JavaScript', 'PHP', 'Java', 'C', 'SQL', 'HTML & CSS'],
  },
  {
    icon: 'layout',
    title: 'Pengembangan Web',
    items: ['Laravel', 'React', 'REST API', 'MySQL', 'Blade', 'Vite'],
  },
  {
    icon: 'tool',
    title: 'Tools',
    items: [
      'GitHub',
      'Visual Studio Code',
      'Postman',
      'Laragon',
      'Android Studio',
      'ProjectLibre',
      'Microsoft Office',
    ],
  },
  {
    icon: 'palette',
    title: 'Desain & Media',
    items: ['Figma', 'Canva', 'Adobe Photoshop', 'Adobe Premiere Pro'],
  },
  {
    icon: 'users',
    title: 'Soft Skill',
    items: ['Bekerja sama dalam tim', 'Public speaking', 'Berpikir kritis', 'Manajemen waktu'],
  },
  {
    icon: 'globe',
    title: 'Bahasa',
    items: ['Bahasa Indonesia', 'Bahasa Inggris'],
  },
]

/* --- PROYEK ---------------------------------------------------------------
   Hanya berisi proyek yang benar-benar ada. Tambahkan sendiri dengan menyalin
   salah satu blok di bawah.

   image    : letakkan screenshot di /public/projects/nama.png lalu isi path-nya.
              Kalau dikosongkan, otomatis dipakai placeholder inisial bergradasi.
   href     : link demo atau repo. Biarkan '#' kalau belum ada.
   featured : true membuat kartunya melebar 2 kolom di layar besar.
--------------------------------------------------------------------------- */
export const projects = [
  {
    title: 'Sistem Monitoring Proyek',
    category: 'Fullstack',
    year: '2026',
    desc:
      'Dibangun selama magang di Divisi Sistem Teknologi Informasi PT PLN (Persero) Pusat. ' +
      'Sistem untuk memantau progres proyek yang sedang berjalan agar statusnya terlihat dalam ' +
      'satu tampilan, sekaligus rancangan pengembangan dashboard berbasis AI.',
    tags: ['React', 'Laravel', 'MySQL', 'Dashboard'],
    href: '#',
    image: '',
  },
  {
    title: 'Karinakas — Sistem Informasi',
    category: 'Fullstack',
    year: '2025',
    desc:
      'Proyek tugas akhir: REST API Laravel dengan dashboard admin React. Mencakup autentikasi ' +
      'berbasis peran, manajemen data master, serta notifikasi email otomatis.',
    tags: ['Laravel', 'React', 'MySQL', 'REST API'],
    href: '#',
    image: '',
    featured: true,
  },
  {
    title: 'Website Portofolio Ini',
    category: 'Frontend',
    year: '2026',
    desc:
      'Situs statis satu halaman tanpa backend. Seluruh animasinya ditulis manual dengan CSS dan ' +
      'requestAnimationFrame, tanpa library animasi, agar tetap ringan dibuka.',
    tags: ['React', 'Vite', 'CSS'],
    href: 'https://github.com/OhMyAaron',
    image: '',
  },

  /* ===== SALIN BLOK DI BAWAH INI UNTUK MENAMBAH PROYEK BARU =====
     Hapus tanda komentar di awal dan akhir, lalu isi datanya.

  {
    title: 'Nama Proyek',
    category: 'Fullstack',   // jadi tombol filter. Pakai ulang yang sudah ada
                             // (Fullstack / Frontend) agar filternya tidak
                             // beranak-pinak, kecuali memang beda jenis.
    year: '2026',
    desc:
      'Satu sampai dua kalimat. Tulis masalah yang diselesaikan lalu hasilnya, ' +
      'bukan sekadar daftar fitur. Contoh: "Data proyek tersebar di banyak file ' +
      'Excel, jadi dibuat satu tampilan yang menarik semuanya secara otomatis."',
    tags: ['React', 'Laravel', 'MySQL'],   // teknologi, bukan istilah umum
    href: '#',      // link repo atau demo. Biarkan '#' kalau belum/tidak boleh ada
    image: '',      // '/projects/nama-file.png' kalau punya screenshot
    // featured: true,   // aktifkan kalau ingin kartunya melebar dua kolom
  },

  ===== batas salinan ===== */
]

/* --- RIWAYAT --------------------------------------------------------------
   Ditampilkan sebagai garis waktu dengan tab. Nama kunci di bawah otomatis
   jadi label tab-nya, jadi untuk menambah kategori cukup tambah kunci baru.
   Urutannya dari yang paling baru.
--------------------------------------------------------------------------- */
export const timeline = {
  Kerja: [
    {
      period: 'Feb 2026 — Agu 2026',
      role: 'Asisten Dosen Pendamping Lapangan',
      where: 'Kuliah Kerja Nyata Luar Jawa UAJY — Ketapang, Kalimantan Barat',
      points: [
        'Mendampingi 13 peserta dalam 4 kelompok, sejak masa persiapan hingga pelaksanaan di lokasi.',
        'Menjadi penghubung antara peserta, warga setempat, dan pengurus kampus selama kegiatan berlangsung.',
      ],
    },
    {
      period: 'Agu 2025 — Feb 2026',
      role: 'Magang — Divisi Sistem Teknologi Informasi',
      where: 'PT PLN (Persero) Pusat',
      points: [
        'Ditempatkan di bagian Manajemen Proyek, membantu pemantauan proyek-proyek yang sedang berjalan.',
        'Mengembangkan sistem untuk memonitor progres proyek yang sedang berlangsung.',
        'Menyusun rancangan pengembangan dashboard berbasis AI.',
      ],
    },
    {
      period: 'Feb 2025 — Jul 2025',
      role: 'Asisten Dosen Kewirausahaan',
      where: 'Universitas Atma Jaya Yogyakarta',
      points: [
        'Membantu dosen menyiapkan keperluan materi selama kegiatan belajar mengajar.',
        'Mendampingi lebih dari 50 mahasiswa dalam mengerjakan proyek mata kuliah.',
        'Menilai dan memberikan umpan balik terhadap proyek mata kuliah.',
      ],
    },
    {
      period: 'Agu 2024 — Feb 2025',
      role: 'Student Staff Inovasi Belajar',
      where: 'Departemen Informatika, Universitas Atma Jaya Yogyakarta',
      points: [
        'Membantu wakil dekan dalam melaksanakan kegiatan kampus.',
        'Menjadi content creator untuk keperluan promosi kegiatan kampus.',
      ],
    },
    {
      period: 'Agu 2024 — Feb 2025',
      role: 'Asisten Dosen Pemikiran Desain dan Kreativitas',
      where: 'Universitas Atma Jaya Yogyakarta',
      points: [
        'Membantu dosen membuat kuis mengenai materi yang diajarkan.',
        'Mendampingi lebih dari 30 mahasiswa dalam mengerjakan proyek mata kuliah.',
        'Menilai dan memberikan umpan balik terhadap proyek mata kuliah.',
      ],
    },
  ],

  Organisasi: [
    {
      period: 'Jun 2024 — Agu 2024',
      role: 'Anggota Bidang Kesehatan',
      where: 'Pengenalan Kehidupan Kampus Mahasiswa Baru FTI UAJY',
      points: [
        'Mengoordinasi dan mempersiapkan kebutuhan bidang kesehatan.',
        'Melaksanakan pelatihan kesehatan dalam mempersiapkan pengenalan kehidupan kampus.',
      ],
    },
    {
      period: 'Okt 2023 — Okt 2024',
      role: 'Ketua Senat Mahasiswa',
      where: 'Senat Mahasiswa Fakultas Teknologi Industri UAJY',
      points: [
        'Memimpin dan bertanggung jawab atas 55 anggota Senat Mahasiswa.',
        'Menyusun dan mengoordinasi seluruh program kerja selama satu periode.',
        'Menjadi penghubung antara mahasiswa FTI dengan civitas akademika UAJY.',
      ],
    },
    {
      period: 'Jun 2023 — Agu 2023',
      role: 'Wakil Ketua',
      where: 'Pengenalan Kehidupan Kampus Mahasiswa Baru FTI UAJY',
      points: [
        'Mendampingi ketua pelaksana dalam mempersiapkan pengenalan kehidupan kampus.',
        'Melaksanakan pengenalan kehidupan kampus bersama seluruh panitia.',
      ],
    },
    {
      period: 'Des 2022 — Jul 2023',
      role: 'Koordinator Bidang Perlengkapan',
      where: 'Forum Lesehan',
      points: [
        'Mengoordinasi anggota bidang dalam mempersiapkan program kerja.',
        'Menghubungi vendor yang dibutuhkan.',
        'Mempersiapkan seluruh perlengkapan yang dibutuhkan.',
      ],
    },
    {
      period: 'Des 2022 — Jun 2023',
      role: 'Anggota Bidang Liaison Officer',
      where: 'Sparkfest 11',
      points: [
        'Menjadi penghubung antara panitia dengan bintang tamu yang diundang.',
        'Mendampingi bintang tamu selama berada di acara.',
        'Mengoordinasikan alur dan tempat bagi bintang tamu dengan panitia bidang lain.',
      ],
    },
    {
      period: 'Okt 2022 — Okt 2023',
      role: 'Anggota Bidang Usaha Dana',
      where: 'Senat Mahasiswa Fakultas Teknologi Industri UAJY',
      points: [
        'Menyusun strategi dalam mengumpulkan dana bagi Senat Mahasiswa.',
        'Melaksanakan program kerja yang diberikan kepada bidang usaha dana.',
      ],
    },
    {
      period: 'Okt 2022 — Des 2022',
      role: 'Anggota Bidang Acara',
      where: 'Bakti Sosial',
      points: [
        'Menghubungi pihak panti asuhan tempat dilaksanakannya Bakti Sosial.',
        'Menjadi pembawa acara kegiatan Bakti Sosial.',
        'Mempersiapkan kegiatan yang akan dilaksanakan selama Bakti Sosial.',
      ],
    },
  ],

  Pendidikan: [
    {
      period: '2022 — sekarang',
      role: 'Universitas Atma Jaya Yogyakarta',
      where: 'Program Studi Informatika',
      points: [],
    },
    {
      period: '2019 — 2022',
      role: 'SMA Kolese De Britto Yogyakarta',
      where: 'Jurusan Matematika dan Ilmu Pengetahuan Alam',
      points: [],
    },
  ],
}

export const navLinks = [
  { id: 'about', label: 'Tentang' },
  { id: 'stack', label: 'Keahlian' },
  { id: 'work', label: 'Proyek' },
  { id: 'experience', label: 'Riwayat' },
  { id: 'contact', label: 'Kontak' },
]

export const accents = [
  { id: 'violet', label: 'Ungu', color: '#a78bfa' },
  { id: 'cyan', label: 'Sian', color: '#22d3ee' },
  { id: 'pink', label: 'Merah muda', color: '#f472b6' },
  { id: 'amber', label: 'Kuning', color: '#fbbf24' },
]
