import Button from '@components/ui/Button/Button.jsx';
import Icon from '@components/ui/Icon/Icon.jsx';
import { TELEGRAM_URL } from '@data/navigation.js';
import { useLang } from '@/i18n/index.jsx';
import ctaBg from '@assets/images/tennis-hero-3.jpg';
import './CtaBanner.scss';

/**
 * CtaBanner — Oferta exclusiva (20% de descuento VIP) antes del footer.
 */
export default function CtaBanner() {
  const { t } = useLang();

  return (
    <section className="cta-banner" id="registro">
      <div className="container">
        <div className="cta-banner__inner">
          <div className="cta-banner__bg" aria-hidden="true">
            <img className="cta-banner__bg-img" src={ctaBg} alt="" loading="lazy" />
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
            <Button as="a" href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" variant="accent" size="lg">
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
