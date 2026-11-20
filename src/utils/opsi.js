import { presets, jendelaOptions } from "../data/models.js";
import { formatDesimal, formatHarga, formatRibuan } from "./calculator.js";
import { getModels } from "./lapisanModel.js";

/**
 * Pembangun opsi dropdown bersama F1, F2 & F3 (Sesi 3, diperbarui Sesi 5).
 * Struktur data opsi tetap identik dengan F1 Sesi 2B/2E.
 *
 * Sesi 5: daftar model dibaca LEwat lapisan bersama (`getModels()`), jadi
 * model tambahan dari F4 muncul di sini dan harga editan langsung tampil.
 * Model tambahan yang harga/keyakinannya belum lengkap diberi penanda
 * "(belum lengkap)" agar tidak dipilih lalu menghasilkan pesan harga kosong
 * tanpa penjelasan.
 */

export function formatHargaCache(nilai) {
  return formatDesimal(nilai, 2, 4);
}

/** True bila semua sel angka model tambahan sudah terisi (> 0, konteks bulat). */
export function modelLengkap(m) {
  if (!m) return false;
  const { hargaInput, hargaOutput, hargaCache, konteks } = m;
  const terisi = [hargaInput, hargaOutput, hargaCache].every(
    (v) => typeof v === "number" && Number.isFinite(v) && v > 0
  );
  return terisi && Number.isInteger(konteks) && konteks > 0;
}

function labelModel(m) {
  return m.nama || (m.kustom ? "Model baru (belum diberi nama)" : m.id);
}

/** Opsi bergrup per provider, dengan harga menempel di baris dan pemicu. */
export function buatOpsiModel(daftar = getModels()) {
  const grup = new Map();
  for (const m of daftar) {
    const nama = labelModel(m);
    const label =
      m.kustom && !modelLengkap(m) ? `${nama} — belum lengkap` : nama;
    const detail = m.kustom && !modelLengkap(m)
      ? "isi harga & konteks di F4 agar model ini bisa dipakai"
      : `input $${formatHarga(m.hargaInput)} · output $${formatHarga(
          m.hargaOutput
        )} · cache $${formatHargaCache(m.hargaCache)} per 1 jt`;
    if (!grup.has(m.provider)) grup.set(m.provider, []);
    grup.get(m.provider).push({
      value: m.id,
      label,
      short: `$${formatHarga(m.hargaInput)}/$${formatHarga(m.hargaOutput)}`,
      detail,
    });
  }
  return Array.from(grup.entries()).map(([label, options]) => ({
    label,
    options,
  }));
}

export function buatOpsiPaket() {
  return presets.map((p) => ({ value: p.id, label: p.nama }));
}

export function buatOpsiJendela() {
  return jendelaOptions.map((j) => ({ value: j.id, label: j.label }));
}

/** Teks konteks untuk tabel F4: "1.000.000 token". */
export function formatKonteks(nilai) {
  if (!Number.isFinite(nilai) || nilai <= 0) return "—";
  return `${formatRibuan(nilai)} token`;
}
