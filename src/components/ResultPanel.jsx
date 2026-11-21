import { useEffect, useRef, useState } from "react";
import Dropdown from "./Dropdown";
import { formatDesimal, formatRibuan, formatUSD } from "../utils/calculator";
import {
  formatMataUang,
  formatNilaiMataUang,
  opsiMataUang,
  pasanganNilai,
} from "../utils/currency";
import { useCountUp } from "../utils/useCountUp";

function salinLama(teks) {
  const area = document.createElement("textarea");
  area.value = teks;
  area.setAttribute("readonly", "");
  area.style.position = "fixed";
  area.style.top = "-9999px";
  area.style.opacity = "0";
  document.body.appendChild(area);
  area.select();

  let berhasil = false;
  try {
    berhasil = document.execCommand("copy");
  } catch {
    berhasil = false;
  }
  document.body.removeChild(area);
  return berhasil;
}

export default function ResultPanel({
  result,
  preset,
  model,
  jendelaLabel,
  mataUang,
  onUbahMataUang,
}) {
  const [tersalin, setTersalin] = useState(false);
  const timerRef = useRef(null);

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    []
  );

  const tampilRequest = useCountUp(result.isValid ? result.requestTampil : 0);
  const tampilToken = useCountUp(result.isValid ? result.totalToken : 0);
  const tampilBiaya = useCountUp(result.isValid ? result.perkiraanBiaya : 0);

  // Sesi 5B: angka utama = mata uang terpilih, pendamping = pasangannya.
  const biayaPasangan = pasanganNilai(tampilBiaya, mataUang, (v) =>
    formatUSD(v, 2, 2)
  );

  // Sesi 7: ambang warna bilah jatah + rincian biaya per request.
  const ambang = result.ambangPemakaian || "normal";
  const kelasAmbang =
    ambang === "bahaya"
      ? "usage-bar__fill--bahaya"
      : ambang === "peringatan"
        ? "usage-bar__fill--peringatan"
        : "";
  const persenJatah = formatDesimal(result.usagePercentRaw, 0, 1) + "%";
  const nominalInput = formatNilaiMataUang(result.biayaInput, mataUang);
  const nominalOutput = formatNilaiMataUang(result.biayaOutput, mataUang);
  const persenInput = formatRibuan(result.porsiInput);
  const persenOutput = formatRibuan(result.porsiOutput);
  const totalBagi = formatNilaiMataUang(result.biayaPerRequest, mataUang);

  const susunRingkasan = () => {
    const namaPaket = preset?.nama || "Kustom";
    const namaModel = model?.nama || "—";
    const biayaUSD = formatUSD(result.perkiraanBiaya, 2, 2);
    const biayaKonversi =
      mataUang !== "USD"
        ? ` (= ${formatMataUang(result.perkiraanBiaya, mataUang)})`
        : "";
    return [
      "Perkiraan Kalkulator Token AI",
      `Paket: ${namaPaket}`,
      `Model: ${namaModel}`,
      `Jatah: ${formatUSD(result.jatah, 2, 2)} (${jendelaLabel})`,
      `Request terjangkau: ~${formatRibuan(result.requestTampil)} request`,
      `Total token: ~${formatRibuan(result.totalToken)} token`,
      `Perkiraan biaya: ${biayaUSD}${biayaKonversi}`,
      "Semua angka adalah perkiraan, bukan angka tagihan.",
    ].join("\n");
  };

  const handleSalin = async () => {
    if (!result.isValid) return;
    const teks = susunRingkasan();

    let berhasil = false;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(teks);
        berhasil = true;
      } else {
        berhasil = salinLama(teks);
      }
    } catch {
      berhasil = salinLama(teks);
    }

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
          id="mata-uang"
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
            {/* Angka Utama: Request Terjangkau + Pil ESTIMASI + Bar Pemakaian */}
            <div className="result-row result-row--primary">
              <div className="result-row__header">
                <span className="result-row__label">REQUEST TERJANGKAU</span>
              </div>
              <div className="result-row__value-wrap">
                <span className="result-row__value result-row__value--accent">
                  ~{formatRibuan(tampilRequest)}
                </span>
                <span className="result-row__unit">request</span>
                <span className="estimate-pill">ESTIMASI</span>
              </div>

              {/* Bar Pemakaian Jatah — hanya tampil bila total valid.
                  Sesi 7: warna semantik normal/peringatan/bahaya. */}
              {result.isUsageValid && (
                <div className="usage-bar">
                  <div className="usage-bar__meta">
                    <span className="usage-bar__label">PEMAKAIAN JATAH</span>
                    <span className="usage-bar__meta-angka">
                      <span
                        className={`usage-bar__persen usage-bar__persen--${ambang}`}
                        data-ambang={ambang}
                      >
                        {persenJatah}
                      </span>
                      <span className="usage-bar__value">
                        {formatUSD(result.jatah, 0, 2)} dari{" "}
                        {formatUSD(result.totalKuota, 0, 2)}
                      </span>
                    </span>
                  </div>
                  <div
                    className="usage-bar__track"
                    role="progressbar"
                    aria-valuenow={Math.round(result.usagePercent)}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuetext={`${persenJatah} pemakaian jatah`}
                    aria-label="Persentase pemakaian jatah"
                    data-ambang={ambang}
                  >
                    <div
                      className={`usage-bar__fill ${kelasAmbang}`}
                      data-ambang={ambang}
                      style={{ width: `${result.usagePercent}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            {/* Angka Sekunder 1: Total Token (Tanpa badge) */}
            <div className="result-row">
              <div className="result-row__header">
                <span className="result-row__label">TOTAL TOKEN</span>
              </div>
              <div className="result-row__value-wrap">
                <span className="result-row__value">
                  ~{formatRibuan(tampilToken)}
                </span>
                <span className="result-row__unit">token</span>
              </div>
            </div>

            {/* Angka Sekunder 2: Perkiraan Biaya (Tanpa badge) */}
            <div className="result-row">
              <div className="result-row__header">
                <span className="result-row__label">PERKIRAAN BIAYA</span>
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
          </>
        ) : (
          <p className="result-empty" role="status">
            {result.emptyMessage}
          </p>
        )}
      </div>

      {/* Sesi 7: bilah bagi biaya per request — Input segar vs Output.
          Hanya tampil bila hasil valid dan ada biaya > 0. */}
      {result.isValid && result.biayaPerRequest > 0 && (
        <div className="cost-bar cost-bar--f1">
          <div className="cost-bar__meta">
            <span className="cost-bar__label">BAGI BIAYA PER REQUEST</span>
            <span className="cost-bar__total">{totalBagi}</span>
          </div>
          <div
            className="cost-bar__track"
            role="img"
            aria-label={`Bagi biaya per request ${totalBagi}: input segar ${nominalInput} (${persenInput}%), output ${nominalOutput} (${persenOutput}%)`}
          >
            <span
              className="cost-bar__seg cost-bar__seg--f1-input"
              style={{ width: `${result.porsiInput}%` }}
            />
            <span
              className="cost-bar__seg cost-bar__seg--f1-output"
              style={{ width: `${result.porsiOutput}%` }}
            />
          </div>
          <ul className="cost-legend cost-legend--f1">
            <li className="cost-legend__item">
              <span
                className="cost-legend__swatch cost-legend__swatch--f1-input"
                aria-hidden="true"
              />
              <span className="cost-legend__name">Input segar</span>
              <span className="cost-legend__val">{nominalInput}</span>
              <span className="cost-legend__persen">{persenInput}%</span>
            </li>
            <li className="cost-legend__item">
              <span
                className="cost-legend__swatch cost-legend__swatch--f1-output"
                aria-hidden="true"
              />
              <span className="cost-legend__name">Output</span>
              <span className="cost-legend__val">{nominalOutput}</span>
              <span className="cost-legend__persen">{persenOutput}%</span>
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
