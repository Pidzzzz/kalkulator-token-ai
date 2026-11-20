/**
 * Pemformat & pembaca angka isian F2 — satu sumber kebenaran agar panel
 * Masukan, rumus, tabel asumsi, dan teks salin memakai aturan yang sama.
 *
 * Aturan:
 * - Isian token (konteks awal, pertumbuhan, output) tampil dengan pemisah
 *   ribuan id-ID: "10.000", "1.000.000".
 * - Nilai state tetap angka murni. `parseAngkaIsian` membuang karakter selain
 *   digit/titik/koma, membuang titik ribuan, dan memakai koma sebagai desimal:
 *   "10.000", "10 000", "Rp10.000", dan "10.000 token" sama-sama menjadi 10000.
 * - Isian kosong mengembalikan NaN (bukan 0) supaya UI bisa menampilkan pesan
 *   ramah, bukan angka paksa 0.
 * - Koma = desimal (id-ID). Rasio cache "12,5" tetap terbaca 12,5.
 */

const nomorBulat = new Intl.NumberFormat("id-ID", {
  maximumFractionDigits: 0,
});

/**
 * Format angka bulat dengan pemisah ribuan id-ID.
 * 10000 -> "10.000"; 0 -> "0"; "" -> "".
 */
export function formatAngkaIsian(val) {
  return formatIsianSaatKetik(val);
}

/**
 * Rapikan apa pun yang diketik/dimuat menjadi tampilan bertitik ribuan:
 * - semua karakter selain digit dan koma dibuang (titik lama ikut dibuang
 *   lalu disusun ulang, jadi tidak ada titik ganda),
 * - bagian bulat dikelompokkan per 3 digit,
 * - koma desimal dipertahankan (beserta digit di belakangnya),
 * - isian kosong (atau tanpa digit) tetap kosong.
 */
export function formatIsianSaatKetik(val) {
  if (val === null || val === undefined) return "";
  const teks = String(val);
  if (teks.trim() === "") return "";

  const adaKoma = teks.includes(",");
  const [bagianBulat, ...sisaDesimal] = teks.split(",");

  const digitBulat = bagianBulat.replace(/\D/g, "");
  const digitDesimal = sisaDesimal.join("").replace(/\D/g, "");

  if (digitBulat === "") {
    return adaKoma && digitDesimal !== "" ? `0,${digitDesimal}` : "";
  }

  // Saat mengetik, "1.0" belum tentu ribuan: biarkan digit apa adanya.
  if (digitBulat.length < 4 && !adaKoma) return digitBulat;

  const tanpaNolDepan = digitBulat.replace(/^0+(?=\d)/, "");
  const bulat = nomorBulat.format(Number(tanpaNolDepan || "0"));
  return adaKoma ? `${bulat},${digitDesimal}` : bulat;
}

/**
 * Baca isian angka menjadi angka murni.
 * Titik pemisah ribuan dibuang; koma tetap desimal (id-ID).
 * "10.000" -> 10000, "10 000" -> 10000, "Rp10.000 token" -> 10000,
 * "" / "abc" -> NaN (keadaan tepi, bukan 0 paksa).
 */
export function parseAngkaIsian(val) {
  if (typeof val === "number") {
    return Number.isFinite(val) ? val : NaN;
  }
  if (val === null || val === undefined) return NaN;

  const teks = String(val).trim();
  if (teks === "") return NaN;

  // Buang semua selain digit, titik, koma; koma -> titik; titik ribuan dibuang.
  const bersih = teks.replace(/[^\d.,]/g, "").replace(/,/g, ".");
  if (bersih === "" || bersih === ".") return NaN;

  return parseDesimalatauRibuan(bersih);
}

/**
 * "10.000" -> 10000 (pemisah ribuan), "12.5" / "12,5" -> 12,5 (desimal).
 * Aturan: bilangan yang seluruhnya kelompok 3 digit adalah ribuan.
 */
function parseDesimalatauRibuan(teks) {
  if (/^\d{1,3}(\.\d{3})+$/.test(teks)) {
    return Number(teks.replace(/\./g, ""));
  }
  const angka = Number(teks);
  return Number.isFinite(angka) ? angka : NaN;
}

/**
 * Hitung posisi kursor baru setelah isian diformat ulang: jumlah digit di
 * kiri kursor dihitung ulang, lalu kursor diletakkan setelah digit ke-n pada
 * teks terformat. Ini membuat titik ribuan tidak "melompat" saat mengetik.
 */
export function posisiKursorSetelahFormat(teksBaru, digitDiKiri) {
  if (digitDiKiri <= 0) return 0;
  let terhitung = 0;
  for (let i = 0; i < teksBaru.length; i += 1) {
    if (/\d/.test(teksBaru[i])) {
      terhitung += 1;
      if (terhitung === digitDiKiri) return i + 1;
    }
  }
  return teksBaru.length;
}
