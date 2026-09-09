# Portofolio Aaron Risang Panji Bharata — situs statis, tema "Aurora Dark"

Website portofolio satu halaman tanpa backend. Dibangun dengan **React + Vite**, hasil `build`-nya
murni file statis (HTML/CSS/JS) sehingga bisa di-hosting gratis di mana saja.

Semua animasi ditulis manual dengan CSS + `requestAnimationFrame` — **tanpa library animasi**,
jadi ukuran bundle tetap kecil.

---

## Menjalankan

```bash
npm install     # sekali saja
npm run dev     # buka http://localhost:5173
npm run build   # hasil siap-upload ada di folder dist/
npm run preview # mengecek hasil build secara lokal
npm run cv      # membangkitkan ulang CV (public/cv.html + public/cv-aaron.pdf)
```

---

## Yang perlu kamu ubah

Hampir semua isi website ada di **satu file**: [`src/data/content.js`](src/data/content.js).

| Bagian          | Isi yang perlu diganti                                              |
| --------------- | ------------------------------------------------------------------- |
| `profile`       | nama lengkap, inisial, peran, deskripsi, email                        |
| `profile.photo`   | foto hero — taruh di `public/`, sekarang menunjuk ke `/aaron.jpg`     |
| `profile.birthDate` | tanggal lahir yang tampil di bagian "Tentang"                      |
| `profile.socials` | link GitHub / LinkedIn / Instagram / YouTube / WhatsApp / Email      |
| `profile.cv`    | taruh file PDF di `public/`, lalu isi path-nya (mis. `/cv-aaron.pdf`) |
| `stats`         | angka statistik di bagian "Tentang"                                   |
| `about`         | paragraf perkenalan (pakai `**teks**` untuk menebalkan)               |
| `stackGroups`   | daftar keahlian per kategori                                          |
| `projects`      | daftar proyek — lihat catatan di bawah                                |
| `timeline`      | riwayat, dikelompokkan jadi tab: `Kerja`, `Organisasi`, `Pendidikan`  |
| `facts`         | kartu data diri di bagian "Tentang"                                   |

### Catatan penting

- **CV dibangkitkan otomatis**, bukan file yang disalin manual — lihat bagian di bawah.
- **Link sosial** (GitHub, LinkedIn, Instagram, YouTube, WhatsApp, Email) sudah terisi dengan
  akun asli. Nomor WhatsApp disimpan dua kali di `profile.whatsapp`: `number` dalam format
  internasional tanpa spasi/tanda (untuk tautan `wa.me`) dan `display` untuk ditampilkan.
  Kalau nomornya ganti, ubah keduanya.
- **Isi riwayat & keahlian** disalin dari CV `Aaron Risang Panji Bharata.pdf`.
- **Alamat rumah tidak dipasang.** CV memuat alamat lengkap sampai RT/RW; di situs publik
  hanya ditulis `Kalasan, Sleman, Yogyakarta`. Kalau memang ingin ditampilkan penuh, ubah
  `profile.location`.
- **Daftar proyek berisi tiga item** dan sengaja hanya yang nyata. Tambahkan sendiri dengan
  menyalin salah satu blok di `projects`. Pindahkan `featured: true` ke proyek mana pun
  yang ingin ditampilkan paling menonjol (kartunya melebar dua kolom).
- Kartu **Sistem Monitoring Proyek** sengaja tidak memuat nama proyek internal PLN, angka,
  maupun tangkapan layar — hanya masalah yang diselesaikan dan teknologi yang dipakai.
- Menambah kategori riwayat cukup dengan menambah kunci baru di `timeline` — tab-nya
  muncul otomatis.

### CV yang selalu ikut terbarui

CV tidak ditulis terpisah. Isinya dibangkitkan dari `src/data/content.js` — sumber yang sama dengan
website — oleh [`scripts/build-cv.mjs`](scripts/build-cv.mjs):

```bash
npm run cv
```

Menghasilkan dua berkas di `public/`:

| Berkas          | Kegunaan                                                     |
| --------------- | ------------------------------------------------------------ |
| `cv.html`       | CV versi web, bisa dibuka langsung di browser (`/cv.html`)    |
| `cv-aaron.pdf`  | yang diunduh lewat tombol "Unduh CV" di hero                  |

PDF-nya dicetak lewat Chrome/Edge headless (dideteksi otomatis). Kalau keduanya tidak ada, skrip
tetap membuat `cv.html` dan memberi tahu cara mencetaknya manual lewat Ctrl+P.

**Jadi setiap kali kamu mengubah `content.js`, jalankan `npm run cv` sebelum `npm run build`,**
supaya isi PDF tidak tertinggal dari isi website.

Yang perlu diketahui soal berkas ini:

- Ringkasan CV memakai `cvSummary` (nada formal), berbeda dari `profile.intro` di website yang
  gayanya lebih santai. Keduanya ada di `content.js`.
- Tata letaknya sengaja satu kolom, font sistem, tanpa gambar — supaya lolos pembacaan ATS
  (mesin penyaring lamaran). PDF-nya murni teks dan bisa disalin.
- Alamat yang tercetak hanya `profile.location`, bukan alamat rumah lengkap, karena berkas ini
  bisa diunduh siapa saja dari internet.
- Ukuran huruf dan spasinya diatur agar muat 2 halaman. Kalau nanti entrinya bertambah banyak dan
  jadi 3 halaman, kecilkan angka-angka di blok `<style>` dalam `scripts/build-cv.mjs`.

### Menaruh foto diri

Foto utama di hero dibaca dari `profile.photo` (`src/data/content.js`), yang saat ini menunjuk ke
`/aaron.jpg`.

1. Simpan fotomu sebagai **`public/aaron.jpg`**
2. Selesai — tidak ada kode lain yang perlu diubah

Kalau file itu belum ada, kartunya otomatis menampilkan inisial bergradasi, jadi tampilannya tidak
akan pernah rusak. Titik fokus gambar bisa digeser lewat `object-position` pada
`.hero__photo-frame img` di `src/styles/components.css` (sekarang `50% 20%`, mengarah ke wajah).

Saran ukuran: sisi terpanjang sekitar 1200–1600 px, rasio potret, di bawah ~400 KB.

### Menambah screenshot proyek

1. Simpan gambar di `public/projects/nama-proyek.png`
2. Isi field `image: '/projects/nama-proyek.png'` pada proyek tersebut

Kalau `image` dikosongkan, kartunya otomatis memakai placeholder inisial bergradasi — tetap rapi.
Beri `featured: true` untuk membuat satu kartu melebar dua kolom di layar besar.

### Tautan pada kartu proyek

Satu proyek bisa punya beberapa repo (misalnya frontend dan backend terpisah), jadi tautannya
berupa daftar:

```js
links: [
  { label: 'Frontend', href: 'https://github.com/OhMyAaron/nama-fe' },
  { label: 'Backend', href: 'https://github.com/OhMyAaron/nama-be' },
],
```

Setiap entri jadi satu tombol di bagian bawah kartu, dan tautan **pertama** juga dipasang pada
gambar kartunya. Proyek tanpa tautan cukup ditulis `links: []` — tombolnya tidak muncul dan
gambarnya tidak bisa diklik.

> Pastikan repo yang ditautkan berstatus **public**. Repo private tetap bisa ditautkan, tapi
> pengunjung yang mengekliknya hanya akan melihat halaman 404 GitHub.

---

## Ganti warna tema

Ada **4 preset warna** yang bisa diklik langsung di navbar (pojok kanan atas): ungu, sian,
merah muda, dan kuning. Pilihan pengunjung tersimpan di `localStorage`.

Untuk mengubah warna bawaan, edit atribut di [`index.html`](index.html):

```html
<html lang="id" data-accent="violet">
  <!-- violet | cyan | pink | amber -->
</html>
```

Ingin warna sendiri? Tambahkan preset baru di [`src/styles/base.css`](src/styles/base.css):

```css
:root[data-accent='emerald'] {
  --a1: #34d399;
  --a2: #22d3ee;
  --a1-rgb: 52, 211, 153; /* wajib: dipakai untuk efek transparan & partikel */
  --a2-rgb: 34, 211, 238;
}
```

lalu daftarkan di array `accents` pada `src/data/content.js`.

---

## Struktur folder

```
src/
├─ data/content.js          ← SEMUA TEKS & DATA ADA DI SINI
├─ hooks/useAnimations.js   ← hook animasi (reveal, tilt, magnetic, count-up, dll)
├─ styles/
│  ├─ base.css              ← token warna, reset, tipografi, keyframes
│  ├─ layout.css            ← preloader, kursor, latar, navbar, tombol, footer
│  └─ components.css        ← hero, marquee, proyek, timeline, kontak
└─ components/              ← satu file per bagian halaman
```

---

## Daftar animasi yang dipakai

| Animasi                     | Letak                                          |
| --------------------------- | ---------------------------------------------- |
| Preloader angka 0→100 + tirai | `Preloader.jsx`                              |
| Kursor kustom + label "LIHAT" | `Cursor.jsx`                                 |
| Blob gradasi + parallax kursor | `Background.jsx`                            |
| Kanvas partikel saling terhubung | `Background.jsx`                          |
| Judul muncul huruf per huruf | `Hero.jsx`                                    |
| Efek mesin ketik pada peran  | `useTypewriter`                                |
| Tombol magnetis              | `Magnetic.jsx`                                 |
| Kartu miring 3D + sorotan kursor | `useTilt`                                  |
| Muncul saat scroll           | `Reveal.jsx`                                   |
| Angka statistik menghitung naik | `useCountUp`                                |
| Pita teknologi berjalan      | `Marquee.jsx`                                  |
| Garis waktu terisi saat scroll | `Experience.jsx`                             |
| Progress bar scroll + menu aktif otomatis | `App.jsx`, `Navbar.jsx`           |

Semuanya **otomatis mati** kalau sistem operasi pengunjung disetel
`prefers-reduced-motion: reduce`, dan kanvas partikel berhenti menggambar saat tab tidak aktif.

---

## Deploy (semuanya gratis)

Karena statis, cukup upload isi folder `dist/`.

**Netlify / Vercel** — hubungkan repo, build command `npm run build`, publish directory `dist`.

**GitHub Pages** — tambahkan `base` di `vite.config.js` sesuai nama repo:

```js
export default defineConfig({
  plugins: [react()],
  base: '/nama-repo/',
})
```

lalu jalankan `npm run build` dan publikasikan folder `dist`.
