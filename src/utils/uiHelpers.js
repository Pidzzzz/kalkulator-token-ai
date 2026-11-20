import { models } from "../data/models.js";
import { formatDesimal, formatHarga } from "./calculator.js";

/**
 * Helper tampilan yang dipakai bersama F1 & F2 (Sesi 3).
 * Dipisah agar opsi dropdown Model dan logika salin tidak ditulis dua kali.
 */

function formatHargaCache(nilai) {
  return formatDesimal(nilai, 2, 4);
}

/**
 * Opsi dropdown Model (bergrup per provider) — format sama dengan F1:
 * pengenal singkat "$2/$10" di pemicu dan rincian harga di dalam daftar.
 */
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

/** Label harga ringkas untuk judul grup dropdown: "input $2 · cache $0,10 · output $10". */
export function hargaModelTeks(model) {
  if (!model) return "—";
  return `input $${formatHarga(model.hargaInput)} · cache $${formatHargaCache(
    model.hargaCache
  )} · output $${formatHarga(model.hargaOutput)} per 1 jt token`;
}

function salinLama(teks) {
  const area = document.createElement("textarea");
  area.value = teks;
  area.setAttribute("readonly", "");
  area.style.position = "fixed";
  area.style.top = "-9999px";
  area.style.opacity = "0";
  document.body.appendChild(area);
  area.select();

  let berhasil = false;
  try {
    berhasil = document.execCommand("copy");
  } catch {
    berhasil = false;
  }
  document.body.removeChild(area);
  return berhasil;
}

/** Salin teks ke papan klip dengan cadangan `execCommand`. Mengembalikan boolean. */
export async function salinKePapan(teks) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(teks);
      return true;
    }
  } catch {
    // Jatuh ke cara lama di bawah.
  }
  return salinLama(teks);
}

export const MATA_UANG_KEY = "kalkulator-mata-uang";
