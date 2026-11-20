import { useState, useEffect, useCallback } from "react";
import { models } from "../data/models.js";

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

function bacaSimpanan() {
  if (typeof window === "undefined") return DEFAULTS;
  try {
    const mentah = window.localStorage.getItem(STORAGE_KEY);
    if (!mentah) return DEFAULTS;
    const data = JSON.parse(mentah);
    if (!data || typeof data !== "object") return DEFAULTS;

    const modelId = models.some((m) => m.id === data.modelId)
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

  return {
    state,
    pilihModel,
    aturKonteksAwal,
    aturPertumbuhan,
    aturPutaran,
    aturRasioCache,
    aturOutputPerPutaran,
  };
}
