import { useRef } from 'react';

import Button from '@components/ui/Button/Button.jsx';
import Icon from '@components/ui/Icon/Icon.jsx';
import { TELEGRAM_VIP_URL } from '@data/navigation.js';
import { useLang } from '@/i18n/index.jsx';
import ctaBg from '@assets/images/tennis-hero-3.jpg';
import vipBadge from '@assets/images/VIPs.jpg';
import { useGSAP, cinematicReveal, parallax } from '@utils/motion.js';
import './CtaBanner.scss';

/**
 * CtaBanner — Oferta exclusiva (20% de descuento VIP) antes del footer.
 */
export default function CtaBanner() {
  const { t } = useLang();
  const rootRef = useRef(null);

  useGSAP(
    () => {
      cinematicReveal('.cta-banner__inner', {
        depth: 280,
        tilt: 12,
        y: 56,
        duration: 1.1,
        start: 'top 88%',
      });

      parallax('.cta-banner__bg-img', { trigger: rootRef.current, distance: 20, scale: 1.18 });
    },
    { scope: rootRef },
  );

  return (
    <section className="cta-banner" id="registro" ref={rootRef}>
      <div className="container">
        <div className="cta-banner__inner">
          <div className="cta-banner__bg" aria-hidden="true">
            <img
              className="cta-banner__bg-img"
              src={ctaBg}
              alt=""
              width="1280"
              height="1920"
              loading="lazy"
              decoding="async"
            />
            <span className="cta-banner__bg-veil" />
          </div>

          <div className="cta-banner__text">
            <span className="cta-banner__eyebrow">
              <Icon name="gift" size={16} /> {t('cta.eyebrow')}
            </span>
            <h2 className="cta-banner__title">
              {t('cta.title1')} <span className="cta-banner__hl">{t('cta.titleHl')}</span>{' '}
              {t('cta.title2')}
            </h2>
            <p className="cta-banner__subtitle">{t('cta.subtitle')}</p>
          </div>

          <div className="cta-banner__actions">
            <img
              className="cta-banner__badge"
              src={vipBadge}
              alt="AbrahamSportsLAB VIP Members"
              width="320"
              height="320"
              loading="lazy"
              decoding="async"
            />
            <Button as="a" href={TELEGRAM_VIP_URL} target="_blank" rel="noopener noreferrer" variant="accent" size="lg">
              <Icon name="telegram" size={20} />
              {t('cta.button')}
            </Button>
            <p className="cta-banner__legal">
              <Icon name="shield" size={14} /> {t('cta.legal')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
