/**
 * Fungsi kalkulasi murni untuk F3 Penghitung Token Teks.
 *
 * Mesin perkiraan (terkunci, PRD bagian 3 F3):
 *   jumlah_karakter          = teks.length  (termasuk spasi & baris baru)
 *   jumlah_kata              = potongan teks yang dipisah spasi/baris baru,
 *                              tidak kosong
 *   perkiraan_token(keluarga) = ceil(jumlah_karakter / faktor_keluarga)
 *   biaya_masukan            = perkiraan_token × harga_input / 1.000.000
 *
 * Faktor per keluarga dibaca dari `src/data/tokenFaktor.js`, harga input dari
 * `src/data/models.js` — tidak ada angka yang di-hardcode di komponen.
 * Tidak ada tokenizer BPE sungguhan: semua hasil adalah perkiraan.
 */

import { formatDesimal, getModelById } from "./calculator.js";
import { tokenFaktor, getFaktor } from "../data/tokenFaktor.js";

export const PESAN_KOSONG_F3 =
  "Tempel atau ketik teks untuk melihat perkiraan jumlah tokennya.";

/** Teks contoh terkunci — dipakai tombol "Contoh teks" dan uji wajib Sesi 4. */
export const TEKS_CONTOH_F3 =
  "Kalkulator Token adalah alat bantu untuk menerjemahkan jatah dan batas paket AI menjadi angka yang bisa dibayangkan: berapa request yang terjangkau, berapa token yang tersedia, dan berapa perkiraan biayanya.";

export function hitungKarakter(teks) {
  return typeof teks === "string" ? teks.length : 0;
}

export function hitungKata(teks) {
  if (typeof teks !== "string") return 0;
  const potongan = teks.split(/[\s\u00a0]+/).filter((k) => k.length > 0);
  return potongan.length;
}

/** ceil(karakter ÷ faktor); 0 karakter -> 0 token (dilindungi dari faktor 0). */
export function perkiraanToken(karakter, faktor) {
  if (!Number.isFinite(karakter) || karakter <= 0) return 0;
  if (!Number.isFinite(faktor) || faktor <= 0) return 0;
  return Math.ceil(karakter / faktor);
}

/**
 * Biaya masukan berformat dolar: 2 desimal, KECUALI bila nilai > 0 tetapi
 * terbulatkan menjadi 0,00 — maka s.d. 6 desimal tanpa nol ekor
 * (mis. "$0,00012", bukan "$0,000120").
 */
export function formatBiayaMasukan(val) {
  const angka = Number.isFinite(val) ? val : 0;
  if (angka > 0 && Number(angka.toFixed(2)) === 0) {
    return "$" + formatDesimal(angka, 2, 6);
  }
  return "$" + formatDesimal(angka, 2, 2);
}

/** Persen pemakaian konteks: 2 desimal; di bawah 0,01% -> "<0,01%". */
export function formatPersenKonteks(persen) {
  const angka = Number.isFinite(persen) ? persen : 0;
  if (angka > 0 && angka < 0.01) return "<0,01%";
  return formatDesimal(angka, 2, 2) + "%";
}

/** Faktor untuk tabel/rumus: "3,5" (koma desimal id-ID). */
export function formatFaktor(faktor) {
  return formatDesimal(faktor, 1, 2);
}

/** Tabel perbandingan 9 keluarga untuk jumlah karakter tertentu. */
export function perbandinganKeluarga(karakter) {
  return tokenFaktor.map((t) => ({
    id: t.id,
    faktor: t.faktor,
    keterangan: t.keterangan,
    token: perkiraanToken(karakter, t.faktor),
  }));
}

/**
 * Hitung seluruh hasil F3.
 *
 * @param {Object} params
 * @param {string} params.teks
 * @param {string} params.modelId - id model di models.js
 */
export function hitungF3({ teks, modelId } = {}) {
  const model = getModelById(modelId);
  const teksBersih = typeof teks === "string" ? teks : "";

  const karakter = hitungKarakter(teksBersih);
  const kata = hitungKata(teksBersih);
  const adaTeks = teksBersih.trim().length > 0;

  const faktorModel = model ? getFaktor(model.provider) : null;
  const faktor = faktorModel ? faktorModel.faktor : 0;
  const token = perkiraanToken(karakter, faktor);

  const hargaInput = Math.max(0, Number(model?.hargaInput) || 0);
  const biayaMasukan = (token / 1000000) * hargaInput;

  const ukuranKonteks = Math.max(0, Number(model?.konteks) || 0);
  const persenKonteks =
    ukuranKonteks > 0 ? (token / ukuranKonteks) * 100 : 0;
  const konteksMelampaui = ukuranKonteks > 0 && token > ukuranKonteks;

  let emptyMessage = null;
  if (!model) {
    emptyMessage =
      "Model belum tersedia. Pilih model lain untuk melihat perkiraan.";
  } else if (!adaTeks) {
    emptyMessage = PESAN_KOSONG_F3;
  }

  const isValid = emptyMessage === null;

  return {
    isValid,
    emptyMessage,
    model,
    karakter,
    kata,
    faktor,
    faktorModel,
    token,
    hargaInput,
    biayaMasukan,
    ukuranKonteks,
    persenKonteks,
    konteksMelampaui,
    perbandingan: adaTeks ? perbandinganKeluarga(karakter) : [],
  };
}
