/**
 * Ventajas competitivas mostradas en la sección "Por qué SportsLAB".
 * `icon` es una clave del registro de iconos SVG (ver components/ui/Icon).
 * @type {{ id: string, icon: string, title: string, description: string }[]}
 */
export const FEATURES = [
  {
    id: 'odds',
    icon: 'chart',
    title: 'Las mejores cuotas',
    description: 'Cuotas competitivas actualizadas al segundo en cada torneo ATP y WTA.',
  },
  {
    id: 'live',
    icon: 'live',
    title: 'Directo punto a punto',
    description: 'Apuesta en vivo game a game con estadísticas de saque, roturas y ritmo.',
  },
  {
    id: 'payout',
    icon: 'lightning',
    title: 'Retiros en minutos',
    description: 'Cobra tus ganancias al instante con pagos seguros y sin comisiones ocultas.',
  },
  {
    id: 'secure',
    icon: 'shield',
    title: 'Seguridad garantizada',
    description: 'Operador con licencia y cifrado de extremo a extremo para tus datos.',
  },
];
