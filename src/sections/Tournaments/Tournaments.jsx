import SectionHeader from '@components/ui/SectionHeader/SectionHeader.jsx';
import Icon from '@components/ui/Icon/Icon.jsx';
import Reveal from '@components/ui/Reveal/Reveal.jsx';
import { TOURNAMENTS } from '@data/tournaments.js';
import { formatCount } from '@utils/format.js';
import './Tournaments.scss';

const SURFACE_LABEL = { clay: 'Tierra', grass: 'Hierba', hard: 'Dura' };

/**
 * Tournaments — Grandes torneos de tenis disponibles para apostar.
 */
export default function Tournaments() {
  return (
    <section className="tournaments" id="torneos">
      <div className="container">
        <SectionHeader
          eyebrow="Torneos"
          title="De Wimbledon a Roland Garros"
          subtitle="Cubrimos cada Grand Slam, Masters 1000 y torneo ATP/WTA de la temporada."
        />

        <ul className="tournaments__grid">
          {TOURNAMENTS.map((tournament, i) => (
            <Reveal as="li" key={tournament.id} delay={(i % 4) * 80}>
              <a className="tournaments__card" href="#torneos">
                <span className="tournaments__icon">
                  <Icon name={tournament.icon} size={26} />
                </span>
                <span className="tournaments__name">{tournament.name}</span>
                <span className="tournaments__meta">
                  <span
                    className={`tournaments__surface tournaments__surface--${tournament.surface}`}
                  >
                    {SURFACE_LABEL[tournament.surface]}
                  </span>
                  <span className="tournaments__events">{formatCount(tournament.events)} eventos</span>
                </span>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
