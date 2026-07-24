import { useEffect, useRef, useState } from 'react';

/**
 * useReveal — Revela un elemento cuando entra en el viewport (IntersectionObserver).
 * Base de las animaciones de entrada "cinematográficas" al hacer scroll.
 *
 * Uso:
 *   const [ref, shown] = useReveal();
 *   <div ref={ref} className={`reveal ${shown ? 'is-visible' : ''}`}>…</div>
 *
 * @param {Object} [options]
 * @param {number} [options.threshold=0.15]  Porción visible para disparar.
 * @param {boolean} [options.once=true]       Revela una sola vez.
 * @returns {[React.RefObject, boolean]}
 */
export function useReveal({ threshold = 0.15, once = true } = {}) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    // Respeta la preferencia de movimiento reducido: muestra sin animar.
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setShown(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setShown(false);
        }
      },
      { threshold },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, once]);

  return [ref, shown];
}
