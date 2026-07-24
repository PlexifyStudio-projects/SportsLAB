import Button from '@components/ui/Button/Button.jsx';
import Badge from '@components/ui/Badge/Badge.jsx';
import Icon from '@components/ui/Icon/Icon.jsx';
import CourtScene from './CourtScene.jsx';
import './Hero.scss';

const STATS = [
  { id: 'events', value: '2.500+', label: 'Partidos al mes' },
  { id: 'tournaments', value: '140+', label: 'Torneos ATP/WTA' },
  { id: 'payout', value: '97%', label: 'Retorno medio' },
];

const TRUST = [
  { id: 'secure', icon: 'shield', label: 'Operador con licencia' },
  { id: 'fast', icon: 'lightning', label: 'Retiros en minutos' },
];

/**
 * Hero — Portada cinematográfica (above the fold).
 */
export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero__inner">
        <div className="hero__content">
          <Badge variant="accent">
            <Icon name="fire" size={14} /> Bono de bienvenida 100%
          </Badge>

          <h1 className="hero__title">
            Vive el tenis como <span className="hero__highlight">nunca</span>. Apuesta en cada punto.
          </h1>

          <p className="hero__subtitle">
            Grand Slams, ATP y WTA con las mejores cuotas del mercado. Juego en directo, punto a
            punto, con estadísticas en tiempo real.
          </p>

          <div className="hero__actions">
            <Button as="a" href="#registro" size="lg">
              Crea tu cuenta gratis
              <Icon name="arrow-right" size={18} />
            </Button>
            <Button as="a" href="#en-vivo" variant="secondary" size="lg">
              <Icon name="live" size={18} /> Ver en directo
            </Button>
          </div>

          <ul className="hero__trust">
            {TRUST.map((item) => (
              <li className="hero__trust-item" key={item.id}>
                <Icon name={item.icon} size={18} />
                {item.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="hero__visual">
          <CourtScene />

          <aside className="hero__ticket" aria-label="Ejemplo de boleto de apuesta">
            <div className="hero__ticket-head">
              <Badge variant="live">En directo</Badge>
              <span className="hero__ticket-league">Roland Garros · 4ª ronda</span>
            </div>
            <div className="hero__ticket-match">
              <span>C. Alcaraz</span>
              <span className="hero__ticket-vs">vs</span>
              <span>J. Sinner</span>
            </div>
            <div className="hero__ticket-selection">
              <span>Gana Alcaraz</span>
              <strong className="hero__ticket-odd">1.85</strong>
            </div>
            <div className="hero__ticket-row hero__ticket-row--total">
              <span>Ganancia potencial</span>
              <strong>92,50 €</strong>
            </div>
          </aside>
        </div>

        <ul className="hero__stats">
          {STATS.map((stat) => (
            <li className="hero__stat" key={stat.id}>
              <span className="hero__stat-value">{stat.value}</span>
              <span className="hero__stat-label">{stat.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
