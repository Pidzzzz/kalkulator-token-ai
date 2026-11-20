import { formatBiayaSesi } from "../utils/calculatorF2";

/**
 * Strip hasil ringkas F2 di HP — pola MobileResultStrip F1:
 * muncul setelah panel Masukan terlewati saat menggulir.
 */
export default function SimulatorMobileStrip({ result, visible }) {
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
          ? `${formatBiayaSesi(result.biayaTotal)} · ${formatBiayaSesi(
              result.biayaPerPutaran
            )}/putaran${result.konteksMelampaui ? " · konteks terlampaui" : ""}`
          : result.emptyMessage}
      </span>
    </div>
  );
}
