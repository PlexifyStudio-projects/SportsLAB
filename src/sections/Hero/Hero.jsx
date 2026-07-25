import { useRef } from 'react';

import Button from '@components/ui/Button/Button.jsx';
import Icon from '@components/ui/Icon/Icon.jsx';
import { TELEGRAM_URL } from '@data/navigation.js';
import { useLang } from '@/i18n/index.jsx';
import heroBg from '@assets/images/tennis-hero-1.jpg';
import bettor1 from '@assets/images/hero1.jpeg';
import bettor2 from '@assets/images/hero2.jpeg';
import bettor3 from '@assets/images/hero3.jpeg';
import bettor4 from '@assets/images/hero4.jpeg';
import { gsap, useGSAP, prefersReducedMotion } from '@utils/motion.js';
import './Hero.scss';

// Prueba social del hero: apostadores destacados de la comunidad.
const BETTORS = [
  { id: 'b1', name: 'Andrés M.', photo: bettor1 },
  { id: 'b2', name: 'Camila R.', photo: bettor2 },
  { id: 'b3', name: 'Julián T.', photo: bettor3 },
  { id: 'b4', name: 'Valeria O.', photo: bettor4 },
];

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

      // Con movimiento reducido (muy común en macOS) no animamos nada: el hero
      // se pinta directamente en su estado final.
      if (prefersReducedMotion()) return;

      // `clearProps` evita que queden `transform`/`opacity` inline pegados en el
      // hero si una animación se interrumpe (pestaña en segundo plano, etc.).
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out', clearProps: 'transform,opacity' },
      });
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

      // Salida de plano: el contenido se aleja y se desvanece al abandonar la
      // portada, en vez de cortarse de golpe contra la sección siguiente.
      gsap.to('.hero__content', {
        opacity: 0,
        y: -70,
        scale: 0.96,
        ease: 'none',
        scrollTrigger: { trigger: root, start: 'center top', end: 'bottom top', scrub: true },
      });
    },
    { scope: rootRef },
  );

  return (
    <section className="hero" id="top" ref={rootRef}>
      {/* Fondo full-bleed */}
      <div className="hero__bg" aria-hidden="true">
        {/* Elemento LCP: se descarga con prioridad alta y NUNCA en diferido.
            `width`/`height` dan al navegador la relación de aspecto antes de que
            llegue el CSS, y `decoding="async"` saca la decodificación del hilo
            principal para que no retrase el primer pintado. */}
        <img
          className="hero__bg-img"
          src={heroBg}
          alt=""
          width="1920"
          height="1281"
          fetchPriority="high"
          decoding="async"
        />
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
            <div className="hero__avatars">
              {BETTORS.map((bettor, i) => (
                <span className="hero__avatar" key={bettor.id} data-i={i + 1}>
                  <img
                    className="hero__avatar-photo"
                    src={bettor.photo}
                    alt=""
                    width="640"
                    height="640"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="hero__avatar-name">{bettor.name}</span>
                </span>
              ))}
              <span className="hero__avatar hero__avatar--count" aria-hidden="true">
                +2K
              </span>
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

          <div className="hero__leagues" aria-label={t('a11y.leagues')}>
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
        aria-label={t('a11y.telegramFloat')}
      >
        <Icon name="telegram" size={26} />
      </a>
    </section>
  );
}
