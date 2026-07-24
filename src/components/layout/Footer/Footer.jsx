import { TELEGRAM_URL } from '@data/navigation.js';
import { useLang } from '@/i18n/index.jsx';
import logo from '@assets/images/Logo.jpeg';
import './Footer.scss';

const MIN_AGE = import.meta.env.VITE_MIN_AGE ?? '18';

const COLUMNS = [
  { id: 'product', links: 'productLinks' },
  { id: 'company', links: 'companyLinks' },
  { id: 'support', links: 'supportLinks' },
  { id: 'legal', title: 'legalTitle', links: 'legalLinks' },
];

const SOCIALS = [
  {
    id: 'facebook',
    label: 'Facebook',
    href: '#',
    brand: '#1877F2',
    path: 'M13.5 21v-6.5h2.2l.33-2.56H13.5V10.3c0-.74.2-1.25 1.27-1.25h1.36V6.76c-.24-.03-1.04-.1-1.98-.1-1.96 0-3.3 1.2-3.3 3.4v1.87H8.6v2.57h2.25V21h2.65Z',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    href: '#',
    brand: '#E1306C',
    gradient: true,
    path: 'M8 3h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm4 3.5A3.5 3.5 0 1 1 8.5 12 3.5 3.5 0 0 1 12 8.5Zm0 2A1.5 1.5 0 1 0 13.5 12 1.5 1.5 0 0 0 12 10.5ZM17 6.3a1.05 1.05 0 1 1-1.05 1.05A1.05 1.05 0 0 1 17 6.3Z',
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    href: 'https://wa.me/',
    brand: '#25D366',
    path: 'M12 3a9 9 0 0 0-7.7 13.65L3 21l4.5-1.28A9 9 0 1 0 12 3Zm0 16.3a7.3 7.3 0 0 1-3.72-1.02l-.27-.16-2.66.7.71-2.6-.17-.27A7.3 7.3 0 1 1 12 19.3Zm4.02-5.2c-.22-.11-1.3-.64-1.5-.72-.2-.07-.35-.11-.5.11-.14.22-.56.72-.69.86-.13.15-.25.16-.47.06a6 6 0 0 1-1.76-1.09 6.6 6.6 0 0 1-1.22-1.5c-.13-.22 0-.34.1-.45.1-.1.22-.26.33-.39.1-.13.14-.22.2-.37.08-.14.04-.27-.02-.38-.06-.11-.5-1.2-.69-1.65-.18-.43-.36-.37-.5-.37h-.42c-.15 0-.38.05-.58.27-.2.22-.77.75-.77 1.8 0 1.06.79 2.08.9 2.22.11.15 1.54 2.36 3.73 3.3 1.9.83 2.28.67 2.7.63.4-.04 1.3-.53 1.48-1.05.18-.51.18-.95.13-1.04-.05-.09-.2-.15-.42-.26Z',
  },
  {
    id: 'telegram',
    label: 'Telegram',
    href: TELEGRAM_URL,
    brand: '#229ED9',
    path: 'M21 4.3 3 11.4c-.85.32-.83 1.55.03 1.84l4.6 1.53 1.78 5.2c.24.7 1.14.86 1.6.28l2.4-2.9 4.6 3.4c.58.43 1.42.12 1.55-.6l2.95-14.4c.16-.82-.66-1.5-1.6-1.45Z',
  },
  {
    id: 'gmail',
    label: 'Gmail',
    href: 'mailto:abrahamsportslab@gmail.com',
    brand: '#EA4335',
    path: 'M5 5h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1v-8.3l-6 4.2-6-4.2V19H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm.5 2L12 11.6 18.5 7H5.5Z',
  },
];

/**
 * Footer — Pie de página con logo, redes sociales y aviso de juego responsable.
 */
export default function Footer() {
  const { t } = useLang();
  const responsible = t('footer.responsible').replace('{age}', MIN_AGE);

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <a className="footer__brand-link" href="#top">
              <img className="footer__logo" src={logo} alt="" />
              <span className="footer__brand-name">
                Sports<span className="footer__brand-accent">LAB</span>
              </span>
            </a>
            <p className="footer__tagline">{t('footer.tagline')}</p>

            <ul className="footer__socials" aria-label="Redes sociales">
              {SOCIALS.map((s) => (
                <li key={s.id}>
                  <a
                    className={`footer__social ${s.gradient ? 'footer__social--ig' : ''}`}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    style={{ '--brand': s.brand }}
                  >
                    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                      <path fill="currentColor" d={s.path} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {COLUMNS.map((column) => {
            const title = t(`footer.${column.title ?? column.id}`);
            return (
              <nav className="footer__column" key={column.id} aria-label={title}>
                <h3 className="footer__column-title">{title}</h3>
                <ul className="footer__links">
                  {t(`footer.${column.links}`).map((link) => (
                    <li key={link}>
                      <a className="footer__link" href="#!">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            );
          })}
        </div>

        <div className="footer__responsible">
          <span className="footer__age" aria-label={t('footer.age')(MIN_AGE)}>
            +{MIN_AGE}
          </span>
          <p className="footer__responsible-text">{responsible}</p>
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">{t('footer.copy')}</p>
          <p className="footer__disclaimer">{t('footer.disclaimer')}</p>
        </div>
      </div>
    </footer>
  );
}
