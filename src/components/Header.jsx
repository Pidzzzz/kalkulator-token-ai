const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
    strokeLinejoin="round" aria-hidden="true">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
    strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

const CoffeeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
    strokeLinejoin="round" aria-hidden="true">
    <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
    <line x1="6" y1="1" x2="6" y2="4"/>
    <line x1="10" y1="1" x2="10" y2="4"/>
    <line x1="14" y1="1" x2="14" y2="4"/>
  </svg>
);

const THEMES = [
  { id: "gelap",  label: "Tema Gelap",  Icon: MoonIcon   },
  { id: "terang", label: "Tema Terang", Icon: SunIcon    },
  { id: "hangat", label: "Tema Hangat", Icon: CoffeeIcon },
];

export default function Header({ currentTheme, onThemeChange }) {
  return (
    <header className="header">
      <div className="header__title-row">
        <h1 className="header__title">Kalkulator Token &amp; Request AI</h1>
        <div className="theme-switcher" role="group" aria-label="Pilih tema tampilan">
          {THEMES.map(({ id, label, Icon }) => (
            <button
              key={id}
              type="button"
              className={`theme-btn ${currentTheme === id ? "theme-btn--active" : ""}`}
              onClick={() => onThemeChange(id)}
              aria-pressed={currentTheme === id}
              aria-label={label}
              title={label}
            >
              <Icon />
            </button>
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
