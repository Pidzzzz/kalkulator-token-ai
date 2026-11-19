const MODULES = [
  { id: "F1", label: "Penerjemah Batas", active: true },
  { id: "F2", label: "Simulator Sesi Agen", active: false },
  { id: "F3", label: "Penghitung Token Teks", active: false },
  { id: "F4", label: "Basis Data Model & Harga", active: false },
];

export default function ModuleTabs() {
  return (
    <nav className="module-tabs" aria-label="Pilih modul">
      {MODULES.map((m) => (
        <div
          key={m.id}
          className={`module-tab${m.active ? " module-tab--active" : ""}`}
          role="tab"
          aria-selected={m.active}
          tabIndex={m.active ? 0 : -1}
        >
          <span className="module-tab__badge">{m.id}</span>
          <span>{m.label}</span>
          {!m.active && <span className="module-tab__soon">segera</span>}
        </div>
      ))}
    </nav>
  );
}
