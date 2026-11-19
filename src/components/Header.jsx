export default function Header() {
  return (
    <header className="header">
      <h1 className="header__title">Kalkulator Token &amp; Request AI</h1>
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
