import { useState, useEffect, useCallback } from "react";
import Header from "./components/Header";
import DockNav, { MODULES } from "./components/DockNav";
import InputPanel from "./components/InputPanel";
import ResultPanel from "./components/ResultPanel";
import FormulaSection from "./components/FormulaSection";
import Footer from "./components/Footer";

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
            <InputPanel />
            <ResultPanel />
          </div>
          <FormulaSection />
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
