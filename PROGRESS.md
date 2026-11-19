# PROGRESS — Kalkulator Token & Request AI

## Sesi 1 — Eksplorasi Desain (19 Nov 2026)

**Tujuan:** Scaffold proyek + implementasi desain statis F1 — menguji apakah
token warna dan tata letak dari DESIGN.md terasa cocok saat jadi antarmuka
sungguhan.

**Cakupan:**
- Scaffold Vite + React (pola sama dengan Rak Proyek).
- Dokumen proyek: AGENTS.md, PROGRESS.md. Target Baseline disepakati ke **Baseline 2026**.
- Halaman statis satu halaman: header, pemilih modul F1–F4, panel F1 (input + hasil contoh statis), footer.
- Estetika Anti-Slop Violet: Latar solid obsidian `#0C0C11`, kartu matte `#15151F`, garis pembatas `#2A283A`, tipografi warm off-white `#EEEBE6`, teks sekunder lavender-slate `#9A94A8`. Ungu `#7C5CFF` dipakai hemat dan presisi sebagai spotlight angka hasil dan tombol utama, tanpa glow, tanpa gradasi murahan.
- Kapabilitas Modern Web Guidance (Baseline 2026):
  - CSS Scroll-driven animations (`animation-timeline: scroll(self inline)` + `@property`) untuk fading mask tepi tablist saat overflow.
  - CSS Container Queries (`@container card`) agar ukuran tipografi hasil menyesuaikan ruang kartu sendiri.
  - Pola ARIA `tablist`/`tabpanel` dengan native `<button type="button">`.
  - Kontrol form mobile-friendly: `min-height: 44px`, `font-size: max(1rem, 1em)` untuk mencegah iOS auto-zoom.
  - Stabilitas layout: `scrollbar-gutter: stable`.
- Logika hitung BELUM dibuat — angka yang tampil adalah contoh statis.
- Konfigurasi GitHub Pages (workflow deploy otomatis).

**Status:** ✅ Selesai — siap review visual oleh user.

**Catatan untuk review visual:**
- Buka `npm run dev`, periksa di laptop DAN HP.
- Nilai: warna, kontras, jarak, ukuran huruf — catat yang terasa kurang.
- Angka hasil bertanda "contoh" — bukan hitungan sungguhan.
