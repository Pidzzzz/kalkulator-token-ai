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

---

## Sesi 1H — Navigasi Dock Melayang (19 Nov 2026)

**Tujuan:** Menggantikan bilah tab segmented horizontal di header dengan dock melayang di bawah layar sebagai satu-satunya navigasi modul.

**Cakupan Rombakan:**
- **Pencabutan ModuleTabs:** Komponen `ModuleTabs` lama dicabut dari header dan alur halaman. Header kembali bersih dan hanya berfokus pada judul, subjudul, chip status, dan pengalih tema ikon.
- **Komponen DockNav:**
  - Posisi tetap (*fixed*) di bawah tengah layar (`bottom: calc(14px + env(safe-area-inset-bottom))`) dengan `z-index: 100`.
  - Permukaan solid `--card`, border 1px `--line`, sudut lengkung 24px, padding 6px, dan satu bayangan netral lembut tanpa blur/backdrop-filter/glow.
  - Tombol modul menampilkan badge mono ("F1".."F4") secara konsisten; hanya modul aktif yang memelar menampilkan label teks (*"Penerjemah Batas"*, *"Simulator Sesi"*, *"Token Teks"*, *"Data Model"*) dengan transisi `max-width` 0.3s halus.
  - Modul aktif menggunakan latar solid `--accent` dengan warna teks `--on-accent` (`#FFFFFF` untuk gelap & terang, `#141413` untuk hangat).
  - Modul nonaktif teks `--muted`, hover teks `--ink` tanpa efek membesar/terangkat.
  - Modul F2-F4 dilengkapi titik kecil penanda status di sudut tombol.
- **Manajemen Status & Perilaku:**
  - Modul F1 menampilkan modul masukan dan hasil perkiraan yang ada. Modul F2, F3, F4 menampilkan panel status kosong ringkas bertuliskan "Modul ini segera hadir."
  - URL hash sinkron dua arah (`#f1`..`#f4`). Modul awal ditentukan dari URL hash saat halaman pertama kali dibuka (default `#f1` jika tanpa hash). Perubahan URL via riwayat browser (*back/forward*) juga tersinkron otomatis via listener `hashchange`.
  - Navigasi keyboard: Panah kiri/kanan memindahkan fokus & modul secara melingkar; penekanan tombol keyboard F1-F4 langsung memicu perpindahan modul dengan `preventDefault()` guna mencegah perilaku bawaan peramban (seperti Help atau Find).
  - Aksesibilitas: Menggunakan role `tablist` & `tab`, atribut `aria-selected` dan `aria-controls`, outline fokus `--accent`, serta dukungan `prefers-reduced-motion`.
- **Ruang Bawah Konten:**
  - Wadah `.page` diberi `padding-block-end: calc(110px + env(safe-area-inset-bottom))` sehingga dock tidak pernah menutupi footer atau elemen halaman terbawah saat digulir.
- **Dokumentasi:** Dicatat ke DESIGN.md dan PROGRESS.md.

**Status:** ✅ Selesai — `npm run build` 0 error, commit `feat: navigasi dock melayang (Sesi 1H)`.

---

## Sesi 1I — Rumus & Asumsi Lebar Penuh + Sakelar Angka (19 Nov 2026)

**Tujuan:** Memindahkan blok "Rumus & Asumsi" keluar dari kartu Hasil Perkiraan menjadi bagian mandiri selebar penuh di bawah kedua panel, menampilkannya sebagai baris kode bernomor dengan sakelar "Simbol | Dengan angka", serta menyediakan tabel asumsi tiga kolom bebas scroll horizontal.

**Cakupan Rombakan:**
- **Penempatan Mandiri:** Blok Rumus & Asumsi dikeluarkan dari kartu Hasil Perkiraan menjadi komponen `FormulaSection` selebar penuh wadah di bawah `module-f1` dan di atas footer, menyatu dengan latar belakang dan dipisahkan garis rambut `--line`. Kartu Hasil kini murni berisi angka hasil, bar Pemakaian Jatah, dan tombol salin.
- **Rumus = Baris Kode Bernomor:**
  - Menampilkan baris kode monospace bernomor (nomor baris di kiri berwarna `--muted`), tetap mempertahankan aturan pembungkusan responsif dengan indentasi menggantung (Sesi 1D).
  - Pada tema Hangat, rumus tetap disajikan sebagai format prosa editorial alami.
- **Sakelar "Simbol | Dengan angka":**
  - Sakelar segmented ringkas di kanan atas blok rumus (aktif berlatar solid `--accent` teks `--on-accent`, nonaktif transparan teks `--muted`).
  - Mode *Simbol* (bawaan) menampilkan rumus simbolik murni.
  - Mode *Dengan angka* menampilkan rumus dengan angka contoh riil terpasang serta hasil antara tebal berwarna `--accent-light`:
    - `biaya_per_request = (10.000 × $3 + 2.000 × $15) ÷ 1.000.000 = $0,06`
    - `request = $10 ÷ $0,06 = 167`
  - Sakelar disembunyikan otomatis pada tema Hangat.
- **Tabel Asumsi Tiga Kolom:**
  - Menampilkan 3 kolom: *Parameter* (mono), *Nilai* (mono bold `--accent-light`), dan *Keterangan* (`--muted`) untuk parameter acuan `input`, `output`, dan `jatah`.
  - Responsif tanpa scroll horizontal: Pada layar sempit/HP (<=520px), tiap baris otomatis menumpuk (*stacked*): parameter dan nilai berdampingan di baris atas, keterangan di bawahnya.
- **Dokumentasi:** Dicatat ke DESIGN.md dan PROGRESS.md.

**Status:** ✅ Selesai — `npm run build` 0 error, commit `style: rumus & asumsi lebar penuh + sakelar angka (Sesi 1I)`.

---

## Sesi 2 — Fungsi F1 Penerjemah Batas (19 Nov 2026)

**Tujuan:** Menghidupkan F1: hitungan nyata di browser dari file data, hasil berubah seketika, rumus & asumsi memakai nilai berjalan, plus polish fungsi. Desain/tata letak Sesi 1–1I dipertahankan; F2–F4 tetap kosong.

**Cakupan:**
- **Lapisan data (`src/data/models.js`):** 15 model lintas 7 provider dengan `{ id, nama, provider, hargaInput, hargaOutput, hargaCache, konteks, sumber, cek }`; 6 preset paket (`opencode-go`, `claude-pro`, `claude-max`, `chatgpt-plus`, `gemini`, `kustom`) dengan jatah/kuota/jendela bawaan; daftar opsi jendela. Harga tidak di-hardcode di komponen.
- **Masukan F1 hidup:** preset mengisi Jatah, Total jatah paket, dan Jendela; semuanya tetap bisa diubah user. Dropdown Model memakai `optgroup` per provider dengan teks harga `"Claude 4 Sonnet — $3/$15 per 1 jt"`. Chip cepat `$5 · $10 · $20 · $50 · 25% · 50%` di bawah Jatah (chip persen mengambil dari total paket; nonaktif bila total tidak valid).
- **Asumsi bisa diedit:** token `input` dan `output` pada tabel asumsi menjadi isian angka di dalam tabel; setiap perubahan langsung menghitung ulang.
- **Fungsi murni (`src/utils/calculator.js`):** membaca `models.js`, menghitung biaya per request, request, total token, perkiraan biaya, dan persentase pemakaian. Tanpa suku cache (wilayah F2). Semua pembagian dilindungi dari nol.
- **Rumus & asumsi hidup:** mode “Dengan angka” memakai token, harga model terpilih, dan jatah sungguhan; tema Hangat menampilkan prosa dengan nilai hidup; tabel asumsi menampilkan harga & jatah berjalan.
- **Bilah pemakaian jatah:** lebar = jatah ÷ total kuota, label `"$X dari $Y"`; bilah disembunyikan bila total kosong/tidak valid.
- **Keadaan tepi:** jatah kosong/0 → “Isi jatah dulu untuk melihat perkiraan.”; harga model 0 → pesan ramah; token 0 → pesan ramah. Tidak ada `~0`, `NaN`, atau `Infinity`.
- **Polish:** count-up 250 ms untuk tiga angka hasil (menghormati `prefers-reduced-motion`); `tabular-nums` pada angka; tombol “Salin hasil” menyalin ringkasan teks dan menampilkan “Tersalin” ±1,8 detik; masukan F1 tersimpan di `localStorage` (`kalkulator-f1-input`); strip ringkas `~167 request · $10,00` muncul fixed di atas pada HP setelah panel Masukan terlewati.
- **Dokumentasi:** DESIGN.md (pola chip preset, tabel asumsi editable, strip sticky) dan AGENTS.md (status F1).

**Kasus uji wajib (terverifikasi lewat fungsi murni):**
`jatah $10 · input 10.000 @ $3 · output 2.000 @ $15` → biaya per request **$0,06**; request **~167**; total token **~2.004.000**; perkiraan biaya **$10,00**.

**Daftar harga yang MASIH PLACEHOLDER (verifikasi resmi = tugas F4):**

| Provider | Model | Harga input / output (per 1 jt token) |
|---|---|---|
| Anthropic | Claude 4 Sonnet | $3 / $15 |
| Anthropic | Claude 3.5 Haiku | $0,80 / $4 |
| Anthropic | Claude Opus 4 | $15 / $75 |
| OpenAI | GPT-4o | $2,50 / $10 |
| OpenAI | GPT-4o mini | $0,15 / $0,60 |
| OpenAI | o1 | $15 / $60 |
| OpenAI | o3-mini | $1,10 / $4,40 |
| Google | Gemini 2.5 Pro | $1,25 / $5 |
| Google | Gemini 2.0 Flash | $0,10 / $0,40 |
| DeepSeek | DeepSeek V3 | $0,14 / $0,28 |
| DeepSeek | DeepSeek R1 | $0,55 / $2,19 |
| Meta | Llama 3.3 70B | $0,60 / $0,80 |
| Mistral | Mistral Large | $2 / $6 |
| Mistral | Codestral | $0,20 / $0,60 |
| xAI | Grok 2 | $2 / $10 |

> Seluruh 15 baris di atas belum diverifikasi ke halaman resmi; `hargaCache`, `konteks`, nilai jatah/kuota preset, dan tanggal `cek` juga masih acuan awal. Jangan menganggapnya angka tagihan final.

**Status:** ✅ Selesai — `npm run build` 0 error, commit `feat: fungsi F1 Penerjemah Batas (Sesi 2)`.
