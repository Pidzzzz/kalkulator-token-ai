import { useEffect, useRef, useState } from "react";
import Dropdown from "./Dropdown";
import { formatRibuan } from "../utils/calculator";
import {
  formatBiayaHarga,
  formatBiayaSesi,
  formatBiayaSuku,
  formatToken,
} from "../utils/calculatorF2";
import { formatMataUang, opsiMataUang } from "../utils/currency";
import { KODE_MATA_UANG_BAWAAN, getCurrency } from "../data/currencies";
import { useCountUp } from "../utils/useCountUp";
import { MATA_UANG_KEY, salinKePapan } from "../utils/uiHelpers";

function bacaMataUangAwal() {
  if (typeof window === "undefined") return KODE_MATA_UANG_BAWAAN;
  try {
    const tersimpan = window.localStorage.getItem(MATA_UANG_KEY);
    return getCurrency(tersimpan) ? tersimpan : KODE_MATA_UANG_BAWAAN;
  } catch {
    return KODE_MATA_UANG_BAWAAN;
  }
}

// Biaya sesi kecil: 4 desimal bila di bawah $0,01 (lihat formatBiayaSesi).

/**
 * Panel Hasil F2: total biaya sesi, total token, rata-rata per putaran,
 * konteks akhir + peringatan, dan bar tumpuk 3 segmen biaya.
 */
export default function SimulatorResult({
  result,
  mataUang,
  onUbahMataUang,
  jumlahPutaran,
  rasioCache,
}) {
  const [tersalin, setTersalin] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(MATA_UANG_KEY, mataUang);
    } catch {
      // Penyimpanan tidak tersedia — pilihan tetap berlaku selama sesi.
    }
  }, [mataUang]);

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    []
  );

  const tampilBiaya = useCountUp(result.isValid ? result.biayaTotal : 0);
  const tampilTotalToken = useCountUp(result.isValid ? result.totalToken : 0);
  const tampilPerPutaran = useCountUp(result.isValid ? result.biayaPerPutaran : 0);
  const tampilKonteksAkhir = useCountUp(result.isValid ? result.konteksAkhir : 0);

  const susunRingkasan = () => {
    const konversi =
      mataUang !== "USD" && result.isValid
        ? ` (= ${formatMataUang(result.biayaTotal, mataUang)})`
        : "";
    return [
      "Perkiraan Simulator Sesi Agen — Kalkulator Token AI",
      `Model: ${result.model?.nama || "—"}`,
      `Konteks awal: ${formatToken(result.konteksAwal)} token`,
      `Pertumbuhan konteks: ${formatToken(result.pertumbuhan)} token/putaran`,
      `Jumlah putaran: ${formatToken(result.putaran)}`,
      `Rasio cache: ${formatToken(result.rasioCache)}%`,
      `Output per putaran: ${formatToken(result.outputPerPutaran)} token`,
      `Total token: ~${formatRibuan(result.totalToken)} token`,
      `Perkiraan biaya sesi: ${formatBiayaSesi(result.biayaTotal)}${konversi}`,
      `  segar: ${formatBiayaSuku(result.biayaSegar)} (${formatRibuan(
        result.tokenSegar
      )} token × ${formatBiayaHarga(result.hargaInput)}/1 jt)`,
      `  cache: ${formatBiayaSuku(result.biayaCache)} (${formatRibuan(
        result.tokenCache
      )} token × ${formatBiayaHarga(result.hargaCache)}/1 jt)`,
      `  output: ${formatBiayaSuku(result.biayaOutput)} (${formatRibuan(
        result.tokenOutput
      )} token × ${formatBiayaHarga(result.hargaOutput)}/1 jt)`,
      `Rata-rata per putaran: ${formatBiayaSesi(result.biayaPerPutaran)}`,
      `Konteks akhir: ${formatToken(result.konteksAkhir)} token`,
      "Semua angka adalah perkiraan, bukan angka tagihan.",
    ].join("\n");
  };

  const handleSalin = async () => {
    if (!result.isValid) return;
    const berhasil = await salinKePapan(susunRingkasan());
    if (!berhasil) return;

    setTersalin(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setTersalin(false), 1800);
  };

  return (
    <article className="card">
      <div className="card__header">
        <h2 className="card__title">Hasil Perkiraan</h2>
        <Dropdown
          id="f2-mata-uang"
          compact
          label="Mata uang konversi"
          value={mataUang}
          onChange={onUbahMataUang}
          options={opsiMataUang}
        />
      </div>

      <div className="result-rows">
        {result.isValid ? (
          <>
            {/* Angka utama: total biaya sesi */}
            <div className="result-row result-row--primary">
              <div className="result-row__header">
                <span className="result-row__label">TOTAL BIAYA SESI</span>
              </div>
              <div className="result-row__value-wrap">
                <span className="result-row__value result-row__value--accent">
                  {formatBiayaSesi(tampilBiaya)}
                </span>
                <span className="result-row__unit">perkiraan</span>
                {mataUang !== "USD" && (
                  <span className="result-row__konversi">
                    = {formatMataUang(tampilBiaya, mataUang)}
                  </span>
                )}
              </div>
            </div>

            <div className="result-row">
              <div className="result-row__header">
                <span className="result-row__label">TOTAL TOKEN</span>
              </div>
              <div className="result-row__value-wrap">
                <span className="result-row__value">
                  ~{formatRibuan(tampilTotalToken)}
                </span>
                <span className="result-row__unit">token</span>
              </div>
            </div>

            <div className="result-row">
              <div className="result-row__header">
                <span className="result-row__label">RATA-RATA PER PUTARAN</span>
              </div>
              <div className="result-row__value-wrap">
                <span className="result-row__value">
                  {formatBiayaSesi(tampilPerPutaran)}
                </span>
                <span className="result-row__unit">
                  / putaran · {formatToken(jumlahPutaran)} putaran
                </span>
              </div>
            </div>

            <div className="result-row">
              <div className="result-row__header">
                <span className="result-row__label">KONTEKS AKHIR</span>
              </div>
              <div className="result-row__value-wrap">
                <span className="result-row__value">
                  {formatToken(tampilKonteksAkhir)}
                </span>
                <span className="result-row__unit">token</span>
              </div>
            </div>

            {/* Peringatan konteks: jujur, bukan angka diam-diam salah */}
            {result.konteksMelampaui && (
              <p className="context-warning" role="alert">
                <strong>Konteks akhir melampaui jendela model.</strong>{" "}
                {formatToken(result.konteksAkhir)} token dari jendela{" "}
                {formatToken(result.ukuranKonteks)} token (
                {Math.round(result.persenKonteks)}%). Sesi seperti ini berisiko
                terpotong atau kehabisan konteks sebelum putaran terakhir —
                perpendek riwayat, kurangi putaran, atau ganti ke model berjendela
                lebih besar.
              </p>
            )}
          </>
        ) : (
          <p className="result-empty" role="status">
            {result.emptyMessage}
          </p>
        )}
      </div>

      {/* Bar tumpuk ramping 3 segmen (hanya bila ada biaya) */}
      {result.isValid && result.biayaTotal > 0 && (
        <div className="cost-bar">
          <div className="cost-bar__meta">
            <span className="cost-bar__label">RINCIAN BIAYA</span>
            <span className="cost-bar__total">
              {formatBiayaSesi(result.biayaTotal)}
            </span>
          </div>
          <div
            className="cost-bar__track"
            role="img"
            aria-label={`Biaya sesi ${formatBiayaSesi(
              result.biayaTotal
            )}: segar ${formatBiayaSuku(result.biayaSegar)}, cache ${formatBiayaSuku(
              result.biayaCache
            )}, output ${formatBiayaSuku(result.biayaOutput)}`}
          >
            <span
              className="cost-bar__seg cost-bar__seg--segar"
              style={{ width: `${result.porsiSegar}%` }}
            />
            <span
              className="cost-bar__seg cost-bar__seg--cache"
              style={{ width: `${result.porsiCache}%` }}
            />
            <span
              className="cost-bar__seg cost-bar__seg--output"
              style={{ width: `${result.porsiOutput}%` }}
            />
          </div>
          <ul className="cost-legend">
            <li className="cost-legend__item">
              <span
                className="cost-legend__swatch cost-legend__swatch--segar"
                aria-hidden="true"
              />
              <span className="cost-legend__name">Segar</span>
              <span className="cost-legend__val">
                {formatBiayaSuku(result.biayaSegar)}
              </span>
            </li>
            <li className="cost-legend__item">
              <span
                className="cost-legend__swatch cost-legend__swatch--cache"
                aria-hidden="true"
              />
              <span className="cost-legend__name">
                Cache {formatToken(rasioCache)}%
              </span>
              <span className="cost-legend__val">
                {formatBiayaSuku(result.biayaCache)}
              </span>
            </li>
            <li className="cost-legend__item">
              <span
                className="cost-legend__swatch cost-legend__swatch--output"
                aria-hidden="true"
              />
              <span className="cost-legend__name">Output</span>
              <span className="cost-legend__val">
                {formatBiayaSuku(result.biayaOutput)}
              </span>
            </li>
          </ul>
        </div>
      )}

      <button
        className="btn-copy"
        type="button"
        onClick={handleSalin}
        disabled={!result.isValid}
        aria-label={tersalin ? "Hasil tersalin" : "Salin hasil"}
      >
        <svg
          className="btn-copy__icon"
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <rect
            x="5"
            y="5"
            width="9"
            height="9"
            rx="1.5"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M11 5V3.5A1.5 1.5 0 0 0 9.5 2h-6A1.5 1.5 0 0 0 2 3.5v6A1.5 1.5 0 0 0 3.5 11H5"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
        {tersalin ? "Tersalin" : "Salin hasil"}
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {tersalin ? "Hasil berhasil disalin." : ""}
      </span>
    </article>
  );
}
