import { useState, useEffect } from "react";
import Header from "./components/Header";
import ModuleTabs from "./components/ModuleTabs";
import InputPanel from "./components/InputPanel";
import ResultPanel from "./components/ResultPanel";
import Footer from "./components/Footer";

export default function App() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("kalkulator-theme") || "gelap";
    } catch {
      return "gelap";
    }
  });

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    try {
      localStorage.setItem("kalkulator-theme", newTheme);
    } catch {}
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="page">
      <Header currentTheme={theme} onThemeChange={changeTheme} />
      <ModuleTabs />

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
      </main>

      <Footer />
    </div>
  );
}
