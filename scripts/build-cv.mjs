/* ============================================================
   Membangkitkan CV dari data yang sama dengan yang dipakai website
   (src/data/content.js), lalu mencetaknya menjadi PDF.

   Jalankan:  npm run cv

   Hasilnya dua file di folder public/:
     - cv.html       CV versi web, bisa dibuka di browser
     - cv-aaron.pdf  yang diunduh lewat tombol "Unduh CV"

   Karena sumbernya satu, isi CV tidak akan pernah berbeda dengan
   isi website. Ubah content.js, jalankan lagi perintahnya, selesai.
   ============================================================ */

import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

import { cvSummary, profile, stackGroups, timeline } from '../src/data/content.js'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const publicDir = join(root, 'public')
const htmlPath = join(publicDir, 'cv.html')
const pdfPath = join(publicDir, 'cv-aaron.pdf')

/* ------------------------------- utilitas -------------------------------- */

const esc = (v) =>
  String(v)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

/** Satu blok pengalaman: jabatan, periode, tempat, dan poin-poinnya. */
const entry = (item) => `
      <article class="entry">
        <div class="entry-head">
          <span class="role">${esc(item.role)}</span>
          <span class="period">${esc(item.period)}</span>
        </div>
        ${item.where ? `<div class="where">${esc(item.where)}</div>` : ''}
        ${
          item.points.length
            ? `<ul>${item.points.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>`
            : ''
        }
      </article>`

const section = (title, body) => `
    <section>
      <h2>${esc(title)}</h2>
      ${body}
    </section>`

/* ------------------------------ dokumen CV ------------------------------- */

const linkedin = profile.socials.find((s) => s.icon === 'linkedin')
const github = profile.socials.find((s) => s.icon === 'github')

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>CV — ${esc(profile.fullName)}</title>
<style>
  /* Sengaja pakai font sistem dan satu kolom saja supaya mudah dibaca
     mesin penyaring lamaran (ATS) maupun manusia. */
  @page { size: A4; margin: 12mm 14mm; }

  * { box-sizing: border-box; }
  body {
    margin: 0;
    font: 10pt/1.36 Arial, Helvetica, sans-serif;
    color: #111;
    background: #fff;
  }

  header { margin-bottom: 4px; }
  h1 {
    margin: 0 0 6px;
    font-size: 19pt;
    letter-spacing: 0.3px;
    text-transform: uppercase;
  }
  .contact { font-size: 9pt; line-height: 1.5; color: #222; }
  .contact a { color: #111; text-decoration: none; }

  h2 {
    margin: 11px 0 5px;
    padding-bottom: 2px;
    font-size: 11pt;
    text-transform: uppercase;
    letter-spacing: 0.3px;
    border-bottom: 2px solid #111;
  }

  p.summary { margin: 0; text-align: justify; }

  .entry { margin-bottom: 7px; page-break-inside: avoid; break-inside: avoid; }
  .entry-head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 14px;
  }
  .role { font-weight: 700; }
  .period { font-weight: 700; white-space: nowrap; font-size: 9pt; }
  .where { color: #333; font-size: 9.5pt; }

  ul { margin: 3px 0 0; padding-left: 15px; }
  li { margin-bottom: 1px; }

  .skill { margin-bottom: 4px; page-break-inside: avoid; break-inside: avoid; }
  .skill-title { font-weight: 700; }
</style>
</head>
<body>
  <header>
    <h1>${esc(profile.fullName)}</h1>
    <div class="contact">
      ${esc(profile.whatsapp.display)} &nbsp;|&nbsp; ${esc(profile.email)}<br>
      ${esc(profile.location)}<br>
      <a href="${esc(linkedin.href)}">${esc(linkedin.href)}</a><br>
      <a href="${esc(github.href)}">${esc(github.href)}</a>
    </div>
  </header>

${section('Summary', `<p class="summary">${esc(cvSummary)}</p>`)}
${section('Education', timeline.Education.map(entry).join(''))}
${section('Work Experience', timeline.Work.map(entry).join(''))}
${section('Organizational Experience', timeline.Organizations.map(entry).join(''))}
${section(
  'Skills',
  stackGroups
    .map(
      (g) => `
      <div class="skill">
        <span class="skill-title">${esc(g.title)}:</span>
        ${esc(g.items.join(', '))}
      </div>`,
    )
    .join(''),
)}
</body>
</html>
`

mkdirSync(publicDir, { recursive: true })
writeFileSync(htmlPath, html, 'utf8')
console.log(`✓ public/cv.html  (${(html.length / 1024).toFixed(1)} KB)`)

/* --------------------------- cetak jadi PDF ------------------------------ */

const browsers = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
]

const browser = browsers.find((p) => existsSync(p))

if (!browser) {
  console.warn(
    '\n! Chrome/Edge tidak ditemukan, jadi PDF belum dibuat.\n' +
      '  Buka public/cv.html di browser lalu Ctrl+P → Save as PDF,\n' +
      `  simpan sebagai ${pdfPath}`,
  )
  process.exit(0)
}

try {
  execFileSync(
    browser,
    [
      '--headless=new',
      '--disable-gpu',
      '--no-pdf-header-footer', // buang header tanggal & footer URL bawaan browser
      `--print-to-pdf=${pdfPath}`,
      pathToFileURL(htmlPath).href,
    ],
    { stdio: 'pipe', timeout: 60000 },
  )
  console.log(`✓ public/cv-aaron.pdf  (lewat ${browser.split('/').pop()})`)
} catch (err) {
  console.error('\n! Gagal mencetak PDF:', err.message)
  console.error('  Buka public/cv.html lalu cetak manual dengan Ctrl+P.')
  process.exit(1)
}
