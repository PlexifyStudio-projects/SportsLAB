import './Badge.scss';

/**
 * Badge — Etiqueta compacta para estados/categorías (BEM: `badge`).
 *
 * @param {Object} props
 * @param {'live'|'accent'|'neutral'} [props.variant='neutral']
 * @param {React.ReactNode} props.children
 */
export default function Badge({ variant = 'neutral', children, className = '' }) {
  const classes = ['badge', `badge--${variant}`, className].filter(Boolean).join(' ');
  return <span className={classes}>{children}</span>;
}
