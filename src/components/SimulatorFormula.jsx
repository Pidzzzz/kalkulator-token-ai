import { useState } from "react";
import {
  formatDesimal,
  formatHarga,
  formatRibuan,
} from "../utils/calculator";
import { formatToken } from "../utils/calculatorF2";

/**
 * Blok "RUMUS & ASUMSI" F2 — tata letak sama dengan F1 (Sesi 1I):
 * sakelar Simbol | Dengan angka, prosa untuk tema Hangat, dan tabel asumsi
 * yang bisa diedit. Angka di sini memakai nilai hidup dari panel Masukan.
 */
export default function SimulatorFormula({
  result,
  konteksAwal,
  pertumbuhan,
  putaran,
  rasioCache,
  outputPerPutaran,
  onUbahKonteksAwal,
  onUbahPertumbuhan,
  onUbahRasioCache,
  onUbahOutput,
}) {
  const [mode, setMode] = useState("simbol"); // "simbol" | "angka"

  const konteksTeks = formatRibuan(result.konteksAwal);
  const tumbuhTeks = formatRibuan(result.pertumbuhan);
  const putaranTeks = formatToken(result.putaran);
  const rasioTeks = formatDesimal(result.rasioCache, 0, 2) + "%";
  const outputTeks = formatRibuan(result.outputPerPutaran);
  const hargaInputTeks = "$" + formatHarga(result.hargaInput);
  const hargaCacheTeks = "$" + formatDesimal(result.hargaCache, 2, 4);
  const hargaOutputTeks = "$" + formatHarga(result.hargaOutput);

  // Rata-rata konteks per putaran: konteks_awal + (N−1) × pertumbuhan ÷ 2.
  const konteksRataTeks = formatRibuan(result.konteksRata);
  const biayaTeks = (nilai) =>
    result.isValid ? "$" + formatDesimal(nilai, 2, 4) : "—";

  return (
    <section
      className="formula-section"
      aria-label="Rumus dan Asumsi Simulator Sesi"
    >
      <div className="formula-section__header">
        <div className="formula-section__judul">
          <h3 className="formula-section__label">RUMUS &amp; ASUMSI</h3>
          <span className="formula-section__model">
            {result.model?.nama || "Model belum dipilih"}
          </span>
        </div>
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

      {/* Baris kode monospace bernomor (Gelap & Terang) */}
      <div className="formula-code-view">
        {mode === "simbol" ? (
          <>
            <div className="code-line">
              <span className="code-line__num" aria-hidden="true">
                1
              </span>
              <div className="code-line__content">
                <span className="formula-lhs">
                  <span className="formula-var">konteks</span>
                  <span className="formula-num">(r)</span>
                  <span className="formula-op">=</span>
                </span>
                <span className="formula-rhs">
                  <span className="formula-term">
                    <span className="formula-var">konteks_awal</span>
                    <span className="formula-op">+</span>
                    <span className="formula-paren">(</span>
                    <span className="formula-var">r</span>
                    <span className="formula-op">−</span>
                    <span className="formula-num">1</span>
                    <span className="formula-paren">)</span>
                    <span className="formula-op">×</span>
                    <span className="formula-var">pertumbuhan</span>
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
                  <span className="formula-var">cache</span>
                  <span className="formula-op">=</span>
                </span>
                <span className="formula-rhs">
                  <span className="formula-term">
                    <span className="formula-var">konteks</span>
                    <span className="formula-op">×</span>
                    <span className="formula-var">rasio_cache</span>
                  </span>
                  <span className="formula-term">
                    <span className="formula-var">segar</span>
                    <span className="formula-op">=</span>
                    <span className="formula-var">konteks</span>
                    <span className="formula-op">−</span>
                    <span className="formula-var">cache</span>
                  </span>
                  <span className="formula-term">
                    <span className="formula-var">output</span>
                    <span className="formula-op">=</span>
                    <span className="formula-var">output_per_putaran</span>
                  </span>
                </span>
              </div>
            </div>

            <div className="code-line">
              <span className="code-line__num" aria-hidden="true">
                3
              </span>
              <div className="code-line__content">
                <span className="formula-lhs">
                  <span className="formula-var">biaya</span>
                  <span className="formula-op">=</span>
                </span>
                <span className="formula-rhs">
                  <span className="formula-term">
                    <span className="formula-var">token_segar</span>
                    <span className="formula-op">÷</span>
                    <span className="formula-num">1.000.000</span>
                    <span className="formula-op">×</span>
                    <span className="formula-var">harga_input</span>
                  </span>
                  <span className="formula-term formula-term--continuation">
                    <span className="formula-op">+</span>
                    <span className="formula-var">token_cache</span>
                    <span className="formula-op">÷</span>
                    <span className="formula-num">1.000.000</span>
                    <span className="formula-op">×</span>
                    <span className="formula-var">harga_cache</span>
                  </span>
                  <span className="formula-term formula-term--continuation">
                    <span className="formula-op">+</span>
                    <span className="formula-var">token_output</span>
                    <span className="formula-op">÷</span>
                    <span className="formula-num">1.000.000</span>
                    <span className="formula-op">×</span>
                    <span className="formula-var">harga_output</span>
                  </span>
                </span>
              </div>
            </div>

            <div className="code-line">
              <span className="code-line__num" aria-hidden="true">
                4
              </span>
              <div className="code-line__content">
                <span className="formula-lhs">
                  <span className="formula-var">biaya_per_putaran</span>
                  <span className="formula-op">=</span>
                </span>
                <span className="formula-rhs">
                  <span className="formula-term">
                    <span className="formula-var">biaya</span>
                    <span className="formula-op">÷</span>
                    <span className="formula-var">jumlah_putaran</span>
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
                  <span className="formula-var">konteks</span>
                  <span className="formula-num">(r)</span>
                  <span className="formula-op">=</span>
                </span>
                <span className="formula-rhs">
                  <span className="formula-term">
                    <span className="formula-num">{konteksTeks}</span>
                    <span className="formula-op">+</span>
                    <span className="formula-paren">(</span>
                    <span className="formula-var">r</span>
                    <span className="formula-op">−</span>
                    <span className="formula-num">1</span>
                    <span className="formula-paren">)</span>
                    <span className="formula-op">×</span>
                    <span className="formula-num">{tumbuhTeks}</span>
                  </span>
                  <span className="formula-term formula-term--result">
                    <span className="formula-var">r</span>
                    <span className="formula-op">=</span>
                    <span className="formula-num">1…{putaranTeks}</span>
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
                  <span className="formula-var">token_segar</span>
                  <span className="formula-op">=</span>
                </span>
                <span className="formula-rhs">
                  <span className="formula-term">
                    <span className="formula-num">{konteksRataTeks}</span>
                    <span className="formula-op">×</span>
                    <span className="formula-paren">(</span>
                    <span className="formula-num">1</span>
                    <span className="formula-op">−</span>
                    <span className="formula-num">
                      {formatDesimal(result.rasioCache / 100, 2, 2)}
                    </span>
                    <span className="formula-paren">)</span>
                    <span className="formula-op">×</span>
                    <span className="formula-num">{putaranTeks}</span>
                  </span>
                  <span className="formula-term formula-term--result">
                    <span className="formula-op">=</span>
                    <span className="formula-val-highlight">
                      {formatRibuan(result.tokenSegar)}
                    </span>
                  </span>
                </span>
              </div>
            </div>

            <div className="code-line">
              <span className="code-line__num" aria-hidden="true">
                3
              </span>
              <div className="code-line__content">
                <span className="formula-lhs">
                  <span className="formula-var">token_cache</span>
                  <span className="formula-op">=</span>
                </span>
                <span className="formula-rhs">
                  <span className="formula-term">
                    <span className="formula-num">{konteksRataTeks}</span>
                    <span className="formula-op">×</span>
                    <span className="formula-num">{rasioTeks}</span>
                    <span className="formula-op">×</span>
                    <span className="formula-num">{putaranTeks}</span>
                  </span>
                  <span className="formula-term formula-term--result">
                    <span className="formula-op">=</span>
                    <span className="formula-val-highlight">
                      {formatRibuan(result.tokenCache)}
                    </span>
                  </span>
                </span>
              </div>
            </div>

            <div className="code-line">
              <span className="code-line__num" aria-hidden="true">
                3
              </span>
              <div className="code-line__content">
                <span className="formula-lhs">
                  <span className="formula-var">token_output</span>
                  <span className="formula-op">=</span>
                </span>
                <span className="formula-rhs">
                  <span className="formula-term">
                    <span className="formula-num">{outputTeks}</span>
                    <span className="formula-op">×</span>
                    <span className="formula-num">{putaranTeks}</span>
                  </span>
                  <span className="formula-term formula-term--result">
                    <span className="formula-op">=</span>
                    <span className="formula-val-highlight">
                      {formatRibuan(result.tokenOutput)}
                    </span>
                  </span>
                </span>
              </div>
            </div>

            <div className="code-line">
              <span className="code-line__num" aria-hidden="true">
                4
              </span>
              <div className="code-line__content">
                <span className="formula-lhs">
                  <span className="formula-var">biaya</span>
                  <span className="formula-op">=</span>
                </span>
                <span className="formula-rhs">
                  <span className="formula-term formula-term--continuation">
                    <span className="formula-num">
                      {formatRibuan(result.tokenSegar)}
                    </span>
                    <span className="formula-op">÷</span>
                    <span className="formula-num">1.000.000</span>
                    <span className="formula-op">×</span>
                    <span className="formula-num">{hargaInputTeks}</span>
                  </span>
                  <span className="formula-term">
                    <span className="formula-op">+</span>
                    <span className="formula-num">
                      {formatRibuan(result.tokenCache)}
                    </span>
                    <span className="formula-op">÷</span>
                    <span className="formula-num">1.000.000</span>
                    <span className="formula-op">×</span>
                    <span className="formula-num">{hargaCacheTeks}</span>
                  </span>
                  <span className="formula-term formula-term--continuation">
                    <span className="formula-op">+</span>
                    <span className="formula-num">
                      {formatRibuan(result.tokenOutput)}
                    </span>
                    <span className="formula-op">÷</span>
                    <span className="formula-num">1.000.000</span>
                    <span className="formula-op">×</span>
                    <span className="formula-num">{hargaOutputTeks}</span>
                  </span>
                  <span className="formula-term formula-term--result">
                    <span className="formula-op">=</span>
                    <span className="formula-val-highlight">
                      {biayaTeks(result.biayaTotal)}
                    </span>
                  </span>
                </span>
              </div>
            </div>

            <div className="code-line">
              <span className="code-line__num" aria-hidden="true">
                5
              </span>
              <div className="code-line__content">
                <span className="formula-lhs">
                  <span className="formula-var">biaya_per_putaran</span>
                  <span className="formula-op">=</span>
                </span>
                <span className="formula-rhs">
                  <span className="formula-term">
                    <span className="formula-num">
                      {biayaTeks(result.biayaTotal)}
                    </span>
                    <span className="formula-op">÷</span>
                    <span className="formula-num">{putaranTeks}</span>
                  </span>
                  <span className="formula-term formula-term--result">
                    <span className="formula-op">=</span>
                    <span className="formula-val-highlight">
                      {biayaTeks(result.biayaPerPutaran)}
                    </span>
                  </span>
                </span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Prosa (tema Hangat) — nilai hidup */}
      <div className="formula-prose-view">
        <p className="formula-prose__text">
          Rumus: konteks putaran ke-r = konteks awal + (r − 1) × pertumbuhan;
          cache = konteks × rasio cache, sisanya segar; output tetap tiap
          putaran. Biaya = token segar ÷ 1.000.000 × harga input + token cache ÷
          1.000.000 × harga cache + token output ÷ 1.000.000 × harga output, lalu
          dibagi jumlah putaran untuk rata-rata per putaran.
          {result.isValid ? (
            ` Dengan konteks awal ${konteksTeks} token, tumbuh ${tumbuhTeks} token per putaran selama ${putaranTeks} putaran, cache ${rasioTeks}, dan output ${outputTeks} token per putaran pada harga ${hargaInputTeks} input, ${hargaCacheTeks} cache, ${hargaOutputTeks} output per 1 juta token, diperoleh ${formatRibuan(result.totalToken)} token dan biaya ${biayaTeks(result.biayaTotal)} — rata-rata ${biayaTeks(result.biayaPerPutaran)} per putaran, dengan konteks akhir ${formatRibuan(result.konteksAkhir)} token.`
          ) : (
            ` ${result.emptyMessage}`
          )}
        </p>
      </div>

      {/* Tabel asumsi — nilai berjalan, bisa diedit di tempat */}
      <div
        className="assumptions-table"
        role="table"
        aria-label="Tabel Asumsi Simulator Sesi"
      >
        <div className="assumptions-table__head" role="rowgroup">
          <div className="assumptions-row assumptions-row--head" role="row">
            <span className="assumptions-col assumptions-col--param" role="columnheader">
              Parameter
            </span>
            <span className="assumptions-col assumptions-col--val" role="columnheader">
              Nilai
            </span>
            <span className="assumptions-col assumptions-col--desc" role="columnheader">
              Keterangan
            </span>
          </div>
        </div>
        <div className="assumptions-table__body" role="rowgroup">
          <div className="assumptions-row" role="row">
            <div className="assumptions-row__top">
              <span className="assumptions-col assumptions-col--param" role="cell">
                konteks_awal
              </span>
              <span className="assumptions-col assumptions-col--val" role="cell">
                <input
                  className="assumptions-input"
                  type="number"
                  inputMode="numeric"
                  min="0"
                  step="1000"
                  value={konteksAwal}
                  onChange={(e) => onUbahKonteksAwal(e.target.value)}
                  aria-label="Konteks awal (token)"
                />
              </span>
            </div>
            <span className="assumptions-col assumptions-col--desc" role="cell">
              Token yang sudah terisi saat putaran pertama dimulai
            </span>
          </div>

          <div className="assumptions-row" role="row">
            <div className="assumptions-row__top">
              <span className="assumptions-col assumptions-col--param" role="cell">
                pertumbuhan
              </span>
              <span className="assumptions-col assumptions-col--val" role="cell">
                <input
                  className="assumptions-input"
                  type="number"
                  inputMode="numeric"
                  min="0"
                  step="500"
                  value={pertumbuhan}
                  onChange={(e) => onUbahPertumbuhan(e.target.value)}
                  aria-label="Pertumbuhan konteks per putaran (token)"
                />
              </span>
            </div>
            <span className="assumptions-col assumptions-col--desc" role="cell">
              Token tambahan yang tersisa di konteks tiap putaran (percakapan,
              tool, kode)
            </span>
          </div>

          <div className="assumptions-row" role="row">
            <div className="assumptions-row__top">
              <span className="assumptions-col assumptions-col--param" role="cell">
                output_per_putaran
              </span>
              <span className="assumptions-col assumptions-col--val" role="cell">
                <input
                  className="assumptions-input"
                  type="number"
                  inputMode="numeric"
                  min="0"
                  step="100"
                  value={outputPerPutaran}
                  onChange={(e) => onUbahOutput(e.target.value)}
                  aria-label="Output per putaran (token)"
                />
              </span>
            </div>
            <span className="assumptions-col assumptions-col--desc" role="cell">
              Token balasan model tiap putaran (tetap; {hargaOutputTeks} / 1 jt
              token)
            </span>
          </div>

          <div className="assumptions-row" role="row">
            <div className="assumptions-row__top">
              <span className="assumptions-col assumptions-col--param" role="cell">
                rasio_cache
              </span>
              <span className="assumptions-col assumptions-col--val" role="cell">
                <input
                  className="assumptions-input"
                  type="number"
                  inputMode="numeric"
                  min="0"
                  max="100"
                  step="1"
                  value={rasioCache}
                  onChange={(e) => onUbahRasioCache(e.target.value)}
                  aria-label="Rasio cache (persen)"
                />
              </span>
            </div>
            <span className="assumptions-col assumptions-col--desc" role="cell">
              Bagian konteks yang terbaca dari cache ({hargaCacheTeks} / 1 jt
              token)
            </span>
          </div>

          <div className="assumptions-row" role="row">
            <div className="assumptions-row__top">
              <span className="assumptions-col assumptions-col--param" role="cell">
                jumlah_putaran
              </span>
              <span className="assumptions-col assumptions-col--val" role="cell">
                {result.isValid ? `${putaranTeks} putaran` : "—"}
              </span>
            </div>
            <span className="assumptions-col assumptions-col--desc" role="cell">
              Jumlah bolak-balik agen dalam satu sesi (diubah dari panel Masukan)
            </span>
          </div>

          <div className="assumptions-row" role="row">
            <div className="assumptions-row__top">
              <span className="assumptions-col assumptions-col--param" role="cell">
                harga_input
              </span>
              <span className="assumptions-col assumptions-col--val" role="cell">
                {hargaInputTeks}
              </span>
            </div>
            <span className="assumptions-col assumptions-col--desc" role="cell">
              Harga token input segar per 1 juta (dari models.js)
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
