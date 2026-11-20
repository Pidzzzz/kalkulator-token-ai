import { useMemo } from "react";
import Dropdown from "./Dropdown";
import { buatOpsiModel } from "../utils/opsi";

/**
 * Panel Masukan F3 — Penghitung Token Teks.
 * Satu textarea besar; semua perubahan langsung memicu hitung ulang.
 */
export default function TeksInput({
  modelId,
  teks,
  onPilihModel,
  onUbahTeks,
  onContoh,
  onBersihkan,
}) {
  const grupModel = useMemo(() => buatOpsiModel(), []);

  return (
    <article className="card">
      <h2 className="card__title">Masukan</h2>

      <form className="input-form" onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label className="form-label" htmlFor="f3-model">
            Model
          </label>
          <Dropdown
            id="f3-model"
            label="Model"
            value={modelId}
            onChange={onPilihModel}
            groups={grupModel}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="f3-teks">
            Teks
          </label>
          <p className="form-hint" id="f3-teks-hint">
            Tempel teks apa pun — prompt, artikel, atau kode. Semua dihitung di
            browser; teksmu tidak dikirim ke mana pun.
          </p>
          <textarea
            className="form-input form-textarea"
            id="f3-teks"
            name="teks"
            rows={8}
            placeholder="Tempel atau ketik teks di sini…"
            spellCheck="false"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            aria-describedby="f3-teks-hint"
            value={teks}
            onChange={(e) => onUbahTeks(e.target.value)}
          />
          <div className="teks-aksi" role="group" aria-label="Aksi teks">
            <button
              type="button"
              className="preset-chip"
              onClick={onContoh}
            >
              Contoh teks
            </button>
            <button
              type="button"
              className="preset-chip"
              onClick={onBersihkan}
              disabled={teks.length === 0}
            >
              Bersihkan
            </button>
          </div>
        </div>
      </form>
    </article>
  );
}
