import { useRef } from 'react';

import Icon from '@components/ui/Icon/Icon.jsx';
import { useLang } from '@/i18n/index.jsx';
import { gsap, useGSAP, prefersReducedMotion, rafThrottle } from '@utils/motion.js';
import './Stats.scss';

const STATS = [
  { id: 'partidos', to: 1200, prefix: '+', icon: 'chart' },
  { id: 'torneos', to: 50, prefix: '+', icon: 'target' },
  { id: 'efectividad', to: 82, suffix: '%', icon: 'medal' },
  { id: 'comunidad', stars: true, icon: 'telegram' },
];

// Actualiza la posición del "spotlight" que sigue al cursor, como mucho una vez
// por frame (`rafThrottle`).
const onCardMove = rafThrottle(({ currentTarget, clientX, clientY }) => {
  const r = currentTarget.getBoundingClientRect();
  currentTarget.style.setProperty('--mx', `${clientX - r.left}px`);
  currentTarget.style.setProperty('--my', `${clientY - r.top}px`);
});

/**
 * Stats — Bento grid premium: glassmorphism, borde con gradiente animado,
 * spotlight que sigue el cursor y contadores con GSAP.
 */
export default function Stats() {
  const { t } = useLang();
  const rootRef = useRef(null);

  // Stats entra JUNTO AL HERO, al cargar la página, no al hacer scroll.
  // Va inmediatamente debajo del hero, así que casi siempre ya está a la vista:
  // un ScrollTrigger aquí solo aportaba el tirón de reposicionar el scroll.
  useGSAP(
    () => {
      const counters = gsap.utils.toArray('.stats__num[data-to]');
      const render = (el, v) => {
        el.textContent = Math.round(v).toLocaleString('es-CO');
      };

      // Sin animación: bento visible y cifras en su valor final.
      if (prefersReducedMotion()) {
        counters.forEach((el) => render(el, Number(el.dataset.to)));
        return;
      }

      const tl = gsap.timeline({ delay: 0.35 });

      // Revelado 3D escalonado del bento: las celdas llegan desde el fondo.
      tl.from('.stats__cell', {
        opacity: 0,
        y: 56,
        z: -220,
        rotateX: 14,
        scale: 0.96,
        transformPerspective: 1200,
        transformOrigin: 'center center',
        duration: 1,
        stagger: 0.09,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
      });

      // Contadores, arrancando con el revelado ya en marcha.
      counters.forEach((el) => {
        const obj = { v: 0 };
        tl.to(
          obj,
          {
            v: Number(el.dataset.to),
            duration: 1.6,
            ease: 'power2.out',
            onUpdate: () => render(el, obj.v),
          },
          '<0.1',
        );
      });

      // Sin `scrollDrift`: el bento tiene una celda destacada que ocupa 2x2 y
      // desplazar las demás en vertical rompía la retícula.
    },
    { scope: rootRef },
  );

  // La sección se nombra con su propio h2 (`aria-labelledby`) en vez de con un
  // `aria-label` fijo en español: así el nombre accesible sigue al idioma.
  return (
    <section className="stats" ref={rootRef} aria-labelledby="stats-titulo">
      <div className="container">
        <div className="stats__bento">
          <article
            className="stats__cell stats__cell--feature"
            onMouseMove={onCardMove}
          >
            <span className="stats__eyebrow">{t('stats.eyebrow')}</span>
            <h2 className="stats__title" id="stats-titulo">
              {t('stats.title')} <span className="stats__hl">{t('stats.titleHl')}</span>
            </h2>
            <p className="stats__text">{t('stats.text')}</p>
            <span className="stats__feature-tag">
              <Icon name="shield" size={15} /> {t('stats.tag')}
            </span>
          </article>

          {STATS.map((stat) => (
            <article className="stats__cell" key={stat.id} onMouseMove={onCardMove}>
              <div className="stats__head">
                <span className="stats__icon">
                  <Icon name={stat.icon} size={20} />
                </span>
              </div>
              <span className="stats__value">
                {stat.stars ? (
                  <span className="stats__stars">★★★★★</span>
                ) : (
                  <>
                    {stat.prefix && <span className="stats__affix">{stat.prefix}</span>}
                    <span className="stats__num" data-to={stat.to}>
                      0
                    </span>
                    {stat.suffix && <span className="stats__affix">{stat.suffix}</span>}
                  </>
                )}
              </span>
              <span className="stats__label">{t(`stats.${stat.id}`)}</span>
              <span className="stats__detail">{t(`stats.${stat.id}D`)}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
