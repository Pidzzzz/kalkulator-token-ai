const MODULES = [
  { id: "F1", label: "Penerjemah Batas", active: true },
  { id: "F2", label: "Simulator Sesi Agen", active: false },
  { id: "F3", label: "Penghitung Token Teks", active: false },
  { id: "F4", label: "Basis Data Model & Harga", active: false },
];

export default function ModuleTabs() {
  return (
    <div
      className="module-tabs"
      role="tablist"
      aria-label="Pilihan modul"
    >
      {MODULES.map((m) => (
        <button
          key={m.id}
          type="button"
          role="tab"
          id={`tab-${m.id.toLowerCase()}`}
          aria-selected={m.active}
          tabIndex={m.active ? 0 : -1}
          className="module-tab"
        >
          <span className="module-tab__badge">{m.id}</span>
          <span className="module-tab__label">{m.label}</span>
          {!m.active && <span className="module-tab__soon">segera</span>}
        </button>
      ))}
    </div>
  );
}
