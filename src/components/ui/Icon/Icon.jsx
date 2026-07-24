import { ICON_PATHS } from './icons.jsx';
import './Icon.scss';

/**
 * Icon — Renderiza un icono SVG del registro (`icons.jsx`).
 * Todos los iconos usan `currentColor`, así que se colorean con `color` en CSS.
 *
 * @param {Object} props
 * @param {string} props.name          Clave del icono (p. ej. 'racket').
 * @param {number} [props.size=24]     Tamaño en px (ancho y alto).
 * @param {number} [props.stroke=1.75] Grosor del trazo.
 * @param {string} [props.title]       Texto accesible; si se omite, el icono es decorativo.
 * @param {string} [props.className]
 */
export default function Icon({ name, size = 24, stroke = 1.75, title, className = '' }) {
  const paths = ICON_PATHS[name];

  if (!paths) {
    // Falla de forma segura y visible en desarrollo, sin romper el render.
    if (import.meta.env.DEV) {
      console.warn(`[Icon] Icono desconocido: "${name}"`);
    }
    return null;
  }

  return (
    <svg
      className={`icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {title && <title>{title}</title>}
      {paths}
    </svg>
  );
}
