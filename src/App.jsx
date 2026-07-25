import Header from '@components/layout/Header/Header.jsx';
import Footer from '@components/layout/Footer/Footer.jsx';
import MobileCta from '@components/layout/MobileCta/MobileCta.jsx';

import Hero from '@sections/Hero/Hero.jsx';
import Stats from '@sections/Stats/Stats.jsx';
import HowItWorks from '@sections/HowItWorks/HowItWorks.jsx';
import LiveMatches from '@sections/LiveMatches/LiveMatches.jsx';
import Tournaments from '@sections/Tournaments/Tournaments.jsx';
import Features from '@sections/Features/Features.jsx';
import Results from '@sections/Results/Results.jsx';
import Lifestyle from '@sections/Lifestyle/Lifestyle.jsx';
import CtaBanner from '@sections/CtaBanner/CtaBanner.jsx';
import { useLang } from '@/i18n/index.jsx';

/**
 * App — Composición de la landing page de SportsLAB.
 * El orden de las secciones define el recorrido del usuario (funnel):
 *   1. Gancho    → Hero, Stats
 *   2. Prueba    → Lifestyle (quién está detrás) y Results (apuestas ganadas)
 *   3. Mecánica  → HowItWorks, LiveMatches, Tournaments, Features
 *   4. Cierre    → CtaBanner
 * La prueba social va ANTES del método: primero se cree, luego se entiende.
 */
export default function App() {
  const { t } = useLang();

  return (
    <>
      <a className="skip-link" href="#contenido">
        {t('a11y.skip')}
      </a>

      <Header />

      <main id="contenido">
        <Hero />
        <Stats />
        <hr className="scene-divider" />
        <Lifestyle />
        <Results />
        <hr className="scene-divider" />
        <HowItWorks />
        <LiveMatches />
        <hr className="scene-divider" />
        <Tournaments />
        <Features />
        <CtaBanner />
      </main>

      <Footer />

      <MobileCta />

      {/* Viñeta + grano de película sobre toda la página (no captura clics).
          Sin barras de letterbox: al ser `position: fixed` por encima de todo,
          la de arriba recortaba la cabecera y la de abajo pisaba la barra CTA
          de móvil. El encuadre de cine se consigue con la viñeta. */}
      <div className="cinematic-grade" aria-hidden="true" />
    </>
  );
}
