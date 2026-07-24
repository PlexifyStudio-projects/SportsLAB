import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import Icon from '@components/ui/Icon/Icon.jsx';
import { useLang } from '@/i18n/index.jsx';
import './Stats.scss';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const STATS = [
  { id: 'partidos', to: 1200, prefix: '+', icon: 'chart' },
  { id: 'torneos', to: 50, prefix: '+', icon: 'target' },
  { id: 'efectividad', to: 82, suffix: '%', icon: 'medal' },
  { id: 'comunidad', stars: true, icon: 'telegram' },
];

/** Actualiza la posición del "spotlight" que sigue al cursor. */
function onCardMove(e) {
  const card = e.currentTarget;
  const r = card.getBoundingClientRect();
  card.style.setProperty('--mx', `${e.clientX - r.left}px`);
  card.style.setProperty('--my', `${e.clientY - r.top}px`);
}

/**
 * Stats — Bento grid premium: glassmorphism, borde con gradiente animado,
 * spotlight que sigue el cursor y contadores con GSAP.
 */
export default function Stats() {
  const { t } = useLang();
  const rootRef = useRef(null);

  useGSAP(
    () => {
      // Revelado escalonado del bento.
      gsap.from('.stats__cell', {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: { trigger: '.stats__bento', start: 'top 80%', once: true },
      });

      // Contadores.
      gsap.utils.toArray('.stats__num[data-to]').forEach((el) => {
        const to = Number(el.dataset.to);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: to,
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          onUpdate: () => {
            el.textContent = Math.round(obj.v).toLocaleString('es-CO');
          },
        });
      });
    },
    { scope: rootRef },
  );

  return (
    <section className="stats" ref={rootRef} aria-label="Estadísticas">
      <div className="container">
        <div className="stats__bento">
          <article
            className="stats__cell stats__cell--feature"
            onMouseMove={onCardMove}
          >
            <span className="stats__eyebrow">{t('stats.eyebrow')}</span>
            <h2 className="stats__title">
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
