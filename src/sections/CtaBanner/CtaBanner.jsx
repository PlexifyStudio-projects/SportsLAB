import Button from '@components/ui/Button/Button.jsx';
import './CtaBanner.scss';

/**
 * CtaBanner — Llamada a la acción final antes del footer.
 */
export default function CtaBanner() {
  return (
    <section className="cta-banner" id="registro">
      <div className="container">
        <div className="cta-banner__inner">
          <div className="cta-banner__text">
            <h2 className="cta-banner__title">Tu primera apuesta te está esperando</h2>
            <p className="cta-banner__subtitle">
              Regístrate hoy y consigue un bono del 100% hasta 200 €. Sin complicaciones.
            </p>
          </div>
          <div className="cta-banner__actions">
            <Button as="a" href="#registro" variant="accent" size="lg">
              Crear cuenta gratis
            </Button>
            <p className="cta-banner__legal">+18 · Juega con responsabilidad · Aplican T&amp;C</p>
          </div>
        </div>
      </div>
    </section>
  );
}
