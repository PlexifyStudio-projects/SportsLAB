import SectionHeader from '@components/ui/SectionHeader/SectionHeader.jsx';
import Reveal from '@components/ui/Reveal/Reveal.jsx';
import { LIVE_MATCHES } from '@data/matches.js';
import MatchCard from './MatchCard/MatchCard.jsx';
import './LiveMatches.scss';

/**
 * LiveMatches — Rejilla de partidos en directo con cuotas seleccionables.
 */
export default function LiveMatches() {
  return (
    <section className="live-matches" id="en-vivo">
      <div className="container">
        <SectionHeader
          eyebrow="En directo"
          title="Apuesta mientras la acción sucede"
          subtitle="Cuotas actualizadas en tiempo real en los partidos más importantes del momento."
        />

        <div className="live-matches__grid">
          {LIVE_MATCHES.map((match, i) => (
            <Reveal key={match.id} delay={i * 90}>
              <MatchCard match={match} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
