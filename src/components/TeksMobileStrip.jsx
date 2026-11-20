import { formatRibuan } from "../utils/calculator";

/**
 * Strip hasil ringkas F3 di HP — pola MobileResultStrip F1/Sesi 3F
 * (menempel di atas dock; muncul setelah panel Masukan terlewati).
 */
export default function TeksMobileStrip({ result, visible }) {
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
          ? `~${formatRibuan(result.token)} token · ${formatRibuan(
              result.karakter
            )} karakter${result.konteksMelampaui ? " · konteks terlampaui" : ""}`
          : result.emptyMessage}
      </span>
    </div>
  );
}
