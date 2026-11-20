/**
 * Fungsi kalkulasi murni untuk F2 Simulator Sesi Agen.
 * Harga dibaca dari `src/data/models.js` lewat `getModelById` (F1) — tidak
 * ada harga yang di-hardcode di komponen.
 *
 * Model hitung (PRD bagian 3, F2):
 *   konteks(r)      = konteks_awal + (r - 1) × pertumbuhan      r = 1..N
 *   cache(r)        = konteks(r) × rasio_cache
 *   segar(r)        = konteks(r) − cache(r)
 *   output(r)       = output_per_putaran                        (tetap)
 *
 *   token_segar     = Σ segar(r)
 *   token_cache     = Σ cache(r)
 *   token_output    = N × output_per_putaran
 *   total_token     = token_segar + token_cache + token_output
 *
 *   biaya           = token_segar / 1.000.000 × harga_input
 *                   + token_cache / 1.000.000 × harga_cache
 *                   + token_output / 1.000.000 × harga_output
 *   biaya_rata2     = biaya / N
 *   konteks_akhir   = konteks_awal + (N - 1) × pertumbuhan
 *
 * Semua pembagian dilindungi dari nol: bila putaran 0, konteks 0, atau harga
 * model 0, hasil ditandai tidak valid dan UI menampilkan pesan ramah —
 * bukan ~0, NaN, atau Infinity.
 */

import { formatDesimal, formatRibuan, getModelById, parseAngka } from "./calculator.js";

export const PESAN_KOSONG_F2 = "Isi masukan dulu untuk melihat perkiraan sesi.";

const SALIN_HURUF = {
  0: "0",
  1: "1",
  2: "2",
  3: "3",
  4: "4",
  5: "5",
  6: "6",
  7: "7",
  8: "8",
  9: "9",
  ",": ".",
};

/**
 * Membaca masukan panjang bertitik ribuan: "1.000.000" -> 1000000.
 * Tanpa pemisah ini, isian bertitik ribuan akan terbaca sebagai angka
 * desimal kecil (1.000.000 -> 1) — sumber salah hitung yang berbahaya.
 * Koma diperlakukan sebagai desimal.
 */
export function parseToken(val) {
  if (typeof val === "number") {
    return Number.isFinite(val) ? val : NaN;
  }
  if (val === null || val === undefined) return NaN;

  const bersih = String(val)
    .trim()
    .replace(/\s/g, "")
    .replace(/[^\d.,]/g, "")
    .replace(/,/g, (c) => SALIN_HURUF[c]);

  if (bersih === "" || bersih === ".") return NaN;

  if (bersih.includes(".")) {
    // Desimal asli -> baca biasa (mis. "2.5").
    const n = Number(bersih);
    return Number.isFinite(n) ? n : NaN;
  }

  // Seluruh kelompok 3 digit -> pemisah ribuan (mis. "10.000", "1.000.000").
  if (/^\d{1,3}(\.\d{3})+$/.test(bersih)) {
    const n = Number(bersih.replace(/\./g, ""));
    return Number.isFinite(n) ? n : NaN;
  }

  const n = Number(bersih);
  return Number.isFinite(n) ? n : NaN;
}

export function formatToken(val) {
  if (!Number.isFinite(val)) return "—";
  return new Intl.NumberFormat("id-ID", {
    maximumFractionDigits: 0,
  }).format(Math.round(val));
}

/**
 * Biaya sesi berformat dolar: 2 desimal, atau 4 desimal bila di bawah $0,01
 * agar biaya kecil tidak tampil sebagai $0,00.
 */
export function formatBiayaSesi(val) {
  const angka = Number.isFinite(val) ? val : 0;
  if (angka > 0 && angka < 0.01) {
    return "$" + formatDesimal(angka, 4, 4);
  }
  return "$" + formatDesimal(angka, 2, 2);
}

/** Biaya rincian satu suku di legenda bar — selalu 2 desimal agar sebaris rapi. */
export function formatBiayaSuku(val) {
  const angka = Number.isFinite(val) ? val : 0;
  return "$" + formatDesimal(angka, 2, 2);
}

/** Harga per 1 juta token untuk teks salinan: "$2", "$0,1", "$0,003". */
export function formatBiayaHarga(val) {
  const angka = Number.isFinite(val) ? val : 0;
  return "$" + formatDesimal(angka, 0, 4);
}

/**
 * Hitung satu sesi agen.
 *
 * @param {Object} params
 * @param {string} params.modelId        - id model di models.js
 * @param {string|number} params.konteksAwal
 * @param {string|number} params.pertumbuhan
 * @param {string|number} params.putaran
 * @param {string|number} params.rasioCache   - persen 0..100
 * @param {string|number} params.outputPerPutaran
 * @param {Object} [params.harga]        - override harga (dipakai kasus uji / masa depan F4)
 *                                         { input, cache, output }
 */
export function hitungF2({
  modelId,
  konteksAwal,
  pertumbuhan,
  putaran,
  rasioCache,
  outputPerPutaran,
  harga,
} = {}) {
  const model = getModelById(modelId);

  const numKonteksAwalMentah = parseToken(konteksAwal);
  const numPertumbuhanMentah = parseToken(pertumbuhan);
  const numPutaranMentah = parseToken(putaran);
  const numRasioMentah = parseToken(rasioCache);
  const numOutputMentah = parseToken(outputPerPutaran);

  const numKonteksAwal = Number.isFinite(numKonteksAwalMentah)
    ? Math.max(0, numKonteksAwalMentah)
    : 0;
  const numPertumbuhan = Number.isFinite(numPertumbuhanMentah)
    ? Math.max(0, numPertumbuhanMentah)
    : 0;
  const numPutaran = Number.isFinite(numPutaranMentah)
    ? Math.max(0, Math.floor(numPutaranMentah))
    : 0;
  const numRasio = Number.isFinite(numRasioMentah)
    ? Math.min(100, Math.max(0, numRasioMentah))
    : 0;
  const numOutput = Number.isFinite(numOutputMentah)
    ? Math.max(0, numOutputMentah)
    : 0;
  const rasio = numRasio / 100;

  const hargaInput = harga
    ? Math.max(0, parseAngka(harga.input) || 0)
    : Math.max(0, parseAngka(model?.hargaInput) || 0);
  const hargaCache = harga
    ? Math.max(0, parseAngka(harga.cache) || 0)
    : Math.max(0, parseAngka(model?.hargaCache) || 0);
  const hargaOutput = harga
    ? Math.max(0, parseAngka(harga.output) || 0)
    : Math.max(0, parseAngka(model?.hargaOutput) || 0);

  // ---- Keadaan tepi: pesan ramah, bukan pembagian tak terdefinisi ----
  let emptyMessage = null;
  if (!model && !harga) {
    emptyMessage = "Model belum tersedia. Pilih model lain untuk melihat perkiraan sesi.";
  } else if (numPutaran <= 0) {
    emptyMessage = PESAN_KOSONG_F2;
  } else if (numKonteksAwal <= 0 && numOutput <= 0) {
    emptyMessage = PESAN_KOSONG_F2;
  } else if (hargaInput <= 0 && hargaCache <= 0 && hargaOutput <= 0) {
    emptyMessage =
      "Harga model belum tersedia. Pilih model lain untuk melihat perkiraan sesi.";
  }

  const isValid = emptyMessage === null;

  // ---- Konteks per putaran (selalu dihitung agar rumus tetap bisa tampil) ----
  const konteksPerPutaran = isValid
    ? Array.from({ length: numPutaran }, (_, i) => numKonteksAwal + i * numPertumbuhan)
    : [];

  // Rata-rata aritmetika konteks (dipakai untuk rumus "Dengan angka").
  const konteksRata =
    numPutaran > 0 ? numKonteksAwal + ((numPutaran - 1) * numPertumbuhan) / 2 : 0;

  // Token cache dibulatkan per putaran; sisa konteks menjadi segar. Dengan
  // konteks bulat hasilnya bilangan eksak (14.000, bukan 13.999,9999…),
  // dan cache + segar selalu sama dengan konteks putaran itu.
  const rincianPutaran = isValid
    ? konteksPerPutaran.map((konteks) => {
        const cache = Math.round(konteks * rasio);
        return { konteks, cache, segar: konteks - cache };
      })
    : [];

  const tokenSegar = rincianPutaran.reduce((s, p) => s + p.segar, 0);
  const tokenCache = rincianPutaran.reduce((s, p) => s + p.cache, 0);
  const tokenOutput = isValid ? numPutaran * numOutput : 0;
  const totalToken = tokenSegar + tokenCache + tokenOutput;

  const biayaSegar = (tokenSegar / 1000000) * hargaInput;
  const biayaCache = (tokenCache / 1000000) * hargaCache;
  const biayaOutput = (tokenOutput / 1000000) * hargaOutput;
  const biayaTotal = isValid ? biayaSegar + biayaCache + biayaOutput : 0;

  // Pembagian dilindungi: numPutaran > 0 sudah dijamin di atas.
  const biayaPerPutaran = isValid && numPutaran > 0 ? biayaTotal / numPutaran : 0;

  const konteksAkhir =
    numPutaran > 0 ? numKonteksAwal + (numPutaran - 1) * numPertumbuhan : 0;

  const ukuranKonteks = Math.max(0, parseAngka(model?.konteks) || 0);
  const konteksMelampaui = isValid && ukuranKonteks > 0 && konteksAkhir > ukuranKonteks;
  const sisaKonteks = ukuranKonteks > 0 ? ukuranKonteks - konteksAkhir : 0;
  const persenKonteks =
    ukuranKonteks > 0 ? (konteksAkhir / ukuranKonteks) * 100 : 0;

  // Porsi biaya tiap suku (untuk bar tumpuk). Dilindungi dari biaya 0.
  const porsi = (nilai) => (biayaTotal > 0 ? (nilai / biayaTotal) * 100 : 0);

  return {
    isValid,
    emptyMessage,
    model,
    putaran: numPutaran,
    rasioCache: numRasio,
    konteksAwal: numKonteksAwal,
    pertumbuhan: numPertumbuhan,
    outputPerPutaran: numOutput,
    hargaInput,
    hargaCache,
    hargaOutput,

    konteksPerPutaran,
    konteksRata,
    tokenSegar,
    tokenCache,
    tokenOutput,
    totalToken,

    biayaSegar,
    biayaCache,
    biayaOutput,
    biayaTotal,
    biayaPerPutaran,

    konteksAkhir,
    ukuranKonteks,
    konteksMelampaui,
    sisaKonteks,
    persenKonteks,

    porsiSegar: porsi(biayaSegar),
    porsiCache: porsi(biayaCache),
    porsiOutput: porsi(biayaOutput),
  };
}
