import { useCallback, useEffect, useState } from "react";

/**
 * Lipatan pita "Rumus & Asumsi" / "Metode & Asumsi" (Sesi 4B).
 *
 * Aturan (keputusan pemilik 20 Nov 2026):
 * - Pita metode bawaan SELALU TERBUKA (kewajiban PRD).
 * - Melipat adalah pilihan pengguna, tersimpan per modul di localStorage
 *   kunci bersama `kalkulator-pita` berisi `{ f1, f2, f3 }` boolean.
 * - Melipat satu modul tidak memengaruhi modul lain; nilai tak dikenal
 *   dikembalikan ke terbuka.
 */

export const PITA_KEY = "kalkulator-pita";
export const MODUL_PITA = ["f1", "f2", "f3"];

function bacaSimpanan() {
  const bawaan = { f1: true, f2: true, f3: true };
  if (typeof window === "undefined") return bawaan;
  try {
    const mentah = window.localStorage.getItem(PITA_KEY);
    if (!mentah) return bawaan;
    const data = JSON.parse(mentah);
    if (!data || typeof data !== "object") return bawaan;
    return MODUL_PITA.reduce((hasil, id) => {
      hasil[id] = typeof data[id] === "boolean" ? data[id] : true;
      return hasil;
    }, {});
  } catch {
    return bawaan;
  }
}

function tulis(modul, terbuka) {
  if (typeof window === "undefined") return;
  try {
    const data = bacaSimpanan();
    data[modul] = terbuka;
    window.localStorage.setItem(PITA_KEY, JSON.stringify(data));
  } catch {
    // Penyimpanan tidak tersedia (mode privat / kuota penuh) — abaikan diam-diam.
  }
}

/**
 * @param {"f1"|"f2"|"f3"} modul
 * @returns {{ terbuka: boolean, setTerbuka: (v: boolean) => void, toggle: () => void }}
 */
export function usePitaTerbuka(modul) {
  const [terbuka, setState] = useState(() => bacaSimpanan()[modul] !== false);

  // Muat ulang di tab lain / perubahan luar ikut diterapkan.
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key !== null && e.key !== PITA_KEY) return;
      setState(bacaSimpanan()[modul] !== false);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [modul]);

  const setTerbuka = useCallback(
    (nilai) => {
      setState(nilai);
      tulis(modul, nilai);
    },
    [modul]
  );

  const toggle = useCallback(() => {
    setState((prev) => {
      tulis(modul, !prev);
      return !prev;
    });
  }, [modul]);

  return { terbuka, setTerbuka, toggle };
}
