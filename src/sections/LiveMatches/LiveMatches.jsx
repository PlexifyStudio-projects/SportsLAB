import SectionHeader from '@components/ui/SectionHeader/SectionHeader.jsx';
import { LIVE_MATCHES } from '@data/matches.js';
import { useLiveOdds } from '@hooks/useLiveOdds.js';
import { useLang } from '@/i18n/index.jsx';
import MatchCard from './MatchCard/MatchCard.jsx';
import './LiveMatches.scss';

/**
 * LiveMatches — Tablero en directo: 25 partidos desfilando de lado a lado
 * (marquee edge-to-edge) con las cuotas moviéndose en tiempo real.
 */
export default function LiveMatches() {
  const { t } = useLang();
  const matches = useLiveOdds(LIVE_MATCHES, { interval: 2600 });
  const loop = [...matches, ...matches];

  return (
    <section className="live-matches" id="en-vivo">
      <div className="container">
        <SectionHeader
          eyebrow={t('live.eyebrow')}
          title={t('live.title')}
          subtitle={t('live.subtitle')}
        />
      </div>

      <div className="live-matches__marquee" aria-label="Partidos en directo">
        <ul className="live-matches__track">
          {loop.map((match, i) => (
            <li
              className="live-matches__item"
              key={`${match.id}-${i}`}
              aria-hidden={i >= matches.length}
            >
              <MatchCard match={match} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
