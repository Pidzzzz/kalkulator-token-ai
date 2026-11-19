import { useMemo } from "react";
import { models, presets, jendelaOptions } from "../data/models";
import { formatHarga, parseAngka } from "../utils/calculator";

const NOMINAL_CEPAT = [5, 10, 20, 50];
const PERSEN_CEPAT = [25, 50];

export default function InputPanel({
  paketId,
  modelId,
  jatah,
  totalKuota,
  jendela,
  onPilihPaket,
  onPilihModel,
  onUbahJatah,
  onUbahTotal,
  onUbahJendela,
}) {
  // Kelompokkan model per provider untuk <optgroup>.
  const modelPerProvider = useMemo(() => {
    const grup = new Map();
    for (const m of models) {
      if (!grup.has(m.provider)) grup.set(m.provider, []);
      grup.get(m.provider).push(m);
    }
    return Array.from(grup.entries());
  }, []);

  const totalAngka = parseAngka(totalKuota);
  const totalValid = Number.isFinite(totalAngka) && totalAngka > 0;

  const isiJatahPersen = (persen) => {
    if (!totalValid) return;
    const nilai = (totalAngka * persen) / 100;
    onUbahJatah(formatHarga(nilai));
  };

  return (
    <article className="card">
      <h2 className="card__title">Masukan</h2>

      <form className="input-form" onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label className="form-label" htmlFor="paket">
            Paket langganan
          </label>
          <select
            className="form-select"
            id="paket"
            name="paket"
            value={paketId}
            onChange={(e) => onPilihPaket(e.target.value)}
          >
            {presets.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nama}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="model">
            Model
          </label>
          <select
            className="form-select"
            id="model"
            name="model"
            value={modelId}
            onChange={(e) => onPilihModel(e.target.value)}
          >
            {modelPerProvider.map(([provider, daftar]) => (
              <optgroup key={provider} label={provider}>
                {daftar.map((m) => (
                  <option key={m.id} value={m.id}>
                    {`${m.nama} — $${formatHarga(m.hargaInput)}/$${formatHarga(
                      m.hargaOutput
                    )} per 1 jt`}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="jatah">
            Jatah (USD)
          </label>
          <input
            className="form-input"
            id="jatah"
            name="jatah"
            type="text"
            inputMode="decimal"
            autoCorrect="off"
            autoCapitalize="none"
            spellCheck="false"
            value={jatah}
            onChange={(e) => onUbahJatah(e.target.value)}
          />

          <div
            className="preset-chips"
            role="group"
            aria-label="Isi jatah cepat"
          >
            {NOMINAL_CEPAT.map((nominal) => (
              <button
                key={nominal}
                type="button"
                className="preset-chip"
                onClick={() => onUbahJatah(String(nominal))}
              >
                ${nominal}
              </button>
            ))}
            {PERSEN_CEPAT.map((persen) => {
              const nilai = totalValid ? (totalAngka * persen) / 100 : null;
              return (
                <button
                  key={persen}
                  type="button"
                  className="preset-chip"
                  onClick={() => isiJatahPersen(persen)}
                  disabled={!totalValid}
                  title={
                    totalValid
                      ? `Isi ${persen}% dari total ($${formatHarga(nilai)})`
                      : "Isi total jatah paket dulu untuk memakai chip persen"
                  }
                >
                  {persen}%
                </button>
              );
            })}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="totalKuota">
            Total jatah paket (USD)
          </label>
          <input
            className="form-input"
            id="totalKuota"
            name="totalKuota"
            type="text"
            inputMode="decimal"
            autoCorrect="off"
            autoCapitalize="none"
            spellCheck="false"
            value={totalKuota}
            placeholder="Contoh: 50"
            onChange={(e) => onUbahTotal(e.target.value)}
          />
          <p className="form-hint">Dasar bilah pemakaian jatah.</p>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="jendela">
            Jendela waktu
          </label>
          <select
            className="form-select"
            id="jendela"
            name="jendela"
            value={jendela}
            onChange={(e) => onUbahJendela(e.target.value)}
          >
            {jendelaOptions.map((j) => (
              <option key={j.id} value={j.id}>
                {j.label}
              </option>
            ))}
          </select>
        </div>
      </form>
    </article>
  );
}
