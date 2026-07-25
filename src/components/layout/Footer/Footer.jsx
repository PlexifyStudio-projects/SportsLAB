import { useState } from 'react';

import LegalModal from '@components/ui/LegalModal/LegalModal.jsx';
import { TELEGRAM_URL } from '@data/navigation.js';
import { CONTACT_EMAIL, LEGAL } from '@data/legal.js';
import { useLang } from '@/i18n/index.jsx';
import logo from '@assets/images/Logo.jpeg';
import './Footer.scss';

const MIN_AGE = import.meta.env.VITE_MIN_AGE ?? '18';

// Columnas de navegación. Todos los destinos existen de verdad: son anclas de
// la propia página o enlaces externos reales. Nada de "#!".
const COLUMNS = [
  {
    id: 'product',
    links: [
      { key: 'live', href: '#en-vivo' },
      { key: 'how', href: '#como-funciona' },
      { key: 'tournaments', href: '#torneos' },
      { key: 'results', href: '#resultados' },
      { key: 'features', href: '#ventajas' },
    ],
  },
  {
    id: 'company',
    links: [
      { key: 'about', href: '#estilo' },
      { key: 'numbers', href: '#top' },
      { key: 'join', href: '#registro' },
    ],
  },
  {
    id: 'support',
    links: [
      { key: 'telegram', href: TELEGRAM_URL, external: true },
      { key: 'email', href: `mailto:${CONTACT_EMAIL}` },
    ],
  },
];

// Documentos legales: abren un modal, no navegan fuera.
const LEGAL_LINKS = ['terms', 'privacy', 'cookies', 'responsible'];

// Se quitó WhatsApp: no había número, y un enlace a wa.me vacío no lleva a
// ninguna parte.
// PENDIENTE: Facebook e Instagram apuntan a `#` hasta que el cliente facilite
// las URLs reales de los perfiles. Al no ser enlaces externos, no llevan
// `target="_blank"` ni entran en el `sameAs` del JSON-LD.
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
    id: 'telegram',
    label: 'Telegram',
    href: TELEGRAM_URL,
    brand: '#229ED9',
    path: 'M21 4.3 3 11.4c-.85.32-.83 1.55.03 1.84l4.6 1.53 1.78 5.2c.24.7 1.14.86 1.6.28l2.4-2.9 4.6 3.4c.58.43 1.42.12 1.55-.6l2.95-14.4c.16-.82-.66-1.5-1.6-1.45Z',
  },
  {
    id: 'gmail',
    label: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
    brand: '#EA4335',
    path: 'M5 5h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1v-8.3l-6 4.2-6-4.2V19H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm.5 2L12 11.6 18.5 7H5.5Z',
  },
];

/**
 * Footer — Pie de página con navegación real, contacto, documentos legales
 * (en modal) y aviso de juego responsable.
 */
export default function Footer() {
  const { lang, t } = useLang();
  const [openDoc, setOpenDoc] = useState(null);
  const responsible = t('footer.responsible').replace('{age}', MIN_AGE);

  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="footer__grid">
            <div className="footer__brand">
              <a className="footer__brand-link" href="#top">
                <img
                  className="footer__logo"
                  src={logo}
                  alt=""
                  width="778"
                  height="831"
                  loading="lazy"
                  decoding="async"
                />
                <span className="footer__brand-name">
                  Sports<span className="footer__brand-accent">LAB</span>
                </span>
              </a>
              <p className="footer__tagline">{t('footer.tagline')}</p>

              <ul className="footer__socials" aria-label={t('footer.socials')}>
                {SOCIALS.map((social) => {
                  // Solo abren en pestaña nueva los enlaces que salen del sitio:
                  // ni `mailto:` ni los marcadores `#` pendientes de URL real.
                  const external = social.href.startsWith('http');
                  return (
                    <li key={social.id}>
                      <a
                        className={`footer__social ${social.gradient ? 'footer__social--ig' : ''}`}
                        href={social.href}
                        target={external ? '_blank' : undefined}
                        rel={external ? 'noopener noreferrer' : undefined}
                        aria-label={social.label}
                        style={{ '--brand': social.brand }}
                      >
                        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                          <path fill="currentColor" d={social.path} />
                        </svg>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            {COLUMNS.map((column) => {
              const title = t(`footer.${column.id}`);
              return (
                <nav className="footer__column" key={column.id} aria-label={title}>
                  <h3 className="footer__column-title">{title}</h3>
                  <ul className="footer__links">
                    {column.links.map((link) => (
                      <li key={link.key}>
                        <a
                          className="footer__link"
                          href={link.href}
                          target={link.external ? '_blank' : undefined}
                          rel={link.external ? 'noopener noreferrer' : undefined}
                        >
                          {t(`footer.link.${link.key}`)}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              );
            })}

            <nav className="footer__column" aria-label={t('footer.legalTitle')}>
              <h3 className="footer__column-title">{t('footer.legalTitle')}</h3>
              <ul className="footer__links">
                {LEGAL_LINKS.map((id) => (
                  <li key={id}>
                    <button
                      className="footer__link footer__link--button"
                      type="button"
                      onClick={() => setOpenDoc(id)}
                    >
                      {LEGAL[lang][id].title}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
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

            {/* Crédito de autoría del estudio. */}
            <p className="footer__credit">
              {t('footer.madeBy')}{' '}
              <a
                className="footer__credit-link"
                href="https://plexifystudio.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Plexify Studio
              </a>
            </p>
          </div>
        </div>
      </footer>

      <LegalModal
        doc={openDoc ? LEGAL[lang][openDoc] : null}
        onClose={() => setOpenDoc(null)}
        closeLabel={t('footer.close')}
        updatedLabel={t('footer.updated')}
      />
    </>
  );
}
