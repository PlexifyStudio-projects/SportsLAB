/**
 * Partidos de tenis en vivo. Se generan 25 partidos aleatorios en cada carga
 * (mock, sin backend). Sobre ellos corre la simulación de mercado (useLiveOdds).
 *
 * @typedef {Object} Match
 * @property {string} id
 * @property {string} tournament   Torneo · ronda
 * @property {'clay'|'grass'|'hard'} surface
 * @property {string} home         Jugador/a local
 * @property {string} away         Jugador/a visitante
 * @property {string} status       Set y marcador (etiqueta en vivo)
 * @property {{ home: number, away: number }} odds
 */

const PLAYERS = [
  'C. Alcaraz', 'J. Sinner', 'N. Djokovic', 'A. Zverev', 'D. Medvedev', 'T. Fritz',
  'S. Tsitsipas', 'C. Ruud', 'A. Rublev', 'H. Hurkacz', 'G. Dimitrov', 'F. Tiafoe',
  'T. Paul', 'B. Shelton', 'K. Khachanov', 'F. Cerúndolo', 'M. Berrettini', 'U. Humbert',
  'J. Rune', 'A. de Miñaur', 'I. Świątek', 'A. Sabalenka', 'C. Gauff', 'E. Rybakina',
  'J. Pegula', 'O. Jabeur', 'M. Vondroušová', 'Q. Zheng', 'B. Krejčíková', 'D. Kasatkina',
];

const TOURNAMENTS = [
  'Roland Garros', 'Wimbledon', 'US Open', 'Australian Open', 'ATP Roma', 'ATP Madrid',
  'ATP Miami', 'Masters Montecarlo', 'ATP Cincinnati', 'WTA Finals', 'ATP Finals', 'Copa Davis',
];

const ROUNDS = ['1ª ronda', '2ª ronda', '3ª ronda', 'Octavos', 'Cuartos', 'Semifinal', 'Final'];
const SURFACES = ['clay', 'clay', 'grass', 'hard', 'hard', 'hard'];

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const rand = (min, max) => min + Math.random() * (max - min);
const round2 = (v) => Math.round(v * 100) / 100;
const clampOdd = (v) => Math.min(4, Math.max(1.2, round2(v)));

function makeMatch(i) {
  const home = pick(PLAYERS);
  let away = pick(PLAYERS);
  while (away === home) away = pick(PLAYERS);

  // Probabilidad del favorito → cuotas plausibles con margen de casa.
  const p = rand(0.4, 0.68);
  const margin = 0.95;

  return {
    id: `m${i}`,
    tournament: `${pick(TOURNAMENTS)} · ${pick(ROUNDS)}`,
    surface: pick(SURFACES),
    home,
    away,
    status: `Set ${Math.ceil(rand(0.01, 3))} · ${Math.floor(rand(0, 6))}-${Math.floor(rand(0, 6))}`,
    odds: {
      home: clampOdd(1 / p / margin),
      away: clampOdd(1 / (1 - p) / margin),
    },
  };
}

/** @type {Match[]} */
export const LIVE_MATCHES = Array.from({ length: 25 }, (_, i) => makeMatch(i));
