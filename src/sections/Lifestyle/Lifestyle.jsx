import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import SectionHeader from '@components/ui/SectionHeader/SectionHeader.jsx';
import Icon from '@components/ui/Icon/Icon.jsx';
import { useLang } from '@/i18n/index.jsx';

import portrait from '@assets/images/2.jpeg';
import night from '@assets/images/1.jpeg';
import patrol from '@assets/images/4.jpeg';
import drive from '@assets/images/3.jpeg';
import wheel from '@assets/images/5.jpeg';

import './Lifestyle.scss';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const REDUCE =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Tiles secundarios (la foto protagonista se renderiza aparte).
const TILES = [
  { id: 't1', src: night, icon: 'chart', labelKey: 'lifestyle.cap1', subKey: 'lifestyle.cap1Sub' },
  { id: 't2', src: drive, icon: 'target', labelKey: 'lifestyle.cap2', subKey: 'lifestyle.cap2Sub' },
  {
    id: 't3',
    src: patrol,
    icon: 'lightning',
    labelKey: 'lifestyle.cap3',
    subKey: 'lifestyle.cap3Sub',
  },
  { id: 't4', src: wheel, icon: 'medal', labelKey: 'lifestyle.cap4', subKey: 'lifestyle.cap4Sub' },
];

/** Spotlight + leve inclinación 3D que siguen al cursor (transform en el `media`). */
function onTileMove(e) {
  if (REDUCE) return;
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const px = (e.clientX - r.left) / r.width;
  const py = (e.clientY - r.top) / r.height;
  el.style.setProperty('--rx', `${(0.5 - py) * 7}deg`);
  el.style.setProperty('--ry', `${(px - 0.5) * 9}deg`);
  el.style.setProperty('--mx', `${e.clientX - r.left}px`);
  el.style.setProperty('--my', `${e.clientY - r.top}px`);
}

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
      gsap.from('.lifestyle__figure', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
        clearProps: 'transform,opacity',
        scrollTrigger: { trigger: '.lifestyle__collage', start: 'top 82%', once: true },
      });
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
              <img src={portrait} alt={t('lifestyle.founderName')} loading="lazy" />
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
                <img src={tile.src} alt={t(tile.labelKey)} loading="lazy" />
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
