/**
 * Enlace al canal de Telegram (CTA principal del servicio de pronósticos).
 */
export const TELEGRAM_URL = 'https://t.me/abrahamsportslab';

/** Perfil de Instagram del fundador. */
export const INSTAGRAM_URL = 'https://www.instagram.com/_jabrahamb/';

/**
 * Enlaces de navegación principal.
 * `icon` es una clave del registro de iconos SVG (components/ui/Icon).
 * @type {{ id: string, label: string, href: string, icon: string }[]}
 */
export const NAV_LINKS = [
  { id: 'live', label: 'En vivo', href: '#en-vivo', icon: 'live' },
  { id: 'how', label: 'Cómo funciona', href: '#como-funciona', icon: 'target' },
  { id: 'tournaments', label: 'Torneos', href: '#torneos', icon: 'trophy' },
  { id: 'results', label: 'Resultados', href: '#resultados', icon: 'medal' },
  { id: 'features', label: 'Ventajas', href: '#ventajas', icon: 'shield' },
];
