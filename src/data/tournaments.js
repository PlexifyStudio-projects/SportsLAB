/**
 * Categorías de torneos de tenis cubiertas. `icon` es una clave del registro SVG.
 * @type {{ id: string, name: string, icon: string, description: string }[]}
 */
export const TOURNAMENTS = [
  { id: 'atp', name: 'ATP', icon: 'trophy', description: 'Circuito masculino profesional' },
  { id: 'wta', name: 'WTA', icon: 'medal', description: 'Circuito femenino profesional' },
  { id: 'slam', name: 'Grand Slams', icon: 'diamond', description: 'Australia, Roland Garros, Wimbledon y US Open' },
  { id: 'masters', name: 'Masters 1000', icon: 'target', description: 'La élite del circuito ATP' },
  { id: 'davis', name: 'Copa Davis', icon: 'flag', description: 'Competición por selecciones' },
];
