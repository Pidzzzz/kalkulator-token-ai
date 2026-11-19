# DESIGN — Kalkulator Token & Request AI

> Spek desain dulu, baru kode — pola yang sama seperti NusaLite & Rak Proyek.
> Sumber visual: poster contoh PRD (graphite gelap + ungu datar). Semua token warna di bawah diambil persis dari poster itu.

## 1. Token

| Token | Nilai | Pakai untuk |
|---|---|---|
| `--bg` | `#0D0D12` | Latar halaman |
| `--card` | `#17171F` | Kartu modul / panel |
| `--line` | `#38364A` | Garis kartu & pembatas |
| `--ink` | `#EEEBE6` | Teks utama & judul H1 |
| `--muted` | `#A39DAF` | Teks sekunder & hint |
| `--accent` | `#7C5CFF` | Aksen utama (dipakai hemat) |
| `--accent-light` | `#B197FF` | Label kecil / sorotan teks |
| `--accent-soft` | `#241D40` | Latar chip / strip rumus / badge |
| `--danger` | — | Belum ditetapkan; pakai hanya bila perlu, satu warna saja |

### Aturan anti-slop (disiplin proyek)

- **Latar solid, tanpa gradasi, tanpa glow.** Jangan ungu-kan seluruh halaman.
- **Tanpa dekorasi pamer:** Tanpa badge atau teks versi dekoratif ("TOOL PENGEMBANG AI", "v0.1.0 · Baseline 2026", dll) di header maupun tempat lain.
- **Tanpa subjudul di bawah judul panel:** Judul panel ("Masukan", "Hasil Perkiraan") berdiri sendiri tanpa kalimat pengantar tambahan.
- **Tanpa caption penjelas di bawah angka:** Angka hasil tampil bersih tanpa baris penjelasan panjang ("Perkiraan request...", "Kombinasi input...", dll).
- **Label Bahasa Indonesia polos:** Hindari kata serapan pamer (jangan pakai "parameter", "kumulatif", "default").
- **Header ringkas:** Judul + satu kalimat tujuan saja di header.

## 2. Tipografi & Hierarki Warna

- **Font:** **Inter** seluruhnya (monospace untuk rumus).
- **Judul halaman (H1):** Inter Bold ±27px, satu baris: "Kalkulator Token & Request AI", berwarna `--ink` (**BUKAN** ungu).
- **Subjudul header:** Satu kalimat tujuan: "Terjemahkan jatah & batas paket AI menjadi angka yang bisa dibayangkan: request, token, dan perkiraan biaya."
- **Chip status:** "web statis" · "tanpa login" · "hitung di browser" (teks polos tanpa titik hias).
- **Hierarki warna ungu (`--accent`):** Ungu dipakai sangat hemat hanya untuk elemen kecil:
  - Badge nomor modul di tab (`F1` dst.)
  - Angka hasil **UTAMA saja** (`Request Terjangkau`)
  - Penanda tab aktif (garis bawah / border)
  - Tombol primer ("Salin hasil")
- **Angka sekunder:** `Total Token` dan `Perkiraan Biaya` memakai `--ink` (off-white), bukan ungu.
- **Label di atas angka:** Inter SemiBold kecil memakai `--accent-light`.
- **Badge angka hasil:** Bertuliskan `ESTIMASI` (bukan "CONTOH").
- **Rumus & asumsi:** Monospace kecil, di bawah hasil, selalu terlihat ringkas.
- **Bahasa:** Bahasa Indonesia di semua label, tombol, dan penjelasan.

## 3. Layout (Satu Halaman, Web Statis, Target Compact)

- **Target compact (keras):**
  - Di laptop 1920×1080 zoom 100%, **seluruh halaman F1 (header sampai footer) harus terlihat tanpa scroll vertikal**.
  - Di layar 1366×768, angka hasil pertama sudah terlihat di atas lipatan.
  - Ritme vertikal rapat: padding atas halaman ±24px, H1 ±27px, jarak antar seksi ±16px, padding kartu 16px, tinggi kolom masukan ±37px, angka hasil ±30px, strip rumus ringkas.
- **Bilah tab segmented:**
  - Tanpa scrollbar horizontal di lebar berapa pun.
  - Keempat tab berbagi lebar merata (grid 4 kolom / flex) memenuhi kontainer.
  - Di HP: otomatis menjadi grid 2×2 bila label tidak muat.
- **Aturan scrollbar global:**
  - Tidak ada scrollbar bawaan OS yang tampil.
  - Area yang kelak membutuhkan scroll memakai scrollbar tipis selaras tema (track transparan, thumb `--line`) via CSS global.
- **Struktur panel:**
  - Panel kiri: Masukan (label + nilai awal wajar).
  - Panel kanan: Hasil Perkiraan (baris datar dipisah garis rambut/hairline `--line` + strip rumus monospace + tombol "Salin hasil").
- **Strip rumus responsif:**
  - Konten monospace/rumus membungkus terstruktur (segmen per unsur: variabel, operator, suku dalam kurung), tanpa scroll horizontal (`overflow-x`).
  - Di layar sempit (breakpoint kontainer/panel <=480px): rumus pecah menjadi tumpukan baris dengan indentasi menggantung (*hanging indent*) — kelanjutan baris menjorok masuk dan operator pindah ke awal baris kelanjutannya.
  - Baris "asumsi:" dan isinya membungkus rapi sebagai teks biasa.
  - Ukuran huruf memakai `clamp()` yang cair mengikuti lebar layar dengan LANTAI keterbacaan 12px (tidak boleh lebih kecil di ukuran layar berapa pun). Line-height di layar sempit sedikit lebih longgar agar tumpukan baris nyaman dibaca.
  - Dilarang: scroll horizontal dalam strip, mengecilkan paksa dengan transform scale, atau menyembunyikan/memotong rumus.
- **Footer halaman:** Penafian satu baris — "Semua hasil adalah perkiraan, bukan angka tagihan."
- **Responsif:** Nyaman dibuka dari HP (grid 2×2 tab, input mudah disentuh, rumus menumpuk rapi tanpa geser horizontal) dan laptop. Tanpa sidebar.

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
