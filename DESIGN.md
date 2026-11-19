# DESIGN — Kalkulator Token & Request AI

> Spek desain dulu, baru kode — pola yang sama seperti NusaLite & Rak Proyek.
> Sumber visual: poster contoh PRD (graphite gelap + ungu datar). Semua token warna di bawah diambil persis dari poster itu.

## 1. Token

| Token | Nilai | Pakai untuk |
|---|---|---|
| `--bg` | `#0D0D12` | Latar halaman |
| `--card` | `#17171F` | Kartu modul / panel |
| `--line` | `#38364A` | Garis kartu & pembatas |
| `--ink` | `#EEEBE6` | Teks utama |
| `--muted` | `#A39DAF` | Teks sekunder |
| `--accent` | `#7C5CFF` | Aksen utama (dipakai hemat) |
| `--accent-light` | `#B197FF` | Label kecil / sorotan teks |
| `--accent-soft` | `#241D40` | Latar chip / strip rumus |
| `--danger` | — | Belum ditetapkan; pakai hanya bila perlu, satu warna saja |

Aturan anti-slop (selera user): latar solid, tanpa gradasi, tanpa glow. Ungu hanya untuk aksen — judul modul, angka hasil utama, tombol primer. Jangan ungu-kan seluruh halaman.

## 2. Tipografi

- Font: **Inter** seluruhnya (pilihan tetap user; poster memakai serif hanya untuk judul poster, bukan untuk produk).
- Judul halaman: Inter Bold, besar, satu baris: "Kalkulator Token & Request AI".
- Judul modul (F1–F4): Inter Bold 20–24px, diawali chip kecil `F1` dst. berlatar ungu.
- Label input: Inter SemiBold 13–14px; angka hasil: Inter Bold, besar, mudah dibaca sekilas.
- Rumus & asumsi: monospace kecil, di bawah hasil, selalu terlihat — bukan disembunyikan di tooltip.
- Bahasa: Bahasa Indonesia di semua label, tombol, dan penjelasan.

## 3. Layout (satu halaman, web statis)

- Header: judul + satu kalimat tujuan + chip status (web statis · tanpa login · hitung di browser).
- Pemilih modul: 4 kartu/tab F1–F4 di bawah header; satu modul aktif dalam satu waktu. Di HP, pemilih jadi daftar vertikal / tab geser.
- Tiap modul: panel kiri input (label + nilai awal wajar + satuan), panel kanan hasil (angka besar request / token / biaya + rumus + asumsi + tombol "Salin hasil").
- F4 tampil sebagai tabel: kolom model, provider, harga input / output / cache per 1 jt token, ukuran konteks; tiap sel harga bisa diedit langsung; tombol "Tambah model" menambah satu baris.
- Footer halaman: penafian satu baris — "Semua hasil adalah perkiraan, bukan angka tagihan" — + tautan sumber harga (per baris di F4).
- Responsif: nyaman dibuka dari HP (input besar, hasil di atas lipatan) dan laptop. Tanpa sidebar.

## 4. Perilaku

- Hasil berubah seketika saat masukan berubah (tanpa tombol "Hitung").
- Nilai kustom (harga editan, model tambahan, preset kustom) tersimpan di browser pengguna (localStorage); tombol "Kembalikan bawaan" mengembalikan tabel awal.
- Salin hasil: teks polos ringkas (modul, masukan kunci, hasil, rumus) siap tempel ke chat/komunitas.
- Tanpa server, tanpa login, tanpa kunci API, tanpa pelacakan. Semua hitungan lokal.
- Status kosong yang jujur: F3 tanpa teks → hasil kosong + contoh teks sekali klik; F2 tanpa harga model → arahkan pilih model di F4 dulu.

## 5. Tumpukan & alur sesi

- Tumpukan sama dengan Rak Proyek: React + Vite + GitHub Pages (deploy otomatis tiap push ke `main`), supaya tidak ada permukaan belajar baru.
- Dokumen proyek: `AGENTS.md` (cara kerja) · `PRD.md` (ini + PRD.md) · `DESIGN.md` (dokumen ini) · `PROGRESS.md` (status).
- Satu sesi OpenCode = satu fitur (F1 dulu, baru F2, F3, F4). Prompt pembuka tiap sesi menyebut nomor fiturnya dan menunjuk bagian PRD/DESIGN yang relevan saja.

## Keputusan kecil yang masih menunggu user (bukan penghalang mulai)

1. Nama repo & URL GitHub Pages (mis. `kalkulator-token-ai` di bawah akun yang sama seperti Rak Proyek?).
2. Apakah F1 perlu preset paket siap pakai sejak hari pertama (OpenCode Go, Claude Pro/Max, dst.) atau cukup mode kustom dulu — PRD sudah menulis preset sebagai bagian F1/F4, jadi jawabannya hanya soal isi awalnya.
