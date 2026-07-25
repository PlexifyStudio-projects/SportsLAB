import { useRef } from 'react';

import SectionHeader from '@components/ui/SectionHeader/SectionHeader.jsx';
import Icon from '@components/ui/Icon/Icon.jsx';
import { useLang } from '@/i18n/index.jsx';
import {
  useGSAP,
  cinematicReveal,
  scrollDrift,
  prefersReducedMotion,
  rafThrottle,
} from '@utils/motion.js';

import portrait from '@assets/images/2.jpeg';
import night from '@assets/images/1.jpeg';
import patrol from '@assets/images/4.jpeg';
import drive from '@assets/images/3.jpeg';
import wheel from '@assets/images/5.jpeg';

import './Lifestyle.scss';

// Tiles secundarios (la foto protagonista se renderiza aparte).
const TILES = [
  {
    id: 't1',
    src: night,
    icon: 'chart',
    labelKey: 'lifestyle.cap1',
    subKey: 'lifestyle.cap1Sub',
    altKey: 'lifestyle.cap1Alt',
  },
  {
    id: 't2',
    src: drive,
    icon: 'target',
    labelKey: 'lifestyle.cap2',
    subKey: 'lifestyle.cap2Sub',
    altKey: 'lifestyle.cap2Alt',
  },
  {
    id: 't3',
    src: patrol,
    icon: 'lightning',
    labelKey: 'lifestyle.cap3',
    subKey: 'lifestyle.cap3Sub',
    altKey: 'lifestyle.cap3Alt',
  },
  {
    id: 't4',
    src: wheel,
    icon: 'medal',
    labelKey: 'lifestyle.cap4',
    subKey: 'lifestyle.cap4Sub',
    altKey: 'lifestyle.cap4Alt',
  },
];

// Spotlight + leve inclinación 3D que siguen al cursor (transform en el `media`).
// Limitado a una escritura por frame con `rafThrottle`.
const onTileMove = rafThrottle(({ currentTarget, clientX, clientY }) => {
  if (prefersReducedMotion()) return;
  const r = currentTarget.getBoundingClientRect();
  const px = (clientX - r.left) / r.width;
  const py = (clientY - r.top) / r.height;
  currentTarget.style.setProperty('--rx', `${(0.5 - py) * 7}deg`);
  currentTarget.style.setProperty('--ry', `${(px - 0.5) * 9}deg`);
  currentTarget.style.setProperty('--mx', `${clientX - r.left}px`);
  currentTarget.style.setProperty('--my', `${clientY - r.top}px`);
});

function onTileLeave(e) {
  const el = e.currentTarget;
  el.style.setProperty('--rx', '0deg');
  el.style.setProperty('--ry', '0deg');
}

/**
 * Lifestyle — Sección aspiracional / "detrás de SportsLAB".
 * Bento editorial negro/oro con las fotos del fundador: spotlight y leve tilt 3D
 * que siguen el cursor, captions elegantes y revelado escalonado con GSAP.
 */
export default function Lifestyle() {
  const { t } = useLang();
  const rootRef = useRef(null);

  useGSAP(
    () => {
      // Revelado escalonado del bento. Anima solo opacity/y de la FIGURA;
      // el tilt vive en `.lifestyle__media` → sin conflicto de `transform`.
      cinematicReveal('.lifestyle__figure', {
        depth: 240,
        tilt: 13,
        y: 60,
        duration: 1.1,
        stagger: 0.11,
        trigger: '.lifestyle__collage',
        start: 'top 85%',
      });

      cinematicReveal('.lifestyle__quote', {
        depth: 160,
        tilt: 10,
        y: 44,
        start: 'top 90%',
      });

      // Profundidad de campo entre las fotos: al pasar el scroll, unas suben y
      // otras bajan. El collage deja de ser una rejilla plana.
      scrollDrift('.lifestyle__figure', { trigger: '.lifestyle__collage', spread: 46 });
    },
    { scope: rootRef },
  );

  return (
    <section className="lifestyle" id="estilo" ref={rootRef}>
      <span className="lifestyle__glow" aria-hidden="true" />

      <div className="container">
        <SectionHeader
          eyebrow={t('lifestyle.eyebrow')}
          title={t('lifestyle.title')}
          subtitle={t('lifestyle.subtitle')}
        />

        <div className="lifestyle__collage">
          {/* Foto protagonista */}
          <figure
            className="lifestyle__figure lifestyle__figure--feature"
            onMouseMove={onTileMove}
            onMouseLeave={onTileLeave}
          >
            <span className="lifestyle__media">
              <img
                src={portrait}
                alt={t('lifestyle.founderAlt')}
                width="1200"
                height="1600"
                loading="lazy"
                decoding="async"
              />
            </span>
            <figcaption className="lifestyle__caption lifestyle__caption--feature">
              <span className="lifestyle__tag">
                <span className="lifestyle__tag-dot" aria-hidden="true" />
                {t('lifestyle.founderRole')}
              </span>
              <span className="lifestyle__caption-name">{t('lifestyle.founderName')}</span>
            </figcaption>
          </figure>

          {/* Tiles secundarios */}
          {TILES.map((tile) => (
            <figure
              className="lifestyle__figure"
              key={tile.id}
              onMouseMove={onTileMove}
              onMouseLeave={onTileLeave}
            >
              <span className="lifestyle__media">
                <img
                  src={tile.src}
                  alt={t(tile.altKey)}
                  width="1200"
                  height="1600"
                  loading="lazy"
                  decoding="async"
                />
              </span>
              <figcaption className="lifestyle__caption">
                <span className="lifestyle__caption-icon">
                  <Icon name={tile.icon} size={16} />
                </span>
                <span className="lifestyle__caption-body">
                  <span className="lifestyle__caption-label">{t(tile.labelKey)}</span>
                  <span className="lifestyle__caption-sub">{t(tile.subKey)}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        <blockquote className="lifestyle__quote">
          <span className="lifestyle__quote-mark" aria-hidden="true">
            &ldquo;
          </span>
          <p className="lifestyle__quote-text">{t('lifestyle.quote')}</p>
          <cite className="lifestyle__quote-cite">{t('lifestyle.cite')}</cite>
        </blockquote>
      </div>
    </section>
  );
}
