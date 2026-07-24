/**
 * Ventajas de SportsLAB mostradas en la sección "¿Por qué SportsLAB?".
 * `icon` es una clave del registro de iconos SVG (ver components/ui/Icon).
 * @type {{ id: string, icon: string, title: string, description: string }[]}
 */
export const FEATURES = [
  {
    id: 'odds',
    icon: 'chart',
    title: 'Mejores cuotas',
    description: 'Comparamos y elegimos siempre la cuota más alta del mercado.',
  },
  {
    id: 'live',
    icon: 'target',
    title: 'Punto a punto',
    description: 'Seguimiento en vivo de cada partido, game a game.',
  },
  {
    id: 'payout',
    icon: 'lightning',
    title: 'Retiro rápido',
    description: 'Gestión de bankroll clara para que cobres tus ganancias sin líos.',
  },
  {
    id: 'secure',
    icon: 'shield',
    title: 'Seguridad',
    description: 'Análisis con datos reales y total transparencia en los resultados.',
  },
];
