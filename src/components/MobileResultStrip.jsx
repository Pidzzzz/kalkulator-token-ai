import { formatRibuan } from "../utils/calculator";
import { formatNilaiMataUang } from "../utils/currency";

export default function MobileResultStrip({ result, visible, mataUang }) {
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
          ? `~${formatRibuan(result.requestTampil)} request · ${formatNilaiMataUang(
              result.perkiraanBiaya,
              mataUang
            )}`
          : result.emptyMessage}
      </span>
    </div>
  );
}
