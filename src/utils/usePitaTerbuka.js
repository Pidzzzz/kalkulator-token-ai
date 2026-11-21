import { useCallback, useEffect, useState } from "react";

/**
 * Lipatan pita "Rumus & Asumsi" / "Metode & Asumsi" (Sesi 4B) dan pita
 * "Cara Pakai" (Sesi 8).
 *
 * Aturan (keputusan pemilik 20 Nov 2026):
 * - Pita metode bawaan SELALU TERBUKA (kewajiban PRD).
 * - Melipat adalah pilihan pengguna, tersimpan per modul di localStorage.
 * - Melipat satu modul tidak memengaruhi modul lain; nilai tak dikenal
 *   dikembalikan ke terbuka.
 *
 * Dua kunci sengaja TERPISAH agar keadaan pita metode yang sudah tersimpan
 * di browser pengguna tidak berubah saat pita Cara Pakai dilipat:
 *   kalkulator-pita             -> metode F1-F3 (Sesi 4B)
 *   kalkulator-pita-cara-pakai  -> Cara Pakai F1-F4 (Sesi 8)
 */

export const PITA_KEY = "kalkulator-pita";
export const MODUL_PITA = ["f1", "f2", "f3"];

export const CARA_PAKAI_KEY = "kalkulator-pita-cara-pakai";
export const MODUL_CARA_PAKAI = ["f1", "f2", "f3", "f4"];

function bacaKunci(kunci, daftarModul) {
  const bawaan = daftarModul.reduce((hasil, id) => {
    hasil[id] = true;
    return hasil;
  }, {});

  if (typeof window === "undefined") return bawaan;
  try {
    const mentah = window.localStorage.getItem(kunci);
    if (!mentah) return bawaan;
    const data = JSON.parse(mentah);
    if (!data || typeof data !== "object") return bawaan;
    return daftarModul.reduce((hasil, id) => {
      hasil[id] = typeof data[id] === "boolean" ? data[id] : true;
      return hasil;
    }, {});
  } catch {
    return bawaan;
  }
}

function tulisKunci(kunci, daftarModul, modul, terbuka) {
  if (typeof window === "undefined") return;
  try {
    const data = bacaKunci(kunci, daftarModul);
    data[modul] = terbuka;
    window.localStorage.setItem(kunci, JSON.stringify(data));
  } catch {
    // Penyimpanan tidak tersedia (mode privat / kuota penuh) — abaikan diam-diam.
  }
}

function bacaSimpanan() {
  return bacaKunci(PITA_KEY, MODUL_PITA);
}

function tulis(modul, terbuka) {
  tulisKunci(PITA_KEY, MODUL_PITA, modul, terbuka);
}

/**
 * Hook bersama untuk satu pita ber-kunci sendiri.
 *
 * @param {string} kunci
 * @param {string[]} daftarModul
 * @param {string} modul
 */
function usePitaBerKunci(kunci, daftarModul, modul) {
  const [terbuka, setState] = useState(
    () => bacaKunci(kunci, daftarModul)[modul] !== false
  );

  // Muat ulang di tab lain / perubahan luar ikut diterapkan.
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key !== null && e.key !== kunci) return;
      setState(bacaKunci(kunci, daftarModul)[modul] !== false);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [kunci, daftarModul, modul]);

  const setTerbuka = useCallback(
    (nilai) => {
      setState(nilai);
      tulisKunci(kunci, daftarModul, modul, nilai);
    },
    [kunci, daftarModul, modul]
  );

  const toggle = useCallback(() => {
    setState((prev) => {
      tulisKunci(kunci, daftarModul, modul, !prev);
      return !prev;
    });
  }, [kunci, daftarModul, modul]);

  return { terbuka, setTerbuka, toggle };
}

/**
 * @param {"f1"|"f2"|"f3"} modul
 * @returns {{ terbuka: boolean, setTerbuka: (v: boolean) => void, toggle: () => void }}
 */
export function usePitaTerbuka(modul) {
  return usePitaBerKunci(PITA_KEY, MODUL_PITA, modul);
}

/**
 * Pita "Cara Pakai" F1-F4 — kunci terpisah dari pita metode.
 *
 * @param {"f1"|"f2"|"f3"|"f4"} modul
 * @returns {{ terbuka: boolean, setTerbuka: (v: boolean) => void, toggle: () => void }}
 */
export function usePitaCaraPakai(modul) {
  return usePitaBerKunci(CARA_PAKAI_KEY, MODUL_CARA_PAKAI, modul);
}
