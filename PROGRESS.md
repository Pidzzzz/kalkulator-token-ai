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

---

## Sesi 2C — Data Model Terverifikasi 19 Nov 2026 (19 Nov 2026)

**Tujuan:** Mengganti seluruh isi data model dengan 23 baris harga terverifikasi dari halaman resmi tiap provider. Desain, komponen, rumus, fungsi hitung, dan preset paket tidak diubah.

**Cakupan:**
- **23 model / 9 provider** di `src/data/models.js`; seluruh baris lama (Claude 4 Sonnet, GPT-4o, Gemini 2.5 Pro, DeepSeek V3, Llama 3.3, Grok 2, dst.) dihapus — tidak ada lagi baris placeholder.
  - Anthropic 4 · OpenAI 4 · Google 4 · DeepSeek 2 · xAI 2 · Mistral 2 · Moonshot 2 · Z.ai 2 · Alibaba 1.
- **Sumber per provider & cek seragam `2026-11-19`:**
  - Anthropic — `https://platform.claude.com/docs/en/about-claude/pricing`
  - OpenAI — `https://developers.openai.com/api/docs/pricing`
  - Google — `https://ai.google.dev/gemini-api/docs/pricing`
  - DeepSeek — `https://api-docs.deepseek.com/quick_start/pricing` (tarif off-peak; jam sibuk 2x)
  - xAI — `https://docs.x.ai/developers/pricing`
  - Mistral — `https://mistral.ai/pricing/api`
  - Moonshot — `https://platform.kimi.ai`
  - Z.ai — `https://docs.z.ai/guides/overview/pricing`
  - Alibaba — Alibaba Cloud Model Studio, halaman pricing resmi (region Singapura)
- **Model bawaan** menjadi `claude-sonnet-5-5` (satu baris `DEFAULTS` di `src/utils/useF1State.js`).
- **Persistensi aman:** id model lama di `localStorage` (`kalkulator-f1-input`) tidak lagi cocok dengan data baru, sehingga validasi `models.some(...)` otomatis jatuh ke model bawaan baru — tidak kosong, error, atau NaN.
- **Preset tidak berubah sama sekali** (termasuk field `modelBawaan` lama; field ini belum dipakai UI). Dropdown model tetap otomatis memakai format `"Nama — $input/$output per 1 jt"` dari data.

**Kasus uji baru (terverifikasi lewat fungsi murni):**
`Claude Sonnet 5.5 ($2/$10) · jatah $10 · input 10.000 · output 2.000` → biaya per request **$0,04**; request **~250**; total token **~3.000.000**; perkiraan biaya **$10,00**.

**Status:** ✅ Selesai — `npm run build` 0 error, commit `data: perbarui models.js ke harga resmi 19 Nov 2026 (Sesi 2C)`.

---

## Sesi 2B — Dropdown Kustom Paket, Model, Jendela (19 Nov 2026)

**Tujuan:** Mengganti tiga `<select>` bawaan di panel Masukan dengan satu komponen dropdown kustom yang mengikuti 3 tema. Data, nilai masuk/keluar, rumus, dan persistensi tidak berubah.

**Cakupan:**
- **Satu komponen pakai-ulang** `src/components/Dropdown.jsx` untuk Paket, Model, dan Jendela — bukan tiga komponen terpisah. Opsi digerakkan data yang sudah ada (`presets`, `models` per provider, `jendelaOptions`); `onChange` meneruskan nilai yang sama seperti `<select>` sebelumnya.
- **Pemicu:** latar `--card`, border 1px `--line`, radius/tinggi/padding sama dengan kolom isian, teks kiri, chevron SVG 12px yang berputar 180° (150ms). Hover border `--muted`; `:focus-visible` cincin `--accent`. Khusus Model, imbuhan `— $2/$10` berwarna `--muted`, disembunyikan di lebar < 480px.
- **Panel:** absolute 6px dari pemicu, lebar sama, `--card` solid, border `--line`, radius sama, padding 5px, `max-height` 264px, gulir internal dengan scrollbar tipis bertema. Satu-satunya pengecualian bayangan: `0 8px 22px rgba(0,0,0,.22)` (hitam netral, bukan glow).
- **Arah buka adaptif:** membuka ke atas bila ruang bawah tidak cukup; ruang bawah dihitung sampai tepi atas dock `.dock-nav` (fixed), sehingga daftar Jendela tidak tertutup dock. `max-height` mengikuti ruang tersedia.
- **Baris:** padding 8px/9px, radius kecil; hover & baris aktif keyboard `--accent-soft`; baris terpilih memakai centang + teks `--accent-light` + latar `--accent-soft`. Judul grup provider kapital 10px `--muted` (khusus Model). Baris Model dua baris: nama `--ink` lalu `input $2 · output $10 · cache $0,10 per 1 jt` dalam JetBrains Mono 11px `--muted`. Paket & Jendela satu baris.
- **Animasi:** opacity + geser 2px, 140ms `ease-out`; `prefers-reduced-motion` menonaktifkan animasi dan rotasi chevron.
- **Perilaku & ARIA setara select:** klik pemicu buka/tutup, klik luar menutup, Esc menutup + fokus kembali, pilih baris menutup + menerapkan nilai; panah atas/bawah (melingkar), Enter/Spasi, Home/End, Tab menutup lalu lanjut, typeahead huruf awal (buffer 700ms, siklus huruf sama). Pemicu `aria-haspopup="listbox"` + `aria-expanded` + `aria-controls` + `aria-activedescendant`; panel `role="listbox"`; baris `role="option"` + `aria-selected`.
- **Penyesuaian tata letak kecil:** `.module-f1__input` diberi `position: relative; z-index: 20` karena `.card` memakai `container-type: inline-size` (stacking context sendiri) — tanpa ini panel bisa tertutup kartu Hasil.

**Berkas:**
- Baru: `src/components/Dropdown.jsx`.
- Diubah: `src/components/InputPanel.jsx` (tiga select → Dropdown, data opsi dimemo), `src/index.css` (gaya dropdown + z-index wrapper), `DESIGN.md` (Bagian 7), `PROGRESS.md` (bagian ini).

**Verifikasi:** `npm run build` 0 error. Tidak ada perubahan pada `models.js`, `calculator.js`, `useF1State.js`, atau komponen lain. Aplikasi tidak dijalankan dan tidak ada screenshot sesuai aturan sesi — verifikasi visual (3 tema, navigasi keyboard penuh, daftar Model menggulir, Jendela membuka ke atas, lebar HP) adalah tugas user.

**Status:** ✅ Selesai — `npm run build` 0 error, commit `feat: dropdown kustom untuk Paket, Model, dan Jendela (Sesi 2B)`.

---

## Sesi 2D-1 — Jendela Bawaan per Paket + Opsi "Per hari" (19 Nov 2026)

**Tujuan:** Jendela waktu ikut menyesuaikan saat paket dipilih, plus satu opsi baru "Per hari". Rumus F1, data model, dan desain lain tidak berubah.

**Cakupan:**
- Opsi Jendela sekarang berurutan: **Per 5 jam, Per hari, Per minggu, Per bulan** (`jendelaOptions` di `src/data/models.js`). Opsi `hari` otomatis muncul di dropdown Jendela karena daftar digerakkan data.
- Validasi `localStorage` (`kalkulator-f1-input`) memakai `jendelaOptions.some(...)`, bukan daftar tetap — nilai `hari` yang tersimpan tidak lagi jatuh ke bawaan.
- `DEFAULTS.jendela` menjadi `bulan` agar selaras dengan jendela bawaan paket OpenCode Go.
- `pilihPaket` hanya menulis `jendela` bila preset punya `jendelaBawaan`. Preset **Kustom** memakai `jendelaBawaan: null`, sehingga beralih ke Kustom **tidak** mengatur ulang jendela pilihan user. Setelah preset dipilih, user tetap bebas mengganti Jendela.

**Dasar tiap nilai jendela (dokumentasi resmi, dibaca 19 Nov 2026):**

| Paket | Jendela bawaan | Dasar |
| --- | --- | --- |
| OpenCode Go | Per bulan | Jatah paket berupa dolar bulanan; batas 5 jam dan mingguan adalah sub-batas dari kuota bulanan tersebut (dokumentasi OpenCode Go). |
| Claude Pro | Per 5 jam | Batas pemakaian Claude Pro dihitung per sesi 5 jam (ditambah batas mingguan) pada halaman bantuan penggunaan Claude. |
| Claude Max 5× | Per 5 jam | Pola batas sesi yang sama dengan Claude Pro, hanya kuota per sesi lebih besar. |
| ChatGPT Plus | Per 5 jam | Batas pemakaian Work/Codex dihitung per jendela 5 jam pada dokumentasi OpenAI Codex/ChatGPT Plus. |
| Gemini | Per 5 jam | Batas aplikasi Gemini untuk Google AI Pro dihitung per jendela 5 jam pada halaman bantuan Google. |
| Kustom | (tanpa bawaan) | Paket bebas: jendela milik user tidak boleh berubah hanya karena berpindah ke Kustom. |

**Berkas:** `src/data/models.js` (opsi `hari`, `jendelaBawaan` per preset, komentar dasar), `src/utils/useF1State.js` (bawaan `bulan`, validasi dinamis, guard Kustom), `PROGRESS.md`, `DESIGN.md`.

**Verifikasi:** `npm run build` 0 error. Aplikasi tidak dijalankan; verifikasi visual (ganti paket → Jendela ikut berubah, Kustom tidak mereset) adalah tugas user.

**Status:** Selesai — commit `feat: jendela bawaan per paket + opsi Per hari (Sesi 2D-1)`.

---

## Sesi 2D-2 — Konversi Mata Uang pada Perkiraan Biaya (19 Nov 2026)

**Tujuan:** Angka utama Perkiraan Biaya tetap USD, dengan konversi opsional di sampingnya. Rumus F1, input Jatah, chip, dan bilah pemakaian tetap USD.

**Cakupan:**
- **Data baru** `src/data/currencies.js`: 9 baris `{ kode, nama, kurs }` (kurs = nilai per 1 USD), semuanya `cek: "2026-11-19"`, `sumber: "Kurs tengah pasar (mid-market) dari tabel forex publik"`.
  - USD 1 · IDR 18.250 · EUR 0,91 · GBP 0,76 · JPY 160 · SGD 1,29 · MYR 4,11 · INR 93,3 · CNY 6,67.
- **Helper** `src/utils/currency.js`: `formatMataUang(nilaiUSD, kode)` memakai `Intl.NumberFormat("id-ID", { style: "currency", currency: kode })`; IDR & JPY dipaksa 0 desimal; spasi setelah simbol dirapatkan agar ringkas.
- **Tampilan:** baris Perkiraan Biaya menampilkan USD seperti sebelumnya, lalu `= Rp182.500` berwarna `--muted` ukuran 13px. `flex-wrap` membuatnya pindah ke bawah bila sempit. Bila USD dipilih, teks konversi disembunyikan.
- **Pemilih mata uang:** `Dropdown` Sesi 2B dengan prop baru `compact` di sisi kanan baris judul "Hasil Perkiraan"; label pemicu = kode terpilih. Panel ringkas rata kanan dengan lebar minimum 176px, baris menampilkan `KODE — Nama` + kurs `Rp18.250 per $1`.
- **Persistensi:** `localStorage` kunci `kalkulator-mata-uang`, bawaan IDR; kode tak dikenal jatuh ke IDR.
- **Salin hasil:** baris biaya menjadi `Perkiraan biaya: $10,00 (= Rp182.500)` bila bukan USD.
- **Tumpukan lapisan:** `.module-f1 > .card:has(.dropdown__panel) { z-index: 30 }` agar panel mata uang yang membuka ke atas tidak tertutup kartu Masukan (yang ber-`z-index: 20`).

**Kasus uji (fungsi murni, headless):** `formatMataUang(10, "IDR")` → `Rp182.500`; `formatMataUang(10, "EUR")` → `€9,10`; `formatMataUang(10, "USD")` → `US$10,00`.

**Berkas:** baru `src/data/currencies.js`, `src/utils/currency.js`; diubah `src/components/Dropdown.jsx` (`compact`, `triggerLabel`), `src/components/ResultPanel.jsx` (pemilih, konversi, persistensi, salin), `src/index.css` (baris judul kartu, dropdown ringkas, teks konversi, z-index), `PROGRESS.md`, `DESIGN.md`.

**Status:** Selesai — `npm run build` 0 error, commit `feat: konversi mata uang pada Perkiraan Biaya (Sesi 2D-2)`.

---

## Sesi 2D-3 — Dock Memudar saat Tidak Disentuh (19 Nov 2026)

**Tujuan:** Dock navigasi bawah meredup saat benar-benar diam, tanpa blur/kaca — hanya opacity, demi performa HP kelas bawah. Fungsi navigasi dan tampilan lain tidak berubah.

**Cakupan:**
- **Redup 0,55** setelah **2,5 detik** tanpa interaksi: pointer tidak di atas dock, fokus keyboard tidak di dalamnya, dan tidak ada sentuhan baru. Transisi opacity **250 ms**.
- **Bangun seketika ke opacity 1** saat pointer masuk, sentuhan/`pointerdown`, fokus masuk, atau berpindah modul. Setelah ganti modul, dock dijamin penuh **1 detik**, baru kemudian hitung diam 2,5 detik.
- **Reduced motion:** `prefers-reduced-motion: reduce` mematikan fitur — dock selalu opacity 1, tanpa transisi. Listener `matchMedia` dibersihkan saat unmount dan mengikuti perubahan setelan OS.
- **Fokus vs sentuhan:** hanya fokus `:focus-visible` yang menahan dock tetap penuh. Fokus sisa setelah tap di HP tidak membuat dock redup selamanya.
- **Tanpa kebocoran:** satu timer dijaga di `useRef`, selalu dibersihkan sebelum dijadwalkan ulang dan saat unmount; listener hover/fokus memakai event React di `<nav>`.
- **Keterbacaan 0,55:** teks tombol non-aktif memakai `--ink` saat redup, pil aktif tetap `--accent`/`--on-accent`, titik status tetap `--accent` — ketiganya bertahan di tema gelap, terang, dan hangat.
- **Hanya opacity:** tidak ada `backdrop-filter`, blur, atau efek kaca; latar dock tetap solid `--card`.

**Berkas:** `src/components/DockNav.jsx` (state redup, timer, listener pointer/fokus, guard reduced motion), `src/index.css` (opacity + transisi 250ms, keadaan redup, override reduced motion), `PROGRESS.md`, `DESIGN.md`.

**Verifikasi:** `npm run build` 0 error. Aplikasi tidak dijalankan; verifikasi visual (diam ±2,5 detik → meredup, sentuh → penuh, 3 tema) adalah tugas user.

---

## Sesi 2E — Logo Provider pada Judul Grup Dropdown Model (19 Nov 2026)

**Tujuan:** Judul grup provider di dropdown Model diberi logo satu warna. Murni kosmetik — data harga, perilaku dropdown, state, `localStorage`, dan rumus tidak berubah.

**Cakupan:**
- Berkas baru `src/data/providerIcons.js`: path SVG (viewBox 24x24) diambil apa adanya dari **Simple Icons** pada 19 Nov 2026, dipetakan dari nama `provider` di `models.js`.
- **Ikon asli (8):** Anthropic, OpenAI, Google, DeepSeek, xAI (mark X), Mistral, Moonshot, Alibaba (Alibaba Cloud).
- **Monogram (1):** Z.ai — tidak tersedia di Simple Icons; memakai chip kotak rounded 14px berborder hairline dengan huruf "Z" 9px `--muted`. Logo tidak dikarang.
- `Dropdown` menampilkan slot ikon 14px di semua judul grup (sejajar tengah, jarak 6px, `currentColor` + `--muted`), jatuh ke monogram bila provider tidak punya path. Pemicu, baris model, dan dropdown Paket/Jendela/Mata Uang tidak berubah.
- **Berkas:** baru `src/data/providerIcons.js`; diubah `src/components/Dropdown.jsx`, `src/index.css`, `PROGRESS.md`.

**Verifikasi:** `npm run build` 0 error; uji fungsi murni memastikan 9 provider terpetakan (8 ikon, 1 monogram). Aplikasi tidak dijalankan — verifikasi visual di 3 tema adalah tugas user.

**Status:** Selesai — commit `feat: logo provider pada judul grup dropdown Model (Sesi 2E)`.

---

## Sesi 3 — Fungsi F2 Simulator Sesi Agen (20 Nov 2026)

**Tujuan:** Membuat F2 hidup — mensimulasikan biaya satu sesi agen dari file data (`models.js`), lengkap dengan blok "Rumus & Asumsi" yang memakai nilai berjalan. F1 tidak diubah fungsinya; F3–F4 tetap status kosong.

**Model hitung** (`src/utils/calculatorF2.js`, fungsi murni):
```
konteks(r)  = konteks_awal + (r − 1) × pertumbuhan          r = 1..N
cache(r)    = konteks(r) × rasio_cache
segar(r)    = konteks(r) − cache(r)
output(r)   = output_per_putaran                            (tetap)
token_segar = Σ segar(r) · token_cache = Σ cache(r) · token_output = N × output
biaya       = token_segar/1jt × harga_input + token_cache/1jt × harga_cache
            + token_output/1jt × harga_output
rata-rata   = biaya / N · konteks_akhir = konteks_awal + (N − 1) × pertumbuhan
```
- Cache dibulatkan per putaran lalu sisa konteks menjadi segar, sehingga hasil eksak (14.000, bukan 13.999,999…) dan `cache + segar` selalu sama dengan konteks putaran itu.
- `parseToken` menerima titik ribuan (`"1.000.000"` → 1000000) — mencegah salah hitung dari isian bertitik. Koma tetap desimal.
- Fungsi menerima `harga` opsional (override) untuk kasus uji/F4 kelak; bila kosong memakai harga `models.js`.
- Semua pembagian dilindungi dari nol; putaran 0 / konteks 0 / harga 0 → `isValid: false` + pesan ramah.

**Kasus uji PRD (Sonnet 5.5, awal 10.000, tumbuh 2.000, 5 putaran, cache 80%, output 1.000/putaran, harga uji $2 / $0,20 / $10):**

| Butir | Hasil |
| --- | --- |
| Konteks per putaran | 10.000 / 12.000 / 14.000 / 16.000 / 18.000 |
| Token segar | 14.000 |
| Token cache | 56.000 |
| Token output | 5.000 |
| Total token | 75.000 |
| Biaya segar | $0,028 |
| Biaya cache | $0,0112 |
| Biaya output | $0,05 |
| **Total biaya** | **$0,0892** |
| Rata-rata per putaran | $0,01784 |
| Konteks akhir | 18.000 |

**Selisih harga cache kasus uji vs `models.js`:** kasus uji memakai `$0,20` per 1 jt, sedangkan `models.js` mencatat Claude Sonnet 5.5 = `$0,10` (cek 2026-11-19). Aplikasi selalu memakai `models.js`, jadi dengan bawaan yang sama totalnya **$0,0836** dan rata-rata **$0,0167**/putaran (segar $0,028 + cache $0,0056 + output $0,05). Angka kasus uji $0,0892 hanya cocok bila harga cache $0,20 — dibuktikan lewat uji fungsi dengan override harga, bukan dengan mengubah `models.js`.

**Cakupan UI:**
- **Masukan** (`SimulatorInput.jsx`): Model (Dropdown kustom bergrup per provider + logo + harga menempel, memakai `buatOpsiModel()` yang sekarang dipakai bersama F1), konteks awal, pertumbuhan/putaran, jumlah putaran, output/putaran, dan rasio cache (isian angka + slider 0–100 dua arah). Bawaan = kasus uji. Semua langsung menghitung ulang.
- **Hasil** (`SimulatorResult.jsx`): total biaya sesi (aksen) + konversi IDR, total token, **rata-rata per putaran** (wajib PRD), konteks akhir; bar tumpuk 3 segmen (segar `--accent` / cache `--accent-light` / output `--muted`) + legenda `$` per suku; peringatan `role="alert"` bila konteks akhir melebihi jendela model; tombol Salin di kaki kartu dengan status Tersalin.
- **Rumus & Asumsi** (`SimulatorFormula.jsx`): 4 baris simbol / 5 baris "Dengan angka" memakai nilai hidup (konteks awal, pertumbuhan, putaran, rasio, harga model terpilih), prosa untuk tema Hangat dengan nilai hidup, dan tabel asumsi yang bisa diedit di tempat (konteks awal, pertumbuhan, output per putaran, rasio cache).
- **Strip HP** (`SimulatorMobileStrip.jsx`): pola sticky F1, isi `$total · $rata-rata/putaran` (+ penanda konteks terlampaui).
- **Persistensi:** `localStorage` `kalkulator-f2-input` (validasi model & balik ke bawaan). Mata uang memakai kunci & pemilih ringkas yang sama dengan F1.
- **Navigasi:** titik status di tombol F2 dilepas karena modulnya kini hidup; F3–F4 tetap bertitik.

**Refaktor kecil (tanpa mengubah perilaku F1):** pembangun opsi dropdown dipindah ke `src/utils/opsi.js` (`buatOpsiModel/Paket/Jendela`) dan dipakai F1 + F2; logika salin papan klip dipindah ke `src/utils/uiHelpers.js`.

**Verifikasi:** `npm run build` 0 error. Aplikasi tidak dijalankan dan tanpa screenshot sesuai aturan sesi. Uji headless (mount komponen di DOM tiruan, 43 pemeriksaan) lulus semua: kasus uji eksak, ubah rasio cache (angka + bar + legenda), ubah putaran (angka + mode "Dengan angka" ikut berubah), peringatan konteks saat jendela model terlampaui, pesan ramah saat putaran kosong / konteks 0 (tanpa NaN/Infinity/~0), tombol Salin nonaktif saat kosong, teks salinan benar, dan prosa Hangat memakai nilai hidup.

**Berkas:** baru `src/utils/calculatorF2.js`, `src/utils/useF2State.js`, `src/utils/opsi.js`, `src/utils/uiHelpers.js`, `src/components/SimulatorInput.jsx`, `src/components/SimulatorResult.jsx`, `src/components/SimulatorFormula.jsx`, `src/components/SimulatorMobileStrip.jsx`; diubah `src/App.jsx` (modul F2), `src/components/InputPanel.jsx` (pakai `opsi.js`, tampilan sama), `src/components/DockNav.jsx` (titik F2), `src/index.css` (pola baru Sesi 3), `PROGRESS.md`, `DESIGN.md`.

**Status:** Selesai — `npm run build` 0 error.

---

## Sesi 3B — Pemformat Ribuan Isian Token F2 + 2 Perbaikan Label (20 Nov 2026)

**Tujuan:** Sesi kecil: isian token F2 tampil bertitik ribuan id-ID, plus dua label hasil yang janggal. Desain & fungsi lain tidak diubah; F1 tidak disentuh.

**Cakupan:**
- **Pemformat ribuan** (`src/utils/angkaIsian.js` + komponen `src/components/TokenInput.jsx`): Konteks awal, Pertumbuhan / putaran, dan Output / putaran kini tampil "10.000 / 2.000 / 1.000" termasuk saat mengetik. State tetap teks terformat, hitungan memakai `parseAngkaIsian` (buang non-digit & titik ribuan; koma = desimal). Kursor dijaga hanya saat isian difokuskan. Jumlah putaran & rasio cache **tidak** diformat. Tabel asumsi F2 ikut memakai pemformat sama.
- **Keadaan tepi dikencangkan:** isian Konteks awal atau Output yang dikosongkan sekarang memunculkan "Isi masukan dulu untuk melihat perkiraan sesi." (sebelumnya konteks kosong + output terisi masih dihitung sebagai sesi valid dengan konteks 0 — angka menyesatkan).
- **Poin 2 — label rata-rata:** temuan nyata. `SimulatorResult` menerima `jumlahPutaran={f2.putaran}` berupa teks mentah, sehingga nilai kosong/non-angka menjadi "— putaran" lewat `formatToken`. Kini baris itu membaca hasil hitung (`dari N putaran`); prop teks dihapus dari `App.jsx` agar tidak ada jalur teks mentah tersisa.
- **Poin 3 — legenda bar tumpuk:** temuan nyata. Nama suku cache menempelkan persen rasio ("Cache 80%") sementara Segar/Output polos, dan bila rasio kosong menjadi "Cache —%". Dipilih: **tampilkan persen porsi biaya untuk ketiga suku** (Segar/Cache/Output) di ujung tiap baris; persen rasio cache dihapus dari legenda karena sudah terbaca di masukan/slider.

**Verifikasi:** `npm run build` 0 error. Aplikasi tidak dijalankan dan tanpa screenshot. Uji headless (mount komponen di DOM tiruan, 27 pemeriksaan) lulus: ketikan "10000" tampil "10.000" dan hasil tidak berubah; ubah ke "1.000" → total 30.000; ketik "1234567" → "1.234.567"; isian kosong → pesan ramah tanpa NaN/Infinity; muat ulang dari `localStorage` (12000/2500) tampil "12.000"/"2.500"; label "dari 5 putaran" tanpa "— putaran"; ketiga legenda berakhiran % dengan jumlah ≈100%; tabel asumsi "10.000/2.000/1.000". Kasus uji Sesi 3 (biaya $0,0892 dengan harga uji) tetap sama.

**Berkas:** baru `src/utils/angkaIsian.js`, `src/components/TokenInput.jsx`; diubah `src/components/SimulatorInput.jsx`, `src/components/SimulatorFormula.jsx`, `src/components/SimulatorResult.jsx`, `src/utils/calculatorF2.js`, `src/App.jsx`, `src/index.css`, `PROGRESS.md`, `DESIGN.md`.

**Status:** Selesai — `npm run build` 0 error.

---

## Sesi 3C — Preset Skenario + Microcopy F2 (20 Nov 2026)

**Tujuan:** Pemula tidak tahu angka apa yang harus diisi di F2. Dua penambahan kecil yang meniru pola F1 (chip preset + teks muted penjelas). F1 tidak disentuh; F3–F4 tetap "segera hadir"; rumus `calculatorF2.js` tidak berubah.

**Cakupan:**
- **Microcopy satu baris** di bawah tiap label isian angka F2 (Konteks awal, Pertumbuhan / putaran, Jumlah putaran, Output / putaran, Rasio cache) — memakai kelas `.form-hint` yang sudah ada (11px, `--muted`, line-height 1.35), tanpa warna/ukuran/ikon baru. Isian Model tidak diberi microcopy.
- **Tiga chip skenario** di bawah judul panel, di atas isian Model: label kecil muted "Contoh sesi:" + "Sesi singkat", "Sesi ngoding biasa", "Sesi maraton". Gaya chip sama persis dengan `.preset-chip` F1.
  - Satu klik mengisi kelima isian angka sekaligus (`pilihSkenario` di `useF2State.js`), hasil dihitung ulang seketika, tersimpan di `kalkulator-f2-input` dengan kunci yang sama.
  - **Model tidak diubah.** Chip murni aksi isi-sekali — tidak ada status aktif/terpilih, semua isian tetap bebas diubah.
  - Bawaan aplikasi tidak berubah: tanpa klik tetap 10.000 / 2.000 / 5 / 80% / 1.000.
- Jarak panel Masukan F2 dirapatkan sedikit (`.module-f2 .input-form` gap 8px, `.form-group` gap 3px) agar penambahan microcopy tetap kompak sesuai DESIGN.md.

**Uji wajib (headless, 31 pemeriksaan) — semua lulus:**
1. "Sesi singkat" → 8.000 / 1.500 / 5 / 80% / 800, konteks akhir 14.000.
2. "Sesi ngoding biasa" → konteks akhir 72.000.
3. "Sesi maraton" + Mistral Medium 3.5 → konteks akhir 315.000, peringatan muncul; ganti ke Sonnet 5.5 → peringatan hilang.
4. Kasus uji Sesi 3 tetap: $0,0892 / 75.000 token / $0,01784 per putaran.
5. Kelima microcopy tampil persis; tidak ada "—%", "— putaran", "Cache —", NaN/Infinity/undefined.

**Berkas:** diubah `src/components/SimulatorInput.jsx` (chip + microcopy), `src/utils/useF2State.js` (`PRESET_SKENARIO_F2`, `pilihSkenario`), `src/App.jsx` (sambung aksi), `src/index.css` (baris chip & kerapatan panel).

**Cek visual (tugas pemilik):** chip di 3 tema + wrap di HP sempit, jarak microcopy terhadap label & isian, strip hasil sticky di HP tetap bekerja.

**Status:** Selesai — `npm run build` 0 error.

---

## Sesi 3D — Judul Ringkas + Byline + Animasi Masuk Header (20 Nov 2026)

**Tujuan:** Header dipersempit ke inti: judul ringkas, kredit pembuat, dan animasi masuk sekali saat halaman dimuat. Hanya header & `<title>` yang berubah — modul F1–F4, panel, rumus, data, dan footer tidak disentuh.

**Cakupan:**
- **H1** menjadi persis "Kalkulator Token" (Fraunces, 1.688rem, bobot 700, satu baris — tidak diperbesar).
- **Byline** `by Pidos` tepat di bawah H1, di dalam blok judul bersama H1 (baris H1–byline satu kesatuan; pengalih tema tetap di kanan baris judul). "by" 12px `--muted`, "Pidos" semibold `--ink` menuju https://github.com/Pidzzzz (`target="_blank"`, `rel="noopener noreferrer"`); hover/fokus ke `--accent` + garis bawah; bukan pil/tombol; tanpa fon/warna baru.
- **Subjudul & tiga badge** tidak berubah.
- **Animasi masuk** `@keyframes headerIn` (dari `opacity: 0` + `translateY(0.25em)`), `.header__in` 0.8s `ease-out` `both`, jeda berjenjang H1 0s → byline 0.1s → subjudul 0.2s → badge 0.3s. Hanya transform & opacity; tanpa loop; murni CSS (tidak bergantung state React, jadi tidak terpicu ulang saat berpindah modul/ganti tema — header tidak di-remount). `@media (prefers-reduced-motion: reduce)` mematikan animasi sepenuhnya.
- **`<title>`** menjadi "Kalkulator Token"; meta description, repo, README, About tidak diubah.

**Uji wajib (headless, 27 pemeriksaan) — semua lulus:**
1. H1 persis "Kalkulator Token", tanpa sisa "Request AI", satu baris.
2. Byline "by Pidos" tepat di bawah H1, tautan ke https://github.com/Pidzzzz, bukan pil/tombol, gaya muted+semibold/ink.
3. `<title>` = "Kalkulator Token"; meta description utuh.
4. `headerIn` ada (2 properti saja), 0.8s ease-out both, jeda 0/0.1/0.2/0.3s, keempat elemen memakai kelasnya, blok reduced-motion mematikan; header tidak me-remount saat pindah modul (F3 tetap "segera hadir").
5. Subjudul & tiga badge sama; bawaan F1 utuh (request 250, biaya $10); bawaan F2 10.000 / 2.000 / 5 / 80% / 1.000; kasus uji Sesi 3 tetap $0,0892 / 75.000 token / $0,01784.

**Berkas:** `src/components/Header.jsx`, `src/index.css`, `index.html`, `PROGRESS.md`.

**Cek visual (tugas pemilik):** animasi berjenjang di 3 tema (Gelap/Terang/Hangat), header & pengalih tema di HP sempit (byline tidak mendorong pengalih aneh), dan perilaku saat "kurangi gerak" OS aktif (header tampil langsung).

**Status:** Selesai — `npm run build` 0 error.

---

## Sesi 3E — Byline Ganda + Judul Dua Warna (20 Nov 2026)

**Tujuan:** Membereskan laporan pemilik bahwa byline "by Pidos" tampak dua kali, sekaligus menyamarkan byline dan membuat H1 dua nada. Hanya header yang disentuh.

**Temuan byline ganda:** setelah menelusuri seluruh sumber, **tidak ada byline ganda di kode**. `src/components/Header.jsx` menulis elemen byline tepat sekali, `index.html` tidak punya byline, riwayat git hanya satu commit menambahkan `Pidos` (Sesi 3D), dan bundle yang sedang live di GitHub Pages memuat tepat satu byline. Yang dirender pun satu elemen. Penyebab yang paling mungkin: **byline terlipat jadi dua baris** ("by" di baris pertama, "Pidos" di baris kedua) saat wadahnya menyempit — mis. dua kolom isian berjejer + pengalih tema di HP — sehingga terbaca seperti dua byline bertumpuk. Perbaikan di sumber tampilan: byline kini `white-space: nowrap` sebagai **satu elemen utuh** (tetap membawa kelas animasi `header__in--2`).

**Cakupan:**
- **Byline lebih samar:** seluruh baris (kata "by" + tautan "Pidos") `opacity: 0.6`; saat hover/fokus tautan kembali `opacity: 1` dan nama berubah ke `--accent` + garis bawah seperti sebelumnya. Warna tetap `--muted`/`--ink` tema, ukuran tetap 0.75rem.
- **Lantai keterbacaan per tema:** pada tema berlatar terang, `--muted` + 0,6 jatuh ke ±2,8:1 (Terang) dan ±2,4:1 (Hangat) di atas `--bg` — terlalu redup. Karena syarat "tetap terbaca di ketiga tema" lebih keras daripada angka opacity, diberi override **Terang 0,85** dan **Hangat 0,9** (Gelap tetap 0,6). Hasil kontras: Gelap 3,32:1 · Terang 4,90:1 · Hangat 4,20:1. Tetap lebih samar dari teks biasa dan tetap menguat ke 1 saat hover/fokus; tanpa warna baru.
- **Judul dua nada:** H1 dipecah dua span — "Kalkulator" `var(--ink)`, "Token" `var(--accent)` (ungu di Gelap/Terang, mengikuti aksen di Hangat). Fon Fraunces, ukuran 1.688rem, bobot 700, dan spasi tidak berubah; tanpa italic/gradasi/glow; tanpa heks/rgb baru di CSS header.
- **Tidak berubah:** `<title>`, animasi `headerIn` (0.8s ease-out both, jeda 0/0.1/0.2/0.3s), blok `prefers-reduced-motion`, subjudul, badge, F1–F4.

**Uji wajib (headless, 32 pemeriksaan) — semua lulus:**
1. Elemen byline di header = **1**, teks "by Pidos", tautan https://github.com/Pidzzzz, sumber menulis sekali, nowrap.
2. Opacity 0,6 ada; hover/fokus → 1 (+ aksen); ukuran teks tetap.
3. H1 dua span: "Kalkulator" `--ink`, "Token" `var(--accent)`; tanpa warna hardcode di CSS header; tanpa italic/gradasi; ukuran & bobot sama.
4. `<title>` = "Kalkulator Token"; `headerIn` + jeda berjenjang + reduced-motion utuh; keempat elemen tetap beranimasi.
5. Bawaan F2 10.000 / 2.000 / 5 / 80% / 1.000; kasus uji Sesi 3 tetap $0,0892; bawaan F1 utuh. Bonus: kontras byline ≥3:1 di ketiga tema.

**Berkas:** `src/components/Header.jsx`, `src/index.css`, `PROGRESS.md`.

**Cek visual (tugas pemilik):** byline satu baris saat samar di 3 tema (terutama Terang & Hangat) dan saat hover/fokus; "Token" berwarna aksen di ketiga tema tanpa mengubah ritme H1; header di HP sempit.

**Status:** Selesai — `npm run build` 0 error.

---

## Sesi 3F — Dock Menimpa Konten + Teks Kecil + Kontras Isian (20 Nov 2026)

**Tujuan:** Membereskan dock melayang yang menutupi strip hasil dan bagian bawah panel, menaikkan keterbacaan legenda biaya & teks bantuan, serta membedakan isian dari latar kartu. Hanya CSS; rumus/data/logika tidak disentuh, F3/F4 tetap kosong.

**Cakupan:**
- **Dock tidak lagi menimpa konten:** `.page` → `padding-block-end: calc(92px + env(safe-area-inset-bottom, 0px))`. Perhitungan: jarak dock ke bawah 14px + tinggi dock 52px + aman 24px = 90px minimum, dipakai 92px agar ada kelonggaran. Tinggi dock dihitung dari CSS-nya: border 1px×2 + padding 6px×2 + tombol 38px = 52px.
- **Strip hasil F1 & F2 di atas dock:** `.mobile-result-strip` (dalam `@media (max-width: 679px)`) kini `top: auto` dan `bottom: calc(64px + safe-area)` = tinggi dock 52px + 12px. Animasi masuk dibalik ke dari bawah (`translateY(8px)` saat tersembunyi). Perilaku muncul/hilang tetap sama (kelas `--visible`: opacity 1, visibility visible, transform none, pointer-events auto). Kedua modul memakai kelas yang sama; z-index strip 90 < dock 100.
- **Teks kecil:** `.form-hint`, `.cost-legend__item`, `.cost-legend__persen` → 12px (0.75rem) dan warna `--muted-strong` (satu tingkat dari muted menuju ink).
- **Isian:** `.form-input`/`.form-select`, `.assumptions-input` (TokenInput & `.form-input--rasio` ikut mewarisi), dan `.dropdown__trigger` memakai `background-color: var(--field)` + `border: 1px solid var(--field-line)`. Fokus = `border-color: var(--accent)` + `box-shadow: 0 0 0 3px var(--field-ring)` (ring 3px aksen ±25%, tanpa blur/gradasi).

**Token turunan tema baru (dihitung dari palet yang ada):**

| Tema | `--muted-strong` | `--field` | `--field-line` | `--field-ring` |
|---|---|---|---|---|
| Gelap | #B9B3C6 | #28282B | #4A475F | #302A54 |
| Terang | #3A465E | #DFE1E6 | #AFBDCD | #BDBAE4 |
| Hangat | #565550 | #E8E7E3 | #C4C0B0 | #F3DDD5 |

**Uji wajib (headless):**
1. `.page` padding-bottom 92px ≥ 52 + 24 = 76px, plus safe-area; tidak ada media query yang menimpanya.
2. Strip `bottom: 64px` > tinggi dock 52px, selisih 12px; `top: auto`; tidak ada lagi aturan `top` pada strip.
3. Legenda & hint 12px; kontras `--muted-strong` vs kartu: Gelap 8,76:1 (muted lama 6,79), Terang 9,47:1 (7,58), Hangat 7,47:1 (5,43); tetap di bawah ink (14,98 / 17,85 / 18,43).
4. Gelap: isian #28282B vs kartu #17171F (1,21:1), garis #4A475F (1,65:1) lebih tegas dari `--line` #38364A (1,26:1); teks ink di atas isian 12,36:1. Aturan fokus (border aksen + ring 3px) ada untuk isian, select, assumptions-input, dan dropdown trigger.
5. Regresi: pill dock aktif tetap menampilkan label tanpa hover; F1 250 request / $10,00; F2 $0,0892 ($0,01784/putaran); bawaan F1 & F2 tidak berubah.

**Berkas:** `src/index.css`, `PROGRESS.md`.

**Status:** Selesai — `npm run build` 0 error.

---

## Sesi 4 — Fungsi F3 Penghitung Token Teks (20 Nov 2026)

**Tujuan:** Membuat F3 hidup — menempel teks lalu mendapat perkiraan jumlah token per keluarga model, biaya masukan, pemakaian jendela konteks, dan tabel perbandingan 9 keluarga. F1 & F2 tidak disentuh; F4 tetap "segera hadir".

**Mesin perkiraan** (`src/utils/calculatorF3.js`, fungsi murni):
```
jumlah_karakter           = teks.length            (termasuk spasi & baris baru)
jumlah_kata               = potongan non-kosong hasil pisah spasi/baris baru
perkiraan_token(keluarga) = ceil(jumlah_karakter ÷ faktor_keluarga)
biaya_masukan             = perkiraan_token ÷ 1.000.000 × harga_input model
persen_konteks            = perkiraan_token ÷ konteks model × 100
```
- Faktor per penyedia disimpan di **berkas data baru `src/data/tokenFaktor.js`** (satu baris per penyedia: `id` = `provider` di `models.js`, `faktor`, `keterangan`): Anthropic 3,5 · DeepSeek 3,5 · OpenAI 4,0 · Google 4,0 · xAI 4,0 · Mistral 3,8 · Moonshot 3,8 · Z.ai 3,8 · Alibaba 3,8.
- **Faktor adalah kalibrasi awal aturan praktis, bukan tokenizer resmi.** Tidak ada BPE/pustaka penokenan, tidak ada hitungan token keluaran, tanpa unggah berkas & riwayat teks.
- **Kandidat penyempurnaan (untuk F4):** faktor per keluaran penokenan dihitung ulang dengan tokenizer resmi (mis. dihitung ulang dari contoh prosa Bahasa Indonesia vs kode vs Bahasa Inggris); faktor dibedakan per model bila keluarga berselisih; hitungan kata mengikuti tokenizer (bukan sekadar pisah spasi); ringkasan salin menyertakan perbandingan semua keluarga.

**Cakupan UI:**
- **Masukan** (`TeksInput.jsx`): Dropdown Model (data & komponen sama dengan F1/F2, bawaan `claude-sonnet-5-5`), satu textarea besar (min 8 baris, `resize: vertical`) dengan microcopy di bawah label, tombol `Contoh teks` (mengisi teks contoh terkunci) dan `Bersihkan`. Teks + model tersimpan di `kalkulator-f3-input`; kuota penuh diabaikan diam-diam.
- **Hasil** (`TeksResult.jsx`): PERKIRAAN TOKEN (hero `--accent` + pil ESTIMASI + label perkiraan), JUMLAH KARAKTER, JUMLAH KATA, PERKIRAAN BIAYA MASUKAN (+ konversi muted dari keadaan mata uang bersama), bilah pemakaian jendela konteks (`±60 dari 1.000.000 token jendela konteks`, persen 2 desimal / `<0,01%`), peringatan konteks gaya F2 bila terlampaui, tabel perbandingan 9 keluarga (baris penyedia terpilih disorot `--accent-soft`/`--accent-light`), dan `Salin hasil` yang menyalin **angka saja**.
- **Metode & Asumsi** (`TeksFormula.jsx`): pita selebar halaman pola Sesi 1I — rumus bernomor, sakelar Simbol | Dengan angka (hilang di tema Hangat, prosa memakai nilai hidup), tabel faktor 9 keluarga, catatan kejujuran 3 paragraf sebagai teks biasa.
- **Strip HP** (`TeksMobileStrip.jsx`): kelas `.mobile-result-strip` bersama, menempel di atas dock (posisi Sesi 3F).
- **Dock:** titik status F3 dicabut, label pill aktif menjadi "Penghitung Token"; titik F4 tetap; hash `#f3` & tombol keyboard F3 bekerja.

**Uji wajib (headless: fungsi murni + komponen di-mount di DOM jsdom, 56 + 10 pemeriksaan) — semua lulus:**
1. Klik "Contoh teks" → jumlah karakter **207**, jumlah kata **29**.
2. Perkiraan per keluarga: Anthropic **60**, OpenAI **52**, Google **52**, DeepSeek **60**, Mistral **55**, Moonshot **55**, Z.ai **55**, Alibaba **55**, xAI **52**.
3. Model bawaan Claude Sonnet 5.5 → perkiraan utama **60 token**; biaya masukan **$0,00012** (bukan `$0,00`); konversi **Rp2** (kurs 18.250); pemakaian konteks `±60 dari 1.000.000` dengan `<0,01%`.
4. Teks dikosongkan → pesan ramah tampil, tabel perbandingan hilang, tombol Salin nonaktif, tidak ada `NaN`/`Infinity`/`undefined`.
5. Regresi: F1 bawaan tetap 250 request & $10,00; F2 kasus Sesi 3 tetap $0,0892; dock F3 tanpa titik, F4 bertitik; hash #f1/#f2/#f4 utuh.

**Format khusus:** biaya masukan 2 desimal, tetapi bila > 0 dan terbulatkan `$0,00` dipakai s.d. 6 desimal tanpa nol ekor (`$0,00012`); persen konteks `<0,01%` di bawah 0,01%.

**Berkas:** baru `src/data/tokenFaktor.js`, `src/utils/calculatorF3.js`, `src/utils/useF3State.js`, `src/components/TeksInput.jsx`, `src/components/TeksResult.jsx`, `src/components/TeksFormula.jsx`, `src/components/TeksMobileStrip.jsx`; diubah `src/App.jsx` (modul F3 + strip), `src/components/DockNav.jsx` (titik F3, label pill), `src/index.css` (textarea, tabel perbandingan, catatan metode), `AGENTS.md` (status F3), `DESIGN.md` (Bagian 12), `PROGRESS.md`.

**Cek visual (tugas pemilik):** textarea & tombol kecil di 3 tema (Gelap/Terang/Hangat) termasuk ring fokus; tabel perbandingan + sorotan baris terpilih di kartu yang sempit; keadaan kosong; strip HP di atas dock saat digulir; pita Metode & Asumsi (sakelar hilang di Hangat, rumus membungkus tanpa geser horizontal di 360px).

**Status:** Selesai — `npm run build` 0 error, commit `feat: fungsi F3 Penghitung Token Teks (Sesi 4)`.
---

## Sesi 4B - Pita Metode Bisa Dilipat + Tabel Faktor Ringkas (20 Nov 2026)

**Aturan desain (keputusan pemilik):** "Pita metode bawaan selalu terbuka (kewajiban PRD); lipatan adalah pilihan pengguna yang tersimpan per modul - keputusan pemilik 20 Nov 2026."

**Bagian A - Lipatan seragam F1/F2/F3**

- Baris judul pita kini `<button>` asli selebar baris (`.pita-toggle`): judul pita + chevron rumah di ujung kanan (`--muted-strong`, berputar 180 derajat saat tertutup), `aria-expanded` + `aria-controls` menunjuk ke wilayah isi, ring fokus rumah, hover hanya mengubah chevron/judul ke `--ink`. Sakelar Simbol | Dengan angka dirender sebagai **saudara** tombol (`.pita-header__aksi`), bukan di dalamnya, supaya tidak ada tombol bersarang.
- Keadaan awal **selalu terbuka**. Lipatan disimpan per modul di localStorage kunci bersama `kalkulator-pita` = `{ f1, f2, f3 }` boolean (bawaan semua `true`); kegagalan penyimpanan diabaikan diam-diam; melipat F3 tidak memengaruhi F1/F2; antar-tab disinkronkan lewat event `storage`.
- Isi pita TIDAK dilepas dari DOM saat tertutup - hanya diberi atribut `hidden` (aksesibel, keluar dari pohon aksesibilitas & urutan fokus), jadi sakelar Simbol/Dengan angka tetap pada pilihannya setelah dibuka lagi.
- Transisi tinggi + opacity 250ms (`interpolate-size: allow-keywords` + `transition-behavior: allow-discrete`); dimatikan total di `@media (prefers-reduced-motion: reduce)`. Tanpa glow, tanpa latar baru. Garis rambut pemisah menempel pada baris judul sehingga tetap tampil saat terlipat.

**Bagian B - Tabel faktor F3 diringkas (hanya pita Metode F3)**

- 9 baris menjadi **3 baris terkelompok** yang DITURUNKAN dari `src/data/tokenFaktor.js` lewat `kelompokFaktor()` (bukan tabel ketik tangan). Urut menaik: `3,5 -> Anthropic · DeepSeek`, `3,8 -> Mistral · Moonshot · Z.ai · Alibaba`, `4,0 -> OpenAI · Google · xAI`.
- Dua kolom saja: "Faktor (karakter/token)" dan "Keluarga"; kolom Keterangan yang berulang dihapus. Di bawah tabel satu baris catatan: "Faktor adalah aturan praktis karakter-per-token; bukan tokenizer resmi penyedia." (konstanta `CATATAN_FAKTOR` di `tokenFaktor.js`).
- Tiga catatan kejujuran tidak berubah kata-katanya. Tabel perbandingan per keluarga di kartu Hasil F3 tetap 9 baris.

**Uji wajib (headless, jsdom + esbuild bundle di luar repo) - 49 asersi lulus, 0 gagal**

1. Penyimpanan bersih: F1, F2, F3 semua `aria-expanded=true` dan isi tampil. LULUS
2. Lipat F3 -> isi `hidden`, `aria-expanded=false`, `kalkulator-pita={"f1":true,"f2":true,"f3":false}`; muat ulang tetap tertutup; F1 & F2 tetap terbuka. LULUS
3. Buka lagi F3 -> muat ulang -> tetap terbuka (`{"f1":true,"f2":true,"f3":true}`), persisten dua arah. LULUS
4. F1: sakelar "Dengan angka" -> lipat -> buka lagi -> sakelar masih "Dengan angka" dan baris rumus angka hidup tetap tampil (isi tetap di DOM saat terlipat). LULUS
5. Tabel faktor tepat 3 baris dengan pengelompokan di atas, dua header tanpa Keterangan, satu baris catatan faktor, tiga catatan kejujuran utuh, tabel Hasil tetap 9 baris. LULUS
6. Regresi angka: F1 250 request/$10,00; F2 $0,0892; F3 207 karakter -> Anthropic 60, OpenAI 52, Mistral 55. CSS memuat pengaman `prefers-reduced-motion` untuk `.pita-body`. LULUS

**Berkas:** baru `src/utils/usePitaTerbuka.js`, `src/components/PitaHeader.jsx`, `src/components/PitaBody.jsx`; diubah `src/components/FormulaSection.jsx`, `src/components/SimulatorFormula.jsx`, `src/components/TeksFormula.jsx` (`kelompokFaktor` + tabel 3 baris), `src/data/tokenFaktor.js` (`CATATAN_FAKTOR`), `src/index.css` (blok "Sesi 4B" + `.metode-table` dua kolom + tumpukan <=520px), `DESIGN.md` (Bagian 13), `PROGRESS.md`.

**Cek visual (tugas pemilik):** rasa tombol lipat di 3 tema (Gelap/Terang/Hangat, termasuk varian prosa Hangat di mana sakelar disembunyikan), lebar 360px (tabel faktor menumpuk, judul + chevron tidak terpotong), fokus keyboard pada baris judul, dan denyut animasi 250ms vs langsung di mode reduced-motion.

**Status:** Selesai - `npm run build` 0 error, commit `feat: pita metode bisa dilipat + tabel faktor ringkas (Sesi 4B)`.

## Sesi 5 - F4 Basis Data Model & Harga (21 Nov 2026)

**Tujuan:** mengganti halaman "segera hadir" F4 dengan tabel basis data model yang bisa diedit di tempat, dan menjadikannya satu-satunya sumber data model untuk F1-F3.

**Lapisan data kustom (pola baru, dipakai ulang)**

- Satu sumber: `src/utils/lapisanModel.js`. Nilai bawaan selalu dari `src/data/models.js`; localStorage `kalkulator-models-kustom` **hanya menyimpan selisih**, bentuknya `{ ubah: { [id]: { field: nilai } }, tambah: [modelUtuh] }`. Tidak pernah menyimpan salinan tabel penuh, jadi perubahan harga di `models.js` tetap masuk ke pengguna lama.
- `gabungModel(lapisan)` = bawaan + patch, lalu model tambahan di ujung. `normalisasiSimpanan()` membuang field tak dikenal, angka `NaN`/`Infinity`/negatif, dan konteks bukan bilangan bulat positif, sehingga data lokal yang rusak tidak pernah menghasilkan `NaN`.
- Store kecil dengan `useSyncExternalStore`: `getModels()` (snapshot stabil), `lapisanSaatIni()` (objek stabil `{ ubah, tambah, kosong }`), `langgananModel(listener)`. Penulis (F4) dan pembaca (F1-F3) memakai store yang sama, jadi edit harga langsung mengubah hitungan tanpa tombol Hitung.
- `src/utils/useModels.js`: `useModels()` (baca reaktif) dan `useSinkronModel()` (satu listener `storage` per halaman agar edit antar-tab ikut tampil).
- Aksi: `ubahSel`, `resetBaris`, `tambahModel`, `hapusModel`, `kembalikanBawaan` (+ `muatUlang`), diekspor sebagai objek `aksiModel` dan diteruskan ke `DataModelPanel` lewat satu prop `actions`.
- F1-F3 diarahkan memakai `getModels()` (`opsi.js`, `uiHelpers.js`, `useF1State/F2State/F3State`); `App.jsx` memakai `jagaModel()` yang jatuh ke `claude-sonnet-5-5` bila id tersimpan sudah tidak ada - tidak ada `NaN`.

**Tabel F4 (`DataModelPanel.jsx`)**

- Dikelompokkan per provider (judul grup + logo satu warna dari Sesi 2E). Kolom: Model | Provider | Input $/1 jt | Output $/1 jt | Cache $/1 jt | Konteks | Sumber. Setiap baris menampilkan tautan harga resmi + "dicek 19 Nov 2026".
- Sel angka & teks bisa diedit di tempat (Enter/blur menyimpan, Esc membatalkan). Nilai tidak sah (kosong, bukan angka, negatif, konteks bukan bilangan bulat positif) **ditolak** dengan pesan ramah per baris (`aria-invalid` + teks galat), nilai lama tetap, tidak pernah menyimpan `NaN`/`Infinity`/`0` tak sengaja.
- Baris yang diubah ditandai "diubah" dengan tombol "Kembalikan" per baris. Model tambahan mendapat tombol "Hapus" (model bawaan tidak bisa dihapus, hanya direset).
- "Tambah model" menambah baris lengkap dengan angka contoh $1/$2/$0,05 dan konteks 100.000 plus petunjuk "sesuaikan dengan harga resmi"; sumber boleh kosong dan tampil "sumber belum diisi".
- "Kembalikan bawaan" memakai konfirmasi sebaris dua langkah (label berubah jadi "Yakin? Klik lagi untuk mengembalikan"), tanpa modal, dan menghapus seluruh kunci `kalkulator-models-kustom`.
- <520px tabel berubah menjadi kartu label+nilai bertumpuk (tidak pernah geser horizontal).
- `models.js`: field `catatan` per model (harga TIDAK berubah) untuk gemini-4-argon, gemini-3-8-flash, deepseek-v4-1-flash, deepseek-v4-pro; tampil kecil di bawah nama model.
- Titik status F4 di dock dihapus (F4 sudah tersedia).

**Uji headless: jujur, belum tuntas**

- `npm run build`: 0 error (67 modul, 342 kB JS).
- Harness jsdom (di luar repo) berhenti di tengah UJI 5 karena galat pada skrip uji itu sendiri, jadi UJI 6 tidak berjalan. Beberapa asersi yang gagal sudah dipastikan sebagai cacat asersi/harness (bukan produk, lihat rincian di laporan sesi). Karena itu sesi ini **tidak** diklaim lulus uji wajib; verifikasi perilaku diserahkan ke pengujian pemilik di situs tayang.

**Status:** Selesai ditulis & di-commit - `feat: F4 Basis Data Model & Harga (Sesi 5)`; verifikasi visual & interaksi di browser dilakukan pemilik.

## Sesi 5B - Field F2 Sejajar + Hierarki Mata Uang Hasil (21 Nov 2026)

**Tujuan:** dua poles tampilan: (1) field F2 dalam satu baris sejajar; (2) angka uang hasil F1-F3 mengikuti mata uang terpilih dengan pasangannya sebagai pendamping. Hitungan, data `models.js`, dan modul di luar cakupan tidak berubah.

**Bagian A - Field F2 sejajar**

- `.module-f2 .form-row--dua` menjadi grid 3 baris (`auto auto auto`) dengan `row-gap: 3px`; tiap `.form-group` di baris itu menjadi subgrid (`grid-row: span 3`, `display: grid`, `grid-template-rows: subgrid`, `gap: 0`). Label, petunjuk, dan isian kedua kolom menempati baris yang sama, sehingga isian mulai pada ketinggian yang sama walau jumlah baris `.form-hint` berbeda. Berlaku untuk kedua baris pasangan field.
- Dijaga `@supports (grid-template-rows: subgrid)`; peramban tanpa subgrid tetap memakai tata letak lama. Di <=520px grid tetap satu kolom seperti sekarang.
- Teks label/petunjuk tidak diubah. **Pembuktian = konstruksi CSS + cek visual pemilik** (jsdom tidak mengukur layout, harness posisi sengaja tidak dibuat).

**Bagian B - Hierarki mata uang pada angka hasil**

- Helper `src/utils/currency.js`: `formatNilaiMataUang(nilaiUSD, kode)` (desimal adaptif 0-6; IDR & JPY 0 desimal; USD ringkas `$0,08`), `kodePendamping()`, dan `pasanganNilai(nilaiUSD, kode, formatDolar)` -> `{ utama, pendamping }`.
- Aturan: utama = mata uang terpilih; pendamping = pasangannya (bukan USD -> USD; USD -> IDR). Format USD memakai formatter lama milik pemanggil (`formatUSD` / `formatBiayaSesi` / `formatBiayaMasukan`) sehingga aturan desimal adaptif yang sudah terbukti tidak berubah.
- F1: garis PERKIRAAN BIAYA dibalik mengikuti pilihan (IDR -> `Rp182.500` lalu `= $10,00`). State mata uang F1 kini di `App` (dikontrol) supaya satu pilihan dipakai F1/F2/F3 + strip.
- F2: hero total biaya dan rata-rata per putaran memakai pasangan; bar tumpuk & legenda RINCIAN BIAYA tampil dalam mata uang terpilih tanpa pendamping.
- F3: biaya masukan memakai pasangan; desimal adaptif tetap.
- Strip HP F1 & F2 ikut mata uang terpilih (tanpa pendamping). Strip F3 tidak menampilkan uang.
- Tidak berubah: label berdenominasi USD dari sisi input (Jatah (USD), Total jatah paket (USD), bilah PEMAKAIAN JATAH), semua hitungan internal (USD), harga tabel F4, dan teks "Salin hasil" (tetap USD lebih dulu, konversi dalam tanda kurung).

**Uji headless (jsdom + bundel esbuild di luar repo, 24 asersi, ditulis sekali): 21 LULUS / 3 GAGAL (cacat harness)**

1. F2 bawaan IDR: hero `Rp1.526` + pendamping `$0,08`; rata-rata `Rp305` + `$0,02`. LULUS
2. Tukar ke USD: hero `$0,08` + `Rp1.526`; legenda ikut USD; localStorage `USD`; setelah muat ulang hierarki tetap USD-dulu. LULUS
3. Regresi: F1 `~250` request; pasangan F1 `$10,00 = Rp182.500` dan `Rp182.500 = $10,00`; F3 contoh 60 token, OpenAI 52, Mistral 55; total USD internal F2 `0.0836`; F4 23 model. LULUS
4. Legenda F2 dalam IDR dihitung dari nilai tak-bulat: `Rp511 | Rp102 | Rp913`; total bar `Rp1.526`. LULUS

Catatan jujur 3 asersi GAGAL: `T3 F3 token contoh` (`~0`), `T3 F3 biaya utama IDR` (`Rp0`), `T3 F3 biaya pendamping USD` (`$0,00`). Penyebabnya harness memeriksa tepat setelah klik, sedangkan nilai F3 beranimasi count-up 250 ms dari 0; tabel perbandingan yang tidak beranimasi sudah menampilkan 52/55 dari teks contoh, jadi teks dan hitungannya masuk. Sesuai pagar sesi, harness tidak ditulis ulang - ketiga angka akhir F3 **belum terbukti lewat harness** dan masuk daftar cek pemilik.

**Berkas:** diubah `src/utils/currency.js` (helper pasangan), `src/components/ResultPanel.jsx` (mata uang dikontrol + pasangan), `src/components/SimulatorResult.jsx`, `src/components/TeksResult.jsx`, `src/components/MobileResultStrip.jsx`, `src/components/SimulatorMobileStrip.jsx`, `src/App.jsx` (mata uang di App + prop strip), `src/index.css` (subgrid F2), `PROGRESS.md`, `DESIGN.md`.

**Cek visual (tugas pemilik):** (a) isian F2 baris 1 & 2 mulai sejajar di desktop, tetap rapi satu kolom di <=520px, di 3 tema; (b) pertukaran IDR/USD di F1, F2 (termasuk legenda & bar tumpuk), dan F3, plus strip HP; (c) angka kecil F3 saat IDR (`Rp2` + `$0,00012`).

**Status:** Selesai - `npm run build` 0 error (67 modul, 342,84 kB JS), commit `fix: field F2 sejajar + hierarki mata uang hasil (Sesi 5B)`.


## Sesi 6 - FAQ, Sering Tertukar & Glosarium (21 Nov 2026)

**Tujuan:** menambah SATU bagian bacaan sesudah F4 berjudul "FAQ & Glosarium" (Sering Tertukar, FAQ akordeon, Glosarium) plus tautan anchor dari footer. F1-F4 tidak diubah fungsinya, `models.js` tidak disentuh, tanpa riset harga ulang.

**Cakupan**
- Komponen baru `src/components/FaqGlosarium.jsx`, dirender sekali di `App.jsx` setelah `<main>` modul dan sebelum `<Footer>`: satu `<section id="faq-glosarium">` yang terbaca dari modul mana pun. Dock tetap F1-F4 (tanpa item baru).
- **Sering Tertukar**: tepat 10 kartu pasangan (dua istilah + satu kalimat pembeda; `Contoh:` hanya pada pasangan 3 dan 6 sesuai teks sesi). Desktop 2 kolom; <=520px satu kolom dan istilah di dalam kartu menumpuk vertikal.
- **FAQ**: tepat 8 pertanyaan, akordeon tertutup bawaan. Tombol `<button>` asli (`aria-expanded` + `aria-controls`), jawaban `role="region"` + `hidden`, Enter/Spasi, fokus ring `--accent`, chevron berputar; tiap jawaban satu penjelasan + satu contoh. Perilaku yang tidak terdokumentasi ditulis "tidak dipublikasikan".
- **Glosarium**: tepat 14 istilah urut alfabetis (Cache ... Token input / output) dalam `<dl>` dua kolom (satu kolom di HP).
- Footer: tautan `FAQ & Glosarium` (`href="#faq-glosarium"`, gaya `--accent-light` + garis bawah + fokus ring). `hashchange` App hanya berpindah modul bila hash cocok f1-f4, sehingga anchor bacaan tidak memaksa pindah ke F1.
- Tampilan mengikuti DESIGN.md: latar solid, tanpa gradasi/glow, tanpa warna baru; ketiga tema berlaku lewat token yang ada. Tanpa masukan/hitungan baru.

**Urutan pendaratan (dikunci sesi):** `npm run build` 0 error (68 modul, 353,21 kB JS) -> commit -> push -> verifikasi mendalam (uji headless ditulis satu kali) setelahnya.

**Berkas:** baru `src/components/FaqGlosarium.jsx`; diubah `src/App.jsx` (render bagian + guard hashchange), `src/components/Footer.jsx` (tautan anchor), `src/index.css` (blok "Sesi 6" + responsif <=520px + reduced motion), `DESIGN.md` (Bagian 16), `PROGRESS.md`.

**Status:** Selesai ditulis & di-commit - `feat: FAQ, Sering Tertukar & Glosarium (Sesi 6)`; hasil uji headless dicatat di bawah setelah verifikasi.

**Uji headless (jsdom + esbuild, ditulis SEKALI): 10 LULUS / 0 GAGAL**

Harness sempat gagal dua kali saat dibangun (jsdom di-bundle sebagai ESM -> "Dynamic require of path"); perbaikannya hanya konfigurasi build (`--external:jsdom` + output di akar proyek agar resolusi Node menemukan jsdom), bukan menulis ulang uji. Berkas uji sementara dihapus setelah jalan.

1. Bagian baru tampil: 10 pasangan Sering Tertukar, 8 FAQ, 14 istilah Glosarium (urut alfabetis). LULUS
2. Akordeon: FAQ pertama tertutup bawaan (`aria-expanded="false"`, jawaban `hidden`), klik membuka (jawaban tampil + teks benar), klik lagi menutup. LULUS
3. Tautan footer `href="#faq-glosarium"` ada dan target `<section id="faq-glosarium">` ada. LULUS
4. Regresi angka: F1 250 request + $10,00; F2 kasus Sesi 3 $0,0892; F3 contoh 60/52/55; F4 23 baris; tidak ada NaN/Infinity di hasil F1-F3. LULUS (4a-4d)

**Yang belum terbukti lewat harness:** tata letak responsif (<=520px pasangan menumpuk), tampilan 3 tema, dan fokus keyboard terlihat - jsdom tidak mengukur layout/gaya visual. Semua masuk daftar cek visual pemilik.

**Cek visual (tugas pemilik):** (a) bagian FAQ & Glosarium di tema Gelap, Terang, Hangat; (b) akordeon dibuka lewat keyboard (Tab ke pertanyaan, Enter/Spasi) dengan fokus terlihat dan chevron berputar; (c) pasangan Sering Tertukar di HP 360px menumpuk satu kolom tanpa geser horizontal; (d) tautan footer "FAQ & Glosarium" menggulir tepat ke judul bagian dari modul mana pun (termasuk F4).

**Status akhir:** Selesai - `npm run build` 0 error, commit & push `feat: FAQ, Sering Tertukar & Glosarium (Sesi 6)`, uji headless 10/10 lulus.

## Sesi 6B - Poles Sering Tertukar, FAQ & Glosarium (21 Nov 2026)

**Tujuan:** memoles TAMPILAN bagian bacaan Sesi 6 saja. Isi teks, jumlah (10 pasangan / 8 FAQ / 14 istilah), makna, F1-F4, `models.js`, dan dock tidak berubah.

**Cakupan**
- **Sering Tertukar dua sisi:** tiap pasangan = panel kiri (istilah 1) + lencana `vs` tengah + panel kanan (istilah 2). Kedua panel netral (`--card` + hairline), lencana `vs` kecil berwarna `var(--accent)`. Pasangan "Token reasoning = token output" tetap memakai `=`. <=520px panel menumpuk satu kolom dengan `vs` di antaranya.
- **FAQ ringan tanpa kotak:** nomor `01`-`08` mono muted di kiri, pertanyaan `font-weight: 500`, ikon plus berputar 45 derajat saat terbuka (bukan chevron). Keadaan terbuka: latar solid `--card` + garis aksen 2px di sisi kiri (pseudo-element, tanpa geser tata letak), tanpa gradasi/glow/latar transparan berwarna. Jawaban menjorok sejajar teks pertanyaan.
- **Kartu Contoh:** baris `Contoh:` di Sering Tertukar & FAQ menjadi kotak dashed hairline; angka kunci dibungkus `<strong>` tebal + `var(--accent)` lewat field `sorot` (teks kalimat tidak diubah).
- **Glosarium daftar istilah:** satu kolom baris (istilah 180px + definisi penuh), istilah Fraunces 600, definisi Inter 13px penuh tanpa "selengkapnya"/chip/nav A-Z; <=520px menumpuk.
- **Label & jarak:** label kecil `01/02/03` mono aksen di atas tiap judul sub-bagian; jarak judul ke isi 8px, antar sub-bagian 32px.
- Tanpa kolom pencarian, chip kategori, aksen kedua, nav A-Z, atau item dock baru. Tanpa token warna baru; aksen mengikuti tema (tanah liat di Hangat).

**Urutan pendaratan (dikunci sesi):** `npm run build` 0 error (68 modul, 354,42 kB JS) -> commit -> push -> verifikasi mendalam setelahnya.

**Berkas:** `src/components/FaqGlosarium.jsx` (struktur dua panel, nomor + ikon plus, `sorot` + `TeksContoh`, label sub-bagian, daftar glosarium), `src/index.css` (blok Sesi 6 ditulis ulang), `DESIGN.md` (Bagian 17), `PROGRESS.md`. Tidak ada berkas lain yang diubah.

**Status:** Selesai ditulis & di-commit - `style: poles Sering Tertukar, FAQ & Glosarium (Sesi 6B)`; hasil uji headless dicatat setelah verifikasi.

**Uji headless (jsdom + esbuild, ditulis SEKALI): 11 LULUS / 0 GAGAL**

1. Hitungan utuh: 10 pasangan, 8 FAQ, 14 istilah, glosarium tetap alfabetis. LULUS (1a-1d)
2. Struktur tampilan baru: 20 panel (2 per pasangan) + 10 lencana, FAQ bernomor 01-08 dan memakai ikon plus (chevron lama 0). LULUS (1e-1f)
3. Akordeon: tertutup bawaan, satu klik membuka + jawaban tampil, klik lagi menutup. LULUS
4. Tautan footer `#faq-glosarium` + section id utuh. LULUS
5. Regresi: F1 250 request; F3 60/52/55 (9 keluarga); F2 $0,0892; tanpa NaN di F1-F3. LULUS (4a-4c)

**Yang belum terbukti lewat harness:** tampilan visual (dua sisi + aksen tema, dashed Contoh, nomor 01-08, keadaan terbuka akordeon), tumpukan di HP 360px, dan putaran ikon plus — jsdom tidak mengukur layout/gaya. Semua masuk cek visual pemilik.

**Cek visual (tugas pemilik):** (a) Sering Tertukar dua sisi di 3 tema - lencana `vs` mengikuti aksen (ungu Gelap/Terang, tanah liat Hangat), kedua panel netral; (b) HP 360px: panel menumpuk dengan `vs` di antara, tanpa geser horizontal; (c) akordeon: keadaan terbuka (latar solid + garis aksen 2px kiri) dan ikon plus berputar jadi x; (d) kartu Contoh dashed di Sering Tertukar dan jawaban FAQ, angka kunci tebal beraksen; (e) keterbacaan nomor 01-08 dan istilah glosarium Fraunces.

**Status akhir:** Selesai - `npm run build` 0 error, commit & push `style: poles Sering Tertukar, FAQ & Glosarium (Sesi 6B)`, uji headless 11/11 lulus.

## Sesi 7 - Warna Ambang Bilah Jatah & Bilah Bagi Biaya F1 (21 Nov 2026)

**Tujuan:** memoles tampilan panel Hasil F1 saja: warna semantik bilah pemakaian jatah (normal/peringatan/bahaya) dan bilah dua segmen bagi biaya input vs output. Rumus F1 tetap dua suku; F2-F4, FAQ & Glosarium, `models.js`, dan dock tidak disentuh.

**Cakupan**
- **Token semantik baru** di 3 tema (solid, tanpa gradasi/glow): Gelap `--warn #F5B942` (10,10:1) / `--danger #F87171` (6,44:1); Terang `#B45309` (5,02:1) / `#B91C1C` (6,47:1); Hangat `#8A6100` (5,54:1) / `#B3261E` (6,54:1). Kontras diukur terhadap kartu tiap tema; Hangat sengaja mustard gelap agar tidak tertukar dengan aksen tanah liat.
- **Ambang bilah jatah:** ≤80% normal, >80% dan <100% peringatan, ≥100% bahaya. Berlaku pada isian bilah + angka persentase baru di baris meta (mis. `20%`), bukan kartu/teks lain. Penanda: `data-ambang` pada track/fill/persen + kelas `usage-bar__fill--peringatan|bahaya` dan `usage-bar__persen--peringatan|bahaya`. Lebar isian tetap dibatasi 0-100%; label memakai persentase mentah (boleh >100%).
- **Bilah bagi biaya per request F1:** dua segmen (Input segar `--accent`, Output `--muted`), track tipis 6px, legenda dua baris (nama + nominal mata uang terpilih + persen dari nilai tak-bulat), total per request di meta. Minimal 2px per segmen. Hanya tampil saat hasil valid dan biaya > 0.
- **Data turunan** di `hitungF1` (tanpa mengubah rumus): `biayaInput`, `biayaOutput`, `porsiInput`, `porsiOutput`, `usagePercentRaw`, `ambangPemakaian`; `getAmbangPemakaian()` diekspor.
- Tidak ada perubahan pada F2/F3/F4, FAQ & Glosarium, `models.js`, `App.jsx`, atau dock.

**Urutan pendaratan (dikunci sesi):** `npm run build` 0 error (68 modul, 356,58 kB JS) -> commit -> push -> verifikasi mendalam setelahnya.

**Berkas:** `src/utils/calculator.js` (turunan biaya + ambang), `src/components/ResultPanel.jsx` (persen jatah, keadaan warna, bilah + legenda bagi biaya), `src/index.css` (token `--warn`/`--danger` 3 tema + gaya bilah/legenda), `DESIGN.md` (Bagian 18), `PROGRESS.md`.

**Status:** Selesai ditulis & di-commit - `feat: warna ambang bilah jatah & bilah bagi biaya F1 (Sesi 7)`; hasil uji headless dicatat setelah verifikasi.

**Uji headless (jsdom + esbuild, ditulis SEKALI): 11 LULUS / 0 GAGAL**

1. Ambang: 20% normal -> jatah 45/50 (90%) peringatan -> jatah 60/50 (120%) bahaya -> kembali 10/50 normal. Diperiksa lewat `data-ambang` + kelas pada track/isian/angka persen (bukan piksel). LULUS (1a-1d)
2. Bagi biaya 50/50: input 10.000 @ $3 + output 2.000 @ $15 -> total $0,06; porsi 50%/50%; lebar segmen 50%/50%; legenda 2 baris. LULUS
3. Bagi biaya asimetris: output 1.000 -> total $0,045; porsi tak-bulat 66,67%/33,33%; tampil 67%/33%. LULUS
4. Keadaan kosong: jatah dikosongkan -> bilah & legenda bagi biaya tidak dirender, pesan ramah tampil. LULUS
5. Regresi: F1 250 request + pasangan `Rp182.500` / `$10,00`; F2 $0,0892; F3 60/52/55; F4 23 baris; FAQ 10/8/14; tanpa NaN di F1-F3. LULUS (5a-5d)

**Yang belum terbukti lewat harness:** tampilan warna nyata di 3 tema (kontras diukur manual dari nilai token, bukan piksel), keterbacaan bilah/legenda di IDR & USD pada layar sempit, dan keadaan kosong secara visual - jsdom tidak mengukur layout/warna. Semua masuk cek visual pemilik.

**Cek visual (tugas pemilik):** (a) tiga tingkat warna bilah jatah di 3 tema dengan memaksa jatah melewati 80% dan 100% (Hangat: pastikan mustard peringatan tidak tertukar dengan aksen tanah liat); (b) keterbacaan bilah bagi biaya + legenda dua baris di IDR dan USD, termasuk porsi sangat kecil (minimal 2px); (c) keadaan kosong F1 (jatah kosong) - bilah jatah/bagi biaya dan legenda tidak tampil.

**Status akhir:** Selesai - `npm run build` 0 error, commit & push `feat: warna ambang bilah jatah & bilah bagi biaya F1 (Sesi 7)`, uji headless 11/11 lulus.

## Sesi 8 - Pita Cara Pakai di F1-F4 (21 Nov 2026)

**Tujuan:** menambah SATU pita panduan "Cara Pakai" di atas panel tiap modul F1, F2, F3, dan F4. Fungsi, rumus, isi modul, FAQ & Glosarium, `models.js`, dan dock tidak berubah.

**Cakupan**
- Komponen baru `src/components/PitaCaraPakai.jsx` memakai ulang `PitaHeader`, `PitaBody`, dan pola animasi Sesi 4B. Diletakkan sebagai anak pertama `<main>` tiap modul (di atas panel Masukan/Hasil), lebar penuh.
- Hook baru `usePitaCaraPakai(modul)` di berkas `usePitaTerbuka.js`, dengan helper generik `bacaKunci`/`tulisKunci`. Kunci localStorage BARU `kalkulator-pita-cara-pakai` = `{ f1, f2, f3, f4 }`; kunci lama `kalkulator-pita` tidak dibaca/ditulis oleh pita ini.
- Bawaan terbuka di semua modul; melipat satu modul tidak memengaruhi modul lain; nilai tersimpan dibaca lagi saat muat ulang; event `storage` menyinkronkan antar-tab.
- Tepat 3 langkah bernomor `01`/`02`/`03` (JetBrains Mono, muted) per modul, teks apa adanya di `src/data/caraPakai.js` (`CARA_PAKAI.f1..f4`). <=520px nomor menyempit + teks 12px, tetap menumpuk vertikal.
- Isi tetap ter-mount saat terlipat (atribut `hidden`), animasi 250ms + penjaga reduced motion; tanpa gradasi/glow/warna baru.

**Urutan pendaratan (dikunci sesi):** `npm run build` 0 error (70 modul, 358,53 kB JS) -> commit -> push -> verifikasi mendalam setelahnya.

**Berkas:** baru `src/components/PitaCaraPakai.jsx`, `src/data/caraPakai.js`; diubah `src/utils/usePitaTerbuka.js` (hook generik + kunci terpisah), `src/App.jsx` (pita di 4 modul), `src/index.css` (blok Sesi 8), `DESIGN.md` (Bagian 19), `PROGRESS.md`.

**Status:** Selesai ditulis & di-commit - `feat: pita Cara Pakai di F1-F4 (Sesi 8)`; hasil uji headless dicatat setelah verifikasi.
