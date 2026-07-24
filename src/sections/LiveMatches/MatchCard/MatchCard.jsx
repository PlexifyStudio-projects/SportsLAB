import Badge from '@components/ui/Badge/Badge.jsx';
import OddsButton from '@components/ui/OddsButton/OddsButton.jsx';
import './MatchCard.scss';

const SURFACE_LABEL = { clay: 'Tierra', grass: 'Hierba', hard: 'Pista dura' };

/**
 * MatchCard — Tarjeta de un partido de tenis en vivo con sus cuotas (a 2).
 *
 * @param {Object} props
 * @param {import('@data/matches.js').Match} props.match
 */
export default function MatchCard({ match }) {
  const { tournament, surface, home, away, status, odds } = match;

  return (
    <article className="match-card">
      <header className="match-card__head">
        <span className="match-card__tournament">{tournament}</span>
        <Badge variant="live">EN VIVO</Badge>
      </header>

      <div className="match-card__players">
        <span className="match-card__player">{home}</span>
        <span className="match-card__player">{away}</span>
      </div>

      <div className="match-card__status">
        <span className={`match-card__surface match-card__surface--${surface}`}>
          {SURFACE_LABEL[surface]}
        </span>
        <span className="match-card__score">{status}</span>
      </div>

      <div className="match-card__odds">
        <OddsButton label="1" value={odds.home} />
        <OddsButton label="2" value={odds.away} />
      </div>
    </article>
  );
}
