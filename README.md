<div align="center">

# Kalkulator Token & Request AI

**Terjemahkan jatah & batas paket AI menjadi angka yang bisa dibayangkan:**
**request, token, dan perkiraan biaya.**

### [Coba langsung di GitHub Pages](https://pidzzzz.github.io/kalkulator-token-ai/)

tanpa login · tanpa server · semua hitungan berjalan di browser

![React 19](https://img.shields.io/badge/React-19-7C5CFF)
![Vite](https://img.shields.io/badge/Vite-6-7C5CFF)
![GitHub Pages](https://img.shields.io/badge/Hosting-GitHub_Pages-7C5CFF)
![Client Side](https://img.shields.io/badge/100%25-Client--Side-7C5CFF)

</div>

## Kenapa alat ini ada?

Paket AI berbicara dalam bahasa yang membingungkan: "batas 5 jam", "jatah mingguan",
"$60 per bulan untuk model ini", "harga per 1 juta token". Susah membayangkan
arti angka-angka itu untuk pekerjaan nyata.

Alat ini menerjemahkannya menjadi tiga angka yang bisa dibayangkan:
**berapa request yang bisa kamu jalankan, berapa token yang kamu dapat,
dan berapa perkiraan biayanya** — dengan rumus dan asumsi yang selalu
ditampilkan terbuka. Tidak ada angka ajaib.

## Fitur

### F1 — Penerjemah Batas (tersedia)

- **23 model dari 9 provider** dengan harga resmi terbaru: Anthropic, OpenAI,
  Google, DeepSeek, xAI, Mistral, Moonshot, Z.ai, dan Alibaba.
- **Preset paket**: OpenCode Go, Claude Pro, Claude Max, ChatGPT Plus, Gemini,
  plus mode Kustom. Jendela reset mengikuti aturan resmi tiap paket
  (per 5 jam / per hari / per minggu / per bulan).
- **Semua nilai bisa diubah** — hasil berubah seketika saat kamu mengetik.
- **Konversi mata uang** di samping perkiraan biaya: IDR, EUR, GBP, JPY, SGD,
  MYR, INR, CNY, dengan kurs bertanggal cek.
- **Tiga tema** (Gelap, Terang, Hangat), dock navigasi melayang yang memudar
  saat tidak disentuh, dan dropdown kustom lengkap dengan harga per model
  serta logo provider.
- **Salin hasil** dalam satu klik.

### Segera hadir

- **F2 — Simulator Sesi Agen**: simulasikan satu sesi agen koding per putaran.
- **F3 — Penghitung Token Teks**: perkiraan token dari teks yang kamu tempel.
- **F4 — Basis Data Model & Harga**: jelajahi dan sunting basis data harga.
- **FAQ & Glosarium**: konteks vs kuota, request vs token, cache, compaction,
  dan perbedaan AI usage lain yang sering tertukar.

## Cara memakai

1. Buka [situsnya](https://pidzzzz.github.io/kalkulator-token-ai/).
2. Pilih paket langganan dan model.
3. Atur jatah serta asumsi pemakaianmu — hasilnya langsung terbaca,
   lengkap dengan rumus dan asumsinya.

## Kejujuran data

- Harga model **dikurasi manual** dari halaman harga resmi tiap provider.
  Setiap baris data membawa sumber dan tanggal cek (terakhir diperbarui:
  19 November 2026). Tidak ada scraping otomatis.
- Semua hasil adalah **PERKIRAAN** — aplikasi menandainya dengan lencana
  ESTIMASI. Anggap alat ini kompas untuk merencanakan, bukan tagihan resmi.
- **Privasimu utuh**: tanpa login, tanpa analitik, tanpa server. Pilihanmu
  hanya tersimpan di browser-mu sendiri (localStorage).

## Menjalankan di lokal

    git clone https://github.com/Pidzzzz/kalkulator-token-ai.git
    cd kalkulator-token-ai
    npm install
    npm run dev

## Teknologi

React 19 · Vite · mesin hitung JavaScript murni · di-host di GitHub Pages.

## Peta jalan

- [x] F1 — Penerjemah Batas
- [ ] F2 — Simulator Sesi Agen
- [ ] F3 — Penghitung Token Teks
- [ ] F4 — Basis Data Model & Harga
- [ ] FAQ & Glosarium AI Usage

## Lisensi

MIT — bebas dipakai, diubah, dan disebarkan dengan menyertakan hak cipta.
Lihat [LICENSE](LICENSE) untuk teks lengkapnya.

---

Dibuat oleh [Pidzzz](https://github.com/Pidzzzz). Nama dan harga model adalah
milik masing-masing provider; proyek ini tidak berafiliasi dengan mereka.
