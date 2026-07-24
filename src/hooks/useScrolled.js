import { useEffect, useState } from 'react';

/**
 * Indica si la página se ha desplazado más allá de un umbral.
 * Útil para aplicar estilos "sticky/compact" a la cabecera.
 *
 * @param {number} threshold  Píxeles de scroll a partir de los cuales devuelve true.
 * @returns {boolean}
 */
export function useScrolled(threshold = 8) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return scrolled;
}
