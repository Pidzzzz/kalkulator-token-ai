/**
 * Faktor perkiraan karakter-per-token per keluarga model (F3).
 *
 * `perkiraan_token = ceil(jumlah_karakter / faktor)`.
 * Urutan baris = urutan tampil di tabel perbandingan keluarga.
 *
 * Nilai ini KALIBRASI AWAL aturan praktis (bukan tokenizer resmi penyedia):
 * teks campuran Bahasa Indonesia/Inggris + kode cenderung 3,5–4 karakter per
 * token. Penyempurnaan faktor (mis. memisah kode vs prosa) adalah kandidat
 * sesi F4 — lihat PROGRESS.md.
 *
 * `id` WAJIB sama persis dengan field `provider` di `models.js`.
 */
export const KETERANGAN_METODE =
  "Aturan praktis karakter-per-token; bukan tokenizer resmi penyedia.";

export const tokenFaktor = [
  { id: "Anthropic", faktor: 3.5, keterangan: KETERANGAN_METODE },
  { id: "DeepSeek", faktor: 3.5, keterangan: KETERANGAN_METODE },
  { id: "OpenAI", faktor: 4.0, keterangan: KETERANGAN_METODE },
  { id: "Google", faktor: 4.0, keterangan: KETERANGAN_METODE },
  { id: "xAI", faktor: 4.0, keterangan: KETERANGAN_METODE },
  { id: "Mistral", faktor: 3.8, keterangan: KETERANGAN_METODE },
  { id: "Moonshot", faktor: 3.8, keterangan: KETERANGAN_METODE },
  { id: "Z.ai", faktor: 3.8, keterangan: KETERANGAN_METODE },
  { id: "Alibaba", faktor: 3.8, keterangan: KETERANGAN_METODE },
];

export function getFaktor(provider) {
  return tokenFaktor.find((t) => t.id === provider) || null;
}
