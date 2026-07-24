import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import SectionHeader from '@components/ui/SectionHeader/SectionHeader.jsx';
import Icon from '@components/ui/Icon/Icon.jsx';
import Button from '@components/ui/Button/Button.jsx';
import { HOW_IT_WORKS } from '@data/howItWorks.js';
import { TELEGRAM_URL } from '@data/navigation.js';
import { useLang } from '@/i18n/index.jsx';
import courtBg from '@assets/images/tennis-court-fence.jpg';
import './HowItWorks.scss';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * HowItWorks — Timeline interactiva: la línea de progreso se dibuja al hacer
 * scroll, los pasos aparecen animados y reaccionan al hover.
 */
export default function HowItWorks() {
  const { t } = useLang();
  const rootRef = useRef(null);

  useGSAP(
    () => {
      // Aparición escalonada de los pasos.
      gsap.from('.how__step', {
        y: 34,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.14,
        scrollTrigger: { trigger: '.how__timeline', start: 'top 78%', once: true },
      });

      // La línea de progreso se "dibuja" según el scroll.
      const mm = gsap.matchMedia();
      mm.add('(min-width: 1024px)', () => {
        gsap.fromTo(
          '.how__track-fill',
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: '.how__timeline',
              start: 'top 68%',
              end: 'bottom 62%',
              scrub: true,
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
        <img className="how__bg-img" src={courtBg} alt="" loading="lazy" />
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
