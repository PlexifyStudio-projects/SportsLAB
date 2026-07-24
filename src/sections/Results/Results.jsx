import { useEffect, useRef, useState } from 'react';

import SectionHeader from '@components/ui/SectionHeader/SectionHeader.jsx';
import Icon from '@components/ui/Icon/Icon.jsx';
import { useLang } from '@/i18n/index.jsx';

import bet1 from '@assets/images/6.jpeg';
import bet2 from '@assets/images/7.jpeg';
import bet3 from '@assets/images/8.jpeg';
import bet4 from '@assets/images/9.jpeg';
import bet5 from '@assets/images/10.jpeg';

import './Results.scss';

const PROOFS = [bet1, bet2, bet3, bet4, bet5];
const N = PROOFS.length;

/** Spotlight que sigue el cursor sobre la tarjeta activa. */
function onSlideMove(e) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty('--mx', `${e.clientX - r.left}px`);
  el.style.setProperty('--my', `${e.clientY - r.top}px`);
}

/**
 * Results — Carrusel 3D "coverflow" de apuestas ganadas: autoplay, arrastre,
 * flechas, dots, borde animado y microinteracciones.
 */
export default function Results() {
  const { t } = useLang();
  const [active, setActive] = useState(0);
  const drag = useRef({ x: 0, active: false });

  const go = (dir) => setActive((a) => (a + dir + N) % N);

  // Autoplay continuo (el carrusel siempre se mueve).
  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % N), 3800);
    return () => clearInterval(id);
  }, []);

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
    <section className="results" id="resultados">
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
                  style={{ '--pos': pos, '--abs': abs, '--i': i, zIndex: 10 - abs }}
                  onClick={() => !isActive && setActive(i)}
                  onMouseMove={isActive ? onSlideMove : undefined}
                >
                  <div className="results__card">
                    <span className="results__badge">
                      <Icon name="trophy" size={14} /> {t('results.badge')}
                    </span>
                    <img
                      className="results__img"
                      src={src}
                      alt={`Apuesta ganada ${i + 1}`}
                      loading="lazy"
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
            aria-label="Anterior"
            onClick={() => go(-1)}
          >
            <Icon name="arrow-left" size={20} />
          </button>
          <button
            className="results__nav results__nav--next"
            type="button"
            aria-label="Siguiente"
            onClick={() => go(1)}
          >
            <Icon name="arrow-right" size={20} />
          </button>
        </div>

        <div className="results__dots" role="tablist" aria-label="Apuestas ganadas">
          {PROOFS.map((src, i) => (
            <button
              key={src}
              type="button"
              className={`results__dot ${i === active ? 'is-active' : ''}`}
              aria-label={`Ir a la apuesta ${i + 1}`}
              aria-selected={i === active}
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
