/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

// =============================================================================
// i18n — Traducciones ES/EN (sin dependencias). El idioma vive en contexto.
// =============================================================================

export const LANGUAGES = [
  { code: 'ES', label: 'Español' },
  { code: 'EN', label: 'English' },
];

/**
 * Etiqueta BCP 47 de cada idioma. Es la que se escribe en `<html lang>` y debe
 * coincidir con los `hreflang` declarados en index.html (es-co / en).
 */
const HTML_LANG = { ES: 'es-CO', EN: 'en' };

/** Locale de Open Graph por idioma. */
const OG_LOCALE = { ES: 'es_CO', EN: 'en_US' };

/** URL canónica de cada idioma (debe coincidir con hreflang y sitemap.xml). */
const SITE_URL = 'https://abrahamsportslab.com/';
const CANONICAL = { ES: SITE_URL, EN: `${SITE_URL}?lang=en` };

/**
 * Sincroniza el `<head>` con el idioma activo.
 *
 * Sin esto, `?lang=en` seguía declarando como canónica la URL en español, con lo
 * que Google descartaba la versión inglesa que anuncia el propio `hreflang`.
 *
 * @param {'ES'|'EN'} lang
 */
function syncHead(lang) {
  document.documentElement.lang = HTML_LANG[lang];

  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) canonical.setAttribute('href', CANONICAL[lang]);

  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) ogUrl.setAttribute('content', CANONICAL[lang]);

  const ogLocale = document.querySelector('meta[property="og:locale"]');
  if (ogLocale) ogLocale.setAttribute('content', OG_LOCALE[lang]);

  const ogLocaleAlt = document.querySelector('meta[property="og:locale:alternate"]');
  if (ogLocaleAlt) ogLocaleAlt.setAttribute('content', OG_LOCALE[lang === 'ES' ? 'EN' : 'ES']);

  // Título y descripción en el idioma activo.
  const { title, description, ogTitle, ogDescription } = dict[lang].meta;
  document.title = title;
  setMeta('meta[name="description"]', description);
  setMeta('meta[property="og:title"]', ogTitle);
  setMeta('meta[property="og:description"]', ogDescription);
  setMeta('meta[name="twitter:title"]', ogTitle);
  setMeta('meta[name="twitter:description"]', ogDescription);
}

/**
 * Escribe el `content` de una etiqueta `<meta>` si existe en el documento.
 *
 * @param {string} selector
 * @param {string} content
 */
function setMeta(selector, content) {
  const el = document.querySelector(selector);
  if (el) el.setAttribute('content', content);
}

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
      title: '¿Por qué AbrahamSportsLAB?',
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
      // Alt de cada captura del carrusel (contenido, no decoración).
      alt: (n, total) => `Captura de una apuesta de tenis ganada con AbrahamSportsLAB (${n} de ${total})`,
    },
    lifestyle: {
      eyebrow: 'Estilo de vida',
      title: 'Más que apuestas: mentalidad de ganador',
      subtitle:
        'Detrás de AbrahamSportsLAB hay apostadores de verdad. Disciplina, análisis y cabeza fría, dentro y fuera de la pista.',
      founderName: 'Abraham',
      founderRole: 'Fundador de AbrahamSportsLAB',
      // Alt descriptivos: estas fotos son contenido, no decoración.
      founderAlt: 'Abraham, fundador de AbrahamSportsLAB y analista de pronósticos de tenis',
      cap1Alt: 'Sesión de análisis nocturno de partidos de tenis del equipo de AbrahamSportsLAB',
      cap2Alt: 'El fundador de AbrahamSportsLAB de viaje, siguiendo el circuito de tenis',
      cap3Alt: 'El equipo de AbrahamSportsLAB de noche, después de cerrar la jornada de análisis',
      cap4Alt: 'El fundador de AbrahamSportsLAB al volante de su coche',
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
      cite: '— AbrahamSportsLAB',
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
    // Metadatos del <head>. Se escriben en el DOM al cambiar de idioma para que
    // la versión ?lang=en no se indexe con el título y la descripción en español.
    meta: {
      title:
        'Pronósticos de tenis en Colombia | AbrahamSportsLAB — Apuestas ATP, WTA y Grand Slams',
      description:
        'Pronósticos de tenis con análisis profesionales en Colombia. Picks diarios de ATP, WTA, Grand Slams y Masters 1000, cuotas y gestión de bankroll directo a tu Telegram. 82% de efectividad registrada. +18, juega con responsabilidad.',
      // Versión corta para redes sociales (Open Graph / Twitter).
      ogTitle: 'Pronósticos de tenis con análisis profesionales | AbrahamSportsLAB',
      ogDescription:
        'Picks diarios de ATP, WTA y Grand Slams, cuotas y gestión de bankroll directo a tu Telegram. 82% de efectividad registrada.',
    },
    // Textos que solo leen los lectores de pantalla (aria-label, alt de apoyo).
    a11y: {
      telegramFloat: 'Únete al canal de Telegram de AbrahamSportsLAB',
      leagues: 'Torneos de tenis que cubrimos',
      stats: 'Estadísticas de AbrahamSportsLAB',
      liveBoard: 'Partidos de tenis en directo con sus cuotas',
      proofs: 'Capturas de apuestas ganadas',
      prevProof: 'Ver la captura anterior',
      nextProof: 'Ver la captura siguiente',
      goToProof: (n) => `Ver la captura ${n}`,
      openMenu: 'Abrir el menú de navegación',
      closeMenu: 'Cerrar el menú de navegación',
      mainNav: 'Navegación principal',
      langSwitch: 'Cambiar de idioma',
      quickActions: 'Acciones rápidas',
      skip: 'Saltar al contenido',
    },
    footer: {
      tagline: 'Pronósticos de tenis con análisis profesionales. Juega con cabeza.',
      product: 'Servicio',
      company: 'SportsLAB',
      support: 'Contacto',
      legalTitle: 'Legal',
      socials: 'Redes y contacto',
      close: 'Cerrar',
      updated: 'Última actualización:',
      // Etiquetas de los enlaces del footer. Todos apuntan a un destino real.
      link: {
        live: 'Partidos en directo',
        how: 'Cómo funciona',
        tournaments: 'Torneos que cubrimos',
        results: 'Resultados',
        features: 'Por qué SportsLAB',
        about: 'Quién está detrás',
        numbers: 'Nuestros números',
        join: 'Unirse al canal',
        telegram: 'Canal de Telegram',
        email: 'Escríbenos por correo',
      },
      responsible:
        'El juego puede ser adictivo. Juega con responsabilidad y solo con dinero que puedas permitirte perder. Prohibido el juego a menores de {age} años. Si necesitas ayuda, contacta con tu línea de atención al jugador.',
      madeBy: 'Hecho por',
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
      title: 'Why AbrahamSportsLAB?',
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
      alt: (n, total) => `Screenshot of a winning tennis bet with AbrahamSportsLAB (${n} of ${total})`,
    },
    lifestyle: {
      eyebrow: 'Lifestyle',
      title: 'More than betting: a winner’s mindset',
      subtitle:
        'Behind AbrahamSportsLAB there are real bettors. Discipline, analysis and a cool head, on and off the court.',
      founderName: 'Abraham',
      founderRole: 'Founder of AbrahamSportsLAB',
      founderAlt: 'Abraham, founder of AbrahamSportsLAB and tennis betting analyst',
      cap1Alt: 'Late-night tennis match analysis session by the AbrahamSportsLAB team',
      cap2Alt: 'The founder of AbrahamSportsLAB travelling, following the tennis tour',
      cap3Alt: 'The AbrahamSportsLAB team at night, after wrapping up the analysis',
      cap4Alt: 'The founder of AbrahamSportsLAB behind the wheel of his car',
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
      cite: '— AbrahamSportsLAB',
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
    meta: {
      title: 'Tennis betting tips | AbrahamSportsLAB — ATP, WTA and Grand Slam picks',
      description:
        'Tennis betting tips backed by professional analysis. Daily ATP, WTA, Grand Slam and Masters 1000 picks, odds and bankroll management straight to your Telegram. 82% recorded hit rate. 18+, play responsibly.',
      ogTitle: 'Tennis betting tips with professional analysis | AbrahamSportsLAB',
      ogDescription:
        'Daily ATP, WTA and Grand Slam picks, odds and bankroll management straight to your Telegram. 82% recorded hit rate.',
    },
    a11y: {
      telegramFloat: 'Join the AbrahamSportsLAB Telegram channel',
      leagues: 'Tennis tournaments we cover',
      stats: 'AbrahamSportsLAB statistics',
      liveBoard: 'Live tennis matches and their odds',
      proofs: 'Screenshots of winning bets',
      prevProof: 'View previous screenshot',
      nextProof: 'View next screenshot',
      goToProof: (n) => `View screenshot ${n}`,
      openMenu: 'Open the navigation menu',
      closeMenu: 'Close the navigation menu',
      mainNav: 'Main navigation',
      langSwitch: 'Change language',
      quickActions: 'Quick actions',
      skip: 'Skip to content',
    },
    footer: {
      tagline: 'Tennis betting tips with professional analysis. Bet smart.',
      product: 'Service',
      company: 'SportsLAB',
      support: 'Contact',
      legalTitle: 'Legal',
      socials: 'Social and contact',
      close: 'Close',
      updated: 'Last updated:',
      // Footer link labels. Every one of them points somewhere real.
      link: {
        live: 'Live matches',
        how: 'How it works',
        tournaments: 'Tournaments we cover',
        results: 'Results',
        features: 'Why SportsLAB',
        about: 'Who is behind it',
        numbers: 'Our numbers',
        join: 'Join the channel',
        telegram: 'Telegram channel',
        email: 'Email us',
      },
      responsible:
        'Gambling can be addictive. Play responsibly and only with money you can afford to lose. Gaming is forbidden for anyone under {age}. If you need help, contact your player support line.',
      madeBy: 'Made by',
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

/**
 * Lee el idioma pedido en la URL (`?lang=en`). Es la URL que declaramos como
 * alternativa `hreflang="en"`, así que tiene que servir realmente el inglés:
 * si no, Google detecta un hreflang que devuelve el mismo contenido.
 *
 * @returns {'ES'|'EN'|null}
 */
function langFromUrl() {
  if (typeof window === 'undefined') return null;
  const raw = new URLSearchParams(window.location.search).get('lang');
  if (!raw) return null;
  const code = raw.trim().slice(0, 2).toUpperCase();
  return code === 'EN' || code === 'ES' ? code : null;
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    // La URL manda sobre la preferencia guardada: es la que ve el buscador.
    const fromUrl = langFromUrl();
    if (fromUrl) return fromUrl;
    const saved = typeof localStorage !== 'undefined' && localStorage.getItem('lang');
    return saved === 'EN' || saved === 'ES' ? saved : 'ES';
  });

  useEffect(() => {
    syncHead(lang);
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
