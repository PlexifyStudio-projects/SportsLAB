/**
 * Partidos de tenis en vivo. Datos de ejemplo (mock) que en producción
 * provendrían de `VITE_API_BASE_URL`. Las cuotas son ilustrativas.
 *
 * @typedef {Object} Match
 * @property {string} id
 * @property {string} tournament   Torneo / ronda
 * @property {'clay'|'grass'|'hard'} surface
 * @property {string} home         Jugador/a local
 * @property {string} away         Jugador/a visitante
 * @property {string} status       Marcador o set en juego (etiqueta en vivo)
 * @property {{ home: number, away: number }} odds   Cuotas a 2 (tenis sin empate)
 */

/** @type {Match[]} */
export const LIVE_MATCHES = [
  {
    id: 'm1',
    tournament: 'Roland Garros · 4ª ronda',
    surface: 'clay',
    home: 'C. Alcaraz',
    away: 'J. Sinner',
    status: 'Set 2 · 4-3',
    odds: { home: 1.85, away: 1.95 },
  },
  {
    id: 'm2',
    tournament: 'Wimbledon · Cuartos',
    surface: 'grass',
    home: 'N. Djokovic',
    away: 'A. Zverev',
    status: 'Set 1 · 5-4',
    odds: { home: 1.62, away: 2.3 },
  },
  {
    id: 'm3',
    tournament: 'US Open · 3ª ronda',
    surface: 'hard',
    home: 'D. Medvedev',
    away: 'T. Fritz',
    status: 'Set 3 · 2-1',
    odds: { home: 1.78, away: 2.05 },
  },
  {
    id: 'm4',
    tournament: 'WTA Finals · Semis',
    surface: 'hard',
    home: 'I. Świątek',
    away: 'A. Sabalenka',
    status: 'Set 2 · 3-3',
    odds: { home: 1.7, away: 2.1 },
  },
];
