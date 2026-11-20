/**
 * `useModels()` — daftar model gabungan (bawaan + kustom pengguna) untuk F1–F4.
 *
 * Membaca satu sumber: `lapisanModel.js` (models.js + localStorage
 * `kalkulator-models-kustom`). Setiap perubahan di F4 (edit harga, tambah,
 * hapus, kembalikan bawaan) memberi tahu pelanggan store, sehingga panel F1–F3
 * merender ulang dan hitungannya ikut berubah seketika — tanpa tombol Hitung.
 *
 * Dibangun di atas `useSyncExternalStore` agar aman terhadap render ganda dan
 * tidak membocorkan listener.
 */

import { useEffect, useSyncExternalStore } from "react";
import {
  KUNCI_MODELS,
  getModels,
  langgananModel,
  muatUlangLapisan,
} from "./lapisanModel.js";

/** Daftar model gabungan yang selalu segar + otomatis reaktif. */
export function useModels() {
  return useSyncExternalStore(langgananModel, getModels, getModels);
}

/** Sekali per halaman: sinkronkan antar-tab (edit di tab lain ikut tampil). */
export function useSinkronModel() {
  useEffect(() => {
    const onStorage = (e) => {
      if (!e || e.key === null || e.key === KUNCI_MODELS) {
        muatUlangLapisan();
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);
}
