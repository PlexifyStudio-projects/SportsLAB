import SectionHeader from '@components/ui/SectionHeader/SectionHeader.jsx';
import Icon from '@components/ui/Icon/Icon.jsx';
import Reveal from '@components/ui/Reveal/Reveal.jsx';
import { TOURNAMENTS } from '@data/tournaments.js';
import { useLang } from '@/i18n/index.jsx';
import courtBg from '@assets/images/tennis-court-night.jpg';
import './Tournaments.scss';

/**
 * Tournaments — Categorías de torneos de tenis cubiertas.
 */
export default function Tournaments() {
  const { t } = useLang();

  return (
    <section className="tournaments" id="torneos">
      <div className="tournaments__bg" aria-hidden="true">
        <img className="tournaments__bg-img" src={courtBg} alt="" loading="lazy" />
        <span className="tournaments__bg-veil" />
      </div>

      <div className="container">
        <SectionHeader
          eyebrow={t('tournaments.eyebrow')}
          title={t('tournaments.title')}
          subtitle={t('tournaments.subtitle')}
        />

        <ul className="tournaments__grid">
          {TOURNAMENTS.map((tournament, i) => (
            <Reveal as="li" key={tournament.id} delay={(i % 5) * 80}>
              <a className="tournaments__card" href="#torneos">
                <span className="tournaments__icon">
                  <Icon name={tournament.icon} size={26} />
                </span>
                <span className="tournaments__name">{tournament.name}</span>
                <span className="tournaments__desc">{t(`tournaments.${tournament.id}`)}</span>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
