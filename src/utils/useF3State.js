/**
 * Status masukan F3 (teks + model) + persistensi localStorage.
 * Pola sama dengan useF1State / useF2State: nilai tersimpan divalidasi balik
 * ke bawaan; kegagalan penyimpanan (mode privat / kuota penuh) diabaikan.
 */

import { useState, useEffect, useCallback } from "react";
import { models } from "../data/models.js";
import { TEKS_CONTOH_F3 } from "./calculatorF3.js";

export const STORAGE_KEY_F3 = "kalkulator-f3-input";

export const DEFAULTS_F3 = {
  teks: "",
  modelId: "claude-sonnet-5-5",
};

function bacaSimpanan() {
  if (typeof window === "undefined") return DEFAULTS_F3;
  try {
    const mentah = window.localStorage.getItem(STORAGE_KEY_F3);
    if (!mentah) return DEFAULTS_F3;
    const data = JSON.parse(mentah);
    if (!data || typeof data !== "object") return DEFAULTS_F3;

    return {
      teks: typeof data.teks === "string" ? data.teks : DEFAULTS_F3.teks,
      modelId: models.some((m) => m.id === data.modelId)
        ? data.modelId
        : DEFAULTS_F3.modelId,
    };
  } catch {
    return DEFAULTS_F3;
  }
}

export function useF3State() {
  const [state, setState] = useState(bacaSimpanan);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY_F3, JSON.stringify(state));
    } catch {
      // Penyimpanan tidak tersedia (mode privat / kuota penuh) — abaikan diam-diam.
    }
  }, [state]);

  const aturTeks = useCallback((teks) => {
    setState((prev) => ({ ...prev, teks }));
  }, []);

  const pilihModel = useCallback((modelId) => {
    setState((prev) => ({ ...prev, modelId }));
  }, []);

  const isiContoh = useCallback(() => {
    setState((prev) => ({ ...prev, teks: TEKS_CONTOH_F3 }));
  }, []);

  const bersihkan = useCallback(() => {
    setState((prev) => ({ ...prev, teks: "" }));
  }, []);

  return { state, aturTeks, pilihModel, isiContoh, bersihkan };
}
