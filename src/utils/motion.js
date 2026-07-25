// =============================================================================
// UTILS · Motion — capa segura sobre GSAP + ScrollTrigger
// =============================================================================
// Problema que resuelve:
//   `gsap.from({ opacity: 0 })` pinta el estado inicial INMEDIATAMENTE. Si el
//   ScrollTrigger asociado no llega a dispararse, el contenido se queda
//   invisible para siempre. Eso pasaba en Mac y portátiles porque:
//     1. ScrollTrigger mide las posiciones antes de que carguen las imágenes
//        `loading="lazy"` y las fuentes; al cargar, el layout se desplaza y los
//        `start` quedan obsoletos (con `once: true` ya no hay segunda oportunidad).
//     2. Con viewport bajo (portátil ~800px) hay más secciones fuera de pantalla
//        dependiendo de esos triggers, así que el fallo es mucho más visible que
//        en un monitor grande.
// =============================================================================
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** ¿El sistema pide movimiento reducido? (muy habitual en macOS). */
export function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/**
 * rafThrottle — Limita un manejador a como mucho una ejecución por frame.
 *
 * Los efectos de "spotlight" y "tilt 3D" escriben custom properties en cada
 * `mousemove`. El navegador puede emitir 120-1000 eventos por segundo (ratones
 * gaming, trackpads de alta frecuencia) y cada escritura invalida el estilo del
 * elemento: se recalculaban estilos muchas más veces de las que la pantalla
 * llega a pintar. Con rAF se hace UNA sola escritura por frame.
 *
 * Solo se guarda el último evento; los intermedios se descartan (para un
 * puntero, la posición más reciente es la única que importa).
 *
 * @param {(event: Event) => void} handler
 * @returns {(event: Event) => void} Manejador limitado a 1 ejecución/frame.
 */
export function rafThrottle(handler) {
  let frame = 0;
  let lastArgs = null;

  return function throttled(event) {
    // React reutiliza el objeto de evento sintético: nos quedamos con los datos
    // que necesitamos ANTES de que se limpie, no con el evento en sí.
    lastArgs = { currentTarget: event.currentTarget, clientX: event.clientX, clientY: event.clientY };

    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      handler(lastArgs);
    });
  };
}

/**
 * revealOnScroll — Aparición al hacer scroll a prueba de fallos.
 *
 * Diferencias frente a `gsap.from(...)` a pelo:
 *   · Si hay movimiento reducido no anima nada: el contenido queda visible.
 *   · `invalidateOnRefresh` recalcula el punto de partida en cada refresh.
 *   · `clearProps` no deja estilos inline pegados al terminar.
 *   · Red de seguridad: si pasados unos segundos el trigger no ha disparado
 *     (medidas obsoletas, imagen que nunca carga…), se muestra igualmente.
 *
 * @param {string|Element|Element[]} targets  Elementos a revelar.
 * @param {Object} [vars]                     Vars de GSAP.
 * @param {string|Element} [vars.trigger]     Disparador (por defecto, `targets`).
 * @param {string} [vars.start='top 88%']     Punto de disparo.
 * @returns {gsap.core.Tween|null}
 */
export function revealOnScroll(targets, { trigger, start = 'top 88%', ...vars } = {}) {
  if (prefersReducedMotion()) return null;

  const tween = gsap.from(targets, {
    ...vars,
    clearProps: 'transform,opacity',
    scrollTrigger: {
      trigger: trigger ?? targets,
      start,
      once: true,
      invalidateOnRefresh: true,
    },
  });

  // Red de seguridad: pase lo que pase, el contenido acaba visible.
  const failsafe = window.setTimeout(() => {
    if (tween.progress() === 0) tween.progress(1);
  }, 4000);
  tween.eventCallback('onComplete', () => window.clearTimeout(failsafe));

  return tween;
}

/**
 * cinematicReveal — Entrada 3D "de cine": el bloque llega desde el fondo de la
 * escena, girado sobre su eje X, y se endereza al entrar en pantalla.
 *
 * Comparte toda la robustez de `revealOnScroll` (refresh, clearProps, failsafe).
 *
 * @param {string|Element|Element[]} targets
 * @param {Object} [opts]
 * @param {number} [opts.depth=180]     Distancia en Z de la que llega (px).
 * @param {number} [opts.tilt=12]       Inclinación inicial en grados.
 * @param {number} [opts.y=64]          Desplazamiento vertical inicial.
 * @param {number} [opts.stagger=0.09]
 * @returns {gsap.core.Tween|null}
 */
export function cinematicReveal(
  targets,
  { depth = 180, tilt = 12, y = 64, stagger = 0.09, duration = 1, ...opts } = {},
) {
  return revealOnScroll(targets, {
    opacity: 0,
    y,
    z: -depth,
    rotateX: tilt,
    scale: 0.96,
    transformPerspective: 1200,
    // `center center`: el bloque llega de frente desde el fondo. Con
    // `center bottom` el giro lo hacía parecer que se hundía antes de subir.
    transformOrigin: 'center center',
    duration,
    stagger,
    ease: 'power3.out',
    ...opts,
  });
}

/**
 * parallax — Desplaza un elemento a distinta velocidad que el scroll para dar
 * sensación de profundidad de campo.
 *
 * @param {string|Element} target
 * @param {Object} [opts]
 * @param {string|Element} [opts.trigger]  Por defecto, el propio elemento.
 * @param {number} [opts.distance=14]      Recorrido en % de la altura.
 * @param {number} [opts.scale=1]          Zoom final (1 = sin zoom).
 * @returns {gsap.core.Tween|null}
 */
export function parallax(target, { trigger, distance = 14, scale = 1 } = {}) {
  if (prefersReducedMotion()) return null;

  return gsap.fromTo(
    target,
    { yPercent: -distance / 2 },
    {
      yPercent: distance / 2,
      scale,
      ease: 'none',
      scrollTrigger: {
        trigger: trigger ?? target,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        invalidateOnRefresh: true,
      },
    },
  );
}

/**
 * scrollDrift — Profundidad de campo sobre el CONTENIDO, no sobre el fondo.
 *
 * Cada elemento del grupo se desplaza a una velocidad ligeramente distinta
 * mientras la sección cruza la pantalla. El ojo lee esa diferencia como planos
 * a distinta distancia: es lo que separa una página que "aparece" de una que
 * tiene volumen.
 *
 * SOLO a partir de 1024px. En rejillas estrechas (1-2 columnas) los elementos
 * quedan lado a lado y el desfase vertical no se lee como profundidad, sino
 * como una cuadrícula rota y descuadrada.
 *
 * @param {string|Element|Element[]} targets
 * @param {Object} [opts]
 * @param {string|Element} [opts.trigger]   Sección que marca el recorrido.
 * @param {number} [opts.spread=34]         Diferencia máxima de recorrido (px).
 * @returns {gsap.MatchMedia|null}
 */
export function scrollDrift(targets, { trigger, spread = 34 } = {}) {
  if (prefersReducedMotion()) return null;

  const mm = gsap.matchMedia();

  mm.add('(min-width: 1024px)', () => {
    const items = gsap.utils.toArray(targets);
    if (!items.length) return;

    const offset = (i) => (i / Math.max(1, items.length - 1)) * spread;

    gsap.fromTo(
      items,
      // El primero baja y el último sube: el grupo se "abre" al pasar.
      { y: (i) => offset(i) },
      {
        y: (i) => -offset(i),
        ease: 'none',
        scrollTrigger: {
          trigger: trigger ?? items[0],
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
          invalidateOnRefresh: true,
        },
      },
    );
  });

  return mm;
}

/**
 * scrollExit — Salida "de plano": el bloque se aleja y se desvanece conforme
 * el usuario lo abandona hacia abajo. Evita el corte seco entre secciones.
 *
 * @param {string|Element} target
 * @param {Object} [opts]
 * @param {string|Element} [opts.trigger]
 * @param {number} [opts.scale=0.94]   Escala final.
 * @param {number} [opts.blur=0]       Desenfoque final en px (0 = sin filtro).
 * @returns {gsap.core.Tween|null}
 */
export function scrollExit(target, { trigger, scale = 0.94, blur = 0 } = {}) {
  if (prefersReducedMotion()) return null;

  return gsap.to(target, {
    opacity: 0,
    scale,
    y: -40,
    // `filter` es caro: solo se anima si se pide explícitamente.
    ...(blur ? { filter: `blur(${blur}px)` } : {}),
    ease: 'none',
    scrollTrigger: {
      trigger: trigger ?? target,
      // Arranca a media salida para que el contenido se lea entero antes.
      start: 'center top+=15%',
      end: 'bottom top+=10%',
      scrub: true,
      invalidateOnRefresh: true,
    },
  });
}

/**
 * syncScrollTriggers — Mantiene las medidas de ScrollTrigger al día.
 *
 * Se llama una sola vez al arrancar la app. Recalcula tras cargar la página,
 * las fuentes web, cada imagen (incluidas las `loading="lazy"`) y cualquier
 * cambio de altura del documento.
 *
 * @returns {() => void} Función de limpieza.
 */
export function syncScrollTriggers() {
  let timer = 0;
  let lastHeight = document.documentElement.scrollHeight;

  // Solo refrescamos si la altura del documento cambió de verdad. Un refresh
  // sin motivo reposiciona el scroll y se nota como un tirón.
  const refresh = ({ force = false } = {}) => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      const height = document.documentElement.scrollHeight;
      if (!force && Math.abs(height - lastHeight) < 2) return;
      lastHeight = height;
      ScrollTrigger.refresh();
    }, 120);
  };

  const onLoad = () => refresh({ force: true });

  window.addEventListener('load', onLoad);
  // Las imágenes no burbujean su evento `load`: hay que escuchar en captura.
  document.addEventListener('load', onLoad, true);
  document.fonts?.ready.then(onLoad);

  // La altura del documento cambia al entrar imágenes lazy o al abrir menús.
  let observer;
  if (typeof ResizeObserver !== 'undefined') {
    observer = new ResizeObserver(() => refresh());
    observer.observe(document.documentElement);
  }

  return () => {
    window.clearTimeout(timer);
    window.removeEventListener('load', onLoad);
    document.removeEventListener('load', onLoad, true);
    observer?.disconnect();
  };
}

/**
 * smoothAnchors — Desplazamiento suave para los enlaces internos (#seccion).
 *
 * Sustituye a `scroll-behavior: smooth` en CSS, que entra en conflicto con
 * `ScrollTrigger.refresh()`: el navegador animaba la restauración de scroll y
 * la página se movía sola. Aquí el scroll suave solo ocurre cuando el usuario
 * hace clic en un enlace, nunca durante un refresh.
 *
 * @returns {() => void} Función de limpieza.
 */
export function smoothAnchors() {
  const onClick = (e) => {
    const link = e.target.closest?.('a[href^="#"]');
    if (!link) return;

    const id = link.getAttribute('href');
    if (!id || id === '#') return;

    const target = document.querySelector(id);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      block: 'start',
    });
    // Mantiene la URL y el foco coherentes con la navegación nativa.
    window.history.pushState(null, '', id);
  };

  document.addEventListener('click', onClick);
  return () => document.removeEventListener('click', onClick);
}

export { gsap, ScrollTrigger, useGSAP };
