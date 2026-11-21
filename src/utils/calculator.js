/**
 * Fungsi kalkulasi murni untuk F1 Penerjemah Batas.
 * Membaca data model & harga dari `src/data/models.js` (harga tidak
 * di-hardcode di komponen).
 *
 * Rumus inti F1:
 *   biaya_per_request = (token_input × harga_input + token_output × harga_output) / 1.000.000
 *   request           = jatah / biaya_per_request
 *   total_token       = request_tampil × (token_input + token_output)
 *   perkiraan_biaya   = min(jatah, request_tampil × biaya_per_request)
 *
 * Catatan: suku cache sengaja TIDAK dipakai di F1 — itu wilayah F2.
 */

import { presets, jendelaOptions } from "../data/models.js";
import { getModels } from "./lapisanModel.js";

export function getModelById(id) {
  return getModels().find((m) => m.id === id) || null;
}

export function getPresetById(id) {
  return presets.find((p) => p.id === id) || presets[0];
}

export function getJendelaLabel(id) {
  return jendelaOptions.find((j) => j.id === id)?.label || jendelaOptions[0].label;
}

/**
 * Membaca angka dari masukan teks. Menerima koma maupun titik desimal.
 * Titik di tengah angka dianggap pemisah ribuan ("1.000.000" -> 1000000),
 * mengikuti parseAngkaIsian (Sesi 5: edit konteks di F4 "1.000.000" harus
 * terbaca 1 juta, bukan 1).
 * Mengembalikan NaN bila kosong / bukan angka.
 */
export function parseAngka(val) {
  if (typeof val === "number") {
    return Number.isFinite(val) ? val : NaN;
  }
  if (val === null || val === undefined) return NaN;
  let bersih = String(val).trim().replace(/\s/g, "").replace(/^\$/, "");
  if (bersih === "") return NaN;
  if (/^-?(\d{1,3}(\.\d{3})+|\d+)(?:,\d*)?$/.test(bersih)) {
    bersih = bersih.replace(/\./g, "");
  }
  bersih = bersih.replace(",", ".");
  const angka = Number(bersih);
  return Number.isFinite(angka) ? angka : NaN;
}

/**
 * Format bilangan bulat dengan pemisah ribuan titik (id-ID), misal: 2004000 -> "2.004.000"
 */
export function formatRibuan(val) {
  if (val === null || val === undefined || isNaN(val)) return "0";
  return new Intl.NumberFormat("id-ID", {
    maximumFractionDigits: 0,
  }).format(Math.round(val));
}

/**
 * Format angka desimal dengan koma (id-ID), misal: 0.06 -> "0,06"
 */
export function formatDesimal(val, minDigits = 2, maxDigits = 2) {
  if (val === null || val === undefined || isNaN(val)) {
    return new Intl.NumberFormat("id-ID", {
      minimumFractionDigits: minDigits,
      maximumFractionDigits: maxDigits,
    }).format(0);
  }
  return new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: minDigits,
    maximumFractionDigits: maxDigits,
  }).format(val);
}

/**
 * Format harga model (bila bulat tanpa koma, bila ada koma tampilkan koma)
 */
export function formatHarga(val) {
  if (val === null || val === undefined || isNaN(val)) return "0";
  if (Number.isInteger(val)) return String(val);
  return new Intl.NumberFormat("id-ID", {
    maximumFractionDigits: 4,
  }).format(val);
}

/**
 * Angka apa adanya untuk sel F4 yang bisa diedit: titik desimal standar
 * ("0.2", "1.000000") supaya isian bisa langsung diketik ulang dan
 * dibaca ulang oleh validasiSel.
 */
export function formatSel(val) {
  if (typeof val !== "number" || !Number.isFinite(val)) return "";
  return String(val);
}

/**
 * Ambang warna bilah pemakaian jatah (Sesi 7).
 * ≤80% normal · >80% dan <100% peringatan · ≥100% bahaya.
 */
export function getAmbangPemakaian(persen) {
  if (!Number.isFinite(persen) || persen <= 80) return "normal";
  if (persen >= 100) return "bahaya";
  return "peringatan";
}

/**
 * Format dolar ringkas: "$10", "$0,06", "$12,50".
 */
export function formatUSD(val, minDigits = 0, maxDigits = 2) {
  return "$" + formatDesimal(val, minDigits, maxDigits);
}

/**
 * Hitung F1 dari id model (harga dibaca dari models.js).
 *
 * @param {Object} params
 * @param {string} params.modelId - id model di models.js
 * @param {string|number} params.jatah - Jatah dalam USD
 * @param {string|number} params.tokenInput - Token input per request
 * @param {string|number} params.tokenOutput - Token output per request
 * @param {string|number} [params.totalKuota] - Total kuota paket untuk bilah pemakaian
 */
export function hitungF1({
  modelId,
  jatah,
  tokenInput,
  tokenOutput,
  totalKuota,
} = {}) {
  const model = getModelById(modelId);

  const numTokenInput = Math.max(0, parseAngka(tokenInput) || 0);
  const numTokenOutput = Math.max(0, parseAngka(tokenOutput) || 0);
  const numHargaInput = Math.max(0, parseAngka(model?.hargaInput) || 0);
  const numHargaOutput = Math.max(0, parseAngka(model?.hargaOutput) || 0);

  const jatahMentah = parseAngka(jatah);
  const numJatah =
    Number.isFinite(jatahMentah) && jatahMentah > 0 ? jatahMentah : 0;

  const totalMentah = parseAngka(totalKuota);
  const isUsageValid =
    Number.isFinite(totalMentah) && totalMentah > 0;
  const numTotalKuota = isUsageValid ? totalMentah : 0;

  // Biaya per request tetap dihitung walau jatah kosong, supaya blok
  // "Dengan angka" bisa menampilkan hasil antara yang benar.
  const biayaInput = (numTokenInput * numHargaInput) / 1000000;
  const biayaOutput = (numTokenOutput * numHargaOutput) / 1000000;
  const biayaPerRequest = biayaInput + biayaOutput;

  const adaJatah = numJatah > 0;
  const adaHarga = numHargaInput > 0 || numHargaOutput > 0;
  const adaToken = numTokenInput + numTokenOutput > 0;

  let emptyMessage = null;
  if (!adaJatah) {
    emptyMessage = "Isi jatah dulu untuk melihat perkiraan.";
  } else if (!adaHarga) {
    emptyMessage =
      "Harga model belum tersedia. Pilih model lain untuk melihat perkiraan.";
  } else if (!adaToken || biayaPerRequest <= 0) {
    emptyMessage = "Isi token input atau output untuk melihat perkiraan.";
  }

  const isValid = emptyMessage === null;

  const requestExact = isValid ? numJatah / biayaPerRequest : 0;
  const requestTampil = isValid ? Math.round(requestExact) : 0;
  const totalToken = isValid
    ? requestTampil * (numTokenInput + numTokenOutput)
    : 0;
  const perkiraanBiaya = isValid
    ? Math.min(numJatah, requestTampil * biayaPerRequest)
    : 0;

  const usagePercent = isUsageValid
    ? Math.min(100, Math.max(0, (numJatah / numTotalKuota) * 100))
    : 0;
  // Persentase mentah (boleh >100) hanya untuk label & ambang warna;
  // lebar bilah tetap memakai usagePercent yang dibatasi 0–100.
  const usagePercentRaw = isUsageValid
    ? (numJatah / numTotalKuota) * 100
    : 0;
  const porsiInput =
    biayaPerRequest > 0 ? (biayaInput / biayaPerRequest) * 100 : 0;
  const porsiOutput =
    biayaPerRequest > 0 ? (biayaOutput / biayaPerRequest) * 100 : 0;

  return {
    isValid,
    emptyMessage,
    model,
    biayaInput,
    biayaOutput,
    biayaPerRequest,
    porsiInput,
    porsiOutput,
    requestExact,
    requestTampil,
    totalToken,
    perkiraanBiaya,
    usagePercent,
    usagePercentRaw,
    ambangPemakaian: getAmbangPemakaian(usagePercentRaw),
    isUsageValid,
    jatah: numJatah,
    totalKuota: numTotalKuota,
    tokenInput: numTokenInput,
    tokenOutput: numTokenOutput,
    hargaInput: numHargaInput,
    hargaOutput: numHargaOutput,
  };
}
