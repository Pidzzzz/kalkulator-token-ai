import { useEffect, useRef, useState } from "react";
import Dropdown from "./Dropdown";
import { formatRibuan } from "../utils/calculator";
import {
  formatBiayaMasukan,
  formatFaktor,
  formatPersenKonteks,
} from "../utils/calculatorF3";
import { formatMataUang, opsiMataUang, pasanganNilai } from "../utils/currency";
import { useCountUp } from "../utils/useCountUp";
import { MATA_UANG_KEY, salinKePapan } from "../utils/uiHelpers";

// Biaya masukan kecil: 6 desimal bila > 0 tetapi terbulatkan $0,00 (lihat formatBiayaMasukan).

/** Bilah pemakaian konteks (pola bilah F1), isian dibatasi 100% lebarnya. */
function BilahKonteks({ persen }) {
  const lebar = Math.min(100, Math.max(0, Number.isFinite(persen) ? persen : 0));
  return (
    <div
      className="usage-bar__track"
      role="progressbar"
      aria-valuenow={Math.round(lebar * 100) / 100}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Persentase pemakaian jendela konteks"
    >
      <div className="usage-bar__fill" style={{ width: `${lebar}%` }}></div>
    </div>
  );
}

/**
 * Panel Hasil F3: perkiraan token (hero), karakter & kata, biaya masukan,
 * pemakaian jendela konteks, lalu tabel perbandingan 9 keluarga model.
 */
export default function TeksResult({ result, mataUang, onUbahMataUang }) {
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

  const tampilToken = useCountUp(result.isValid ? result.token : 0);
  const tampilKarakter = useCountUp(result.isValid ? result.karakter : 0);
  const tampilKata = useCountUp(result.isValid ? result.kata : 0);
  const tampilBiaya = useCountUp(result.isValid ? result.biayaMasukan : 0);

  // Sesi 5B: angka utama = mata uang terpilih, pendamping = pasangannya.
  // Desimal adaptif F3 tetap dipakai lewat formatBiayaMasukan.
  const biayaPasangan = pasanganNilai(tampilBiaya, mataUang, formatBiayaMasukan);

  const providerTerpilih = result.model?.provider || null;

  const susunRingkasan = () => {
    const konversi =
      mataUang !== "USD" && result.isValid
        ? ` (= ${formatMataUang(result.biayaMasukan, mataUang)})`
        : "";
    return [
      "Perkiraan Penghitung Token Teks — Kalkulator Token AI",
      `Model: ${result.model?.nama || "—"}`,
      `Jumlah karakter: ${formatRibuan(result.karakter)}`,
      `Jumlah kata: ${formatRibuan(result.kata)}`,
      `Perkiraan token: ~${formatRibuan(result.token)} token`,
      `Perkiraan biaya masukan: ${formatBiayaMasukan(
        result.biayaMasukan
      )}${konversi}`,
      `Pemakaian konteks: ±${formatRibuan(result.token)} dari ${formatRibuan(
        result.ukuranKonteks
      )} token jendela konteks (${formatPersenKonteks(result.persenKonteks)})`,
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
          id="f3-mata-uang"
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
            {/* Angka utama: perkiraan token model terpilih */}
            <div className="result-row result-row--primary">
              <div className="result-row__header">
                <span className="result-row__label">PERKIRAAN TOKEN</span>
              </div>
              <div className="result-row__value-wrap">
                <span className="result-row__value result-row__value--accent">
                  ~{formatRibuan(tampilToken)}
                </span>
                <span className="result-row__unit">token · perkiraan</span>
                <span className="estimate-pill">ESTIMASI</span>
              </div>

              <div className="usage-bar">
                <div className="usage-bar__meta">
                  <span className="usage-bar__label">PEMAKAIAN KONTEKS</span>
                  <span className="usage-bar__value">
                    {formatPersenKonteks(result.persenKonteks)}
                  </span>
                </div>
                <p className="usage-bar__teks">
                  ±{formatRibuan(tampilToken)} dari{" "}
                  {formatRibuan(result.ukuranKonteks)} token jendela konteks
                </p>
                <BilahKonteks persen={result.persenKonteks} />
              </div>
            </div>

            <div className="result-row">
              <div className="result-row__header">
                <span className="result-row__label">JUMLAH KARAKTER</span>
              </div>
              <div className="result-row__value-wrap">
                <span className="result-row__value">
                  {formatRibuan(tampilKarakter)}
                </span>
                <span className="result-row__unit">karakter</span>
              </div>
            </div>

            <div className="result-row">
              <div className="result-row__header">
                <span className="result-row__label">JUMLAH KATA</span>
              </div>
              <div className="result-row__value-wrap">
                <span className="result-row__value">
                  {formatRibuan(tampilKata)}
                </span>
                <span className="result-row__unit">kata</span>
              </div>
            </div>

            <div className="result-row">
              <div className="result-row__header">
                <span className="result-row__label">
                  PERKIRAAN BIAYA MASUKAN
                </span>
              </div>
              <div className="result-row__value-wrap">
                <span className="result-row__value">
                  {biayaPasangan.utama}
                </span>
                <span className="result-row__konversi">
                  = {biayaPasangan.pendamping}
                </span>
              </div>
            </div>

            {/* Peringatan konteks: gaya sama dengan F2 (Sesi 11.3) */}
            {result.konteksMelampaui && (
              <p className="context-warning" role="alert">
                <strong>Perkiraan token melampaui jendela model.</strong>{" "}
                {formatRibuan(result.token)} token dari jendela{" "}
                {formatRibuan(result.ukuranKonteks)} token (
                {formatPersenKonteks(result.persenKonteks)}). Teks seperti ini
                berisiko terpotong sebelum dibaca model — pendekkan teks atau
                ganti ke model berjendela lebih besar.
              </p>
            )}
          </>
        ) : (
          <p className="result-empty" role="status">
            {result.emptyMessage}
          </p>
        )}
      </div>

      {/* Tabel perbandingan keluarga — hanya saat ada teks */}
      {result.isValid && result.perbandingan.length > 0 && (
        <div
          className="keluarga-table"
          role="table"
          aria-label="Perbandingan perkiraan token per keluarga model"
        >
          <div className="keluarga-row keluarga-row--head" role="row">
            <span className="keluarga-col keluarga-col--nama" role="columnheader">
              Keluarga
            </span>
            <span className="keluarga-col keluarga-col--faktor" role="columnheader">
              Faktor (karakter/token)
            </span>
            <span className="keluarga-col keluarga-col--token" role="columnheader">
              Perkiraan token
            </span>
          </div>
          {result.perbandingan.map((baris) => {
            const terpilih = baris.id === providerTerpilih;
            return (
              <div
                key={baris.id}
                className={
                  terpilih
                    ? "keluarga-row keluarga-row--aktif"
                    : "keluarga-row"
                }
                role="row"
                aria-current={terpilih ? "true" : undefined}
              >
                <span
                  className="keluarga-col keluarga-col--nama"
                  role="cell"
                >
                  {baris.id}
                </span>
                <span
                  className="keluarga-col keluarga-col--faktor"
                  role="cell"
                >
                  {formatFaktor(baris.faktor)}
                </span>
                <span
                  className="keluarga-col keluarga-col--token"
                  role="cell"
                >
                  {formatRibuan(baris.token)}
                </span>
              </div>
            );
          })}
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
