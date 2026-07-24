import { useReveal } from '@hooks/useReveal.js';
import './Reveal.scss';

/**
 * Reveal — Envoltorio que anima la entrada de su contenido al hacer scroll.
 *
 * @param {Object} props
 * @param {'up'|'fade'|'scale'} [props.variant='up']  Tipo de animación.
 * @param {number} [props.delay=0]                     Retardo en ms (efecto escalonado).
 * @param {string} [props.as='div']                    Etiqueta contenedora.
 * @param {React.ReactNode} props.children
 */
export default function Reveal({
  variant = 'up',
  delay = 0,
  as: Tag = 'div',
  className = '',
  children,
}) {
  const [ref, shown] = useReveal();

  return (
    <Tag
      ref={ref}
      className={`reveal reveal--${variant} ${shown ? 'is-visible' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
