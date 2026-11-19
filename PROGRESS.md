# PROGRESS — Kalkulator Token & Request AI

## Sesi 1C — Rombak Anti-Slop (Desain + Kata) + Compact (19 Nov 2026)

**Tujuan:** Merombak kembali antarmuka ke disiplin desain proyek yang datar,
hemat kata, padat (compact), dan bebas dari dekorasi berlebih (anti-slop).

**Cakupan Rombakan:**
- **Pembersihan Dekorasi AI Slop:** Menghapus badge "TOOL PENGEMBANG AI" & teks versi, menghapus titik hias (dot), menghapus subjudul di bawah judul panel, serta menghapus kartu-kartu hasil bertumpuk & caption penjelas.
- **Ketepatan Kata:** Menggunakan teks persis sesuai mandat (H1, subjudul 1 kalimat, chip status polos, judul panel "Masukan" & "Hasil Perkiraan", label kolom polos tanpa kata pamer, label hasil uppercase, dan badge "ESTIMASI").
- **Hierarki Warna Bersih:** H1 memakai `--ink` (bukan ungu). Ungu (`--accent`) murni untuk elemen fungsional kecil (badge modul tab, angka hasil utama Request Terjangkau, penanda tab aktif, tombol primer). Angka sekunder Total Token & Biaya memakai `--ink`.
- **Bilah Tab Segmented:** Mengganti overflow scroll dengan grid 4 kolom merata (tanpa scrollbar di lebar berapa pun), otomatis responsif menjadi grid 2×2 di layar HP.
- **Aturan Scrollbar Global:** Menghilangkan scrollbar bawaan OS; area yang memerlukan scroll menggunakan scrollbar tipis selaras tema (track transparan, thumb `--line`).
- **Target Compact (Keras):** Rapatkan ritme vertikal (padding atas ±24px, H1 ±27px, jarak seksi ±16px, padding kartu 16px, tinggi input ±37px, angka hasil ±30px). Seluruh halaman F1 (header sampai footer) muat 1 layar penuh pada laptop 1920×1080 zoom 100% tanpa scroll vertikal.

**Status:** ✅ Selesai.

---

## Sesi 1D — Strip Rumus Responsif (19 Nov 2026)

**Tujuan:** Menyusun ulang strip "RUMUS & ASUMSI" menjadi segmen-segmen terstruktur
agar responsif di layar HP (±360px) tanpa scroll horizontal, dengan indentasi menggantung
dan ukuran huruf cair berlantai 12px.

**Cakupan Rombakan:**
- **Segmen Terstruktur:** Rumus dipecah menjadi span per unsur (variabel, operator, suku kurung) yang siap diisi angka dinamis di sesi hitung kelak tanpa merombak struktur.
- **Tampilan Desktop Utuh:** Pada layar lebar, rumus tetap tampil 1 baris utuh seperti sebelumnya.
- **Tumpukan Baris di Layar Sempit (<=480px):** Rumus otomatis pecah bertumpuk dengan indentasi menggantung (*hanging indent*) — suku lanjutan menjorok masuk dan operator berada di awal baris kelanjutannya.
- **Asumsi Membungkus Rapi:** Bagian "asumsi:" membungkus alami sebagai teks biasa.
- **Ukuran Huruf Cair Berlantai 12px:** Memakai `clamp(12px, 0.72rem + 0.25vw, 13px)` sehingga tidak akan pernah mengecil di bawah 12px di layar mana pun, dengan line-height yang lebih longgar saat bertumpuk.
- **Bebas Scroll Horizontal:** Dihapus `overflow-x: auto`; seluruh rumus terbaca penuh di lebar 360px tanpa geser horizontal atau pemotongan teks.
- **Dokumentasi:** Dicatat ke DESIGN.md dan PROGRESS.md.

**Status:** ✅ Selesai.

---

## Sesi 1E — Sistem 3 Tema (19 Nov 2026)

**Tujuan:** Mengadopsi bagian terbaik dari 3 referensi desain (A Terang Bersih,
B Gelap Dashboard, C Editorial Hangat) menjadi sistem 3 tema yang dapat dipilih
pengguna di atas tata letak yang sudah terkunci.

**Cakupan Rombakan:**
- **Sistem 3 Tema:** Mengimplementasikan tema `gelap` (bawaan), `terang` (Ref A), dan `hangat` (Ref C) melalui atribut `data-theme` di `<html>`, persisten di `localStorage`.
- **Pengalih Tema:** 3 tombol teks kecil di kanan atas header sejajar judul (`Gelap` · `Terang` · `Hangat`) tanpa ikon maupun badge dekoratif.
- **Tipografi & Font Angka:**
  - Font angka hasil di tema Gelap & Terang memakai `JetBrains Mono` (tabular).
  - Khusus tema Hangat, judul halaman H1 & angka hasil memakai font `Fraunces` (serif hangat dimuat dari Google Fonts).
  - Teks UI umum tetap `Inter` di semua tema (tanpa Space Grotesk).
- **Bilah Tab Segmented (Ref A):** Rel (*track*) berlatar `--accent-soft`, tab aktif berupa pil terangkat berlatar `--card` dengan teks `--accent`, tab nonaktif berlatar transparan teks `--muted`.
- **Badge ESTIMASI (Ref C):** Disederhanakan menjadi satu pil tunggal di samping angka hasil utama.
- **Bar Pemakaian Jatah (Ref B):** Ditambahkan di bawah angka hasil utama: teks "PEMAKAIAN JATAH" ($10 dari $100) dan rel tipis dengan isian aksen 10%.
- **Strip Rumus Dwi-Tampilan:** Monospace responsif segmen (Sesi 1D) pada tema Gelap & Terang, bertransisi menjadi paragraf prosa editorial alami pada tema Hangat.
- **Compact Tetap Terjaga:** Pergantian tema tidak mengubah ritme vertikal, tetap muat 1 layar 1080p tanpa scroll.
- **Dokumentasi:** Dicatat ke DESIGN.md dan PROGRESS.md.

**Status:** ✅ Selesai — `npm run build` 0 error, siap review visual oleh user.

---

## Sesi 1G — Font Hangat Selaras + Pengalih Tema Ikon (19 Nov 2026)

**Tujuan:** Dua penyempurnaan mikro pasca-Sesi 1E: font Fraunces diperluas ke
judul panel di tema Hangat, dan pengalih tema teks diganti dengan 3 tombol ikon.

**Cakupan:**
- **Font Judul Panel Hangat:** Menambahkan `font-family: var(--font-heading)` ke
  `.card__title` sehingga judul panel "Masukan" & "Hasil Perkiraan" ikut memakai
  Fraunces di tema Hangat. Tema Gelap & Terang tidak terpengaruh (`--font-heading`
  tetap Inter di keduanya).
- **Pengalih Tema → Ikon:** Mengganti 3 tombol teks (`Gelap` · `Terang` · `Hangat`)
  dengan 3 tombol ikon SVG garis gaya Lucide: bulan (Gelap), matahari (Terang),
  kopi (Hangat). Wadah `--accent-soft`; aktif = pil `--card` ikon `--accent`;
  nonaktif = ikon `--muted`. Tiap tombol punya `aria-label`, `title`, dan target
  sentuh minimal 36×36 px.
- **Dokumentasi:** Dicatat ke DESIGN.md (aturan tipografi Hangat untuk judul panel
  + aturan pengalih tema ikon) dan PROGRESS.md.

**Status:** ✅ Selesai — `npm run build` 0 error, commit `style: font Hangat selaras + pengalih tema ikon (Sesi 1G)`.

---

## Sesi 1G+ — Penyeragaman Font ke Semua Tema (19 Nov 2026)

**Tujuan:** Menyeragamkan paduan tipografi yang disukai di tema Hangat (Fraunces untuk judul & angka, Inter untuk antarmuka UI) ke seluruh tema (Gelap, Terang, Hangat).

**Cakupan:**
- Mengatur `--font-heading: var(--font-serif)` dan `--font-stat: var(--font-serif)` secara global di `:root` dan di semua blok tema (`[data-theme="gelap"]`, `[data-theme="terang"]`, `[data-theme="hangat"]`).
- Judul H1, judul panel ("Masukan" & "Hasil Perkiraan"), angka hasil perkiraan (`.result-row__value`), serta nilai pemakaian jatah (`.usage-bar__value`) kini konsisten memakai font Fraunces di tema mana pun.
- Teks UI umum (label form, input, select, bilah tab, chip, tombol) tetap memakai font Inter.
- Dokumentasi diperbarui di DESIGN.md dan PROGRESS.md.

**Status:** ✅ Selesai — `npm run build` 0 error.
