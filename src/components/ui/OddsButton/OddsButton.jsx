import { formatOdd } from '@utils/format.js';
import './OddsButton.scss';

/**
 * OddsButton — Botón que muestra una cuota seleccionable (BEM: `odds-button`).
 *
 * @param {Object} props
 * @param {string} props.label   Etiqueta del mercado (1 / X / 2).
 * @param {number} props.value   Cuota decimal.
 * @param {(value:number)=>void} [props.onSelect]
 */
export default function OddsButton({ label, value, onSelect }) {
  return (
    <button
      type="button"
      className="odds-button"
      onClick={() => onSelect?.(value)}
      aria-label={`Apostar ${label} con cuota ${formatOdd(value)}`}
    >
      <span className="odds-button__label">{label}</span>
      <span className="odds-button__value">{formatOdd(value)}</span>
    </button>
  );
}
