export default function Header() {
  return (
    <header className="header">
      <div className="header__topline">
        <span className="header__tag">TOOL PENGEMBANG AI</span>
        <span className="header__version">v0.1.0 · Baseline 2026</span>
      </div>
      <h1 className="header__title">Kalkulator Token &amp; Request AI</h1>
      <p className="header__subtitle">
        Bantu pengguna AI coding menerjemahkan jatah &amp; batas paket dari provider
        mana pun menjadi angka nyata yang bisa dibayangkan — request, token, dan biaya.
      </p>
      <div className="header__chips" role="list" aria-label="Karakteristik aplikasi">
        <span className="chip" role="listitem">
          <span className="chip__indicator" aria-hidden="true"></span>
          Web Statis
        </span>
        <span className="chip" role="listitem">
          <span className="chip__indicator" aria-hidden="true"></span>
          Tanpa Login
        </span>
        <span className="chip" role="listitem">
          <span className="chip__indicator" aria-hidden="true"></span>
          Hitung di Browser (100% Lokal)
        </span>
      </div>
    </header>
  );
}
