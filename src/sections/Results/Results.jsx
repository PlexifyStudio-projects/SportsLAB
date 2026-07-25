import { useEffect, useRef, useState } from 'react';

import SectionHeader from '@components/ui/SectionHeader/SectionHeader.jsx';
import Icon from '@components/ui/Icon/Icon.jsx';
import { useLang } from '@/i18n/index.jsx';
import { useInView } from '@hooks/useInView.js';
import { gsap, useGSAP, cinematicReveal, rafThrottle, prefersReducedMotion } from '@utils/motion.js';

import bet1 from '@assets/images/Ganancia3.jpeg';
import bet2 from '@assets/images/Ganancia2.jpeg';
import bet3 from '@assets/images/Ganancia1.jpeg';
import bet4 from '@assets/images/15.jpeg';
import bet5 from '@assets/images/13.jpeg';

import './Results.scss';

// Capturas reales de cupones ganados, de fondo claro: se presentan como recibos
// flotando sobre el negro, no como pósters verticales.
//
// Orden de pago descendente ($2.125.200 → $260.000): el carrusel arranca en el
// primero, así que la prueba más fuerte es la que se ve al llegar.
const PROOFS = [bet1, bet2, bet3, bet4, bet5];
const N = PROOFS.length;

// Spotlight que sigue el cursor sobre la tarjeta activa, limitado a una
// escritura por frame (`rafThrottle`).
const onSlideMove = rafThrottle(({ currentTarget, clientX, clientY }) => {
  const r = currentTarget.getBoundingClientRect();
  currentTarget.style.setProperty('--mx', `${clientX - r.left}px`);
  currentTarget.style.setProperty('--my', `${clientY - r.top}px`);
});

/**
 * Results — Carrusel 3D "coverflow" de apuestas ganadas: autoplay, arrastre,
 * flechas, dots, borde animado y microinteracciones.
 */
export default function Results() {
  const { t } = useLang();
  const [active, setActive] = useState(0);
  const rootRef = useRef(null);
  const drag = useRef({ x: 0, active: false });

  const go = (dir) => setActive((a) => (a + dir + N) % N);

  useGSAP(
    () => {
      cinematicReveal('.results__carousel', {
        depth: 300,
        tilt: 14,
        y: 60,
        duration: 1.2,
        start: 'top 88%',
      });

      // La escena bascula suavemente con el scroll: al entrar se ve algo desde
      // abajo y al salir desde arriba, como una cámara que pasa por delante.
      if (!prefersReducedMotion()) {
        gsap.fromTo(
          '.results__stage',
          { rotateX: 7 },
          {
            rotateX: -5,
            ease: 'none',
            transformPerspective: 1800,
            scrollTrigger: {
              trigger: rootRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
              invalidateOnRefresh: true,
            },
          },
        );
      }
    },
    { scope: rootRef },
  );

  // Autoplay continuo mientras el carrusel se ve. Fuera de pantalla o con la
  // pestaña en segundo plano se detiene: cada avance re-renderiza 5 slides y
  // dispara transiciones 3D de 660 ms que nadie estaba mirando.
  const inView = useInView(rootRef);

  useEffect(() => {
    if (!inView) return undefined;
    const id = setInterval(() => setActive((a) => (a + 1) % N), 3800);
    return () => clearInterval(id);
  }, [inView]);

  const onPointerDown = (e) => {
    drag.current = { x: e.clientX, active: true };
  };
  const onPointerUp = (e) => {
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.x;
    if (dx > 55) go(-1);
    else if (dx < -55) go(1);
    drag.current.active = false;
  };

  return (
    <section className="results" id="resultados" ref={rootRef}>
      <div className="container">
        <SectionHeader
          align="center"
          eyebrow={t('results.eyebrow')}
          title={t('results.title')}
          subtitle={t('results.subtitle')}
        />

        <div
          className="results__carousel"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
        >
          <div className="results__stage">
            {PROOFS.map((src, i) => {
              const raw = (i - active + N) % N;
              const pos = raw > N / 2 ? raw - N : raw; // desplazamiento con signo
              const abs = Math.abs(pos);
              const isActive = pos === 0;

              return (
                <figure
                  key={src}
                  className={`results__slide ${isActive ? 'is-active' : ''}`}
                  style={{ '--pos': pos, '--abs': abs, zIndex: 10 - abs }}
                  onClick={() => !isActive && setActive(i)}
                  onMouseMove={isActive ? onSlideMove : undefined}
                  // Las capturas del fondo no deben recibir foco de teclado.
                  inert={!isActive || undefined}
                >
                  <div className="results__card">
                    <span className="results__badge">
                      <Icon name="trophy" size={14} /> {t('results.badge')}
                    </span>
                    {/* 3:2 exacto, el mismo `aspect-ratio` que fija el CSS: las
                        capturas ya no comparten proporción (las nuevas son casi
                        cuadradas) y el marco es quien manda. */}
                    <img
                      className="results__img"
                      src={src}
                      alt={t('results.alt')(i + 1, N)}
                      width="1320"
                      height="880"
                      loading="lazy"
                      decoding="async"
                      draggable="false"
                    />
                  </div>
                </figure>
              );
            })}
          </div>

          <button
            className="results__nav results__nav--prev"
            type="button"
            aria-label={t('a11y.prevProof')}
            onClick={() => go(-1)}
          >
            <Icon name="arrow-left" size={20} />
          </button>
          <button
            className="results__nav results__nav--next"
            type="button"
            aria-label={t('a11y.nextProof')}
            onClick={() => go(1)}
          >
            <Icon name="arrow-right" size={20} />
          </button>
        </div>

        {/* `role="tablist"` exigiría `role="tab"` + panel asociado en cada botón:
            como aquí solo son atajos del carrusel, un grupo con `aria-current`
            es el patrón correcto y válido. */}
        <div className="results__dots" role="group" aria-label={t('a11y.proofs')}>
          {PROOFS.map((src, i) => (
            <button
              key={src}
              type="button"
              className={`results__dot ${i === active ? 'is-active' : ''}`}
              aria-label={t('a11y.goToProof')(i + 1)}
              aria-current={i === active || undefined}
              onClick={() => setActive(i)}
            />
          ))}
        </div>

        <p className="results__note">
          <Icon name="shield" size={15} /> {t('results.note')}
        </p>
      </div>
    </section>
  );
}
