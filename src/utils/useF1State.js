import { useState, useEffect, useCallback } from "react";
import { models, presets } from "../data/models.js";

const STORAGE_KEY = "kalkulator-f1-input";

/**
 * Nilai awal wajib cocok dengan kasus uji sesi 2:
 * jatah $10, input 10.000 @ $3, output 2.000 @ $15.
 */
const DEFAULTS = {
  paketId: "opencode-go",
  modelId: "claude-sonnet",
  jatah: "10",
  totalKuota: "50",
  jendela: "5jam",
  tokenInput: "10000",
  tokenOutput: "2000",
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

    const paketId = presets.some((p) => p.id === data.paketId)
      ? data.paketId
      : DEFAULTS.paketId;
    const modelId = models.some((m) => m.id === data.modelId)
      ? data.modelId
      : DEFAULTS.modelId;
    const jendela = ["5jam", "minggu", "bulan"].includes(data.jendela)
      ? data.jendela
      : DEFAULTS.jendela;

    return {
      paketId,
      modelId,
      jendela,
      jatah: teksAtau(data.jatah, DEFAULTS.jatah),
      totalKuota: teksAtau(data.totalKuota, DEFAULTS.totalKuota),
      tokenInput: teksAtau(data.tokenInput, DEFAULTS.tokenInput),
      tokenOutput: teksAtau(data.tokenOutput, DEFAULTS.tokenOutput),
    };
  } catch {
    return DEFAULTS;
  }
}

/**
 * Status masukan F1 + persistensi localStorage + aksi preset.
 * Semua nilai disimpan sebagai teks agar masukan bisa dikosongkan user.
 */
export function useF1State() {
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

  const pilihPaket = useCallback((paketId) => {
    const preset = presets.find((p) => p.id === paketId);
    if (!preset) return;
    setState((prev) => ({
      ...prev,
      paketId: preset.id,
      jatah: String(preset.jatahBawaan),
      totalKuota: String(preset.totalKuota),
      jendela: preset.jendelaBawaan,
    }));
  }, []);

  const pilihModel = useCallback(
    (modelId) => ubah({ modelId }),
    [ubah]
  );
  const aturJatah = useCallback((jatah) => ubah({ jatah }), [ubah]);
  const aturTotalKuota = useCallback(
    (totalKuota) => ubah({ totalKuota }),
    [ubah]
  );
  const aturJendela = useCallback((jendela) => ubah({ jendela }), [ubah]);
  const aturTokenInput = useCallback(
    (tokenInput) => ubah({ tokenInput }),
    [ubah]
  );
  const aturTokenOutput = useCallback(
    (tokenOutput) => ubah({ tokenOutput }),
    [ubah]
  );

  return {
    state,
    pilihPaket,
    pilihModel,
    aturJatah,
    aturTotalKuota,
    aturJendela,
    aturTokenInput,
    aturTokenOutput,
  };
}
