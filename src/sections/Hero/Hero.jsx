import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import Button from '@components/ui/Button/Button.jsx';
import Icon from '@components/ui/Icon/Icon.jsx';
import { TELEGRAM_URL } from '@data/navigation.js';
import { useLang } from '@/i18n/index.jsx';
import heroBg from '@assets/images/tennis-hero-1.jpg';
import './Hero.scss';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const CARDS = [
  { id: 'canal', icon: 'telegram', labelKey: 'hero.cardCanal', valueKey: 'hero.cardCanalV' },
  { id: 'torneos', icon: 'target', labelKey: 'hero.cardTorneos', value: '+50' },
  { id: 'enfoque', icon: 'shield', labelKey: 'hero.cardAnalisis', valueKey: 'hero.cardAnalisisV' },
];

/**
 * Hero — Portada cinematográfica full-bleed: foto de fondo con veladura,
 * titular gigante, CTAs y tarjetas glass flotantes.
 */
export default function Hero() {
  const { t } = useLang();
  const rootRef = useRef(null);

  useGSAP(
    () => {
      const root = rootRef.current;

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.hero__pill', { y: 16, opacity: 0, duration: 0.5 })
        .from('.hero__line-inner', { yPercent: 118, duration: 0.9, stagger: 0.12 }, '-=0.2')
        .from('.hero__underline', { scaleX: 0, duration: 0.7, ease: 'power3.inOut' }, '-=0.4')
        .from('.hero__subtitle', { y: 18, opacity: 0, duration: 0.5 }, '-=0.45')
        .from('.hero__social', { y: 16, opacity: 0, duration: 0.5 }, '-=0.35')
        .from('.hero__actions > *', { y: 18, opacity: 0, stagger: 0.1, duration: 0.5 }, '-=0.3')
        .from('.hero__badge', { y: 12, opacity: 0, stagger: 0.07, duration: 0.4 }, '-=0.3')
        .from('.hero__leagues > *', { y: 10, opacity: 0, stagger: 0.05, duration: 0.35 }, '-=0.3')
        .from('.hero__card', { x: 40, opacity: 0, stagger: 0.12, duration: 0.6 }, '-=0.7')
        .from('.hero__float', { scale: 0, opacity: 0, duration: 0.5, ease: 'back.out(1.7)' }, '-=0.2');

      // Parallax al hacer scroll.
      gsap.to('.hero__bg-img', {
        yPercent: 12,
        scale: 1.12,
        ease: 'none',
        scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.to('.hero__cards', {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: true },
      });
    },
    { scope: rootRef },
  );

  return (
    <section className="hero" id="top" ref={rootRef}>
      {/* Fondo full-bleed */}
      <div className="hero__bg" aria-hidden="true">
        <img className="hero__bg-img" src={heroBg} alt="" />
        <div className="hero__bg-overlay" />
        <div className="hero__bg-grain" />
      </div>

      <div className="container hero__inner">
        <div className="hero__content">
          <span className="hero__pill">
            <span className="hero__pill-dot" />
            {t('hero.pill')}
          </span>

          <h1 className="hero__title">
            <span className="hero__line">
              <span className="hero__line-inner">{t('hero.title1')}</span>
            </span>
            <span className="hero__line">
              <span className="hero__line-inner">{t('hero.title2')}</span>
            </span>
            <span className="hero__line">
              <span className="hero__line-inner hero__line-inner--accent">
                {t('hero.title3')}
                <span className="hero__underline" aria-hidden="true" />
              </span>
            </span>
          </h1>

          <p className="hero__subtitle">{t('hero.subtitle')}</p>

          <div className="hero__social">
            <div className="hero__avatars" aria-hidden="true">
              <span className="hero__avatar" data-i="1" />
              <span className="hero__avatar" data-i="2" />
              <span className="hero__avatar" data-i="3" />
              <span className="hero__avatar" data-i="4" />
              <span className="hero__avatar hero__avatar--count">+2K</span>
            </div>
            <div className="hero__rating">
              <span className="hero__stars">★★★★★</span>
              <span className="hero__rating-text">
                <strong>4.9/5</strong> · {t('hero.rating')}
              </span>
            </div>
          </div>

          <div className="hero__actions">
            <Button as="a" href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" size="lg">
              <Icon name="telegram" size={20} />
              {t('hero.join')}
            </Button>
            <Button as="a" href="#como-funciona" variant="secondary" size="lg">
              {t('hero.how')}
            </Button>
          </div>

          <ul className="hero__badges">
            <li className="hero__badge">
              <Icon name="chart" size={16} /> {t('hero.badge1')}
            </li>
            <li className="hero__badge">
              <Icon name="lightning" size={16} /> {t('hero.badge2')}
            </li>
            <li className="hero__badge">
              <Icon name="target" size={16} /> {t('hero.badge3')}
            </li>
          </ul>

          <div className="hero__leagues" aria-label="Torneos que cubrimos">
            <span className="hero__leagues-label">{t('hero.covers')}</span>
            <span className="hero__league">ATP</span>
            <span className="hero__league">WTA</span>
            <span className="hero__league">Grand Slams</span>
            <span className="hero__league">Masters 1000</span>
          </div>
        </div>

        {/* Tarjetas glass flotantes */}
        <div className="hero__cards">
          {CARDS.map((card) => (
            <div className="hero__card" key={card.id}>
              <span className="hero__card-icon">
                <Icon name={card.icon} size={22} />
              </span>
              <span className="hero__card-info">
                <span className="hero__card-label">{t(card.labelKey)}</span>
                <span className="hero__card-value">
                  {card.valueKey ? t(card.valueKey) : card.value}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Botón flotante de Telegram */}
      <a
        className="hero__float"
        href={TELEGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Únete al canal de Telegram"
      >
        <Icon name="telegram" size={26} />
      </a>
    </section>
  );
}
