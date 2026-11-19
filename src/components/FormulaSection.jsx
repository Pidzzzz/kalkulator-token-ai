import { useState } from "react";

export default function FormulaSection() {
  const [mode, setMode] = useState("simbol"); // "simbol" | "angka"

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
                    <span className="formula-num">10.000</span>
                    <span className="formula-op">×</span>
                    <span className="formula-num">$3</span>
                    <span className="formula-op">+</span>
                    <span className="formula-num">2.000</span>
                    <span className="formula-op">×</span>
                    <span className="formula-num">$15</span>
                    <span className="formula-paren">)</span>
                  </span>
                  <span className="formula-term formula-term--continuation">
                    <span className="formula-op">÷</span>
                    <span className="formula-num">1.000.000</span>
                  </span>
                  <span className="formula-term formula-term--result">
                    <span className="formula-op">=</span>
                    <span className="formula-val-highlight">$0,06</span>
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
                    <span className="formula-num">$10</span>
                    <span className="formula-op">÷</span>
                    <span className="formula-num">$0,06</span>
                  </span>
                  <span className="formula-term formula-term--result">
                    <span className="formula-op">=</span>
                    <span className="formula-val-highlight">167</span>
                  </span>
                </span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Tampilan Prosa (Khusus Tema Hangat / Referensi C) */}
      <div className="formula-prose-view">
        <p className="formula-prose__text">
          Rumus: request = jatah ÷ biaya_per_request, dengan biaya_per_request =
          (input × harga_input + output × harga_output) ÷ 1.000.000.
        </p>
      </div>

      {/* Tabel Asumsi Tiga Kolom */}
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
                10.000 token
              </span>
            </div>
            <span
              className="assumptions-col assumptions-col--desc"
              role="cell"
            >
              Perkiraan panjang prompt per request ($3.00 / 1 jt token)
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
                2.000 token
              </span>
            </div>
            <span
              className="assumptions-col assumptions-col--desc"
              role="cell"
            >
              Perkiraan respon model per request ($15.00 / 1 jt token)
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
                $10.00
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
