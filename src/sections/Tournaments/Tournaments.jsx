import { useRef } from 'react';

import SectionHeader from '@components/ui/SectionHeader/SectionHeader.jsx';
import Icon from '@components/ui/Icon/Icon.jsx';
import { TOURNAMENTS } from '@data/tournaments.js';
import { useLang } from '@/i18n/index.jsx';
import courtBg from '@assets/images/tennis-court-night.jpg';
import { useGSAP, cinematicReveal, parallax, scrollDrift } from '@utils/motion.js';
import './Tournaments.scss';

/**
 * Tournaments — Categorías de torneos de tenis cubiertas.
 */
export default function Tournaments() {
  const { t } = useLang();
  const rootRef = useRef(null);

  useGSAP(
    () => {
      cinematicReveal('.tournaments__item', {
        depth: 220,
        tilt: 14,
        y: 54,
        stagger: 0.07,
        trigger: '.tournaments__grid',
        start: 'top 85%',
      });

      parallax('.tournaments__bg-img', { trigger: rootRef.current, distance: 18, scale: 1.16 });

      // Los cinco torneos avanzan a distinta velocidad: la fila deja de leerse
      // como un bloque rígido y gana profundidad al hacer scroll.
      scrollDrift('.tournaments__item', { trigger: '.tournaments__grid', spread: 40 });
    },
    { scope: rootRef },
  );

  return (
    <section className="tournaments" id="torneos" ref={rootRef}>
      <div className="tournaments__bg" aria-hidden="true">
        <img
          className="tournaments__bg-img"
          src={courtBg}
          alt=""
          width="1280"
          height="1600"
          loading="lazy"
          decoding="async"
        />
        <span className="tournaments__bg-veil" />
      </div>

      <div className="container">
        <SectionHeader
          eyebrow={t('tournaments.eyebrow')}
          title={t('tournaments.title')}
          subtitle={t('tournaments.subtitle')}
        />

        <ul className="tournaments__grid">
          {TOURNAMENTS.map((tournament) => (
            // La tarjeta era un `<a href="#torneos">` que apuntaba a su propia
            // sección: un enlace sin destino real que no aporta nada al rastreo.
            // Ahora es contenido plano con el nombre del torneo como <h3>, que
            // sí da estructura semántica bajo el <h2> de la sección.
            <li className="tournaments__item" key={tournament.id}>
              <div className="tournaments__card">
                <span className="tournaments__icon">
                  <Icon name={tournament.icon} size={26} />
                </span>
                <h3 className="tournaments__name">{tournament.name}</h3>
                <p className="tournaments__desc">{t(`tournaments.${tournament.id}`)}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
