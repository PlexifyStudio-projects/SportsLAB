import { formatOdd } from '@utils/format.js';
import './OddsButton.scss';

/**
 * OddsButton — Botón que muestra una cuota seleccionable (BEM: `odds-button`).
 *
 * @param {Object} props
 * @param {string} props.label   Etiqueta del mercado (1 / 2).
 * @param {number} props.value   Cuota decimal.
 * @param {'up'|'down'|null} [props.trend]  Tendencia de la cuota (destello).
 * @param {(value:number)=>void} [props.onSelect]
 */
export default function OddsButton({ label, value, trend, onSelect }) {
  const classes = `odds-button ${trend ? `odds-button--${trend}` : ''}`;

  return (
    <button
      type="button"
      className={classes}
      onClick={() => onSelect?.(value)}
      aria-label={`Apostar ${label} con cuota ${formatOdd(value)}`}
    >
      <span className="odds-button__label">{label}</span>
      <span className="odds-button__value">
        {formatOdd(value)}
        {trend && (
          <span className="odds-button__arrow" aria-hidden="true">
            {trend === 'up' ? '▲' : '▼'}
          </span>
        )}
      </span>
    </button>
  );
}
