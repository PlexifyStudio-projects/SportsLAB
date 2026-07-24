import Header from '@components/layout/Header/Header.jsx';
import Ticker from '@components/layout/Ticker/Ticker.jsx';
import Footer from '@components/layout/Footer/Footer.jsx';
import MobileCta from '@components/layout/MobileCta/MobileCta.jsx';

import Hero from '@sections/Hero/Hero.jsx';
import LiveMatches from '@sections/LiveMatches/LiveMatches.jsx';
import Tournaments from '@sections/Tournaments/Tournaments.jsx';
import Promotions from '@sections/Promotions/Promotions.jsx';
import Features from '@sections/Features/Features.jsx';
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
      <Ticker />

      <main id="contenido">
        <Hero />
        <LiveMatches />
        <Tournaments />
        <Promotions />
        <Features />
        <Lifestyle />
        <CtaBanner />
      </main>

      <Footer />

      <MobileCta />
    </>
  );
}
