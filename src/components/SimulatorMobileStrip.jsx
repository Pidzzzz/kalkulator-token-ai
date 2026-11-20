import { formatNilaiMataUang } from "../utils/currency";

/**
 * Strip hasil ringkas F2 di HP — pola MobileResultStrip F1:
 * muncul setelah panel Masukan terlewati saat menggulir.
 * Sesi 5B: angka uang mengikuti mata uang terpilih (tanpa pendamping).
 */
export default function SimulatorMobileStrip({ result, visible, mataUang }) {
  return (
    <div
      className={`mobile-result-strip ${visible ? "mobile-result-strip--visible" : ""}`}
      aria-hidden={!visible}
    >
      {result.isValid && (
        <span className="mobile-result-strip__label">Perkiraan</span>
      )}
      <span className="mobile-result-strip__text">
        {result.isValid
          ? `${formatNilaiMataUang(
              result.biayaTotal,
              mataUang
            )} · ${formatNilaiMataUang(
              result.biayaPerPutaran,
              mataUang
            )}/putaran${result.konteksMelampaui ? " · konteks terlampaui" : ""}`
          : result.emptyMessage}
      </span>
    </div>
  );
}
