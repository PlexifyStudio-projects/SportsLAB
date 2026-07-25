import { useRef } from 'react';

import { useGSAP, cinematicReveal } from '@utils/motion.js';
import './SectionHeader.scss';

/**
 * SectionHeader — Encabezado estándar de sección (BEM: `section-header`).
 *
 * Entra con la misma animación 3D que el resto de la página: cada línea llega
 * desde el fondo de la escena y se endereza al aparecer.
 *
 * @param {Object} props
 * @param {string} [props.eyebrow]   Texto superior pequeño.
 * @param {string} props.title
 * @param {string} [props.subtitle]
 * @param {'left'|'center'} [props.align='left']
 */
export default function SectionHeader({ eyebrow, title, subtitle, align = 'left' }) {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      cinematicReveal('.section-header__line', {
        depth: 140,
        tilt: 16,
        y: 40,
        stagger: 0.08,
        duration: 0.9,
        trigger: rootRef.current,
      });
    },
    { scope: rootRef },
  );

  return (
    <header className={`section-header section-header--${align}`} ref={rootRef}>
      {eyebrow && (
        <p className="section-header__eyebrow section-header__line">
          <span className="section-header__eyebrow-rule" aria-hidden="true" />
          {eyebrow}
        </p>
      )}
      <h2 className="section-header__title section-header__line">{title}</h2>
      {subtitle && <p className="section-header__subtitle section-header__line">{subtitle}</p>}
    </header>
  );
}
