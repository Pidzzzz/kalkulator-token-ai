export default function ResultPanel() {
  return (
    <article className="card">
      <h2 className="card__title">Hasil Perkiraan</h2>

      <div className="result-rows">
        <div className="result-row">
          <div className="result-row__header">
            <span className="result-row__label">REQUEST TERJANGKAU</span>
            <span className="result-row__badge">ESTIMASI</span>
          </div>
          <div className="result-row__value-wrap">
            <span className="result-row__value result-row__value--accent">~167</span>
            <span className="result-row__unit">request</span>
          </div>
        </div>

        <div className="result-row">
          <div className="result-row__header">
            <span className="result-row__label">TOTAL TOKEN</span>
            <span className="result-row__badge">ESTIMASI</span>
          </div>
          <div className="result-row__value-wrap">
            <span className="result-row__value">~1.670.000</span>
            <span className="result-row__unit">token</span>
          </div>
        </div>

        <div className="result-row">
          <div className="result-row__header">
            <span className="result-row__label">PERKIRAAN BIAYA</span>
            <span className="result-row__badge">ESTIMASI</span>
          </div>
          <div className="result-row__value-wrap">
            <span className="result-row__value">$10.00</span>
          </div>
        </div>
      </div>

      <div className="formula-strip">
        <div className="formula-strip__title">RUMUS &amp; ASUMSI</div>
        <div className="formula-strip__body">
          <div className="formula-line">
            <span className="formula-lhs">
              <span className="formula-var">request</span>
              <span className="formula-op">=</span>
            </span>
            <span className="formula-rhs">
              <span className="formula-term">
                <span className="formula-var">jatah</span>
                <span className="formula-op">÷</span>
                <span className="formula-var">biaya_per_request</span>
              </span>
            </span>
          </div>

          <div className="formula-line">
            <span className="formula-lhs">
              <span className="formula-var">biaya_per_request</span>
              <span className="formula-op">=</span>
            </span>
            <span className="formula-rhs">
              <span className="formula-term">
                <span className="formula-paren">(</span>
                <span className="formula-var">input</span>
                <span className="formula-op">×</span>
                <span className="formula-var">harga_input</span>
                <span className="formula-paren">)</span>
              </span>
              <span className="formula-term formula-term--continuation">
                <span className="formula-op">+</span>
                <span className="formula-paren">(</span>
                <span className="formula-var">output</span>
                <span className="formula-op">×</span>
                <span className="formula-var">harga_output</span>
                <span className="formula-paren">)</span>
              </span>
            </span>
          </div>

          <div className="formula-assumptions">
            <div className="formula-assumptions__title">asumsi:</div>
            <div className="formula-assumptions__item">
              <span className="formula-assumptions__indent" aria-hidden="true">  </span>
              <span className="formula-assumptions__key">input</span>
              <span className="formula-op">=</span>
              <span className="formula-assumptions__val">~8.000 token/request ($3.00 / 1jt)</span>
            </div>
            <div className="formula-assumptions__item">
              <span className="formula-assumptions__indent" aria-hidden="true">  </span>
              <span className="formula-assumptions__key">output</span>
              <span className="formula-op">=</span>
              <span className="formula-assumptions__val">~2.000 token/request ($15.00 / 1jt)</span>
            </div>
            <div className="formula-assumptions__item">
              <span className="formula-assumptions__indent" aria-hidden="true">  </span>
              <span className="formula-assumptions__key">biaya/request</span>
              <span className="formula-op">≈</span>
              <span className="formula-assumptions__val">$0.054</span>
            </div>
          </div>
        </div>
      </div>

      <button
        className="btn-copy"
        type="button"
        disabled
        aria-label="Salin hasil"
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
        Salin hasil
      </button>
    </article>
  );
}
