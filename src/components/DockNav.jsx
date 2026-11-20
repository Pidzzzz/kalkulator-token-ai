import { useCallback, useEffect, useRef, useState } from "react";

export const MODULES = [
  { id: "f1", badge: "F1", label: "Penerjemah Batas" },
  { id: "f2", badge: "F2", label: "Simulator Sesi" },
  { id: "f3", badge: "F3", label: "Penghitung Token" },
  { id: "f4", badge: "F4", label: "Data Model" },
];

const DIAM_MS = 2500;
const TAHAN_MODUL_MS = 1000;

export default function DockNav({ activeModule, onSelectModule }) {
  const [redup, setRedup] = useState(false);
  const [kurangiGerak, setKurangiGerak] = useState(false);

  const hoverRef = useRef(false);
  const fokusRef = useRef(false);
  const timerRef = useRef(null);
  const tahanSampaiRef = useRef(0);
  const modulAwalRef = useRef(true);

  // Fitur dimatikan bila prefers-reduced-motion aktif.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setKurangiGerak(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const bersihkanTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const jadwalkan = useCallback(() => {
    bersihkanTimer();
    // Tahan penuh 1 detik setelah ganti modul, lalu hitung diam 2,5 detik.
    const tunda = Math.max(0, tahanSampaiRef.current - Date.now()) + DIAM_MS;
    timerRef.current = setTimeout(() => {
      timerRef.current = null;
      if (!hoverRef.current && !fokusRef.current) setRedup(true);
    }, tunda);
  }, [bersihkanTimer]);

  const bangunkan = useCallback(() => {
    setRedup(false);
    if (kurangiGerak) return;
    jadwalkan();
  }, [jadwalkan, kurangiGerak]);

  // Jadwal awal saat dock tampil; hormati reduced motion.
  useEffect(() => {
    if (kurangiGerak) {
      bersihkanTimer();
      setRedup(false);
      return undefined;
    }
    jadwalkan();
    return bersihkanTimer;
  }, [kurangiGerak, jadwalkan, bersihkanTimer]);

  // Berpindah modul = interaksi: tetap penuh selama 1 detik.
  useEffect(() => {
    if (modulAwalRef.current) {
      modulAwalRef.current = false;
      return;
    }
    if (kurangiGerak) return;
    tahanSampaiRef.current = Date.now() + TAHAN_MODUL_MS;
    setRedup(false);
    jadwalkan();
  }, [activeModule, kurangiGerak, jadwalkan]);

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

  const handlePointerEnter = () => {
    hoverRef.current = true;
    bangunkan();
  };

  const handlePointerLeave = () => {
    hoverRef.current = false;
    if (!fokusRef.current && !kurangiGerak) jadwalkan();
  };

  // Sentuhan tidak selalu memicu pointerleave: lepaskan status hover saat jari
  // diangkat/batal agar dock tetap bisa redup.
  const handlePointerRelease = (e) => {
    if (e.pointerType === "mouse") return;
    hoverRef.current = false;
    if (!fokusRef.current && !kurangiGerak) jadwalkan();
  };

  const handleFocusCapture = (e) => {
    // Hanya fokus keyboard yang menahan dock tetap penuh; fokus sisa dari
    // sentuhan di HP tidak boleh membuat dock redup selamanya.
    let fokusKeyboard = false;
    try {
      fokusKeyboard =
        typeof e.target.matches === "function" &&
        e.target.matches(":focus-visible");
    } catch {
      fokusKeyboard = false;
    }
    fokusRef.current = fokusKeyboard;
    bangunkan();
  };

  const handleBlurCapture = (e) => {
    if (e.currentTarget.contains(e.relatedTarget)) return;
    fokusRef.current = false;
    if (!hoverRef.current && !kurangiGerak) jadwalkan();
  };

  return (
    <nav
      className={redup ? "dock-nav dock-nav--redup" : "dock-nav"}
      role="tablist"
      aria-label="Navigasi modul"
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerDown={bangunkan}
      onPointerUp={handlePointerRelease}
      onPointerCancel={handlePointerRelease}
      onFocusCapture={handleFocusCapture}
      onBlurCapture={handleBlurCapture}
    >
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
