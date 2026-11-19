import { useState } from "react";
import {
  formatDesimal,
  formatHarga,
  formatRibuan,
  formatUSD,
} from "../utils/calculator";

export default function FormulaSection({
  result,
  tokenInput,
  tokenOutput,
  onTokenInputChange,
  onTokenOutputChange,
}) {
  const [mode, setMode] = useState("simbol"); // "simbol" | "angka"

  const inputTeks = formatRibuan(result.tokenInput);
  const outputTeks = formatRibuan(result.tokenOutput);
  const hargaInputTeks = "$" + formatHarga(result.hargaInput);
  const hargaOutputTeks = "$" + formatHarga(result.hargaOutput);
  const biayaTeks =
    result.biayaPerRequest > 0
      ? "$" + formatDesimal(result.biayaPerRequest, 2, 4)
      : "—";
  const jatahTeks = result.jatah > 0 ? formatUSD(result.jatah, 0, 2) : "—";
  const requestTeks = result.isValid
    ? formatRibuan(result.requestTampil)
    : "—";

  return (
    <section className="formula-section" aria-label="Rumus dan Asumsi Perhitungan">
      <div className="formula-section__header">
        <h3 className="formula-section__label">RUMUS &amp; ASUMSI</h3>
        <div
          className="formula-mode-switch"
          role="group"
          aria-label="Pilih mode tampilan rumus"
        >
          <button
            type="button"
            className={`formula-mode-btn ${mode === "simbol" ? "formula-mode-btn--active" : ""}`}
            onClick={() => setMode("simbol")}
            aria-pressed={mode === "simbol"}
          >
            Simbol
          </button>
          <button
            type="button"
            className={`formula-mode-btn ${mode === "angka" ? "formula-mode-btn--active" : ""}`}
            onClick={() => setMode("angka")}
            aria-pressed={mode === "angka"}
          >
            Dengan angka
          </button>
        </div>
      </div>

      {/* Tampilan Baris Kode Monospace Bernomor (Gelap & Terang) */}
      <div className="formula-code-view">
        {mode === "simbol" ? (
          <>
            <div className="code-line">
              <span className="code-line__num" aria-hidden="true">
                1
              </span>
              <div className="code-line__content">
                <span className="formula-lhs">
                  <span className="formula-var">biaya_per_request</span>
                  <span className="formula-op">=</span>
                </span>
                <span className="formula-rhs">
                  <span className="formula-term">
                    <span className="formula-paren">(</span>
                    <span className="formula-var">input</span>
                    <span className="formula-op">×</span>
                    <span className="formula-var">harga_input</span>
                    <span className="formula-op">+</span>
                    <span className="formula-var">output</span>
                    <span className="formula-op">×</span>
                    <span className="formula-var">harga_output</span>
                    <span className="formula-paren">)</span>
                  </span>
                  <span className="formula-term formula-term--continuation">
                    <span className="formula-op">÷</span>
                    <span className="formula-num">1.000.000</span>
                  </span>
                </span>
              </div>
            </div>

            <div className="code-line">
              <span className="code-line__num" aria-hidden="true">
                2
              </span>
              <div className="code-line__content">
                <span className="formula-lhs">
                  <span className="formula-var">request</span>
                  <span className="formula-op">=</span>
                </span>
                <span className="formula-rhs">
                  <span className="formula-term">
                    <span className="formula-var">jatah</span>
                    <span className="formula-op">÷</span>
                    <span className="formula-var">biaya_per_request</span>
                  </span>
                </span>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="code-line">
              <span className="code-line__num" aria-hidden="true">
                1
              </span>
              <div className="code-line__content">
                <span className="formula-lhs">
                  <span className="formula-var">biaya_per_request</span>
                  <span className="formula-op">=</span>
                </span>
                <span className="formula-rhs">
                  <span className="formula-term">
                    <span className="formula-paren">(</span>
                    <span className="formula-num">{inputTeks}</span>
                    <span className="formula-op">×</span>
                    <span className="formula-num">{hargaInputTeks}</span>
                    <span className="formula-op">+</span>
                    <span className="formula-num">{outputTeks}</span>
                    <span className="formula-op">×</span>
                    <span className="formula-num">{hargaOutputTeks}</span>
                    <span className="formula-paren">)</span>
                  </span>
                  <span className="formula-term formula-term--continuation">
                    <span className="formula-op">÷</span>
                    <span className="formula-num">1.000.000</span>
                  </span>
                  <span className="formula-term formula-term--result">
                    <span className="formula-op">=</span>
                    <span className="formula-val-highlight">{biayaTeks}</span>
                  </span>
                </span>
              </div>
            </div>

            <div className="code-line">
              <span className="code-line__num" aria-hidden="true">
                2
              </span>
              <div className="code-line__content">
                <span className="formula-lhs">
                  <span className="formula-var">request</span>
                  <span className="formula-op">=</span>
                </span>
                <span className="formula-rhs">
                  <span className="formula-term">
                    <span className="formula-num">{jatahTeks}</span>
                    <span className="formula-op">÷</span>
                    <span className="formula-num">{biayaTeks}</span>
                  </span>
                  <span className="formula-term formula-term--result">
                    <span className="formula-op">=</span>
                    <span className="formula-val-highlight">{requestTeks}</span>
                  </span>
                </span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Tampilan Prosa (Khusus Tema Hangat / Referensi C) — nilai hidup */}
      <div className="formula-prose-view">
        <p className="formula-prose__text">
          Rumus: request = jatah ÷ biaya_per_request, dengan biaya_per_request =
          (input × harga_input + output × harga_output) ÷ 1.000.000.
          {result.isValid ? (
            ` Dengan jatah ${jatahTeks}, input ${inputTeks} token (${hargaInputTeks} per 1 jt), output ${outputTeks} token (${hargaOutputTeks} per 1 jt), biaya per request ${biayaTeks} dan request terjangkau ${requestTeks}.`
          ) : (
            ` ${result.emptyMessage}`
          )}
        </p>
      </div>

      {/* Tabel Asumsi Tiga Kolom — input & output bisa diedit */}
      <div
        className="assumptions-table"
        role="table"
        aria-label="Tabel Asumsi Parameter"
      >
        <div className="assumptions-table__head" role="rowgroup">
          <div className="assumptions-row assumptions-row--head" role="row">
            <span
              className="assumptions-col assumptions-col--param"
              role="columnheader"
            >
              Parameter
            </span>
            <span
              className="assumptions-col assumptions-col--val"
              role="columnheader"
            >
              Nilai
            </span>
            <span
              className="assumptions-col assumptions-col--desc"
              role="columnheader"
            >
              Keterangan
            </span>
          </div>
        </div>
        <div className="assumptions-table__body" role="rowgroup">
          <div className="assumptions-row" role="row">
            <div className="assumptions-row__top">
              <span
                className="assumptions-col assumptions-col--param"
                role="cell"
              >
                input
              </span>
              <span
                className="assumptions-col assumptions-col--val"
                role="cell"
              >
                <input
                  className="assumptions-input"
                  type="number"
                  inputMode="numeric"
                  min="0"
                  step="100"
                  value={tokenInput}
                  onChange={(e) => onTokenInputChange(e.target.value)}
                  aria-label="Token input per request"
                />
              </span>
            </div>
            <span
              className="assumptions-col assumptions-col--desc"
              role="cell"
            >
              Perkiraan panjang prompt per request ({hargaInputTeks} / 1 jt
              token)
            </span>
          </div>

          <div className="assumptions-row" role="row">
            <div className="assumptions-row__top">
              <span
                className="assumptions-col assumptions-col--param"
                role="cell"
              >
                output
              </span>
              <span
                className="assumptions-col assumptions-col--val"
                role="cell"
              >
                <input
                  className="assumptions-input"
                  type="number"
                  inputMode="numeric"
                  min="0"
                  step="100"
                  value={tokenOutput}
                  onChange={(e) => onTokenOutputChange(e.target.value)}
                  aria-label="Token output per request"
                />
              </span>
            </div>
            <span
              className="assumptions-col assumptions-col--desc"
              role="cell"
            >
              Perkiraan respon model per request ({hargaOutputTeks} / 1 jt
              token)
            </span>
          </div>

          <div className="assumptions-row" role="row">
            <div className="assumptions-row__top">
              <span
                className="assumptions-col assumptions-col--param"
                role="cell"
              >
                jatah
              </span>
              <span
                className="assumptions-col assumptions-col--val"
                role="cell"
              >
                {result.jatah > 0 ? formatUSD(result.jatah, 2, 2) : "—"}
              </span>
            </div>
            <span
              className="assumptions-col assumptions-col--desc"
              role="cell"
            >
              Batas kuota atau saldo dalam satu jendela waktu
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
