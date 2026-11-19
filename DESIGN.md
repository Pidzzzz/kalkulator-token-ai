# DESIGN — Kalkulator Token & Request AI

> Spek desain dulu, baru kode — pola yang sama seperti NusaLite & Rak Proyek.
> Mengadopsi bagian terbaik dari 3 referensi (A Terang Bersih, B Gelap Dashboard, C Editorial Hangat) menjadi 3 tema yang bisa dipilih user, di atas struktur kompak & anti-slop yang sudah terkunci.

## 1. Sistem 3 Tema

Pilihan tema disimpan di `localStorage` (`kalkulator-theme`) dan diterapkan melalui atribut `data-theme` di elemen `<html>`. Pengalih tema berupa **3 tombol ikon** di kanan atas header sejajar judul. Ikon memakai SVG garis (*stroke*) gaya Lucide, tidak ada teks maupun emoji: **bulan** (moon) = Gelap, **matahari** (sun) = Terang, **kopi** (coffee) = Hangat. Wadahnya rel kecil berlatar `--accent-soft` seperti bilah tab; tombol aktif berupa pil terangkat berlatar `--card` dengan ikon berwarna `--accent`, nonaktif berwarna `--muted`. Tiap tombol wajib punya `aria-label` **dan** `title` ("Tema Gelap", "Tema Terang", "Tema Hangat") dan target sentuh minimal 36×36 px.

### Token Warna per Tema

| Token | Gelap (Bawaan) | Terang (Ref A) | Hangat (Ref C) | Pakai untuk |
|---|---|---|---|---|
| `--bg` | `#0D0D12` | `#F6F7FB` | `#FAF9F5` | Latar halaman |
| `--card` | `#17171F` | `#FFFFFF` | `#FFFFFF` | Kartu modul / panel & permukaan dock |
| `--line` | `#38364A` | `#CBD5E1` | `#DDDACE` | Garis kartu & pembatas |
| `--ink` | `#EEEBE6` | `#0F172A` | `#141413` | Teks utama & judul H1 |
| `--muted` | `#A39DAF` | `#475569` | `#6B6A63` | Teks sekunder & hint |
| `--accent` | `#7C5CFF` | `#3730A3` | `#D97757` | Aksen utama (dipakai hemat) |
| `--accent-light` | `#B197FF` | `#3730A3` | `#9A4524` | Label kecil / sorotan teks |
| `--accent-soft` | `#241D40` | `#EEF0FB` | `#F0EEE6` | Latar pengalih tema / strip rumus / badge |
| `--on-accent` | `#FFFFFF` | `#FFFFFF` | `#141413` | Teks tombol aktif berlatar `--accent` (dock dll) |

> Bayangan kartu sangat lembut (`box-shadow`) hanya diizinkan khusus pada tema **Terang**. Semua tema tetap tanpa gradasi dan tanpa glow.

### Aturan anti-slop (disiplin proyek)

- **Latar solid, tanpa gradasi, tanpa glow.** Jangan warnai seluruh halaman dengan aksen.
- **Tanpa dekorasi pamer:** Tanpa badge atau teks versi dekoratif ("TOOL PENGEMBANG AI", "v0.1.0", dll). Pengalih tema murni tombol teks biasa.
- **Tanpa subjudul di bawah judul panel:** Judul panel ("Masukan", "Hasil Perkiraan") berdiri sendiri.
- **Tanpa caption penjelas di bawah angka:** Angka hasil tampil bersih tanpa baris penjelasan panjang.
- **Label Bahasa Indonesia polos:** Hindari kata serapan pamer (jangan pakai "parameter", "kumulatif", "default").
- **Header ringkas:** Judul + satu kalimat tujuan saja di header.

## 2. Tipografi & Hierarki Warna

- **Font UI:** **Inter** di semua tema untuk teks antarmuka umum, form, label, tombol, bilah tab, dan chip (JANGAN memakai Space Grotesk).
- **Font Judul (H1 & Panel):** **Fraunces** (serif hangat) di **SEMUA TEMA** (Gelap, Terang, Hangat) melalui `--font-heading: var(--font-serif)`.
  - H1: Fraunces SemiBold ±27px, berwarna `--ink` (**BUKAN** ungu).
  - Judul Panel (`.card__title` — "Masukan", "Hasil Perkiraan"): Fraunces Bold 1rem, berdiri sendiri tanpa subjudul (aturan anti-slop).
- **Font Angka Hasil & Stat:** **Fraunces** di **SEMUA TEMA** melalui `--font-stat: var(--font-serif)` untuk angka hasil perkiraan (`.result-row__value`) dan nilai pemakaian jatah (`.usage-bar__value`).
- **Subjudul header:** Satu kalimat tujuan: "Terjemahkan jatah & batas paket AI menjadi angka yang bisa dibayangkan: request, token, dan perkiraan biaya."
- **Chip status:** "web statis" · "tanpa login" · "hitung di browser" (teks polos tanpa titik hias).
- **Hierarki warna aksen (`--accent`):** Aksen dipakai sangat hemat hanya untuk elemen fungsional kecil:
  - Badge nomor modul di tab (`F1` dst.)
  - Angka hasil **UTAMA saja** (`Request Terjangkau`)
  - Tab aktif & tombol pengalih tema aktif
  - Tombol primer ("Salin hasil")
  - Isian bar pemakaian jatah
- **Angka sekunder:** `Total Token` dan `Perkiraan Biaya` memakai `--ink`, bukan aksen.
- **Label di atas angka:** Inter SemiBold kecil memakai `--accent-light`.
- **Badge estimasi (Ref C):** Cukup **SATU** pil `ESTIMASI` di samping angka hasil utama. Baris angka sekunder tidak memakai badge.

## 3. Layout (Satu Halaman, Web Statis, Target Compact)

- **Target compact (keras):**
  - Di laptop 1920×1080 zoom 100%, **seluruh halaman F1 (header sampai footer) harus terlihat tanpa scroll vertikal**.
  - Pergantian tema tidak mengubah ritme vertikal maupun ukuran elemen.
  - Di layar 1366×768, angka hasil pertama sudah terlihat di atas lipatan.
  - Ritme vertikal rapat: padding atas halaman ±24px, H1 ±27px, jarak antar seksi ±16px, padding kartu 16px, tinggi kolom masukan ±37px, angka hasil ±30px.
- **Navigasi Dock Melayang (Sesi 1H — Pengganti Tab):**
  - Menggantikan bilah tab segmented horizontal di header; header kini bersih hanya berisi judul, subjudul, chip, dan pengalih tema.
  - Elemen `<nav role="tablist">` fixed di bawah tengah layar (`bottom: calc(14px + env(safe-area-inset-bottom))`).
  - **Permukaan SOLID `--card`**: border 1px `--line`, radius besar (24px), padding 6px, satu bayangan elevasi netral lembut (`rgba(0, 0, 0, 0.16)`).
  - **DILARANG:** `backdrop-filter`/blur, latar transparan, bayangan berwarna aksen (anti-glow).
  - **Tombol Modul:**
    - Badge mono `"F1"`..`"F4"` selalu terlihat di setiap tombol.
    - Hanya tombol **AKTIF** yang memelar menampilkan label namanya (transisi `max-width` ±0.3s): *"Penerjemah Batas"*, *"Simulator Sesi"*, *"Token Teks"*, *"Data Model"*.
    - Tombol aktif: latar SOLID `--accent`, teks `--on-accent` (`#FFFFFF` tema gelap & terang, `#141413` tema hangat) — tanpa gradasi, tanpa glow.
    - Tombol nonaktif: teks `--muted`; hover hanya mengubah teks ke `--ink` tanpa efek terangkat/membesar.
    - Modul F2-F4 membawa titik kecil `--accent` (atau `--on-accent` saat aktif) di sudut tombol sebagai penanda status modul yang segera hadir.
  - **Ruang Bawah Konten:** Wadah `.page` diberi `padding-block-end: calc(110px + env(safe-area-inset-bottom))` agar dock tidak pernah menutupi footer atau konten terbawah di layar mana pun.
  - **Aksesibilitas & Keyboard:** Navigasi panah kiri/kanan, tombol keyboard F1-F4 langsung berpindah (dengan `preventDefault` cegah aksi bawaan browser), URL hash sinkron `#f1`..`#f4`, dan menghormati `prefers-reduced-motion`.
- **Bar pemakaian jatah (Ref B):**
  - Terletak di panel hasil tepat di bawah angka utama.
  - Berisi baris kecil "PEMAKAIAN JATAH" + nilai contoh "$10 dari $100" + rel tipis dengan isian `--accent` selebar 10% (contoh statis; dihubungkan ke logika hitung di sesi fungsi).
- **Bagian Rumus & Asumsi Lebar Penuh (Sesi 1I):**
  - Terletak mandiri selebar penuh di bawah kedua panel (Masukan + Hasil Perkiraan) dan di atas footer.
  - Menyatu dengan latar belakang (tanpa kotak berlatar warna), dipisah garis rambut `--line`, dengan label kecil `"RUMUS & ASUMSI"` di kiri atas.
  - **Rumus = Baris Kode Bernomor:**
    - Monospace bernomor baris (nomor baris `--muted` di kiri: `1`, `2`).
    - Menggunakan variabel & struktur segmen terstruktur; di layar sempit membungkus rapi dengan indentasi menggantung (aturan Sesi 1D), bebas scroll horizontal.
    - Pada tema **Hangat**, rumus tetap ditampilkan dalam format prosa editorial tanpa sakelar angka.
  - **Sakelar "Simbol | Dengan angka":**
    - Sakelar segmented kecil di kanan atas blok rumus (aktif = solid `--accent`, teks `--on-accent`, tanpa gradasi/glow).
    - Mode *Simbol* (bawaan) menampilkan rumus simbolik.
    - Mode *Dengan angka* menampilkan baris perhitungan dengan nilai contoh terpasang serta hasil antara tebal berwarna `--accent-light`:
      - `biaya_per_request = (10.000 × $3 + 2.000 × $15) ÷ 1.000.000 = $0,06`
      - `request = $10 ÷ $0,06 = 167`
    - Sakelar tidak berlaku / disembunyikan pada tema Hangat.
  - **Tabel Asumsi Tiga Kolom:**
    - Memuat 3 kolom: *Parameter* (monospace), *Nilai* (monospace tebal `--accent-light`), dan *Keterangan* (`--muted`).
    - Baris dipisah garis rambut `--line`.
    - Bebas scroll horizontal: pada layar sempit/HP, tiap baris otomatis menumpuk (parameter + nilai sebaris, keterangan di bawahnya).
    - Berisi parameter acuan `input`, `output`, dan `jatah`.
- **Aturan scrollbar global:**
  - Tidak ada scrollbar bawaan OS yang tampil.
  - Area yang kelak membutuhkan scroll memakai scrollbar tipis selaras tema (track transparan, thumb `--line`) via CSS global.
- **Struktur panel:**
  - Panel kiri: Masukan (label + nilai awal wajar).
  - Panel kanan: Hasil Perkiraan (baris datar dipisah hairline `--line` + bar Pemakaian Jatah + tombol "Salin hasil"). Blok Rumus & Asumsi keluar menjadi bagian mandiri di bawahnya.
- **Footer halaman:** Penafian satu baris — "Semua hasil adalah perkiraan, bukan angka tagihan."
- **Responsif:** Nyaman dibuka dari HP (dock melayang, input mudah disentuh, rumus & tabel asumsi bebas geser horizontal) dan laptop. Tanpa sidebar.

## 4. Perilaku

- Pilihan tema tersimpan di `localStorage` dan dipulihkan saat refresh / kunjungan ulang.
- Hasil berubah seketika saat masukan berubah (tanpa tombol "Hitung").
- Nilai kustom (harga editan, model tambahan, preset kustom) tersimpan di browser pengguna (localStorage); tombol "Kembalikan bawaan" mengembalikan tabel awal.
- Salin hasil: teks polos ringkas (modul, masukan kunci, hasil, rumus) siap tempel ke chat/komunitas.
- Tanpa server, tanpa login, tanpa kunci API, tanpa pelacakan. Semua hitungan lokal.
- Status kosong yang jujur: F3 tanpa teks → hasil kosong + contoh teks sekali klik; F2 tanpa harga model → arahkan pilih model di F4 dulu.

## 5. Tumpukan & alur sesi

- Tumpukan sama dengan Rak Proyek: React + Vite + GitHub Pages (deploy otomatis tiap push ke `main`), supaya tidak ada permukaan belajar baru.
- Dokumen proyek: `AGENTS.md` (cara kerja) · `PRD.md` (ini + PRD.md) · `DESIGN.md` (dokumen ini) · `PROGRESS.md` (status).
- Satu sesi OpenCode = satu fitur (F1 dulu, baru F2, F3, F4). Prompt pembuka tiap sesi menyebut nomor fiturnya dan menunjuk bagian PRD/DESIGN yang relevan saja.
