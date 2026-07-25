import { useEffect, useState } from 'react';

/**
 * useInView — ¿El elemento está (aunque sea parcialmente) en pantalla y con la
 * pestaña visible?
 *
 * Sirve para no gastar CPU en animaciones y temporizadores de secciones que el
 * usuario no está mirando: el marquee de partidos y la simulación de cuotas se
 * quedaban corriendo a 60 fps con la sección fuera del viewport o con la
 * pestaña en segundo plano.
 *
 * Si el navegador no soporta `IntersectionObserver`, devuelve siempre `true`
 * (degradación segura: se comporta como antes).
 *
 * @param {import('react').RefObject<Element>} ref  Elemento a observar.
 * @param {Object} [options]
 * @param {string} [options.rootMargin='200px']  Margen para activar un poco antes.
 * @returns {boolean}
 */
export function useInView(ref, { rootMargin = '200px' } = {}) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;

    let onScreen = true;
    let tabVisible = document.visibilityState !== 'hidden';
    const sync = () => setVisible(onScreen && tabVisible);

    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        sync();
      },
      { rootMargin },
    );
    observer.observe(el);

    const onVisibility = () => {
      tabVisible = document.visibilityState !== 'hidden';
      sync();
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [ref, rootMargin]);

  return visible;
}
