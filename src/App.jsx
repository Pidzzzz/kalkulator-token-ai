import Header from "./components/Header";
import ModuleTabs from "./components/ModuleTabs";
import InputPanel from "./components/InputPanel";
import ResultPanel from "./components/ResultPanel";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="page">
      <Header />
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
