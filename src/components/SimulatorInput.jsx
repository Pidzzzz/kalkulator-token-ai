import { useMemo } from "react";
import Dropdown from "./Dropdown";
import TokenInput from "./TokenInput";
import { buatOpsiModel } from "../utils/opsi";
import { formatDesimal } from "../utils/calculator";

/**
 * Panel Masukan F2 — Simulator Sesi Agen.
 * Semua isian langsung memicu hitung ulang (tanpa tombol Hitung).
 */
export default function SimulatorInput({
  modelId,
  konteksAwal,
  pertumbuhan,
  putaran,
  rasioCache,
  outputPerPutaran,
  onPilihModel,
  onUbahKonteksAwal,
  onUbahPertumbuhan,
  onUbahPutaran,
  onUbahRasioCache,
  onUbahOutput,
}) {
  const grupModel = useMemo(() => buatOpsiModel(), []);

  const rasioAngka = Number(String(rasioCache).replace(",", "."));
  const sliderNilai = Number.isFinite(rasioAngka)
    ? Math.min(100, Math.max(0, rasioAngka))
    : 0;

  return (
    <article className="card">
      <h2 className="card__title">Masukan</h2>

      <form className="input-form" onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label className="form-label" htmlFor="f2-model">
            Model
          </label>
          <Dropdown
            id="f2-model"
            label="Model"
            value={modelId}
            onChange={onPilihModel}
            groups={grupModel}
          />
        </div>

        <div className="form-row form-row--dua">
          <div className="form-group">
            <label className="form-label" htmlFor="f2-konteks-awal">
              Konteks awal (token)
            </label>
            <TokenInput
              id="f2-konteks-awal"
              name="konteksAwal"
              value={konteksAwal}
              onChange={onUbahKonteksAwal}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="f2-pertumbuhan">
              Pertumbuhan / putaran (token)
            </label>
            <TokenInput
              id="f2-pertumbuhan"
              name="pertumbuhan"
              value={pertumbuhan}
              onChange={onUbahPertumbuhan}
            />
          </div>
        </div>

        <div className="form-row form-row--dua">
          <div className="form-group">
            <label className="form-label" htmlFor="f2-putaran">
              Jumlah putaran
            </label>
            <input
              className="form-input"
              id="f2-putaran"
              name="putaran"
              type="text"
              inputMode="numeric"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="none"
              spellCheck="false"
              value={putaran}
              onChange={(e) => onUbahPutaran(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="f2-output">
              Output / putaran (token)
            </label>
            <TokenInput
              id="f2-output"
              name="outputPerPutaran"
              value={outputPerPutaran}
              onChange={onUbahOutput}
            />
          </div>
        </div>

        <div className="form-group">
          <div className="form-label-row">
            <label className="form-label" htmlFor="f2-rasio">
              Rasio cache
            </label>
            <div className="form-suffix">
              <input
                className="form-input form-input--rasio"
                id="f2-rasio"
                name="rasioCache"
                type="text"
                inputMode="numeric"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="none"
                spellCheck="false"
                value={rasioCache}
                onChange={(e) => onUbahRasioCache(e.target.value)}
              />
              <span className="form-suffix__unit">%</span>
            </div>
          </div>

          <input
            className="form-slider"
            type="range"
            min="0"
            max="100"
            step="1"
            value={sliderNilai}
            onChange={(e) => onUbahRasioCache(e.target.value)}
            aria-label="Rasio cache (persen)"
            aria-valuetext={`${formatDesimal(sliderNilai, 0, 0)}%`}
          />
          <div className="form-slider__skala" aria-hidden="true">
            <span>0%</span>
            <span>100%</span>
          </div>
        </div>
      </form>
    </article>
  );
}
