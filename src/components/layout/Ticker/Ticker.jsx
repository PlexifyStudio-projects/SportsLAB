import Icon from '@components/ui/Icon/Icon.jsx';
import { LIVE_MATCHES } from '@data/matches.js';
import { formatOdd } from '@utils/format.js';
import './Ticker.scss';

/**
 * Ticker — Banda tipo retransmisión con cuotas en directo desplazándose.
 * Se duplica el contenido para lograr un bucle continuo sin saltos.
 */
export default function Ticker() {
  const items = LIVE_MATCHES;
  const loop = [...items, ...items]; // duplicado para el bucle

  return (
    <div className="ticker" role="marquee" aria-label="Cuotas en directo">
      <div className="ticker__tag">
        <Icon name="live" size={14} />
        <span>En directo</span>
      </div>

      <div className="ticker__viewport">
        <ul className="ticker__track">
          {loop.map((match, i) => (
            <li className="ticker__item" key={`${match.id}-${i}`} aria-hidden={i >= items.length}>
              <span className="ticker__match">
                {match.home} · {match.away}
              </span>
              <span className="ticker__odd">{formatOdd(match.odds.home)}</span>
              <span className="ticker__odd">{formatOdd(match.odds.away)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
