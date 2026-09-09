/* ============================================================
   Memotret sebuah situs untuk dijadikan gambar kartu proyek.

   Pemakaian:
     npm run shot -- <url> <nama-file> [lebar] [tinggi]

   Contoh:
     npm run shot -- https://karinakas.com karinakas 1680 720

   Hasilnya disimpan ke public/projects/<nama-file>.jpg

   Ukuran yang disarankan — samakan dengan bingkai kartunya:
     kartu biasa     16:10  ->  1600 1000
     kartu unggulan  21:9   ->  1680 720   (yang pakai featured: true)

   Skrip ini menjalankan Chrome tanpa jendela lalu mengendalikannya lewat
   DevTools Protocol, sehingga bisa menekan tombol "Lewati"/"Skip" pada
   situs yang punya layar pembuka sebelum memotret.
   ============================================================ */

import { spawn } from 'node:child_process'
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const [url, name, w = '1600', h = '1000'] = process.argv.slice(2)

if (!url || !name) {
  console.error(
    'Pemakaian: npm run shot -- <url> <nama-file> [lebar] [tinggi]\n' +
      'Contoh   : npm run shot -- https://karinakas.com karinakas 1680 720',
  )
  process.exit(1)
}

const W = Number(w)
const H = Number(h)
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(root, 'public', 'projects')
const out = join(outDir, `${name}.jpg`)

const browsers = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
]

const browser = browsers.find((p) => existsSync(p))
if (!browser) {
  console.error('Chrome/Edge tidak ditemukan. Potret manual lalu simpan ke', out)
  process.exit(1)
}

const PORT = 9333
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const chrome = spawn(
  browser,
  [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    `--remote-debugging-port=${PORT}`,
    `--window-size=${W},${H}`,
    `--user-data-dir=${join(root, 'node_modules', '.cache', 'shot-profile')}`,
    'about:blank',
  ],
  { stdio: 'ignore' },
)

let ws
try {
  let targets
  for (let i = 0; i < 40; i++) {
    await sleep(500)
    try {
      targets = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json()
      if (targets.some((t) => t.type === 'page')) break
    } catch {
      /* port debug belum siap */
    }
  }

  const page = targets?.find((t) => t.type === 'page')
  if (!page) throw new Error('Chrome tidak merespons di port debug')

  ws = new WebSocket(page.webSocketDebuggerUrl)
  await new Promise((res, rej) => {
    ws.onopen = res
    ws.onerror = rej
  })

  let id = 0
  const pending = new Map()
  const events = []

  ws.onmessage = (m) => {
    const msg = JSON.parse(m.data)
    if (msg.id && pending.has(msg.id)) {
      pending.get(msg.id)(msg.result)
      pending.delete(msg.id)
    } else if (msg.method) {
      events.push(msg.method)
    }
  }

  const send = (method, params = {}) =>
    new Promise((res) => {
      const myId = ++id
      pending.set(myId, res)
      ws.send(JSON.stringify({ id: myId, method, params }))
    })

  await send('Page.enable')
  await send('Runtime.enable')
  // viewport dipaksa persis agar rasionya cocok dengan bingkai kartu
  await send('Emulation.setDeviceMetricsOverride', {
    width: W,
    height: H,
    deviceScaleFactor: 1,
    mobile: false,
  })
  await send('Page.navigate', { url })

  for (let i = 0; i < 40 && !events.includes('Page.loadEventFired'); i++) await sleep(250)
  await sleep(4000) // beri waktu kerangka JS merender isinya

  // lewati layar pembuka kalau ada
  const clicked = await send('Runtime.evaluate', {
    expression: `(() => {
      const el = [...document.querySelectorAll('button, a, [role=button]')]
        .find(e => /lewati|skip|masuk|mulai/i.test(e.textContent || ''));
      if (!el) return 'tidak ada layar pembuka';
      el.click();
      return 'melewati: ' + el.textContent.trim().slice(0, 40);
    })()`,
    returnByValue: true,
  })
  console.log(' ', clicked.result?.value)

  await sleep(5000) // tunggu transisi selesai
  await send('Runtime.evaluate', { expression: 'window.scrollTo(0, 0)' })
  await sleep(1200)

  const shot = await send('Page.captureScreenshot', {
    format: 'jpeg', // jauh lebih kecil daripada PNG untuk foto layar berwarna
    quality: 82,
    captureBeyondViewport: false,
  })

  mkdirSync(outDir, { recursive: true })
  const buf = Buffer.from(shot.data, 'base64')
  writeFileSync(out, buf)

  console.log(`✓ public/projects/${name}.jpg  (${W}x${H}, ${(buf.length / 1024).toFixed(1)} KB)`)
  console.log(`  Pasang di content.js:  image: '/projects/${name}.jpg',`)
} catch (err) {
  console.error('Gagal memotret:', err.message)
  process.exitCode = 1
} finally {
  try {
    ws?.close()
  } catch {
    /* abaikan */
  }
  chrome.kill()
}
