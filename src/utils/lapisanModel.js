/**
 * Lapisan kustom data model (Sesi 5, F4).
 *
 * Satu sumber data untuk F1–F4:
 *   models.js (bawaan)  +  override pengguna di localStorage
 *
 * Yang disimpan di localStorage HANYA selisihnya — bukan salinan penuh tabel:
 *
 *   {
 *     ubah: {                      // per id model bawaan, hanya field yang berbeda
 *       "claude-sonnet-5-5": { hargaInput: 4 }
 *     },
 *     tambah: [                    // model buatan pengguna, lengkap
 *       { id: "kustom-1", nama, provider, hargaInput, hargaOutput, hargaCache,
 *         konteks, sumber, cek, catatan }
 *     ]
 *   }
 *
 * Dengan begitu pembaruan models.js di masa depan (harga baru, model baru,
 * catatan baru) tetap mengalir ke pengguna yang punya override lama: hanya
 * field yang benar-benar ia ubah yang menutupi bawaan.
 *
 * Fungsi di berkas ini murni + satu penampung status `lapisanModel` yang
 * dibaca ulang setiap berubah, sehingga F1–F3 ikut menghitung ulang seketika
 * saat harga diedit di F4 (tanpa tombol Hitung). Bukan hook React, jadi bisa
 * dipakai dari fungsi hitung murni dan dari uji headless tanpa DOM.
 */

import { models as modelsBawaan } from "../data/models.js";

export const KUNCI_MODELS = "kalkulator-models-kustom";

/** Kolom angka yang bisa diedit, urut tampilan tabel F4. */
export const FIELD_ANGKA = ["hargaInput", "hargaOutput", "hargaCache", "konteks"];
/** Field teks yang ikut disimpan saat model tambahan dibuat. */
export const FIELD_TEKS = ["nama", "provider", "sumber"];
export const FIELD_EDIT = [...FIELD_ANGKA, ...FIELD_TEKS];

const BAWAAN_TERSEDIA = new Set(modelsBawaan.map((m) => m.id));

// ---------------------------------------------------------------------------
// Validasi sel
// ---------------------------------------------------------------------------

const KOSONG = null;

function angkaBersih(teks) {
  if (typeof teks === "number") return String(teks);
  return String(teks ?? "")
    .trim()
    .replace(/\s/g, "")
    .replace(/^\$/, "");
}

/**
 * Membaca satu sel angka dari isian teks.
 * Koma = desimal ("0,05"), titik ribuan dibuang ("1.000.000").
 * Mengembalikan `{ nilai }` bila sah, atau `{ pesan }` ramah bila tidak.
 *
 * Aturan (Sesi 5 butir 3):
 *  - kosong / bukan angka / negatif        -> ditolak
 *  - Infinity / NaN / notasi eksponen      -> ditolak
 *  - harga   : boleh desimal, harus > 0 (0 tidak masuk akal untuk harga)
 *  - konteks : bilangan bulat positif
 */
export function validasiSel(field, teks) {
  if (teks === KOSONG || teks === undefined || String(teks).trim() === "") {
    return { pesan: "Nilai belum diisi. Isi angka dulu." };
  }

  const bersih = angkaBersih(teks);
  if (!/^-?\d+(?:[.,]\d+)?$/.test(bersih)) {
    return { pesan: `"${String(teks).trim()}" bukan angka. Pakai angka, mis. 2 atau 0,05.` };
  }

  const nilai = Number(bersih.replace(",", "."));
  if (!Number.isFinite(nilai)) {
    return { pesan: "Angka tidak masuk akal. Pakai angka biasa, tanpa notasi 1e9." };
  }
  if (nilai < 0) {
    return { pesan: "Angka tidak boleh negatif." };
  }
  if (field === "konteks") {
    if (!Number.isInteger(nilai) || nilai <= 0) {
      return { pesan: "Konteks harus bilangan bulat positif, mis. 1000000." };
    }
    return { nilai };
  }

  if (nilai <= 0) {
    return { pesan: "Harga harus lebih dari 0." };
  }
  return { nilai };
}

// ---------------------------------------------------------------------------
// Baca / bersihkan simpanan
// ---------------------------------------------------------------------------

function angkaSimpanan(field, nilai) {
  if (typeof nilai !== "number" || !Number.isFinite(nilai)) return null;
  if (nilai < 0) return null;
  if (field === "konteks" && (!Number.isInteger(nilai) || nilai <= 0)) return null;
  return nilai;
}

/** Simpanan bersih: hanya `ubah` yang sah dan `tambah` yang lengkap. */
export function normalisasiSimpanan(data) {
  const hasil = { ubah: {}, tambah: [] };
  if (!data || typeof data !== "object") return hasil;

  const ubah = data.ubah && typeof data.ubah === "object" ? data.ubah : {};
  for (const [id, patch] of Object.entries(ubah)) {
    if (!BAWAAN_TERSEDIA.has(id) || !patch || typeof patch !== "object") continue;
    const bersih = {};
    for (const field of FIELD_EDIT) {
      if (!(field in patch)) continue;
      if (field === "nama" || field === "provider" || field === "sumber") {
        if (typeof patch[field] === "string") bersih[field] = patch[field];
      } else {
        const nilai = angkaSimpanan(field, patch[field]);
        if (nilai !== null) bersih[field] = nilai;
      }
    }
    if (Object.keys(bersih).length) hasil.ubah[id] = bersih;
  }

  const tambah = Array.isArray(data.tambah) ? data.tambah : [];
  const terpakai = new Set();
  for (const m of tambah) {
    if (!m || typeof m !== "object") continue;
    if (typeof m.id !== "string" || !m.id.trim()) continue;
    if (BAWAAN_TERSEDIA.has(m.id) || terpakai.has(m.id)) continue;

    const angka = {};
    let lengkap = true;
    for (const field of FIELD_ANGKA) {
      const nilai = angkaSimpanan(field, m[field]);
      if (nilai === null) {
        lengkap = false;
        break;
      }
      angka[field] = nilai;
    }
    if (!lengkap) continue;

    terpakai.add(m.id);
    hasil.tambah.push({
      id: m.id,
      nama: typeof m.nama === "string" && m.nama.trim() ? m.nama.trim() : m.id,
      provider:
        typeof m.provider === "string" && m.provider.trim()
          ? m.provider.trim()
          : "Kustom",
      ...angka,
      sumber: typeof m.sumber === "string" ? m.sumber.trim() : "",
      cek: typeof m.cek === "string" ? m.cek : "",
      catatan: typeof m.catatan === "string" ? m.catatan : "",
      kustom: true,
      baru: m.baru === true,
    });
  }

  return hasil;
}

export function bacaLapisan() {
  if (typeof window === "undefined") return { ubah: {}, tambah: [] };
  try {
    const mentah = window.localStorage.getItem(KUNCI_MODELS);
    if (!mentah) return { ubah: {}, tambah: [] };
    return normalisasiSimpanan(JSON.parse(mentah));
  } catch {
    return { ubah: {}, tambah: [] };
  }
}

/** True bila simpanan tidak menyimpan selisih maupun model tambahan. */
export function lapisanKosong(lapisan) {
  if (!lapisan || typeof lapisan !== "object") return true;
  const ubah = lapisan.ubah && Object.keys(lapisan.ubah).length > 0;
  const tambah = Array.isArray(lapisan.tambah) && lapisan.tambah.length > 0;
  return !ubah && !tambah;
}

function tulisSimpanan(lapisan) {
  if (typeof window === "undefined") return;
  try {
    if (lapisanKosong(lapisan)) {
      window.localStorage.removeItem(KUNCI_MODELS);
    } else {
      window.localStorage.setItem(KUNCI_MODELS, JSON.stringify(lapisan));
    }
  } catch {
    // Penyimpanan penuh / mode privat — perubahan tetap berlaku selama sesi
    // lewat penampung status di bawah.
  }
}

// ---------------------------------------------------------------------------
// Gabung bawaan + kustom
// ---------------------------------------------------------------------------

/** Daftar model gabungan: bawaan lalu model tambahan. */
export function gabungModel(lapisan) {
  const aman = lapisan && typeof lapisan === "object" ? lapisan : { ubah: {}, tambah: [] };
  const ubah = aman.ubah ?? {};
  const bawaan = modelsBawaan.map((m) => {
    const patch = ubah[m.id];
    return patch ? { ...m, ...patch } : m;
  });
  const tambah = Array.isArray(aman.tambah)
    ? aman.tambah.map((m) => ({ catatan: "", sumber: "", cek: "", ...m, kustom: true }))
    : [];
  return [...bawaan, ...tambah];
}

/** Alas kaki "dicek 19 Nov 2026" dari field `cek` ISO. Kosong -> "". */
export function formatCek(cek) {
  if (!cek || typeof cek !== "string") return "";
  const cocok = /^(\d{4})-(\d{2})-(\d{2})$/.exec(cek.trim());
  if (!cocok) return cek;
  const [, y, b, d] = cocok;
  const tanggal = new Date(Date.UTC(Number(y), Number(b) - 1, Number(d)));
  if (Number.isNaN(tanggal.getTime())) return cek;
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(tanggal);
}

// ---------------------------------------------------------------------------
// Penampung status (dibaca fungsi hitung)
// ---------------------------------------------------------------------------

let versionsModel = null; // `modelsBawaan` saat penampung dibuat
let penampungLapisan = { ubah: {}, tambah: [] };
let stateModel = null;
let listenersModel = new Set();
let lapisanCache = null; // objek stabil untuk lapisanSaatIni()

/** Muat ulang dari localStorage bila models.js berubah (mis. HMR). */
function pastikanSegar() {
  if (versionsModel === modelsBawaan) return;
  versionsModel = modelsBawaan;
  penampungLapisan = bacaLapisan();
  lapisanCache = null;
  stateModel = null;
}

/**
 * Daftar model gabungan yang selalu segar (bukan hook).
 * Sesi hitung F1–F3 memakai fungsi ini.
 */
export function getModels() {
  pastikanSegar();
  if (!stateModel) stateModel = gabungModel(penampungLapisan);
  return stateModel;
}

/** Ringkasan stabilitas lapisan: `"kosong"` bila tanpa selisih & model tambahan. */
export function getSnapshotLapisan() {
  pastikanSegar();
  return lapisanKosong(penampungLapisan) ? "kosong" : "kustom";
}

/** Lapisan SAAT INI — objeknya dijaga stabil antar-render (aman untuk useSyncExternalStore). */
export function lapisanSaatIni() {
  pastikanSegar();
  if (!lapisanCache) {
    lapisanCache = {
      ubah: penampungLapisan.ubah,
      tambah: penampungLapisan.tambah,
      kosong: lapisanKosong(penampungLapisan),
    };
  }
  return lapisanCache;
}

/**
 * Muat ulang dari localStorage (dipakai saat muat awal & event `storage`).
 */
export function muatUlangLapisan() {
  versionsModel = modelsBawaan;
  penampungLapisan = bacaLapisan();
  lapisanCache = null;
  stateModel = null;
  beritahu();
}

/**
 * Langganan perubahan daftar model (dipakai useSyncExternalStore).
 * Mengembalikan fungsi pembatal.
 */
export function langgananModel(listener) {
  listenersModel.add(listener);
  return () => listenersModel.delete(listener);
}

function beritahu() {
  for (const listener of [...listenersModel]) listener();
}

/** Simpan lapisan baru: segarkan cache, tulis localStorage, beri tahu pelanggan. */
function simpanLapisanBaru(lapisan) {
  penampungLapisan = lapisan;
  lapisanCache = null;
  stateModel = null;
  tulisSimpanan(lapisan);
  beritahu();
}

// ---------------------------------------------------------------------------
// Aksi F4
// ---------------------------------------------------------------------------

function hargaBawaan(id) {
  return modelsBawaan.find((m) => m.id === id) ?? null;
}

/** Field model kustom yang bisa diedit di baris tambahan. */
const FIELD_KUSTOM = ["nama", "provider", "hargaInput", "hargaOutput", "hargaCache", "konteks", "sumber"];

/**
 * Ubah satu sel.
 * - Model bawaan: hanya field yang berbeda dari bawaan yang disimpan ke `ubah`.
 *   Mengembalikan nilainya ke bawaan = selisih itu dihapus.
 * - Model tambahan: disimpan langsung di `tambah`.
 * Nilai harus sudah lolos `validasiSel`.
 */
export function ubahSel(id, field, nilai) {
  const sekarang = getModels().find((m) => m.id === id);
  if (!sekarang) return;
  const lapisan = {
    ubah: { ...penampungLapisan.ubah },
    tambah: penampungLapisan.tambah.map((m) => ({ ...m })),
  };

  if (!sekarang.kustom) {
    const asli = hargaBawaan(id);
    if (!asli) return;
    const patch = { ...(lapisan.ubah[id] ?? {}) };
    if (field === "nama" || field === "provider" || field === "sumber") {
      if (nilai === asli[field]) delete patch[field];
      else patch[field] = nilai;
    } else if (nilai === asli[field]) {
      delete patch[field];
    } else {
      patch[field] = nilai;
    }
    if (Object.keys(patch).length) lapisan.ubah[id] = patch;
    else delete lapisan.ubah[id];
  } else {
    const i = lapisan.tambah.findIndex((m) => m.id === id);
    if (i < 0 || !FIELD_KUSTOM.includes(field)) return;
    const sebelum = lapisan.tambah[i][field];
    lapisan.tambah[i][field] = nilai;
    // Angka contoh hanya penanda baris baru; hilang setelah angka diubah.
    if (nilai !== sebelum) delete lapisan.tambah[i].baru;
  }

  simpanLapisanBaru(lapisan);
}

/** Kembalikan seluruh selisih + isian satu model BAWAAN ke nilai models.js. */
export function resetBaris(id) {
  if (!BAWAAN_TERSEDIA.has(id)) return;
  if (!penampungLapisan.ubah[id]) return;
  const ubah = { ...penampungLapisan.ubah };
  delete ubah[id];
  simpanLapisanBaru({ ubah, tambah: penampungLapisan.tambah.map((m) => ({ ...m })) });
}

function idKustomBaru(lapisanAwal) {
  const terpakai = new Set([
    ...modelsBawaan.map((m) => m.id),
    ...(lapisanAwal?.tambah ?? []).map((m) => m.id),
  ]);
  let n = 1;
  while (terpakai.has(`kustom-${n}`)) n += 1;
  return `kustom-${n}`;
}

/**
 * Satu-satunya tempat model tambahan baru dibuat: nilai awalnya sudah lengkap
 * dan sah (harga acuan $1/$2/$0,05, konteks 100.000) supaya simpanan tidak
 * pernah berisi angka 0/NaN yang tidak disengaja. Penanda `baru` dipakai UI
 * untuk memberi tahu bahwa angkanya contoh dan wajib dicek.
 */
export function modelKustomBaru(id) {
  return {
    id,
    nama: "",
    provider: "",
    hargaInput: 1,
    hargaOutput: 2,
    hargaCache: 0.05,
    konteks: 100000,
    sumber: "",
    cek: "",
    catatan: "",
    kustom: true,
    baru: true,
  };
}

/**
 * Tambah satu model contoh (kustom). Model langsung tampil di tabel F4 dan
 * dropdown F1–F3; nama/provider/sumber boleh kosong ("sumber belum diisi"),
 * harga & konteks sudah terisi angka contoh yang sah sehingga tidak pernah ada
 * NaN/0 yang tidak disengaja. Mengembalikan id baru.
 */
export function tambahModel() {
  const id = idKustomBaru(penampungLapisan);
  const tambah = [
    ...penampungLapisan.tambah.map((m) => ({ ...m })),
    modelKustomBaru(id),
  ];
  simpanLapisanBaru({ ubah: { ...penampungLapisan.ubah }, tambah });
  return id;
}

/** Hapus model tambahan (baris bawaan tidak bisa dihapus). */
export function hapusModel(id) {
  if (!penampungLapisan.tambah.some((m) => m.id === id)) return;
  simpanLapisanBaru({
    ubah: { ...penampungLapisan.ubah },
    tambah: penampungLapisan.tambah.filter((m) => m.id !== id).map((m) => ({ ...m })),
  });
}

/** Hapus seluruh kunci `kalkulator-models-kustom` → tabel 2C kembali. */
export function kembalikanBawaan() {
  penampungLapisan = { ubah: {}, tambah: [] };
  lapisanCache = null;
  stateModel = null;
  if (typeof window !== "undefined") {
    try {
      window.localStorage.removeItem(KUNCI_MODELS);
    } catch {
      // Mode privat / penyimpanan terkunci — tabel bawaan tetap berlaku sesi ini.
    }
  }
  beritahu();
}

/**
 * Seluruh aksi lapisan dalam satu objek.
 * Dipakai App (satu import) sekaligus menjadi pegangan bersama untuk modul lain
 * dalam bundel yang sama — penting agar hook F4 membaca store yang SAMA dengan
 * fungsi hitung F1–F3 (tak pernah ada dua salinan store).
 */
export const aksiModel = {
  ubahSel,
  resetBaris,
  tambahModel,
  hapusModel,
  kembalikanBawaan,
  muatUlang: muatUlangLapisan,
};
