import Button from '@components/ui/Button/Button.jsx';
import './MobileCta.scss';

/**
 * MobileCta — Barra de acción fija en la parte inferior, SOLO visible en móvil.
 * Mejora la conversión en pantallas pequeñas manteniendo el CTA siempre a mano.
 */
export default function MobileCta() {
  return (
    <div className="mobile-cta" role="region" aria-label="Acciones rápidas">
      <Button as="a" href="#login" variant="secondary" className="mobile-cta__button">
        Entrar
      </Button>
      <Button as="a" href="#registro" className="mobile-cta__button">
        Regístrate y juega
      </Button>
    </div>
  );
}
