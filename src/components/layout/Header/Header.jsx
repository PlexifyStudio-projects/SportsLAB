import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import Icon from '@components/ui/Icon/Icon.jsx';
import { NAV_LINKS, TELEGRAM_URL } from '@data/navigation.js';
import { useLang, LANGUAGES } from '@/i18n/index.jsx';
import logo from '@assets/images/Logo.jpeg';
import './Header.scss';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Header — Cabecera "luxury": navegación, selector de idioma (i18n) y CTA.
 */
export default function Header() {
  const { lang, setLang, t } = useLang();
  const rootRef = useRef(null);
  const langRef = useRef(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  // Cierra el desplegable de idioma al hacer clic fuera o pulsar Escape.
  useEffect(() => {
    if (!langOpen) return undefined;
    const onClick = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false);
    };
    const onKey = (e) => e.key === 'Escape' && setLangOpen(false);
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [langOpen]);

  const selectLang = (code) => {
    setLang(code);
    setLangOpen(false);
  };

  useGSAP(
    () => {
      // -- Animación de entrada (stagger) --
      const tl = gsap.timeline({ defaults: { ease: 'power3.out', clearProps: 'transform,opacity' } });
      tl.from('.header__brand', { y: -16, opacity: 0, duration: 0.5 })
        .from('.header__nav-item', { y: -14, opacity: 0, stagger: 0.06, duration: 0.45 }, '-=0.25')
        .from('.header__action', { y: -14, opacity: 0, stagger: 0.06, duration: 0.45 }, '-=0.3');

      // -- Efecto de scroll: encoge la cabecera de forma suave (sin ocultarla) --
      const root = rootRef.current;
      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          root.classList.toggle('header--scrolled', self.scroll() > 40);
        },
      });
    },
    { scope: rootRef },
  );

  const toggleMobile = () => setMobileOpen((v) => !v);
  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="header" ref={rootRef}>
      {/* Barra principal */}
      <div className="header__bar">
        <div className="container header__inner">
          <a className="header__brand" href="#top" onClick={closeMobile}>
            <span className="header__logo">
              <img className="header__logo-img" src={logo} alt="" />
            </span>
            <span className="header__wordmark">
              Sports<span className="header__wordmark-accent">LAB</span>
            </span>
          </a>

          <nav className="header__nav" aria-label="Navegación principal">
            <ul className="header__nav-list">
              {NAV_LINKS.map((link) => (
                <li className="header__nav-item" key={link.id}>
                  <a className="header__nav-link" href={link.href}>
                    <Icon name={link.icon} size={17} />
                    {t(`nav.${link.id}`)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="header__actions">
            <div className="header__lang-wrap" ref={langRef}>
              <button
                className="header__action header__lang"
                type="button"
                aria-haspopup="listbox"
                aria-expanded={langOpen}
                onClick={() => setLangOpen((v) => !v)}
              >
                <Icon name="globe" size={18} />
                <span>{lang}</span>
                <Icon name="chevron-down" size={14} className="header__lang-caret" />
              </button>

              {langOpen && (
                <ul className="header__lang-menu" role="listbox">
                  {LANGUAGES.map((l) => (
                    <li key={l.code}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={l.code === lang}
                        className={`header__lang-option ${l.code === lang ? 'is-active' : ''}`}
                        onClick={() => selectLang(l.code)}
                      >
                        <span className="header__lang-code">{l.code}</span>
                        {l.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <a
              className="header__action header__cta"
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="telegram" size={18} className="header__cta-icon" />
              <span className="header__cta-label">{t('mobile.join')}</span>
              <span className="header__cta-shine" aria-hidden="true" />
            </a>

            <button
              className="header__action header__burger"
              type="button"
              aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={mobileOpen}
              onClick={toggleMobile}
            >
              <Icon name={mobileOpen ? 'close' : 'menu'} size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      <div className={`header__mobile ${mobileOpen ? 'is-open' : ''}`}>
        <ul className="header__mobile-list">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <a className="header__mobile-link" href={link.href} onClick={closeMobile}>
                <Icon name={link.icon} size={20} />
                {t(`nav.${link.id}`)}
                <Icon name="arrow-right" size={18} className="header__mobile-caret" />
              </a>
            </li>
          ))}
        </ul>
        <div className="header__mobile-actions">
          <a
            className="header__mobile-cta"
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMobile}
          >
            <Icon name="telegram" size={20} />
            Únete al canal de Telegram
          </a>
        </div>
      </div>
    </header>
  );
}
