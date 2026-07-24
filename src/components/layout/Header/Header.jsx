import { useState } from 'react';

import Button from '@components/ui/Button/Button.jsx';
import { NAV_LINKS } from '@data/navigation.js';
import { useScrolled } from '@hooks/useScrolled.js';
import './Header.scss';

/**
 * Header — Cabecera fija con navegación principal y menú responsive.
 */
export default function Header() {
  const scrolled = useScrolled(8);
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="container header__inner">
        <a className="header__brand" href="#top" onClick={closeMenu}>
          <span className="header__logo" aria-hidden="true">
            SL
          </span>
          <span className="header__brand-name">SportsLAB</span>
        </a>

        <nav
          className={`header__nav ${open ? 'header__nav--open' : ''}`}
          aria-label="Navegación principal"
        >
          <ul className="header__nav-list">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a className="header__nav-link" href={link.href} onClick={closeMenu}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header__actions">
          <Button as="a" href="#login" variant="ghost" className="header__login">
            Iniciar sesión
          </Button>
          <Button as="a" href="#registro">
            Regístrate
          </Button>
          <button
            type="button"
            className="header__burger"
            aria-label="Abrir menú"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="header__burger-bar" />
            <span className="header__burger-bar" />
            <span className="header__burger-bar" />
          </button>
        </div>
      </div>
    </header>
  );
}
