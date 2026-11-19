export default function ResultPanel() {
  return (
    <article className="card result-panel">
      <header className="card__header">
        <h2 className="result-panel__title">Hasil Perkiraan</h2>
      </header>

      <div className="result-items">
        <div className="result-item">
          <div className="result-item__label">Request terjangkau</div>
          <div className="result-item__value">
            ~167
            <span className="result-item__sample">contoh</span>
          </div>
        </div>

        <div className="result-item">
          <div className="result-item__label">Total token</div>
          <div className="result-item__value">
            ~1.670.000
            <span className="result-item__sample">contoh</span>
          </div>
        </div>

        <div className="result-item">
          <div className="result-item__label">Perkiraan biaya</div>
          <div className="result-item__value">
            $10.00
            <span className="result-item__sample">contoh</span>
          </div>
        </div>
      </div>

      <div className="formula-strip">
        <div className="formula-strip__title">Rumus &amp; Asumsi</div>
        <pre className="formula-strip__pre">
          <code className="formula-strip__code">
{`request = jatah ÷ biaya_per_request
biaya_per_request = (input × harga_input) + (output × harga_output)

asumsi:
  input  = ~8.000 token/request
  output = ~2.000 token/request
  harga input  = $3.00 / 1jt token
  harga output = $15.00 / 1jt token
  biaya/request ≈ $0.054 + $0.030 = $0.06`}
          </code>
        </pre>
      </div>

      <div className="copy-action-wrapper">
        <button
          className="btn-copy"
          type="button"
          disabled
          aria-label="Salin hasil perkiraan"
        >
          <svg
            className="btn-copy__icon"
            width="16"
            height="16"
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
          <span>Salin hasil</span>
        </button>
        <span className="copy-status" role="status" aria-live="polite"></span>
      </div>
    </article>
  );
}
