import { useMemo, useState, useSyncExternalStore } from "react";
import { useModels } from "../utils/useModels.js";
import {
  langgananModel,
  lapisanSaatIni,
  validasiSel,
} from "../utils/lapisanModel.js";
import { formatSel } from "../utils/calculator.js";
import { getProviderIcon } from "../data/providerIcons.js";
import { formatKonteks, modelLengkap } from "../utils/opsi.js";

/** Sel angka yang bisa diedit di tempat. */
const KOLOM_ANGKA = [
  { field: "hargaInput", label: "Input $/1 jt", singkat: "Input" },
  { field: "hargaOutput", label: "Output $/1 jt", singkat: "Output" },
  { field: "hargaCache", label: "Cache $/1 jt", singkat: "Cache" },
  { field: "konteks", label: "Konteks", singkat: "Konteks" },
];

/**
 * Kolom grid desktop (8 sel): model | provider | 3 harga | konteks | sumber |
 * aksi. Di HP CSS mengubahnya menjadi kartu label+nilai bertumpuk.
 */
const LEBAR_DESKTOP = [
  "minmax(0, 1.6fr)",
  "132px",
  "96px",
  "96px",
  "96px",
  "104px",
  "minmax(0, 1.5fr)",
  "84px",
];

const PESAN_SUMBER_BELUM = "sumber belum diisi";


/** "2026-11-19" -> "19 Nov 2026" (id-ID, zona UTC agar tanggal tidak geser). */
export function formatTanggal(cek) {
  const cocok = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(cek ?? "").trim());
  if (!cocok) return String(cek ?? "");
  const [, y, b, d] = cocok;
  const tanggal = new Date(Date.UTC(Number(y), Number(b) - 1, Number(d)));
  if (Number.isNaN(tanggal.getTime())) return String(cek);
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(tanggal);
}

function GroupIcon({ provider }) {
  const jalur = getProviderIcon(provider);
  return (
    <span className="data-provider-ikon" aria-hidden="true">
      {jalur ? (
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="currentColor"
          focusable="false"
        >
          <path d={jalur} />
        </svg>
      ) : (
        <span className="data-provider-monogram">{provider.charAt(0)}</span>
      )}
    </span>
  );
}

/**
 * Sel angka yang bisa diedit di tempat (Sesi 5 butir 3).
 *
 * Nilai tersimpan ditampilkan apa adanya ("0.2"); saat difokuskan teks
 * dipilih semua dan pengguna mengetik bebas. Enter/blur memvalidasi:
 * - sah   -> disimpan (nilai lama tidak berubah bila sama)
 * - tidak -> DITOLAK, nilai lama tetap, pesan ramah tampil di baris itu
 * Esc membatalkan ketikan.
 */
function SelAngka({ id, field, nilai, label, onSet }) {
  const tersimpan = formatSel(nilai);
  const [draft, setDraft] = useState(null);
  const [galat, setGalat] = useState("");

  const simpan = (teks) => {
    if (draft === null) return;
    const hasil = validasiSel(field, teks);
    if (hasil.pesan) {
      setGalat(hasil.pesan);
      return;
    }
    setDraft(null);
    setGalat("");
    if (hasil.nilai !== nilai) onSet(hasil.nilai);
  };

  return (
    <>
      <input
        className={`data-sel-input${galat ? " data-sel-input--galat" : ""}`}
        id={id}
        type="text"
        inputMode={field === "konteks" ? "numeric" : "decimal"}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="none"
        spellCheck="false"
        aria-label={label}
        aria-invalid={galat ? "true" : undefined}
        aria-describedby={galat ? `${id}-galat` : undefined}
        value={draft ?? tersimpan}
        onChange={(e) => {
          setDraft(e.target.value);
          if (galat) setGalat("");
        }}
        onFocus={(e) => {
          const el = e.currentTarget;
          requestAnimationFrame(() => {
            try {
              el.select();
            } catch {
              // jsdom / peramban lama tanpa select() — abaikan.
            }
          });
        }}
        onBlur={(e) => simpan(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            simpan(e.currentTarget.value);
          } else if (e.key === "Escape") {
            e.preventDefault();
            setDraft(null);
            setGalat("");
            e.currentTarget.blur();
          }
        }}
      />
      {galat ? (
        <span className="data-sel-galat" id={`${id}-galat`} role="alert">
          {galat}
        </span>
      ) : null}
    </>
  );
}

/** Isian teks (nama/provider/sumber) untuk model tambahan. */
function SelTeks({ id, nilai, label, placeholder, onSet }) {
  const [draft, setDraft] = useState(null);
  const tampil = draft ?? (nilai || "");

  const simpan = (teks) => {
    setDraft(null);
    const bersih = teks.trim();
    if (bersih === (nilai || "").trim()) return;
    onSet(bersih);
  };

  return (
    <input
      className="data-sel-input data-sel-input--teks"
      id={id}
      type="text"
      autoComplete="off"
      autoCorrect="off"
      spellCheck="false"
      aria-label={label}
      placeholder={placeholder}
      value={tampil}
      onChange={(e) => setDraft(e.target.value)}
      onBlur={(e) => simpan(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          simpan(e.currentTarget.value);
        } else if (e.key === "Escape") {
          setDraft(null);
          e.currentTarget.blur();
        }
      }}
    />
  );
}

function SumberBaris({ model }) {
  const url = /^https?:\/\//i.test(model.sumber || "") ? model.sumber : "";
  const tanggal = model.cek ? `dicek ${formatTanggal(model.cek)}` : "";
  return (
    <div className="data-sumber">
      {url ? (
        <a
          className="data-sumber__tautan"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          title={url}
        >
          {namaSumber(url)}
        </a>
      ) : model.sumber ? (
        <span className="data-sumber__teks" title={model.sumber}>
          {model.sumber}
        </span>
      ) : (
        <span className="data-sumber__teks data-sumber__teks--kosong">
          {PESAN_SUMBER_BELUM}
        </span>
      )}
      {tanggal ? <span className="data-cek">{tanggal}</span> : null}
    </div>
  );
}

/** Nama situs ringkas dari URL sumber ("platform.claude.com"). */
function namaSumber(url) {
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return url;
  }
}

/**
 * Satu baris tabel F4. Di desktop berupa baris grid 9 sel; di HP (<=520px)
 * CSS memecahnya menjadi kartu label + nilai bertumpuk (bukan scroll).
 */
function BarisModel({ model, diubah, onUbah, onReset, onHapus }) {
  const belumLengkap = model.kustom && !modelLengkap(model);

  return (
    <div
      className={`data-baris${model.kustom ? " data-baris--kustom" : ""}`}
      role="row"
      data-model-id={model.id}
      style={{ "--data-kolom": LEBAR_DESKTOP.join(" ") }}
    >
      <div className="data-sel data-sel--nama" role="cell" data-label="Model">
        <div className="data-nama">
          {model.kustom ? (
            <SelTeks
              id={`f4-nama-${model.id}`}
              nilai={model.nama}
              label={`Nama model ${model.nama || "baru"}`}
              placeholder="Nama model"
              onSet={(v) => onUbah(model.id, "nama", v)}
            />
          ) : (
            <span className="data-nama__teks" title={model.nama}>
              {model.nama}
            </span>
          )}
          {diubah ? (
            <span
              className="data-lencana"
              title="Ada nilai yang berbeda dari bawaan"
            >
              diubah
            </span>
          ) : null}
        </div>
        {model.catatan ? <p className="data-catatan">{model.catatan}</p> : null}
        {model.kustom && model.baru ? (
          <p className="data-catatan data-catatan--peringatan">
            Angka contoh $1/$2/$0,05 · 100.000 — sesuaikan dengan harga resmi.
          </p>
        ) : null}
        {belumLengkap ? (
          <p className="data-catatan data-catatan--peringatan">
            Harga &amp; konteks belum lengkap — isi dulu agar model bisa dipakai.
          </p>
        ) : null}
      </div>

      <div
        className="data-sel data-sel--provider"
        role="cell"
        data-label="Provider"
      >
        {model.kustom ? (
          <SelTeks
            id={`f4-provider-${model.id}`}
            nilai={model.provider}
            label={`Provider ${model.nama || "baru"}`}
            placeholder="Provider"
            onSet={(v) => onUbah(model.id, "provider", v)}
          />
        ) : (
          <span className="data-teks">{model.provider}</span>
        )}
      </div>

      {KOLOM_ANGKA.map((kolom) => (
        <div
          key={kolom.field}
          className={`data-sel data-sel--angka${
            kolom.field === "konteks" ? " data-sel--konteks" : ""
          }`}
          role="cell"
          data-label={kolom.singkat}
        >
          <SelAngka
            id={`f4-${kolom.field}-${model.id}`}
            field={kolom.field}
            nilai={model[kolom.field]}
            label={`${kolom.label} — ${model.nama || "baru"}`}
            onSet={(v) => onUbah(model.id, kolom.field, v)}
          />
          {kolom.field === "konteks" ? (
            <span className="data-konteks-teks">
              {formatKonteks(model.konteks)}
            </span>
          ) : null}
        </div>
      ))}

      <div className="data-sel data-sel--sumber" role="cell" data-label="Sumber">
        {model.kustom ? (
          <div className="data-sumber-kustom">
            <SelTeks
              id={`f4-sumber-${model.id}`}
              nilai={model.sumber}
              label={`Sumber ${model.nama || "baru"} (boleh kosong)`}
              placeholder="Tautan halaman harga (boleh kosong)"
              onSet={(v) => onUbah(model.id, "sumber", v)}
            />
            {!model.sumber?.trim() ? (
              <span className="data-cek data-cek--kosong">{PESAN_SUMBER_BELUM}</span>
            ) : null}
          </div>
        ) : (
          <SumberBaris model={model} />
        )}
      </div>

      <div className="data-sel data-sel--aksi" role="cell" data-label="Aksi">
        <div className="data-aksi">
          {model.kustom ? (
            <button
              type="button"
              className="preset-chip data-hapus"
              onClick={() => onHapus(model.id)}
              aria-label={`Hapus model ${model.nama || "baru"}`}
            >
              Hapus
            </button>
          ) : (
            <button
              type="button"
              className="preset-chip data-reset"
              onClick={() => onReset(model.id)}
              disabled={!diubah}
              title={
                diubah
                  ? "Kembalikan baris ini ke nilai bawaan"
                  : "Baris ini masih sama dengan bawaan"
              }
            >
              Kembalikan
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Panel F4 — Basis Data Model & Harga (Sesi 5).
 *
 * Tabel dikelompokkan per provider (judul grup + logo satu warna Sesi 2E).
 * Semua perubahan ditulis ke lapisan bersama, sehingga F1–F3 terhitung ulang
 * seketika tanpa tombol Hitung.
 */
export default function DataModelPanel({ actions }) {
  const {
    ubahSel: onUbah,
    resetBaris: onReset,
    tambahModel: onTambah,
    hapusModel: onHapus,
    kembalikanBawaan: onKembalikanBawaan,
  } = actions;
  const daftarModel = useModels();
  const lapisan = useSyncExternalStore(
    langgananModel,
    lapisanSaatIni,
    lapisanSaatIni
  );
  const [konfirmasi, setKonfirmasi] = useState(false);

  const ubahSet = lapisan?.ubah ?? {};
  const adaUbah = Object.keys(ubahSet).length > 0;
  const adaTambah = (lapisan?.tambah ?? []).length > 0;
  const adaKustom = adaUbah || adaTambah;

  // Kelompokkan per provider; urutan provider mengikuti urutan data.
  const grup = useMemo(() => {
    const peta = new Map();
  for (const m of daftarModel) {
      if (!peta.has(m.provider)) peta.set(m.provider, []);
      peta.get(m.provider).push(m);
    }
    return [...peta.entries()].map(([provider, daftar]) => ({
      provider,
      daftar,
      jumlahDiubah: daftar.filter((m) => ubahSet[m.id]).length,
    }));
  }, [daftarModel, ubahSet]);

  const klikKembalikan = () => {
    if (!konfirmasi) {
      setKonfirmasi(true);
      return;
    }
    setKonfirmasi(false);
    onKembalikanBawaan();
  };

  return (
    <section className="data-model" aria-labelledby="f4-judul">
      <div className="data-model__kepala">
        <div className="data-model__judul">
          <h2 className="card__title" id="f4-judul">
            Basis Data Model &amp; Harga
          </h2>
          <p className="data-model__ringkas">
            {daftarModel.length} model · {grup.length} provider · harga per 1
            juta token (USD)
          </p>
        </div>
        <div className="data-model__aksi">
          <button type="button" className="preset-chip" onClick={onTambah}>
            Tambah model
          </button>
          <button
            type="button"
            className={`preset-chip data-kembalikan${
              konfirmasi ? " data-kembalikan--yakin" : ""
            }`}
            onClick={klikKembalikan}
            onBlur={() => setKonfirmasi(false)}
            disabled={!adaKustom && !konfirmasi}
            aria-live="polite"
            title={
              adaKustom
                ? "Hapus semua edit & model tambahan, kembali ke tabel bawaan"
                : "Tabel masih persis seperti bawaan"
            }
          >
            {konfirmasi
              ? "Yakin? Klik lagi untuk mengembalikan"
              : "Kembalikan bawaan"}
          </button>
        </div>
      </div>

      <p className="data-model__catatan">
        {adaKustom ? (
          <>
            Perubahanmu tersimpan di browser ini. Sel bertanda{" "}
            <span className="data-lencana">diubah</span> berbeda dari bawaan;{" "}
            <strong>Kembalikan bawaan</strong> menghapus semuanya.
          </>
        ) : (
          <>
            Semua baris masih bawaan. Klik sel harga untuk menyimpan versimu
            sendiri — F1–F3 langsung memakainya.
          </>
        )}
      </p>

      <div
        className="data-tabel"
        role="table"
        aria-label="Model dan harga per 1 juta token"
      >
        <div
          className="data-baris data-baris--kepala"
          role="row"
          style={{ "--data-kolom": LEBAR_DESKTOP.join(" ") }}
        >
          {[
            "Model",
            "Provider",
            "Input $/1 jt",
            "Output $/1 jt",
            "Cache $/1 jt",
            "Konteks",
            "Sumber",
            "Aksi",
          ].map((judul, i) => (
            <div
              key={judul}
              role="columnheader"
              className="data-kolom-kepala"
              style={{ gridColumn: i + 1 }}
            >
              {judul}
            </div>
          ))}
        </div>

        {grup.map(({ provider, daftar, jumlahDiubah }) => (
          <div className="data-grup" role="rowgroup" key={provider}>
            <div className="data-grup__judul" role="presentation">
              <GroupIcon provider={provider} />
              <span className="data-grup__nama">{provider}</span>
              <span className="data-grup__jumlah">{daftar.length}</span>
              {jumlahDiubah ? (
                <span className="data-grup__ubah">{jumlahDiubah} diubah</span>
              ) : null}
            </div>

            {daftar.map((model) => (
              <BarisModel
                key={model.id}
                model={model}
                diubah={Boolean(ubahSet[model.id])}
                onUbah={onUbah}
                onReset={onReset}
                onHapus={onHapus}
              />
            ))}
          </div>
        ))}
      </div>

      <p className="data-model__kaki">
        Harga dikurasi manual dari halaman resmi tiap provider; lihat tanggal{" "}
        <em>dicek</em> pada tiap baris. Nilai yang kamu ubah hanya tersimpan di
        browser ini — bukan angka tagihan.
      </p>
    </section>
  );
}
