import { models, presets, jendelaOptions } from "../data/models.js";
import { formatDesimal, formatHarga } from "./calculator.js";

/**
 * Pembangun opsi dropdown bersama F1 & F2 (Sesi 3).
 * Struktur data opsi tetap identik dengan F1 Sesi 2B/2E — hanya dipindahkan
 * ke sini agar panel Masukan F2 tidak menyalin ulang kode yang sama.
 */

export function formatHargaCache(nilai) {
  return formatDesimal(nilai, 2, 4);
}

/** Opsi bergrup per provider, dengan harga menempel di baris dan pemicu. */
export function buatOpsiModel() {
  const grup = new Map();
  for (const m of models) {
    if (!grup.has(m.provider)) grup.set(m.provider, []);
    grup.get(m.provider).push({
      value: m.id,
      label: m.nama,
      short: `$${formatHarga(m.hargaInput)}/$${formatHarga(m.hargaOutput)}`,
      detail: `input $${formatHarga(m.hargaInput)} · output $${formatHarga(
        m.hargaOutput
      )} · cache $${formatHargaCache(m.hargaCache)} per 1 jt`,
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
