/**
 * "Cómo funciona": pasos del servicio de pronósticos (diseño tipo timeline).
 * `icon` es una clave del registro de iconos SVG.
 * @type {{ id: string, step: string, icon: string, title: string, text: string }[]}
 */
export const HOW_IT_WORKS = [
  {
    id: 'analyze',
    step: '01',
    icon: 'chart',
    title: 'Analizamos',
    text: 'Estudiamos forma, superficie y cara a cara de cada partido con datos reales.',
  },
  {
    id: 'pick',
    step: '02',
    icon: 'telegram',
    title: 'Publicamos el pick',
    text: 'Enviamos el pronóstico con la cuota y el stake recomendado directo a Telegram.',
  },
  {
    id: 'bet',
    step: '03',
    icon: 'wallet',
    title: 'Tú apuestas',
    text: 'Colocas la apuesta en tu casa favorita con la mejor cuota disponible.',
  },
  {
    id: 'track',
    step: '04',
    icon: 'shield',
    title: 'Seguimos el resultado',
    text: 'Registramos cada resultado con total transparencia, ganes o pierdas.',
  },
];
