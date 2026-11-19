/**
 * Kurs mata uang terhadap USD (1 USD = kurs).
 * Sumber & tanggal cek seragam; perbarui berkala bila kurs bergerak jauh.
 */
export const currencies = [
  {
    kode: "USD",
    nama: "Dolar AS",
    kurs: 1,
    cek: "2026-11-19",
    sumber: "Kurs tengah pasar (mid-market) dari tabel forex publik",
  },
  {
    kode: "IDR",
    nama: "Rupiah",
    kurs: 18250,
    cek: "2026-11-19",
    sumber: "Kurs tengah pasar (mid-market) dari tabel forex publik",
  },
  {
    kode: "EUR",
    nama: "Euro",
    kurs: 0.91,
    cek: "2026-11-19",
    sumber: "Kurs tengah pasar (mid-market) dari tabel forex publik",
  },
  {
    kode: "GBP",
    nama: "Pound sterling",
    kurs: 0.76,
    cek: "2026-11-19",
    sumber: "Kurs tengah pasar (mid-market) dari tabel forex publik",
  },
  {
    kode: "JPY",
    nama: "Yen Jepang",
    kurs: 160,
    cek: "2026-11-19",
    sumber: "Kurs tengah pasar (mid-market) dari tabel forex publik",
  },
  {
    kode: "SGD",
    nama: "Dolar Singapura",
    kurs: 1.29,
    cek: "2026-11-19",
    sumber: "Kurs tengah pasar (mid-market) dari tabel forex publik",
  },
  {
    kode: "MYR",
    nama: "Ringgit Malaysia",
    kurs: 4.11,
    cek: "2026-11-19",
    sumber: "Kurs tengah pasar (mid-market) dari tabel forex publik",
  },
  {
    kode: "INR",
    nama: "Rupee India",
    kurs: 93.3,
    cek: "2026-11-19",
    sumber: "Kurs tengah pasar (mid-market) dari tabel forex publik",
  },
  {
    kode: "CNY",
    nama: "Yuan Tiongkok",
    kurs: 6.67,
    cek: "2026-11-19",
    sumber: "Kurs tengah pasar (mid-market) dari tabel forex publik",
  },
];

export const KODE_MATA_UANG_BAWAAN = "IDR";

export function getCurrency(kode) {
  return currencies.find((c) => c.kode === kode) ?? null;
}
