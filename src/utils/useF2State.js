import { useState, useEffect, useCallback } from "react";
import { getModels } from "./lapisanModel.js";

const STORAGE_KEY = "kalkulator-f2-input";

/**
 * Nilai awal = kasus uji PRD F2: model Claude Sonnet 5.5, konteks awal
 * 10.000, pertumbuhan 2.000, 5 putaran, rasio cache 80%, output 1.000.
 */
const DEFAULTS = {
  modelId: "claude-sonnet-5-5",
  konteksAwal: "10000",
  pertumbuhan: "2000",
  putaran: "5",
  rasioCache: "80",
  outputPerPutaran: "1000",
};

function teksAtau(nilai, cadangan) {
  return typeof nilai === "string" || typeof nilai === "number"
    ? String(nilai)
    : cadangan;
}

/**
 * Preset skenario F2 (Sesi 3C). Mengisi kelima isian angka sekaligus lewat
 * satu klik; model yang sedang terpilih TIDAK diubah. Aksi isi-sekali —
 * setelah diklik semua isian tetap bebas diubah.
 */
export const PRESET_SKENARIO_F2 = [
  {
    id: "singkat",
    label: "Sesi singkat",
    konteksAwal: 8000,
    pertumbuhan: 1500,
    putaran: 5,
    rasioCache: 80,
    outputPerPutaran: 800,
  },
  {
    id: "ngoding",
    label: "Sesi ngoding biasa",
    konteksAwal: 15000,
    pertumbuhan: 3000,
    putaran: 20,
    rasioCache: 85,
    outputPerPutaran: 1200,
  },
  {
    id: "maraton",
    label: "Sesi maraton",
    konteksAwal: 20000,
    pertumbuhan: 5000,
    putaran: 60,
    rasioCache: 90,
    outputPerPutaran: 1500,
  },
];

function bacaSimpanan() {
  if (typeof window === "undefined") return DEFAULTS;
  try {
    const mentah = window.localStorage.getItem(STORAGE_KEY);
    if (!mentah) return DEFAULTS;
    const data = JSON.parse(mentah);
    if (!data || typeof data !== "object") return DEFAULTS;

    const modelId = getModels().some((m) => m.id === data.modelId)
      ? data.modelId
      : DEFAULTS.modelId;

    return {
      modelId,
      konteksAwal: teksAtau(data.konteksAwal, DEFAULTS.konteksAwal),
      pertumbuhan: teksAtau(data.pertumbuhan, DEFAULTS.pertumbuhan),
      putaran: teksAtau(data.putaran, DEFAULTS.putaran),
      rasioCache: teksAtau(data.rasioCache, DEFAULTS.rasioCache),
      outputPerPutaran: teksAtau(data.outputPerPutaran, DEFAULTS.outputPerPutaran),
    };
  } catch {
    return DEFAULTS;
  }
}

/**
 * Status masukan F2 + persistensi localStorage.
 * Semua nilai disimpan sebagai teks agar masukan bisa dikosongkan user.
 */
export function useF2State() {
  const [state, setState] = useState(bacaSimpanan);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Penyimpanan tidak tersedia (mode privat / kuota penuh) — abaikan.
    }
  }, [state]);

  const ubah = useCallback((patch) => {
    setState((prev) => ({ ...prev, ...patch }));
  }, []);

  const pilihModel = useCallback((modelId) => ubah({ modelId }), [ubah]);
  const aturKonteksAwal = useCallback((konteksAwal) => ubah({ konteksAwal }), [ubah]);
  const aturPertumbuhan = useCallback((pertumbuhan) => ubah({ pertumbuhan }), [ubah]);
  const aturPutaran = useCallback((putaran) => ubah({ putaran }), [ubah]);
  const aturRasioCache = useCallback((rasioCache) => ubah({ rasioCache }), [ubah]);
  const aturOutputPerPutaran = useCallback(
    (outputPerPutaran) => ubah({ outputPerPutaran }),
    [ubah]
  );

  /** Isi kelima isian angka dari preset skenario; model tidak disentuh. */
  const pilihSkenario = useCallback(
    (presetSkenario) => {
      const preset =
        typeof presetSkenario === "string"
          ? PRESET_SKENARIO_F2.find((p) => p.id === presetSkenario)
          : presetSkenario;
      if (!preset) return;
      setState((prev) => ({
        ...prev,
        konteksAwal: String(preset.konteksAwal),
        pertumbuhan: String(preset.pertumbuhan),
        putaran: String(preset.putaran),
        rasioCache: String(preset.rasioCache),
        outputPerPutaran: String(preset.outputPerPutaran),
      }));
    },
    []
  );

  return {
    state,
    pilihModel,
    aturKonteksAwal,
    aturPertumbuhan,
    aturPutaran,
    aturRasioCache,
    aturOutputPerPutaran,
    pilihSkenario,
  };
}
