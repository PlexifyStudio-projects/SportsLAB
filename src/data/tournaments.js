/**
 * Grandes torneos de tenis destacados. `icon` es una clave del registro SVG.
 * `surface` colorea el distintivo de superficie (clay | grass | hard).
 * @type {{ id: string, name: string, icon: string, surface: 'clay'|'grass'|'hard', events: number }[]}
 */
export const TOURNAMENTS = [
  { id: 'ao', name: 'Australian Open', icon: 'trophy', surface: 'hard', events: 128 },
  { id: 'rg', name: 'Roland Garros', icon: 'trophy', surface: 'clay', events: 128 },
  { id: 'wb', name: 'Wimbledon', icon: 'trophy', surface: 'grass', events: 128 },
  { id: 'us', name: 'US Open', icon: 'trophy', surface: 'hard', events: 128 },
  { id: 'atp', name: 'ATP Finals', icon: 'medal', surface: 'hard', events: 15 },
  { id: 'masters', name: 'Masters 1000', icon: 'court', surface: 'hard', events: 56 },
  { id: 'davis', name: 'Copa Davis', icon: 'flag', surface: 'hard', events: 24 },
  { id: 'wta', name: 'WTA 1000', icon: 'racket', surface: 'hard', events: 48 },
];
