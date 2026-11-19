import { useEffect, useRef, useState } from "react";
import { formatRibuan, formatUSD } from "../utils/calculator";
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

export default function ResultPanel({ result, preset, model, jendelaLabel }) {
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

  const susunRingkasan = () => {
    const namaPaket = preset?.nama || "Kustom";
    const namaModel = model?.nama || "—";
    return [
      "Perkiraan Kalkulator Token AI",
      `Paket: ${namaPaket}`,
      `Model: ${namaModel}`,
      `Jatah: ${formatUSD(result.jatah, 2, 2)} (${jendelaLabel})`,
      `Request terjangkau: ~${formatRibuan(result.requestTampil)} request`,
      `Total token: ~${formatRibuan(result.totalToken)} token`,
      `Perkiraan biaya: ${formatUSD(result.perkiraanBiaya, 2, 2)}`,
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
      <h2 className="card__title">Hasil Perkiraan</h2>

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

              {/* Bar Pemakaian Jatah — hanya tampil bila total valid */}
              {result.isUsageValid && (
                <div className="usage-bar">
                  <div className="usage-bar__meta">
                    <span className="usage-bar__label">PEMAKAIAN JATAH</span>
                    <span className="usage-bar__value">
                      {formatUSD(result.jatah, 0, 2)} dari{" "}
                      {formatUSD(result.totalKuota, 0, 2)}
                    </span>
                  </div>
                  <div
                    className="usage-bar__track"
                    role="progressbar"
                    aria-valuenow={Math.round(result.usagePercent)}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label="Persentase pemakaian jatah"
                  >
                    <div
                      className="usage-bar__fill"
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
                  {formatUSD(tampilBiaya, 2, 2)}
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
