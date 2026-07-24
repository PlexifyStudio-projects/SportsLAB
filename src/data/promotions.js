/**
 * Promociones y bonos. Todas sujetas a términos y condiciones (+18).
 * @type {{ id: string, tag: string, title: string, description: string, cta: string, featured: boolean }[]}
 */
export const PROMOTIONS = [
  {
    id: 'welcome',
    tag: 'Bienvenida',
    title: 'Bono del 100% hasta 200 €',
    description:
      'Duplicamos tu primer depósito. Ingresa 200 € y juega con 400 €. Sujeto a T&C.',
    cta: 'Reclamar bono',
    featured: true,
  },
  {
    id: 'freebet',
    tag: 'Apuesta gratis',
    title: 'Freebet de 10 € sin depósito',
    description: 'Regístrate y verifica tu cuenta para recibir una apuesta gratis de 10 €.',
    cta: 'Empezar gratis',
    featured: false,
  },
  {
    id: 'combo',
    tag: 'Combinadas',
    title: '+40% en apuestas combinadas',
    description: 'Aumenta tus ganancias hasta un 40% en combinadas de 5 o más selecciones.',
    cta: 'Ver detalles',
    featured: false,
  },
];
