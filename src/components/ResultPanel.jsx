export default function ResultPanel() {
  return (
    <article className="card result-panel">
      <header className="card__header">
        <div className="card__badge-title">
          <span className="badge-dot badge-dot--accent" aria-hidden="true"></span>
          <h2 className="result-panel__title">Hasil Perkiraan F1</h2>
        </div>
        <p className="card__subtitle">Estimasi kapasitas berdasarkan batas yang dipilih</p>
      </header>

      <div className="result-grid">
        <div className="result-stat-box result-stat-box--primary">
          <div className="result-stat-box__top">
            <span className="result-stat-box__label">Request Terjangkau</span>
            <span className="sample-badge">contoh</span>
          </div>
          <div className="result-stat-box__value-row">
            <span className="result-stat-box__number">~167</span>
            <span className="result-stat-box__unit">request</span>
          </div>
          <span className="result-stat-box__subtext">Perkiraan request dalam jendela waktu</span>
        </div>

        <div className="result-stat-box">
          <div className="result-stat-box__top">
            <span className="result-stat-box__label">Total Token Kumulatif</span>
            <span className="sample-badge">contoh</span>
          </div>
          <div className="result-stat-box__value-row">
            <span className="result-stat-box__number">~1.670.000</span>
            <span className="result-stat-box__unit">token</span>
          </div>
          <span className="result-stat-box__subtext">Kombinasi input prompt &amp; respon model</span>
        </div>

        <div className="result-stat-box">
          <div className="result-stat-box__top">
            <span className="result-stat-box__label">Perkiraan Biaya Ekuivalen</span>
            <span className="sample-badge">contoh</span>
          </div>
          <div className="result-stat-box__value-row">
            <span className="result-stat-box__number">$10.00</span>
            <span className="result-stat-box__unit">USD</span>
          </div>
          <span className="result-stat-box__subtext">Nilai penggunaan dihitung dari tarif token</span>
        </div>
      </div>

      <div className="formula-container">
        <div className="formula-container__header">
          <svg className="formula-container__icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M4 7h16M4 17h16M9 3v4M15 3v4M9 17v4M15 17v4" />
          </svg>
          <span className="formula-container__title">RUMUS &amp; ASUMSI HITUNGAN</span>
        </div>
        <pre className="formula-pre">
          <code className="formula-code">
{`request_terjangkau = jatah_usd ÷ biaya_per_request
biaya_per_request  = (input_tokens × tarif_input) + (output_tokens × tarif_output)

Asumsi dasar F1:
  • Input rata-rata  : ~8.000 token/request ($3.00 / 1jt token)
  • Output rata-rata : ~2.000 token/request ($15.00 / 1jt token)
  • Biaya per request: ~$0.024 + $0.030 = ~$0.054/request`}
          </code>
        </pre>
      </div>

      <div className="copy-action-bar">
        <button
          className="btn-copy"
          type="button"
          disabled
          aria-label="Salin hasil perkiraan"
        >
          <svg
            className="btn-copy__icon"
            width="15"
            height="15"
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
          <span>Salin Hasil Perkiraan</span>
        </button>
        <span className="copy-note">(fitur salin aktif di sesi F1)</span>
      </div>
    </article>
  );
}
