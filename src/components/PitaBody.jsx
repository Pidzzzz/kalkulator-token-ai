/**
 * Wilayah isi pita metode yang bisa dilipat (Sesi 4B).
 *
 * Isi TIDAK dilepas dari DOM saat tertutup: hanya disembunyikan lewat atribut
 * `hidden` (aksesibel, keluar dari pohon aksesibilitas & urutan fokus), jadi
 * status internal anak — mis. sakelar Simbol | Dengan angka pada mode
 * "Dengan angka" — tetap utuh ketika pita dibuka lagi.
 *
 * Animasi lipat halus (±250ms, tinggi + opacity) memakai `interpolate-size`
 * + `transition-behavior: allow-discrete` pada `hidden` bawaan browser
 * (Baseline 2026). Bila tidak didukung, lipatan langsung tampil/hilang —
 * fungsi tetap benar. `prefers-reduced-motion` mematikan transisi.
 */
export default function PitaBody({ id, terbuka, children }) {
  return (
    <div
      id={id}
      className="pita-body"
      data-terbuka={terbuka ? "true" : "false"}
      hidden={!terbuka}
    >
      <div className="pita-body__inner">{children}</div>
    </div>
  );
}
