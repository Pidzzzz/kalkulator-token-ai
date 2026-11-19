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

**Status:** ✅ Selesai — `npm run build` 0 error, siap review visual oleh user.
