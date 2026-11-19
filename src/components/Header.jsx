export default function Header({ currentTheme, onThemeChange }) {
  const themes = [
    { id: "gelap", label: "Gelap" },
    { id: "terang", label: "Terang" },
    { id: "hangat", label: "Hangat" },
  ];

  return (
    <header className="header">
      <div className="header__title-row">
        <h1 className="header__title">Kalkulator Token &amp; Request AI</h1>
        <div className="theme-switcher" role="group" aria-label="Pilih tema tampilan">
          {themes.map((t, idx) => (
            <span key={t.id} className="theme-switcher__item">
              <button
                type="button"
                className={`theme-btn ${currentTheme === t.id ? "theme-btn--active" : ""}`}
                onClick={() => onThemeChange(t.id)}
                aria-pressed={currentTheme === t.id}
              >
                {t.label}
              </button>
              {idx < themes.length - 1 && (
                <span className="theme-switcher__sep" aria-hidden="true">
                  ·
                </span>
              )}
            </span>
          ))}
        </div>
      </div>
      <p className="header__subtitle">
        Terjemahkan jatah &amp; batas paket AI menjadi angka yang bisa
        dibayangkan: request, token, dan perkiraan biaya.
      </p>
      <div className="header__chips" role="list" aria-label="Status aplikasi">
        <span className="chip" role="listitem">web statis</span>
        <span className="chip" role="listitem">tanpa login</span>
        <span className="chip" role="listitem">hitung di browser</span>
      </div>
    </header>
  );
}
