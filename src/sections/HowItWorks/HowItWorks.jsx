import { useRef } from 'react';

import SectionHeader from '@components/ui/SectionHeader/SectionHeader.jsx';
import Icon from '@components/ui/Icon/Icon.jsx';
import Button from '@components/ui/Button/Button.jsx';
import { HOW_IT_WORKS } from '@data/howItWorks.js';
import { TELEGRAM_URL } from '@data/navigation.js';
import { useLang } from '@/i18n/index.jsx';
import courtBg from '@assets/images/tennis-court-fence.jpg';
import { gsap, useGSAP, cinematicReveal, parallax, prefersReducedMotion } from '@utils/motion.js';
import './HowItWorks.scss';

/**
 * HowItWorks — Timeline interactiva: la línea de progreso se dibuja al hacer
 * scroll, los pasos aparecen animados y reaccionan al hover.
 */
export default function HowItWorks() {
  const { t } = useLang();
  const rootRef = useRef(null);

  useGSAP(
    () => {
      // Aparición 3D escalonada de los pasos.
      cinematicReveal('.how__step', {
        depth: 200,
        tilt: 16,
        y: 50,
        stagger: 0.14,
        trigger: '.how__timeline',
        start: 'top 85%',
      });

      // Profundidad de campo: el fondo de pista se mueve más lento que el texto.
      parallax('.how__bg-img', { trigger: rootRef.current, distance: 16, scale: 1.14 });

      // Sin `scrollDrift` en los pasos: van alineados con la línea de progreso
      // horizontal, y desplazarlos en vertical los descuadraba respecto a ella.

      // La línea de progreso se "dibuja" según el scroll.
      const mm = gsap.matchMedia();
      mm.add('(min-width: 1024px)', () => {
        // Con movimiento reducido la línea se muestra completa, sin scrub.
        if (prefersReducedMotion()) {
          gsap.set('.how__track-fill', { scaleX: 1 });
          return;
        }

        gsap.fromTo(
          '.how__track-fill',
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: '.how__timeline',
              start: 'top 75%',
              end: 'bottom 62%',
              scrub: true,
              invalidateOnRefresh: true,
            },
          },
        );
      });

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <section className="how" id="como-funciona" ref={rootRef}>
      <div className="how__bg" aria-hidden="true">
        <img
          className="how__bg-img"
          src={courtBg}
          alt=""
          width="1920"
          height="1280"
          loading="lazy"
          decoding="async"
        />
        <span className="how__bg-veil" />
      </div>

      <div className="container">
        <SectionHeader
          align="center"
          eyebrow={t('how.eyebrow')}
          title={t('how.title')}
          subtitle={t('how.subtitle')}
        />

        <ol className="how__timeline">
          <span className="how__track" aria-hidden="true">
            <span className="how__track-fill" />
          </span>

          {HOW_IT_WORKS.map((step, i) => (
            <li className="how__step" key={step.id}>
              <span className="how__node">
                <span className="how__ring" aria-hidden="true" />
                <span className="how__icon">
                  <Icon name={step.icon} size={22} />
                </span>
                <span className="how__step-num">{step.step}</span>
              </span>
              <div className="how__body">
                <h3 className="how__step-title">{t(`how.s${i + 1}`)}</h3>
                <p className="how__step-text">{t(`how.s${i + 1}d`)}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="how__cta">
          <Button as="a" href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" size="lg">
            <Icon name="telegram" size={20} />
            {t('how.cta')}
            <Icon name="arrow-right" size={18} />
          </Button>
        </div>
      </div>
    </section>
  );
}
