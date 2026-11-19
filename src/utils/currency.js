import { currencies, getCurrency } from "../data/currencies.js";

/**
 * Format nilai USD ke mata uang tujuan memakai Intl locale id-ID.
 * IDR & JPY otomatis tanpa desimal sesuai Intl.
 * Spasi setelah simbol/nama mata uang dirapatkan agar ringkas ("Rp182.500").
 */
export function formatMataUang(nilaiUSD, kode) {
  const mataUang = getCurrency(kode);
  const angka = Number(nilaiUSD);
  if (!mataUang || !Number.isFinite(angka)) return "";

  // IDR & JPY tanpa desimal (mengikuti kebiasaan Intl untuk JPY; IDR dipaksa 0).
  const tanpaDesimal = mataUang.kode === "IDR" || mataUang.kode === "JPY";

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: mataUang.kode,
    ...(tanpaDesimal
      ? { minimumFractionDigits: 0, maximumFractionDigits: 0 }
      : {}),
  })
    .format(angka * mataUang.kurs)
    .replace(/\s(?=\d)/g, "");
}

export const opsiMataUang = currencies.map((c) => ({
  value: c.kode,
  label: `${c.kode} — ${c.nama}`,
  triggerLabel: c.kode,
  detail: `${formatMataUang(1, c.kode)} per $1`,
}));
