import { useLayoutEffect, useRef } from "react";
import {
  formatIsianSaatKetik,
  posisiKursorSetelahFormat,
} from "../utils/angkaIsian";

/**
 * Isian token bertitik ribuan (id-ID) untuk panel Masukan F2 & tabel asumsi.
 *
 * - Tampilan selalu terformat ("10.000"), termasuk saat mengetik/mengedit.
 * - Nilai yang dikirim ke state tetap teks terformat; hitungan memakai
 *   `parseAngkaIsian` (buang semua non-digit), jadi angkanya murni.
 * - Isian kosong tetap kosong -> pesan ramah, bukan 0 paksa.
 * - Kursor dijaga hanya saat isian difokuskan (pengguna sedang mengetik),
 *   supaya tidak melompat saat nilai berubah dari luar (slider/muat ulang).
 */
export default function TokenInput({
  value,
  onChange,
  className = "form-input",
  step,
  ...rest
}) {
  const ref = useRef(null);
  const kursorRef = useRef(null);

  const teks = formatIsianSaatKetik(value);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || kursorRef.current === null) return;
    if (document.activeElement !== el) {
      kursorRef.current = null;
      return;
    }
    el.setSelectionRange(kursorRef.current, kursorRef.current);
    kursorRef.current = null;
  });

  const handleChange = (e) => {
    const el = e.target;
    const mentah = el.value;
    const posisiAsli = el.selectionStart ?? mentah.length;
    const digitDiKiri = mentah.slice(0, posisiAsli).replace(/\D/g, "").length;

    const terformat = formatIsianSaatKetik(mentah);
    kursorRef.current = posisiKursorSetelahFormat(terformat, digitDiKiri);
    onChange(terformat);
  };

  return (
    <input
      {...rest}
      ref={ref}
      className={className}
      type="text"
      inputMode="numeric"
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="none"
      spellCheck="false"
      value={teks}
      onInput={handleChange}
    />
  );
}
