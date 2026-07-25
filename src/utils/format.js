/**
 * Formatea una cuota decimal con dos decimales fijos (formato europeo).
 * @param {number} value  Cuota decimal (p. ej. 2.1)
 * @returns {string}      Cuota formateada (p. ej. "2.10")
 */
export function formatOdd(value) {
  return Number(value).toFixed(2);
}
