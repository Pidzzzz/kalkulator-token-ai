import { useState, useEffect, useRef } from "react";

/**
 * Hook animasi count-up sederhana (200-300ms).
 * Menghormati prefers-reduced-motion.
 *
 * Animasi selalu melanjutkan dari angka yang sedang tampil, sehingga
 * perubahan masukan yang cepat tidak membuat angka melompat mundur.
 */
export function useCountUp(targetValue, duration = 250) {
  const target =
    typeof targetValue === "number" && Number.isFinite(targetValue)
      ? targetValue
      : 0;

  const [displayValue, setDisplayValue] = useState(target);
  const displayRef = useRef(target);
  const rafRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || duration <= 0) {
      displayRef.current = target;
      setDisplayValue(target);
      return;
    }

    const startValue = displayRef.current;
    if (startValue === target) {
      setDisplayValue(target);
      return;
    }

    let startTime = null;

    const animate = (timestamp) => {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing: ease-out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = startValue + (target - startValue) * ease;

      displayRef.current = current;
      setDisplayValue(current);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        displayRef.current = target;
        setDisplayValue(target);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration]);

  return displayValue;
}
