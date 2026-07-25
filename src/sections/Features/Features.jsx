import { useRef } from 'react';

import SectionHeader from '@components/ui/SectionHeader/SectionHeader.jsx';
import Icon from '@components/ui/Icon/Icon.jsx';
import { FEATURES } from '@data/features.js';
import { useLang } from '@/i18n/index.jsx';
import { useGSAP, cinematicReveal, prefersReducedMotion, rafThrottle } from '@utils/motion.js';
import './Features.scss';

// Inclinación 3D + spotlight que siguen al cursor. Limitado a una escritura por
// frame: un `mousemove` sin throttling dispara cientos de recálculos de estilo
// por segundo para pintar, como mucho, 60 frames.
const onCardMove = rafThrottle(({ currentTarget, clientX, clientY }) => {
  if (prefersReducedMotion()) return;
  const r = currentTarget.getBoundingClientRect();
  const px = (clientX - r.left) / r.width;
  const py = (clientY - r.top) / r.height;
  currentTarget.style.setProperty('--rx', `${(0.5 - py) * 10}deg`);
  currentTarget.style.setProperty('--ry', `${(px - 0.5) * 12}deg`);
  currentTarget.style.setProperty('--mx', `${clientX - r.left}px`);
  currentTarget.style.setProperty('--my', `${clientY - r.top}px`);
});

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
      cinematicReveal('.features__inner', {
        depth: 200,
        tilt: 15,
        y: 58,
        stagger: 0.1,
        trigger: '.features__grid',
        start: 'top 85%',
      });

      // Sin `scrollDrift`: igual que en Torneos, son tarjetas iguales en rejilla
      // y el desfase vertical se ve como desalineación, no como profundidad.
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
