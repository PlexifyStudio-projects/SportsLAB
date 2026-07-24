import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import SectionHeader from '@components/ui/SectionHeader/SectionHeader.jsx';
import Icon from '@components/ui/Icon/Icon.jsx';
import { FEATURES } from '@data/features.js';
import { useLang } from '@/i18n/index.jsx';
import './Features.scss';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const REDUCE =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Inclinación 3D + spotlight que siguen al cursor. */
function onCardMove(e) {
  if (REDUCE) return;
  const card = e.currentTarget;
  const r = card.getBoundingClientRect();
  const px = (e.clientX - r.left) / r.width;
  const py = (e.clientY - r.top) / r.height;
  card.style.setProperty('--rx', `${(0.5 - py) * 10}deg`);
  card.style.setProperty('--ry', `${(px - 0.5) * 12}deg`);
  card.style.setProperty('--mx', `${e.clientX - r.left}px`);
  card.style.setProperty('--my', `${e.clientY - r.top}px`);
}

function onCardLeave(e) {
  const card = e.currentTarget;
  card.style.setProperty('--rx', '0deg');
  card.style.setProperty('--ry', '0deg');
}

/**
 * Features — Razones para elegir SportsLAB, con cards que se inclinan en 3D
 * siguiendo el cursor (parallax táctil), icono en profundidad y spotlight.
 */
export default function Features() {
  const { t } = useLang();
  const rootRef = useRef(null);

  useGSAP(
    () => {
      gsap.from('.features__inner', {
        y: 42,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.1,
        clearProps: 'transform,opacity',
        scrollTrigger: { trigger: '.features__grid', start: 'top 80%', once: true },
      });
    },
    { scope: rootRef },
  );

  return (
    <section className="features" id="ventajas" ref={rootRef}>
      <span className="features__glow" aria-hidden="true" />

      <div className="container">
        <SectionHeader
          align="center"
          eyebrow={t('features.eyebrow')}
          title={t('features.title')}
          subtitle={t('features.subtitle')}
        />

        <ul className="features__grid">
          {FEATURES.map((feature) => (
            <li
              className="features__card"
              key={feature.id}
              onMouseMove={onCardMove}
              onMouseLeave={onCardLeave}
            >
              <div className="features__inner">
                <span className="features__icon">
                  <Icon name={feature.icon} size={26} />
                </span>
                <h3 className="features__card-title">{t(`features.${feature.id}`)}</h3>
                <p className="features__card-desc">{t(`features.${feature.id}D`)}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
