import Button from '@components/ui/Button/Button.jsx';
import Icon from '@components/ui/Icon/Icon.jsx';
import { TELEGRAM_URL } from '@data/navigation.js';
import { useLang } from '@/i18n/index.jsx';
import './MobileCta.scss';

/**
 * MobileCta — Barra de acción fija en la parte inferior, SOLO visible en móvil.
 */
export default function MobileCta() {
  const { t } = useLang();

  return (
    <div className="mobile-cta" role="region" aria-label="Acciones rápidas">
      <Button as="a" href="#como-funciona" variant="secondary" className="mobile-cta__button">
        {t('mobile.how')}
      </Button>
      <Button
        as="a"
        href={TELEGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mobile-cta__button"
      >
        <Icon name="telegram" size={18} />
        {t('mobile.join')}
      </Button>
    </div>
  );
}
