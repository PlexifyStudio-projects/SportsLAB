/**
 * Registro de iconos SVG (temática tenis + utilidades).
 * Cada entrada son los nodos internos de un `<svg viewBox="0 0 24 24">`.
 * Usan `currentColor`, de modo que heredan el color del contexto.
 *
 * Estilo: trazo (stroke) de 1.75, extremos redondeados. Coherentes entre sí.
 */
export const ICON_PATHS = {
  'tennis-ball': (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M4.8 5.4C7.6 8.1 7.6 15.9 4.8 18.6" />
      <path d="M19.2 5.4C16.4 8.1 16.4 15.9 19.2 18.6" />
    </>
  ),
  racket: (
    <>
      <ellipse cx="9.7" cy="8.6" rx="5.4" ry="6" />
      <path d="M13.6 12.7 20 19.1" />
      <path d="M6.2 6.6 13 10.6" />
      <path d="M6.4 10.4 12.6 6.2" />
      <path d="M12.4 15 14 16.6" />
    </>
  ),
  trophy: (
    <>
      <path d="M7 4h10v3.5a5 5 0 0 1-10 0V4Z" />
      <path d="M7 5.2H4.6A2.4 2.4 0 0 0 7.3 8.4" />
      <path d="M17 5.2h2.4A2.4 2.4 0 0 1 16.7 8.4" />
      <path d="M12 12.5V15" />
      <path d="M9.6 15h4.8l.6 4H9Z" />
    </>
  ),
  flag: (
    <>
      <path d="M6 21V4" />
      <path d="M6 5h11l-2.2 3L17 11H6" />
    </>
  ),
  lightning: <path d="M13 2 4 14h6.5l-1 8L20 10h-7l0-8Z" />,
  shield: (
    <>
      <path d="M12 3l7 3v5c0 4.6-3.1 7.7-7 9-3.9-1.3-7-4.4-7-9V6Z" />
      <path d="M9 12l2 2 4-4.2" />
    </>
  ),
  chart: (
    <>
      <path d="M4 4v16h16" />
      <path d="M7 15l3-4 3 2 5-7" />
    </>
  ),
  live: (
    <>
      <circle cx="12" cy="12" r="2.2" />
      <path d="M7.6 7.6a6 6 0 0 0 0 8.8" />
      <path d="M16.4 7.6a6 6 0 0 1 0 8.8" />
      <path d="M4.7 4.7a10 10 0 0 0 0 14.6" />
      <path d="M19.3 4.7a10 10 0 0 1 0 14.6" />
    </>
  ),
  medal: (
    <>
      <circle cx="12" cy="15" r="5" />
      <path d="M12 13.2l.9 1.8 2 .3-1.4 1.4.3 2-1.8-1-1.8 1 .3-2L9 15.3l2-.3Z" />
      <path d="M8.5 3l2.2 6" />
      <path d="M15.5 3l-2.2 6" />
    </>
  ),
  wallet: (
    <>
      <rect x="3" y="6" width="18" height="13" rx="2.5" />
      <path d="M3 10h18" />
      <circle cx="16.5" cy="14.5" r="1.2" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.6 2.4 4 5.6 4 9s-1.4 6.6-4 9c-2.6-2.4-4-5.6-4-9s1.4-6.6 4-9Z" />
    </>
  ),
  'arrow-right': (
    <>
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </>
  ),
  'arrow-left': (
    <>
      <path d="M19 12H5" />
      <path d="M11 6l-6 6 6 6" />
    </>
  ),
  'chevron-down': <path d="M5 9l7 7 7-7" />,
  menu: (
    <>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </>
  ),
  close: (
    <>
      <path d="M6 6l12 12" />
      <path d="M18 6 6 18" />
    </>
  ),
  diamond: (
    <>
      <path d="M6 3h12l3 5-9 13L3 8Z" />
      <path d="M3 8h18" />
      <path d="M9.5 3 8 8l4 13 4-13-1.5-5" />
    </>
  ),
  gift: (
    <>
      <rect x="4" y="9" width="16" height="11" rx="1.5" />
      <path d="M3 9h18" />
      <path d="M12 9v11" />
      <path d="M12 9C10 9 7.5 8.5 7.5 6.2 7.5 5 8.4 4 9.6 4 11.4 4 12 6.5 12 9Z" />
      <path d="M12 9c2 0 4.5-.5 4.5-2.8C16.5 5 15.6 4 14.4 4 12.6 4 12 6.5 12 9Z" />
    </>
  ),
  telegram: (
    <>
      <path d="M21.5 4.3 3 11.4c-.85.32-.83 1.55.03 1.84l4.6 1.53 1.78 5.2c.24.7 1.14.86 1.6.28l2.4-2.9 4.6 3.4c.58.43 1.42.12 1.55-.6l2.95-14.4c.16-.82-.66-1.5-1.6-1.45Z" />
      <path d="M7.7 14.8 17 8.4l-6.3 7.6" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.4" />
    </>
  ),
};
