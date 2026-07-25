import { memo } from 'react';

import OddsButton from '@components/ui/OddsButton/OddsButton.jsx';
import { rafThrottle } from '@utils/motion.js';
import './MatchCard.scss';

const SURFACE_LABEL = { clay: 'Tierra', grass: 'Hierba', hard: 'Pista dura' };

// Spotlight que sigue el cursor, limitado a una escritura por frame. Hay ~50
// tarjetas en el marquee: sin rAF, cada movimiento del ratón forzaba un
// `getBoundingClientRect` (reflow) y dos escrituras de custom property.
const onCardMove = rafThrottle(({ currentTarget, clientX, clientY }) => {
  const r = currentTarget.getBoundingClientRect();
  currentTarget.style.setProperty('--mx', `${clientX - r.left}px`);
  currentTarget.style.setProperty('--my', `${clientY - r.top}px`);
});

/**
 * MatchCard — Tarjeta premium de un partido de tenis en vivo (glass + spotlight).
 *
 * Va memoizada: `useLiveOdds` solo cambia la referencia de los partidos que se
 * mueven en cada tick, así que las tarjetas restantes no se re-renderizan.
 *
 * @param {Object} props
 * @param {import('@data/matches.js').Match & { trend?: { home: string|null, away: string|null } }} props.match
 */
function MatchCard({ match }) {
  const { tournament, surface, home, away, status, odds, trend } = match;

  return (
    <article className="match-card" onMouseMove={onCardMove}>
      <header className="match-card__head">
        <span className="match-card__tournament">{tournament}</span>
        <span className="match-card__live">
          <span className="match-card__live-dot" aria-hidden="true" />
          En vivo
        </span>
      </header>

      <div className="match-card__players">
        <span className="match-card__player">{home}</span>
        <span className="match-card__vs">vs</span>
        <span className="match-card__player">{away}</span>
      </div>

      <div className="match-card__status">
        <span className={`match-card__surface match-card__surface--${surface}`}>
          {SURFACE_LABEL[surface]}
        </span>
        <span className="match-card__score">{status}</span>
      </div>

      <div className="match-card__odds">
        <OddsButton label="1" value={odds.home} trend={trend?.home} />
        <OddsButton label="2" value={odds.away} trend={trend?.away} />
      </div>
    </article>
  );
}

export default memo(MatchCard);
