import { currencies, getCurrency } from "../data/currencies.js";
import { formatDesimal } from "./calculator.js";

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

/* ============================================================
   Sesi 5B — hierarki mata uang pada angka hasil
   Aturan: angka utama memakai mata uang terpilih, angka pendamping
   memakai pasangannya (USD ↔ IDR). Semua hitungan tetap USD.
   ============================================================ */

const DESIMAL_MAKS_ADAPTIF = 6;

/** Digit desimal bawaan sebuah mata uang hasil: IDR & JPY 0, lainnya 2. */
function desimalDasar(mataUang) {
  return mataUang.kode === "IDR" || mataUang.kode === "JPY" ? 0 : 2;
}

/**
 * Format nilai USD ke mata uang `kode` dengan desimal adaptif.
 * Dipakai untuk ANGKA HASIL (biaya), bukan harga per 1 juta token: bila nilai
 * positif terbulatkan menjadi nol pada desimal bawaan, desimal ditambah
 * (maks 6) supaya angka tidak pernah tampil 0.
 * USD ditulis ringkas "$0,08" agar seragam dengan formatUSD yang sudah ada.
 */
export function formatNilaiMataUang(nilaiUSD, kode) {
  const mataUang = getCurrency(kode);
  const angka = Number(nilaiUSD);
  if (!mataUang || !Number.isFinite(angka)) return "";

  const nilai = angka * mataUang.kurs;
  const dasar = desimalDasar(mataUang);
  let desimal = dasar;
  while (
    desimal < DESIMAL_MAKS_ADAPTIF &&
    nilai !== 0 &&
    Number(nilai.toFixed(desimal)) === 0
  ) {
    desimal += 1;
  }

  if (mataUang.kode === "USD") {
    return "$" + formatDesimal(nilai, dasar, desimal);
  }

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: mataUang.kode,
    minimumFractionDigits: desimal,
    maximumFractionDigits: desimal,
  })
    .format(nilai)
    .replace(/\s(?=\d)/g, "");
}

/** Mata uang pasangan: USD → IDR, selain USD → USD. */
export function kodePendamping(kode) {
  return kode === "USD" ? "IDR" : "USD";
}

/**
 * Pasangan angka untuk satu nilai USD.
 *
 * @param {number} nilaiUSD        - nilai asli (semua hitungan tetap USD)
 * @param {string} kode            - mata uang terpilih
 * @param {Function} formatDolar   - formatter dolar milik pemanggil
 *                                   (formatBiayaSesi / formatBiayaMasukan /
 *                                   formatUSD) supaya aturan desimal adaptif
 *                                   yang sudah terbukti tidak berubah.
 * @returns {{utama: string, pendamping: string}}
 */
export function pasanganNilai(nilaiUSD, kode, formatDolar) {
  const dolar =
    typeof formatDolar === "function"
      ? formatDolar
      : (val) => formatNilaiMataUang(val, "USD");

  if (kode === "USD") {
    return {
      utama: dolar(nilaiUSD),
      pendamping: formatNilaiMataUang(nilaiUSD, "IDR"),
    };
  }

  return {
    utama: formatNilaiMataUang(nilaiUSD, kode),
    pendamping: dolar(nilaiUSD),
  };
}

export const opsiMataUang = currencies.map((c) => ({
  value: c.kode,
  label: `${c.kode} — ${c.nama}`,
  triggerLabel: c.kode,
  detail: `${formatMataUang(1, c.kode)} per $1`,
}));