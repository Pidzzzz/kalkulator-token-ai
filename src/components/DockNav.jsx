export const MODULES = [
  { id: "f1", badge: "F1", label: "Penerjemah Batas" },
  { id: "f2", badge: "F2", label: "Simulator Sesi", hasDot: true },
  { id: "f3", badge: "F3", label: "Token Teks", hasDot: true },
  { id: "f4", badge: "F4", label: "Data Model", hasDot: true },
];

export default function DockNav({ activeModule, onSelectModule }) {
  const handleKeyDown = (e, index) => {
    let targetIndex = null;
    if (e.key === "ArrowRight") {
      targetIndex = (index + 1) % MODULES.length;
    } else if (e.key === "ArrowLeft") {
      targetIndex = (index - 1 + MODULES.length) % MODULES.length;
    } else if (e.key === "Home") {
      targetIndex = 0;
    } else if (e.key === "End") {
      targetIndex = MODULES.length - 1;
    }

    if (targetIndex !== null) {
      e.preventDefault();
      const targetModule = MODULES[targetIndex];
      onSelectModule(targetModule.id);
      const btn = document.getElementById(`tab-${targetModule.id}`);
      if (btn) btn.focus();
    }
  };

  return (
    <nav className="dock-nav" role="tablist" aria-label="Navigasi modul">
      {MODULES.map((m, index) => {
        const isSelected = activeModule === m.id;
        return (
          <button
            key={m.id}
            id={`tab-${m.id}`}
            type="button"
            role="tab"
            aria-selected={isSelected}
            aria-controls={`panel-${m.id}`}
            tabIndex={isSelected ? 0 : -1}
            className="dock-btn"
            onClick={() => onSelectModule(m.id)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          >
            <span className="dock-btn__badge">{m.badge}</span>
            <span className="dock-btn__label">{m.label}</span>
            {m.hasDot && <span className="dock-btn__dot" aria-hidden="true" />}
          </button>
        );
      })}
    </nav>
  );
}
