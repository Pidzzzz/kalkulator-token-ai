import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import Header from "./components/Header";
import DockNav, { MODULES } from "./components/DockNav";
import InputPanel from "./components/InputPanel";
import ResultPanel from "./components/ResultPanel";
import FormulaSection from "./components/FormulaSection";
import MobileResultStrip from "./components/MobileResultStrip";
import Footer from "./components/Footer";
import { useF1State } from "./utils/useF1State";
import { getJendelaLabel, getPresetById, hitungF1 } from "./utils/calculator";

function getModuleFromHash() {
  if (typeof window === "undefined") return "f1";
  const hash = window.location.hash.toLowerCase().replace("#", "");
  return MODULES.some((m) => m.id === hash) ? hash : "f1";
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

  const preset = getPresetById(f1.paketId);
  const jendelaLabel = getJendelaLabel(f1.jendela);

  const result = useMemo(
    () =>
      hitungF1({
        modelId: f1.modelId,
        jatah: f1.jatah,
        tokenInput: f1.tokenInput,
        tokenOutput: f1.tokenOutput,
        totalKuota: f1.totalKuota,
      }),
    [f1.modelId, f1.jatah, f1.tokenInput, f1.tokenOutput, f1.totalKuota]
  );

  // Strip hasil ringkas di HP: muncul setelah panel Masukan terlewati.
  const inputPanelRef = useRef(null);
  const [stripVisible, setStripVisible] = useState(false);

  useEffect(() => {
    if (activeModule !== "f1") {
      setStripVisible(false);
      return;
    }

    let raf = null;

    const perbarui = () => {
      const el = inputPanelRef.current;
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

  // Listen to hashchange from browser back/forward or external links
  useEffect(() => {
    const handleHashChange = () => {
      const mod = getModuleFromHash();
      setActiveModule(mod);
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

  const currentModule =
    MODULES.find((m) => m.id === activeModule) || MODULES[0];

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
                modelId={f1.modelId}
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
            />
          </div>

          <FormulaSection
            result={result}
            tokenInput={f1.tokenInput}
            tokenOutput={f1.tokenOutput}
            onTokenInputChange={aturTokenInput}
            onTokenOutputChange={aturTokenOutput}
          />

          <MobileResultStrip result={result} visible={stripVisible} />
        </main>
      ) : (
        <main
          id={`panel-${activeModule}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeModule}`}
          tabIndex={0}
          className="main-panel"
        >
          <article className="card module-placeholder">
            <h2 className="card__title">{currentModule.label}</h2>
            <p className="module-placeholder__text">Modul ini segera hadir.</p>
          </article>
        </main>
      )}

      <Footer />
      <DockNav activeModule={activeModule} onSelectModule={selectModule} />
    </div>
  );
}
