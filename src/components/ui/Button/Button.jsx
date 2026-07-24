import './Button.scss';

/**
 * Button — Botón/enlace de acción reutilizable (BEM: `button`).
 *
 * @param {Object}   props
 * @param {'primary'|'secondary'|'ghost'} [props.variant='primary']
 * @param {'md'|'lg'} [props.size='md']
 * @param {string}   [props.as='button']  Etiqueta a renderizar ('button' | 'a').
 * @param {string}   [props.href]         URL cuando `as='a'`.
 * @param {boolean}  [props.fullWidth=false]
 * @param {React.ReactNode} props.children
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  as = 'button',
  href,
  fullWidth = false,
  children,
  className = '',
  ...rest
}) {
  const classes = [
    'button',
    `button--${variant}`,
    `button--${size}`,
    fullWidth ? 'button--full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (as === 'a') {
    return (
      <a className={classes} href={href} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
