import { formatRibuan, formatUSD } from "../utils/calculator";

export default function MobileResultStrip({ result, visible }) {
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
          ? `~${formatRibuan(result.requestTampil)} request · ${formatUSD(
              result.perkiraanBiaya,
              2,
              2
            )}`
          : result.emptyMessage}
      </span>
    </div>
  );
}
