import { useState } from "react";
import PitaHeader from "./PitaHeader";
import PitaBody from "./PitaBody";
import { usePitaTerbuka } from "../utils/usePitaTerbuka";
import { formatDesimal, formatRibuan } from "../utils/calculator";
import {
  formatBiayaMasukan,
  formatFaktor,
} from "../utils/calculatorF3";
import { tokenFaktor, CATATAN_FAKTOR } from "../data/tokenFaktor";

/**
 * Mengelompokkan penyedia menurut nilai faktor yang sama, urut menaik.
 * Satu sumber data (`tokenFaktor.js`) — tabel pita TIDAK diketik tangan.
 * Contoh: [{ faktor: 3.5, keluarga: ["Anthropic", "DeepSeek"] }, …]
 */
export function kelompokFaktor(data = tokenFaktor) {
  const peta = new Map();
  for (const baris of data) {
    if (!peta.has(baris.faktor)) peta.set(baris.faktor, []);
    peta.get(baris.faktor).push(baris.id);
  }
  return Array.from(peta.entries())
    .sort((a, b) => a[0] - b[0])
    .map(([faktor, keluarga]) => ({ faktor, keluarga }));
}

/**
 * Pita "METODE & ASUMSI" F3 — pola blok Rumus & Asumsi Sesi 1I:
 * selebar halaman di bawah kedua panel, tanpa kotak berwarna, dipisah garis
 * rambut. Baris judul kini tombol lipat (Sesi 4B). Isi: sakelar
 * Simbol | Dengan angka, prosa untuk tema Hangat, tabel faktor terkelompok
 * 3 baris + satu baris catatan faktor, lalu tiga catatan kejujuran.
 */
export default function TeksFormula({ result }) {
  const [mode, setMode] = useState("simbol"); // "simbol" | "angka"
  const { terbuka, toggle } = usePitaTerbuka("f3");
  const kelompok = kelompokFaktor();

  const karakterTeks = formatRibuan(result.karakter);
  const faktorTeks = result.faktor ? formatFaktor(result.faktor) : "—";
  const tokenTeks = formatRibuan(result.token);
  const biayaTeks = formatBiayaMasukan(result.biayaMasukan);

  return (
    <section
      className="formula-section"
      aria-label="Metode dan Asumsi Penghitung Token Teks"
    >
      <PitaHeader
        id="pita-toggle-f3"
        controlsId="pita-isi-f3"
        label="Metode dan Asumsi"
        terbuka={terbuka}
        onToggle={toggle}
        actions={
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
        }
      >
        <h3 className="formula-section__label">METODE &amp; ASUMSI</h3>
        <span className="formula-section__model">
          {result.model?.nama || "Model belum dipilih"}
        </span>
      </PitaHeader>

      <PitaBody id="pita-isi-f3" terbuka={terbuka}>
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
                  <span className="formula-var">jumlah_karakter</span>
                  <span className="formula-op">=</span>
                </span>
                <span className="formula-rhs">
                  <span className="formula-term">
                    <span className="formula-var">panjang_teks</span>
                    <span className="formula-op">termasuk</span>
                    <span className="formula-var">spasi</span>
                    <span className="formula-op">dan</span>
                    <span className="formula-var">baris_baru</span>
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
                  <span className="formula-var">perkiraan_token</span>
                  <span className="formula-op">=</span>
                </span>
                <span className="formula-rhs">
                  <span className="formula-term">
                    <span className="formula-var">jumlah_karakter</span>
                    <span className="formula-op">÷</span>
                    <span className="formula-var">faktor_keluarga</span>
                    <span className="formula-paren">(</span>
                    <span className="formula-op">pembulatan ke atas</span>
                    <span className="formula-paren">)</span>
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
                  <span className="formula-var">biaya_masukan</span>
                  <span className="formula-op">=</span>
                </span>
                <span className="formula-rhs">
                  <span className="formula-term">
                    <span className="formula-var">perkiraan_token</span>
                    <span className="formula-op">÷</span>
                    <span className="formula-num">1.000.000</span>
                    <span className="formula-op">×</span>
                    <span className="formula-var">harga_input</span>
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
                  <span className="formula-var">jumlah_karakter</span>
                  <span className="formula-op">=</span>
                </span>
                <span className="formula-rhs">
                  <span className="formula-term formula-term--result">
                    <span className="formula-val-highlight">
                      {karakterTeks}
                    </span>
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
                  <span className="formula-var">perkiraan_token</span>
                  <span className="formula-op">=</span>
                </span>
                <span className="formula-rhs">
                  <span className="formula-term">
                    <span className="formula-num">{karakterTeks}</span>
                    <span className="formula-op">÷</span>
                    <span className="formula-num">{faktorTeks}</span>
                    <span className="formula-op">=</span>
                  </span>
                  <span className="formula-term formula-term--result">
                    <span className="formula-val-highlight">{tokenTeks}</span>
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
                  <span className="formula-var">biaya_masukan</span>
                  <span className="formula-op">=</span>
                </span>
                <span className="formula-rhs">
                  <span className="formula-term">
                    <span className="formula-num">{tokenTeks}</span>
                    <span className="formula-op">÷</span>
                    <span className="formula-num">1.000.000</span>
                    <span className="formula-op">×</span>
                    <span className="formula-num">
                      ${formatDesimal(result.hargaInput, 0, 4)}
                    </span>
                  </span>
                  <span className="formula-term formula-term--result">
                    <span className="formula-val-highlight">{biayaTeks}</span>
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
          Metode: jumlah karakter dihitung apa adanya — spasi dan baris baru
          ikut dihitung — lalu dibagi faktor karakter-per-token keluarganya dan
          dibulatkan ke atas. Perkiraan token dikali harga input per 1 juta
          token model terpilih menjadi perkiraan biaya masukan.
          {result.isValid ? (
            ` Dengan ${karakterTeks} karakter dan faktor ${faktorTeks} karakter per token (${result.model?.provider || "keluarga model terpilih"}), perkiraan untuk ${result.model?.nama || "model terpilih"} adalah ${tokenTeks} token, berbiaya ${biayaTeks} pada harga input $${formatDesimal(result.hargaInput, 0, 4)} per 1 juta token.`
          ) : (
            ` ${result.emptyMessage}`
          )}
        </p>
      </div>

      {/* Tabel faktor terkelompok (3 baris) — diturunkan dari tokenFaktor.js */}
      <div
        className="assumptions-table metode-table"
        role="table"
        aria-label="Tabel faktor per keluarga model"
      >
        <div className="assumptions-table__head" role="rowgroup">
          <div className="assumptions-row assumptions-row--head" role="row">
            <span
              className="assumptions-col assumptions-col--val"
              role="columnheader"
            >
              Faktor (karakter/token)
            </span>
            <span
              className="assumptions-col assumptions-col--desc"
              role="columnheader"
            >
              Keluarga
            </span>
          </div>
        </div>
        <div className="assumptions-table__body" role="rowgroup">
          {kelompok.map((baris) => {
            const aktif = baris.keluarga.includes(result.model?.provider);
            return (
              <div
                key={baris.faktor}
                className={
                  aktif
                    ? "assumptions-row assumptions-row--aktif"
                    : "assumptions-row"
                }
                role="row"
                aria-current={aktif ? "true" : undefined}
              >
                <div className="assumptions-row__top">
                  <span
                    className="assumptions-col assumptions-col--val"
                    role="cell"
                  >
                    {formatFaktor(baris.faktor)}
                  </span>
                </div>
                <span
                  className="assumptions-col assumptions-col--desc"
                  role="cell"
                >
                  {baris.keluarga.join(" · ")}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <p className="metode-catatan metode-catatan--faktor">
        {CATATAN_FAKTOR}
      </p>

      {/* Catatan kejujuran — teks biasa, bukan kotak peringatan berwarna */}
      <div className="metode-catatan">
        <p>
          Semua hasil F3 adalah perkiraan dan dapat meleset ±10–25% dari
          hitungan resmi. Teks Bahasa Indonesia dan kode cenderung memakai lebih
          banyak token per kata daripada teks Inggris.
        </p>
        <p>
          Untuk angka pasti, gunakan tokenizer atau API penghitung token resmi
          penyedia.
        </p>
        <p>Teks yang ditempel tidak meninggalkan browser.</p>
      </div>
      </PitaBody>
    </section>
  );
}
