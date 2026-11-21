import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import Header from "./components/Header";
import DockNav, { MODULES } from "./components/DockNav";
import InputPanel from "./components/InputPanel";
import ResultPanel from "./components/ResultPanel";
import FormulaSection from "./components/FormulaSection";
import MobileResultStrip from "./components/MobileResultStrip";
import SimulatorInput from "./components/SimulatorInput";
import SimulatorResult from "./components/SimulatorResult";
import SimulatorFormula from "./components/SimulatorFormula";
import SimulatorMobileStrip from "./components/SimulatorMobileStrip";
import TeksInput from "./components/TeksInput";
import TeksResult from "./components/TeksResult";
import TeksFormula from "./components/TeksFormula";
import TeksMobileStrip from "./components/TeksMobileStrip";
import DataModelPanel from "./components/DataModelPanel.jsx";
import FaqGlosarium from "./components/FaqGlosarium";
import Footer from "./components/Footer";
import { useF1State } from "./utils/useF1State";
import { useF2State } from "./utils/useF2State";
import { useF3State } from "./utils/useF3State";
import { useSinkronModel, useModels } from "./utils/useModels";
import { aksiModel } from "./utils/lapisanModel";
import {
  getJendelaLabel,
  getPresetById,
  hitungF1,
} from "./utils/calculator";
import { hitungF2 } from "./utils/calculatorF2";
import { hitungF3 } from "./utils/calculatorF3";
import { MATA_UANG_KEY } from "./utils/uiHelpers";
import { KODE_MATA_UANG_BAWAAN, getCurrency } from "./data/currencies";

function getModuleFromHash() {
  if (typeof window === "undefined") return "f1";
  const hash = window.location.hash.toLowerCase().replace("#", "");
  return MODULES.some((m) => m.id === hash) ? hash : "f1";
}

function bacaMataUang() {
  if (typeof window === "undefined") return KODE_MATA_UANG_BAWAAN;
  try {
    const tersimpan = window.localStorage.getItem(MATA_UANG_KEY);
    return getCurrency(tersimpan) ? tersimpan : KODE_MATA_UANG_BAWAAN;
  } catch {
    return KODE_MATA_UANG_BAWAAN;
  }
}

export default function App() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("kalkulator-theme") || "gelap";
    } catch {
      return "gelap";
    }
  });

  const [activeModule, setActiveModule] = useState(getModuleFromHash);

  // Sinkronkan daftar model antar-tab (F4 mengubah harga → semua tab ikut).
  useSinkronModel();

  // Daftar model gabungan (bawaan + kustom F4). Dibaca di komponen teratas agar
  // App dan seluruh hook di bawahnya berlangganan perubahan store model, lalu
  // F1–F3 dihitung ulang seketika tanpa tombol Hitung.
  const daftarModel = useModels();

  /**
   * Model terpilih yang hilang (mis. model tambahan dihapus, atau id lama di
   * localStorage) jatuh aman ke model bawaan — tanpa kosong/NaN.
   */
  const jagaModel = useCallback(
    (modelId) => {
      const ada = daftarModel.some((m) => m.id === modelId);
      return ada ? modelId : "claude-sonnet-5-5";
    },
    [daftarModel]
  );

  // Usaha memilih model yang sama, tetapi bila DAFTAR model berubah (harga
  // diedit di F4, model tambahan dihapus) memo di bawah wajib ikut menghitung
  // ulang — karena harga dibaca dari lapisan, bukan dari potongan state.
  const [, setVersiModel] = useState(0);
  useEffect(() => {
    setVersiModel((v) => v + 1);
  }, [daftarModel]);

  const {
    state: f1,
    pilihPaket,
    pilihModel,
    aturJatah,
    aturTotalKuota,
    aturJendela,
    aturTokenInput,
    aturTokenOutput,
  } = useF1State();

  const modelF1 = jagaModel(f1.modelId);

  const preset = getPresetById(f1.paketId);
  const jendelaLabel = getJendelaLabel(f1.jendela);

  const result = useMemo(
    () =>
      hitungF1({
        modelId: modelF1,
        jatah: f1.jatah,
        tokenInput: f1.tokenInput,
        tokenOutput: f1.tokenOutput,
        totalKuota: f1.totalKuota,
      }),
    // `daftarModel` di dependensi: harga model bisa berubah tanpa f1 berubah.
    [modelF1, f1.jatah, f1.tokenInput, f1.tokenOutput, f1.totalKuota, daftarModel]
  );

  // Strip hasil ringkas di HP: muncul setelah panel Masukan terlewati.
  const inputPanelRef = useRef(null);
  const [stripVisible, setStripVisible] = useState(false);

  // ---- F2 Simulator Sesi Agen ----
  const {
    state: f2,
    pilihModel: pilihModelF2,
    aturKonteksAwal,
    aturPertumbuhan,
    aturPutaran,
    aturRasioCache,
    aturOutputPerPutaran,
    pilihSkenario,
  } = useF2State();

  const [mataUang, setMataUang] = useState(bacaMataUang);
  const modelF2 = jagaModel(f2.modelId);

  const ubahMataUang = useCallback((kode) => {
    setMataUang(kode);
    try {
      window.localStorage.setItem(MATA_UANG_KEY, kode);
    } catch {
      // Penyimpanan tidak tersedia — pilihan tetap berlaku selama sesi.
    }
  }, []);

  const resultF2 = useMemo(
    () =>
      hitungF2({
        modelId: modelF2,
        konteksAwal: f2.konteksAwal,
        pertumbuhan: f2.pertumbuhan,
        putaran: f2.putaran,
        rasioCache: f2.rasioCache,
        outputPerPutaran: f2.outputPerPutaran,
      }),
    [
      modelF2,
      f2.konteksAwal,
      f2.pertumbuhan,
      f2.putaran,
      f2.rasioCache,
      f2.outputPerPutaran,
      daftarModel,
    ]
  );

  const inputPanelF2Ref = useRef(null);

  // ---- F3 Penghitung Token Teks ----
  const {
    state: f3,
    aturTeks,
    pilihModel: pilihModelF3,
    isiContoh: isiContohF3,
    bersihkan: bersihkanF3,
  } = useF3State();

  const modelF3 = jagaModel(f3.modelId);

  const resultF3 = useMemo(
    () => hitungF3({ teks: f3.teks, modelId: modelF3 }),
    [f3.teks, modelF3, daftarModel]
  );

  const inputPanelF3Ref = useRef(null);

  useEffect(() => {
    if (
      activeModule !== "f1" &&
      activeModule !== "f2" &&
      activeModule !== "f3"
    ) {
      setStripVisible(false);
      return;
    }

    let raf = null;
    const panelRef =
      activeModule === "f1"
        ? inputPanelRef
        : activeModule === "f2"
          ? inputPanelF2Ref
          : inputPanelF3Ref;

    const perbarui = () => {
      const el = panelRef.current;
      if (!el) {
        setStripVisible(false);
        return;
      }
      setStripVisible(el.getBoundingClientRect().bottom < 0);
    };

    const onScroll = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(perbarui);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    perbarui();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [activeModule]);

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    try {
      localStorage.setItem("kalkulator-theme", newTheme);
    } catch {}
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const selectModule = useCallback((id) => {
    setActiveModule(id);
    if (window.location.hash.toLowerCase().replace("#", "") !== id) {
      window.location.hash = id;
    }
  }, []);

  // Listen to hashchange from browser back/forward or external links.
  // Hash bacaan (#faq-glosarium) bukan modul: jangan paksa halaman pindah ke
  // F1 hanya karena pengguna mengeklik tautan anchor dari footer.
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase().replace("#", "");
      if (!MODULES.some((m) => m.id === hash)) return;
      setActiveModule(hash);
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Keyboard navigation for F1-F4 keys
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      const keyUpper = e.key.toUpperCase();
      if (["F1", "F2", "F3", "F4"].includes(keyUpper)) {
        e.preventDefault();
        const targetId = keyUpper.toLowerCase();
        selectModule(targetId);
        const btn = document.getElementById(`tab-${targetId}`);
        if (btn) btn.focus();
      }
    };
    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [selectModule]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="page">
      <Header currentTheme={theme} onThemeChange={changeTheme} />

      {activeModule === "f1" ? (
        <main
          id="panel-f1"
          role="tabpanel"
          aria-labelledby="tab-f1"
          tabIndex={0}
          className="main-panel"
        >
          <div className="module-f1">
            <div className="module-f1__input" ref={inputPanelRef}>
              <InputPanel
                paketId={f1.paketId}
                modelId={modelF1}
                jatah={f1.jatah}
                totalKuota={f1.totalKuota}
                jendela={f1.jendela}
                onPilihPaket={pilihPaket}
                onPilihModel={pilihModel}
                onUbahJatah={aturJatah}
                onUbahTotal={aturTotalKuota}
                onUbahJendela={aturJendela}
              />
            </div>

            <ResultPanel
              result={result}
              preset={preset}
              model={result.model}
              jendelaLabel={jendelaLabel}
              mataUang={mataUang}
              onUbahMataUang={ubahMataUang}
            />
          </div>

          <FormulaSection
            result={result}
            tokenInput={f1.tokenInput}
            tokenOutput={f1.tokenOutput}
            onTokenInputChange={aturTokenInput}
            onTokenOutputChange={aturTokenOutput}
          />

          <MobileResultStrip
            result={result}
            visible={stripVisible}
            mataUang={mataUang}
          />
        </main>
      ) : activeModule === "f2" ? (
        <main
          id="panel-f2"
          role="tabpanel"
          aria-labelledby="tab-f2"
          tabIndex={0}
          className="main-panel"
        >
          <div className="module-f1 module-f2">
            <div className="module-f1__input" ref={inputPanelF2Ref}>
              <SimulatorInput
                modelId={modelF2}
                konteksAwal={f2.konteksAwal}
                pertumbuhan={f2.pertumbuhan}
                putaran={f2.putaran}
                rasioCache={f2.rasioCache}
                outputPerPutaran={f2.outputPerPutaran}
                onPilihModel={pilihModelF2}
                onUbahKonteksAwal={aturKonteksAwal}
                onUbahPertumbuhan={aturPertumbuhan}
                onUbahPutaran={aturPutaran}
                onUbahRasioCache={aturRasioCache}
                onUbahOutput={aturOutputPerPutaran}
                onPilihSkenario={pilihSkenario}
              />
            </div>

            <SimulatorResult
              result={resultF2}
              mataUang={mataUang}
              onUbahMataUang={ubahMataUang}
            />
          </div>

          <SimulatorFormula
            result={resultF2}
            konteksAwal={f2.konteksAwal}
            pertumbuhan={f2.pertumbuhan}
            putaran={f2.putaran}
            rasioCache={f2.rasioCache}
            outputPerPutaran={f2.outputPerPutaran}
            onUbahKonteksAwal={aturKonteksAwal}
            onUbahPertumbuhan={aturPertumbuhan}
            onUbahRasioCache={aturRasioCache}
            onUbahOutput={aturOutputPerPutaran}
          />

          <SimulatorMobileStrip
            result={resultF2}
            visible={stripVisible}
            mataUang={mataUang}
          />
        </main>
      ) : activeModule === "f3" ? (
        <main
          id="panel-f3"
          role="tabpanel"
          aria-labelledby="tab-f3"
          tabIndex={0}
          className="main-panel"
        >
          <div className="module-f1 module-f3">
            <div className="module-f1__input" ref={inputPanelF3Ref}>
              <TeksInput
                modelId={modelF3}
                teks={f3.teks}
                onPilihModel={pilihModelF3}
                onUbahTeks={aturTeks}
                onContoh={isiContohF3}
                onBersihkan={bersihkanF3}
              />
            </div>

            <TeksResult
              result={resultF3}
              mataUang={mataUang}
              onUbahMataUang={ubahMataUang}
            />
          </div>

          <TeksFormula result={resultF3} />

          <TeksMobileStrip result={resultF3} visible={stripVisible} />
        </main>
      ) : (
        <main
          id="panel-f4"
          role="tabpanel"
          aria-labelledby="tab-f4"
          tabIndex={0}
          className="main-panel"
        >
          <DataModelPanel
            actions={aksiModel}
          />
        </main>
      )}

      <FaqGlosarium />

      <Footer />
      <DockNav activeModule={activeModule} onSelectModule={selectModule} />
    </div>
  );
}
