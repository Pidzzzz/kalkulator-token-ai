/**
 * Baris judul pita yang bisa dilipat (Sesi 4B) — dipakai F1, F2, dan F3.
 *
 * Tombol lipat = elemen <button> asli yang membungkus SEMUA isi baris judul
 * (judul pita + aksi kecil seperti sakelar Simbol | Dengan angka) dan chevron
 * di ujung kanan mengikuti chevron rumah (dropdown). Chevron berputar 180°
 * antara terbuka dan tertutup; aria-expanded + aria-controls menunjuk ke
 * wilayah isi pita.
 *
 * `actions` dirender SEBAGAI SAUDARA tombol, bukan di dalamnya, supaya tidak
 * ada tombol bersarang (sakelar Simbol/Dengan angka tetap tombol sendiri).
 */
function ChevronIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export default function PitaHeader({
  id,
  controlsId,
  label,
  terbuka,
  onToggle,
  children,
  actions,
}) {
  return (
    <div className="formula-section__header">
      <button
        type="button"
        id={id}
        className="pita-toggle"
        aria-expanded={terbuka}
        aria-controls={controlsId}
        onClick={onToggle}
      >
        <span className="formula-section__judul">{children}</span>
        <span
          className="pita-toggle__chevron"
          aria-hidden="true"
          data-terbuka={terbuka ? "true" : "false"}
        >
          <ChevronIcon />
        </span>
        {label ? <span className="sr-only">{label}</span> : null}
      </button>
      {actions ? <div className="pita-header__aksi">{actions}</div> : null}
    </div>
  );
}
