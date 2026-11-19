# PRD — Kalkulator Token & Request AI

> Dikonversi dari poster contoh PRD `contoh-prd-kalkulator-token.png` (17 Nov 2026) menjadi dokumen teks siap pakai di OpenCode.
> Status: **DIPUTUSKAN 18 Nov 2026 — proyek berikutnya, mulai 19 Nov 2026, proyek PUBLIK, mendahului tracker kalori.**
> Bentuk: web statis (React + Vite), hosting GitHub Pages — Rp0. Pengguna: publik / komunitas AI coding.
> Bahasa antarmuka: Bahasa Indonesia.

## 1. Masalah

- Batas paket AI ditulis dalam dolar & persen — "20% per 5 jam, 50% per minggu" — dan pengguna tidak bisa membayangkan itu sebenarnya berapa request atau berapa token.
- Biaya satu sesi agen tidak bisa diperkirakan sebelum sesi dimulai; banyak pengguna baru tahu kuotanya habis ketika sesinya terpotong di tengah jalan.
- Kalkulator yang sudah ada berbahasa Inggris dan hanya menghitung teks — tidak ada yang memodelkan sesi agen (konteks, putaran, cache) atau paket langganan agen.

## 2. Tujuan

Membantu pengguna AI coding menerjemahkan jatah & batas paket dari provider mana pun menjadi angka yang bisa dibayangkan (request, token, biaya), dan memperkirakan biaya satu sesi agen sebelum sesi itu dimulai — gratis, terbuka untuk publik, dan jujur soal asumsinya.

## 3. Fitur inti & kriteria selesai

### F1 — Penerjemah Batas

Pilih paket & model dari platform mana pun (OpenCode Go, Claude Pro/Max, ChatGPT, Gemini, OpenRouter, relay, atau kustom), masukkan jatah dolar dan jendela waktu (5 jam / minggu / bulan).

**SELESAI BILA:** hasil request & token muncul dan berubah seketika saat masukan berubah; rumus dan asumsi hitung ditampilkan terbuka di bawah hasil.

### F2 — Simulator Sesi Agen

Masukkan konteks awal, pertumbuhan konteks per putaran, jumlah putaran, rasio cache, dan harga model — keluar total token & biaya sesi.

**SELESAI BILA:** total biaya cocok dengan hitungan manual pada kasus uji yang disediakan; biaya per putaran rata-rata ikut ditampilkan.

### F3 — Penghitung Token Teks

Tempel prompt / teks / potongan kode, dapatkan perkiraan jumlah token untuk tiap keluarga model (GPT, Claude, DeepSeek, GLM, dan kawan-kawan).

**SELESAI BILA:** setiap hasil berlabel "perkiraan" dan metode hitungnya (tokenizer / heuristik per model) disebutkan di samping angka.

### F4 — Basis Data Model & Harga

Daftar model lintas provider — OpenAI, Anthropic, Google, DeepSeek, xAI, Mistral, Meta, dan model terbuka — berisi harga per 1 juta token (input / output / cache) dan ukuran konteks; semua angka dapat diubah pengguna.

**SELESAI BILA:** menambah model baru cukup menambah satu baris data, tanpa mengubah kode; mengubah harga langsung mengubah hasil F1–F3, dan nilai kustom tersimpan di browser pengguna.

Catatan kejujuran data (tambahan dari PRD poster, bukan fitur baru): daftar model & harga berubah cepat dan wajib dicek langsung ke sumber resmi saat sesi F4 dikerjakan — tiap baris harga dicatat sumber + tanggal ceknya. Harga di versi ini dikurasi manual; tidak diambil otomatis dari situs provider.

## 4. Alur kerja pengguna

1. **Pilih modul** — Penerjemah batas, simulator sesi, atau penghitung teks.
2. **Isi masukan** — Paket, model, jatah & asumsi sesi — semua punya nilai awal yang wajar.
3. **Hitung di browser** — Mesin hitung lokal: tanpa server, tanpa kunci API, tanpa menunggu.
4. **Baca hasil** — Request, token & biaya — lengkap dengan rumus dan asumsi yang terbuka.
5. **Ubah asumsi** — Geser rasio cache, konteks, jumlah putaran — hasil berubah seketika.
6. **Salin & bagikan** — Hasil dapat disalin sebagai teks untuk ditempel ke chat / komunitas.

**Rumus inti:**

```
biaya sesi = input segar × harga input + konteks cache × harga cache + output × harga output
request terjangkau = jatah ÷ biaya per request
```

## 5. Bukan tujuan (batas versi ini)

- Bukan penghitung token resmi milik provider — semua hasil adalah perkiraan, bukan angka tagihan.
- Tanpa login, tanpa akun, tanpa penyimpanan data pengguna di server mana pun.
- Harga tidak diambil otomatis dari situs provider pada versi ini — tabel dikurasi manual dan dapat diubah pengguna.
- Bukan aplikasi native; cukup web yang nyaman dibuka dari HP dan laptop.

## 6. Data inti yang dihitung

Daftar model (semua provider) · preset paket langganan · harga input / 1 jt token · harga output / 1 jt token · harga cache / 1 jt token · jatah $ & jendela waktu · ukuran konteks awal · pertumbuhan konteks / putaran · jumlah putaran · rasio cache · hasil: request · token · biaya.

## Cara pakai dokumen ini di OpenCode

Simpan sebagai `PRD.md` di akar proyek, sejajar `AGENTS.md`. Satu sesi mengerjakan satu fitur (F1 dulu, baru F2, dan seterusnya) — sebutkan nomor fiturnya di prompt pembuka. Tumpukan sama dengan Rak Proyek (React + Vite + GitHub Pages) agar tidak ada permukaan belajar baru.
