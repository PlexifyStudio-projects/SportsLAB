/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

// =============================================================================
// i18n — Traducciones ES/EN (sin dependencias). El idioma vive en contexto.
// =============================================================================

export const LANGUAGES = [
  { code: 'ES', label: 'Español' },
  { code: 'EN', label: 'English' },
];

const dict = {
  ES: {
    nav: {
      live: 'En vivo',
      how: 'Cómo funciona',
      tournaments: 'Torneos',
      results: 'Resultados',
      features: 'Ventajas',
    },
    hero: {
      pill: 'Pronósticos de tenis',
      title1: 'Gana ventaja en las',
      title2: 'apuestas de tenis con',
      title3: 'análisis profesionales',
      subtitle: 'Pronósticos diarios, gestión de bankroll y cobertura de ATP, WTA y Grand Slams.',
      join: 'Unirme al Telegram',
      how: 'Ver cómo funciona',
      rating: 'apostadores activos',
      badge1: '82% efectividad',
      badge2: 'Retiros verificados',
      badge3: '+50 torneos',
      covers: 'Cubrimos',
      cardCanal: 'Canal',
      cardCanalV: 'Gratis',
      cardTorneos: 'Torneos',
      cardAnalisis: 'Análisis',
      cardAnalisisV: 'Datos reales',
    },
    stats: {
      eyebrow: 'Los números',
      title: 'Resultados que',
      titleHl: 'hablan solos',
      text: 'Miles de apostadores confían en nuestros pronósticos, temporada tras temporada.',
      tag: 'Datos 100% reales',
      partidos: 'Partidos analizados',
      partidosD: 'ATP, WTA y Challengers',
      torneos: 'Torneos cubiertos',
      torneosD: 'Grand Slams, Masters 1000 y ATP 500',
      efectividad: 'Efectividad registrada',
      efectividadD: 'Acertados esta temporada',
      comunidad: 'Comunidad activa',
      comunidadD: '+2.000 en Telegram',
    },
    how: {
      eyebrow: 'El método',
      title: 'Cómo funciona',
      subtitle: 'Un proceso claro y transparente: tú solo tienes que seguir el pronóstico.',
      s1: 'Analizamos',
      s1d: 'Estudiamos forma, superficie y cara a cara de cada partido con datos reales.',
      s2: 'Publicamos el pick',
      s2d: 'Enviamos el pronóstico con la cuota y el stake recomendado directo a Telegram.',
      s3: 'Tú apuestas',
      s3d: 'Colocas la apuesta en tu casa favorita con la mejor cuota disponible.',
      s4: 'Seguimos el resultado',
      s4d: 'Registramos cada resultado con total transparencia, ganes o pierdas.',
      cta: 'Recibir pronóstico gratis',
    },
    live: {
      eyebrow: 'En directo',
      title: 'Apuesta mientras la acción sucede',
      subtitle: 'Cuotas actualizadas en tiempo real en los partidos más importantes del momento.',
    },
    tournaments: {
      eyebrow: 'Torneos',
      title: 'Cobertura total del circuito',
      subtitle:
        'Del ATP y WTA a los Grand Slams: analizamos todos los torneos importantes de la temporada.',
      atp: 'Circuito masculino profesional',
      wta: 'Circuito femenino profesional',
      slam: 'Australia, Roland Garros, Wimbledon y US Open',
      masters: 'La élite del circuito ATP',
      davis: 'Competición por selecciones',
    },
    features: {
      eyebrow: 'Ventajas',
      title: '¿Por qué SportsLAB?',
      subtitle: 'Análisis serio, cuotas competitivas y total transparencia.',
      odds: 'Mejores cuotas',
      oddsD: 'Comparamos y elegimos siempre la cuota más alta del mercado.',
      live: 'Punto a punto',
      liveD: 'Seguimiento en vivo de cada partido, game a game.',
      payout: 'Retiro rápido',
      payoutD: 'Gestión de bankroll clara para que cobres tus ganancias sin líos.',
      secure: 'Seguridad',
      secureD: 'Análisis con datos reales y total transparencia en los resultados.',
    },
    results: {
      eyebrow: 'Resultados',
      title: 'Apuestas ganadas, no promesas',
      subtitle: 'Capturas reales de nuestros pronósticos acertados. Transparencia total.',
      badge: 'Ganada',
      note: 'Los resultados pasados no garantizan resultados futuros. Juega con responsabilidad. +18.',
    },
    lifestyle: {
      eyebrow: 'Estilo de vida',
      title: 'Más que apuestas: mentalidad de ganador',
      subtitle:
        'Detrás de SportsLAB hay apostadores de verdad. Disciplina, análisis y cabeza fría, dentro y fuera de la pista.',
      founderName: 'El Fundador',
      founderRole: 'SportsLAB',
      cap1: 'Análisis nocturno',
      cap1Sub: 'Cuando la ciudad duerme',
      cap2: 'En ruta',
      cap2Sub: 'Siempre en movimiento',
      cap3: 'Vida nocturna',
      cap3Sub: 'Después del cierre',
      cap4: 'Al volante',
      cap4Sub: 'Con el control',
      quote:
        '“En la pista y en la vida gana quien estudia el juego. Nosotros te damos las herramientas; las decisiones, con cabeza.”',
      cite: '— Equipo SportsLAB',
    },
    cta: {
      eyebrow: 'Beneficio exclusivo',
      title1: 'Obtén',
      titleHl: '20% de descuento',
      title2: 'en tu primer mes VIP',
      subtitle:
        'Solo por registrarte desde esta página en AbrahamSportsLAB. Acceso completo a pronósticos, gestión de bankroll y seguimiento en directo.',
      button: 'Quiero mi 20% de descuento',
      legal: 'Garantía de prueba: si en la primera semana no te convence, cancelas sin compromiso.',
    },
    mobile: { how: 'Cómo funciona', join: 'Únete al Telegram' },
    footer: {
      tagline: 'Pronósticos de tenis con análisis profesionales. Juega con cabeza.',
      product: 'Servicio',
      productLinks: ['Pronósticos', 'En directo', 'Cómo funciona', 'Resultados'],
      company: 'Compañía',
      companyLinks: ['Sobre nosotros', 'Afiliados', 'Contacto', 'Telegram'],
      support: 'Ayuda',
      supportLinks: ['Centro de ayuda', 'Preguntas frecuentes', 'Contacto', 'Estado'],
      legalTitle: 'Legal',
      legalLinks: ['Términos y condiciones', 'Privacidad', 'Cookies', 'Juego responsable'],
      responsible:
        'El juego puede ser adictivo. Juega con responsabilidad y solo con dinero que puedas permitirte perder. Prohibido el juego a menores de {age} años. Si necesitas ayuda, contacta con tu línea de atención al jugador.',
      copy: '© 2026 SportsLAB. Servicio de pronósticos deportivos. Todos los derechos reservados.',
      disclaimer: 'Sitio de demostración. Las cuotas y resultados son ilustrativos.',
      age: (a) => `Solo mayores de ${a} años`,
    },
  },

  EN: {
    nav: {
      live: 'Live',
      how: 'How it works',
      tournaments: 'Tournaments',
      results: 'Results',
      features: 'Why us',
    },
    hero: {
      pill: 'Tennis betting tips',
      title1: 'Gain an edge in',
      title2: 'tennis betting with',
      title3: 'professional analysis',
      subtitle: 'Daily tips, bankroll management and coverage of ATP, WTA and Grand Slams.',
      join: 'Join Telegram',
      how: 'See how it works',
      rating: 'active bettors',
      badge1: '82% hit rate',
      badge2: 'Verified withdrawals',
      badge3: '+50 tournaments',
      covers: 'We cover',
      cardCanal: 'Channel',
      cardCanalV: 'Free',
      cardTorneos: 'Tournaments',
      cardAnalisis: 'Analysis',
      cardAnalisisV: 'Real data',
    },
    stats: {
      eyebrow: 'The numbers',
      title: 'Results that',
      titleHl: 'speak for themselves',
      text: 'Thousands of bettors trust our tips, season after season.',
      tag: '100% real data',
      partidos: 'Matches analyzed',
      partidosD: 'ATP, WTA and Challengers',
      torneos: 'Tournaments covered',
      torneosD: 'Grand Slams, Masters 1000 and ATP 500',
      efectividad: 'Recorded hit rate',
      efectividadD: 'Won this season',
      comunidad: 'Active community',
      comunidadD: '+2,000 on Telegram',
    },
    how: {
      eyebrow: 'The method',
      title: 'How it works',
      subtitle: 'A clear, transparent process: you just have to follow the tip.',
      s1: 'We analyze',
      s1d: 'We study form, surface and head-to-head of every match with real data.',
      s2: 'We post the pick',
      s2d: 'We send the tip with the odds and recommended stake straight to Telegram.',
      s3: 'You bet',
      s3d: 'You place the bet at your favorite bookie with the best available odds.',
      s4: 'We track the result',
      s4d: 'We log every result with full transparency, win or lose.',
      cta: 'Get a free tip',
    },
    live: {
      eyebrow: 'Live',
      title: 'Bet while the action happens',
      subtitle: 'Real-time odds on the most important matches of the moment.',
    },
    tournaments: {
      eyebrow: 'Tournaments',
      title: 'Full tour coverage',
      subtitle:
        'From ATP and WTA to the Grand Slams: we analyze every major tournament of the season.',
      atp: 'Men’s professional tour',
      wta: 'Women’s professional tour',
      slam: 'Australia, Roland Garros, Wimbledon and US Open',
      masters: 'The elite of the ATP tour',
      davis: 'National team competition',
    },
    features: {
      eyebrow: 'Why us',
      title: 'Why SportsLAB?',
      subtitle: 'Serious analysis, competitive odds and total transparency.',
      odds: 'Best odds',
      oddsD: 'We compare and always pick the highest odds on the market.',
      live: 'Point by point',
      liveD: 'Live tracking of every match, game by game.',
      payout: 'Fast payout',
      payoutD: 'Clear bankroll management so you cash out your wins hassle-free.',
      secure: 'Security',
      secureD: 'Analysis with real data and total transparency in the results.',
    },
    results: {
      eyebrow: 'Results',
      title: 'Winning bets, not promises',
      subtitle: 'Real screenshots of our winning tips. Total transparency.',
      badge: 'Won',
      note: 'Past results do not guarantee future results. Play responsibly. 18+.',
    },
    lifestyle: {
      eyebrow: 'Lifestyle',
      title: 'More than betting: a winner’s mindset',
      subtitle:
        'Behind SportsLAB there are real bettors. Discipline, analysis and a cool head, on and off the court.',
      founderName: 'The Founder',
      founderRole: 'SportsLAB',
      cap1: 'Late-night analysis',
      cap1Sub: 'When the city sleeps',
      cap2: 'On the road',
      cap2Sub: 'Always in motion',
      cap3: 'After hours',
      cap3Sub: 'When the night falls',
      cap4: 'Behind the wheel',
      cap4Sub: 'In full control',
      quote:
        '“On the court and in life, whoever studies the game wins. We give you the tools; the decisions, with a clear head.”',
      cite: '— The SportsLAB team',
    },
    cta: {
      eyebrow: 'Exclusive perk',
      title1: 'Get',
      titleHl: '20% off',
      title2: 'your first VIP month',
      subtitle:
        'Just for signing up from this page at AbrahamSportsLAB. Full access to tips, bankroll management and live tracking.',
      button: 'I want my 20% off',
      legal: 'Trial guarantee: if you’re not convinced in the first week, cancel with no strings attached.',
    },
    mobile: { how: 'How it works', join: 'Join Telegram' },
    footer: {
      tagline: 'Tennis betting tips with professional analysis. Bet smart.',
      product: 'Service',
      productLinks: ['Tips', 'Live', 'How it works', 'Results'],
      company: 'Company',
      companyLinks: ['About us', 'Affiliates', 'Contact', 'Telegram'],
      support: 'Help',
      supportLinks: ['Help center', 'FAQ', 'Contact', 'Status'],
      legalTitle: 'Legal',
      legalLinks: ['Terms & conditions', 'Privacy', 'Cookies', 'Responsible gaming'],
      responsible:
        'Gambling can be addictive. Play responsibly and only with money you can afford to lose. Gaming is forbidden for anyone under {age}. If you need help, contact your player support line.',
      copy: '© 2026 SportsLAB. Sports tipping service. All rights reserved.',
      disclaimer: 'Demo site. Odds and results are illustrative.',
      age: (a) => `${a}+ only`,
    },
  },
};

const LanguageContext = createContext(null);

function getPath(obj, path) {
  return path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj);
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    const saved = typeof localStorage !== 'undefined' && localStorage.getItem('lang');
    return saved === 'EN' || saved === 'ES' ? saved : 'ES';
  });

  useEffect(() => {
    document.documentElement.lang = lang.toLowerCase();
    try {
      localStorage.setItem('lang', lang);
    } catch {
      /* almacenamiento no disponible */
    }
  }, [lang]);

  const value = useMemo(() => {
    const t = (key) => {
      const val = getPath(dict[lang], key);
      return val !== undefined ? val : (getPath(dict.ES, key) ?? key);
    };
    return { lang, setLang: setLangState, t };
  }, [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang debe usarse dentro de <LanguageProvider>');
  return ctx;
}
