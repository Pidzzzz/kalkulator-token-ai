# AGENTS — Kalkulator Token & Request AI

## Cara kerja

- **Satu sesi, satu fitur.** Sebutkan nomor fitur (F1 – F4) di prompt pembuka setiap sesi.
- **Semua hitungan di browser.** Tanpa server, tanpa login, tanpa kunci API.
- **Tumpukan:** React + Vite + GitHub Pages — deploy otomatis tiap push ke `main`.
- **Bahasa antarmuka:** Bahasa Indonesia.

## Baseline

This project's Baseline target is Baseline 2026.

Skill **Modern Web Guidance** sudah terpasang untuk proyek ini lewat wizard resminya
(`npx modern-web-guidance@latest install`). Pakai panduannya saat memilih pola HTML/CSS
dan manfaatkan kapabilitas modern Baseline 2026 (seperti CSS scroll-driven animations,
container queries, native popover/invokers, logical properties) dengan fallback terukur.

## Struktur proyek

```
├── src/              Komponen React & CSS
│   ├── components/   Komponen UI
│   └── data/         Data model & harga (diisi di sesi F4)
├── PRD.md            Product Requirements Document
├── DESIGN.md         Spek desain & token warna
├── AGENTS.md         Dokumen ini — cara kerja agen
├── PROGRESS.md       Catatan kemajuan per sesi
└── .github/workflows/deploy.yml   CI/CD GitHub Pages
```

## Fitur

| # | Nama | Status |
|---|------|--------|
| F1 | Penerjemah Batas | 🔵 Sesi 1: desain statis |
| F2 | Simulator Sesi Agen | ⏳ Belum |
| F3 | Penghitung Token Teks | ⏳ Belum |
| F4 | Basis Data Model & Harga | ⏳ Belum |
