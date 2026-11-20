import { useMemo } from "react";
import Dropdown from "./Dropdown";
import { formatHarga, parseAngka } from "../utils/calculator";
import {
  buatOpsiJendela,
  buatOpsiModel,
  buatOpsiPaket,
} from "../utils/opsi";

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
  // Data opsi dropdown — dipakai bersama oleh Paket, Model, dan Jendela.
  const opsiPaket = useMemo(() => buatOpsiPaket(), []);
  const grupModel = useMemo(() => buatOpsiModel(), []);
  const opsiJendela = useMemo(() => buatOpsiJendela(), []);

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
          <Dropdown
            id="paket"
            label="Paket langganan"
            value={paketId}
            onChange={onPilihPaket}
            options={opsiPaket}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="model">
            Model
          </label>
          <Dropdown
            id="model"
            label="Model"
            value={modelId}
            onChange={onPilihModel}
            groups={grupModel}
          />
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
          <Dropdown
            id="jendela"
            label="Jendela waktu"
            value={jendela}
            onChange={onUbahJendela}
            options={opsiJendela}
          />
        </div>
      </form>
    </article>
  );
}
