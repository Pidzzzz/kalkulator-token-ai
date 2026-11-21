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

## 6. F1 Hidup — Pola Fungsi (Sesi 2)

> Tata letak, tema, dock, dan blok Rumus & Asumsi Sesi 1–1I tidak berubah. Bagian ini hanya mencatat pola baru yang lahir saat F1 dihubungkan ke data.

### 6.1 Chip preset cepat

- Terletak tepat di bawah kolom **Jatah (USD)** dalam satu baris `flex-wrap`.
- Enam chip: `$5`, `$10`, `$20`, `$50`, `25%`, `50%`.
- Bentuk pil kecil (radius 999px, tinggi ±27px) berlatar `--accent-soft`, border 1px `--line`, teks `--ink`; hover mengubah teks & border ke `--accent`; saat ditekan latar solid `--accent`.
- Chip persen menghitung dari **Total jatah paket** dan otomatis nonaktif (opacity 0,45) bila total kosong/tidak valid.
- Mengklik chip mengisi kolom Jatah; hasil langsung berubah tanpa tombol Hitung.

### 6.2 Tabel asumsi yang bisa diedit

- Baris `input` dan `output` memakai `<input type="number">` di kolom **Nilai** — bukan teks statis.
- Isian mewarisi bahasa visual tabel: font mono, tebal `--accent-light`, latar `--bg`, border `--line`, `tabular-nums`, tinggi ±30px. Spinner bawaan disembunyikan.
- Di layar ≤520px, isian tetap berada di baris atas bersama parameter (rata kanan), keterangan tetap di bawah.
- Baris `jatah` tetap tampilan nilai (diubah dari panel Masukan), ikut memperbarui angka.

### 6.3 Strip hasil ringkas (HP)

- Hanya tampil pada lebar ≤679px.
- `position: fixed` di atas layar (`top: calc(8px + env(safe-area-inset-top))`), latar solid `--card`, border `--line`, radius `--radius-sm`, bayangan netral lembut, `z-index: 90` (di bawah dock `100`).
- Muncul setelah panel Masukan sepenuhnya terlewati saat menggulir; tersembunyi kembali saat pengguna menggulir ke atas.
- Isi: label kecil `PERKIRAAN` + teks mono/stat `~167 request · $10,00` (`tabular-nums`). Saat keadaan tepi, hanya pesan ramah yang tampil.
- Transisi opacity/translate ±0,2s; dimatikan pada `prefers-reduced-motion`.

### 6.4 Angka hasil & salin

- Tiga angka hasil memakai count-up ±250ms dengan easing *ease-out cubic*; nilai akhir selalu angka eksak. `prefers-reduced-motion: reduce` mematikan animasi.
- Semua angka (hasil, rumus, isian, tabel) memakai `font-variant-numeric: tabular-nums` agar lebar digit stabil.
- Tombol **Salin hasil** di kaki kartu Hasil menyalin teks polos: paket, model, jatah + jendela, request, token, perkiraan biaya, dan penegasan “perkiraan”. Status tombol berubah menjadi **Tersalin** ±1,8 detik.
- Tombol nonaktif saat hasil belum valid (jatah/harga/token belum memenuhi syarat).

### 6.5 Persistensi & keadaan tepi

- Seluruh masukan F1 (paket, model, jatah, total, jendela, token input/output) disimpan di `localStorage` kunci `kalkulator-f1-input`; nilai tak dikenal divalidasi balik ke bawaan.
- Jatah kosong/0: panel Hasil menampilkan “Isi jatah dulu untuk melihat perkiraan.” — tidak pernah `~0`, `NaN`, atau `Infinity`.
- Harga model 0 atau token 0 juga menghasilkan pesan ramah, bukan pembagian tak terdefinisi.
- Total jatah kosong/tidak valid menyembunyikan bilah pemakaian, bukan menampilkan rel kosong yang menyesatkan.

## 7. Dropdown Kustom — Paket, Model, Jendela (Sesi 2B)

> Menggantikan tiga `<select>` bawaan dengan satu komponen pakai-ulang `src/components/Dropdown.jsx`. Hanya tampilan & interaksi yang berubah: data opsi, nilai terpilih, persistensi `localStorage`, dan seluruh hitungan tetap identik. Warna tetap solid — tanpa gradasi, tanpa glow berwarna.

### 7.1 Pemicu (trigger)

- Berbentuk tombol selebar kolom dengan latar `--card`, border 1px `--line`, radius `--radius-sm`, tinggi minimum 37px, padding 10px/7px — sama dengan kolom isian lain.
- Teks rata kiri berisi nama terpilih. Khusus **Model**, ditambah imbuhan harga `— $2/$10` berwarna `--muted`; imbuhan disembunyikan pada lebar < 480px.
- Chevron SVG 12px di kanan, warna `--muted`, berputar 180° dengan transisi 150ms saat daftar terbuka.
- Hover menaikkan border ke `--muted`; fokus keyboard memakai cincin `2px solid --accent` (`:focus-visible`).

### 7.2 Panel daftar

- `position: absolute`, 6px di bawah pemicu, lebar persis sama (`left: 0; right: 0`).
- Latar solid `--card`, border 1px `--line`, radius `--radius-sm`, padding dalam 5px, `max-height` 264px dengan gulir internal tipis (`scrollbar-width: thin`, thumb `--line`) dan `overscroll-behavior: contain`.
- **Pengecualian bayangan yang disetujui:** panel melayang memakai `box-shadow: 0 8px 22px rgba(0, 0, 0, 0.22)` — bayangan hitam netral agar terangkat dari panel di bawahnya, bukan glow berwarna. Pengecualian ini hanya untuk panel dropdown; kartu dan komponen lain tetap mengikuti aturan bayangan yang sudah ada.
- Arah buka diukur saat panel dibuka: bila ruang bawah (dibatasi tepi atas dock `.dock-nav` yang `fixed`, bukan hanya viewport) tidak cukup dan ruang atas lebih besar, panel membuka ke **atas**. `max-height` mengikuti ruang tersedia (batas bawah 88px).
- Animasi buka: opacity + geser 2px (arah sesuai posisi), 140ms `ease-out`; `prefers-reduced-motion: reduce` mematikan animasi dan rotasi chevron.
- Wrapper `.module-f1__input` diberi `position: relative; z-index: 20` agar panel tidak tertutup kartu Hasil — `.card` memakai `container-type: inline-size` (membentuk stacking context sendiri).

### 7.3 Baris pilihan

- Grid 13px + teks, padding 8px/9px, radius `--radius-sm`; hover dan baris aktif keyboard memakai `--accent-soft`.
- Baris terpilih: ikon centang kecil di kiri + teks `--accent-light` + latar `--accent-soft`.
- Judul grup provider (khusus Model): 10px kapital, `letter-spacing 0.08em`, `--muted`, tidak bisa dipilih, padding lebih rapat.
- Model memakai dua baris: nama (`--ink`) dan harga JetBrains Mono 11px `--muted` — `input $2 · output $10 · cache $0,10 per 1 jt` (format `formatHarga`/`formatDesimal` yang sudah dipakai aplikasi). Paket & Jendela satu baris.

### 7.4 Perilaku & aksesibilitas

- Setara select bawaan: klik pemicu membuka/menutup, klik di luar menutup, Esc menutup dan mengembalikan fokus ke pemicu, memilih baris menutup dan menerapkan nilai.
- Keyboard: panah atas/bawah memindah baris aktif (melingkar), Enter/Spasi memilih, Home/End melompat, Tab menutup lalu melanjutkan urutan fokus, dan typeahead huruf awal (buffer 700ms; menekan huruf yang sama berulang menggulir di antara opsi berawalan huruf itu).
- ARIA: pemicu `aria-haspopup="listbox"`, `aria-expanded`, `aria-controls`, `aria-activedescendant`; panel `role="listbox"`; baris `role="option"` + `aria-selected`.


## 8. Jendela Bawaan per Paket + Opsi Per hari (Sesi 2D-1)

- Daftar Jendela waktu berurutan: **Per 5 jam → Per hari → Per minggu → Per bulan**. Tetap satu dropdown yang sama (Sesi 2B), tanpa komponen baru.
- Setiap preset punya `jendelaBawaan`; memilih paket mengisi Jendela dengan nilai itu. User tetap dapat menggantinya lewat dropdown setelahnya.
- **Kustom tidak punya jendela bawaan** (`null`): berpindah ke Kustom mempertahankan jendela yang sedang dipilih, tidak mereset ke nilai paket sebelumnya.
- Bawaan aplikasi (tanpa `localStorage`) memakai `bulan`, selaras dengan paket OpenCode Go; nilai `hari` yang tersimpan diterima validasi.
- Nilai bawaan per paket: OpenCode Go `bulan`; Claude Pro, Claude Max 5×, ChatGPT Plus, Gemini `5jam`; Kustom tanpa perubahan.


## 9. Konversi Mata Uang pada Perkiraan Biaya (Sesi 2D-2)

- **Angka utama tetap USD.** Konversi hanya pelengkap di kanan angka biaya: `= Rp182.500`, warna `--muted`, 13px, `tabular-nums`, membungkus ke bawah bila tidak muat. Tidak ada perubahan pada masukan Jatah, chip, atau label bilah pemakaian.
- **Pemilih** memakai `Dropdown` Sesi 2B varian `dropdown--ringkas` di kanan baris judul kartu Hasil: pemicu setinggi ±27px berisi kode mata uang (mis. `IDR`), panel rata kanan dengan lebar minimum 176px. Baris panel menampilkan `KODE — Nama` dan kurs per $1.
- **9 mata uang** dari `src/data/currencies.js` (USD, IDR, EUR, GBP, JPY, SGD, MYR, INR, CNY), kurs per 1 USD, cek `2026-11-19`, sumber kurs tengah pasar. Pembaruan kurs cukup di berkas data ini.
- **Format** `Intl.NumberFormat("id-ID", { style: "currency", currency })`; IDR & JPY 0 desimal. Spasi setelah simbol dirapatkan (`Rp182.500`, `€9,10`). USD menyembunyikan teks konversi.
- **Persistensi:** `localStorage` kunci `kalkulator-mata-uang`, bawaan `IDR`; kode tak dikenal dikembalikan ke IDR.
- **Salin hasil** menyertakan konversi: `Perkiraan biaya: $10,00 (= Rp182.500)`.
- **Lapisan:** kartu Hasil memakai `z-index: 30` hanya saat panel dropdown-nya terbuka (`:has`), supaya panel ke atas tidak tertutup kartu Masukan (`z-index: 20`).


## 10. Dock Memudar saat Diam (Sesi 2D-3)

- Dock bawah meredup ke **opacity 0,55** setelah **2,5 detik** tanpa interaksi (pointer tidak di atasnya, fokus keyboard tidak di dalamnya, tidak ada sentuhan baru), dengan transisi **250 ms**. Hanya opacity — tanpa blur, `backdrop-filter`, atau efek kaca; latar tetap solid `--card`.
- Interaksi mengembalikan opacity 1 seketika: `pointerenter`, `pointerdown`/sentuhan, fokus masuk, dan klik/panah modul. Setelah pindah modul, dock bertahan penuh **1 detik** sebelum hitung diam 2,5 detik.
- `prefers-reduced-motion: reduce` mematikan fitur: dock selalu opacity 1 dan transisi dimatikan. Perubahan setelan OS diikuti lewat listener `matchMedia` yang dibersihkan saat unmount.
- Hanya fokus `:focus-visible` yang menahan dock tetap penuh; fokus sisa dari tap di HP tidak menahan redup selamanya.
- Saat redup, teks tombol non-aktif memakai `--ink` agar tetap terbaca di 3 tema; pil aktif dan titik status mempertahankan warna aksennya.

## 11. F2 Hidup — Simulator Sesi Agen (Sesi 3)

> Tata letak, 3 tema, dock, dropdown kustom, konversi mata uang, dan blok Rumus & Asumsi tidak berubah. Panel F2 memakai grup `.module-f1` (kolom & lapisan dropdown sama) dengan penanda `.module-f2`. Bagian ini mencatat pola baru.

### 11.1 Slider rasio cache

- Baris **Rasio cache** memakai label sebaris dengan isian angka kecil (62px, mono tebal `--accent-light`, suffix `%`) di kanan, lalu slider selebar kolom di bawahnya.
- Slider: rel 5px `--accent-soft` berborder `--line`; isian kiri `--accent` solid (hanya `::-moz-range-progress`; WebKit memakai thumb sebagai penanda karena track-nya solid tanpa gradasi). Thumb bulat 16px `--accent` dengan cincin `--card` + `--line`, membesar 1,1× saat hover/tekan.
- Slider dan isian angka **dua arah**: menggeser mengisi angka, mengetik memindah slider (0–100, dikunci).
- Skala `0%`…`100%` mono 10px `--muted` di bawah rel. `prefers-reduced-motion` mematikan transisi thumb.
- Dua kolom isian berdampingan (`konteks awal | pertumbuhan`, `putaran | output`) memakai `.form-row--dua`; di ≤520px menumpuk satu kolom.

### 11.2 Bar tumpuk 3 segmen (satu-satunya visualisasi F2)

- Terletak di kaki kartu Hasil, di atas tombol Salin: label kecil `RINCIAN BIAYA` + total, lalu rel ramping 8px radius 999px berborder `--line`.
- Tiga segmen berwarna solid: **segar** `--accent`, **cache** `--accent-light`, **output** `--muted`. Tanpa gradasi, glow, atau celah.
- Legenda di bawahnya: swatch 8px + nama + `$` per suku (mono tebal `--ink`). Legenda selalu 2 desimal agar sebaris rapi.
- Lebar tiap segmen = porsi biaya suku terhadap total (dilindungi dari total 0); `role="img"` + `aria-label` berisi ketiga nilai. Disembunyikan saat hasil belum valid. BUKAN donat/garis waktu.

### 11.3 Peringatan konteks

- Bila `konteks_akhir > konteks` model di `models.js`, kartu Hasil menampilkan blok `.context-warning` (`role="alert"`): latar `--accent-soft`, garis kiri 3px `--accent`, teks 12px — menyebut konteks akhir, jendela model, persen, dan risiko sesi terpotong/kehabisan konteks.
- Strip HP menambahkan penanda `· konteks terlampaui`. Angka tetap tampil apa adanya — tidak ada angka yang diam-diam dibatasi.

### 11.4 Angka biaya & keadaan tepi

- Total biaya sesi memakai `--accent` (angka utama); total token, rata-rata per putaran, dan konteks akhir memakai `--ink`.
- Biaya < $0,01 tampil 4 desimal agar tidak menjadi `$0,00`; legenda & salinan tetap 2 desimal.
- Putaran kosong/0, konteks 0 + output 0, atau harga model 0 → "Isi masukan dulu untuk melihat perkiraan sesi." (atau pesan harga). Tombol Salin nonaktif, bar tumpuk disembunyikan.
- Chart/visual lain tidak ditambahkan; count-up ±250ms, `tabular-nums`, strip HP sticky, konversi IDR, dan `localStorage` (`kalkulator-f2-input`) mengikuti pola F1 persis.

### 11.5 Isian token bertitik ribuan & legenda persen (Sesi 3B)

- **Isian token** (Konteks awal, Pertumbuhan / putaran, Output / putaran) memakai komponen `TokenInput`: tampilan selalu berformat id-ID ("10.000") termasuk saat mengetik; kursor dijaga hanya saat isian difokuskan sehingga titik ribuan tidak membuat kursor melompat, dan nilai dari luar (muat ulang/slider) tidak mengganggu posisi ketik.
- Nilai state tetap teks terformat, hitungan memakai `parseAngkaIsian` (`src/utils/angkaIsian.js`) yang membuang karakter selain digit/titik/koma lalu membuang titik ribuan; koma tetap desimal. Isian kosong → pesan ramah, bukan 0 paksa.
- **Jumlah putaran & rasio cache tidak diformat** (rasio tetap `%` + slider).
- Tabel asumsi F2 memakai pemformat yang sama (nilai tetap terformat seperti sebelumnya).
- **Legenda bar tumpuk** kini menampilkan porsi biaya (%) untuk ketiga suku — angka 10px mono `--muted` di ujung tiap baris — sehingga "Segar · Cache · Output" konsisten. Persen rasio cache tidak lagi ditempelkan di nama suku (sudah terbaca dari baris masukan/slider).
- **Rata-rata per putaran** membaca jumlah putaran dari hasil hitung (`dari N putaran`), bukan teks masukan mentah.

## 12. F3 Hidup — Penghitung Token Teks (Sesi 4)

> Tata letak, 3 tema, dock, dropdown kustom, konversi mata uang, dan pola pita Rumus & Asumsi tidak berubah. Panel F3 memakai grup `.module-f1` (kolom & lapisan dropdown sama) dengan penanda `.module-f3`.

### 12.1 Panel Masukan

- **Dropdown Model** — komponen & data sama dengan F1/F2 (`buatOpsiModel()`), grup per penyedia + logo, harga menempel, bawaan `claude-sonnet-5-5`.
- **Textarea "Teks"** — satu-satunya isian besar: `min-height` ±164px (±8 baris), `resize: vertical`, latar `--field` + garis `--field-line` (token Sesi 3F), fokus ring 3px `var(--field-ring)`. Placeholder "Tempel atau ketik teks di sini…". Microcopy `.form-hint` di bawah label: "Tempel teks apa pun — prompt, artikel, atau kode. Semua dihitung di browser; teksmu tidak dikirim ke mana pun."
- **Dua tombol** di bawah textarea (`Contoh teks`, `Bersihkan`) memakai gaya chip `.preset-chip` F1; `Bersihkan` nonaktif saat teks kosong.
- **Persistensi:** `kalkulator-f3-input` (`{ teks, modelId }`); kegagalan penyimpanan diabaikan diam-diam.
- **Pita Metode & Asumsi** di bawah kedua panel memakai struktur Sesi 1I persis: label `METODE & ASUMSI`, sakelar Simbol | Dengan angka (disembunyikan di tema Hangat), rumus bernomor, prosa untuk Hangat, tabel 3 kolom (Keluarga | Faktor | Keterangan), lalu catatan kejujuran sebagai teks biasa (`.metode-catatan`, 12px `--muted-strong`, tanpa kotak berwarna).

### 12.2 Panel Hasil

- Baris: **PERKIRAAN TOKEN** (aktor utama `--accent`, label "token · perkiraan", pil `ESTIMASI`) → **JUMLAH KARAKTER** → **JUMLAH KATA** → **PERKIRAAN BIAYA MASUKAN** (USD + konversi muted di sampingnya).
- Bilah pemakaian konteks menumpang di baris utama (pola bilah jatah F1): label `PEMAKAIAN KONTEKS` + persen, baris teks `±{token} dari {konteks} token jendela konteks`, rel 5px isian `--accent`.
- **Tabel perbandingan keluarga** di dalam kartu, di atas tombol Salin: 3 kolom grid (Keluarga | Faktor | Perkiraan token), angka mono `tabular-nums` rata kanan. Baris penyedia terpilih memakai latar `--accent-soft` + teks `--accent-light` — sama dengan baris terpilih dropdown.
- **Peringatan konteks** memakai blok `.context-warning` F2 (Sesi 11.3) bila perkiraan token melebihi jendela model.
- **Salin hasil** menyalin ANGKA saja (model, karakter, kata, perkiraan token, biaya + konversi, pemakaian konteks) — isi teks pengguna tidak pernah disalin.
- Strip HP (`.mobile-result-strip` bersama) berisi `~{token} token · {karakter} karakter` (+ `· konteks terlampaui`).

### 12.3 Format khusus F3

- **Biaya masukan:** 2 desimal; bila nilai > 0 tetapi terbulatkan `$0,00` → s.d. 6 desimal tanpa nol ekor (`$0,00012`).
- **Persen konteks:** 2 desimal; di bawah 0,01% ditulis `<0,01%`.
- **Keadaan kosong:** hanya pesan "Tempel atau ketik teks untuk melihat perkiraan jumlah tokennya.", tabel perbandingan disembunyikan, tanpa angka 0.

---

## 13. Pita Metode Bisa Dilipat (Sesi 4B)

**Aturan:** pita metode bawaan selalu terbuka (kewajiban PRD); lipatan adalah pilihan pengguna yang tersimpan per modul - keputusan pemilik 20 Nov 2026.

### 13.1 Baris judul

- Seluruh baris judul pita (`RUMUS & ASUMSI` F1/F2, `METODE & ASUMSI` F3) adalah satu `<button>` asli (`.pita-toggle`) selebar baris: judul + chevron rumah di ujung kanan.
- Chevron: 12px, `--muted-strong`, berputar 180 derajat antara terbuka/tertutup (`.pita-toggle__chevron[data-terbuka="false"]`). Hover tombol hanya mengubah warna chevron/judul ke `--ink` - tanpa glow, tanpa latar baru.
- Keyboard: tombol native (Enter/Spasi), ring fokus rumah (`outline: 2px solid var(--accent)`). `aria-expanded` + `aria-controls` menunjuk `#pita-isi-f1|f2|f3`.
- Sakelar Simbol | Dengan angka tinggal di `.pita-header__aksi` sebagai **saudara** tombol (tidak ada tombol bersarang). Di tema Hangat sakelar tetap disembunyikan seperti sebelumnya.

### 13.2 Keadaan & penyimpanan

- Hook bersama `usePitaTerbuka(modul)` (`src/utils/usePitaTerbuka.js`): kunci `kalkulator-pita` = `{ f1, f2, f3 }` boolean, bawaan semua `true`. Nilai tidak dikenal/korup -> terbuka. Kegagalan `localStorage` diabaikan diam-diam. Event `storage` menyinkronkan antar-tab.
- Melipat F3 tidak memengaruhi F1/F2.

### 13.3 Isi yang terlipat

- Seluruh isi di bawah baris judul (baris rumus, sakelar, tabel, catatan). Garis rambut pemisah menempel pada baris judul sehingga tetap tampil.
- Isi TIDAK dilepas dari DOM: `PitaBody` hanya memberi atribut `hidden` -> status internal anak (mis. mode "Dengan angka") bertahan saat dibuka lagi.
- Animasi 250ms tinggi + opacity (`interpolate-size: allow-keywords`, `transition-behavior: allow-discrete`); `prefers-reduced-motion: reduce` -> `transition: none`.

### 13.4 Tabel faktor F3 ringkas

- Tiga baris terkelompok, diturunkan dari `src/data/tokenFaktor.js` (`kelompokFaktor()`), urut menaik: 3,5 -> Anthropic · DeepSeek; 3,8 -> Mistral · Moonshot · Z.ai · Alibaba; 4,0 -> OpenAI · Google · xAI.
- Dua kolom: Faktor (150px, mono) | Keluarga (nama dipisah ` · `). Kolom Keterangan dihapus; satu catatan di bawah tabel (`CATATAN_FAKTOR`).
- Baris yang memuat penyedia model terpilih memakai `--accent-light` (`.assumptions-row--aktif`).
- <=520px: baris menumpuk (faktor di atas, keluarga di bawah).
- Tiga catatan kejujuran dan tabel perbandingan 9 baris di kartu Hasil tidak berubah.

## 14. F4 Basis Data Model & Harga (Sesi 5)

**Aturan:** harga dan konteks model adalah data milik pengguna, bukan konstanta aplikasi. F4 adalah satu-satunya tempat mengubahnya; F1-F3 hanya membaca.

### 14.1 Tabel yang menjadi kartu di HP

- Desktop: grid 8 sel `.data-baris` dengan `grid-template-columns: minmax(0,1.6fr) 132px 96px 96px 96px 104px minmax(0,1.5fr) 84px` (Model | Provider | Input | Output | Cache | Konteks | Sumber | aksi). Baris dikelompokkan per provider lewat `.data-grup` + `.data-grup__judul` (logo satu warna dari `providerIcons.js`, fallback monogram huruf awal, `fill: currentColor`, selalu `--ink` di ketiga tema).
- <=520px: setiap baris berubah menjadi kartu bertumpuk - `grid-template-columns: 1fr`, label kolom dipindah ke kiri tiap nilai (`::before` dari `data-label`), sehingga tabel **tidak pernah** butuh geser horizontal. Antarmuka `<table>` sengaja tidak dipakai agar transformasi ini murni CSS.
- Sel angka yang bisa diedit adalah `<input>` selebar sel (`.data-sel`) dengan gaya "teks" (tanpa kotak sampai fokus), `inputmode="decimal"` untuk harga dan `inputmode="numeric"` untuk konteks; fokus memberi latar `--surface-2` + garis `--accent`. Tinggi sasaran sentuh minimal 32px di HP.
- Catatan model (`.data-catatan`) tampil kecil di bawah nama model, warna `--muted-strong`, maksimal dua baris.
- Sumber selalu menampilkan tautan resmi (`target="_blank"`, `rel="noopener noreferrer"`) + "dicek 19 Nov 2026"; bila `sumber` kosong, teks diam adalah "sumber belum diisi" (bukan tautan palsu).

### 14.2 Sel yang menyimpan saat blur/Enter, menolak yang tidak sah

- Fokus pada sel menyeleksi seluruh teks; Enter/blur menyimpan, Esc membatalkan (nilai lama kembali, pesan hilang).
- Validasi di satu tempat: `validasiSel(field, teks)` di `lapisanModel.js`. Harga: kosong -> "Nilai belum diisi. Isi angka dulu."; negatif -> "Angka tidak boleh negatif."; bukan angka -> `"abc" bukan angka. Pakai angka, mis. 2 atau 0,05.`; konteks harus bilangan bulat positif ("bulat positif"). Titik dibaca sebagai pemisah ribuan (`1.500.000` -> 1500000).
- Penolakan **tidak mengubah** nilai tersimpan: sel diberi `aria-invalid="true"`, pesan tampil di `#<id>-galat` (`role="alert"`), dan pesan itu hilang begitu pengguna mengetik lagi. Tidak ada `NaN`/`Infinity`/`0` tak sengaja yang pernah masuk store.
- Baris yang berbeda dari bawaan menampilkan label "diubah" (`.data-badge-ubah`) dan tombol "Kembalikan" (kembali ke nilai bawaan baris itu saja). Model tambahan menampilkan "Hapus" sebagai gantinya.

### 14.3 Konfirmasi sebaris dua langkah (pengganti modal)

- Tombol berisiko ("Kembalikan bawaan") **tidak** memakai modal/dialog. Klik pertama hanya mengubah label menjadi "Yakin? Klik lagi untuk mengembalikan" dan memberi kelas `data-kembalikan--yakin`; klik kedua menjalankan aksi. Kehilangan fokus (`onBlur`) membatalkan mode yakin dan label kembali semula, jadi salah klik tidak langsung menghapus apa pun. Tombol nonaktif saat tabel masih persis bawaan.
- Alasan: aksi ini tidak destruktif di tingkat data (bawaan selalu bisa dipulihkan) sehingga modal terasa terlalu berat; konfirmasi sebaris menjaga fokus tetap pada tombol dan aman untuk keyboard.

### 14.4 Model tambahan & petunjuk angka contoh

- `tambahModel()` menambah baris **lengkap** dengan angka contoh ($1/$2/$0,05, konteks 100.000) bertanda `baru: true`. Ini disengaja: baris setengah jadi akan dibuang oleh `normalisasiSimpanan`, jadi angka contoh lebih aman daripada sel kosong.
- Selama `baru`, baris menampilkan petunjuk "Angka contoh $1/$2/$0,05 · 100.000 - sesuaikan dengan harga resmi."; petunjuk hilang begitu ada satu nilai diubah.
- Model tambahan tampil di ujung tabel dan langsung muncul di dropdown F1-F3. Menghapus model yang sedang dipilih membuat pemilih jatuh ke `claude-sonnet-5-5` (lihat `jagaModel()` di `App.jsx`), bukan nilai kosong.

### 14.5 Penyimpanan hanya selisih

- localStorage `kalkulator-models-kustom` = `{ ubah: { [id]: patch }, tambah: [model] }`. Nilai yang kembali sama dengan bawaan dihapus dari patch (baris tidak lagi "diubah"). "Kembalikan bawaan" menghapus kunci ini sepenuhnya.
- Pembacaan selalu melalui `normalisasiSimpanan()`, jadi data lama/rusak tidak pernah merusak tabel atau perhitungan.

## 15. Sesi 5B — Field F2 Sejajar + Hierarki Mata Uang Hasil

### 15.1 Baris field F2 memakai subgrid

- `.module-f2 .form-row--dua` = grid 3 baris eksplisit (`auto auto auto`) dengan `row-gap: 3px`. Tiap `.form-group` di dalamnya = subgrid (`grid-row: span 3`, `display: grid`, `grid-template-rows: subgrid`, `gap: 0`, `min-width: 0`).
- Hasilnya label, petunjuk (`.form-hint`), dan isian pada kolom kiri-kanan menempati baris yang sama: isian selalu mulai pada ketinggian yang sama meski jumlah baris petunjuk berbeda. Tidak ada pemotongan teks petunjuk.
- Seluruh aturan dibungkus `@supports (grid-template-rows: subgrid)`; peramban tanpa subgrid memakai perilaku lama. Di <=520px grid tetap satu kolom, tiap kelompok tetap tiga baris internal (label, petunjuk, isian).
- Tidak ada token warna/ukuran baru, dan teks label/petunjuk tidak diubah.

### 15.2 Hierarki mata uang pada angka hasil

- Aturan: **angka utama** (besar/aksen/pertama) memakai mata uang yang dipilih pengguna; **angka pendamping kecil** memakai pasangannya — USD bila pilihan bukan USD, IDR bila pilihan USD.
- Sumber format tunggal: `formatNilaiMataUang(nilaiUSD, kode)` dan `pasanganNilai(nilaiUSD, kode, formatDolar)` di `src/utils/currency.js`. Desimal adaptif (0-6, nilai bukan-nol tidak pernah tampil 0) tetap berlaku; IDR & JPY 0 desimal; USD ditulis ringkas (`$0,08`).
- Pilihan mata uang satu untuk seluruh halaman: state di `App.jsx`, disimpan di `kalkulator-mata-uang` (bawaan IDR), dipakai pemilih ringkas di judul kartu Hasil F1/F2/F3.
- Pemakaian: F1 garis Perkiraan Biaya; F2 total biaya sesi (hero) dan rata-rata per putaran; F3 biaya masukan; strip hasil HP F1 & F2 (tanpa pendamping).
- Rincian Biaya F2 (bar tumpuk + legenda Segar/Cache/Output) memakai mata uang terpilih **tanpa** pendamping.
- Tetap USD: label dari sisi input (Jatah (USD), Total jatah paket (USD), bilah PEMAKAIAN JATAH), seluruh hitungan internal, harga tabel F4, dan teks "Salin hasil".

## 16. Sesi 6 — FAQ, Sering Tertukar & Glosarium

> Bagian bacaan mandiri sesudah modul F1–F4 dan sebelum footer. Bukan modul baru: dock tetap F1–F4, tanpa item tambahan, tanpa masukan/hitungan baru. Data `models.js` dan fungsi F1–F4 tidak berubah.

### 16.1 Penempatan & anchor

- Satu `<section id="faq-glosarium">` dirender sekali di `App.jsx` setelah `<main>` modul dan sebelum `<Footer>`, sehingga terbaca sama dari modul mana pun.
- Footer menambahkan satu tautan `FAQ & Glosarium` (`href="#faq-glosarium"`) di samping penafian; gaya `--accent-light`, garis bawah, fokus ring `--accent`.
- Hash bacaan bukan hash modul: listener `hashchange` hanya berpindah modul bila hash cocok `f1`–`f4`, jadi klik tautan footer tidak memaksa pindah ke F1. `scroll-margin-block-start: 16px` menjaga judul tidak menempel di tepi atas.
- Judul bagian: label kecil `BACAAN` (aksen, kapital) + H2 `FAQ & Glosarium` (Fraunces). Tanpa subjudul tambahan (aturan anti-slop).

### 16.2 Tiga sub-bagian

- **Sering Tertukar** — 10 kartu pasangan. Tiap kartu: dua istilah bersebelahan dengan penghubung kecil (`vs`, atau `=` untuk pasangan yang memang sama), satu kalimat pembeda, dan baris `Contoh:` bergaris kiri hanya pada pasangan yang menyertakan contoh (3 dan 6). Kartu memakai `--card`, border `--line`, `--card-shadow` tema (tanpa gradasi/glow).
- **FAQ** — 8 pertanyaan sebagai akordeon. Tiap item memakai `<button>` asli dengan `aria-expanded` + `aria-controls`; jawaban `role="region"` + `aria-labelledby`, tertutup bawaan lewat atribut `hidden`, bisa dibuka/ditutup satu per satu. Enter/Spasi bekerja, fokus terlihat (`outline: 2px solid --accent`), chevron berputar 180° (dimatikan pada `prefers-reduced-motion`). Tiap jawaban: satu penjelasan inti + satu `Contoh:`. Perilaku provider yang tidak terdokumentasi ditulis "tidak dipublikasikan".
- **Glosarium** — 14 istilah urut alfabetis dalam `<dl>` dua kolom (Cache → Token input / output), istilah `--ink` tebal, arti `--muted-strong`.

### 16.3 Responsif & tema

- >520px: Sering Tertukar 2 kolom kartu, Glosarium 2 kolom; ≤520px keduanya menjadi satu kolom dan dua istilah di dalam kartu ikut menumpuk vertikal — tidak ada dua kolom menyempit dan tidak ada geser horizontal.
- Warna sepenuhnya dari token tema yang sudah ada (`--bg`, `--card`, `--line`, `--ink`, `--muted`, `--muted-strong`, `--accent`, `--accent-light`, `--card-shadow`); Gelap, Terang, dan Hangat otomatis berlaku. Tanpa latar gradasi, glow, atau warna baru.
- Tipografi mengikuti aturan global: Fraunces untuk H2/subjudul, Inter untuk teks bacaan.

## 17. Sesi 6B — Poles Sering Tertukar, FAQ & Glosarium

> Hanya tampilan bagian bacaan Sesi 6 yang berubah. Isi teks, jumlah (10 pasangan / 8 FAQ / 14 istilah), makna, `models.js`, F1–F4, dan dock tidak disentuh. Tidak ada kolom pencarian, chip kategori, nav A–Z, tombol melayang, atau warna aksen kedua.

### 17.1 Sering Tertukar — perbandingan dua sisi

- Tiap pasangan menjadi grid `minmax(0,1fr) auto minmax(0,1fr)`: panel kiri = istilah pertama, lencana `vs` di tengah, panel kanan = istilah kedua.
- Kedua panel netral: `background-color: var(--card)` + `border: 1px solid var(--line)` + radius rumah. Kartu pembungkus pasangan tidak lagi berlatar/border (hanya pengelompok), sehingga tidak ada kartu di dalam kartu.
- Lencana `vs` kecil (pil 24px, mono 10px, `border: 1px solid var(--line)`, latar solid `--bg`) memakai `color: var(--accent)` — satu-satunya aksen pada pasangan; di tema Hangat otomatis menjadi tanah liat.
- Pasangan "Token reasoning = token output" tetap memakai penghubung `=` (bukan `vs`) agar maknanya tidak berubah.
- ≤520px: panel menumpuk satu kolom, lencana `vs` di antara keduanya (`justify-self: center`), tanpa dua kolom menyempit.

### 17.2 FAQ — baris akordeon ringan tanpa kotak

- Baris tetap dipisah hairline; tidak ada latar kartu pada keadaan tertutup.
- Nomor `01`–`08` di kiri: JetBrains Mono 11px, `font-weight: 500`, warna `--muted`, lebar tetap `1.4rem` agar pertanyaan sejajar.
- Teks pertanyaan `font-weight: 500` (bukan bold penuh); jawaban tetap fokus utama.
- Chevron diganti ikon plus SVG 12px; `transform: rotate(45deg)` saat `aria-expanded="true"` (menjadi ×). Hanya transisi transform + warna, dimatikan pada `prefers-reduced-motion: reduce`.
- Keadaan terbuka: `background-color: var(--card)` (permukaan solid satu tingkat dari latar `--bg`) + garis aksen 2px di sisi kiri lewat pseudo-element `::before` (tanpa menggeser tata letak), tanpa gradasi/glow/latar transparan berwarna.
- Jawaban menjorok sejajar teks pertanyaan (`margin-inline-start: calc(1.4rem + 10px)`), sehingga nomor tetap menjadi kolom kiri yang rapi.

### 17.3 Kartu Contoh menonjol

- Baris `Contoh:` di Sering Tertukar dan jawaban FAQ menjadi kotak kecil `border: 1px dashed var(--line)`, radius `--radius-sm`, latar transparan (bukan warna), padding 8×10px.
- Angka kunci di dalam kalimat contoh dibungkus `<strong class="contoh__angka">`: tebal + `color: var(--accent)`. Daftar potongan yang disorot disimpan sebagai field `sorot` per item (mis. `$0,003`, `$0,15`, `50×`, `21.10`, `100.000`, `207`, `3,5`, `$2/$10`, `150.000`, `100%`).
- Kalimat contoh tidak diubah satu huruf pun: `TeksContoh` hanya memecah teks pada potongan `sorot` lalu membungkus potongan itu.

### 17.4 Glosarium — daftar istilah

- Menjadi satu daftar vertikal (bukan grid dua kolom): tiap baris grid `180px minmax(0,1fr)` — istilah di kiri, definisi penuh di kanan.
- Nama istilah memakai Fraunces (`--font-heading`) 1rem `font-weight: 600`; definisi tetap Inter 13px `--muted-strong`, tampil penuh tanpa "selengkapnya", tanpa chip, tanpa nav A–Z.
- ≤520px: istilah di atas, definisi di bawah (`grid-template-columns: 1fr`).
- Urutan alfabetis dan isi definisi tidak berubah.

### 17.5 Label & jarak

- Tiap sub-bagian mendapat label kecil di atas judulnya: `01` / `02` / `03` (dekoratif, `aria-hidden`), JetBrains Mono 11px, `letter-spacing: 0.08em`, warna `--accent`; judul sub-bagian tetap Fraunces.
- Jarak judul ke isi dirapatkan (`margin-block-end: 8px`), jarak antar sub-bagian dilonggarkan (`margin-block-start: 32px`).
- Tidak ada token warna baru: semua memakai token tema yang sudah ada; aksen mengikuti tema (ungu Gelap/Terang, tanah liat Hangat).

## 18. Sesi 7 — Warna Ambang Bilah Jatah & Bilah Bagi Biaya F1

> Hanya tampilan panel Hasil F1 yang berubah. Rumus F1 tetap dua suku (input segar + output); cache tetap wilayah F2. F2–F4, FAQ & Glosarium, `models.js`, dan dock tidak disentuh.

### 18.1 Token semantik `--warn` / `--danger`

| Tema | `--warn` | Kontras vs kartu | `--danger` | Kontras vs kartu |
|---|---|---|---|---|
| Gelap | `#F5B942` | 10,10:1 | `#F87171` | 6,44:1 |
| Terang | `#B45309` | 5,02:1 | `#B91C1C` | 6,47:1 |
| Hangat | `#8A6100` | 5,54:1 | `#B3261E` | 6,54:1 |

- Warna solid, tanpa gradasi/glow. Gelap memakai amber/merah muda terang; Terang memakai amber/merah gelap. Hangat memakai **mustard gelap** agar peringatan tidak tertukar dengan aksen tanah liat `#D97757`.
- Kontras diukur terhadap latar kartu masing-masing (`#17171F` Gelap, `#FFFFFF` Terang/Hangat) dan semuanya ≥4,5:1 supaya angka persentase tetap terbaca.

### 18.2 Ambang bilah PEMAKAIAN JATAH

- Aturan dari persentase mentah (`usagePercentRaw`, boleh >100): **≤80% normal**, **>80% dan <100% peringatan**, **≥100% bahaya**. Lebar isian tetap dibatasi 0–100% (`usagePercent`), hanya label/ambang yang memakai nilai mentah.
- Keadaan diterapkan pada isian bilah dan angka persentase baru di baris meta (`20%`), bukan pada kartu/teks lain.
- Penanda uji stabil: atribut `data-ambang="normal|peringatan|bahaya"` pada track, isian, dan angka persen; kelas `usage-bar__fill--peringatan` / `usage-bar__fill--bahaya` pada isian; kelas `usage-bar__persen--peringatan` / `--bahaya` pada angka.
- Normal memakai `--accent` (isian) dan `--ink` (angka persen) seperti tampilan lama. `aria-valuenow` tetap 0–100; `aria-valuetext` menyebut persentase mentah.

### 18.3 Bilah bagi biaya per request (dua segmen)

- Diletakkan tepat di bawah baris Perkiraan Biaya (setelah blok baris hasil), memakai pola visual bar F2 dengan modifier `.cost-bar--f1`: track tipis 6px, dua segmen, legenda dua baris.
- Segmen **Input segar** = `var(--accent)`; segmen **Output** = `var(--muted)` (token netral yang sudah ada, bukan warna baru). Tiap segmen `min-width: 2px` agar porsi sangat kecil tetap terlihat.
- Legenda: swatch + nama + nominal + persen. Nominal memakai mata uang terpilih (`formatNilaiMataUang`, aturan hierarki Sesi 5B, tanpa pendamping); persen dari nilai tak-bulat dibulatkan untuk tampilan (boleh 99–101). Total per request tampil di meta (`BAGI BIAYA PER REQUEST`).
- Hanya tampil bila `result.isValid && biayaPerRequest > 0`; pada keadaan kosong/pesan ramah bilah dan legenda tidak dirender.
- Data turunan baru dari `hitungF1`: `biayaInput`, `biayaOutput`, `porsiInput`, `porsiOutput`, `usagePercentRaw`, `ambangPemakaian` — nilai `biayaPerRequest`, request, token, dan biaya tidak berubah.
