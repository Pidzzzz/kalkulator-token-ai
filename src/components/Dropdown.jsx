import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const TINGGI_MAKS = 264;
const TINGGI_MIN = 88;
const JARAK_PANEL = 6;
const JARAK_TEPI = 8;
const TYPEAHEAD_RESET_MS = 700;

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

function CheckIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

/**
 * Dropdown kustom pakai-ulang (listbox) untuk Paket, Model, dan Jendela.
 *
 * Opsi datar:  options={[{ value, label }]}
 * Opsi bergrup: groups={[{ label, options: [{ value, label, short, detail }] }]}
 *   - `short`        -> imbuhan harga ringkas di pemicu ("— $2/$10")
 *   - `detail`       -> baris kedua mono di dalam daftar (khusus Model/Mata uang)
 *   - `triggerLabel` -> teks pemicu bila berbeda dari label baris (mis. kode "IDR")
 * `compact` -> ukuran ringkas (dipakai pemilih mata uang di judul kartu Hasil).
 */
export default function Dropdown({
  id,
  label,
  value,
  onChange,
  options,
  groups,
  placeholder = "Pilih",
  compact = false,
}) {
  const menuId = `${id}-listbox`;
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const listRef = useRef(null);
  const itemRefs = useRef([]);
  const typeaheadRef = useRef({ buffer: "", waktu: 0 });

  const [terbuka, setTerbuka] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [posisi, setPosisi] = useState("bawah");
  const [tinggiMaks, setTinggiMaks] = useState(TINGGI_MAKS);

  // Normalisasi data opsi menjadi grup + indeks datar untuk navigasi keyboard.
  const grup = useMemo(() => {
    const sumber =
      groups && groups.length
        ? groups
        : [{ label: null, options: options ?? [] }];

    let indeks = 0;
    return sumber
      .filter((g) => g.options && g.options.length)
      .map((g) => ({
        label: g.label ?? null,
        options: g.options.map((o) => ({ ...o, _i: indeks++ })),
      }));
  }, [groups, options]);

  const datar = useMemo(() => grup.flatMap((g) => g.options), [grup]);

  const indeksTerpilih = datar.findIndex(
    (o) => String(o.value) === String(value)
  );
  const terpilih = indeksTerpilih >= 0 ? datar[indeksTerpilih] : null;

  const tutup = useCallback((kembalikanFokus) => {
    setTerbuka(false);
    if (kembalikanFokus) triggerRef.current?.focus();
  }, []);

  const buka = useCallback(() => {
    const awal = datar.findIndex((o) => String(o.value) === String(value));
    setActiveIndex(awal >= 0 ? awal : 0);
    setTerbuka(true);
  }, [datar, value]);

  const pilih = useCallback(
    (opsi) => {
      if (!opsi) return;
      if (String(opsi.value) !== String(value)) onChange(opsi.value);
      setTerbuka(false);
      triggerRef.current?.focus();
    },
    [onChange, value]
  );

  // Klik di luar menutup daftar.
  useEffect(() => {
    if (!terbuka) return undefined;

    const onPointerDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        tutup(false);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [terbuka, tutup]);

  // Hitung arah buka (atas/bawah) dari ruang nyata di sekitar pemicu.
  const ukurPosisi = useCallback(() => {
    const trigger = triggerRef.current;
    const list = listRef.current;
    if (!trigger || !list) return;

    const kotak = trigger.getBoundingClientRect();

    // Dock bawah bersifat fixed (z-index 100): jangan biarkan panel tertutup.
    const dock = document.querySelector(".dock-nav");
    const batasBawah = dock
      ? Math.min(window.innerHeight, dock.getBoundingClientRect().top)
      : window.innerHeight;

    const ruangBawah = batasBawah - kotak.bottom - JARAK_PANEL - JARAK_TEPI;
    const ruangAtas = kotak.top - JARAK_PANEL - JARAK_TEPI;
    const tinggiKonten = Math.min(TINGGI_MAKS, list.scrollHeight + 2);

    const arah =
      ruangBawah < tinggiKonten && ruangAtas > ruangBawah ? "atas" : "bawah";
    const tersedia = arah === "atas" ? ruangAtas : ruangBawah;

    setPosisi(arah);
    setTinggiMaks(
      Math.max(TINGGI_MIN, Math.min(TINGGI_MAKS, Math.floor(tersedia)))
    );
  }, []);

  // Tentukan arah buka (atas/bawah) + batas tinggi sebelum cat pertama.
  useLayoutEffect(() => {
    if (!terbuka) return;
    ukurPosisi();
  }, [terbuka, ukurPosisi]);

  // Jaga arah panel saat layar berubah ukuran atau halaman digulir.
  useEffect(() => {
    if (!terbuka) return undefined;

    let raf = null;
    const jadwalkan = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(ukurPosisi);
    };

    window.addEventListener("resize", jadwalkan);
    window.addEventListener("scroll", jadwalkan, { passive: true });

    return () => {
      window.removeEventListener("resize", jadwalkan);
      window.removeEventListener("scroll", jadwalkan);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [terbuka, ukurPosisi]);

  // Jaga baris aktif tetap terlihat di dalam panel yang menggulir.
  useEffect(() => {
    if (!terbuka) return;
    const list = listRef.current;
    const el = itemRefs.current[activeIndex];
    if (!list || !el) return;

    const atas = el.offsetTop;
    const bawah = atas + el.offsetHeight;
    if (atas < list.scrollTop) {
      list.scrollTop = atas;
    } else if (bawah > list.scrollTop + list.clientHeight) {
      list.scrollTop = bawah - list.clientHeight;
    }
  }, [terbuka, activeIndex]);

  const catatTypeahead = (huruf) => {
    const sekarang = Date.now();
    const state = typeaheadRef.current;
    if (sekarang - state.waktu > TYPEAHEAD_RESET_MS) state.buffer = "";
    state.buffer += huruf.toLowerCase();
    state.waktu = sekarang;
    return state.buffer;
  };

  const cariTypeahead = (buffer) => {
    const hurufSama =
      buffer.length > 1 && buffer.split("").every((c) => c === buffer[0]);
    const kata = hurufSama ? buffer[0] : buffer;
    const mulai = hurufSama ? activeIndex + 1 : 0;

    for (let n = 0; n < datar.length; n += 1) {
      const i = (mulai + n) % datar.length;
      if (datar[i].label.toLowerCase().startsWith(kata)) return i;
    }
    return -1;
  };

  const onKeyDown = (e) => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const { key } = e;

    if (key === "Escape") {
      if (terbuka) {
        e.preventDefault();
        tutup(true);
      }
      return;
    }

    if (key === "Tab") {
      if (terbuka) setTerbuka(false);
      return;
    }

    if (key === "ArrowDown" || key === "ArrowUp") {
      e.preventDefault();
      if (!terbuka) {
        buka();
        return;
      }
      if (datar.length === 0) return;

      setActiveIndex((i) => {
        const arah = key === "ArrowDown" ? 1 : -1;
        const berikut = i + arah;
        if (berikut < 0) return datar.length - 1;
        if (berikut >= datar.length) return 0;
        return berikut;
      });
      return;
    }

    if (key === "Home" || key === "End") {
      e.preventDefault();
      if (!terbuka) buka();
      if (datar.length === 0) return;
      setActiveIndex(key === "Home" ? 0 : datar.length - 1);
      return;
    }

    if (key === "Enter" || key === " " || key === "Spacebar") {
      e.preventDefault();
      if (!terbuka) {
        buka();
        return;
      }
      pilih(datar[activeIndex]);
      return;
    }

    if (key.length === 1 && /\S/.test(key)) {
      const buffer = catatTypeahead(key);
      let idx = cariTypeahead(buffer);
      if (idx < 0 && buffer.length > 1) {
        typeaheadRef.current.buffer = buffer.slice(-1);
        idx = cariTypeahead(typeaheadRef.current.buffer);
      }
      if (idx < 0) return;

      e.preventDefault();
      setActiveIndex(idx);
      if (!terbuka) setTerbuka(true);
    }
  };

  const kelasPanel =
    posisi === "atas"
      ? "dropdown__panel dropdown__panel--atas"
      : "dropdown__panel";

  return (
    <div className={compact ? "dropdown dropdown--ringkas" : "dropdown"} ref={rootRef}>
      <button
        ref={triggerRef}
        type="button"
        id={id}
        className={`dropdown__trigger ${terbuka ? "dropdown__trigger--open" : ""}`}
        aria-haspopup="listbox"
        aria-expanded={terbuka}
        aria-controls={terbuka ? menuId : undefined}
        aria-activedescendant={
          terbuka && datar[activeIndex]
            ? `${id}-opsi-${activeIndex}`
            : undefined
        }
        onClick={() => {
          if (terbuka) tutup(false);
          else buka();
        }}
        onKeyDown={onKeyDown}
      >
        <span className="dropdown__nilai">
          {terpilih
            ? terpilih.triggerLabel ?? terpilih.label
            : placeholder}
          {terpilih?.short ? (
            <span className="dropdown__ringkas"> — {terpilih.short}</span>
          ) : null}
        </span>
        <span className="dropdown__chevron" aria-hidden="true">
          <ChevronIcon />
        </span>
      </button>

      {terbuka ? (
        <div
          ref={listRef}
          id={menuId}
          className={kelasPanel}
          role="listbox"
          aria-label={label}
          style={{ maxHeight: `${tinggiMaks}px` }}
        >
          {grup.map((g, gi) => (
            <div
              key={g.label ?? `grup-${gi}`}
              className="dropdown__grup"
              role="presentation"
            >
              {g.label ? (
                <div className="dropdown__grup-label" role="presentation">
                  {g.label}
                </div>
              ) : null}

              {g.options.map((opsi) => {
                const terpilihBaris =
                  String(opsi.value) === String(value);
                const aktif = opsi._i === activeIndex;
                return (
                  <div
                    key={opsi.value}
                    id={`${id}-opsi-${opsi._i}`}
                    ref={(el) => {
                      if (el) itemRefs.current[opsi._i] = el;
                    }}
                    role="option"
                    aria-selected={terpilihBaris}
                    className={[
                      "dropdown__opsi",
                      aktif ? "dropdown__opsi--aktif" : "",
                      terpilihBaris ? "dropdown__opsi--dipilih" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    onMouseDown={(e) => e.preventDefault()}
                    onMouseEnter={() => setActiveIndex(opsi._i)}
                    onClick={() => pilih(opsi)}
                  >
                    <span className="dropdown__centang" aria-hidden="true">
                      {terpilihBaris ? <CheckIcon /> : null}
                    </span>
                    <span className="dropdown__opsi-teks">
                      <span className="dropdown__opsi-nama">{opsi.label}</span>
                      {opsi.detail ? (
                        <span className="dropdown__opsi-detail">
                          {opsi.detail}
                        </span>
                      ) : null}
                    </span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
