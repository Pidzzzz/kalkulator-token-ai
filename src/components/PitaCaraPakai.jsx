import PitaHeader from "./PitaHeader";
import PitaBody from "./PitaBody";
import { usePitaCaraPakai } from "../utils/usePitaTerbuka";
import { CARA_PAKAI } from "../data/caraPakai";

/**
 * Pita panduan "Cara Pakai" (Sesi 8) — satu pita per modul F1-F4, duduk di
 * atas panel Masukan/Hasil. Memakai komponen & animasi pita Sesi 4B, tetapi
 * keadaan lipatnya disimpan di kunci localStorage sendiri
 * (`kalkulator-pita-cara-pakai`) agar pita metode tidak ikut berubah.
 */
export default function PitaCaraPakai({ modul }) {
  const { terbuka, toggle } = usePitaCaraPakai(modul);
  const langkah = CARA_PAKAI[modul] || [];

  const idTombol = `cara-pakai-toggle-${modul}`;
  const idIsi = `cara-pakai-isi-${modul}`;

  return (
    <section className="pita-panduan" aria-label="Cara Pakai">
      <PitaHeader
        id={idTombol}
        controlsId={idIsi}
        label="Cara Pakai"
        terbuka={terbuka}
        onToggle={toggle}
      >
        <h3 className="formula-section__label">Cara Pakai</h3>
      </PitaHeader>

      <PitaBody id={idIsi} terbuka={terbuka}>
        <ol className="pita-langkah">
          {langkah.map((teks, index) => (
            <li className="pita-langkah__item" key={index}>
              <span className="pita-langkah__nomor" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="pita-langkah__teks">{teks}</span>
            </li>
          ))}
        </ol>
      </PitaBody>
    </section>
  );
}
