import { useEffect, useMemo, useRef } from 'react';

import SectionHeader from '@components/ui/SectionHeader/SectionHeader.jsx';
import { LIVE_MATCHES } from '@data/matches.js';
import { useLiveOdds } from '@hooks/useLiveOdds.js';
import { useInView } from '@hooks/useInView.js';
import { useLang } from '@/i18n/index.jsx';
import { gsap, useGSAP, prefersReducedMotion } from '@utils/motion.js';
import MatchCard from './MatchCard/MatchCard.jsx';
import './LiveMatches.scss';

/**
 * LiveMatches — Tablero en directo: 25 partidos desfilando de lado a lado
 * (marquee edge-to-edge) con las cuotas moviéndose en tiempo real.
 */
export default function LiveMatches() {
  const { t } = useLang();
  const rootRef = useRef(null);
  const trackRef = useRef(null);
  // Con la sección fuera de pantalla (o la pestaña en segundo plano) no tiene
  // sentido simular cuotas ni mover el marquee: se congela todo.
  const inView = useInView(rootRef);
  const matches = useLiveOdds(LIVE_MATCHES, { interval: 2600, active: inView });

  // Duplicamos la lista para cerrar el bucle. `useMemo` evita crear un array
  // nuevo (y por tanto recorrer 50 elementos) en renders que no tocan cuotas.
  const loop = useMemo(() => [...matches, ...matches], [matches]);

  // Desfile continuo. La lista está duplicada, así que recorrer el 50% y volver
  // a 0 es un bucle sin costura. Se pausa al pasar el cursor.
  const tweenRef = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const tween = gsap.to(trackRef.current, {
        xPercent: -50,
        duration: 90,
        ease: 'none',
        repeat: -1,
      });
      tweenRef.current = tween;

      const marquee = rootRef.current.querySelector('.live-matches__marquee');
      const pause = () => tween.timeScale(0.15);
      const resume = () => tween.timeScale(1);
      marquee.addEventListener('pointerenter', pause);
      marquee.addEventListener('pointerleave', resume);

      return () => {
        tweenRef.current = null;
        marquee.removeEventListener('pointerenter', pause);
        marquee.removeEventListener('pointerleave', resume);
      };
    },
    { scope: rootRef },
  );

  // Congela el desfile cuando no se ve. Un tween de GSAP pausado no consume
  // ningún frame; antes seguía animando una capa de ~16.000 px de ancho.
  useEffect(() => {
    const tween = tweenRef.current;
    if (!tween) return;
    if (inView) tween.play();
    else tween.pause();
  }, [inView]);

  return (
    <section className="live-matches" id="en-vivo" ref={rootRef}>
      <div className="container">
        <SectionHeader
          eyebrow={t('live.eyebrow')}
          title={t('live.title')}
          subtitle={t('live.subtitle')}
        />
      </div>

      <div className="live-matches__marquee" role="group" aria-label={t('a11y.liveBoard')}>
        <ul className="live-matches__track" ref={trackRef}>
          {loop.map((match, i) => {
            // La segunda mitad es el clon que cierra el bucle: se oculta a los
            // lectores de pantalla y con `inert` tampoco recibe foco de teclado
            // (un aria-hidden con botones focusables es un error de a11y).
            const isClone = i >= matches.length;
            return (
              <li
                className="live-matches__item"
                key={`${match.id}-${i}`}
                aria-hidden={isClone || undefined}
                inert={isClone || undefined}
              >
                <MatchCard match={match} />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
