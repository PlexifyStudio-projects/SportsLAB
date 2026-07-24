import './SectionHeader.scss';

/**
 * SectionHeader — Encabezado estándar de sección (BEM: `section-header`).
 *
 * @param {Object} props
 * @param {string} [props.eyebrow]   Texto superior pequeño.
 * @param {string} props.title
 * @param {string} [props.subtitle]
 * @param {'left'|'center'} [props.align='left']
 */
export default function SectionHeader({ eyebrow, title, subtitle, align = 'left' }) {
  return (
    <header className={`section-header section-header--${align}`}>
      {eyebrow && <p className="section-header__eyebrow">{eyebrow}</p>}
      <h2 className="section-header__title">{title}</h2>
      {subtitle && <p className="section-header__subtitle">{subtitle}</p>}
    </header>
  );
}
