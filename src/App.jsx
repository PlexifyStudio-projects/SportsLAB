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

/**
 * App — Composición de la landing page de SportsLAB.
 * El orden de las secciones define el recorrido del usuario (funnel).
 */
export default function App() {
  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>

      <Header />

      <main id="contenido">
        <Hero />
        <Stats />
        <HowItWorks />
        <LiveMatches />
        <Tournaments />
        <Features />
        <Results />
        <Lifestyle />
        <CtaBanner />
      </main>

      <Footer />

      <MobileCta />
    </>
  );
}
